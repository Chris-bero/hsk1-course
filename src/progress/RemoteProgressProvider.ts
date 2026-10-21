/**
 * RemoteProgressProvider — Phase 2: progress that reaches the teacher.
 *
 * Talks ONLY to the Google Apps Script web-app endpoint (never to the Sheets
 * API, never with privileged credentials — docs/PHASE2_INTEGRATION.md §1-§2).
 *
 * Design:
 *  - Auth: teacher-issued name + access code (signIn) → random session token
 *    persisted in localStorage (raw on the client; the server stores only its
 *    SHA-256 hash). A studentId in localStorage is NOT authentication — the
 *    server derives identity from the token on EVERY op.
 *  - Reads are served from an in-memory cache seeded by one batched
 *    `getCourseProgress` call at init (lessons + vocabulary + quiz).
 *  - Writes are optimistic: cache updated immediately, op persisted to the
 *    Outbox (survives page close/offline), then flushed in order. Server acks
 *    patch the cache with authoritative values (clamped seconds, recomputed
 *    derived fields).
 *  - syncState is honest: 'pending' while the outbox is non-empty, 'error'
 *    after failed flush attempts, 'synced' only after server acks.
 *  - Idempotency: events carry client UUIDs; the server dedupes by EventID,
 *    so at-least-once flushing is safe.
 */
import { appConfig } from '../config';
import type {
  LearningEvent,
  LessonProgressRecord,
  QuizStats,
  StudentProfile,
  SyncState,
  VocabularyProgressRecord,
} from '../types/progress';
import { loadRemoteSession, saveRemoteSession, clearRemoteSession } from '../services/identity';
import { ProgressProviderUnavailableError, type ProgressProvider } from './ProgressProvider';
import { Outbox } from './outbox';

/* ----------------------------- wire types ----------------------------- */

interface Envelope<T> {
  ok: boolean;
  data?: T;
  error?: { code: string; message: string };
}

export class RemoteApiError extends Error {
  constructor(
    readonly code: string,
    message: string,
  ) {
    super(message);
    this.name = 'RemoteApiError';
  }
}

/** Server student profile (StudentProfile + migration marker). */
export type RemoteStudent = StudentProfile & { migratedFromLocalId?: string | null };

interface SignInResponse {
  token: string;
  student: RemoteStudent;
  /** Server-side merged cache (lessons + vocabulary + quiz) — sign-in is ONE round trip. */
  courseProgress?: CourseProgressResponse;
  /** Present when the client attached a local snapshot to the sign-in request. */
  migration?: MigrateResponse;
}

interface CourseProgressResponse {
  studentId: string;
  lessons: LessonProgressRecord[];
  vocabulary: VocabularyProgressRecord[];
  quiz: QuizStats[];
}

interface MarkVocabResponse {
  vocabularyId: string;
  status: string;
  lessonDerived: { completedVocabularyCount: number; completionPercentage: number };
}

interface MigrateResponse {
  migrated: boolean;
  already: boolean;
  queued?: boolean;
  imported?: { lessons: number; vocabulary: number; quiz: number; events: number };
}

/** Minimal fetch surface (tests inject a fake; browsers/Node provide the real one). */
export type FetchLike = (
  url: string,
  init: { method: string; body: string; headers: Record<string, string> },
) => Promise<{ ok: boolean; status: number; json: () => Promise<unknown> }>;

export interface RemoteProviderOptions {
  /** Where the session + outbox live. Null → memory-only (sandboxed previews). */
  storage?: Storage | null;
  /** Test injection point. Defaults to globalThis.fetch. */
  fetchImpl?: FetchLike;
  /** Retry backoff schedule after failed flushes (ms). */
  retryDelaysMs?: number[];
  /** Debounce before an enqueued write triggers a flush (ms). */
  flushDebounceMs?: number;
  /** Called when syncState actually changes (header badge live-update). */
  onStateChanged?: (state: SyncState) => void;
}

const DEFAULT_RETRIES = [5_000, 15_000, 45_000, 120_000, 300_000];
const EVENT_CHUNK = 200;
const MAX_OPS_PER_FLUSH = 200;

/**
 * Server rejections that will NEVER succeed on retry (validation, unknown
 * ids, missing config). Such ops are dropped with a warning instead of
 * jamming the outbox forever — a jammed queue would pin the badge to
 * 'error' and silently block all later writes (dishonest + data loss).
 */
