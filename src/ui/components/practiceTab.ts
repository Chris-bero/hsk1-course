/**
 * Practice tab — a light quiz generated from the lesson's vocabulary:
 *   type A: hear/see the word → pick the English meaning
 *   type B: read the meaning → pick the hanzi
 * Best score + attempt count are stored via the progress provider
 * (local in Phase 1; a future sheet can adopt QuizStats later).
 *
 * `setPracticeSeed(wordId)` lets a word card's ✍️ button start the quiz
 * with that word as question 1.
 */
import type { Lesson, VocabularyEntry } from '../../types/content';
import { S } from '../../i18n/strings';
import { el } from '../dom';
import type { AppContext } from '../context';
import { sectionHeader } from './common';

let seedWordId: string | null = null;
export function setPracticeSeed(wordId: string): void {
  seedWordId = wordId;
}

interface Question {
  word: VocabularyEntry;
  type: 'listen' | 'meaning';
  options: VocabularyEntry[]; // exactly one is `word`
}

const QUESTIONS = 10;

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j]!, a[i]!];
  }
  return a;
}

function buildQuestions(lesson: Lesson): Question[] {
  let pool = shuffle(lesson.vocabulary);
  if (seedWordId) {
    const seed = seedWordId;
    seedWordId = null;
    const seeded = pool.find((w) => w.id === seed);
    if (seeded) pool = [seeded, ...pool.filter((w) => w.id !== seed)];
  }
  const count = Math.min(QUESTIONS, pool.length);
  const questions: Question[] = [];
  for (let i = 0; i < count; i++) {
    const word = pool[i]!;
    const distractors = shuffle(pool.filter((w) => w.id !== word.id)).slice(0, 3);
    questions.push({
      word,
      type: i % 2 === 0 ? 'listen' : 'meaning',
      options: shuffle([word, ...distractors]),
    });
  }
  return questions;
}

export async function practiceTab(ctx: AppContext, lesson: Lesson): Promise<HTMLElement> {
  const stats = await ctx.progress.getQuizStats(lesson.id);
  const wrap = el('div', {});

  const bestLine = stats
    ? el('p', { class: 'quiz-best' }, '🏆 ',
        el('span', { text: `${S.quizBest.en}: ${stats.bestCorrect}/${stats.total}` }),
        el('span', { class: 'muted', text: ` · ${stats.attempts} attempt${stats.attempts === 1 ? '' : 's'}` }))
    : null;

  const header = sectionHeader('练', S.practice, `${S.practiceSub.en} · ${S.practiceSub.zh}`);

  if (lesson.vocabulary.length < 4) {
    wrap.append(header, el('p', { class: 'muted empty-note', text: `${S.quizNoWords.en} ${S.quizNoWords.zh}` }));
    return wrap;
  }

  const startBtn = el('button', { class: 'btn btn-grad', attrs: { type: 'button' } },
    '▶ ', el('span', { text: `${S.startQuiz.en} · ${S.startQuiz.zh}` }));

  const intro = el('div', { class: 'quiz-card' }, bestLine, startBtn);
  wrap.append(header);

  if (lesson.activities && lesson.activities.length > 0) {
    wrap.appendChild(
      el('div', { class: 'quiz-card activities-card' },
        el('div', { class: 'activities-title' }, '🗣 ', el('span', { text: `${S.tabPractice.en} · 课文练习` })),
        ...lesson.activities.map((a, i) =>
          el('div', { class: 'activity-row', style: `--i:${i}` },
            el('span', { class: 'activity-zh', text: a.zh, lang: 'zh' }),
            el('span', { class: 'activity-en', text: a.en }),
          ),
        ),
      ),
    );
  }
  wrap.appendChild(intro);

  startBtn.addEventListener('click', () => {
    runQuiz(ctx, lesson, wrap, header);
  });
  return wrap;
}

