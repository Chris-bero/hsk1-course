/**
 * signInGate — Phase 2 mandatory sign-in (teacher-issued name + access code).
 *
 * When the build is configured for remote progress and no valid session
 * exists, the router renders ONLY this view: lesson content is inaccessible
 * until the student signs in (product decision 2026-10: accounts are created
 * by the teacher; no anonymous/local browsing).
 *
 * The gate delegates to ctx.auth.signIn(); on success bootstrap swaps the
 * progress stack and app.rerender() replaces the gate with the real site.
 * Returning signed-out students land here again automatically.
 */
import { S } from '../../i18n/strings';
import { course } from '../../content/course';
import { el } from '../dom';
import type { AppContext } from '../context';

export function signInGate(ctx: AppContext): HTMLElement {
  const errorBox = el('div', { class: 'signin-error', attrs: { role: 'alert' } });

  // Cold-start absorber: wake the Apps Script instance NOW (page load) and
  // once more on first interaction, so the sign-in click hits a warm server.
  ctx.auth.warmUp();
  let warmedOnce = false;
  const warm = (): void => {
    if (warmedOnce) return;
    warmedOnce = true;
    ctx.auth.warmUp();
  };

  const nameInput = el('input', {
    class: 'signin-input',
    attrs: {
      type: 'text', id: 'signin-name', autocomplete: 'name',
      placeholder: S.signInNamePlaceholder.en,
    },
  }) as HTMLInputElement;
  nameInput.addEventListener('focus', warm, { once: true });
  nameInput.addEventListener('input', warm, { once: true });

  const codeInput = el('input', {
    class: 'signin-input signin-code',
    attrs: {
      type: 'text', id: 'signin-code', autocomplete: 'off', inputmode: 'latin',
      placeholder: S.signInCodePlaceholder.en, maxlength: '12', spellcheck: 'false',
    },
  }) as HTMLInputElement;
  codeInput.addEventListener('focus', warm, { once: true });
  codeInput.addEventListener('input', () => {
    warm();
    codeInput.value = codeInput.value.toUpperCase();
  });

  const submitLabel = el('span', { text: S.signInSubmit.en });
  const submitZh = el('span', { class: 'signin-zh', text: S.signInSubmit.zh });
  const submitBtn = el('button', {
    class: 'signin-submit gate-submit', attrs: { type: 'button' },
  },
    el('span', { class: 'gate-spinner', attrs: { 'aria-hidden': 'true' } }),
    submitLabel,
    submitZh,
  ) as HTMLButtonElement;

  let busy = false;

  async function submit(): Promise<void> {
    if (busy) return;
    const name = nameInput.value.trim();
    const code = codeInput.value.trim();
    errorBox.textContent = '';
    if (!name || !code) {
      errorBox.textContent = `${S.signInGateHelp.en}`;
      (name ? codeInput : nameInput).focus();
      return;
    }
    busy = true;
    submitBtn.disabled = true;
    submitBtn.classList.add('busy');
    submitLabel.textContent = S.signingIn.en;
    submitZh.textContent = S.signingIn.zh;
    try {
      await ctx.auth.signIn(name, code);
      // Success: bootstrap re-renders and this view disappears.
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      errorBox.textContent = /NETWORK|Failed to fetch|fetch/i.test(msg)
        ? `${S.signInNetworkError.en} · ${S.signInNetworkError.zh}`
        : msg;
      busy = false;
      submitBtn.disabled = false;
      submitBtn.classList.remove('busy');
      submitLabel.textContent = S.signInSubmit.en;
      submitZh.textContent = S.signInSubmit.zh;
      codeInput.select();
    }
  }

  submitBtn.addEventListener('click', () => void submit());
  const onKey = (e: KeyboardEvent): void => {
    if (e.key === 'Enter' && !busy) {
      e.preventDefault();
      void submit();
    }
  };
  nameInput.addEventListener('keydown', onKey);
  codeInput.addEventListener('keydown', onKey);

  const card = el('div', { class: 'signin-card gate-card' },
    el('div', { class: 'signin-mark', attrs: { 'aria-hidden': 'true' }, text: '汉' }),
    el('h1', { class: 'gate-title' },
      el('span', { text: S.signInGateTitle.en }),
      el('span', { class: 'signin-zh', text: S.signInGateTitle.zh, lang: 'zh' }),
    ),
    el('p', { class: 'gate-course' }, `${course.title.en} · `, el('span', { text: course.title.zh, lang: 'zh' })),
    el('p', { class: 'signin-help', text: S.signInGateHelp.en }),
    el('p', { class: 'signin-help signin-help-zh', text: S.signInGateHelp.zh, lang: 'zh' }),
    el('label', { class: 'signin-label', attrs: { for: 'signin-name' } },
      el('span', { text: S.signInNameLabel.en }),
      el('span', { class: 'signin-zh', text: S.signInNameLabel.zh, lang: 'zh' }),
    ),
    nameInput,
    el('label', { class: 'signin-label', attrs: { for: 'signin-code' } },
      el('span', { text: S.signInCodeLabel.en }),
      el('span', { class: 'signin-zh', text: S.signInCodeLabel.zh, lang: 'zh' }),
    ),
    codeInput,
    errorBox,
    submitBtn,
    el('p', { class: 'gate-wait' },
      el('span', { text: S.signInWaitNote.en }),
      el('span', { class: 'signin-zh', text: ` · ${S.signInWaitNote.zh}`, lang: 'zh' }),
    ),
  );

  const root = el('div', { class: 'gate-root' }, card);
  requestAnimationFrame(() => {
    root.classList.add('show');
    nameInput.focus();
  });
  return root;
}
