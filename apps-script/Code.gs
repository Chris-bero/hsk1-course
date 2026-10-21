/**
 * ============================================================================
 * NEW HSK 1 Course Site — Phase 2 backend (Google Apps Script)
 * ============================================================================
 * Single JSON endpoint for the student site (doPost) + teacher dashboard
 * (doGet serves Dashboard.html; the page calls teacherApi() via
 * google.script.run).
 *
 * Contract: docs/PHASE2_INTEGRATION.md §5 (envelope, ops, validation rules).
 * Data:     one bound Google Spreadsheet, 7 worksheets (auto-created).
 *
 * Auth model (updated 2026-10 per product owner):
 *   - STUDENTS: the teacher creates student rows in the "Students" sheet —
 *     manually or via the dashboard's "Add student" form — each with a name +
 *     access code, and sends them to the student by hand. The student signs
 *     in with name + code (mandatory gate — no anonymous browsing); the
 *     server issues a random session token (stored HASHED, 90-day TTL).
 *     Every student op resolves the token → StudentID server-side; a
 *     client-claimed studentId is never trusted (spec §18D).
 *   - TEACHER: the dashboard URL itself is the credential (owner decision:
 *     "the page is only with the teacher"). Teacher ops are therefore ONLY
 *     reachable through this script's own HtmlService context
 *     (google.script.run → teacherApi). The public doPost endpoint — which
 *     any student's browser can call — REJECTS every teacher* op with
 *     FORBIDDEN, so students can never read the class roster even knowing
 *     the URL. (Upgrade path if ever needed: re-add a teacher code check
 *     inside teacherApi — one function.)
 *
 * Deployment: see docs/DEPLOY_PHASE2_AR.md (step-by-step, Arabic).
 * ============================================================================
 */

'use strict';

/* ============================== configuration ============================== */

var CFG = {
  sessionTtlDays: 90,
  /** Slack added on top of wall-clock when clamping active-time deltas. */
  timeMarginSeconds: 180,
  /** Upper bound for a single lesson's first-ever time import (seconds). */
  firstCallSecondsCap: 6 * 3600,
  /** Max events accepted in one logEvents call. */
  eventsPerCall: 500,
  /** Trim LearningEvents sheet beyond this many rows (oldest first). */
  eventLogCap: 20000,
  /** Per-token rate limit (requests per minute). */
  rateLimitPerMinute: 120,
  /** Students with no activity for this many days are flagged "stale". */
  staleAfterDays: 14,
  /** How many recent events a teacher student-report returns. */
  reportEventLimit: 100,
};

/** Worksheet names + column orders (docs/PHASE2_INTEGRATION.md §4). */
var SHEETS = {
  Students: ['StudentID', 'StudentName', 'AccessCode', 'CourseLevel', 'EnrollmentDate', 'AccountStatus', 'MigratedFromLocalID', 'CreatedAt'],
  Lessons: ['LessonID', 'LessonTitle_en', 'LessonTitle_zh', 'LessonOrder', 'VocabularyCount', 'CourseLevel'],
  StudentLessonProgress: ['StudentID', 'LessonID', 'Status', 'StartedAt', 'LastActivityAt', 'CompletedAt', 'ActiveLearningSeconds', 'CompletedVocabularyCount', 'TotalVocabularyCount', 'CompletionPercentage', 'LastCallAt'],
  StudentVocabularyProgress: ['StudentID', 'LessonID', 'VocabularyID', 'Status', 'FirstViewedAt', 'LastReviewedAt', 'MarkedCompletedAt'],
  LearningEvents: ['EventID', 'StudentID', 'LessonID', 'VocabularyID', 'EventType', 'Timestamp', 'SessionID'],
  StudentQuizStats: ['StudentID', 'LessonID', 'BestCorrect', 'Total', 'Attempts', 'LastAt'],
  Sessions: ['TokenHash', 'Role', 'StudentID', 'CreatedAt', 'ExpiresAt', 'LastSeenAt'],
};

var LESSON_STATUSES = ['not_started', 'in_progress', 'completed'];
var VOCAB_STATUSES = ['unseen', 'viewed', 'completed'];
var EVENT_TYPES = [
  'session_started', 'lesson_opened', 'vocabulary_viewed', 'vocabulary_audio_played',
  'sentence_audio_played', 'grammar_section_opened', 'conversation_played',
  'vocabulary_marked_completed', 'vocabulary_marked_uncompleted',
  'lesson_completed', 'lesson_uncompleted', 'practice_quiz_completed',
];

/* ============================== small utils ============================== */

function nowIso_() {
  return new Date().toISOString();
}

function apiError_(code, message) {
  var e = new Error(message);
  e.apiCode = code;
  return e;
}

function sha256_(s) {
  var raw = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, String(s), Utilities.Charset.UTF_8);
  var out = '';
  for (var i = 0; i < raw.length; i++) {
    var b = raw[i] < 0 ? raw[i] + 256 : raw[i];
    out += ('0' + b.toString(16)).slice(-2);
  }
  return out;
}

function randomToken_() {
  return Utilities.getUuid().replace(/-/g, '') + sha256_(Utilities.getUuid() + Math.random()).slice(0, 32);
}

/** Unambiguous access-code alphabet (no 0/O/1/l/I). */
function randomAccessCode_(len) {
  var alphabet = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';
  var bytes = Utilities.getUuid().replace(/-/g, '') + sha256_(String(Math.random()));
  var code = '';
  for (var i = 0; i < (len || 6); i++) {
    code += alphabet.charAt(parseInt(bytes.substr(i * 2, 2), 16) % alphabet.length);
  }
  return code;
}

function clampNum_(v, lo, hi) {
  var n = Number(v);
  if (!isFinite(n)) n = lo;
  return Math.min(hi, Math.max(lo, n));
}

function toInt_(v) {
  var n = parseInt(v, 10);
  return isFinite(n) ? n : 0;
}

function normName_(s) {
  return String(s == null ? '' : s).trim().replace(/\s+/g, ' ').toLowerCase();
}

function parseIsoMs_(s) {
  if (!s) return 0;
  var t = Date.parse(String(s));
  return isFinite(t) ? t : 0;
}

function lessonById_(id) {
  var ls = COURSE_DATA.lessons;
  for (var i = 0; i < ls.length; i++) if (ls[i].id === id) return ls[i];
  return null;
}

function assertLesson_(id) {
  var l = lessonById_(id);
  if (!l) throw apiError_('UNKNOWN_LESSON', 'Unknown lessonId: ' + id);
  return l;
}

