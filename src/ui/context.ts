/**
 * AppContext — what every UI component receives. Components never import
 * providers/stores directly; they get capabilities through this object
 * (spec §20: separate content, UI, services, persistence).
 */
import type { AudioService } from '../services/audioService';
import type { SettingsStore } from '../services/settings';
import type { ActiveTimeTracker } from '../services/timeTracker';
import type { ProgressService } from '../progress/ProgressService';

/**
 * Phase 2 authentication surface. `mode` reflects the BUILD configuration
 * (appConfig.progress.provider): 'local' builds have no sign-in at all;
 * 'remote' builds show a sign-in entry point until a session exists.
 * signIn() swaps the live progress stack to the remote provider (plus a
 * one-time migration of the local snapshot) and re-renders the app.
 */
export interface AuthInfo {
  mode: 'local' | 'remote';
  signedIn: boolean;
  studentName?: string;
  /** Whether remote is configured but currently unreachable (fallback active). */
  remoteConfigured: boolean;
  signIn(name: string, code: string): Promise<void>;
  signOut(): Promise<void>;
  /**
   * Fire-and-forget ping that wakes the Apps Script instance up while the
   * student is still typing (cold-start absorber). Safe to call repeatedly.
   */
  warmUp(): void;
}

export interface AppContext {
  /**
   * Swappable on sign-in/sign-out: bootstrap rebuilds the progress stack and
   * reassigns this property, then re-renders. Components must read
   * ctx.progress at call time (never cache the reference across renders).
   */
  progress: ProgressService;
  audio: AudioService;
  settings: SettingsStore;
  tracker: ActiveTimeTracker;
  auth: AuthInfo;
  /**
   * Per-page-load dedupe for "section opened" style events, so re-navigating
   * within a session doesn't spam the log (spec §17E).
   */
  sessionDedupe: Set<string>;
}

/** Track an event at most once per page session for the given key. */
export function trackOnce(
  ctx: AppContext,
  key: string,
  type: Parameters<ProgressService['track']>[0],
  lessonId: string,
  vocabularyId?: string,
): void {
  if (ctx.sessionDedupe.has(key)) return;
  ctx.sessionDedupe.add(key);
  ctx.progress.track(type, lessonId, vocabularyId);
}
