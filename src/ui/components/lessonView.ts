/**
 * Lesson view shell: sticky control bar (home, speed pills, Pinyin/English
 * pills, completion button + status chip) and the active tab's content
 * (Words / Grammar / Dialogue / Practice).
 */
import type { Lesson } from '../../types/content';
import { PLAYBACK_RATES, type PlaybackRate } from '../../config';
import { S } from '../../i18n/strings';
import { getLessonByOrder, getLessonSummaries } from '../../content/course';
import type { LessonProgressRecord } from '../../types/progress';
import { clear, el } from '../dom';
import type { AppContext } from '../context';
import { statusChip } from './common';
import { dialogueTab } from './dialogueTab';
import { grammarTab } from './grammarTab';
import { practiceTab } from './practiceTab';
import { wordsTab } from './wordsTab';
import type { LessonTab } from '../../app';

export interface MountedView {
  root: HTMLElement;
}

export async function lessonView(
  ctx: AppContext,
  lesson: Lesson,
  tab: LessonTab,
  cleanups: (() => void)[],
): Promise<MountedView> {
  const record = (await ctx.progress.openLesson(lesson.id)) as LessonProgressRecord;
  window.dispatchEvent(new Event('progress-changed'));

  const container = el('div', {
    class: 'lesson-root',
    dataset: {
      lessonId: lesson.id,
      pinyin: ctx.settings.get().showPinyin ? 'show' : 'hide',
      translation: ctx.settings.get().showTranslation ? 'show' : 'hide',
    },
  });

  // ---- control bar ----------------------------------------------------------
  const homeBtn = el('a', {
    class: 'icon-btn home-btn',
    attrs: { href: '#/', title: `${S.allLessons.en} · ${S.allLessons.zh}` },
    text: '🏠',
  });

  const speedPills = PLAYBACK_RATES.map((r) =>
    el('button', {
      class: `speed-pill${r === ctx.settings.get().playbackRate ? ' active' : ''}`,
      attrs: { type: 'button', 'data-rate': String(r) },
      text: `${r}×`,
    }),
  );
  for (const pill of speedPills) {
    pill.addEventListener('click', () => {
      const rate = Number(pill.getAttribute('data-rate')) as PlaybackRate;
      ctx.settings.update({ playbackRate: rate });
    });
  }

  const pinyinPill = pillToggle(S.pinyin, ctx.settings.get().showPinyin, (on) =>
    ctx.settings.update({ showPinyin: on }),
  );
  const englishPill = pillToggle(S.translation, ctx.settings.get().showTranslation, (on) =>
    ctx.settings.update({ showTranslation: on }),
  );

  const syncControls = (s: { showPinyin: boolean; showTranslation: boolean; playbackRate: PlaybackRate }): void => {
    container.dataset['pinyin'] = s.showPinyin ? 'show' : 'hide';
    container.dataset['translation'] = s.showTranslation ? 'show' : 'hide';
    syncPill(pinyinPill, s.showPinyin);
    syncPill(englishPill, s.showTranslation);
    for (const pill of speedPills) {
      pill.classList.toggle('active', pill.getAttribute('data-rate') === String(s.playbackRate));
    }
  };
  const unsub = ctx.settings.subscribe(syncControls);
  cleanups.push(unsub);

  // ---- completion button + status chip ---------------------------------------
  const completeBtn = el('button', { class: 'btn', attrs: { type: 'button' } }) as HTMLButtonElement;
  const chipHost = el('div', { class: 'status-chip-host' }, statusChip(record.status));
  const syncComplete = (rec: LessonProgressRecord): void => {
    const done = rec.status === 'completed';
    completeBtn.className = done ? 'btn btn-completed' : 'btn btn-grad';
    completeBtn.textContent = done
      ? `✓ ${S.statusCompleted.en} · ${S.statusCompleted.zh}`
      : `✓ ${S.markComplete.en} · ${S.markComplete.zh}`;
    completeBtn.title = done
      ? `${S.unmarkComplete.en} · ${S.unmarkComplete.zh}`
      : `${S.markComplete.en} · ${S.markComplete.zh}`;
    clear(chipHost);
    chipHost.appendChild(statusChip(rec.status));
  };
  syncComplete(record);
  completeBtn.addEventListener('click', () => {
    void ctx.progress.setLessonCompleted(lesson.id, record.status !== 'completed').then((updated) => {
      Object.assign(record, updated);
      syncComplete(record);
      window.dispatchEvent(new Event('progress-changed'));
    });
  });

  const controls = el('div', { class: 'controls-bar' },
    el('div', { class: 'container controls-inner' },
      homeBtn,
      el('div', { class: 'speed-group' },
        el('span', { class: 'speed-turtle', text: '🐢' }),
        ...speedPills,
      ),
      pinyinPill,
      englishPill,
      el('div', { class: 'controls-right' }, chipHost, completeBtn),
    ),
  );

  // ---- tab content -------------------------------------------------------------
  let content: HTMLElement;
  switch (tab) {
    case 'grammar':
      content = grammarTab(ctx, lesson);
      break;
    case 'dialogue':
      content = dialogueTab(ctx, lesson, cleanups);
      break;
    case 'practice':
      content = await practiceTab(ctx, lesson);
      break;
    case 'words':
    default:
      content = await wordsTab(ctx, lesson);
      break;
  }

  container.appendChild(controls);
  container.appendChild(el('main', { class: 'container lesson-main' }, content, footerNav(lesson)));
  return { root: container };
}

