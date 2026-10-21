/**
 * Phase 2 end-to-end test — RemoteProgressProvider + Outbox + migration +
 * teacher ops against the in-memory mock of the Apps Script backend.
 *
 * Covers docs/PHASE2_INTEGRATION.md §9 checklist item "End-to-end test: two
 * students + one teacher, offline/online transitions, duplicate submissions,
 * invalid IDs" at the data layer (UI rendering is covered by test/smoke.ts).
 *
 * Run: npm run test:remote
 */
import { createMockBackend, type MockBackend } from '../scripts/mock_backend.mjs';
import { RemoteProgressProvider, RemoteApiError, type FetchLike } from '../src/progress/RemoteProgressProvider';
import { ProgressProviderUnavailableError } from '../src/progress/ProgressProvider';
import { Outbox } from '../src/progress/outbox';
import { loadRemoteSession, saveRemoteSession } from '../src/services/identity';
import type {
  LearningEvent,
  LessonProgressRecord,
  QuizStats,
  StudentProfile,
  VocabularyProgressRecord,
} from '../src/types/progress';

/* ------------------------------- harness ------------------------------- */

let passed = 0;
const failures: string[] = [];
function check(name: string, cond: boolean, detail = ''): void {
  if (cond) passed += 1;
  else {
    failures.push(`FAIL: ${name}${detail ? ` — ${detail}` : ''}`);
    console.error(`  ✗ ${name}${detail ? ` — ${detail}` : ''}`);
  }
}
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

function makeStorage(): Storage {
  const map = new Map<string, string>();
  return {
    getItem: (k: string) => map.get(k) ?? null,
    setItem: (k: string, v: string) => void map.set(k, String(v)),
    removeItem: (k: string) => void map.delete(k),
    clear: () => map.clear(),
    key: (i: number) => [...map.keys()][i] ?? null,
    get length() { return map.size; },
  } as Storage;
}

function fetchFor(backend: MockBackend): FetchLike {
  return async (_url, init) => {
    if (!backend.online) throw new Error('Failed to fetch (offline)');
    const env = backend.request(JSON.parse(init.body));
    return { ok: true, status: 200, json: async () => env };
  };
}

const providers: RemoteProgressProvider[] = [];
function newProvider(backend: MockBackend, storage: Storage | null): RemoteProgressProvider {
  const p = new RemoteProgressProvider('https://mock.example/exec', {
    storage,
    fetchImpl: fetchFor(backend),
    flushDebounceMs: 5,
    retryDelaysMs: [10, 20, 50, 100],
  });
  providers.push(p);
  return p;
}

const localStudent: StudentProfile = {
  studentId: 'stu-local-test', courseLevel: 'new-hsk-1',
  enrollmentDate: '2026-01-01', accountStatus: 'local',
};

function rec(over: Partial<LessonProgressRecord> & { lessonId: string }): LessonProgressRecord {
  return {
    studentId: 'x', status: 'in_progress', startedAt: null, lastActivityAt: null,
    completedAt: null, activeLearningSeconds: 0, completedVocabularyCount: 0,
    totalVocabularyCount: 0, completionPercentage: 0, ...over,
  };
}

function vocabRec(lessonId: string, vocabularyId: string, status: VocabularyProgressRecord['status']): VocabularyProgressRecord {
  const ts = new Date().toISOString();
  return {
    studentId: 'x', lessonId, vocabularyId, status,
    firstViewedAt: ts, lastReviewedAt: ts,
    markedCompletedAt: status === 'completed' ? ts : null,
  };
}

function ev(id: string, type: LearningEvent['eventType'], lessonId = 'hsk1-l01'): LearningEvent {
  return { eventId: id, studentId: 'x', sessionId: 'sess-t', lessonId, eventType: type, timestamp: new Date().toISOString() };
}

/* -------------------------------- tests -------------------------------- */

