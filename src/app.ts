/**
 * App shell + hash router (reference-style layout).
 *
 * Routes:
 *   #/                          → home, Lessons tab
 *   #/how-it-works              → home, How-it-works tab
 *   #/lesson/<id>[/<tab>]       → lesson page; tab = words|grammar|dialogue|practice
 *
 * Owns: render lifecycle (race guard + cleanup of subscriptions), decorative
 * watermark hanzi, toast host, and the floating scroll-to-top button.
 */
import { getLesson, getLessonSummaries } from './content/course';
import { clear, el } from './ui/dom';
import type { AppContext } from './ui/context';
import { header } from './ui/components/header';
import { homeView, type HomeTab } from './ui/components/homeView';
import { lessonView, unavailableLessonView } from './ui/components/lessonView';
import { profileView } from './ui/components/profileView';
import { signInGate } from './ui/components/signInGate';

export type LessonTab = 'words' | 'grammar' | 'dialogue' | 'practice';

export type Route =
  | { name: 'home'; tab: HomeTab }
  | { name: 'me' }
  | { name: 'lesson'; id: string; tab: LessonTab };

export interface App {
  showToast(en: string, zh: string): void;
  /**
   * Re-run the current route render (used after Phase 2 sign-in/sign-out
   * swaps the progress stack — the header chip and badge must refresh).
   */
  rerender(): void;
}

const TABS: LessonTab[] = ['words', 'grammar', 'dialogue', 'practice'];

export function parseRoute(hash: string): Route {
  const lessonMatch = /^#\/lesson\/([\w-]+)(?:\/([\w-]+))?$/.exec(hash);
  if (lessonMatch) {
    const tab = TABS.includes(lessonMatch[2] as LessonTab) ? (lessonMatch[2] as LessonTab) : 'words';
    return { name: 'lesson', id: lessonMatch[1]!, tab };
  }
  if (hash.startsWith('#/me')) return { name: 'me' };
  if (hash.startsWith('#/how-it-works')) return { name: 'home', tab: 'how' };
  return { name: 'home', tab: 'lessons' };
}

export function createApp(root: HTMLElement, ctx: AppContext): App {
  let renderToken = 0;
  let cleanups: (() => void)[] = [];

  // Decorative watermark hanzi (fixed, behind everything).
  const watermark = el('div', { class: 'watermark', attrs: { 'aria-hidden': 'true' } },
    el('span', { class: 'wm wm-1', text: '汉' }),
    el('span', { class: 'wm wm-2', text: '语' }),
  );

  const toastHost = el('div', { class: 'toast-host', attrs: { 'aria-live': 'polite' } });

  // Floating scroll-to-top button.
  const fab = el('button', { class: 'fab', attrs: { type: 'button', title: '↑', 'aria-label': 'Scroll to top' } }, '↑');
  fab.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  const onScroll = (): void => {
    fab.classList.toggle('show', window.scrollY > 400);
  };
  window.addEventListener('scroll', onScroll, { passive: true });

  function showToast(en: string, zh: string): void {
    const toast = el('div', { class: 'toast' }, el('span', { text: en }), el('span', { class: 'toast-zh', text: zh }));
    toastHost.appendChild(toast);
    setTimeout(() => toast.classList.add('show'), 10);
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, 2_600);
  }

  async function render(): Promise<void> {
    const token = ++renderToken;
    for (const fn of cleanups) {
      try { fn(); } catch { /* ignore */ }
    }
    cleanups = [];
    ctx.audio.stop();

    const route = parseRoute(window.location.hash);
    clear(root);

    // Phase 2 hard gate: remote-mode builds render NOTHING of the course
    // until the student signs in with the teacher-issued name + code.
    // (toastHost stays mounted so sign-in flows can still toast.)
    if (ctx.auth.mode === 'remote' && !ctx.auth.signedIn) {
      ctx.tracker.setLesson(null, () => {});
      root.appendChild(toastHost);
      root.appendChild(signInGate(ctx));
      return;
    }

    root.appendChild(watermark);
    root.appendChild(header(ctx, route, cleanups));
    root.appendChild(toastHost);
    root.appendChild(fab);

    if (route.name === 'me') {
      ctx.tracker.setLesson(null, () => {});
      const view = await profileView(ctx);
      if (token !== renderToken) return;
      root.appendChild(view);
      window.scrollTo(0, 0);
      return;
    }

    if (route.name === 'home') {
      ctx.tracker.setLesson(null, () => {});
      const view = await homeView(ctx, route.tab);
      if (token !== renderToken) return;
      root.appendChild(view);
      window.scrollTo(0, 0);
      return;
    }

    const lesson = getLesson(route.id);
    if (!lesson) {
      ctx.tracker.setLesson(null, () => {});
      const summary = getLessonSummaries().find((l) => l.id === route.id);
      const view = summary
        ? unavailableLessonView(summary.order, summary.title.zh, summary.title.en)
        : unavailableLessonView(0, '', route.id);
      if (token !== renderToken) return;
      root.appendChild(view);
      window.scrollTo(0, 0);
      return;
    }

    // Bind active-time tracking to this lesson (docs/ACTIVE_TIME_POLICY.md).
    ctx.tracker.setLesson(lesson.id, (lessonId, seconds) => ctx.progress.addActiveTime(lessonId, seconds));

    const mounted = await lessonView(ctx, lesson, route.tab, cleanups);
    if (token !== renderToken) return;
    root.appendChild(mounted.root);
    window.scrollTo(0, 0);
  }

  window.addEventListener('hashchange', () => void render());
  void render();

  return { showToast, rerender: () => void render() };
}
