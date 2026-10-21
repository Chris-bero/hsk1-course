/**
 * Bootstrap: wires identity → provider → services → UI, and returns the
 * service container (used by tests and useful for debugging).
 *
 * This file is the ONLY place where concrete implementations are chosen
 * (spec §20: configurable data provider; components stay storage-agnostic).
 * main.ts just adds the stylesheet and calls this.
 *
 * Phase 2 (remote progress):
 *  - appConfig.progress.provider === 'remote' + remoteEndpoint → the app boots
 *    into RemoteProgressProvider when a valid stored session exists.
 *  - Unsigned-in (or failed handshake) → LocalProgressProvider, exactly like
 *    Phase 1, with a sign-in entry point in the header. Progress made while
 *    local is migrated ONCE to the server account at first sign-in
 *    (migrateLocalProgress, idempotent via Students.MigratedFromLocalID).
 *  - Sign-in/sign-out swap the LIVE progress stack (ctx.progress) and
 *    re-render; components always read ctx.progress at call time.
 */
import { appConfig } from './config';
import { course, totalVocabularyFor } from './content/course';
import { S } from './i18n/strings';
import { createProgressProvider, type ProviderSetupResult } from './progress/createProgressProvider';
import { EventLogger } from './progress/EventLogger';
import { ProgressService } from './progress/ProgressService';
import type { ProgressProvider } from './progress/ProgressProvider';
import { LocalProgressProvider, readLocalSnapshot } from './progress/LocalProgressProvider';
import { RemoteProgressProvider } from './progress/RemoteProgressProvider';
import { getOrCreateLocalStudent, getOrCreateSessionId } from './services/identity';
import { SettingsStore } from './services/settings';
import { AudioService } from './services/audioService';
import { audioManifest } from './services/audioManifest.generated';
import { ActiveTimeTracker } from './services/timeTracker';
import { createApp, type App } from './app';
import type { AppContext, AuthInfo } from './ui/context';
import { refreshSyncBadge } from './ui/components/header';
import type { StudentProfile } from './types/progress';

export interface BootstrapResult {
  app: App;
  ctx: AppContext;
  progress: ProgressService;
  provider: ProgressProvider;
  providerSetup: ProviderSetupResult;
  events: EventLogger;
  tracker: ActiveTimeTracker;
  audio: AudioService;
  settings: SettingsStore;
  student: StudentProfile;
  sessionId: string;
  /** Phase 2: the remote provider instance when the build is configured for it. */
  remote: RemoteProgressProvider | null;
  auth: AuthInfo;
}

export interface BootstrapOptions {
  /** Defaults to #app. Tests can pass their own root. */
  root?: HTMLElement;
  /**
   * Defaults to the generated clip manifest. Tests inject {} (audio not
   * needed to exercise UI/progress logic).
   */
  manifest?: Record<string, string>;
}

/**
 * Storage access can THROW just by touching window.localStorage in sandboxed
 * contexts (e.g. embedded preview iframes, strict cookie settings). Fall back
 * to an in-memory shim so the app always works — progress then simply lives
 * for the current page session (and the honest badge still says "local").
 */
function memoryStorage(): Storage {
  const map = new Map<string, string>();
  return {
    getItem: (k: string) => map.get(k) ?? null,
    setItem: (k: string, v: string) => void map.set(k, String(v)),
    removeItem: (k: string) => void map.delete(k),
    clear: () => map.clear(),
    key: (i: number) => [...map.keys()][i] ?? null,
    get length() {
      return map.size;
    },
  } as Storage;
}

function getStorage(kind: 'localStorage' | 'sessionStorage'): Storage {
  try {
    const s = window[kind];
    const probe = '__hsk1_probe__';
    s.setItem(probe, '1');
    s.removeItem(probe);
    return s;
  } catch {
    return memoryStorage();
  }
}