async function main(): Promise<void> {
  const backend = createMockBackend({
    students: [
      { name: 'أحمد', code: 'ABC123' },            // unicode name on purpose
      { name: 'Sara', code: 'XYZ789' },
    ],
  });

  /* --- 1. sign-in ----------------------------------------------------- */
  const storageA = makeStorage();
  const pA = newProvider(backend, storageA);

  let signInErr = '';
  try { await pA.signIn('أحمد', 'WRONG1'); } catch (e) { signInErr = e instanceof RemoteApiError ? e.code : '?'; }
  check('signIn rejects wrong code', signInErr === 'SIGN_IN_FAILED', signInErr);

  const profile = await pA.signIn(' أحمد ', 'abc123'); // trimmed + case-insensitive code
  check('signIn succeeds (name normalized, code case-insensitive)', profile.studentId === 'stu-0001', profile.studentId);
  check('session persisted to storage', loadRemoteSession(storageA)?.token.length === 64);
  check('provider signed in', pA.isSignedIn && pA.studentId === 'stu-0001');
  check('syncState synced after sign-in', pA.syncState === 'synced', pA.syncState);

  const all = await pA.getAllLessonProgress();
  check('cache seeded with all 15 lessons', all.length === 15);
  check('fresh account starts not_started', all.every((r) => r.status === 'not_started'));
  check('totalVocabularyCount comes from server content', all.find((r) => r.lessonId === 'hsk1-l01')?.totalVocabularyCount === 14);

  /* --- 2. reload simulation: init from stored session ------------------ */
  const pA2 = newProvider(backend, storageA);
  await pA2.init(localStudent);
  check('init restores signed-in session from storage', pA2.isSignedIn);
  check('init pulls cache (15 lessons)', (await pA2.getAllLessonProgress()).length === 15);

  /* --- 3. lesson progress + optimistic cache + flush ------------------- */
  await pA2.saveLessonProgress(rec({ lessonId: 'hsk1-l01', status: 'in_progress', activeLearningSeconds: 60, startedAt: new Date().toISOString(), lastActivityAt: new Date().toISOString() }));
  check('write is queued in outbox', pA2.pendingOps === 1);
  check('syncState pending while outbox non-empty', pA2.syncState === 'pending', pA2.syncState);
  check('read is optimistic (cache updated before ack)', (await pA2.getLessonProgress('hsk1-l01'))?.activeLearningSeconds === 60);
  await pA2.flush();
  check('flush acks → outbox empty', pA2.pendingOps === 0);
  check('syncState synced after ack', pA2.syncState === 'synced', pA2.syncState);
  const row1 = backend.lessonRow('stu-0001', 'hsk1-l01');
  check('server stored lesson row', !!row1 && row1.status === 'in_progress' && row1.activeLearningSeconds === 60);

  /* --- 4. server-side time clamping + monotonicity --------------------- */
  backend.advanceClock(10_000); // 10 s of wall-clock
  await pA2.saveLessonProgress(rec({ lessonId: 'hsk1-l01', status: 'in_progress', activeLearningSeconds: 60 + 100_000 }));
  await pA2.flush();
  const clampedSeconds = Number((backend.lessonRow('stu-0001', 'hsk1-l01') ?? {}).activeLearningSeconds);
  check('time jump clamped to wall-clock + margin (60+10+180=250)', clampedSeconds === 250, String(clampedSeconds));

  backend.advanceClock(1_000_000);
  await pA2.saveLessonProgress(rec({ lessonId: 'hsk1-l01', status: 'in_progress', activeLearningSeconds: 10 }));
  await pA2.flush();
  check('seconds never decrease (stale lower value ignored)', Number((backend.lessonRow('stu-0001', 'hsk1-l01') ?? {}).activeLearningSeconds) === 250);

  /* --- 5. vocabulary + derived recomputation --------------------------- */
  let vocabErr = '';
  const bad = await backend.request({ op: 'markVocabulary', token: loadRemoteSession(storageA)?.token, payload: { record: vocabRec('hsk1-l01', 'hsk1-l01-v99', 'completed') } });
  vocabErr = bad.ok ? '' : String(bad.error?.code);
  check('server rejects unknown vocabulary id', vocabErr === 'UNKNOWN_VOCABULARY', vocabErr);

  const l01vocab = backend.COURSE_DATA.lessons[0]!.vocabIds.slice(0, 7);
  for (const vid of l01vocab) await pA2.saveVocabularyProgress(vocabRec('hsk1-l01', vid, 'completed'));
  await pA2.flush();
  const derivedRow = backend.lessonRow('stu-0001', 'hsk1-l01') ?? {};
  check('server recomputes completedVocabularyCount (7)', Number(derivedRow.completedVocabularyCount) === 7, String(derivedRow.completedVocabularyCount));
  check('server recomputes percentage (7/14 = 50)', Number(derivedRow.completionPercentage) === 50, String(derivedRow.completionPercentage));
  const cached = await pA2.getLessonProgress('hsk1-l01');
  check('client cache patched with server-derived values after ack', cached?.completedVocabularyCount === 7 && cached.completionPercentage === 50);

  /* --- 6. completion + percentage override ------------------------------ */
  await pA2.saveLessonProgress(rec({ lessonId: 'hsk1-l01', status: 'completed', activeLearningSeconds: 250, completedAt: new Date().toISOString() }));
  await pA2.flush();
  check('completed lesson → 100%', Number((backend.lessonRow('stu-0001', 'hsk1-l01') ?? {}).completionPercentage) === 100);

  /* --- 7. quiz stats upsert keeps best ---------------------------------- */
  const quiz = (bestCorrect: number, attempts: number): QuizStats => ({ lessonId: 'hsk1-l01', bestCorrect, total: 14, attempts, lastAt: new Date().toISOString() });
  await pA2.saveQuizStats(quiz(8, 2));
  await pA2.flush();
  await pA2.saveQuizStats(quiz(5, 1)); // worse retry on another device
  await pA2.flush();
  const serverQuiz = (await pA2.getQuizStats('hsk1-l01')) ?? undefined;
  check('quiz keeps best score across upserts', serverQuiz?.bestCorrect === 8 && serverQuiz.attempts === 2, JSON.stringify(serverQuiz));

  /* --- 8. events: dedupe by eventId ------------------------------------- */
  const e1 = ev('evt-1', 'lesson_opened');
  await pA2.logEvents([e1]);
  await pA2.flush();
  await pA2.logEvents([e1, ev('evt-2', 'vocabulary_viewed')]); // evt-1 repeated
  await pA2.flush();
  const studentEvents = backend.db.events.filter((e) => e.studentId === 'stu-0001');
  check('duplicate eventId stored once (idempotency)', studentEvents.filter((e) => e.eventId === 'evt-1').length === 1);
  check('new event stored', studentEvents.some((e) => e.eventId === 'evt-2'));

  /* --- 9. offline → outbox persists → reconnect ------------------------- */
  backend.setOnline(false);
  await pA2.saveLessonProgress(rec({ lessonId: 'hsk1-l02', status: 'in_progress', activeLearningSeconds: 30 }));
  await pA2.flush(); // fails
  check('offline flush → syncState error', pA2.syncState === 'error', pA2.syncState);
  check('offline op stays queued', pA2.pendingOps === 1);
  const rawOutbox = storageA.getItem('hsk1.outbox.v1') ?? '';
  check('outbox persisted to storage (survives page close)', rawOutbox.includes('hsk1-l02'));
  backend.setOnline(true);
  await pA2.flush();
  check('reconnect flush lands the queued write', !!backend.lessonRow('stu-0001', 'hsk1-l02'));
  check('synced again after recovery', pA2.syncState === 'synced' && pA2.pendingOps === 0);

  /* --- 10. reload with pending ops: init drains outbox ------------------ */
  backend.setOnline(false);
  await pA2.saveLessonProgress(rec({ lessonId: 'hsk1-l03', status: 'in_progress', activeLearningSeconds: 45 }));
  await sleep(20); // let the debounced flush fail once
  const pA3 = newProvider(backend, storageA); // "page reload" while offline
  backend.setOnline(true);
  await pA3.init(localStudent);
  check('init after reload drains persisted outbox', !!backend.lessonRow('stu-0001', 'hsk1-l03'));
  check('outbox empty after drain', pA3.pendingOps === 0);

  /* --- 11. invalid token handling --------------------------------------- */
  const storageBad = makeStorage();
  saveRemoteSession(storageBad, {
    token: 'deadbeef'.repeat(8),
    student: { ...localStudent, studentId: 'stu-0001' },
  });
  const pBad = newProvider(backend, storageBad);
  let initErr: unknown = null;
  try { await pBad.init(localStudent); } catch (e) { initErr = e; }
  check('init with invalid token throws Unavailable', initErr instanceof ProgressProviderUnavailableError);
  check('needsSignIn flagged', pBad.needsSignIn === true);
  check('dead session cleared from storage', loadRemoteSession(storageBad) === null);

  /* --- 12. permanent server rejection doesn't jam the outbox ------------- */
  await pA3.saveLessonProgress(rec({ lessonId: 'hsk1-l99', status: 'in_progress' })); // unknown lesson
  await pA3.flush();
  check('permanently-rejected op dropped (queue not jammed)', pA3.pendingOps === 0);
  check('still synced after dropping poison op', pA3.syncState === 'synced', pA3.syncState);

  /* --- 13. migration of local snapshot ---------------------------------- */
  const ts = new Date(Date.now() - 86_400_000).toISOString();
  const snapshot = {
    lessons: {
      'hsk1-l04': rec({ lessonId: 'hsk1-l04', status: 'in_progress', activeLearningSeconds: 600, startedAt: ts, lastActivityAt: ts, totalVocabularyCount: 22 }),
    },
    vocabulary: {
      'hsk1-l04:hsk1-l04-v01': vocabRec('hsk1-l04', 'hsk1-l04-v01', 'completed'),
      'hsk1-l04:hsk1-l04-v02': vocabRec('hsk1-l04', 'hsk1-l04-v02', 'viewed'),
    },
    quiz: { 'hsk1-l04': { lessonId: 'hsk1-l04', bestCorrect: 9, total: 22, attempts: 3, lastAt: ts } },
    events: [ev('mig-1', 'lesson_opened', 'hsk1-l04'), ev('mig-2', 'vocabulary_marked_completed', 'hsk1-l04')],
  };
  const mig = await pA3.migrateLocalProgress('stu-local-old', snapshot);
  check('migration reports migrated', mig.migrated === true && mig.already === false);
  const m4 = backend.lessonRow('stu-0001', 'hsk1-l04') ?? {};
  check('migrated lesson row present with seconds', Number(m4.activeLearningSeconds) === 600, String(m4.activeLearningSeconds));
  check('migrated vocab counted (1 completed of 22)', Number(m4.completedVocabularyCount) === 1);
  check('migrated quiz imported', (await pA3.getQuizStats('hsk1-l04'))?.bestCorrect === 9);
  check('migrated events re-keyed to server studentId', backend.db.events.some((e) => e.eventId === 'mig-1' && e.studentId === 'stu-0001'));
  check('MigratedFromLocalID recorded', backend.studentRow('stu-0001')?.MigratedFromLocalID === 'stu-local-old');
  const mig2 = await pA3.migrateLocalProgress('stu-local-old', snapshot);
  check('second migration is idempotent (already:true)', mig2.already === true);
  check('no duplicate migrated events', backend.db.events.filter((e) => e.eventId === 'mig-1').length === 1);

  /* --- 14. second student isolation + outbox merge ----------------------- */
  const storageB = makeStorage();
  const pB = newProvider(backend, storageB);
  const sara = await pB.signIn('Sara', 'XYZ789');
  check('second student signs in', sara.studentId === 'stu-0002');
  await pB.saveLessonProgress(rec({ lessonId: 'hsk1-l01', status: 'in_progress', activeLearningSeconds: 11 }));
  await pB.saveLessonProgress(rec({ lessonId: 'hsk1-l01', status: 'in_progress', activeLearningSeconds: 22 })); // same lesson again
  check('outbox merges same-lesson writes (latest wins)', pB.pendingOps === 1, String(pB.pendingOps));
  await pB.flush();
  check('merged write landed with latest value', Number((backend.lessonRow('stu-0002', 'hsk1-l01') ?? {}).activeLearningSeconds) === 22);
  const saraLessons = await pB.getAllLessonProgress();
  check('student B cannot see student A progress', saraLessons.find((r) => r.lessonId === 'hsk1-l01')?.status === 'in_progress' && saraLessons.every((r) => r.completedVocabularyCount === 0));

  /* --- 15. teacher channel: no code needed, but POST path is blocked ---- */
  const viaPost = backend.request({ op: 'teacherListStudents' });
  check('teacher op via public POST endpoint blocked (FORBIDDEN)', !viaPost.ok && viaPost.error?.code === 'FORBIDDEN');
  const tToken = loadRemoteSession(storageB)?.token;
  const forbidden = backend.request({ op: 'teacherListStudents', token: tToken });
  check('teacher op blocked even WITH a student token', !forbidden.ok && forbidden.error?.code === 'FORBIDDEN');

  const dupAdd = backend.dashboardRequest({ op: 'teacherAddStudent', payload: { name: 'sara' } });
  check('duplicate student name rejected', !dupAdd.ok && dupAdd.error?.code === 'DUPLICATE_STUDENT');
  const added = backend.dashboardRequest({ op: 'teacherAddStudent', payload: { name: 'Lina' } }) as { ok: boolean; data?: { studentId: string; accessCode: string } };
  check('teacherAddStudent creates id + code (no teacher code needed)', added.ok && added.data?.studentId === 'stu-0003' && !!added.data?.accessCode);

  const list = backend.dashboardRequest({ op: 'teacherListStudents' }) as { ok: boolean; data?: { students: Array<Record<string, unknown>> } };
  const byName = Object.fromEntries((list.data?.students ?? []).map((s) => [String(s.studentName), s]));
  check('list: 3 students', (list.data?.students ?? []).length === 3);
  check('list includes access codes (teacher-only view)', String(byName['أحمد']?.accessCode ?? '') === 'ABC123');
  check('list: أحمد progressing with 1 completed lesson', byName['أحمد']?.bucket === 'progressing' && byName['أحمد']?.lessonsCompleted === 1, JSON.stringify(byName['أحمد']));
  check('list: Sara progressing', byName['Sara']?.bucket === 'progressing');
  check('list: Lina not_started', byName['Lina']?.bucket === 'not_started');
  check('list: أحمد active seconds aggregated (≥250+600)', Number(byName['أحمد']?.totalActiveSeconds) >= 850, String(byName['أحمد']?.totalActiveSeconds));
  check('list: أحمد vocab completed counted (8: 7 in l01 + 1 migrated)', Number(byName['أحمد']?.vocabularyCompleted) === 8, String(byName['أحمد']?.vocabularyCompleted));

  const report = backend.dashboardRequest({ op: 'teacherStudentReport', payload: { studentId: 'stu-0001' } }) as { ok: boolean; data?: { lessons: unknown[]; recentEvents: unknown[]; quiz: unknown[] } };
  check('report: 15 lesson rows', report.ok && (report.data?.lessons ?? []).length === 15);
  check('report: recent events include migrated event', (report.data?.recentEvents as Array<Record<string, unknown>>).some((e) => e.eventId === 'mig-1'));
  check('report: quiz stats included', (report.data?.quiz ?? []).length === 2);

  const overview = backend.dashboardRequest({ op: 'teacherCourseOverview' }) as { ok: boolean; data?: { perLesson: Array<Record<string, unknown>>; inactiveStudents: unknown[] } };
  const l01 = (overview.data?.perLesson ?? []).find((l) => l.lessonId === 'hsk1-l01');
  check('overview: lesson 1 started by 2, completed by 1', l01?.started === 2 && l01?.completed === 1, JSON.stringify(l01));
  check('overview: Lina flagged inactive (never active)', (overview.data?.inactiveStudents as Array<Record<string, unknown>>).some((s) => s.studentId === 'stu-0003'));

  /* --- 15b. sign-in carries migration in ONE round trip ----------------- */
  const linaCode = String(added.data?.accessCode ?? '');
  const storageL = makeStorage();
  const pL = newProvider(backend, storageL);
  const linaSnap = {
    lessons: {
      'hsk1-l06': rec({ lessonId: 'hsk1-l06', status: 'in_progress', activeLearningSeconds: 120, startedAt: new Date().toISOString(), lastActivityAt: new Date().toISOString() }),
    },
    vocabulary: {
      'hsk1-l06:hsk1-l06-v01': vocabRec('hsk1-l06', 'hsk1-l06-v01', 'completed'),
    },
    quiz: {},
    events: [ev('lina-ev-1', 'lesson_opened', 'hsk1-l06')],
  };
  const lina = await pL.signIn('Lina', linaCode, { localStudentId: 'stu-local-lina', snapshot: linaSnap });
  check('merged sign-in: migration reported in same response', lina.migratedFromLocalId === 'stu-local-lina', String(lina.migratedFromLocalId));
  check('merged sign-in: server row migrated', backend.studentRow('stu-0003')?.MigratedFromLocalID === 'stu-local-lina');
  check('merged sign-in: lesson data present immediately (no extra call)', Number((backend.lessonRow('stu-0003', 'hsk1-l06') ?? {}).activeLearningSeconds) === 120);
  check('merged sign-in: cache seeded from response', (await pL.getLessonProgress('hsk1-l06'))?.activeLearningSeconds === 120);
  check('merged sign-in: vocab migrated + derived recomputed', Number((backend.lessonRow('stu-0003', 'hsk1-l06') ?? {}).completedVocabularyCount) === 1);
  check('merged sign-in: event re-keyed to server id', backend.db.events.some((e) => e.eventId === 'lina-ev-1' && e.studentId === 'stu-0003'));

  /* --- 16. Outbox unit semantics ---------------------------------------- */
  const mem = makeStorage();
  const ob = new Outbox(mem);
  ob.enqueue('updateLessonProgress', { record: { lessonId: 'hsk1-l05', activeLearningSeconds: 1 } });
  ob.enqueue('updateLessonProgress', { record: { lessonId: 'hsk1-l05', activeLearningSeconds: 2 } });
  ob.enqueue('markVocabulary', { record: { lessonId: 'hsk1-l05', vocabularyId: 'v1' } });
  check('outbox: same-lesson merge keeps one op', ob.length === 2, String(ob.length));
  check('outbox: merged payload is latest', JSON.stringify(ob.peek()[0]?.payload).includes('"activeLearningSeconds":2'));
  ob.enqueue('logEvents', { events: [ev('a', 'lesson_opened', 'hsk1-l05'), ev('b', 'lesson_opened', 'hsk1-l05')] });
  ob.enqueue('logEvents', { events: [ev('b', 'lesson_opened', 'hsk1-l05'), ev('c', 'lesson_opened', 'hsk1-l05')] });
  check('outbox: event batches merge + dedupe', JSON.stringify(ob.peek().find((o) => o.op === 'logEvents')?.payload).split('eventId').length - 1 === 3);
  const chunk = ob.peekEventsChunk(2);
  check('outbox: chunking respects size', chunk?.length === 2);
  ob.ackEventsChunk(2);
  ob.ackEventsChunk(1);
  check('outbox: empty event batch removed', ob.peek().every((o) => o.op !== 'logEvents'));
  ob.ackFirst();
  check('outbox: ackFirst removes head', ob.length === 1);
  const ob2 = new Outbox(mem);
  check('outbox: reload from storage preserves queue', ob2.length === 1);

  /* --- 17. sign-out clears session + best-effort flush ------------------- */
  await pB.saveLessonProgress(rec({ lessonId: 'hsk1-l02', status: 'in_progress', activeLearningSeconds: 5 }));
  await pB.signOut();
  check('signOut clears stored session', loadRemoteSession(storageB) === null);
  check('signOut best-effort flushed pending write', !!backend.lessonRow('stu-0002', 'hsk1-l02'));
  check('signOut → provider no longer signed in', !pB.isSignedIn);

  /* ================================================================== */
  /* App-level integration: REAL bootstrap + REAL UI (jsdom) + mock net  */
  /* ================================================================== */

  const { JSDOM } = await import('jsdom');
  const dom = new JSDOM('<!doctype html><html><body><div id="app"></div></body></html>', {
    url: 'http://localhost/',
    pretendToBeVisual: true,
  });
  const win = dom.window;
  const mediaProto = (win as unknown as { HTMLMediaElement: { prototype: Record<string, unknown> } }).HTMLMediaElement.prototype;
  mediaProto.play = function () { return Promise.resolve(); };
  mediaProto.pause = function () {};
  mediaProto.load = function () {};
  win.scrollTo = () => {};
  const g = globalThis as Record<string, unknown>;
  for (const key of [
    'window', 'document', 'navigator', 'localStorage', 'sessionStorage', 'location',
    'HTMLElement', 'HTMLInputElement', 'HTMLSelectElement', 'Element', 'Node', 'Event',
    'CustomEvent', 'getComputedStyle', 'requestAnimationFrame', 'cancelAnimationFrame', 'Audio',
  ] as const) {
    Object.defineProperty(g, key, { value: (win as unknown as Record<string, unknown>)[key], configurable: true, writable: true });
  }
  const doc = win.document;
  const $ = (sel: string): NodeListOf<Element> => doc.querySelectorAll(sel);
  const one = (sel: string): Element | null => doc.querySelector(sel);
  const waitFor = async (fn: () => boolean, timeoutMs = 6000): Promise<boolean> => {
    const t0 = Date.now();
    while (Date.now() - t0 < timeoutMs) {
      if (fn()) return true;
      await sleep(30);
    }
    return fn();
  };
  const go = async (hash: string): Promise<void> => {
    win.location.hash = hash;
    await sleep(40);
    win.dispatchEvent(new win.Event('hashchange'));
  };

  const backend2 = createMockBackend({ students: [{ name: 'Lina', code: 'LNX999' }] });
  (globalThis as Record<string, unknown>).fetch = fetchFor(backend2);

  // Pre-seed a device-local learner with real progress (the migration source).
  const ts0 = new Date(Date.now() - 3_600_000).toISOString();
  win.localStorage.setItem('hsk1.identity.v1', JSON.stringify({
    studentId: 'stu-local-mig', courseLevel: 'new-hsk-1', enrollmentDate: '2026-01-01', accountStatus: 'local',
  }));
  win.localStorage.setItem('hsk1.progress.v1', JSON.stringify({
    version: 1, studentId: 'stu-local-mig',
    lessons: {
      'hsk1-l05': rec({ studentId: 'stu-local-mig', lessonId: 'hsk1-l05', status: 'in_progress', activeLearningSeconds: 300, startedAt: ts0, lastActivityAt: ts0 }),
    },
    vocabulary: {
      'hsk1-l05:hsk1-l05-v01': { studentId: 'stu-local-mig', lessonId: 'hsk1-l05', vocabularyId: 'hsk1-l05-v01', status: 'completed', firstViewedAt: ts0, lastReviewedAt: ts0, markedCompletedAt: ts0 },
    },
    events: [{ eventId: 'ui-ev-1', studentId: 'stu-local-mig', sessionId: 's', lessonId: 'hsk1-l05', eventType: 'lesson_opened', timestamp: ts0 }],
    quiz: {},
  }));

  // Switch the build config to remote mode BEFORE importing bootstrap.
  const { appConfig } = await import('../src/config');
  (appConfig.progress as { provider: string; remoteEndpoint: string }).provider = 'remote';
  (appConfig.progress as { provider: string; remoteEndpoint: string }).remoteEndpoint = 'https://mock.example/exec';

  const { bootstrap } = await import('../src/bootstrap');
  const boot = await bootstrap({ root: doc.getElementById('app')!, manifest: {} });

  check('app boots to local fallback when signed out (remote build)', boot.provider.kind === 'local' && boot.auth.mode === 'remote' && !boot.auth.signedIn);
  check('GATE: mandatory sign-in gate is shown', await waitFor(() => $('.gate-root').length === 1));
  check('GATE: no course content or header leaks before sign-in', $('.lesson-card').length === 0 && $('.app-header').length === 0);

  // Wrong code must keep the gate closed and explain itself.
  const nameEl = doc.getElementById('signin-name') as HTMLInputElement;
  const codeEl = doc.getElementById('signin-code') as HTMLInputElement;
  nameEl.value = 'Lina';
  nameEl.dispatchEvent(new win.Event('input'));
  codeEl.value = 'WRONG1';
  codeEl.dispatchEvent(new win.Event('input'));
  ($('.gate-submit')[0] as HTMLElement).click();
  check('GATE: wrong code shows inline error, site stays locked', await waitFor(() =>
    (one('.signin-error')?.textContent ?? '').length > 0 && $('.gate-root').length === 1 && !boot.auth.signedIn));

  // Correct code (lowercase on purpose — server normalizes).
  codeEl.value = 'lnx999';
  codeEl.dispatchEvent(new win.Event('input'));
  ($('.gate-submit')[0] as HTMLElement).click();

  check('auth.signIn flips state', await waitFor(() => boot.auth.signedIn));
  check('GATE: full site renders after sign-in', await waitFor(() => $('.lesson-card').length === 15));
  check('GATE: gate removed after sign-in', $('.gate-root').length === 0);
  check('header shows account chip after sign-in', await waitFor(() => $('.auth-chip').length === 1));
  check('chip links to the profile page', one('.auth-chip')?.getAttribute('href') === '#/me');
  check('ctx.progress swapped to remote provider', boot.ctx.progress.provider.kind === 'remote');
  check('progress now carries server identity', boot.ctx.progress.student.studentId === 'stu-0001');
  check('local snapshot migrated to the account', await waitFor(() =>
    !!backend2.lessonRow('stu-0001', 'hsk1-l05') &&
    backend2.studentRow('stu-0001')?.MigratedFromLocalID === 'stu-local-mig'));
  check('badge becomes synced (migration + events acked)', await waitFor(() =>
    one('[data-sync-badge]')?.getAttribute('data-sync-badge') === 'synced'),
  String(one('[data-sync-badge]')?.getAttribute('data-sync-badge')));

  // Profile page (#/me): totals + per-lesson breakdown.
  await go('#/me');
  check('PROFILE: renders 15 lesson rows', await waitFor(() => $('.profile-row').length === 15));
  check('PROFILE: KPI cards present (lessons, %, words, time, last activity)', $('.stat-card').length >= 5);
  const l05row = one('.profile-row[data-lesson-id="hsk1-l05"]');
  check('PROFILE: migrated lesson shows its time (5m)', !!l05row && (l05row.textContent ?? '').includes('5m'));
  check('PROFILE: student name shown', (one('.profile')?.textContent ?? '').includes('Lina'));
  check('PROFILE: sign-out button present', $('.signout-big').length === 1);

  // Study lesson 1 through the real UI.
  await go('#/lesson/hsk1-l01');
  check('lesson view renders (14 word cards)', await waitFor(() => $('.word-card').length === 14));
  check('openLesson reached the server', await waitFor(() =>
    backend2.lessonRow('stu-0001', 'hsk1-l01')?.status === 'in_progress'));
  ($('.chip-mastered-toggle')[0] as HTMLElement).click(); // mark first word mastered
  check('mastered click reached the server', await waitFor(() =>
    backend2.vocabRow('stu-0001', 'hsk1-l01', backend2.COURSE_DATA.lessons[0]!.vocabIds[0]!)?.status === 'completed'));
  check('learning events reach the server', await waitFor(() =>
    backend2.db.events.some((e) => e.studentId === 'stu-0001' && e.eventType === 'lesson_opened' && e.lessonId === 'hsk1-l01')));
  check('server recomputed lesson percentage after mastered click', await waitFor(() => {
    const row = backend2.lessonRow('stu-0001', 'hsk1-l01') ?? {};
    return Number(row.completedVocabularyCount) === 1 && Number(row.completionPercentage) === 7; // 1/14
  }), JSON.stringify(backend2.lessonRow('stu-0001', 'hsk1-l01')));

  // Sign out through the header chip → the gate must lock the site again.
  ($('.auth-signout')[0] as HTMLElement).click();
  check('sign-out flips auth state', await waitFor(() => !boot.auth.signedIn));
  check('GATE returns after sign-out', await waitFor(() => $('.gate-root').length === 1));
  check('course content inaccessible again after sign-out', $('.lesson-card').length === 0 && $('.app-header').length === 0);

  boot.remote?.destroy();
  win.close();
}

main()
  .then(async () => {
    for (const p of providers) p.destroy();
    await sleep(30);
    console.log(`\n${passed} passed, ${failures.length} failed.`);
    if (failures.length) {
      for (const f of failures) console.error(f);
      console.log('REMOTE TESTS FAILED');
      process.exit(1);
    }
    console.log('REMOTE OK');
    process.exit(0);
  })
  .catch(async (err) => {
    for (const p of providers) p.destroy();
    console.error('UNHANDLED:', err);
    process.exit(1);
  });
