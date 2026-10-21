/**
 * Display & audio settings (pinyin / translation visibility, playback speed),
 * persisted in localStorage. Components subscribe and re-render on change.
 */
import { appConfig, PLAYBACK_RATES, type PlaybackRate } from '../config';

export interface DisplaySettings {
  showPinyin: boolean;
  showTranslation: boolean;
  playbackRate: PlaybackRate;
  /** Manual theme choice (reference design ships a light/dark toggle). */
  theme: 'light' | 'dark';
}

const DEFAULTS: DisplaySettings = {
  showPinyin: true,
  showTranslation: true,
  playbackRate: 1,
  theme: 'light',
};

type Listener = (s: DisplaySettings) => void;

export class SettingsStore {
  private settings: DisplaySettings;
  private listeners = new Set<Listener>();

  constructor(private storage: Storage) {
    this.settings = { ...DEFAULTS };
    try {
      const raw = storage.getItem(appConfig.storageKeys.settings);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<DisplaySettings>;
        if (typeof parsed.showPinyin === 'boolean') this.settings.showPinyin = parsed.showPinyin;
        if (typeof parsed.showTranslation === 'boolean')
          this.settings.showTranslation = parsed.showTranslation;
        if (
          typeof parsed.playbackRate === 'number' &&
          (PLAYBACK_RATES as readonly number[]).includes(parsed.playbackRate)
        ) {
          this.settings.playbackRate = parsed.playbackRate as PlaybackRate;
        }
        if (parsed.theme === 'light' || parsed.theme === 'dark') this.settings.theme = parsed.theme;
      }
    } catch {
      // Ignore corrupt settings; use defaults.
    }
  }

  get(): Readonly<DisplaySettings> {
    return this.settings;
  }

  update(patch: Partial<DisplaySettings>): void {
    this.settings = { ...this.settings, ...patch };
    try {
      this.storage.setItem(appConfig.storageKeys.settings, JSON.stringify(this.settings));
    } catch {
      // Non-fatal: settings just won't persist.
    }
    for (const fn of this.listeners) fn(this.settings);
  }

  subscribe(fn: Listener): () => void {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  }
}
