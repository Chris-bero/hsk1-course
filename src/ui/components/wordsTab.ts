/**
 * Words tab — reference-style word card grid:
 * pinyin (red) → big hanzi → chips (part of speech / ⭐ key word / ✓ mastered)
 * → definition → EXAMPLE box(es) with the target word highlighted.
 *
 * Audio: tapping ▶ plays the word then its example sentence(s) in sequence.
 * "Play all words" chains every word+examples with card highlighting.
 * Mastered state = explicit learner action only (spec §17C honesty rule).
 */
import type { Lesson, VocabularyEntry } from '../../types/content';
import { appConfig } from '../../config';
import { S } from '../../i18n/strings';
import type { AudioPlayContext } from '../../services/audioService';
import type { VocabularyProgressRecord } from '../../types/progress';
import { el, highlighted } from '../dom';
import type { AppContext } from '../context';
import { sectionHeader } from './common';
import { setPracticeSeed } from './practiceTab';

export async function wordsTab(ctx: AppContext, lesson: Lesson): Promise<HTMLElement> {
  const vocabProgress = await ctx.progress.getVocabularyProgress(lesson.id);
  const byId = new Map<string, VocabularyProgressRecord>(vocabProgress.map((v) => [v.vocabularyId, v]));

  let filter: 'all' | 'key' = 'all';

  const grid = el('div', { class: 'word-grid' });
  const clipEls = new Map<string, HTMLElement>(); // clipId -> element to highlight

  const renderGrid = (): void => {
    grid.textContent = '';
    clipEls.clear();
    const words = filter === 'key' ? lesson.vocabulary.filter((w) => w.keyWord) : lesson.vocabulary;
    if (words.length === 0) {
      grid.appendChild(el('p', { class: 'muted empty-note', text: `${S.keyWords.en} · ${S.keyWords.zh}: 0` }));
      return;
    }
    words.forEach((word, i) => {
      const card = wordCard(ctx, lesson, word, byId.get(word.id), clipEls);
      card.style.setProperty('--i', String(i));
      grid.appendChild(card);
    });
    observeViewed(ctx, lesson.id, words, grid);
  };

  const allChip = el('button', { class: 'filter-chip active', attrs: { type: 'button' }, text: S.allWords.en }, );
  const keyChip = el('button', { class: 'filter-chip', attrs: { type: 'button' } }, '⭐ ', el('span', { text: S.keyWords.en }));
  allChip.addEventListener('click', () => {
    filter = 'all';
    allChip.classList.add('active');
    keyChip.classList.remove('active');
    renderGrid();
  });
  keyChip.addEventListener('click', () => {
    filter = 'key';
    keyChip.classList.add('active');
    allChip.classList.remove('active');
    renderGrid();
  });

  // ---- play all words (word + its examples, sequentially) -------------------
  const seq: AudioPlayContext[] = [];
  for (const w of lesson.vocabulary) {
    seq.push({ clipId: w.id, lessonId: lesson.id, kind: 'vocabulary', vocabularyId: w.id });
    for (const ex of w.examples ?? []) {
      seq.push({ clipId: ex.id, lessonId: lesson.id, kind: 'vocabulary-example', vocabularyId: w.id });
    }
  }
  const playAllBtn = el('button', { class: 'btn', attrs: { type: 'button' } }, '▶ ', el('span', { text: S.playAllWords.en }));
  playAllBtn.addEventListener('click', () => {
    ctx.audio.playSequence(seq, (active) => {
      for (const node of clipEls.values()) node.classList.remove('playing');
      if (active) clipEls.get(active.clipId)?.classList.add('playing');
    });
  });

  const countLabel = el('span', { class: 'muted count-label', text: `${lesson.vocabulary.length} ${S.wordsCount.en} · ${lesson.vocabulary.length} ${S.wordsCount.zh}` });

  renderGrid();

  return el('div', {},
    sectionHeader('词', S.vocabulary, `${lesson.vocabulary.length} ${S.wordsSub.en} · ${S.wordsSub.zh}`),
    el('div', { class: 'filter-row' },
      allChip,
      keyChip,
      el('div', { class: 'filter-right' }, countLabel, playAllBtn),
    ),
    grid,
    sentencesBlock(ctx, lesson),
  );
}

