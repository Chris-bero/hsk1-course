/**
 * ActiveTimeTracker — active learning time measurement (spec §17D).
 *
 * FULL POLICY: docs/ACTIVE_TIME_POLICY.md. Summary:
 *  - One second counts only when ALL hold: a lesson is open, the tab is
 *    visible, and the user interacted within the idle timeout.
 *  - Interactions: pointer/touch/key/wheel events and audio playback.
 *  - After the tab was hidden, counting resumes only after a NEW interaction
 *    (a merely-visible tab is not "active use").
 *  - Exactly one timer ever runs (start() is idempotent; module consumers go
 *    through setLesson()).
 *  - Accumulated time flushes to the provider every flushIntervalMs and on
 *    pagehide / lesson switch / stop(). Between the last flush and a hard
 *    crash at most flushIntervalMs of time is lost (accepted trade-off,
 *    documented).
 *  - This produces an ESTIMATE of active app usage — never presented as a
 *    measure of attention or comprehension.
 */
export interface TimeTrackerPolicy {
  idleTimeoutMs: number;
  flushIntervalMs: number;
  tickMs: number;
}

export type TimeFlushHandler = (lessonId: string, seconds: number) => void | Promise<void>;

export class ActiveTimeTracker {
  private timer: ReturnType<typeof setInterval> | null = null;
  private lessonId: string | null = null;
  private accumulatedMs = 0;
  private msSinceFlush = 0;
  private lastInteractionAt = 0; // 0 => requires a fresh interaction
  private visible = true;
  private onFlush: TimeFlushHandler | null = null;
  private disposed = false;

  private readonly visibilityHandler = (): void => {
    this.visible = typeof document === 'undefined' ? true : document.visibilityState === 'visible';
    if (!this.visible) {
      // Bank what we have; require a new interaction when we come back.
      this.lastInteractionAt = 0;
      void this.flush();
    }
  };

  private readonly pagehideHandler = (): void => {
    void this.flush();
  };

  constructor(private policy: TimeTrackerPolicy) {
    if (typeof document !== 'undefined') {
      document.addEventListener('visibilitychange', this.visibilityHandler);
      this.visible = document.visibilityState === 'visible';
    }
    if (typeof window !== 'undefined') {
      window.addEventListener('pagehide', this.pagehideHandler);
    }
  }

  /** Begin/continue tracking for a lesson. Idempotent for the same lesson. */
  setLesson(lessonId: string | null, onFlush: TimeFlushHandler): void {
    if (this.disposed) return;
    if (this.lessonId !== null && this.lessonId !== lessonId) {
      void this.flush(); // bank time for the lesson being left
    }
    this.onFlush = onFlush;
    this.lessonId = lessonId;
    if (lessonId === null) {
      this.stopTimer();
      return;
    }
    this.startTimer();
  }

  /** Call on any genuine user interaction (input events, audio play, etc.). */
  ping(): void {
    this.lastInteractionAt = Date.now();
  }

  /** Force accumulated time to the provider now. */
  async flush(): Promise<void> {
    if (this.lessonId === null || this.accumulatedMs < 1_000 || !this.onFlush) {
      this.accumulatedMs = 0;
      this.msSinceFlush = 0;
      return;
    }
    const seconds = Math.floor(this.accumulatedMs / 1_000);
    this.accumulatedMs -= seconds * 1_000;
    this.msSinceFlush = 0;
    try {
      await this.onFlush(this.lessonId, seconds);
    } catch (err) {
      // Put it back rather than lose it; next flush retries.
      this.accumulatedMs += seconds * 1_000;
      console.warn('[time] flush failed, retained for retry:', err);
    }
  }

  destroy(): void {
    this.disposed = true;
    this.stopTimer();
    if (typeof document !== 'undefined') {
      document.removeEventListener('visibilitychange', this.visibilityHandler);
    }
    if (typeof window !== 'undefined') {
      window.removeEventListener('pagehide', this.pagehideHandler);
    }
  }

  // ---- internals -------------------------------------------------------

  private startTimer(): void {
    if (this.timer !== null) return; // guard: never two timers
    this.timer = setInterval(() => this.tick(), this.policy.tickMs);
  }

  private stopTimer(): void {
    if (this.timer !== null) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  private tick(): void {
    if (this.lessonId === null || !this.visible) return;
    const idleFor = this.lastInteractionAt === 0 ? Infinity : Date.now() - this.lastInteractionAt;
    if (idleFor > this.policy.idleTimeoutMs) return;
    this.accumulatedMs += this.policy.tickMs;
    this.msSinceFlush += this.policy.tickMs;
    if (this.msSinceFlush >= this.policy.flushIntervalMs) {
      void this.flush();
    }
  }
}
