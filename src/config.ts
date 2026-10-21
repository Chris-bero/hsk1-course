import type { LearningEventType } from './types/progress';

/**
 * Central runtime configuration.
 * Everything the spec asks to be "configurable" lives here — no magic values
 * scattered through components.
 */
export const appConfig = {
  courseId: 'new-hsk-1',
  courseLevel: 'HSK 1',

  features: {
    /**
     * Spec §17C: individual vocabulary completion tracking MAY remain
     * disabled in Phase 1. The machinery works end-to-end; the reference UI
     * surfaces it as the "✓ mastered" chip on word cards.
     */
    vocabularyCompletion: true,

    /** Spec §17E: the event system must be switchable. */
    eventLogging: true,
    /** Additional per-type kill switches, e.g. ['vocabulary_viewed']. */
    disabledEventTypes: [] as LearningEventType[],

    /** Spec §17D: active learning time tracking. */
    timeTracking: true,
  },

  timeTracking: {
    /** Stop counting after this long without user interaction. */
    idleTimeoutMs: 120_000,
    /** How often accumulated time is written to the progress provider. */
    flushIntervalMs: 15_000,
    /** Internal tick resolution. */
    tickMs: 1_000,
  },

  progress: {
    /**
     * 'local'  — progress stays on this device (Phase 1 mode; still the
     *            offline fallback and the pre-sign-in mode in Phase 2).
     * 'remote' — progress syncs to the Google Apps Script backend through
     *            RemoteProgressProvider. Requires `remoteEndpoint` below.
     *            Unsigned-in visitors still get local storage; after sign-in
     *            their local snapshot migrates to the server account once.
     * If 'remote' fails to initialize (offline at boot with no stored
     * session), the app falls back to 'local' and surfaces an honest
     * sync-state badge; progress is never lost silently.
     */
    provider: 'remote' as 'local' | 'remote',
    /**
     * Phase 2: URL of the Apps Script web-app endpoint (…/exec).
     * Never a secret and not authentication — identity comes from the
     * teacher-issued sign-in (name + access code → hashed session token).
     * Deployed 2026-10-20 (docs/DEPLOY_PHASE2_AR.md).
     */
    remoteEndpoint: 'https://script.google.com/macros/s/AKfycbySEMEc4ra_YcXo5YSq4QWJxoF9GCpIEAOGQrRHWZK8FayAsfXVumE2O_Su7mmFvBFd_Q/exec',
  },

  storageKeys: {
    progress: 'hsk1.progress.v1',
    settings: 'hsk1.settings.v1',
    identity: 'hsk1.identity.v1',
    session: 'hsk1.session.v1',
    /** Phase 2: signed-in remote session (token + server profile). */
    remoteSession: 'hsk1.remote.v1',
    /** Phase 2: persistent outbox of remote writes awaiting server ack. */
    outbox: 'hsk1.outbox.v1',
  },

  /** Cap on locally retained events (oldest dropped) so storage can't grow unbounded. */
  eventLogLimit: 500,
} as const;

/** Playback speeds offered in the UI (spec §Phase 1: adjustable audio speed). */
export const PLAYBACK_RATES = [0.5, 0.75, 1, 1.25] as const;
export type PlaybackRate = (typeof PLAYBACK_RATES)[number];
