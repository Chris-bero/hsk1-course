/**
 * AudioService — pre-generated Mandarin audio playback (spec Phase 1:
 * "natural Mandarin TTS", "adjustable audio playback speed").
 *
 * Design:
 *  - Clips are resolved through an injected manifest (clipId -> URL). The
 *    manifest is generated from course content (scripts/export_audio_manifest)
 *    so audio stays decoupled from components (spec §20.3).
 *  - Speed is applied via HTMLAudioElement.playbackRate (no re-synthesis);
 *    it can change mid-playback and applies to every subsequent clip.
 *  - Missing clips degrade gracefully (onMissing callback → subtle UI notice)
 *    so partially-generated courses remain fully usable.
 *  - Sequential playback for conversations with a per-call item callback
 *    (UI highlighting) and a generation token that cancels stale chains.
 *  - Audio playback is reported via onPlayed so the caller can log events and
 *    ping the active-time tracker. The service itself logs NOTHING — keeping
 *    analytics out of playback.
 */
export interface AudioPlayContext {
  clipId: string;
  lessonId: string;
  /** What kind of content the clip belongs to (drives which event is logged). */
  kind: 'vocabulary' | 'vocabulary-example' | 'sentence' | 'grammar-example' | 'conversation-line';
  vocabularyId?: string;
}

export interface AudioServiceCallbacks {
  /** A clip actually started playing. */
  onPlayed?: (ctx: AudioPlayContext) => void;
  /** The manifest has no audio for this clip id. */
  onMissing?: (ctx: AudioPlayContext) => void;
}

export class AudioService {
  private el: HTMLAudioElement | null = null;
  private sequenceToken = 0;
  private rate = 1;
  private callbacks: AudioServiceCallbacks;

  constructor(
    private manifest: Readonly<Record<string, string>>,
    callbacks: AudioServiceCallbacks = {},
  ) {
    this.callbacks = callbacks;
    if (typeof Audio !== 'undefined') {
      this.el = new Audio();
      this.el.preload = 'auto';
    }
  }

  /** Callbacks can be (re)assigned after construction (wiring order flexibility). */
  setCallbacks(callbacks: AudioServiceCallbacks): void {
    this.callbacks = { ...this.callbacks, ...callbacks };
  }

  setRate(rate: number): void {
    this.rate = rate;
    if (this.el) this.el.playbackRate = rate;
  }

  getRate(): number {
    return this.rate;
  }

  hasClip(clipId: string): boolean {
    return Object.prototype.hasOwnProperty.call(this.manifest, clipId);
  }

  /**
   * Play a single clip. Cancels any running sequence.
   * Returns false when no audio exists for the clip (nothing was played) —
   * callers use this to avoid logging play events for missing audio.
   */
  play(ctx: AudioPlayContext): boolean {
    this.sequenceToken += 1; // cancel sequences
    return this.playOne(ctx, this.sequenceToken);
  }

  /**
   * Play clips in order (conversation "play all"). Cancels prior playback.
   * onItem receives each clip as it starts, and null when the sequence ends
   * or is cancelled — used for line highlighting.
   * Returns false when the FIRST clip is missing (sequence can't meaningfully
   * start); later missing clips are skipped without stalling the chain.
   */
  playSequence(ctxs: AudioPlayContext[], onItem?: (ctx: AudioPlayContext | null) => void): boolean {
    if (ctxs.length === 0) return false;
    const token = ++this.sequenceToken;
    const queue = [...ctxs];
    let started = false;
    const next = (): void => {
      if (token !== this.sequenceToken) {
        onItem?.(null);
        return; // superseded
      }
      const ctx = queue.shift();
      if (!ctx) {
        onItem?.(null); // sequence finished
        return;
      }
      onItem?.(ctx);
      this.playOne(ctx, token, next);
    };
    started = this.hasClip(ctxs[0]!.clipId);
    next();
    return started;
  }

  stop(): void {
    this.sequenceToken += 1;
    if (this.el) {
      this.el.pause();
      this.el.removeAttribute('src');
      this.el.load();
    }
  }

  get isPlaying(): boolean {
    return !!this.el && !this.el.paused && !!this.el.src;
  }

  // ---- internals ---------------------------------------------------------

  private playOne(ctx: AudioPlayContext, token: number, onEnded?: () => void): boolean {
    const el = this.el;
    if (!el) return false;
    const url = this.manifest[ctx.clipId];
    if (!url) {
      this.callbacks.onMissing?.(ctx);
      // Still advance sequences so one missing clip doesn't stall playback.
      if (onEnded && token === this.sequenceToken) setTimeout(onEnded, 120);
      return false;
    }
    el.playbackRate = this.rate;
    const endedHandler = (): void => {
      el.removeEventListener('ended', endedHandler);
      if (token !== this.sequenceToken) return;
      onEnded?.();
    };
    el.addEventListener('ended', endedHandler);
    el.src = url;
    // play() can reject (autoplay policy, jsdom, interruption) — degrade quietly.
    const p = el.play();
    if (p && typeof p.then === 'function') {
      p.then(() => {
        if (token === this.sequenceToken) this.callbacks.onPlayed?.(ctx);
      }).catch(() => {
        el.removeEventListener('ended', endedHandler);
        if (onEnded && token === this.sequenceToken) setTimeout(onEnded, 120);
      });
    }
    return true;
  }
}