function assertVocab_(lessonId, vocabId) {
  var l = assertLesson_(lessonId);
  if (l.vocabIds.indexOf(vocabId) === -1) {
    throw apiError_('UNKNOWN_VOCABULARY', 'Vocabulary ' + vocabId + ' does not belong to ' + lessonId);
  }
}

/* ============================== sheet layer ============================== */

function ss_() {
  var s = SpreadsheetApp.getActiveSpreadsheet();
  if (!s) throw apiError_('NO_SPREADSHEET', 'This script must be bound to a spreadsheet (Extensions → Apps Script from the sheet).');
  return s;
}

function sheet_(name) {
  var ss = ss_();
  var sh = ss.getSheetByName(name);
  if (!sh) {
    sh = ss.insertSheet(name);
    sh.getRange(1, 1, 1, SHEETS[name].length).setValues([SHEETS[name]]).setFontWeight('bold');
    sh.setFrozenRows(1);
  }
  return sh;
}

/** Read all data rows as objects (single batched getValues — spec §18C). */
function readRows_(name) {
  var sh = sheet_(name);
  var last = sh.getLastRow();
  if (last < 2) return [];
  var values = sh.getRange(2, 1, last - 1, SHEETS[name].length).getValues();
  var cols = SHEETS[name];
  var out = [];
  for (var i = 0; i < values.length; i++) {
    var row = values[i];
    var empty = true;
    for (var c = 0; c < row.length; c++) if (String(row[c]) !== '') { empty = false; break; }
    if (empty) continue;
    var obj = { __row: i + 2 };
    for (var j = 0; j < cols.length; j++) obj[cols[j]] = row[j];
    out.push(obj);
  }
  return out;
}

function rowToValues_(name, obj) {
  var cols = SHEETS[name];
  var vals = [];
  for (var i = 0; i < cols.length; i++) {
    var v = obj[cols[i]];
    vals.push(v === undefined || v === null ? '' : v);
  }
  return vals;
}

function writeRow_(name, rowNum, obj) {
  sheet_(name).getRange(rowNum, 1, 1, SHEETS[name].length).setValues([rowToValues_(name, obj)]);
}

function appendRow_(name, obj) {
  var sh = sheet_(name);
  sh.appendRow(rowToValues_(name, obj));
  return sh.getLastRow();
}

/** Upsert by a key predicate; returns the row object as stored. */
function upsertRow_(name, keyFn, obj) {
  var rows = readRows_(name);
  for (var i = 0; i < rows.length; i++) {
    if (keyFn(rows[i])) {
      var merged = {};
      var cols = SHEETS[name];
      for (var c = 0; c < cols.length; c++) merged[cols[c]] = rows[i][cols[c]];
      for (var k in obj) if (obj.hasOwnProperty(k) && k !== '__row') merged[k] = obj[k];
      writeRow_(name, rows[i].__row, merged);
      return merged;
    }
  }
  appendRow_(name, obj);
  return obj;
}

/** One script-level lock around every read-modify-write (spec §18E). */
function withLock_(fn) {
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(20000);
  } catch (e) {
    throw apiError_('BUSY', 'Server busy, please retry in a moment.');
  }
  try {
    return fn();
  } finally {
    lock.releaseLock();
  }
}

/** Cheap content fingerprint so warm boots never re-read the Lessons sheet. */
function lessonsFingerprint_() {
  var s = COURSE_DATA.lessons.map(function (l) {
    return l.id + ':' + l.vocabIds.length + ':' + l.titleEn;
  }).join('|');
  return sha256_(s).slice(0, 24);
}

/** Seed the Lessons worksheet from COURSE_DATA when empty/changed. */
function ensureLessonsSheet_() {
  var props = PropertiesService.getScriptProperties();
  var fp = lessonsFingerprint_();
  if (props.getProperty('LESSONS_FP') === fp) {
    var existing = ss_().getSheetByName('Lessons');
    if (existing && existing.getLastRow() >= COURSE_DATA.lessons.length + 1) return;
  }
  var rows = readRows_('Lessons');
  var want = COURSE_DATA.lessons;
  if (rows.length === want.length) {
    var same = true;
    for (var i = 0; i < want.length; i++) {
      var r = rows[i];
      if (r.LessonID !== want[i].id || toInt_(r.VocabularyCount) !== want[i].vocabIds.length) { same = false; break; }
    }
    if (same) { props.setProperty('LESSONS_FP', fp); return; }
  }
  var sh = sheet_('Lessons');
  var last = sh.getLastRow();
  if (last > 1) sh.deleteRows(2, last - 1);
  var values = want.map(function (l) {
    return [l.id, l.titleEn, l.titleZh, l.order, l.vocabIds.length, COURSE_DATA.courseLevel];
  });
  sh.getRange(2, 1, values.length, SHEETS.Lessons.length).setValues(values);
  props.setProperty('LESSONS_FP', fp);
}

/** True once this (warm) instance has verified the spreadsheet — globals
 *  persist across requests on the same Apps Script instance, so the sheet
 *  bootstrap costs nothing on every call after the first. */
var BOOTSTRAPPED_ = false;

/** Create all sheets (idempotent) — cheap no-op on warm instances. */
function bootstrap_() {
  if (BOOTSTRAPPED_) return;
  for (var name in SHEETS) if (SHEETS.hasOwnProperty(name)) sheet_(name);
  ensureLessonsSheet_();
  BOOTSTRAPPED_ = true;
}

/* ============================== sessions / auth ============================== */

function createSession_(role, studentId) {
  var token = randomToken_();
  var now = nowIso_();
  var exp = new Date(Date.now() + CFG.sessionTtlDays * 86400000).toISOString();
  // A fresh random token cannot exist yet — append directly (skip the full
  // Sessions read an upsert would need; sign-in latency matters).
  appendRow_('Sessions', {
    TokenHash: sha256_(token), Role: role, StudentID: studentId || '',
    CreatedAt: now, ExpiresAt: exp, LastSeenAt: now,
  });
  // Amortized housekeeping: drop expired sessions occasionally.
  if (Math.random() < 0.05) pruneExpiredSessions_();
  return token;
}

function pruneExpiredSessions_() {
  try {
    var rows = readRows_('Sessions');
    var now = Date.now();
    var stale = rows.filter(function (r) { return parseIsoMs_(r.ExpiresAt) < now; })
                    .map(function (r) { return r.__row; })
                    .sort(function (a, b) { return b - a; }); // descending → safe deletes
    var sh = sheet_('Sessions');
    for (var i = 0; i < stale.length; i++) sh.deleteRow(stale[i]);
  } catch (e) { /* housekeeping must never break a request */ }
}

