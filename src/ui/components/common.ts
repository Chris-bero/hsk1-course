import type { LessonStatus } from '../../types/progress';
import { S, type BiLabel } from '../../i18n/strings';
import { el } from '../dom';

const STATUS_LABEL = {
  not_started: S.statusNotStarted,
  in_progress: S.statusInProgress,
  completed: S.statusCompleted,
} as const;

/** Small colored chip showing a lesson status (bilingual). */
export function statusChip(status: LessonStatus): HTMLSpanElement {
  const label = STATUS_LABEL[status];
  return el('span', { class: `chip chip-${status}` },
    el('span', { text: label.en }),
    el('span', { class: 'chip-zh', text: label.zh }),
  );
}

/** Green "Ready" / grey "Soon" availability pill for lesson cards. */
export function availabilityPill(available: boolean): HTMLSpanElement {
  return available
    ? el('span', { class: 'pill-state pill-ready' }, '✓ ', el('span', { text: S.ready.en }))
    : el('span', { class: 'pill-state pill-soon' }, '⏳ ', el('span', { text: S.soon.en }));
}

/**
 * Reference-style section header: red gradient square with a single hanzi,
 * big bilingual title, short red underline bar, grey subtitle.
 */
export function sectionHeader(
  iconChar: string,
  title: BiLabel,
  subtitle?: string,
  right?: HTMLElement,
): HTMLElement {
  return el('div', { class: 'section-head' },
    el('div', { class: 'section-head-left' },
      el('span', { class: 'section-icon', text: iconChar, lang: 'zh' }),
      el('div', {},
        el('h2', { class: 'section-title' },
          el('span', { class: 'en', text: title.en }),
          el('span', { class: 'zh', text: `· ${title.zh}`, lang: 'zh' }),
        ),
        el('div', { class: 'section-bar' }),
        subtitle ? el('p', { class: 'section-sub', text: subtitle }) : null,
      ),
    ),
    right ?? null,
  );
}

/** Thin gradient progress bar. */
export function progressBar(pct: number, caption?: string): HTMLElement {
  const clamped = Math.max(0, Math.min(100, Math.round(pct)));
  return el('div', { class: 'progress' },
    el('div', { class: 'progress-track', attrs: { role: 'progressbar', 'aria-valuenow': clamped, 'aria-valuemin': 0, 'aria-valuemax': 100 } },
      el('div', { class: 'progress-fill', attrs: { style: `width:${clamped}%` } }),
    ),
    caption ? el('div', { class: 'progress-caption', text: caption }) : null,
  );
}
