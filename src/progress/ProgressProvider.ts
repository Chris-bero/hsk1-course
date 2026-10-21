/**
 * ProgressProvider — the single seam between the app and any storage backend
 * (spec §18A, §20: "configurable data provider"; UI/audio/content components
 * must never talk to a storage technology directly).
 *
 * Phase 1: LocalProgressProvider (localStorage).
 * Phase 2: an API-backed provider that talks ONLY to a Google Apps Script
 *          web app (never to Google Sheets directly from the browser).
 *
 * The contract is deliberately Promise-based even though the local provider is
 * synchronous, so swapping in a network provider changes nothing upstream.
 */
import type {
  LearningEvent,
  LessonProgressRecord,
  QuizStats,
  StudentProfile,
  SyncState,
  VocabularyProgressRecord,
} from '../types/progress';

export interface ProgressProvider {
  readonly kind: 'local' | 'remote';

  /** Honest indicator for the UI badge. Never claim sync that didn't happen. */
  readonly syncState: SyncState;

  /** Prepare storage (load state / handshake). Rejects if unusable. */
  init(student: StudentProfile): Promise<void>;

  getLessonProgress(lessonId: string): Promise<LessonProgressRecord | null>;
  getAllLessonProgress(): Promise<LessonProgressRecord[]>;
  saveLessonProgress(record: LessonProgressRecord): Promise<void>;

  getVocabularyProgress(lessonId: string): Promise<VocabularyProgressRecord[]>;
  saveVocabularyProgress(record: VocabularyProgressRecord): Promise<void>;

  /** Practice quiz stats (local feature; separate from the sheet schema). */
  getQuizStats(lessonId: string): Promise<QuizStats | null>;
  getAllQuizStats(): Promise<Record<string, QuizStats>>;
  saveQuizStats(stats: QuizStats): Promise<void>;

  /**
   * Append learning events. Implementations must be idempotent by
   * LearningEvent.eventId (dedupe repeated submissions — spec §18E).
   */
  logEvents(events: LearningEvent[]): Promise<void>;

  /** Persist anything buffered (called on pagehide, route change, etc.). */
  flush(): Promise<void>;
}

/** Thrown by the Phase 2 stub / failed remote initialization. */
export class ProgressProviderUnavailableError extends Error {
  constructor(
    message: string,
    readonly fallbackUsed: boolean = false,
  ) {
    super(message);
    this.name = 'ProgressProviderUnavailableError';
  }
}
