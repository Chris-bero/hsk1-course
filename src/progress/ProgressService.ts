/**
 * ProgressService — the single progress API used by UI components.
 *
 * Responsibilities:
 *  - Owns the student identity + session and delegates persistence to a
 *    ProgressProvider (local in Phase 1; API-backed in Phase 2).
 *  - Enforces the spec's distinction between VIEWED / AUDIO PLAYED /
 *    EXPLICITLY COMPLETED (§17C): audio playback never marks anything
 *    learned; only explicit actions set 'completed'.
 *  - Routes every meaningful action through the EventLogger (configurable).
 *  - Derives counts/percentages instead of trusting stored ones where
 *    possible; keeps sheet-parity fields up to date.
 */
import { appConfig } from '../config';
import type {
  CourseProgressSummary,
  LearningEventType,
  LessonProgressRecord,
  LessonStatus,
  QuizStats,
  StudentProfile,
  VocabularyProgressRecord,
} from '../types/progress';
import { EventLogger } from './EventLogger';
import type { ProgressProvider } from './ProgressProvider';

const nowIso = () => new Date().toISOString();

function newLessonRecord(studentId: string, lessonId: string, totalVocab: number): LessonProgressRecord {
  return {
    studentId,
    lessonId,
    status: 'not_started',
    startedAt: null,
    lastActivityAt: null,
    completedAt: null,
    activeLearningSeconds: 0,
    completedVocabularyCount: 0,
    totalVocabularyCount: totalVocab,
    completionPercentage: 0,
  };
}

function newVocabRecord(studentId: string, lessonId: string, vocabularyId: string): VocabularyProgressRecord {
  return {
    studentId,
    lessonId,
    vocabularyId,
    status: 'unseen',
    firstViewedAt: null,
    lastReviewedAt: null,
    markedCompletedAt: null,
  };
}

export class ProgressService {
  /** Vocabulary ids already reported as viewed during THIS page session (dedupe). */
  private viewedThisSession = new Set<string>();

  constructor(
    readonly provider: ProgressProvider,
    readonly student: StudentProfile,
    private events: EventLogger,
    /** Stable lookup: lessonId -> total vocabulary count (from course content). */
    private getTotalVocabulary: (lessonId: string) => number,
    /** Stable lookup: lessonId -> total lessons in course. */
    private totalLessons: number,
  ) {}

  // ---- events -----------------------------------------------------------

  /** Log a meaningful learning action (respects config kill-switches). */
  track(type: LearningEventType, lessonId: string, vocabularyId?: string): void {
    this.events.track(type, { lessonId, vocabularyId });
    // Any meaningful action refreshes lastActivityAt.
    void this.touchLesson(lessonId);
  }

  async flushEvents(): Promise<void> {
    await this.events.flush();
  }

  // ---- lessons ------------------------------------------------------------

  async openLesson(lessonId: string): Promise<LessonProgressRecord> {
    let rec = await this.getOrCreateLessonRecord(lessonId);
    const ts = nowIso();
    if (rec.startedAt === null) rec.startedAt = ts;
    if (rec.status === 'not_started') rec.status = 'in_progress';
    rec.lastActivityAt = ts;
    rec = this.withDerivedPercentage(rec);
    await this.provider.saveLessonProgress(rec);
    this.track('lesson_opened', lessonId);
    return rec;
  }

  async touchLesson(lessonId: string): Promise<void> {
    const rec = await this.getOrCreateLessonRecord(lessonId);
    rec.lastActivityAt = nowIso();
    await this.provider.saveLessonProgress(rec);
  }

  /**
   * Explicit "mark lesson complete" / undo (Phase 1 lesson completion
   * functionality). This is the ONLY thing that sets status 'completed'.
   */
  async setLessonCompleted(lessonId: string, completed: boolean): Promise<LessonProgressRecord> {
    let rec = await this.getOrCreateLessonRecord(lessonId);
    const ts = nowIso();
    if (completed) {
      rec.status = 'completed';
      rec.completedAt = ts;
      if (rec.startedAt === null) rec.startedAt = ts;
    } else {
      rec.status = rec.startedAt ? 'in_progress' : 'not_started';
      rec.completedAt = null;
    }
    rec.lastActivityAt = ts;
    rec = this.withDerivedPercentage(rec);
    await this.provider.saveLessonProgress(rec);
    this.events.track(completed ? 'lesson_completed' : 'lesson_uncompleted', { lessonId });
    return rec;
  }