function resolveSession_(token, requiredRole) {
  if (!token) throw apiError_('INVALID_TOKEN', 'Missing session token. Sign in first.');
  var hash = sha256_(token);
  var rows = readRows_('Sessions');
  for (var i = 0; i < rows.length; i++) {
    if (rows[i].TokenHash !== hash) continue;
    if (parseIsoMs_(rows[i].ExpiresAt) < Date.now()) {
      throw apiError_('INVALID_TOKEN', 'Session expired. Please sign in again.');
    }
    if (requiredRole && rows[i].Role !== requiredRole) {
      throw apiError_('FORBIDDEN', 'This operation requires the ' + requiredRole + ' role.');
    }
    // Sliding last-seen (throttled: only rewrite when >1h stale).
    if (Date.now() - parseIsoMs_(rows[i].LastSeenAt) > 3600000) {
      writeRow_('Sessions', rows[i].__row, {
        TokenHash: rows[i].TokenHash, Role: rows[i].Role, StudentID: rows[i].StudentID,
        CreatedAt: rows[i].CreatedAt, ExpiresAt: rows[i].ExpiresAt, LastSeenAt: nowIso_(),
      });
    }
    return { role: rows[i].Role, studentId: String(rows[i].StudentID || ''), hash: hash };
  }
  throw apiError_('INVALID_TOKEN', 'Unknown session token. Please sign in again.');
}

/** Simple per-identity rate limit (Script Properties, 1-minute window). */
function rateLimit_(identity) {
  var props = PropertiesService.getScriptProperties();
  var key = 'rl.' + sha256_(String(identity)).slice(0, 16);
  var now = Date.now();
  var state = { c: 0, t: now };
  try { state = JSON.parse(props.getProperty(key) || '') || state; } catch (e) { /* fresh */ }
  if (now - state.t > 60000) state = { c: 0, t: now };
  state.c++;
  props.setProperty(key, JSON.stringify(state));
  if (state.c > CFG.rateLimitPerMinute) {
    throw apiError_('RATE_LIMITED', 'Too many requests — slow down.');
  }
}

/** Teacher auth removed by product decision — the dashboard URL itself is the
 *  credential, and teacher ops are unreachable from the public doPost
 *  endpoint (see apiRequest_). Nothing to configure here. */

/* ============================== progress helpers ============================== */

function defaultLessonRecord_(studentId, lessonId) {
  var l = lessonById_(lessonId);
  return {
    studentId: studentId, lessonId: lessonId, status: 'not_started',
    startedAt: null, lastActivityAt: null, completedAt: null,
    activeLearningSeconds: 0, completedVocabularyCount: 0,
    totalVocabularyCount: l ? l.vocabIds.length : 0, completionPercentage: 0,
  };
}

function sheetToLessonRecord_(row) {
  return {
    studentId: String(row.StudentID), lessonId: String(row.LessonID),
    status: String(row.Status), 
    startedAt: row.StartedAt ? String(row.StartedAt) : null,
    lastActivityAt: row.LastActivityAt ? String(row.LastActivityAt) : null,
    completedAt: row.CompletedAt ? String(row.CompletedAt) : null,
    activeLearningSeconds: toInt_(row.ActiveLearningSeconds),
    completedVocabularyCount: toInt_(row.CompletedVocabularyCount),
    totalVocabularyCount: toInt_(row.TotalVocabularyCount),
    completionPercentage: toInt_(row.CompletionPercentage),
  };
}

function sheetToVocabRecord_(row) {
  return {
    studentId: String(row.StudentID), lessonId: String(row.LessonID),
    vocabularyId: String(row.VocabularyID), status: String(row.Status),
    firstViewedAt: row.FirstViewedAt ? String(row.FirstViewedAt) : null,
    lastReviewedAt: row.LastReviewedAt ? String(row.LastReviewedAt) : null,
    markedCompletedAt: row.MarkedCompletedAt ? String(row.MarkedCompletedAt) : null,
  };
}

function sheetToQuiz_(row) {
  return {
    lessonId: String(row.LessonID), bestCorrect: toInt_(row.BestCorrect),
    total: toInt_(row.Total), attempts: toInt_(row.Attempts),
    lastAt: row.LastAt ? String(row.LastAt) : '',
  };
}

function findStudentRow_(studentId) {
  var rows = readRows_('Students');
  for (var i = 0; i < rows.length; i++) {
    if (String(rows[i].StudentID) === studentId) return rows[i];
  }
  return null;
}

/** One batched payload with everything the student app caches at boot. */
function courseProgressData_(studentId) {
  var byLesson = {};
  studentLessonRows_(studentId).forEach(function (r) { byLesson[String(r.LessonID)] = r; });
  var lessons = COURSE_DATA.lessons.map(function (l) {
    return byLesson[l.id]
      ? sheetToLessonRecord_(byLesson[l.id])
      : defaultLessonRecord_(studentId, l.id);
  });
  var vocabulary = studentVocabRows_(studentId).map(sheetToVocabRecord_);
  var quiz = readRows_('StudentQuizStats')
    .filter(function (r) { return String(r.StudentID) === studentId; })
    .map(sheetToQuiz_);
  return { studentId: studentId, lessons: lessons, vocabulary: vocabulary, quiz: quiz };
}

function studentLessonRows_(studentId) {
  return readRows_('StudentLessonProgress').filter(function (r) { return String(r.StudentID) === studentId; });
}

function studentVocabRows_(studentId, lessonId) {
  return readRows_('StudentVocabularyProgress').filter(function (r) {
    return String(r.StudentID) === studentId && (lessonId ? String(r.LessonID) === lessonId : true);
  });
}

