/**
 * mock_backend.mjs — in-memory mock of the Apps Script backend (Code.gs).
 *
 * Mirrors the SAME contract + server rules so RemoteProgressProvider can be
 * exercised end-to-end in `npm run test:remote` without deploying anything:
 *   - envelope {op, token, payload} → {ok, data|error}
 *   - teacher-issued name+code sign-in → hashed session tokens
 *   - server-side ID validation (COURSE_DATA from apps-script/LessonsData.gs)
 *   - active-seconds clamping (never decrease, never faster than wall-clock)
 *   - derived-field recomputation (server never trusts client percentages)
 *   - event dedupe by EventID, migration idempotency, teacher aggregations
 *
 * Not used in production builds — dev/test tooling only.
 */
import { createHash, randomUUID } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const gsSource = readFileSync(join(here, '..', 'apps-script', 'LessonsData.gs'), 'utf8');
export const COURSE_DATA = JSON.parse(
  gsSource.slice(gsSource.indexOf('{'), gsSource.lastIndexOf('}') + 1),
);

const CFG = {
  timeMarginSeconds: 180,
  firstCallSecondsCap: 6 * 3600,
  eventsPerCall: 500,
  eventLogCap: 20000,
  reportEventLimit: 100,
  staleAfterDays: 14,
  sessionTtlDays: 90,
};

const LESSON_STATUSES = ['not_started', 'in_progress', 'completed'];
const VOCAB_STATUSES = ['unseen', 'viewed', 'completed'];
const EVENT_TYPES = [
  'session_started', 'lesson_opened', 'vocabulary_viewed', 'vocabulary_audio_played',
  'sentence_audio_played', 'grammar_section_opened', 'conversation_played',
  'vocabulary_marked_completed', 'vocabulary_marked_uncompleted',
  'lesson_completed', 'lesson_uncompleted', 'practice_quiz_completed',
];

const nowIso = () => new Date().toISOString();
const sha256 = (s) => createHash('sha256').update(String(s)).digest('hex');
const normName = (s) => String(s ?? '').trim().replace(/\s+/g, ' ').toLowerCase();
const isoMs = (s) => (s ? Date.parse(String(s)) || 0 : 0);
const toInt = (v) => { const n = parseInt(v, 10); return Number.isFinite(n) ? n : 0; };

function apiError(code, message) {
  const e = new Error(message);
  e.apiCode = code;
  return e;
}

function lessonById(id) {
  return COURSE_DATA.lessons.find((l) => l.id === id) || null;
}

