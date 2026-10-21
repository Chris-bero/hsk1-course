/**
 * Sticky header in the reference style: red gradient 汉 logo, bold title with
 * a context subtitle, tab navigation (Lessons/How it works on home;
 * Words/Grammar/Dialogue/Practice inside a lesson), and on the right the
 * Phase 2 auth area (sign-in / signed-in chip), an HONEST storage badge
 * (spec §18A) and the theme toggle.
 */
import { course, getLesson } from '../../content/course';
import { S } from '../../i18n/strings';
import type { SyncState } from '../../types/progress';
import { el } from '../dom';
import type { AppContext } from '../context';
import type { Route } from '../../app';

const SYNC_BADGE: Record<SyncState, { label: { en: string; zh: string }; cls: string }> = {
  'local-only': { label: S.localOnlyBadge, cls: 'badge-local' },
  pending: { label: S.syncPendingBadge, cls: 'badge-pending' },
  synced: { label: S.syncedBadge, cls: 'badge-synced' },
  error: { label: S.syncErrorBadge, cls: 'badge-error' },
};

/**
 * Live in-place badge update (called by bootstrap when the remote provider's
 * syncState changes). Avoids a full re-render — re-rendering would stop
 * audio playback mid-sentence, and sync transitions happen during study.
 */
export function refreshSyncBadge(state: SyncState): void {
  const info = SYNC_BADGE[state] ?? SYNC_BADGE['local-only'];
  for (const node of Array.from(document.querySelectorAll<HTMLElement>('[data-sync-badge]'))) {
    node.className = `badge ${info.cls}`;
    node.textContent = `${info.label.en} · ${info.label.zh}`;
    node.dataset.syncBadge = state;
  }
}

interface TabDef {
  href: string;
  icon: string;
  label: { en: string; zh: string };
  active: boolean;
}

export function header(ctx: AppContext, route: Route, cleanups: (() => void)[] = []): HTMLElement {
  const lesson = route.name === 'lesson' ? getLesson(route.id) : null;

  const subtitle = lesson
    ? `${S.lesson.en} ${lesson.order} · ${lesson.title.zh}`
    : `${S.siteSubtitle.en} · ${S.siteSubtitle.zh}`;

  const tabs: TabDef[] =
    route.name === 'lesson'
      ? [
          { href: `#/lesson/${route.id}/words`, icon: '📘', label: S.tabWords, active: route.tab === 'words' },
          { href: `#/lesson/${route.id}/grammar`, icon: '📐', label: S.tabGrammar, active: route.tab === 'grammar' },
          { href: `#/lesson/${route.id}/dialogue`, icon: '💬', label: S.tabDialogue, active: route.tab === 'dialogue' },
          { href: `#/lesson/${route.id}/practice`, icon: '🎯', label: S.tabPractice, active: route.tab === 'practice' },
        ]
      : [
          {
            href: '#/', icon: '📚', label: S.lessons,
            active: route.name === 'home' && route.tab === 'lessons',
          },
          {
            href: '#/how-it-works', icon: '✨', label: S.howItWorks,
            active: route.name === 'home' && route.tab === 'how',
          },
          { href: '#/me', icon: '👤', label: S.myProgress, active: route.name === 'me' },
        ];

  const badge = SYNC_BADGE[ctx.progress.provider.syncState] ?? SYNC_BADGE['local-only'];

  const themeBtn = el('button', {
    class: 'icon-btn theme-btn',
    attrs: { type: 'button', title: 'Theme · 主题' },
    text: ctx.settings.get().theme === 'dark' ? '☀️' : '🌙',
  });
  themeBtn.addEventListener('click', () => {
    ctx.settings.update({ theme: ctx.settings.get().theme === 'dark' ? 'light' : 'dark' });
  });
  const unsubTheme = ctx.settings.subscribe((s) => {
    themeBtn.textContent = s.theme === 'dark' ? '☀️' : '🌙';
  });
  cleanups.push(unsubTheme);

  return el('header', { class: 'app-header' },
    el('div', { class: 'container header-inner' },
      el('a', { class: 'brand', attrs: { href: '#/' } },
        el('span', { class: 'brand-mark', text: '汉' }),
        el('span', { class: 'brand-text' },
          el('strong', { class: 'brand-title', text: course.title.en }),
          el('span', { class: 'brand-sub', text: subtitle, lang: lesson ? 'zh' : undefined }),
        ),
      ),
      el('nav', { class: 'header-tabs', attrs: { 'aria-label': 'Sections' } },
        ...tabs.map((t) =>
          el('a', { class: `tab${t.active ? ' active' : ''}`, attrs: { href: t.href } },
            el('span', { class: 'tab-icon', text: t.icon }),
            el('span', { text: t.label.en }),
          ),
        ),
      ),
      el('div', { class: 'header-right' },
        ctx.auth.mode === 'remote' && ctx.auth.signedIn
          ? el('a', {
              class: 'auth-chip',
              attrs: { href: '#/me', title: `${S.myProgress.en} · ${S.myProgress.zh}` },
            },
              el('span', { class: 'auth-avatar', attrs: { 'aria-hidden': 'true' }, text: '👤' }),
              el('span', { class: 'auth-name', text: ctx.auth.studentName ?? ctx.progress.student.studentId }),
              el('button', {
                class: 'auth-signout',
                attrs: { type: 'button', title: `${S.signOut.en} · ${S.signOut.zh}` },
                text: S.signOut.en,
                onClick: (e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  void ctx.auth.signOut();
                },
              }),
            )
          : null,
        el('span', {
          class: `badge ${badge.cls}`,
          attrs: { 'data-sync-badge': ctx.progress.provider.syncState },
          title: `${S.localOnlyNotice.en}\n${S.localOnlyNotice.zh}`,
        }, `${badge.label.en} · ${badge.label.zh}`),
        themeBtn,
      ),
    ),
  );
}