const PERMANENT_ERROR_CODES = new Set([
  'BAD_REQUEST', 'UNKNOWN_LESSON', 'UNKNOWN_VOCABULARY', 'UNKNOWN_OP', 'NOT_CONFIGURED', 'FORBIDDEN',
]);

export class RemoteProgressProvider implements ProgressProvider {
  readonly kind = 'remote' as const;

  private session: { token: string; student: RemoteStudent } | null = null;
  private storage: Storage | null;
  private fetchImpl: FetchLike;
  private outbox: Outbox;

  private lessons = new Map<string, LessonProgressRecord>();
  private vocab = new Map<string, Map<string, VocabularyProgressRecord>>();
  private quiz = new Map<string, QuizStats>();
  private cacheReady = false;

  private flushing = false;
  private consecutiveFailures = 0;
  private lastError: unknown = null;
  private flushTimer: ReturnType<typeof setTimeout> | null = null;
  private retryTimer: ReturnType<typeof setTimeout> | null = null;
  private periodicTimer: ReturnType<typeof setInterval> | null = null;
  private lastEmittedState: SyncState | null = null;

  /** True after the server rejected our token (INVALID_TOKEN) — UI must offer sign-in. */
  needsSignIn = false;

  private retryDelays: number[];
  private flushDebounceMs: number;
  private onStateChanged?: (state: SyncState) => void;

  constructor(
    /** Apps Script web-app URL. Public by design — NOT a secret, NOT auth. */
    private endpointUrl: string,
    opts: RemoteProviderOptions = {},
  ) {
    this.storage = opts.storage ?? null;
    const f = opts.fetchImpl ?? (globalThis as { fetch?: FetchLike }).fetch;
    if (!f) throw new ProgressProviderUnavailableError('This environment has no fetch(); remote progress is unavailable.');
    this.fetchImpl = f.bind(globalThis);
    this.retryDelays = opts.retryDelaysMs ?? DEFAULT_RETRIES;
    this.flushDebounceMs = opts.flushDebounceMs ?? 800;
    this.onStateChanged = opts.onStateChanged;
    this.session = loadRemoteSession(this.storage);
    this.outbox = new Outbox(this.storage, () => this.emitState(), appConfig.storageKeys.outbox);
    if (typeof window !== 'undefined') {
      window.addEventListener('online', () => this.scheduleFlush());
      this.periodicTimer = setInterval(() => {
        if (!this.outbox.isEmpty() && !this.flushing) void this.flush();
      }, 60_000);
    }
  }

  /* ------------------------------ state ------------------------------ */

  get syncState(): SyncState {
    if (!this.session || this.needsSignIn) return 'error';
    if (!this.outbox.isEmpty()) return this.consecutiveFailures > 0 ? 'error' : 'pending';
    return this.consecutiveFailures > 0 ? 'error' : 'synced';
  }

  get isSignedIn(): boolean {
    return this.session !== null && !this.needsSignIn;
  }

  get profile(): RemoteStudent | null {
    return this.session?.student ?? null;
  }

  get studentId(): string {
    return this.session?.student.studentId ?? '';
  }

  private emitState(): void {
    const s = this.syncState;
    if (s !== this.lastEmittedState) {
      this.lastEmittedState = s;
      this.onStateChanged?.(s);
    }
  }

  /* ------------------------------ transport ------------------------------ */