  async getLessonProgress(lessonId: string): Promise<LessonProgressRecord | null> {
    return this.provider.getLessonProgress(lessonId);
  }

  async addActiveTime(lessonId: string, seconds: number): Promise<void> {
    if (seconds <= 0) return;
    const rec = await this.getOrCreateLessonRecord(lessonId);
    rec.activeLearningSeconds += seconds;
    rec.lastActivityAt = nowIso();
    await this.provider.saveLessonProgress(rec);
  }

  // ---- vocabulary ----------------------------------------------------------

  /**
   * Called when a word is actually rendered on screen (IntersectionObserver
   * or section-open fallback). Records viewed state; NEVER completed state.
   * Deduplicated per page session to avoid event spam.
   */
  async markVocabularyViewed(lessonId: string, vocabularyId: string): Promise<void> {
    const key = `${lessonId}:${vocabularyId}`;
    if (this.viewedThisSession.has(key)) return;
    this.viewedThisSession.add(key);

    const existing = await this.getVocabRecord(lessonId, vocabularyId);
    const ts = nowIso();
    const rec: VocabularyProgressRecord = existing
      ? { ...existing, lastReviewedAt: ts, status: existing.status === 'unseen' ? 'viewed' : existing.status }
      : { ...newVocabRecord(this.student.studentId, lessonId, vocabularyId), status: 'viewed', firstViewedAt: ts, lastReviewedAt: ts };
    if (rec.firstViewedAt === null) rec.firstViewedAt = ts;
    await this.provider.saveVocabularyProgress(rec);
    this.events.track('vocabulary_viewed', { lessonId, vocabularyId });
  }

  /**
   * Explicit learner action ("I learned this word"). Only exposed in the UI
   * when appConfig.features.vocabularyCompletion is true (spec §17C).
   */
  async setVocabularyCompleted(
    lessonId: string,
    vocabularyId: string,
    completed: boolean,
  ): Promise<VocabularyProgressRecord> {
    const existing = await this.getVocabRecord(lessonId, vocabularyId);
    const ts = nowIso();
    const rec: VocabularyProgressRecord =
      existing ?? newVocabRecord(this.student.studentId, lessonId, vocabularyId);
    if (completed) {
      rec.status = 'completed';
      rec.markedCompletedAt = ts;
      if (rec.firstViewedAt === null) rec.firstViewedAt = ts;
      rec.lastReviewedAt = ts;
    } else {
      rec.status = rec.firstViewedAt ? 'viewed' : 'unseen';
      rec.markedCompletedAt = null;
    }
    await this.provider.saveVocabularyProgress(rec);
    this.events.track(completed ? 'vocabulary_marked_completed' : 'vocabulary_marked_uncompleted', {
      lessonId,
      vocabularyId,
    });
    await this.recountLessonVocabulary(lessonId);
    return rec;
  }

  async getVocabularyProgress(lessonId: string): Promise<VocabularyProgressRecord[]> {
    return this.provider.getVocabularyProgress(lessonId);
  }

  // ---- practice quiz ---------------------------------------------------------

  /** Records a quiz attempt; keeps best score + attempt count; logs an event. */
  async recordQuizResult(lessonId: string, correct: number, total: number): Promise<QuizStats> {
    const prev = await this.provider.getQuizStats(lessonId);
    const stats: QuizStats = {
      lessonId,
      bestCorrect: Math.max(prev?.bestCorrect ?? 0, correct),
      total,
      attempts: (prev?.attempts ?? 0) + 1,
      lastAt: nowIso(),
    };
    await this.provider.saveQuizStats(stats);
    this.events.track('practice_quiz_completed', { lessonId });
    return stats;
  }