/** Prev / next lesson links under the tab content. */
function footerNav(lesson: Lesson): HTMLElement {
  const prev = getLessonByOrder(lesson.order - 1);
  const next = getLessonByOrder(lesson.order + 1);
  return el('div', { class: 'lesson-footer-nav' },
    prev
      ? el('a', { class: 'btn', attrs: { href: `#/lesson/${prev.id}`, title: `${S.prevLesson.en} · ${S.prevLesson.zh}` } }, `← ${prev.title.zh}`)
      : el('span'),
    next
      ? el('a', { class: 'btn', attrs: { href: `#/lesson/${next.id}`, title: `${S.nextLesson.en} · ${S.nextLesson.zh}` } }, `${next.title.zh} →`)
      : el('span'),
  );
}

/** Page shown for registered-but-not-yet-extracted lessons. */
export function unavailableLessonView(order: number, titleZh: string, titleEn: string): HTMLElement {
  const prev = getLessonByOrder(order - 1);
  const next = getLessonByOrder(order + 1);
  const summaries = getLessonSummaries();
  return el('main', { class: 'container' },
    el('div', { class: 'panel unavailable-panel' },
      el('a', { class: 'back-link', attrs: { href: '#/' } }, `‹ ${S.allLessons.en} · ${S.allLessons.zh}`),
      el('h1', {}, `${S.lesson.en} ${order} · ${titleZh} ${titleEn}`),
      el('p', { class: 'notice' }, `${S.unavailableNotice.en} ${S.unavailableNotice.zh}`),
      el('p', { class: 'muted', text: `${summaries.length} ${S.lessons.zh} — ${S.allLessonsSub.en}` }),
      el('div', { class: 'lesson-footer-nav' },
        prev ? el('a', { class: 'btn', attrs: { href: `#/lesson/${prev.id}` } }, `← ${prev.title.zh}`) : el('span'),
        next ? el('a', { class: 'btn', attrs: { href: `#/lesson/${next.id}` } }, `${next.title.zh} →`) : el('span'),
      ),
    ),
  );
}

// ---- pill toggle helpers -------------------------------------------------------

function pillToggle(label: { en: string; zh: string }, on: boolean, onToggle: (on: boolean) => void): HTMLButtonElement {
  const btn = el('button', {
    class: 'pill toggle-btn',
    attrs: { type: 'button', 'aria-pressed': String(on), title: `${label.zh}` },
  }) as HTMLButtonElement;
  syncPill(btn, on, label);
  btn.addEventListener('click', () => {
    const nextOn = btn.getAttribute('aria-pressed') !== 'true';
    syncPill(btn, nextOn, label);
    onToggle(nextOn);
  });
  return btn;
}

function syncPill(btn: HTMLButtonElement, on: boolean, label?: { en: string; zh: string }): void {
  btn.classList.toggle('on', on);
  btn.setAttribute('aria-pressed', String(on));
  if (label) {
    btn.textContent = '';
    btn.append(el('span', { class: 'dot' }), el('span', { text: `${label.en}` }));
  }
}
