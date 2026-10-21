/**
 * Provider factory — the one place that decides where progress lives.
 * If the configured remote provider fails (Phase 2), we fall back to local
 * storage and report it via syncState, so student progress is never lost
 * silently (spec §18E).
 */
import { appConfig } from '../config';
import type { StudentProfile } from '../types/progress';
import { LocalProgressProvider } from './LocalProgressProvider';
import { RemoteProgressProvider } from './RemoteProgressProvider';
import type { ProgressProvider } from './ProgressProvider';

export interface ProviderSetupResult {
  provider: ProgressProvider;
  /** True when the configured provider failed and we fell back to local. */
  fellBackToLocal: boolean;
  fallbackReason?: string;
}

export async function createProgressProvider(
  student: StudentProfile,
  storage?: Storage | null,
): Promise<ProviderSetupResult> {
  if (appConfig.progress.provider === 'remote') {
    const remote = new RemoteProgressProvider(appConfig.progress.remoteEndpoint);
    try {
      await remote.init(student);
      return { provider: remote, fellBackToLocal: false };
    } catch (err) {
      console.warn('[progress] remote provider unavailable, falling back to local:', err);
      const local = new LocalProgressProvider(storage ?? null);
      await local.init(student);
      return {
        provider: local,
        fellBackToLocal: true,
        fallbackReason: err instanceof Error ? err.message : String(err),
      };
    }
  }
  const local = new LocalProgressProvider(storage ?? null);
  await local.init(student);
  return { provider: local, fellBackToLocal: false };
}