export async function bootstrap(opts: BootstrapOptions = {}): Promise<BootstrapResult> {
  const root = opts.root ?? document.getElementById('app');
  if (!root) throw new Error('#app root element missing');
  const manifest = opts.manifest ?? audioManifest;

  const persistentStorage = getStorage('localStorage');
  const sessionStorageSafe = getStorage('sessionStorage');

  // --- identity (device-local learner; migration key in Phase 2) ------------
  const localStudent = getOrCreateLocalStudent(persistentStorage);
  const sessionId = getOrCreateSessionId(sessionStorageSafe);

  /** The LIVE stack — swapped on sign-in/sign-out. Everything reads through it. */
  let providerSetup: ProviderSetupResult;
  let remote: RemoteProgressProvider | null = null;
  let activeStudent: StudentProfile = localStudent;

  const remoteConfigured =
    appConfig.progress.provider === 'remote' &&
    (appConfig.progress.remoteEndpoint as string) !== '';

  if (remoteConfigured) {
    remote = new RemoteProgressProvider(appConfig.progress.remoteEndpoint, {
      storage: persistentStorage,
      onStateChanged: (state) => refreshSyncBadge(state),
    });
    try {
      await remote.init(localStudent);
      activeStudent = remote.profile ?? localStudent;
      providerSetup = { provider: remote, fellBackToLocal: false };
    } catch (err) {
      console.warn('[bootstrap] remote init failed — starting local, sign-in available:', err);
      const local = new LocalProgressProvider(persistentStorage);
      await local.init(localStudent);
      providerSetup = {
        provider: local,
        fellBackToLocal: true,
        fallbackReason: err instanceof Error ? err.message : String(err),
      };
    }
  } else {
    providerSetup = await createProgressProvider(localStudent, persistentStorage);
  }

  const live = {
    events: new EventLogger(providerSetup.provider, activeStudent.studentId, sessionId),
    progress: null as unknown as ProgressService,
  };
  live.progress = new ProgressService(
    providerSetup.provider,
    activeStudent,
    live.events,
    totalVocabularyFor,
    course.totalLessons,
  );

  // Course-level event; LessonID is empty by convention for non-lesson events.
  live.events.track('session_started', { lessonId: '' });

  // --- one-time local → remote migration (returning signed-in visit) --------
  const maybeMigrateLocal = async (): Promise<void> => {
    if (!remote || !remote.isSignedIn) return;
    const snap = readLocalSnapshot(persistentStorage);
    if (!snap || snap.studentId === remote.studentId) return;
    if (remote.profile?.migratedFromLocalId === snap.studentId) return;
    try {
      const res = await remote.migrateLocalProgress(snap.studentId, snap);
      if (res.queued) console.info('[bootstrap] migration queued for later sync.');
    } catch (err) {
      console.warn('[bootstrap] local migration failed (will retry on next sign-in):', err);
    }
  };
  if (remoteConfigured && remote?.isSignedIn && providerSetup.provider === remote) {
    void maybeMigrateLocal();
  }

  // --- settings & audio ------------------------------------------------------
  const settings = new SettingsStore(persistentStorage);
  const applyTheme = (t: 'light' | 'dark'): void => {
    document.documentElement.dataset.theme = t;
  };
  applyTheme(settings.get().theme);
  settings.subscribe((s) => applyTheme(s.theme));
  const audio = new AudioService(manifest);
  audio.setRate(settings.get().playbackRate);
  settings.subscribe((s) => audio.setRate(s.playbackRate));

  // --- active time tracker (policy: docs/ACTIVE_TIME_POLICY.md) --------------
  const tracker = new ActiveTimeTracker({ ...appConfig.timeTracking });
  if (!appConfig.features.timeTracking) {
    tracker.destroy(); // becomes a permanent no-op
  } else {
    // Real user interactions ping the tracker (audio play pings via onPlayed).
    for (const type of ['pointerdown', 'keydown', 'wheel', 'touchstart'] as const) {
      window.addEventListener(type, () => tracker.ping(), { passive: true, capture: true });
    }
  }

  // --- app + auth wiring ------------------------------------------------------
  const auth: AuthInfo = {
    mode: remoteConfigured ? 'remote' : 'local',
    signedIn: remote?.isSignedIn ?? false,
    studentName: remote?.isSignedIn ? remote.profile?.studentName : undefined,
    remoteConfigured,

    async signIn(name: string, code: string): Promise<void> {
      if (!remote) throw new Error('Remote progress is not configured in this build.');
      // Carry this device's earlier local progress IN the sign-in request —
      // one round trip: verify + token + migration + full cache (fast gate).
      const snap = readLocalSnapshot(persistentStorage);
      const migration =
        snap && snap.studentId && snap.studentId.startsWith('stu-local-')
          ? { localStudentId: snap.studentId, snapshot: snap }
          : undefined;
      const student = await remote.signIn(name, code, migration); // throws RemoteApiError on bad credentials
      activeStudent = student;
      live.events = new EventLogger(remote, student.studentId, sessionId);
      live.progress = new ProgressService(remote, student, live.events, totalVocabularyFor, course.totalLessons);
      ctx.progress = live.progress;
      providerSetup = { provider: remote, fellBackToLocal: false };
      auth.signedIn = true;
      auth.studentName = student.studentName;
      live.events.track('session_started', { lessonId: '' });
      app.rerender();
      refreshSyncBadge(remote.syncState);
    },

    async signOut(): Promise<void> {
      if (!remote) return;
      await remote.signOut();
      activeStudent = localStudent;
      const local = new LocalProgressProvider(persistentStorage);
      await local.init(localStudent);
      providerSetup = { provider: local, fellBackToLocal: false };
      live.events = new EventLogger(local, localStudent.studentId, sessionId);
      live.progress = new ProgressService(local, localStudent, live.events, totalVocabularyFor, course.totalLessons);
      ctx.progress = live.progress;
      auth.signedIn = false;
      auth.studentName = undefined;
      app.rerender();
      refreshSyncBadge(local.syncState);
    },

    warmUp(): void {
      remote?.warmUp();
    },
  };

  const ctx: AppContext = {
    progress: live.progress,
    audio,
    settings,
    tracker,
    auth,
    sessionDedupe: new Set<string>(),
  };
  const app = createApp(root, ctx);

  audio.setCallbacks({
    // Central, honest audio telemetry: events fire only when a clip actually
    // starts playing. Conversation play actions are logged at the action site
    // (once per user action, not once per line — spec §17E: avoid spam).
    onPlayed: (actx) => {
      tracker.ping();
      if (actx.kind === 'vocabulary') {
        live.progress.track('vocabulary_audio_played', actx.lessonId, actx.vocabularyId);
      } else if (actx.kind === 'vocabulary-example' || actx.kind === 'sentence' || actx.kind === 'grammar-example') {
        live.progress.track('sentence_audio_played', actx.lessonId, actx.vocabularyId);
      }
    },
    onMissing: () => app.showToast(S.audioMissing.en, S.audioMissing.zh),
  });

  // --- durability: never lose the tail of a session ---------------------------
  const flushAll = (): void => {
    void tracker.flush();
    void live.events.flush().finally(() => void live.progress.provider.flush());
  };
  window.addEventListener('pagehide', flushAll);
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') flushAll();
  });

  return {
    app, ctx, progress: live.progress, provider: providerSetup.provider, providerSetup,
    events: live.events, tracker, audio, settings, student: activeStudent, sessionId,
    remote, auth,
  };
}
