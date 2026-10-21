/**
 * Grammar tab — reference-style grammar panels: focus-character badge,
 * structure formula boxes (focus in red), bilingual explanation, and example
 * cards with the grammar point highlighted in yellow + audio.
 */
import type { Lesson } from '../../types/content';
import { S } from '../../i18n/strings';
import { el, highlighted } from '../dom';
import { trackOnce, type AppContext } from '../context';
import { sectionHeader } from './common';

export function grammarTab(ctx: AppContext, lesson: Lesson): HTMLElement {
  // Meaningful event, once per lesson per page session (spec §17E).
  trackOnce(ctx, `${lesson.id}:grammar-opened`, 'grammar_section_opened', lesson.id);

  if (lesson.grammar.length === 0) {
    return el('p', { class: 'muted empty-note', text: '—' });
  }

  return el('div', {},
    sectionHeader('法', S.grammar, `${lesson.grammar.length} ${S.grammar.zh}`),
    ...lesson.grammar.map((g, gIndex) => {
      const focusList =
        typeof g.focusHanzi === 'string'
          ? [g.focusHanzi]
          : (g.focusHanzi ?? []).filter(Boolean);
      const focus = focusList.length > 0 ? focusList : [g.title.zh.slice(0, 1)];
      const badgeChar = focus[0]!.slice(0, 1);
      const card = el('article', { class: 'grammar-card', dataset: { grammarId: g.id } },
        el('div', { class: 'grammar-head' },
          el('span', { class: 'section-icon grammar-badge', text: badgeChar, lang: 'zh' }),
          el('h3', { class: 'grammar-title' },
            el('span', { class: 'zh', text: g.title.zh, lang: 'zh' }),
            el('span', { class: 'en', text: g.title.en }),
          ),
        ),
        g.structure ? structureBox(g.structure, focus) : null,
        g.structureNegative ? structureBox(g.structureNegative, focus, true) : null,
        el('p', { class: 'grammar-expl', text: g.explanation.en }),
        el('p', { class: 'grammar-expl zh', text: g.explanation.zh, lang: 'zh' }),
        (g.examples ?? []).length > 0
          ? el('div', { class: 'grammar-examples' },
              ...(g.examples ?? []).map((ex) =>
                el('div', { class: 'example-row example-card' },
                  el('div', { class: 'example-text' },
                    el('div', { class: 'pinyin', text: ex.pinyin, lang: 'zh-Latn' }),
                    el('div', { class: 'hanzi-sm', lang: 'zh' }, ...highlighted(ex.hanzi, focus)),
                    el('div', { class: 'translation', text: ex.english }),
                  ),
                  el('button', {
                    class: 'play-btn play-btn-sm',
                    attrs: { type: 'button', title: `${S.play.en} · ${S.play.zh}` },
                    onClick: () =>
                      ctx.audio.play({ clipId: ex.id, lessonId: lesson.id, kind: 'grammar-example' }),
                  }, '▶'),
                ),
              ),
            )
          : null,
      );
      card.style.setProperty('--i', String(gIndex));
      return card;
    }),
  );
}

/** Light rounded formula box; the focus character(s) render in red bold. */
function structureBox(structure: string, focus: string[], negative = false): HTMLElement {
  return el('div', { class: `structure-box${negative ? ' structure-negative' : ''}` },
    ...highlighted(structure, focus, 'struct-focus'),
  );
}