/** Recompute CompletedVocabularyCount + CompletionPercentage for one lesson. */
function refreshLessonDerived_(studentId, lessonId, statusOverride) {
  var l = assertLesson_(lessonId);
  var total = l.vocabIds.length;
  var completed = studentVocabRows_(studentId, lessonId).filter(function (r) {
    return String(r.Status) === 'completed';
  }).length;
  var rows = studentLessonRows_(studentId).filter(function (r) { return String(r.LessonID) === lessonId; });
  var status = statusOverride || (rows.length ? String(rows[0].Status) : 'not_started');
  var pct = status === 'completed' ? 100 : (total > 0 ? Math.round((completed / total) * 100) : 0);
  var obj = {
    StudentID: studentId, LessonID: lessonId,
    CompletedVocabularyCount: completed, TotalVocabularyCount: total, CompletionPercentage: pct,
  };
  if (rows.length) {
    obj.Status = status;
    obj.StartedAt = rows[0].StartedAt; obj.LastActivityAt = rows[0].LastActivityAt;
    obj.CompletedAt = rows[0].CompletedAt; obj.ActiveLearningSeconds = rows[0].ActiveLearningSeconds;
    obj.LastCallAt = rows[0].LastCallAt;
  } else {
    obj.Status = status; obj.StartedAt = ''; obj.LastActivityAt = ''; obj.CompletedAt = '';
    obj.ActiveLearningSeconds = 0; obj.LastCallAt = '';
  }
  upsertRow_('StudentLessonProgress', function (r) {
    return String(r.StudentID) === studentId && String(r.LessonID) === lessonId;
  }, obj);
  return { completedVocabularyCount: completed, completionPercentage: pct };
}

/**
 * Merge an incoming lesson record with the stored one, applying every
 * server-side rule from docs/PHASE2_INTEGRATION.md §7:
 *  - active seconds never decrease and never jump faster than wall-clock,
 *  - derived fields are recomputed (never taken from the client),
 *  - statuses validated against the enum.
 */
function mergeLessonRecord_(studentId, incoming) {
  var lessonId = String(incoming.lessonId || '');
  var lesson = assertLesson_(lessonId);
  var status = String(incoming.status || 'not_started');
  if (LESSON_STATUSES.indexOf(status) === -1) throw apiError_('BAD_REQUEST', 'Invalid status: ' + status);

  var existing = null;
  var rows = studentLessonRows_(studentId);
  for (var i = 0; i < rows.length; i++) if (String(rows[i].LessonID) === lessonId) { existing = rows[i]; break; }

  var now = nowIso_();
  var curSeconds = existing ? toInt_(existing.ActiveLearningSeconds) : 0;
  var lastCall = existing && existing.LastCallAt ? parseIsoMs_(existing.LastCallAt) : 0;
  var wall = lastCall ? Math.max(0, (Date.now() - lastCall) / 1000) : CFG.firstCallSecondsCap;
  var allowed = curSeconds + wall + CFG.timeMarginSeconds;
  var seconds = clampNum_(incoming.activeLearningSeconds, curSeconds, allowed);

  var incomingActivity = parseIsoMs_(incoming.lastActivityAt);
  var futureLimit = Date.now() + CFG.timeMarginSeconds * 1000;
  if (incomingActivity > futureLimit) incomingActivity = Date.now();
  var curActivity = existing ? parseIsoMs_(existing.LastActivityAt) : 0;
  var lastActivityAt = new Date(Math.max(incomingActivity, curActivity, existing ? 0 : Date.now())).toISOString();

  var startedAt = existing && existing.StartedAt ? String(existing.StartedAt)
    : (incoming.startedAt ? String(incoming.startedAt) : (status !== 'not_started' ? now : ''));
  var completedAt = '';
  if (status === 'completed') {
    completedAt = (existing && existing.CompletedAt) ? String(existing.CompletedAt)
      : (incoming.completedAt ? String(incoming.completedAt) : now);
  }

  var curCompletedVocab = existing ? toInt_(existing.CompletedVocabularyCount) : 0;
  var total = lesson.vocabIds.length;
  var pct = status === 'completed' ? 100 : (total > 0 ? Math.round((curCompletedVocab / total) * 100) : 0);

  var merged = {
    StudentID: studentId, LessonID: lessonId, Status: status,
    StartedAt: startedAt, LastActivityAt: lastActivityAt, CompletedAt: completedAt,
    ActiveLearningSeconds: Math.round(seconds),
    CompletedVocabularyCount: curCompletedVocab, TotalVocabularyCount: total,
    CompletionPercentage: pct, LastCallAt: now,
  };
  upsertRow_('StudentLessonProgress', function (r) {
    return String(r.StudentID) === studentId && String(r.LessonID) === lessonId;
  }, merged);
  return sheetToLessonRecord_(merged);
}

/** Append events with EventID dedupe (idempotency — spec §18E). */
function appendEvents_(studentId, events) {
  if (!events || !events.length) return 0;
  if (events.length > CFG.eventsPerCall) throw apiError_('BAD_REQUEST', 'Too many events in one call (max ' + CFG.eventsPerCall + ').');
  var existingIds = {};
  var sh = sheet_('LearningEvents');
  var last = sh.getLastRow();
  if (last >= 2) {
    var col = sh.getRange(2, 1, last - 1, 1).getValues();
    for (var i = 0; i < col.length; i++) existingIds[String(col[i][0])] = true;
  }
  var fresh = [];
  var seenInBatch = {};
  for (var j = 0; j < events.length; j++) {
    var ev = events[j];
    if (!ev || typeof ev.eventId !== 'string' || !ev.eventId) continue;
    if (EVENT_TYPES.indexOf(String(ev.eventType)) === -1) continue; // unknown types dropped
    var lid = String(ev.lessonId || '');
    if (lid && !lessonById_(lid)) continue;                          // unknown lesson dropped
    if (existingIds[ev.eventId] || seenInBatch[ev.eventId]) continue; // dedupe
    seenInBatch[ev.eventId] = true;
    fresh.push([
      ev.eventId, studentId, lid, String(ev.vocabularyId || ''),
      String(ev.eventType), String(ev.timestamp || nowIso_), String(ev.sessionId || ''),
    ]);
  }
  if (fresh.length) {
    sh.getRange(last + 1, 1, fresh.length, SHEETS.LearningEvents.length).setValues(fresh);
    // Trim the log so the sheet can't grow unbounded.
    var newLast = sh.getLastRow();
    if (newLast - 1 > CFG.eventLogCap) {
      sh.deleteRows(2, newLast - 1 - CFG.eventLogCap);
    }
  }
  return fresh.length;
}

/**
 * Merge a local (stu-local-*) snapshot into a signed-in account. Idempotent
 * via Students.MigratedFromLocalID. Shared by the migrateLocalProgress op and
 * by signIn (which can carry the snapshot in the SAME request — one round
 * trip instead of two; sign-in latency is the student's first impression).
 */
