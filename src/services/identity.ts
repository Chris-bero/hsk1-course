/**
 * Learner identity (Phase 1).
 *
 * Phase 1 uses an anonymous, device-local student ID. No name or email is
 * collected (spec §17A: collect only what is necessary; a name/email alone is
 * NOT authentication). In Phase 2, the backend issues/validates the real
 * StudentID and this local ID becomes a migration key — see
 * docs/PHASE2_INTEGRATION.md §"Identity".
 */
import { appConfig } from '../config';
import type { StudentProfile } from '../types/progress';

export function uuid(): string {
  const c = globalThis.crypto;
  if (c && typeof c.randomUUID === 'function') return c.randomUUID();
  // Fallback for very old environments (still unique enough for local use).
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (ch) => {
    const r = (Math.random() * 16) | 0;
    const v = ch === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function getOrCreateLocalStudent(storage: Storage): StudentProfile {
  const key = appConfig.storageKeys.identity;
  try {
    const raw = storage.getItem(key);
    if (raw) {
      const parsed = JSON.parse(raw) as StudentProfile;
      if (parsed && typeof parsed.studentId === 'string') return parsed;
    }
  } catch {
    // Corrupt entry — regenerate below.
  }
  const student: StudentProfile = {
    studentId: `stu-local-${uuid()}`,
    courseLevel: appConfig.courseId,
    enrollmentDate: new Date().toISOString().slice(0, 10),
    accountStatus: 'local',
  };
  try {
    storage.setItem(key, JSON.stringify(student));
  } catch {
    // Storage full/blocked — continue in-memory for this page load.
  }
  return student;
}

/**
 * Session ID: stable across page refreshes (sessionStorage), new per tab.
 * Used as LearningEvents.SessionID in the future spreadsheet.
 */
export function getOrCreateSessionId(storage: Storage): string {
  const key = appConfig.storageKeys.session;
  try {
    const existing = storage.getItem(key);
    if (existing) return existing;
  } catch {
    /* fall through */
  }
  const id = `sess-${uuid()}`;
  try {
    storage.setItem(key, id);
  } catch {
    /* in-memory only */
  }
  return id;
}

/* ------------------------------------------------------------------------ */
/* Phase 2: remote session (teacher-issued account)                          */
/* ------------------------------------------------------------------------ */

/** A signed-in remote learner: server-issued profile + session token. */
export type RemoteStudentProfile = StudentProfile & { migratedFromLocalId?: string | null };

export interface RemoteSession {
  token: string;
  student: RemoteStudentProfile;
}

interface StoredRemoteSession {
  version: 1;
  token: string;
  student: RemoteStudentProfile;
}

/**
 * Load the persisted remote session, if any. The token is stored raw on the
 * client (the server keeps only its SHA-256 hash); storage access is wrapped
 * because sandboxed contexts can throw on mere property access.
 */
export function loadRemoteSession(storage: Storage | null): RemoteSession | null {
  if (!storage) return null;
  try {
    const raw = storage.getItem(appConfig.storageKeys.remoteSession);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredRemoteSession;
    if (parsed && parsed.version === 1 && typeof parsed.token === 'string' && parsed.token &&
        parsed.student && typeof parsed.student.studentId === 'string') {
      return { token: parsed.token, student: parsed.student };
    }
  } catch {
    /* corrupt or blocked — treat as signed-out */
  }
  return null;
}

export function saveRemoteSession(storage: Storage | null, session: RemoteSession): void {
  if (!storage) return;
  try {
    const data: StoredRemoteSession = { version: 1, token: session.token, student: session.student };
    storage.setItem(appConfig.storageKeys.remoteSession, JSON.stringify(data));
  } catch {
    /* storage blocked — session survives in memory for this page load */
  }
}

export function clearRemoteSession(storage: Storage | null): void {
  if (!storage) return;
  try {
    storage.removeItem(appConfig.storageKeys.remoteSession);
  } catch {
    /* ignore */
  }
}
