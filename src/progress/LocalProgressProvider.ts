/**
 * LocalProgressProvider — Phase 1 storage: versioned JSON in localStorage.
 *
 * Guarantees:
 *  - Writes are debounced but `flush()` is synchronous-safe (called on
 *    pagehide / route change), so progress is not lost on navigation.
 *  - Events are deduplicated by eventId (same rule the Phase 2 backend must
 *    enforce) and capped at appConfig.eventLogLimit (oldest dropped).
 *  - All storage errors are caught: the app keeps working in memory and
 *    syncState flips to 'error' so the UI can be honest about it.
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
import type { ProgressProvider } from './ProgressProvider';

export interface LocalState {
  version: 1;
  studentId: string;
  lessons: Record<string, LessonProgressRecord>;
  /** key: `${lessonId}:${vocabularyId}` */
  vocabulary: Record<string, VocabularyProgressRecord>;
  events: LearningEvent[];
  /** Practice quiz stats per lesson (local-only feature for now). */
  quiz: Record<string, QuizStats>;
}

/**
 * Read the raw local snapshot straight from storage (Phase 2 migration:
 * after sign-in this is sent once to the backend via migrateLocalProgress).
 * Returns null when there is nothing stored or storage is blocked.
 */
export function readLocalSnapshot(storage: Storage | null): LocalState | null {
  if (!storage) return null;
  try {
    const raw = storage.getItem(appConfig.storageKeys.progress);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as LocalState;
    if (parsed && parsed.version === 1 && typeof parsed.studentId === 'string') return parsed;
  } catch {
    /* corrupt or blocked */
  }
  return null;
}

function emptyState(studentId: string): LocalState {
  return { version: 1, studentId, lessons: {}, vocabulary: {}, events: [], quiz: {} };
}

const vocabKey = (lessonId: string, vocabularyId: string) => `${lessonId}:${vocabularyId}`;

export class LocalProgressProvider implements ProgressProvider {
  readonly kind = 'local' as const;

  private state: LocalState = emptyState('');
  private dirty = false;
  private writeTimer: ReturnType<typeof setTimeout> | null = null;
  private seenEventIds = new Set<string>();
  private _syncState: SyncState = 'local-only';

  /**
   * @param storage Injected web storage (bootstrap passes a sandbox-safe
   * accessor). Null → pure in-memory mode (session-only progress).
   */
  constructor(private storage: Storage | null = null) {}

  get syncState(): SyncState {
    return this._syncState;
  }

  async init(student: StudentProfile): Promise<void> {
    if (this.storage === null) {
      try {
        this.storage = globalThis.localStorage;
      } catch {
        this.storage = null;
      }
    }
    if (this.storage === null) {
      // No persistent storage (sandboxed preview, private mode). The app
      // still works; progress lives for this page session only. This is not
      // a sync failure, so the badge stays 'local-only'.
      console.warn('[progress] no persistent storage available; in-memory only.');
      this._syncState = 'local-only';
      return;
    }
    try {
      const raw = this.storage.getItem(appConfig.storageKeys.progress);
      if (raw) {
        const parsed = JSON.parse(raw) as LocalState;
        if (parsed && parsed.version === 1 && parsed.studentId === student.studentId) {
          this.state = { ...emptyState(student.studentId), ...parsed };
        } else if (parsed && parsed.version === 1) {
          // Different learner ID on this device (e.g. cleared identity):
          // start fresh rather than mixing students' records.
          this.state = emptyState(student.studentId);
        }
      } else {
        this.state = emptyState(student.studentId);
      }
      this.seenEventIds = new Set(this.state.events.map((e) => e.eventId));
      this.persistNow();
      this._syncState = 'local-only';
    } catch (err) {
      this._syncState = 'error';
      console.warn('[progress] failed to read stored state; starting in-memory.', err);
    }
  }

  async getLessonProgress(lessonId: string): Promise<LessonProgressRecord | null> {
    return this.state.lessons[lessonId] ?? null;
  }

  async getAllLessonProgress(): Promise<LessonProgressRecord[]> {
    return Object.values(this.state.lessons);
  }

  async saveLessonProgress(record: LessonProgressRecord): Promise<void> {
    this.state.lessons[record.lessonId] = { ...record };
    this.scheduleWrite();
  }

  async getVocabularyProgress(lessonId: string): Promise<VocabularyProgressRecord[]> {
    const prefix = `${lessonId}:`;
    return Object.entries(this.state.vocabulary)
      .filter(([k]) => k.startsWith(prefix))
      .map(([, v]) => v);
  }

  async saveVocabularyProgress(record: VocabularyProgressRecord): Promise<void> {
    this.state.vocabulary[vocabKey(record.lessonId, record.vocabularyId)] = { ...record };
    this.scheduleWrite();
  }

  async getQuizStats(lessonId: string): Promise<QuizStats | null> {
    return this.state.quiz[lessonId] ?? null;
  }

  async getAllQuizStats(): Promise<Record<string, QuizStats>> {
    return { ...this.state.quiz };
  }

  async saveQuizStats(stats: QuizStats): Promise<void> {
    this.state.quiz[stats.lessonId] = { ...stats };
    this.scheduleWrite();
  }

  async logEvents(events: LearningEvent[]): Promise<void> {
    let added = false;
    for (const ev of events) {
      if (this.seenEventIds.has(ev.eventId)) continue; // idempotency
      this.seenEventIds.add(ev.eventId);
      this.state.events.push(ev);
      added = true;
    }
    if (!added) return;
    // Cap the log (oldest first out).
    if (this.state.events.length > appConfig.eventLogLimit) {
      const dropped = this.state.events.splice(0, this.state.events.length - appConfig.eventLogLimit);
      for (const d of dropped) this.seenEventIds.delete(d.eventId);
    }
    this.scheduleWrite();
  }

  async flush(): Promise<void> {
    if (this.writeTimer !== null) {
      clearTimeout(this.writeTimer);
      this.writeTimer = null;
    }
    this.persistNow();
  }

  private scheduleWrite(): void {
    this.dirty = true;
    if (this.writeTimer !== null) return;
    this.writeTimer = setTimeout(() => {
      this.writeTimer = null;
      this.persistNow();
    }, 250);
  }

  private persistNow(): void {
    if (!this.dirty && this.storage === null) return;
    if (!this.storage) return;
    try {
      this.storage.setItem(appConfig.storageKeys.progress, JSON.stringify(this.state));
      this.dirty = false;
      if (this._syncState === 'error') this._syncState = 'local-only';
    } catch (err) {
      this._syncState = 'error';
      console.warn('[progress] failed to persist state:', err);
    }
  }

  /** Test/debug helper: raw event log currently retained. */
  getStoredEvents(): readonly LearningEvent[] {
    return this.state.events;
  }
}