function migrateInternal_(studentId, localId, snap) {
  if (!localId) throw apiError_('BAD_REQUEST', 'localStudentId is required');
  var me = findStudentRow_(studentId);
  if (me && String(me.MigratedFromLocalID) === localId) return { migrated: false, already: true };

    var imported = { lessons: 0, vocabulary: 0, quiz: 0, events: 0 };

    // --- lessons -----------------------------------------------------------
    var lessonsIn = snap.lessons || {};
    for (var lid in lessonsIn) {
      if (!lessonsIn.hasOwnProperty(lid)) continue;
      if (!lessonById_(lid)) continue;
      var inc = lessonsIn[lid];
      var existing = null;
      studentLessonRows_(studentId).forEach(function (r) { if (String(r.LessonID) === lid) existing = r; });
      if (existing && parseIsoMs_(existing.LastActivityAt) >= parseIsoMs_(inc.lastActivityAt)) continue;
      // Route through the same clamping merge as live updates.
      inc.studentId = studentId;
      inc.lessonId = lid;
      if (existing) inc.activeLearningSeconds = Math.max(toInt_(existing.ActiveLearningSeconds), toInt_(inc.activeLearningSeconds));
      mergeLessonRecord_(studentId, inc);
      imported.lessons++;
    }

    // --- vocabulary ----------------------------------------------------------
    var vocabIn = snap.vocabulary || {};
    for (var vkey in vocabIn) {
      if (!vocabIn.hasOwnProperty(vkey)) continue;
      var v = vocabIn[vkey];
      var vLesson = String(v.lessonId || '');
      var vId = String(v.vocabularyId || '');
      if (!lessonById_(vLesson)) continue;
      if (lessonById_(vLesson).vocabIds.indexOf(vId) === -1) continue;
      if (VOCAB_STATUSES.indexOf(String(v.status)) === -1) continue;
      upsertRow_('StudentVocabularyProgress', function (r) {
        return String(r.StudentID) === studentId && String(r.LessonID) === vLesson && String(r.VocabularyID) === vId;
      }, {
        StudentID: studentId, LessonID: vLesson, VocabularyID: vId, Status: String(v.status),
        FirstViewedAt: v.firstViewedAt || '', LastReviewedAt: v.lastReviewedAt || '',
        MarkedCompletedAt: v.markedCompletedAt || '',
      });
      imported.vocabulary++;
    }
    // Recompute derived lesson numbers from the imported vocabulary.
    var touchedLessons = {};
    for (var vk2 in vocabIn) if (vocabIn.hasOwnProperty(vk2)) touchedLessons[String(vocabIn[vk2].lessonId)] = true;
    for (var tl in touchedLessons) if (touchedLessons.hasOwnProperty(tl) && lessonById_(tl)) refreshLessonDerived_(studentId, tl);

    // --- quiz ----------------------------------------------------------------
    var quizIn = snap.quiz || {};
    for (var qid in quizIn) {
      if (!quizIn.hasOwnProperty(qid) || !lessonById_(qid)) continue;
      var q = quizIn[qid];
      upsertRow_('StudentQuizStats', function (r) {
        return String(r.StudentID) === studentId && String(r.LessonID) === qid;
      }, {
        StudentID: studentId, LessonID: qid,
        BestCorrect: clampNum_(q.bestCorrect, 0, 10000), Total: clampNum_(q.total, 0, 10000),
        Attempts: clampNum_(q.attempts, 0, 1000000), LastAt: q.lastAt || nowIso_(),
      });
      imported.quiz++;
    }

    // --- events ----------------------------------------------------------------
    imported.events = appendEvents_(studentId, (snap.events || []).slice(0, CFG.eventsPerCall));

    // --- mark migrated ---------------------------------------------------------
    var meRow = findStudentRow_(studentId);
    if (meRow) {
      writeRow_('Students', meRow.__row, {
        StudentID: meRow.StudentID, StudentName: meRow.StudentName, AccessCode: meRow.AccessCode,
        CourseLevel: meRow.CourseLevel, EnrollmentDate: meRow.EnrollmentDate,
        AccountStatus: meRow.AccountStatus || 'active', MigratedFromLocalID: localId,
        CreatedAt: meRow.CreatedAt,
      });
    }
    return { migrated: true, already: false, imported: imported };
}

/* ============================== operations ============================== */