  async getQuizStats(lessonId: string): Promise<QuizStats | null> {
    return this.provider.getQuizStats(lessonId);
  }

  // ---- aggregates ------------------------------------------------------------

  async getCourseSummary(): Promise<CourseProgressSummary> {
    const records = await this.provider.getAllLessonProgress();
    const byLesson = new Map(records.map((r) => [r.lessonId, r]));
    let lessonsCompleted = 0;
    let totalActiveSeconds = 0;
    let lastActivityAt: string | null = null;
    for (const rec of records) {
      if (rec.status === 'completed') lessonsCompleted += 1;
      totalActiveSeconds += rec.activeLearningSeconds;
      if (rec.lastActivityAt && (!lastActivityAt || rec.lastActivityAt > lastActivityAt)) {
        lastActivityAt = rec.lastActivityAt;
      }
    }
    // Vocabulary aggregate: derive from stored vocab records for available lessons.
    let vocabularyCompleted = 0;
    let vocabularyTotal = 0;
    for (const [lessonId] of byLesson) {
      vocabularyTotal += this.getTotalVocabulary(lessonId);
    }
    if (appConfig.features.vocabularyCompletion) {
      for (const lessonId of byLesson.keys()) {
        const vocab = await this.provider.getVocabularyProgress(lessonId);
        vocabularyCompleted += vocab.filter((v) => v.status === 'completed').length;
      }
    }
    return {
      studentId: this.student.studentId,
      lessonsCompleted,
      totalLessons: this.totalLessons,
      completionPercentage:
        this.totalLessons > 0 ? Math.round((lessonsCompleted / this.totalLessons) * 100) : 0,
      totalActiveSeconds,
      vocabularyCompleted,
      vocabularyTotal,
      lastActivityAt,
      perLesson: records,
    };
  }

  // ---- internals ---------------------------------------------------------------

  private async getOrCreateLessonRecord(lessonId: string): Promise<LessonProgressRecord> {
    const existing = await this.provider.getLessonProgress(lessonId);
    if (existing) {
      // Refresh content-derived fields in case content changed.
      existing.totalVocabularyCount = this.getTotalVocabulary(lessonId);
      return existing;
    }
    const rec = newLessonRecord(this.student.studentId, lessonId, this.getTotalVocabulary(lessonId));
    await this.provider.saveLessonProgress(rec);
    return rec;
  }

  private async getVocabRecord(
    lessonId: string,
    vocabularyId: string,
  ): Promise<VocabularyProgressRecord | null> {
    const all = await this.provider.getVocabularyProgress(lessonId);
    return all.find((v) => v.vocabularyId === vocabularyId) ?? null;
  }

  private async recountLessonVocabulary(lessonId: string): Promise<void> {
    const rec = await this.getOrCreateLessonRecord(lessonId);
    const vocab = await this.provider.getVocabularyProgress(lessonId);
    rec.completedVocabularyCount = vocab.filter((v) => v.status === 'completed').length;
    rec.totalVocabularyCount = this.getTotalVocabulary(lessonId);
    const updated = this.withDerivedPercentage(rec);
    await this.provider.saveLessonProgress(updated);
  }

  /**
   * completionPercentage is DERIVED, never authoritative (spec §18D: the
   * Phase 2 server recomputes it; browsers are not trusted).
   * Rule: completed → 100. Otherwise, if per-word completion tracking is
   * enabled → vocabulary-based. Otherwise 0 (the Status field carries the
   * "in progress" information honestly, without inventing a number).
   */
  private withDerivedPercentage(rec: LessonProgressRecord): LessonProgressRecord {
    if (rec.status === 'completed') {
      rec.completionPercentage = 100;
    } else if (appConfig.features.vocabularyCompletion && rec.totalVocabularyCount > 0) {
      rec.completionPercentage = Math.round(
        (rec.completedVocabularyCount / rec.totalVocabularyCount) * 100,
      );
    } else {
      rec.completionPercentage = 0;
    }
    return rec;
  }

  /** Statuses in canonical order for UI chips. */
  static statusOrder: LessonStatus[] = ['not_started', 'in_progress', 'completed'];
}