export function createMockBackend(opts = {}) {
  const db = {
    students: (opts.students || []).map((s, i) => ({
      StudentID: s.studentId || `stu-${String(i + 1).padStart(4, '0')}`,
      StudentName: s.name,
      AccessCode: String(s.code || '').trim().toUpperCase(),
      CourseLevel: COURSE_DATA.courseId,
      EnrollmentDate: new Date().toISOString().slice(0, 10),
      AccountStatus: s.status || 'active',
      MigratedFromLocalID: '',
      CreatedAt: nowIso(),
    })),
    /** key `${studentId}|${lessonId}` */
    lessonProgress: new Map(),
    /** key `${studentId}|${lessonId}|${vocabId}` */
    vocabProgress: new Map(),
    /** key `${studentId}|${lessonId}` */
    quizStats: new Map(),
    events: [],
    /** tokenHash → {role, studentId, expiresAt} */
    sessions: new Map(),
  };

  let online = opts.online !== false;
  let clockOffsetMs = 0;
  const now = () => Date.now() + clockOffsetMs;

  /* ----------------------------- helpers ----------------------------- */

  function createSession(role, studentId) {
    const token = randomUUID().replace(/-/g, '') + sha256(randomUUID()).slice(0, 32);
    db.sessions.set(sha256(token), {
      role, studentId: studentId || '', expiresAt: now() + CFG.sessionTtlDays * 86400000,
    });
    return token;
  }

  function resolveSession(token, requiredRole) {
    if (!token) throw apiError('INVALID_TOKEN', 'Missing session token.');
    const s = db.sessions.get(sha256(token));
    if (!s) throw apiError('INVALID_TOKEN', 'Unknown session token.');
    if (s.expiresAt < now()) throw apiError('INVALID_TOKEN', 'Session expired.');
    if (requiredRole && s.role !== requiredRole) throw apiError('FORBIDDEN', `Requires ${requiredRole} role.`);
    return s;
  }

  function defaultLessonRecord(studentId, lessonId) {
    const l = lessonById(lessonId);
    return {
      studentId, lessonId, status: 'not_started',
      startedAt: null, lastActivityAt: null, completedAt: null,
      activeLearningSeconds: 0, completedVocabularyCount: 0,
      totalVocabularyCount: l ? l.vocabIds.length : 0, completionPercentage: 0,
    };
  }

  function getLessonRow(studentId, lessonId) {
    return db.lessonProgress.get(`${studentId}|${lessonId}`) || null;
  }

  function countCompletedVocab(studentId, lessonId) {
    let n = 0;
    for (const [k, v] of db.vocabProgress) {
      if (k.startsWith(`${studentId}|${lessonId}|`) && v.status === 'completed') n++;
    }
    return n;
  }

  function refreshLessonDerived(studentId, lessonId) {
    const l = lessonById(lessonId);
    if (!l) return;
    const row = getLessonRow(studentId, lessonId);
    const total = l.vocabIds.length;
    const completed = countCompletedVocab(studentId, lessonId);
    const status = row ? row.status : 'not_started';
    const pct = status === 'completed' ? 100 : total > 0 ? Math.round((completed / total) * 100) : 0;
    const merged = {
      ...(row || defaultLessonRecord(studentId, lessonId)),
      completedVocabularyCount: completed,
      totalVocabularyCount: total,
      completionPercentage: pct,
    };
    db.lessonProgress.set(`${studentId}|${lessonId}`, merged);
    return { completedVocabularyCount: completed, completionPercentage: pct };
  }

  function mergeLessonRecord(studentId, incoming) {
    const lessonId = String(incoming.lessonId || '');
    const lesson = lessonById(lessonId);
    if (!lesson) throw apiError('UNKNOWN_LESSON', `Unknown lessonId: ${lessonId}`);
    const status = String(incoming.status || 'not_started');
    if (!LESSON_STATUSES.includes(status)) throw apiError('BAD_REQUEST', `Invalid status: ${status}`);

    const existing = getLessonRow(studentId, lessonId);
    const curSeconds = existing ? toInt(existing.activeLearningSeconds) : 0;
    const lastCall = existing && existing.lastCallAt ? isoMs(existing.lastCallAt) : 0;
    const wall = lastCall ? Math.max(0, (now() - lastCall) / 1000) : CFG.firstCallSecondsCap;
    const allowed = curSeconds + wall + CFG.timeMarginSeconds;
    const inSeconds = Number(incoming.activeLearningSeconds);
    const seconds = Math.round(
      Math.min(allowed, Math.max(curSeconds, Number.isFinite(inSeconds) ? inSeconds : curSeconds)),
    );

    let incomingActivity = isoMs(incoming.lastActivityAt);
    if (incomingActivity > now() + CFG.timeMarginSeconds * 1000) incomingActivity = now();
    const curActivity = existing ? isoMs(existing.lastActivityAt) : 0;
    const lastActivityAt = new Date(Math.max(incomingActivity, curActivity, existing ? 0 : now())).toISOString();

    const startedAt = existing && existing.startedAt
      ? existing.startedAt
      : incoming.startedAt
        ? String(incoming.startedAt)
        : status !== 'not_started' ? new Date(now()).toISOString() : null;
    const completedAt = status === 'completed'
      ? (existing && existing.completedAt) || incoming.completedAt || new Date(now()).toISOString()
      : null;

    const completedVocabularyCount = existing ? toInt(existing.completedVocabularyCount) : 0;
    const total = lesson.vocabIds.length;
    const pct = status === 'completed' ? 100 : total > 0 ? Math.round((completedVocabularyCount / total) * 100) : 0;

    const merged = {
      studentId, lessonId, status, startedAt, lastActivityAt, completedAt,
      activeLearningSeconds: seconds,
      completedVocabularyCount, totalVocabularyCount: total, completionPercentage: pct,
      lastCallAt: new Date(now()).toISOString(),
    };
    db.lessonProgress.set(`${studentId}|${lessonId}`, merged);
    const { lastCallAt, ...record } = merged;
    void lastCallAt;
    return record;
  }

  function appendEvents(studentId, events) {
    if (!Array.isArray(events) || !events.length) return 0;
    if (events.length > CFG.eventsPerCall) throw apiError('BAD_REQUEST', 'Too many events.');
    const seen = new Set(db.events.map((e) => e.eventId));
    let added = 0;
    for (const ev of events) {
      if (!ev || typeof ev.eventId !== 'string' || !ev.eventId) continue;
      if (!EVENT_TYPES.includes(String(ev.eventType))) continue;
      const lid = String(ev.lessonId || '');
      if (lid && !lessonById(lid)) continue;
      if (seen.has(ev.eventId)) continue;
      seen.add(ev.eventId);
      db.events.push({
        eventId: ev.eventId, studentId, lessonId: lid,
        vocabularyId: String(ev.vocabularyId || '') || undefined,
        eventType: String(ev.eventType),
        timestamp: String(ev.timestamp || nowIso()),
        sessionId: String(ev.sessionId || ''),
      });
      added++;
    }
    if (db.events.length > CFG.eventLogCap) db.events.splice(0, db.events.length - CFG.eventLogCap);
    return added;
  }

  function nextStudentId() {
    let max = 0;
    for (const s of db.students) {
      const m = /^stu-(\d+)$/.exec(s.StudentID || '');
      if (m) max = Math.max(max, parseInt(m[1], 10));
    }
    return `stu-${String(max + 1).padStart(4, '0')}`;
  }

  /** Response shape: QuizStats without the internal studentId field. */
  function publicQuiz(q) {
    const { studentId, ...rest } = q;
    void studentId;
    return rest;
  }

  function buildCourseProgress(studentId) {
    const lessons = COURSE_DATA.lessons.map((l) => getLessonRow(studentId, l.id)
      ? withRecord(getLessonRow(studentId, l.id))
      : defaultLessonRecord(studentId, l.id));
    const vocabulary = [];
    for (const [k, v] of db.vocabProgress) if (k.startsWith(`${studentId}|`)) vocabulary.push(v);
    const quiz = [];
    for (const [k, q] of db.quizStats) if (k.startsWith(`${studentId}|`)) quiz.push(publicQuiz(q));
    return { studentId, lessons, vocabulary, quiz };
  }

  function migrateInternal(studentId, localId, snap) {
    if (!localId) throw apiError('BAD_REQUEST', 'localStudentId required');
    const row = db.students.find((r) => r.StudentID === studentId);
    if (row && row.MigratedFromLocalID === localId) return { migrated: false, already: true };
    const imported = { lessons: 0, vocabulary: 0, quiz: 0, events: 0 };
    for (const [lid, inc] of Object.entries(snap.lessons || {})) {
      if (!lessonById(lid)) continue;
      const existing = getLessonRow(studentId, lid);
      if (existing && isoMs(existing.lastActivityAt) >= isoMs(inc.lastActivityAt)) continue;
      const payload = { ...inc, studentId, lessonId: lid };
      if (existing) payload.activeLearningSeconds = Math.max(toInt(existing.activeLearningSeconds), toInt(inc.activeLearningSeconds));
      mergeLessonRecord(studentId, payload);
      imported.lessons++;
    }
    const touched = new Set();
    for (const v of Object.values(snap.vocabulary || {})) {
      const lesson = lessonById(String(v.lessonId || ''));
      if (!lesson || !lesson.vocabIds.includes(String(v.vocabularyId))) continue;
      if (!VOCAB_STATUSES.includes(String(v.status))) continue;
      db.vocabProgress.set(`${studentId}|${v.lessonId}|${v.vocabularyId}`, {
        studentId, lessonId: v.lessonId, vocabularyId: v.vocabularyId,
        status: v.status, firstViewedAt: v.firstViewedAt || null,
        lastReviewedAt: v.lastReviewedAt || null, markedCompletedAt: v.markedCompletedAt || null,
      });
      touched.add(String(v.lessonId));
      imported.vocabulary++;
    }
    for (const lid of touched) refreshLessonDerived(studentId, lid);
    for (const [qid, q] of Object.entries(snap.quiz || {})) {
      if (!lessonById(qid)) continue;
      db.quizStats.set(`${studentId}|${qid}`, {
        studentId, lessonId: qid, bestCorrect: toInt(q.bestCorrect), total: toInt(q.total),
        attempts: toInt(q.attempts), lastAt: q.lastAt || nowIso(),
      });
      imported.quiz++;
    }
    imported.events = appendEvents(studentId, (snap.events || []).slice(0, CFG.eventsPerCall));
    if (row) row.MigratedFromLocalID = localId;
    return { migrated: true, already: false, imported };
  }

  function profileFromRow(row) {
    return {
      studentId: row.StudentID,
      studentName: row.StudentName || '',
      courseLevel: row.CourseLevel || COURSE_DATA.courseId,
      enrollmentDate: row.EnrollmentDate || '',
      accountStatus: row.AccountStatus || 'active',
      migratedFromLocalId: row.MigratedFromLocalID || null,
    };
  }

  /* ------------------------------- ops ------------------------------- */

  const OPS = {
    ping() {
      return { ok: true, time: nowIso(), courseId: COURSE_DATA.courseId, totalLessons: COURSE_DATA.totalLessons, studentCount: db.students.length };
    },

    signIn(req) {
      const p = req.payload || {};
      const name = normName(p.name);
      const code = String(p.code || '').trim().toUpperCase();
      if (!name || !code) throw apiError('BAD_REQUEST', 'Name and access code are required.');
      const match = db.students.find((s) => normName(s.StudentName) === name && s.AccessCode === code);
      if (!match) throw apiError('SIGN_IN_FAILED', 'No student found with that name + code.');
      if (['inactive', 'disabled'].includes(String(match.AccountStatus || 'active').toLowerCase())) {
        throw apiError('ACCOUNT_INACTIVE', 'Account inactive.');
      }
      if (!match.StudentID) match.StudentID = nextStudentId();
      const token = createSession('student', match.StudentID);
      const student = profileFromRow(match);
      const res = { token, student };
      const mig = p.migrate;
      if (mig && mig.localStudentId) {
        res.migration = migrateInternal(match.StudentID, String(mig.localStudentId), mig.snapshot || {});
        if (res.migration.migrated) student.migratedFromLocalId = String(mig.localStudentId);
      }
      res.courseProgress = buildCourseProgress(match.StudentID);
      return res;
    },

    getStudentProfile(req) {
      const s = resolveSession(req.token, 'student');
      const row = db.students.find((r) => r.StudentID === s.studentId);
      if (!row) throw apiError('NO_PROFILE', 'Student row missing.');
      return profileFromRow(row);
    },

    getCourseProgress(req) {
      const s = resolveSession(req.token, 'student');
      const row = db.students.find((r) => r.StudentID === s.studentId);
      if (!row) throw apiError('NO_PROFILE', 'Student row missing.');
      const data = buildCourseProgress(s.studentId);
      data.student = profileFromRow(row);
      return data;
    },

    getLessonProgress(req) {
      const s = resolveSession(req.token, 'student');
      const lessonId = String((req.payload || {}).lessonId || '');
      if (!lessonById(lessonId)) throw apiError('UNKNOWN_LESSON', lessonId);
      const row = getLessonRow(s.studentId, lessonId);
      const vocabulary = [];
      for (const [k, v] of db.vocabProgress) if (k.startsWith(`${s.studentId}|${lessonId}|`)) vocabulary.push(v);
      const quizRow = db.quizStats.get(`${s.studentId}|${lessonId}`);
      const quiz = quizRow ? publicQuiz(quizRow) : null;
      return { lesson: row ? withRecord(row) : defaultLessonRecord(s.studentId, lessonId), vocabulary, quiz };
    },

    updateLessonProgress(req) {
      const s = resolveSession(req.token, 'student');
      const rec = (req.payload || {}).record || req.payload || {};
      return mergeLessonRecord(s.studentId, rec);
    },

    markVocabulary(req) {
      const s = resolveSession(req.token, 'student');
      const rec = (req.payload || {}).record || req.payload || {};
      const lessonId = String(rec.lessonId || '');
      const vocabId = String(rec.vocabularyId || '');
      const lesson = lessonById(lessonId);
      if (!lesson) throw apiError('UNKNOWN_LESSON', lessonId);
      if (!lesson.vocabIds.includes(vocabId)) throw apiError('UNKNOWN_VOCABULARY', `${vocabId} not in ${lessonId}`);
      const status = String(rec.status || 'viewed');
      if (!VOCAB_STATUSES.includes(status)) throw apiError('BAD_REQUEST', `Invalid status: ${status}`);
      const key = `${s.studentId}|${lessonId}|${vocabId}`;
      const existing = db.vocabProgress.get(key);
      const markedCompletedAt = status === 'completed'
        ? (rec.markedCompletedAt || (existing && existing.markedCompletedAt) || nowIso())
        : null;
      db.vocabProgress.set(key, {
        studentId: s.studentId, lessonId, vocabularyId: vocabId, status,
        firstViewedAt: (existing && existing.firstViewedAt) || rec.firstViewedAt || (status === 'unseen' ? null : nowIso()),
        lastReviewedAt: rec.lastReviewedAt || nowIso(),
        markedCompletedAt,
      });
      const lessonDerived = refreshLessonDerived(s.studentId, lessonId);
      return { vocabularyId: vocabId, status, lessonDerived };
    },

    saveQuizStats(req) {
      const s = resolveSession(req.token, 'student');
      const q = (req.payload || {}).stats || req.payload || {};
      const lessonId = String(q.lessonId || '');
      if (!lessonById(lessonId)) throw apiError('UNKNOWN_LESSON', lessonId);
      const key = `${s.studentId}|${lessonId}`;
      const prev = db.quizStats.get(key);
      const stats = {
        studentId: s.studentId,
        lessonId,
        bestCorrect: Math.max(toInt(q.bestCorrect), prev ? prev.bestCorrect : 0),
        total: toInt(q.total) || (prev ? prev.total : 0),
        attempts: Math.max(toInt(q.attempts), prev ? prev.attempts : 0),
        lastAt: prev && isoMs(prev.lastAt) > isoMs(q.lastAt) ? prev.lastAt : (q.lastAt || nowIso()),
      };
      db.quizStats.set(key, stats);
      return publicQuiz(stats);
    },

    logEvents(req) {
      const s = resolveSession(req.token, 'student');
      const events = (req.payload || {}).events || [];
      if (!Array.isArray(events)) throw apiError('BAD_REQUEST', 'events must be an array');
      const accepted = appendEvents(s.studentId, events);
      return { accepted, submitted: events.length };
    },

    migrateLocalProgress(req) {
      const s = resolveSession(req.token, 'student');
      const p = req.payload || {};
      return migrateInternal(s.studentId, String(p.localStudentId || ''), p.snapshot || {});
    },

    teacherAddStudent(req) {
      const name = String((req.payload || {}).name || '').trim();
      if (!name) throw apiError('BAD_REQUEST', 'Student name is required.');
      if (db.students.some((s) => normName(s.StudentName) === normName(name))) {
        throw apiError('DUPLICATE_STUDENT', `"${name}" already exists.`);
      }
      const studentId = nextStudentId();
      const code = 'TEST' + String(db.students.length + 1).padStart(2, '0');
      db.students.push({
        StudentID: studentId, StudentName: name, AccessCode: code,
        CourseLevel: COURSE_DATA.courseId, EnrollmentDate: nowIso().slice(0, 10),
        AccountStatus: 'active', MigratedFromLocalID: '', CreatedAt: nowIso(),
      });
      return { studentId, studentName: name, accessCode: code };
    },

    teacherListStudents(req) {
      const staleMs = CFG.staleAfterDays * 86400000;
      return {
        generatedAt: nowIso(),
        totalLessons: COURSE_DATA.totalLessons,
        students: db.students.map((st) => {
          const sid = st.StudentID;
          const rows = [...db.lessonProgress.values()].filter((r) => r.studentId === sid);
          const completed = rows.filter((r) => r.status === 'completed').length;
          const seconds = rows.reduce((a, r) => a + toInt(r.activeLearningSeconds), 0);
          const vocabDone = [...db.vocabProgress.values()].filter((v) => v.studentId === sid && v.status === 'completed').length;
          const last = rows.reduce((a, r) => Math.max(a, isoMs(r.lastActivityAt)), 0);
          let bucket = 'not_started';
          if (completed >= COURSE_DATA.totalLessons) bucket = 'completed';
          else if (last && now() - last > staleMs) bucket = 'stale';
          else if (rows.length && (seconds > 0 || completed > 0 || last)) bucket = 'progressing';
          return {
            studentId: sid, studentName: st.StudentName,
            accessCode: st.AccessCode || '',
            accountStatus: st.AccountStatus || 'active', enrollmentDate: st.EnrollmentDate || '',
            lessonsCompleted: completed, totalLessons: COURSE_DATA.totalLessons,
            completionPercentage: Math.round((completed / COURSE_DATA.totalLessons) * 100),
            totalActiveSeconds: seconds, vocabularyCompleted: vocabDone,
            lastActivityAt: last ? new Date(last).toISOString() : null, bucket,
            migratedFromLocalId: st.MigratedFromLocalID || '',
          };
        }),
      };
    },

    teacherStudentReport(req) {
      const studentId = String((req.payload || {}).studentId || '');
      const row = db.students.find((s) => s.StudentID === studentId);
      if (!row) throw apiError('NOT_FOUND', studentId);
      const lessons = COURSE_DATA.lessons.map((l) => getLessonRow(studentId, l.id)
        ? withRecord(getLessonRow(studentId, l.id))
        : defaultLessonRecord(studentId, l.id));
      const vocabulary = [...db.vocabProgress.values()].filter((v) => v.studentId === studentId);
      const quiz = [...db.quizStats.values()].filter((q) => q.studentId === studentId).map(publicQuiz);
      const recentEvents = db.events
        .filter((e) => e.studentId === studentId)
        .sort((a, b) => isoMs(b.timestamp) - isoMs(a.timestamp))
        .slice(0, CFG.reportEventLimit);
      return { profile: profileFromRow(row), lessons, vocabulary, quiz, recentEvents };
    },

    teacherCourseOverview(req) {
      const rows = [...db.lessonProgress.values()];
      const staleMs = CFG.staleAfterDays * 86400000;
      const perLesson = COURSE_DATA.lessons.map((l) => {
        const lr = rows.filter((r) => r.lessonId === l.id);
        return {
          lessonId: l.id, order: l.order, titleEn: l.titleEn, titleZh: l.titleZh,
          started: lr.filter((r) => r.status !== 'not_started').length,
          completed: lr.filter((r) => r.status === 'completed').length,
          totalStudents: db.students.length,
        };
      });
      const lastByStudent = {};
      for (const r of rows) lastByStudent[r.studentId] = Math.max(lastByStudent[r.studentId] || 0, isoMs(r.lastActivityAt));
      const inactiveStudents = db.students
        .filter((st) => !lastByStudent[st.StudentID] || now() - lastByStudent[st.StudentID] > staleMs)
        .map((st) => ({
          studentId: st.StudentID, studentName: st.StudentName,
          lastActivityAt: lastByStudent[st.StudentID] ? new Date(lastByStudent[st.StudentID]).toISOString() : null,
          daysInactive: lastByStudent[st.StudentID] ? Math.floor((now() - lastByStudent[st.StudentID]) / 86400000) : null,
        }));
      return { generatedAt: nowIso(), perLesson, inactiveStudents, staleAfterDays: CFG.staleAfterDays };
    },
  };

  function withRecord(row) {
    const { lastCallAt, ...rest } = row;
    void lastCallAt;
    return rest;
  }

  function request(req, via) {
    if (!online) throw new Error('network offline');
    try {
      if (!req || typeof req.op !== 'string') throw apiError('BAD_REQUEST', 'Envelope must have op');
      if (req.op.startsWith('teacher') && via !== 'dashboard') {
        throw apiError('FORBIDDEN', 'Teacher operations are only available from the teacher dashboard.');
      }
      const fn = OPS[req.op];
      if (typeof fn !== 'function') throw apiError('UNKNOWN_OP', req.op);
      const data = fn(req);
      return { ok: true, data: data === undefined ? null : data };
    } catch (err) {
      return { ok: false, error: { code: err.apiCode || 'INTERNAL', message: err.message } };
    }
  }

  return {
    request,
    /** Mirrors teacherApi(): the private HtmlService channel (teacher ops need no token). */
    dashboardRequest(req) { return request(req, 'dashboard'); },
    db,
    COURSE_DATA,
    setOnline(v) { online = !!v; },
    get online() { return online; },
    /** Advance the server clock (tests for clamping / staleness). */
    advanceClock(ms) { clockOffsetMs += ms; },
    /** Direct row access for assertions. */
    lessonRow: (sid, lid) => getLessonRow(sid, lid),
    vocabRow: (sid, lid, vid) => db.vocabProgress.get(`${sid}|${lid}|${vid}`) || null,
    studentRow: (sid) => db.students.find((s) => s.StudentID === sid) || null,
  };
}