var OPS = {

  /** Health check used by the provider handshake. */
  ping: function () {
    return {
      ok: true, time: nowIso_(), courseId: COURSE_DATA.courseId,
      totalLessons: COURSE_DATA.totalLessons,
      studentCount: readRows_('Students').length,
    };
  },

  /** Student sign-in: name + teacher-issued code → session token. */
  signIn: function (req) {
    var p = req.payload || {};
    var name = normName_(p.name);
    var code = String(p.code || '').trim().toUpperCase();
    if (!name || !code) throw apiError_('BAD_REQUEST', 'Name and access code are required.');
    var rows = readRows_('Students');
    var match = null;
    for (var i = 0; i < rows.length; i++) {
      if (normName_(rows[i].StudentName) === name && String(rows[i].AccessCode).trim().toUpperCase() === code) {
        match = rows[i]; break;
      }
    }
    if (!match) throw apiError_('SIGN_IN_FAILED', 'No student found with that name + code. Ask your teacher to check the row in the Students sheet.');
    var status = String(match.AccountStatus || 'active').toLowerCase();
    if (status === 'inactive' || status === 'disabled') {
      throw apiError_('ACCOUNT_INACTIVE', 'This account is marked inactive. Talk to your teacher.');
    }
    var studentId = String(match.StudentID || '').trim();
    return withLock_(function () {
      var rowsNow = readRows_('Students');
      var matchNow = null;
      for (var j = 0; j < rowsNow.length; j++) {
        if (normName_(rowsNow[j].StudentName) === name &&
            String(rowsNow[j].AccessCode).trim().toUpperCase() === code) { matchNow = rowsNow[j]; break; }
      }
      matchNow = matchNow || match;
      if (!studentId) {
        // Manually-added row without an ID: assign one now.
        studentId = nextStudentId_(rowsNow);
        writeRow_('Students', matchNow.__row, {
          StudentID: studentId, StudentName: matchNow.StudentName, AccessCode: matchNow.AccessCode,
          CourseLevel: matchNow.CourseLevel || COURSE_DATA.courseId,
          EnrollmentDate: matchNow.EnrollmentDate || nowIso_().slice(0, 10),
          AccountStatus: 'active', MigratedFromLocalID: matchNow.MigratedFromLocalID || '',
          CreatedAt: matchNow.CreatedAt || nowIso_(),
        });
      }
      var token = createSession_('student', studentId);
      var student = studentProfileFromRow_({
        StudentID: studentId, StudentName: matchNow.StudentName,
        CourseLevel: matchNow.CourseLevel || COURSE_DATA.courseId,
        EnrollmentDate: matchNow.EnrollmentDate, AccountStatus: 'active',
        MigratedFromLocalID: matchNow.MigratedFromLocalID || '',
      });
      var res = { token: token, student: student };
      // Carry the device-local snapshot in the SAME request when provided —
      // one round trip total for gate → signed-in + migrated + cached.
      var mig = p.migrate;
      if (mig && mig.localStudentId) {
        res.migration = migrateInternal_(studentId, String(mig.localStudentId), mig.snapshot || {});
        if (res.migration.migrated) student.migratedFromLocalId = String(mig.localStudentId);
      }
      res.courseProgress = courseProgressData_(studentId);
      return res;
    });
  },

  getStudentProfile: function (req) {
    var s = resolveSession_(req.token, 'student');
    var rows = readRows_('Students');
    for (var i = 0; i < rows.length; i++) {
      if (String(rows[i].StudentID) === s.studentId) return studentProfileFromRow_(rows[i]);
    }
    throw apiError_('NO_PROFILE', 'Student row disappeared from the sheet?');
  },

  /**
   * Everything the home page + caches need in ONE batched read (spec §18C):
   * all lesson rows (padded with defaults), all vocabulary rows and all quiz
   * rows belonging to the caller.
   */
  getCourseProgress: function (req) {
    var s = resolveSession_(req.token, 'student');
    var data = courseProgressData_(s.studentId);
    var me = findStudentRow_(s.studentId);
    if (!me) throw apiError_('NO_PROFILE', 'Student row disappeared from the sheet?');
    data.student = studentProfileFromRow_(me);
    return data;
  },

  /** One lesson: progress row + vocabulary rows + quiz stats (batched read). */
  getLessonProgress: function (req) {
    var s = resolveSession_(req.token, 'student');
    var lessonId = String((req.payload || {}).lessonId || '');
    assertLesson_(lessonId);
    var lessonRow = null;
    studentLessonRows_(s.studentId).forEach(function (r) {
      if (String(r.LessonID) === lessonId) lessonRow = r;
    });
    var vocab = studentVocabRows_(s.studentId, lessonId).map(sheetToVocabRecord_);
    var quiz = null;
    readRows_('StudentQuizStats').forEach(function (r) {
      if (String(r.StudentID) === s.studentId && String(r.LessonID) === lessonId) quiz = sheetToQuiz_(r);
    });
    return {
      lesson: lessonRow ? sheetToLessonRecord_(lessonRow) : defaultLessonRecord_(s.studentId, lessonId),
      vocabulary: vocab,
      quiz: quiz,
    };
  },

  updateLessonProgress: function (req) {
    var s = resolveSession_(req.token, 'student');
    var rec = (req.payload || {}).record || req.payload || {};
    return mergeLessonRecord_(s.studentId, rec);
  },

  markVocabulary: function (req) {
    var s = resolveSession_(req.token, 'student');
    var rec = (req.payload || {}).record || req.payload || {};
    var lessonId = String(rec.lessonId || '');
    var vocabId = String(rec.vocabularyId || '');
    assertVocab_(lessonId, vocabId);
    var status = String(rec.status || 'viewed');
    if (VOCAB_STATUSES.indexOf(status) === -1) throw apiError_('BAD_REQUEST', 'Invalid vocabulary status: ' + status);
    var markedCompletedAt = status === 'completed'
      ? (rec.markedCompletedAt ? String(rec.markedCompletedAt) : nowIso_())
      : '';
    var existing = null;
    studentVocabRows_(s.studentId, lessonId).forEach(function (r) {
      if (String(r.VocabularyID) === vocabId) existing = r;
    });
    var firstViewedAt = existing && existing.FirstViewedAt ? String(existing.FirstViewedAt)
      : (rec.firstViewedAt ? String(rec.firstViewedAt) : (status === 'unseen' ? '' : nowIso_()));
    var lastReviewedAt = rec.lastReviewedAt ? String(rec.lastReviewedAt) : nowIso_();
    upsertRow_('StudentVocabularyProgress', function (r) {
      return String(r.StudentID) === s.studentId && String(r.LessonID) === lessonId && String(r.VocabularyID) === vocabId;
    }, {
      StudentID: s.studentId, LessonID: lessonId, VocabularyID: vocabId, Status: status,
      FirstViewedAt: firstViewedAt, LastReviewedAt: lastReviewedAt, MarkedCompletedAt: markedCompletedAt,
    });
    var derived = refreshLessonDerived_(s.studentId, lessonId);
    return { vocabularyId: vocabId, status: status, lessonDerived: derived };
  },

  saveQuizStats: function (req) {
    var s = resolveSession_(req.token, 'student');
    var q = (req.payload || {}).stats || req.payload || {};
    var lessonId = String(q.lessonId || '');
    assertLesson_(lessonId);
    var bestCorrect = clampNum_(q.bestCorrect, 0, 10000);
    var total = clampNum_(q.total, 0, 10000);
    var attempts = clampNum_(q.attempts, 0, 1000000);
    var lastAt = q.lastAt ? String(q.lastAt) : nowIso_();
    var existing = null;
    readRows_('StudentQuizStats').forEach(function (r) {
      if (String(r.StudentID) === s.studentId && String(r.LessonID) === lessonId) existing = r;
    });
    if (existing) {
      bestCorrect = Math.max(bestCorrect, toInt_(existing.BestCorrect));
      attempts = Math.max(attempts, toInt_(existing.Attempts));
      if (parseIsoMs_(existing.LastAt) > parseIsoMs_(lastAt)) lastAt = String(existing.LastAt);
      total = total || toInt_(existing.Total);
    }
    upsertRow_('StudentQuizStats', function (r) {
      return String(r.StudentID) === s.studentId && String(r.LessonID) === lessonId;
    }, { StudentID: s.studentId, LessonID: lessonId, BestCorrect: Math.round(bestCorrect), Total: Math.round(total), Attempts: Math.round(attempts), LastAt: lastAt });
    return { lessonId: lessonId, bestCorrect: Math.round(bestCorrect), total: Math.round(total), attempts: Math.round(attempts), lastAt: lastAt };
  },

  logEvents: function (req) {
    var s = resolveSession_(req.token, 'student');
    var events = (req.payload || {}).events || [];
    if (!Array.isArray(events)) throw apiError_('BAD_REQUEST', 'events must be an array');
    var added = appendEvents_(s.studentId, events);
    return { accepted: added, submitted: events.length };
  },

  /**
   * One-time merge of a local (stu-local-*) snapshot into the signed-in
   * account. Idempotent via Students.MigratedFromLocalID (docs §2 item 3).
   * Merge rules: later lastActivityAt wins; active seconds take the max;
   * events dedupe by eventId.
   */
  migrateLocalProgress: function (req) {
    var s = resolveSession_(req.token, 'student');
    var p = req.payload || {};
    return withLock_(function () {
      return migrateInternal_(s.studentId, String(p.localStudentId || ''), p.snapshot || {});
    });
  },

  /* ---------------------------- teacher ops ---------------------------- */

  /** Create a student row (name in; id + access code out) — dashboard form. */
  teacherAddStudent: function (req) {
    var name = String((req.payload || {}).name || '').trim();
    if (!name) throw apiError_('BAD_REQUEST', 'Student name is required.');
    var rows = readRows_('Students');
    for (var i = 0; i < rows.length; i++) {
      if (normName_(rows[i].StudentName) === normName_(name)) {
        throw apiError_('DUPLICATE_STUDENT', 'A student named "' + name + '" already exists (' + rows[i].StudentID + ').');
      }
    }
    var studentId = nextStudentId_(rows);
    var code = randomAccessCode_(6);
    var codes = {};
    rows.forEach(function (r) { codes[String(r.AccessCode).toUpperCase()] = true; });
    while (codes[code]) code = randomAccessCode_(6);
    appendRow_('Students', {
      StudentID: studentId, StudentName: name, AccessCode: code,
      CourseLevel: COURSE_DATA.courseId, EnrollmentDate: nowIso_().slice(0, 10),
      AccountStatus: 'active', MigratedFromLocalID: '', CreatedAt: nowIso_(),
    });
    return { studentId: studentId, studentName: name, accessCode: code };
  },

  teacherListStudents: function (req) {
    var students = readRows_('Students');
    var lessonRows = readRows_('StudentLessonProgress');
    var vocabRows = readRows_('StudentVocabularyProgress');
    var totalLessons = COURSE_DATA.totalLessons;
    var staleMs = CFG.staleAfterDays * 86400000;
    var now = Date.now();

    return {
      generatedAt: nowIso_(),
      totalLessons: totalLessons,
      students: students.map(function (st) {
        var sid = String(st.StudentID);
        var mine = lessonRows.filter(function (r) { return String(r.StudentID) === sid; });
        var completed = mine.filter(function (r) { return String(r.Status) === 'completed'; }).length;
        var seconds = mine.reduce(function (a, r) { return a + toInt_(r.ActiveLearningSeconds); }, 0);
        var vocabDone = vocabRows.filter(function (r) { return String(r.StudentID) === sid && String(r.Status) === 'completed'; }).length;
        var last = 0;
        mine.forEach(function (r) { last = Math.max(last, parseIsoMs_(r.LastActivityAt)); });
        var lastActivityAt = last ? new Date(last).toISOString() : null;
        var bucket = 'not_started';
        if (completed >= totalLessons) bucket = 'completed';
        else if (last && now - last > staleMs) bucket = 'stale';
        else if (mine.length && (seconds > 0 || completed > 0 || last)) bucket = 'progressing';
        return {
          studentId: sid, studentName: String(st.StudentName),
          accessCode: String(st.AccessCode || ''),
          accountStatus: String(st.AccountStatus || 'active'),
          enrollmentDate: String(st.EnrollmentDate || ''),
          lessonsCompleted: completed, totalLessons: totalLessons,
          completionPercentage: Math.round((completed / totalLessons) * 100),
          totalActiveSeconds: seconds, vocabularyCompleted: vocabDone,
          lastActivityAt: lastActivityAt, bucket: bucket,
          migratedFromLocalId: String(st.MigratedFromLocalID || ''),
        };
      }),
    };
  },

  teacherStudentReport: function (req) {
    var studentId = String((req.payload || {}).studentId || '');
    if (!studentId) throw apiError_('BAD_REQUEST', 'studentId is required');
    var students = readRows_('Students');
    var profile = null;
    students.forEach(function (r) { if (String(r.StudentID) === studentId) profile = studentProfileFromRow_(r); });
    if (!profile) throw apiError_('NOT_FOUND', 'No such student: ' + studentId);

    var lessonRows = {};
    readRows_('StudentLessonProgress').forEach(function (r) {
      if (String(r.StudentID) === studentId) lessonRows[String(r.LessonID)] = sheetToLessonRecord_(r);
    });
    var lessons = COURSE_DATA.lessons.map(function (l) {
      return lessonRows[l.id] || defaultLessonRecord_(studentId, l.id);
    });
    var vocab = studentVocabRows_(studentId).map(sheetToVocabRecord_);
    var quiz = readRows_('StudentQuizStats')
      .filter(function (r) { return String(r.StudentID) === studentId; })
      .map(sheetToQuiz_);
    var events = readRows_('LearningEvents')
      .filter(function (r) { return String(r.StudentID) === studentId; })
      .map(function (r) {
        return {
          eventId: String(r.EventID), lessonId: String(r.LessonID),
          vocabularyId: String(r.VocabularyID) || undefined, eventType: String(r.EventType),
          timestamp: String(r.Timestamp), sessionId: String(r.SessionID),
        };
      })
      .sort(function (a, b) { return parseIsoMs_(b.timestamp) - parseIsoMs_(a.timestamp); })
      .slice(0, CFG.reportEventLimit);
    return { profile: profile, lessons: lessons, vocabulary: vocab, quiz: quiz, recentEvents: events };
  },

  teacherCourseOverview: function (req) {
    var lessonRows = readRows_('StudentLessonProgress');
    var students = readRows_('Students');
    var now = Date.now();
    var staleMs = CFG.staleAfterDays * 86400000;
    var perLesson = COURSE_DATA.lessons.map(function (l) {
      var rows = lessonRows.filter(function (r) { return String(r.LessonID) === l.id; });
      return {
        lessonId: l.id, order: l.order, titleEn: l.titleEn, titleZh: l.titleZh,
        started: rows.filter(function (r) { return String(r.Status) !== 'not_started'; }).length,
        completed: rows.filter(function (r) { return String(r.Status) === 'completed'; }).length,
        totalStudents: students.length,
      };
    });
    var lastByStudent = {};
    lessonRows.forEach(function (r) {
      var sid = String(r.StudentID);
      lastByStudent[sid] = Math.max(lastByStudent[sid] || 0, parseIsoMs_(r.LastActivityAt));
    });
    var inactive = students
      .filter(function (st) {
        var last = lastByStudent[String(st.StudentID)] || 0;
        return !last || now - last > staleMs;
      })
      .map(function (st) {
        var last = lastByStudent[String(st.StudentID)] || 0;
        return {
          studentId: String(st.StudentID), studentName: String(st.StudentName),
          lastActivityAt: last ? new Date(last).toISOString() : null,
          daysInactive: last ? Math.floor((now - last) / 86400000) : null,
        };
      });
    return { generatedAt: nowIso_(), perLesson: perLesson, inactiveStudents: inactive, staleAfterDays: CFG.staleAfterDays };
  },
};

