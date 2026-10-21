/**
 * EventLogger — lightweight, configurable learning-event system (spec §17E).
 *
 *  - Stable event names (LearningEventType) + client UUID eventId
 *    (idempotency key for the Phase 2 backend).
 *  - Globally disable-able, plus per-type kill switches in appConfig.
 *  - Batches events with a short debounce and flushes on page hide, so we
 *    neither hammer storage nor lose the tail of a session.
 *  - Only meaningful actions are logged — no minor UI interactions.
 */
import { appConfig } from '../config';
import type { LearningEvent, LearningEventType } from '../types/progress';
import { uuid } from '../services/identity';
import type { ProgressProvider } from './ProgressProvider';

export interface TrackPayload {
  lessonId: string;
  vocabularyId?: string;
}

export class EventLogger {
  private queue: LearningEvent[] = [];
  private flushTimer: ReturnType<typeof setTimeout> | null = null;

  constructor(
    private provider: ProgressProvider,
    private studentId: string,
    private sessionId: string,
  ) {}

  private isEnabled(type: LearningEventType): boolean {
    if (!appConfig.features.eventLogging) return false;
    return !appConfig.features.disabledEventTypes.includes(type);
  }

  /** Fire-and-forget: build the event, queue it, schedule a batched write. */
  track(type: LearningEventType, payload: TrackPayload): void {
    if (!this.isEnabled(type)) return;
    const event: LearningEvent = {
      eventId: uuid(),
      studentId: this.studentId,
      sessionId: this.sessionId,
      lessonId: payload.lessonId,
      ...(payload.vocabularyId ? { vocabularyId: payload.vocabularyId } : {}),
      eventType: type,
      timestamp: new Date().toISOString(),
    };
    this.queue.push(event);
    if (this.flushTimer === null) {
      this.flushTimer = setTimeout(() => void this.flush(), 1_000);
    }
  }

  async flush(): Promise<void> {
    if (this.flushTimer !== null) {
      clearTimeout(this.flushTimer);
      this.flushTimer = null;
    }
    if (this.queue.length === 0) return;
    const batch = this.queue.splice(0, this.queue.length);
    try {
      await this.provider.logEvents(batch);
    } catch (err) {
      // Do not lose events on a transient failure: re-queue at the front.
      this.queue.unshift(...batch);
      console.warn('[events] failed to log batch, retained for retry:', err);
    }
  }
}
