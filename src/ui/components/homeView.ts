/**
 * Home: two tabs — "Lessons" (reference-style card grid) and "How it works"
 * (feature guide + honest progress stats + local-only notice + learner id).
 */
import { course, getLessonSummaries } from '../../content/course';
import { S } from '../../i18n/strings';
import { appConfig } from '../../config';
import type { LessonStatus } from '../../types/progress';
import { el, formatDateTime, formatDuration } from '../dom';
import type { AppContext } from '../context';
import { availabilityPill, progressBar, sectionHeader, statusChip } from './common';

const ZH_NUM = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二', '十三', '十四', '十五'];

export type HomeTab = 'lessons' | 'how';

export async function homeView(ctx: AppContext, tab: HomeTab): Promise<HTMLElement> {
  const summary = await ctx.progress.getCourseSummary();
  const quizStats = await ctx.progress.provider.getAllQuizStats();
  const statuses = new Map(summary.perLesson.map((r) => [r.lessonId, r.status]));
  const masteredByLesson = new Map<string, number>();
  for (const rec of summary.perLesson) masteredByLesson.set(rec.lessonId, rec.completedVocabularyCount);

  const main = el('main', { class: 'container home' });

  if (tab === 'lessons') {
    const grid = el('div', { class: 'lesson-grid' },
      ...getLessonSummaries().map((ls, lsIndex) => {
        const status: LessonStatus = statuses.get(ls.id) ?? 'not_started';
        const mastered = masteredByLesson.get(ls.id) ?? 0;
        const quiz = quizStats[ls.id];
        const wordPct =
          ls.vocabularyCount > 0 ? Math.round((mastered / ls.vocabularyCount) * 100) : 0;
        const barPct = status === 'completed' ? 100 : wordPct;

        const card = el('a', {
          class: `lesson-card${ls.available ? '' : ' lesson-card-unavailable'}`,
          attrs: ls.available ? { href: `#/lesson/${ls.id}` } : { href: '#/', 'aria-disabled': 'true' },
          dataset: { lessonId: ls.id },
        },
          el('div', { class: 'lesson-card-top' },
            el('span', { class: 'num-badge', text: ZH_NUM[ls.order - 1] ?? String(ls.order), lang: 'zh' }),
            el('span', { class: 'lesson-card-label', text: `LESSON ${ls.order}` }),
            availabilityPill(ls.available),
          ),
          el('div', { class: 'card-zh', text: ls.title.zh, lang: 'zh' }),
          ls.titlePinyin ? el('div', { class: 'card-pinyin', text: ls.titlePinyin, lang: 'zh-Latn' }) : null,
          el('div', { class: 'card-en', text: ls.title.en }),
          progressBar(barPct),
          el('div', { class: 'card-meta' },
            statusChip(status),
            ls.available
              ? el('span', { class: mastered === ls.vocabularyCount && mastered > 0 ? 'ok' : 'muted' },
                  `✓ ${mastered}/${ls.vocabularyCount} ${S.words.en}`)
              : el('span', { class: 'muted', text: `${S.comingSoon.en} · ${S.comingSoon.zh}` }),
            quiz ? el('span', { class: 'muted', text: `🏆 ${S.quizBest.en}: ${quiz.bestCorrect}/${quiz.total}` }) : null,
            ls.available ? el('span', { class: 'open-link', text: `${S.open.en} →` }) : null,
          ),
        );
        if (!ls.available) card.addEventListener('click', (e) => e.preventDefault());
        card.style.setProperty('--i', String(lsIndex));
        return card;
      }),
    );

    main.appendChild(sectionHeader('课', S.allLessons, `${S.allLessonsSub.en} · ${S.allLessonsSub.zh}`));
    main.appendChild(grid);
    return main;
  }

  // ---- How it works ---------------------------------------------------------
  main.appendChild(sectionHeader('助', S.howItWorks, `${S.tagline.en} · ${S.tagline.zh}`));
  main.appendChild(
    el('div', { class: 'how-grid' },
      howCard('🎧', S.howAudio, S.howAudioBody),
      howCard('🙈', S.howToggles, S.howTogglesBody),
      howCard('⭐', S.howMastered, S.howMasteredBody),
      howCard('📈', S.howProgress, S.howProgressBody),
    ),
  );
  main.appendChild(
    el('section', { class: 'panel' },
      el('h2', { class: 'panel-title' }, `${S.yourProgress.en} · ${S.yourProgress.zh}`),
      el('div', { class: 'stats-grid' },
        statCard(`${summary.lessonsCompleted} / ${summary.totalLessons}`, S.lessonsCompleted),
        statCard(formatDuration(summary.totalActiveSeconds), S.activeTime, S.activeTimeNote),
        appConfig.features.vocabularyCompletion
          ? statCard(`${summary.vocabularyCompleted}`, S.wordsLearned)
          : null,
        statCard(formatDateTime(summary.lastActivityAt), S.lastActivity),
      ),
      el('p', { class: 'notice' }, 'ℹ ', el('span', {
        text: ctx.auth.mode === 'remote' && ctx.auth.signedIn
          ? `${S.syncedNotice.en} ${S.syncedNotice.zh}`
          : `${S.localOnlyNotice.en} ${S.localOnlyNotice.zh}`,
      })),
      el('p', { class: 'muted learner-line' },
        el('span', { text: `${S.learnerId.en} · ${S.learnerId.zh}: ` }),
        el('code', { class: 'learner-id', text: ctx.progress.student.studentId }),
      ),
    ),
  );
  main.appendChild(
    el('p', { class: 'muted course-line' }, `${course.title.en} · ${course.title.zh} — ${course.level}`),
  );
  return main;
}

function howCard(icon: string, title: { en: string; zh: string }, body: { en: string; zh: string }): HTMLElement {
  return el('div', { class: 'how-card' },
    el('span', { class: 'how-icon', text: icon }),
    el('h3', {}, el('span', { text: title.en }), el('span', { class: 'zh', text: ` · ${title.zh}`, lang: 'zh' })),
    el('p', { class: 'en', text: body.en }),
    el('p', { class: 'zh', text: body.zh, lang: 'zh' }),
  );
}

function statCard(value: string, label: { en: string; zh: string }, note?: { en: string; zh: string }): HTMLElement {
  return el('div', { class: 'stat-card' },
    el('div', { class: 'stat-value', text: value }),
    el('div', { class: 'stat-label', text: `${label.en} · ${label.zh}` }),
    note ? el('div', { class: 'stat-note', text: `${note.en} · ${note.zh}` }) : null,
  );
}