function studentProfileFromRow_(row) {
  return {
    studentId: String(row.StudentID),
    studentName: String(row.StudentName || ''),
    courseLevel: String(row.CourseLevel || COURSE_DATA.courseId),
    enrollmentDate: String(row.EnrollmentDate || ''),
    accountStatus: String(row.AccountStatus || 'active'),
    migratedFromLocalId: String(row.MigratedFromLocalID || '') || null,
  };
}

function nextStudentId_(rows) {
  var max = 0;
  rows.forEach(function (r) {
    var m = /^stu-(\d+)$/.exec(String(r.StudentID || ''));
    if (m) max = Math.max(max, parseInt(m[1], 10));
  });
  return 'stu-' + ('0000' + (max + 1)).slice(-4);
}

/* ============================== entry points ============================== */

/**
 * @param {string} via  'post' = public student endpoint (doPost),
 *                      'dashboard' = this script's own HtmlService page
 *                      (google.script.run -> teacherApi).
 * Teacher ops are ONLY served on the 'dashboard' channel: a student's browser
 * can reach doPost but can never read the class roster.
 */
function apiRequest_(req, via) {
  try {
    if (!req || typeof req !== 'object' || typeof req.op !== 'string') {
      throw apiError_('BAD_REQUEST', 'Envelope must be {op, token?, payload?} JSON.');
    }
    if (req.op.indexOf('teacher') === 0 && via !== 'dashboard') {
      throw apiError_('FORBIDDEN', 'Teacher operations are only available from the teacher dashboard.');
    }
    bootstrap_();
    var identity = req.token || ((req.payload && (req.payload.name || req.payload.teacherCode)) || 'anonymous');
    rateLimit_(identity);
    var fn = OPS[req.op];
    if (typeof fn !== 'function') throw apiError_('UNKNOWN_OP', 'Unknown op: ' + req.op);
    var data = fn(req);
    return { ok: true, data: data === undefined ? null : data };
  } catch (err) {
    var code = err && err.apiCode ? err.apiCode : 'INTERNAL';
    var message = err && err.message ? err.message : String(err);
    if (code === 'INTERNAL') console.error('apiRequest_ ' + (req && req.op) + ': ' + (err && err.stack || message));
    return { ok: false, error: { code: code, message: message } };
  }
}

