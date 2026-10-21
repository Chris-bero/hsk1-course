/**
 * Progress & event data model.
 *
 * These types intentionally mirror the proposed Phase 2 Google Sheets schema
 * (spec §18B) one-to-one, so that switching from LocalProgressProvider to a
 * Google Apps Script–backed provider requires no data-model changes:
 *
 *   StudentProfile            -> Sheet "Students"
 *   LessonProgressRecord      -> Sheet "StudentLessonProgress"
 *   VocabularyProgressRecord  -> Sheet "StudentVocabularyProgress"
 *   LearningEvent             -> Sheet "LearningEvents"
 *   (Sheet "Lessons" is derived from static course content — see course.ts)
 *
 * All timestamps are ISO-8601 strings (UTC).
 */

export type LessonStatus = 'not_started' | 'in_progress' | 'completed';

/**
 * Vocabulary lifecycle — deliberately distinguishes "seen" from "learned"
 * (spec §17C): playing audio or viewing a word NEVER marks it completed.
 * Only an explicit student action sets 'completed'.
 */
export type VocabularyStatus = 'unseen' | 'viewed' | 'completed';

/**
 * Where the user's progress currently lives. Used by the UI to display an
 * honest storage badge — Phase 1 must never pretend data reached a teacher.
 */
export type SyncState = 'local-only' | 'synced' | 'pending' | 'error';

export interface StudentProfile {
  /** Unique student ID. Phase 1: locally generated ("stu-local-…"). Phase 2: issued/validated by the backend. */
  studentId: string;
  /** Not collected in Phase 1. */
  studentName?: string;
  /** Not collected in Phase 1. */
  emailOrIdentifier?: string;
  /** Course id + level, e.g. "new-hsk-1". */
  courseLevel: string;
  /** ISO date. Phase 1: first-run date on this device. */
  enrollmentDate: string;
  /** 'local' = device-only anonymous learner (Phase 1). */
  accountStatus: 'local' | 'active' | 'inactive';
}

export interface LessonProgressRecord {
  studentId: string;
  lessonId: string;
  status: LessonStatus;
  /** First time the lesson was opened. Null while not_started. */
  startedAt: string | null;
  lastActivityAt: string | null;
  /** Set when the learner explicitly marks the lesson complete. */
  completedAt: string | null;
  /** Accumulated ACTIVE learning seconds (see docs/ACTIVE_TIME_POLICY.md). An estimate, not an attention measure. */
  activeLearningSeconds: number;
  completedVocabularyCount: number;
  /** Derived from content at write time; kept for sheet parity. */
  totalVocabularyCount: number;
  /**
   * DERIVED value (never authoritative): completed → 100; otherwise based on
   * completed vocabulary when that feature is enabled; else 0.
   * In Phase 2 the server recomputes/validates this — clients are not trusted.
   */
  completionPercentage: number;
}

export interface VocabularyProgressRecord {
  studentId: string;
  lessonId: string;
  vocabularyId: string;
  status: VocabularyStatus;
  /** First time the word was actually displayed to the student. */
  firstViewedAt: string | null;
  /** Last time the word was displayed (or its audio played). */
  lastReviewedAt: string | null;
  /** Only set by an explicit "I learned this" action. */
  markedCompletedAt: string | null;
}

/**
 * Stable event names (spec §17E). Do not rename once events exist in the
 * field — the teacher dashboard and any analysis depend on them.
 */
export type LearningEventType =
  | 'session_started'
  | 'lesson_opened'
  | 'vocabulary_viewed'
  | 'vocabulary_audio_played'
  | 'sentence_audio_played'
  | 'grammar_section_opened'
  | 'conversation_played'
  | 'vocabulary_marked_completed'
  | 'vocabulary_marked_uncompleted'
  | 'lesson_completed'
  | 'lesson_uncompleted'
  | 'practice_quiz_completed';

export interface LearningEvent {
  /** Client-generated UUID. Serves as the idempotency key for Phase 2 (spec §18E). */
  eventId: string;
  studentId: string;
  /** One per browser session (survives refresh, new per tab). */
  sessionId: string;
  lessonId: string;
  /** When the event concerns a specific word. */
  vocabularyId?: string;
  eventType: LearningEventType;
  timestamp: string;
}

/** Aggregate used by the home page (and, in Phase 2, the teacher dashboard). */
export interface CourseProgressSummary {
  studentId: string;
  lessonsCompleted: number;
  totalLessons: number;
  /** Honest course completion: lessonsCompleted / totalLessons * 100, rounded. */
  completionPercentage: number;
  totalActiveSeconds: number;
  vocabularyCompleted: number;
  vocabularyTotal: number;
  lastActivityAt: string | null;
  perLesson: LessonProgressRecord[];
}

/**
 * Practice quiz statistics per lesson (local feature; Phase 2 may add a
 * sheet for it later — kept OUT of the core progress schema on purpose).
 */
export interface QuizStats {
  lessonId: string;
  /** Best correct answers in one attempt. */
  bestCorrect: number;
  /** Questions in that best attempt. */
  total: number;
  attempts: number;
  lastAt: string;
}
