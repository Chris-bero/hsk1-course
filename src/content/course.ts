/**
 * Course registry — the single source of truth for lesson order and lookup.
 *
 * STATUS: ALL 15 lessons are extracted from 《新HSK教程1》 (PDFs + textbook
 * dialogue pages) — the course content is COMPLETE.
 *
 * When lesson content changes:
 *   1. edit src/content/lessons/hsk1-lNN.ts (typed as Lesson),
 *   2. run `npm run audio:manifest` + scripts/generate_audio.py (audio),
 *   3. run `npm run lessons:export` and re-paste apps-script/LessonsData.gs
 *      into the Apps Script project (Phase 2 backend validation + Lessons sheet).
 * Nothing else changes — UI, progress and audio discover lessons from here.
 */
import type { Course, Lesson, LessonSummary } from '../types/content';
import lesson01 from './lessons/hsk1-l01';
import lesson02 from './lessons/hsk1-l02';
import lesson03 from './lessons/hsk1-l03';
import lesson04 from './lessons/hsk1-l04';
import lesson05 from './lessons/hsk1-l05';
import lesson06 from './lessons/hsk1-l06';
import lesson07 from './lessons/hsk1-l07';
import lesson08 from './lessons/hsk1-l08';
import lesson09 from './lessons/hsk1-l09';
import lesson10 from './lessons/hsk1-l10';
import lesson11 from './lessons/hsk1-l11';
import lesson12 from './lessons/hsk1-l12';
import lesson13 from './lessons/hsk1-l13';
import lesson14 from './lessons/hsk1-l14';
import lesson15 from './lessons/hsk1-l15';

export const course: Course = {
  id: 'new-hsk-1',
  title: { en: 'NEW HSK Standard Course 1', zh: '新版 HSK 标准教程 1' },
  level: 'HSK 1',
  totalLessons: 15,
};

/** Chinese ordinals for placeholder lesson titles (第一课 … 第十五课). */
const ZH_ORDINALS = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二', '十三', '十四', '十五'];

/**
 * Extracted lessons in course order (index 0 = Lesson 1). The registry array
 * below is padded programmatically to course.totalLessons, so adding a lesson
 * only ever requires importing it and appending it here — miscounts are
 * impossible by construction.
 */
const extractedLessons: Lesson[] = [lesson01, lesson02, lesson03, lesson04, lesson05, lesson06, lesson07, lesson08, lesson09, lesson10, lesson11, lesson12, lesson13, lesson14, lesson15];

/** null = content not yet extracted from the source PDFs. */
const lessons: (Lesson | null)[] = Array.from(
  { length: course.totalLessons },
  (_, i) => extractedLessons[i] ?? null,
);

// Guard: registry must always cover the full course length.
if (lessons.length !== course.totalLessons) {
  console.error(
    `[course] lesson registry has ${lessons.length} entries but course declares ${course.totalLessons}`,
  );
}

export function getLesson(id: string): Lesson | null {
  return lessons.find((l) => l !== null && l.id === id) ?? null;
}

export function getLessonByOrder(order: number): Lesson | null {
  return lessons.find((l) => l !== null && l.order === order) ?? null;
}

export function getAllLessons(): Lesson[] {
  return lessons.filter((l): l is Lesson => l !== null);
}

export function lessonIdForOrder(order: number): string {
  return `hsk1-l${String(order).padStart(2, '0')}`;
}

/** Total vocabulary for a lesson id — 0 for unavailable lessons. */
export function totalVocabularyFor(lessonId: string): number {
  return getLesson(lessonId)?.vocabulary.length ?? 0;
}

/** Index rows for the home page / navigation (includes unavailable lessons). */
export function getLessonSummaries(): LessonSummary[] {
  return lessons.map((lesson, i) => {
    const order = lesson?.order ?? i + 1;
    return {
      id: lesson?.id ?? lessonIdForOrder(order),
      order,
      title: lesson?.title ?? { en: `Lesson ${order}`, zh: `第${ZH_ORDINALS[order - 1]}课` },
      titlePinyin: lesson?.titlePinyin,
      vocabularyCount: lesson?.vocabulary.length ?? 0,
      available: lesson !== null,
    };
  });
}