/**
 * Student site endpoint. Requests are sent as text/plain to stay a CORS
 * "simple request" (no preflight) — the body is still JSON.
 */
function doPost(e) {
  var req = null;
  try {
    req = JSON.parse((e && e.postData && e.postData.contents) || 'null');
  } catch (err) {
    req = null;
  }
  var res = apiRequest_(req, 'post');
  return ContentService.createTextOutput(JSON.stringify(res)).setMimeType(ContentService.MimeType.JSON);
}

/**
 * Teacher dashboard (HtmlService). The dashboard URL is the teacher's
 * credential (product decision: no code to type) — but because the STUDENT
 * endpoint URL is public (it ships inside src/config.ts / the public repo),
 * the dashboard is only served on a private link:  /exec?k=<DASH_KEY>.
 * DASH_KEY is auto-generated once (Script Properties) and printed by
 * setupSheets; anyone opening the bare /exec URL in a browser gets an empty
 * "nothing here" page. If the private link ever leaks, delete the DASH_KEY
 * property (or run rotateDashKey) and a fresh key/link is issued — no
 * redeployment needed.
 */
function dashKey_() {
  var props = PropertiesService.getScriptProperties();
  var k = props.getProperty('DASH_KEY');
  if (!k) {
    k = randomToken_().slice(0, 24);
    props.setProperty('DASH_KEY', k);
    console.log('DASH_KEY generated: ' + k + ' — your dashboard link is <your /exec URL>?k=' + k);
  }
  return k;
}

/** Run to invalidate the current dashboard link and print the new one. */
function rotateDashKey() {
  PropertiesService.getScriptProperties().deleteProperty('DASH_KEY');
  var k = dashKey_();
  console.log('New dashboard link key: ' + k + ' — full URL: <your /exec URL>?k=' + k);
  return k;
}

function doGet(e) {
  var k = (e && e.parameter && e.parameter.k) || '';
  if (k !== dashKey_()) {
    return HtmlService.createHtmlOutput(
      '<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">' +
      '<title>HSK 1</title><body style="font-family:system-ui,sans-serif;display:flex;align-items:center;' +
      'justify-content:center;height:100vh;margin:0;color:#888;background:#f5f6fa">' +
      '<div style="text-align:center"><div style="font-size:42px">汉</div><p>Nothing here.</p></div></body>'
    ).setTitle('HSK 1');
  }
  bootstrap_();
  return HtmlService.createHtmlOutputFromFile('Dashboard')
    .setTitle('HSK 1 · Teacher Dashboard · لوحة المعلم')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

/**
 * Called from Dashboard.html through google.script.run (same envelope).
 * This channel is only reachable from HTML this script itself serves, which
 * is the teacher's credential (product decision: no teacher code).
 */
function teacherApi(req) {
  return apiRequest_(req, 'dashboard');
}

/** Convenience for the Apps Script editor: run once to create all sheets. */
function setupSheets() {
  bootstrap_();
  var names = [];
  for (var n in SHEETS) if (SHEETS.hasOwnProperty(n)) names.push(n);
  console.log('Sheets ready: ' + names.join(', '));
  var k = dashKey_();
  console.log('TEACHER DASHBOARD LINK -> <your /exec URL>?k=' + k + '   (keep it private; open it once and bookmark it)');
}