function runQuiz(ctx: AppContext, lesson: Lesson, wrap: HTMLElement, header: HTMLElement): void {
  const questions = buildQuestions(lesson);
  let index = 0;
  let correct = 0;
  const prevBestPromise = ctx.progress.getQuizStats(lesson.id);

  const showQuestion = (): void => {
    wrap.textContent = '';
    wrap.append(header);
    const q = questions[index]!;

    const prompt =
      q.type === 'listen'
        ? el('div', { class: 'quiz-prompt' },
            el('button', {
              class: 'play-btn',
              attrs: { type: 'button', title: `${S.play.en} · ${S.play.zh}` },
              onClick: () =>
                ctx.audio.play({ clipId: q.word.id, lessonId: lesson.id, kind: 'vocabulary', vocabularyId: q.word.id }),
            }, '▶'),
            el('div', {},
              el('div', { class: 'hanzi quiz-hanzi', text: q.word.hanzi, lang: 'zh' }),
              el('div', { class: 'pinyin', text: q.word.pinyin, lang: 'zh-Latn' }),
            ),
            el('p', { class: 'quiz-ask', text: `${S.quizListenPrompt.en} · ${S.quizListenPrompt.zh}` }),
          )
        : el('div', { class: 'quiz-prompt' },
            el('div', { class: 'quiz-meaning', text: q.word.english }),
            el('p', { class: 'quiz-ask', text: `${S.quizMeaningPrompt.en} · ${S.quizMeaningPrompt.zh}` }),
          );

    const opts = el('div', { class: 'quiz-opts' },
      ...q.options.map((opt) => {
        const label =
          q.type === 'listen'
            ? opt.english
            : `${opt.hanzi}  ${opt.pinyin}`;
        const btn = el('button', {
          class: 'quiz-opt',
          attrs: { type: 'button' },
          text: label,
          lang: q.type === 'listen' ? undefined : 'zh',
        });
        btn.addEventListener('click', () => {
          for (const child of Array.from(opts.children)) {
            child.setAttribute('disabled', 'true');
          }
          const isCorrect = opt.id === q.word.id || opt.hanzi === q.word.hanzi;
          btn.classList.add(isCorrect ? 'correct' : 'wrong');
          if (!isCorrect) {
            // reveal the right one
            for (const child of Array.from(opts.children)) {
              const txt = child.textContent ?? '';
              if (q.type === 'listen' ? txt === q.word.english : txt.startsWith(q.word.hanzi)) {
                child.classList.add('correct');
              }
            }
          } else {
            correct += 1;
          }
          setTimeout(() => {
            index += 1;
            if (index < questions.length) showQuestion();
            else void finish();
          }, 850);
        });
        return btn;
      }),
    );

    wrap.appendChild(
      el('div', { class: 'quiz-card' },
        el('div', { class: 'quiz-meta' },
          el('span', { text: `${S.question.en} ${index + 1}/${questions.length} · 第${index + 1}题` }),
          el('span', { class: 'muted', text: `${correct} ✓` }),
        ),
        prompt,
        opts,
      ),
    );
  };

  const finish = async (): Promise<void> => {
    const prev = await prevBestPromise;
    const prevBest = prev?.bestCorrect ?? 0;
    const stats = await ctx.progress.recordQuizResult(lesson.id, correct, questions.length);
    const newBest = correct > prevBest;
    window.dispatchEvent(new Event('progress-changed'));

    wrap.textContent = '';
    wrap.append(header);
    const retry = el('button', { class: 'btn btn-grad', attrs: { type: 'button' } },
      '↻ ', el('span', { text: `${S.quizRetry.en} · ${S.quizRetry.zh}` }));
    retry.addEventListener('click', () => {
      correct = 0;
      index = 0;
      runQuiz(ctx, lesson, wrap, header);
    });
    const back = el('button', { class: 'btn', attrs: { type: 'button', href: undefined } },
      el('span', { text: `📘 ${S.quizBack.en} · ${S.quizBack.zh}` }));
    back.addEventListener('click', () => {
      window.location.hash = `#/lesson/${lesson.id}/words`;
    });
    wrap.appendChild(
      el('div', { class: 'quiz-card quiz-result' },
        el('div', { class: 'quiz-score' }, `${correct}/${questions.length}`),
        el('p', { class: 'quiz-result-label' },
          el('span', { text: `${S.quizResult.en} · ${S.quizResult.zh}` }),
          newBest ? el('span', { class: 'chip chip-key', text: ` 🎉 ${S.quizNewBest.en}` }) : null,
        ),
        el('p', { class: 'muted', text: `🏆 ${S.quizBest.en}: ${stats.bestCorrect}/${stats.total}` }),
        el('div', { class: 'quiz-actions' }, retry, back),
      ),
    );
  };

  showQuestion();
}