  private async post<T>(op: string, payload: Record<string, unknown> = {}): Promise<T> {
    let res: { ok: boolean; status: number; json: () => Promise<unknown> };
    try {
      // text/plain keeps this a CORS "simple request" (no preflight) — the
      // Apps Script endpoint parses the JSON body itself.
      res = await this.fetchImpl(this.endpointUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ op, token: this.session?.token ?? '', payload }),
      });
    } catch (err) {
      throw new RemoteApiError('NETWORK', err instanceof Error ? err.message : String(err));
    }
    let env: Envelope<T>;
    try {
      env = (await res.json()) as Envelope<T>;
    } catch {
      throw new RemoteApiError('BAD_RESPONSE', `Endpoint returned non-JSON (HTTP ${res.status}). Is the URL the /exec web-app link?`);
    }
    if (!env || typeof env !== 'object') throw new RemoteApiError('BAD_RESPONSE', 'Malformed envelope from endpoint.');
    if (!env.ok) {
      const code = env.error?.code ?? 'UNKNOWN';
      const message = env.error?.message ?? 'Request failed';
      if (code === 'INVALID_TOKEN') {
        this.needsSignIn = true;
        this.session = null;
        clearRemoteSession(this.storage);
        this.emitState();
      }
      throw new RemoteApiError(code, message);
    }
    return env.data as T;
  }

  /* ------------------------------ lifecycle ------------------------------ */

  /**
   * Handshake: verify the stored session, pull server state into the cache,
   * drain any ops left in the outbox from a previous visit.
   * Rejects with ProgressProviderUnavailableError when not signed in or the
   * backend is unreachable — bootstrap then falls back to local storage.
   */
  async init(_student: StudentProfile): Promise<void> {
    if (!this.endpointUrl) {
      throw new ProgressProviderUnavailableError('progress.remoteEndpoint is empty — set the Apps Script /exec URL in src/config.ts.');
    }
    if (!this.session) {
      throw new ProgressProviderUnavailableError('Not signed in yet (no stored session token).');
    }
    try {
      // ONE call: getCourseProgress returns the profile too (server-side merge).
      await this.pullCache();
      this.needsSignIn = false;
      this.emitState();
      if (!this.outbox.isEmpty()) await this.flush();
    } catch (err) {
      if (err instanceof RemoteApiError && err.code === 'INVALID_TOKEN') {
        throw new ProgressProviderUnavailableError('Session expired or account removed — please sign in again.');
      }
      if (err instanceof RemoteApiError && err.code === 'NETWORK') {
        // Offline at boot with a valid stored session: serve from the outbox
        // era — cache empty but writable; retry in background. Do NOT fall
        // back to local (that would fork the student's data).
        console.warn('[remote] offline during init — continuing with empty cache, will retry.');
        this.cacheReady = false;
        this.scheduleRetry();
        this.emitState();
        return;
      }
      throw err instanceof Error ? err : new Error(String(err));
    }
  }

  private seedCache(data: CourseProgressResponse): void {
    this.lessons.clear();
    this.vocab.clear();
    this.quiz.clear();
    for (const rec of data.lessons) this.lessons.set(rec.lessonId, rec);
    for (const v of data.vocabulary) {
      let m = this.vocab.get(v.lessonId);
      if (!m) { m = new Map(); this.vocab.set(v.lessonId, m); }
      m.set(v.vocabularyId, v);
    }
    for (const q of data.quiz) this.quiz.set(q.lessonId, q);
    this.cacheReady = true;
  }

  private async pullCache(): Promise<void> {
    const data = await this.post<CourseProgressResponse & { student?: RemoteStudent }>('getCourseProgress');
    this.seedCache(data);
    if (data.student && this.session) {
      this.session = { token: this.session.token, student: data.student };
      saveRemoteSession(this.storage, this.session);
    }
  }

  /**
   * Fire-and-forget ping that wakes the Apps Script instance up WHILE the
   * student is still typing at the gate, so the cold start (which can take
   * seconds) doesn't land on the sign-in click. Never throws.
   */
  warmUp(): void {
    if (!this.endpointUrl) return;
    this.post('ping').catch(() => undefined);
  }

  /**
   * Student sign-in (teacher-issued name + code) — ONE round trip: the server
   * verifies credentials, issues the token, merges the optional local
   * snapshot (migration) and returns the full course cache in the same
   * response. Throws RemoteApiError on failure.
   */
  async signIn(
    name: string,
    code: string,
    migration?: { localStudentId: string; snapshot: unknown },
  ): Promise<RemoteStudent> {
    if (!this.endpointUrl) throw new RemoteApiError('NOT_CONFIGURED', 'remoteEndpoint is empty.');
    // Ops queued for a DIFFERENT account must never leak into this one.
    const prevId = this.session?.student.studentId;
    const token = this.session?.token;
    this.session = null; // signIn op needs no token
    const res = await this.post<SignInResponse>('signIn', {
      name,
      code,
      ...(migration ? { migrate: migration } : {}),
    });
    this.session = { token: res.token, student: res.student };
    saveRemoteSession(this.storage, { token: res.token, student: res.student });
    if (prevId && prevId !== res.student.studentId && token !== res.token) {
      this.outbox.clear();
    }
    this.needsSignIn = false;
    this.consecutiveFailures = 0;
    this.lastError = null;
    if (res.courseProgress) this.seedCache(res.courseProgress);
    else await this.pullCache();
    this.emitState();
    if (!this.outbox.isEmpty()) this.scheduleFlush();
    return res.student;
  }

  /** Best-effort final flush, then drop the session (queued-but-unsent ops are cleared). */
  async signOut(): Promise<void> {
    if (this.session && !this.outbox.isEmpty()) {
      await Promise.race([this.flush(), new Promise((r) => setTimeout(r, 4_000))]);
    }
    this.session = null;
    this.needsSignIn = false;
    clearRemoteSession(this.storage);
    this.outbox.clear();
    this.lessons.clear();
    this.vocab.clear();
    this.quiz.clear();
    this.cacheReady = false;
    if (this.flushTimer) { clearTimeout(this.flushTimer); this.flushTimer = null; }
    if (this.retryTimer) { clearTimeout(this.retryTimer); this.retryTimer = null; }
    this.emitState();
  }

  /* ------------------------------ reads ------------------------------ */

  async getLessonProgress(lessonId: string): Promise<LessonProgressRecord | null> {
    await this.ensureCache();
    return this.lessons.get(lessonId) ?? null;
  }

  async getAllLessonProgress(): Promise<LessonProgressRecord[]> {
    await this.ensureCache();
    return [...this.lessons.values()];
  }

  async getVocabularyProgress(lessonId: string): Promise<VocabularyProgressRecord[]> {
    await this.ensureCache();
    return [...(this.vocab.get(lessonId)?.values() ?? [])];
  }

  async getQuizStats(lessonId: string): Promise<QuizStats | null> {
    await this.ensureCache();
    return this.quiz.get(lessonId) ?? null;
  }

  async getAllQuizStats(): Promise<Record<string, QuizStats>> {
    await this.ensureCache();
    return Object.fromEntries(this.quiz);
  }

  private async ensureCache(): Promise<void> {
    if (this.cacheReady) return;
    try {
      await this.pullCache();
    } catch (err) {
      // Offline read: proceed with whatever we have (possibly nothing) rather
      // than breaking the UI; the retry loop keeps trying in the background.
      console.warn('[remote] cache pull failed, serving partial cache:', err);
      this.scheduleRetry();
    }
  }

  /* ------------------------------ writes ------------------------------ */

  async saveLessonProgress(record: LessonProgressRecord): Promise<void> {
    this.lessons.set(record.lessonId, { ...record });
    this.outbox.enqueue('updateLessonProgress', { record });
    this.emitState();
    this.scheduleFlush();
  }

  async saveVocabularyProgress(record: VocabularyProgressRecord): Promise<void> {
    let m = this.vocab.get(record.lessonId);
    if (!m) { m = new Map(); this.vocab.set(record.lessonId, m); }
    m.set(record.vocabularyId, { ...record });
    this.outbox.enqueue('markVocabulary', { record });
    this.emitState();
    this.scheduleFlush();
  }

  async saveQuizStats(stats: QuizStats): Promise<void> {
    this.quiz.set(stats.lessonId, { ...stats });
    this.outbox.enqueue('saveQuizStats', { stats });
    this.emitState();
    this.scheduleFlush();
  }

  async logEvents(events: LearningEvent[]): Promise<void> {
    if (!events.length) return;
    this.outbox.enqueue('logEvents', { events });
    this.emitState();
    this.scheduleFlush();
  }

  /**
   * One-time local → remote migration (docs §2 item 3). Tries immediately;
   * when offline it stays queued in the outbox and lands after reconnect.
   */
  async migrateLocalProgress(
    localStudentId: string,
    snapshot: { lessons?: Record<string, LessonProgressRecord>; vocabulary?: Record<string, VocabularyProgressRecord>; quiz?: Record<string, QuizStats>; events?: LearningEvent[] },
  ): Promise<MigrateResponse> {
    if (this.session?.student.migratedFromLocalId === localStudentId) {
      return { migrated: false, already: true };
    }
    const payload = { localStudentId, snapshot };
    try {
      const res = await this.post<MigrateResponse>('migrateLocalProgress', payload);
      if (this.session && res.migrated) {
        this.session.student.migratedFromLocalId = localStudentId;
        saveRemoteSession(this.storage, this.session);
      }
      await this.pullCache().catch(() => undefined);
      this.emitState();
      return res;
    } catch (err) {
      if (err instanceof RemoteApiError && err.code === 'NETWORK') {
        this.outbox.enqueue('migrateLocalProgress', payload);
        this.emitState();
        this.scheduleFlush();
        return { migrated: false, already: false, queued: true };
      }
      throw err;
    }
  }

  /* ------------------------------ flushing ------------------------------ */

  private scheduleFlush(): void {
    if (this.flushTimer !== null) return;
    this.flushTimer = setTimeout(() => {
      this.flushTimer = null;
      void this.flush();
    }, this.flushDebounceMs);
  }

  private scheduleRetry(): void {
    if (this.retryTimer !== null || this.flushTimer !== null) return;
    const delay = this.retryDelays[Math.min(this.consecutiveFailures, this.retryDelays.length - 1)] ?? 60_000;
    this.retryTimer = setTimeout(() => {
      this.retryTimer = null;
      void this.flush();
    }, delay);
  }

  /** Send queued ops in order; stop at the first failure (order matters). */
  async flush(): Promise<void> {
    if (this.flushing || !this.session || this.needsSignIn) return;
    if (this.outbox.isEmpty()) {
      if (this.consecutiveFailures === 0 && this.lastEmittedState !== 'synced') this.emitState();
      return;
    }
    this.flushing = true;
    this.emitState();
    try {
      let guard = 0;
      while (!this.outbox.isEmpty() && guard++ < MAX_OPS_PER_FLUSH) {
        const op = this.outbox.peek()[0]!;
        try {
          if (op.op === 'logEvents') {
            const chunk = this.outbox.peekEventsChunk(EVENT_CHUNK);
            if (!chunk || chunk.length === 0) {
              this.outbox.ackFirst();
              continue;
            }
            await this.post('logEvents', { events: chunk });
            this.outbox.ackEventsChunk(chunk.length);
          } else if (op.op === 'updateLessonProgress') {
            const merged = await this.post<LessonProgressRecord>('updateLessonProgress', op.payload);
            this.outbox.ackFirst();
            if (merged && merged.lessonId) this.lessons.set(merged.lessonId, merged); // server truth (clamped)
          } else if (op.op === 'markVocabulary') {
            const res = await this.post<MarkVocabResponse>('markVocabulary', op.payload);
            this.outbox.ackFirst();
            const rec = (op.payload.record ?? op.payload) as Partial<VocabularyProgressRecord>;
            if (res?.lessonDerived && rec.lessonId) {
              const lesson = this.lessons.get(rec.lessonId);
              if (lesson && lesson.status !== 'completed') {
                this.lessons.set(rec.lessonId, {
                  ...lesson,
                  completedVocabularyCount: res.lessonDerived.completedVocabularyCount,
                  completionPercentage: res.lessonDerived.completionPercentage,
                });
              }
            }
          } else if (op.op === 'saveQuizStats') {
            const merged = await this.post<QuizStats>('saveQuizStats', op.payload);
            this.outbox.ackFirst();
            if (merged && merged.lessonId) this.quiz.set(merged.lessonId, merged); // server keeps bests
          } else if (op.op === 'migrateLocalProgress') {
            const res = await this.post<MigrateResponse>('migrateLocalProgress', op.payload);
            this.outbox.ackFirst();
            if (this.session && res?.migrated) {
              this.session.student.migratedFromLocalId = String((op.payload as { localStudentId?: string }).localStudentId ?? '');
              saveRemoteSession(this.storage, this.session);
            }
            await this.pullCache().catch(() => undefined);
          } else {
            // Unknown op type (future-proofing): drop it rather than jam the queue.
            console.warn('[remote] dropping unknown outbox op:', op.op);
            this.outbox.ackFirst();
          }
        } catch (err) {
          if (err instanceof RemoteApiError && PERMANENT_ERROR_CODES.has(err.code)) {
            console.warn(`[remote] server permanently rejected ${op.op} (${err.code}): ${err.message} — dropping op.`);
            this.outbox.ackFirst();
            continue;
          }
          throw err;
        }
      }
      this.consecutiveFailures = 0;
      this.lastError = null;
    } catch (err) {
      this.lastError = err;
      this.consecutiveFailures += 1;
      console.warn(`[remote] flush failed (attempt ${this.consecutiveFailures}), ops stay queued:`, err);
      if (!(err instanceof RemoteApiError && err.code === 'INVALID_TOKEN')) this.scheduleRetry();
    } finally {
      this.flushing = false;
      this.emitState();
    }
  }

  /** For tests: the number of ops still waiting for the server. */
  get pendingOps(): number {
    return this.outbox.length;
  }

  /** For tests: last flush error (null when healthy). */
  get lastFlushError(): unknown {
    return this.lastError;
  }

  /** Teardown helper (tests / hot-reload): stop all background timers. */
  destroy(): void {
    if (this.periodicTimer !== null) {
      clearInterval(this.periodicTimer);
      this.periodicTimer = null;
    }
    if (this.flushTimer !== null) {
      clearTimeout(this.flushTimer);
      this.flushTimer = null;
    }
    if (this.retryTimer !== null) {
      clearTimeout(this.retryTimer);
      this.retryTimer = null;
    }
  }
}
