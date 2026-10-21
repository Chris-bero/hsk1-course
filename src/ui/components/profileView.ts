/**
 * profileView — the student's personal page (#/me).
 *
 * Everything the signed-in learner owns, in one place:
 *  - identity (name + server student id) and honest sync state,
 *  - totals: lessons completed, course %, words mastered, active time,
 *    last activity (same honest wording as everywhere: time is an ESTIMATE),
 *  - lesson-by-lesson breakdown with per-lesson time, mastered words,
 *    completion bar and quiz best,
 *  - sign-out.
 *
 * Read-only by design: all mutations stay in the lesson views. Data comes
 * exclusively through ctx.progress (storage-agnostic — spec §20).
 */
import { getLessonSummaries } from '../../content/course';
import { S } from '../../i18n/strings';
import { el, formatDateTime, formatDuration } from '../dom';
import type { AppContext } from '../context';
import { progressBar, sectionHeader, statusChip } from './common';

export async function profileView(ctx: AppContext): Promise<HTMLElement> {
  const summary = await ctx.progress.getCourseSummary();
  const quizStats = await ctx.progress.provider.getAllQuizStats();
  const student = ctx.progress.student;

  const main = el('main', { class: 'container home profile' });

  main.appendChild(
    sectionHeader(
      '我',
      S.myProgress,
      `${student.studentName ?? ''}${student.studentName ? ' · ' : ''}${student.studentId}`,
    ),
  );

  // ---- totals ----------------------------------------------------------------
  main.appendChild(
    el('section', { class: 'panel' },
      el('div', { class: 'stats-grid' },
        statCard(`${summary.lessonsCompleted} / ${summary.totalLessons}`, S.lessonsCompleted),
        statCard(`${summary.completionPercentage}%`, S.coursePercent),
        statCard(`${summary.vocabularyCompleted}`, S.wordsLearned),
        statCard(formatDuration(summary.totalActiveSeconds), S.profileTime, S.activeTimeNote),
        statCard(formatDateTime(summary.lastActivityAt), S.lastActivity),
      ),
      el('p', { class: 'notice' }, 'ℹ ', el('span', {
        text: ctx.auth.mode === 'remote' && ctx.auth.signedIn
          ? `${S.syncedNotice.en} ${S.syncedNotice.zh}`
          : `${S.localOnlyNotice.en} ${S.localOnlyNotice.zh}`,
      })),
    ),
  );

  // ---- lesson by lesson --------------------------------------------------------
  const rows = getLessonSummaries().map((ls) => {
    const rec = summary.perLesson.find((r) => r.lessonId === ls.id);
    const status = rec?.status ?? 'not_started';
    const mastered = rec?.completedVocabularyCount ?? 0;
    const seconds = rec?.activeLearningSeconds ?? 0;
    const quiz = quizStats[ls.id];
    const wordPct = ls.vocabularyCount > 0 ? Math.round((mastered / ls.vocabularyCount) * 100) : 0;
    const barPct = status === 'completed' ? 100 : wordPct;

    return el('a', {
      class: 'profile-row',
      attrs: { href: ls.available ? `#/lesson/${ls.id}` : '#/me' },
      dataset: { lessonId: ls.id },
    },
      el('span', { class: 'profile-row-num', text: String(ls.order).padStart(2, '0') }),
      el('span', { class: 'profile-row-title' },
        el('span', { class: 'pr-zh', text: ls.title.zh, lang: 'zh' }),
        el('span', { class: 'pr-en', text: ls.title.en }),
      ),
      el('span', { class: 'profile-row-bar' }, progressBar(barPct)),
      el('span', { class: 'profile-row-meta' },
        statusChip(status),
        el('span', { class: 'muted', text: `⏱ ${formatDuration(seconds)}` }),
        el('span', { class: mastered === ls.vocabularyCount && mastered > 0 ? 'ok' : 'muted' },
          `✓ ${mastered}/${ls.vocabularyCount}`),
        quiz
          ? el('span', { class: 'muted', text: `🏆 ${S.profileQuizBest.en}: ${quiz.bestCorrect}/${quiz.total}` })
          : null,
      ),
    );
  });

  main.appendChild(
    el('section', { class: 'panel' },
      el('h2', { class: 'panel-title' }, `${S.profileLessonByLesson.en} · `,
        el('span', { text: S.profileLessonByLesson.zh, lang: 'zh' })),
      el('div', { class: 'profile-rows' }, ...rows),
    ),
  );

  // ---- account -----------------------------------------------------------------
  if (ctx.auth.mode === 'remote' && ctx.auth.signedIn) {
    main.appendChild(
      el('section', { class: 'panel profile-account' },
        el('button', {
          class: 'btn-ghost signout-big',
          attrs: { type: 'button' },
          text: `${S.signOut.en} · ${S.signOut.zh}`,
          onClick: () => void ctx.auth.signOut(),
        }),
      ),
    );
  }

  return main;
}

function statCard(
  value: string,
  label: { en: string; zh: string },
  note?: { en: string; zh: string },
): HTMLElement {
  return el('div', { class: 'stat-card' },
    el('div', { class: 'stat-value', text: value }),
    el('div', { class: 'stat-label', text: `${label.en} · ${label.zh}` }),
    note ? el('div', { class: 'stat-note', text: `${note.en} · ${note.zh}` }) : null,
  );
}