function wordCard(
  ctx: AppContext,
  lesson: Lesson,
  word: VocabularyEntry,
  record: VocabularyProgressRecord | undefined,
  clipEls: Map<string, HTMLElement>,
): HTMLElement {
  const lessonId = lesson.id;
  const mastered = record?.status === 'completed';

  const seq: AudioPlayContext[] = [
    { clipId: word.id, lessonId, kind: 'vocabulary', vocabularyId: word.id },
    ...(word.examples ?? []).map((ex) => ({
      clipId: ex.id, lessonId, kind: 'vocabulary-example' as const, vocabularyId: word.id,
    })),
  ];

  const playBtn = el('button', {
    class: 'play-btn',
    attrs: { type: 'button', title: `${S.play.en} · ${S.play.zh}`, 'aria-label': `Play ${word.hanzi}` },
    onClick: () => {
      ctx.audio.playSequence(seq, (active) => {
        for (const node of clipEls.values()) node.classList.remove('playing');
        if (active) clipEls.get(active.clipId)?.classList.add('playing');
        else card.classList.remove('playing');
      });
      card.classList.add('playing');
    },
  }, '▶');

  const practiceBtn = el('button', {
    class: 'mini-btn',
    attrs: { type: 'button', title: `${S.practiceWord.en} · ${S.practiceWord.zh}` },
    onClick: () => {
      setPracticeSeed(word.id);
      window.location.hash = `#/lesson/${lessonId}/practice`;
    },
  }, '✍️');

  const chips = el('div', { class: 'chip-row' },
    word.partOfSpeech ? el('span', { class: 'chip chip-pos', text: word.partOfSpeech }) : null,
    word.keyWord ? el('span', { class: 'chip chip-key' }, '⭐ ', el('span', { text: S.keyWord.en })) : null,
  );

  if (appConfig.features.vocabularyCompletion) {
    const masteredChip = el('button', {
      class: `chip chip-mastered-toggle${mastered ? ' on' : ''}`,
      attrs: { type: 'button', title: `${S.markMastered.en} · ${S.markMastered.zh}` },
    }, mastered ? '✓ ' : '○ ', el('span', { text: S.mastered.en }));
    masteredChip.addEventListener('click', () => {
      const next = !masteredChip.classList.contains('on');
      void ctx.progress.setVocabularyCompleted(lessonId, word.id, next).then(() => {
        masteredChip.classList.toggle('on', next);
        masteredChip.textContent = '';
        masteredChip.append(next ? '✓ ' : '○ ');
        masteredChip.appendChild(el('span', { text: S.mastered.en }));
        window.dispatchEvent(new Event('progress-changed'));
      });
    });
    chips.appendChild(masteredChip);
  }

  const examples = (word.examples ?? []).map((ex) => {
    const box = el('div', { class: 'example-box' },
      el('div', { class: 'example-label' }, '💬 ', el('span', { text: S.example.en })),
      el('div', { class: 'pinyin', text: ex.pinyin, lang: 'zh-Latn' }),
      el('div', { class: 'hanzi-sm', lang: 'zh' }, ...highlighted(ex.hanzi, word.hanzi)),
      el('div', { class: 'translation', text: ex.english }),
      el('button', {
        class: 'play-btn play-btn-sm',
        attrs: { type: 'button', title: `${S.play.en} · ${S.play.zh}` },
        onClick: () => {
          ctx.audio.play({ clipId: ex.id, lessonId, kind: 'vocabulary-example', vocabularyId: word.id });
          box.classList.add('playing');
          setTimeout(() => box.classList.remove('playing'), 400);
        },
      }, '▶'),
    );
    clipEls.set(ex.id, box);
    return box;
  });

  const card = el('div', { class: 'word-card', dataset: { vocabId: word.id } },
    el('div', { class: 'side-btns' }, playBtn, practiceBtn),
    el('div', { class: 'pinyin word-pinyin', text: word.pinyin, lang: 'zh-Latn' }),
    el('div', { class: 'hanzi word-hanzi', text: word.hanzi, lang: 'zh' }),
    chips,
    el('div', { class: 'word-def translation-ink', text: word.english }),
    ...examples,
  );
  clipEls.set(word.id, card);
  return card;
}

/** Lesson-level example sentences (kept as a compact list under the grid). */
function sentencesBlock(ctx: AppContext, lesson: Lesson): HTMLElement {
  if (lesson.sentences.length === 0) return el('span');
  return el('div', { class: 'sentences-block' },
    sectionHeader('句', S.exampleSentences),
    el('div', { class: 'sentence-list' },
      ...lesson.sentences.map((s) =>
        el('div', { class: 'example-row' },
          el('div', { class: 'example-text' },
            el('div', { class: 'pinyin', text: s.pinyin, lang: 'zh-Latn' }),
            el('div', { class: 'hanzi-sm', text: s.hanzi, lang: 'zh' }),
            el('div', { class: 'translation', text: s.english }),
          ),
          el('button', {
            class: 'play-btn play-btn-sm',
            attrs: { type: 'button', title: `${S.play.en} · ${S.play.zh}` },
            onClick: () => ctx.audio.play({ clipId: s.id, lessonId: lesson.id, kind: 'sentence' }),
          }, '▶'),
        ),
      ),
    ),
  );
}

/** Viewed-tracking: words count as viewed when actually rendered on screen. */
function observeViewed(
  ctx: AppContext,
  lessonId: string,
  vocabulary: VocabularyEntry[],
  grid: HTMLElement,
): void {
  const mark = (id: string) => void ctx.progress.markVocabularyViewed(lessonId, id);
  if (typeof IntersectionObserver === 'undefined') {
    for (const w of vocabulary) mark(w.id);
    return;
  }
  const io = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      const id = (entry.target as HTMLElement).dataset['vocabId'];
      if (id) {
        mark(id);
        io.unobserve(entry.target);
      }
    }
  }, { threshold: 0.5 });
  for (const cardEl of Array.from(grid.children)) {
    if (cardEl instanceof HTMLElement && cardEl.dataset['vocabId']) io.observe(cardEl);
  }
}
