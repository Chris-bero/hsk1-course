/**
 * Smoke test — runs the REAL application inside jsdom and exercises the
 * full stack: routing, tabs, rendering, toggles, mastered chips, quiz,
 * completion flow, event logging, active-time tracking, localStorage.
 *
 * Run: npm run smoke
 */
import { JSDOM } from 'jsdom';

// ---- jsdom environment (must be set up BEFORE importing app modules) -------

const dom = new JSDOM('<!doctype html><html><body><div id="app"></div></body></html>', {
  url: 'http://localhost/',
  pretendToBeVisual: true,
});
const win = dom.window;

const mediaProto = (win as unknown as { HTMLMediaElement: { prototype: Record<string, unknown> } }).HTMLMediaElement.prototype;
mediaProto.play = function () {
  return Promise.resolve();
};
mediaProto.pause = function () {};
mediaProto.load = function () {};
win.scrollTo = () => {};

const g = globalThis as Record<string, unknown>;
for (const key of [
  'window', 'document', 'navigator', 'localStorage', 'sessionStorage', 'location',
  'HTMLElement', 'HTMLInputElement', 'HTMLSelectElement', 'Element', 'Node', 'Event',
  'CustomEvent', 'getComputedStyle', 'requestAnimationFrame', 'cancelAnimationFrame', 'Audio',
] as const) {
  Object.defineProperty(g, key, { value: (win as unknown as Record<string, unknown>)[key], configurable: true, writable: true });
}

// ---- harness ------------------------------------------------------------------

let passed = 0;
const failures: string[] = [];
function check(name: string, cond: boolean, detail = ''): void {
  if (cond) {
    passed += 1;
  } else {
    failures.push(`FAIL: ${name}${detail ? ` — ${detail}` : ''}`);
    console.error(`  ✗ ${name}${detail ? ` — ${detail}` : ''}`);
  }
}
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
async function waitFor(fn: () => boolean, timeoutMs = 4000): Promise<boolean> {
  const t0 = Date.now();
  while (Date.now() - t0 < timeoutMs) {
    if (fn()) return true;
    await sleep(30);
  }
  return fn();
}
const doc = win.document;
const $ = (sel: string): NodeListOf<Element> => doc.querySelectorAll(sel);
const byText = (sel: string, text: string): Element | undefined =>
  Array.from($(sel)).find((e) => (e.textContent ?? '').includes(text));
async function go(hash: string): Promise<void> {
  win.location.hash = hash;
  await sleep(40);
  win.dispatchEvent(new win.Event('hashchange'));
}

// ---- run -----------------------------------------------------------------------

// Force Phase-1 LOCAL mode regardless of the repo's shipped config (the live
// build is configured for the remote backend, where a mandatory sign-in gate
// would block these UI checks). The gate + remote flows have their own suite:
// test/remote.ts (npm run test:remote).
const { appConfig } = await import('../src/config');
(appConfig.progress as { provider: string }).provider = 'local';

const { bootstrap } = await import('../src/bootstrap');
const { LocalProgressProvider } = await import('../src/progress/LocalProgressProvider');

const result = await bootstrap({
  root: doc.getElementById('app')!,
  manifest: {}, // audio files not needed for logic checks
});
const localProvider = result.provider as InstanceType<typeof LocalProgressProvider>;
check('provider is local', result.provider.kind === 'local');

// -- home: lessons tab -------------------------------------------------------------
check('home renders 15 lesson cards', await waitFor(() => $('.lesson-card').length === 15),
  `got ${$('.lesson-card').length}`);
check('lesson 1 card links to lesson', $('.lesson-card')[0]?.getAttribute('href') === '#/lesson/hsk1-l01');
check('no unavailable cards remain (course complete)', $('.lesson-card-unavailable').length === 0);
check('header badge is honest (local only)', !!byText('.badge', 'Saved on this device only'));
check('header has theme toggle', $('.theme-btn').length === 1);

// -- home: how-it-works tab ----------------------------------------------------------
await go('#/how-it-works');
check('how-it-works shows stat cards', await waitFor(() => $('.stat-card').length >= 3),
  `got ${$('.stat-card').length}`);
check('learner id shown in how-it-works', $('.learner-id').length === 1 && result.student.studentId.startsWith('stu-local-'));
check('local-only notice present', !!byText('.notice', 'stored locally'));

// -- lesson 1, words tab (default) ------------------------------------------------------
await go('#/lesson/hsk1-l01');
check('words tab renders 14 word cards', await waitFor(() => $('.word-card').length === 14),
  `got ${$('.word-card').length}`);
check('mastered toggle chips on every word', $('.chip-mastered-toggle').length === 14);
check('key word chips present', $('.chip-key').length >= 6);
check('controls bar present', $('.controls-bar').length === 1);
check('speed pills (4 rates)', $('.speed-pill').length === 4);
check('no separate sentence list (book has none for L1)', $('.sentence-list').length === 0);
check('example boxes highlight the target word', $('.example-box mark.mark').length >= 3);

// -- display toggles -----------------------------------------------------------------------
const pinyinBtn = byText('.toggle-btn', 'Pinyin');
check('pinyin pill exists', !!pinyinBtn);
(pinyinBtn as HTMLElement | undefined)?.click();
check('pinyin hidden after toggle',
  doc.querySelector('.lesson-root')?.getAttribute('data-pinyin') === 'hide');
check('pinyin setting persisted',
  JSON.parse(win.localStorage.getItem('hsk1.settings.v1') ?? '{}').showPinyin === false);
(pinyinBtn as HTMLElement | undefined)?.click();
check('pinyin shown again',
  doc.querySelector('.lesson-root')?.getAttribute('data-pinyin') === 'show');

// -- speed pills ----------------------------------------------------------------------------
const speedPill = doc.querySelector('.speed-pill[data-rate="0.75"]') as HTMLElement | null;
check('0.75x pill exists', !!speedPill);
speedPill?.click();
check('speed applied to audio service', result.audio.getRate() === 0.75);
check('speed pill marked active', speedPill?.classList.contains('active') === true);
(doc.querySelector('.speed-pill[data-rate="1"]') as HTMLElement | null)?.click();

// -- mastered toggle ---------------------------------------------------------------------------
const masteredChip = doc.querySelector('.chip-mastered-toggle') as HTMLElement | null;
check('mastered chip exists', !!masteredChip);
masteredChip?.click();
check('mastered chip turns on', await waitFor(() => !!doc.querySelector('.chip-mastered-toggle.on')));
await result.provider.flush();
const vocabRecs = await result.progress.getVocabularyProgress('hsk1-l01');
check('vocab record completed in storage', vocabRecs.some((v) => v.status === 'completed'));
doc.querySelector('.chip-mastered-toggle.on')?.dispatchEvent(new win.Event('click'));
check('mastered chip turns off again', await waitFor(() => !doc.querySelector('.chip-mastered-toggle.on')));

// -- audio: missing clip → toast, NO fake play events --------------------------------------------
const playBtn = doc.querySelector('.word-card .play-btn') as HTMLElement | null;
check('play button exists', !!playBtn);
playBtn?.click();
check('missing-audio toast shown (manifest empty in test)',
  await waitFor(() => $('.toast').length >= 1));

// -- events so far -------------------------------------------------------------------------------
await result.events.flush();
const evTypes = localProvider.getStoredEvents().map((e) => e.eventType);
check('session_started logged', evTypes.includes('session_started'));
check('lesson_opened logged', evTypes.includes('lesson_opened'));
check('vocabulary_viewed logged for all 14 words (IO fallback)',
  evTypes.filter((t) => t === 'vocabulary_viewed').length === 14,
  `got ${evTypes.filter((t) => t === 'vocabulary_viewed').length}`);
check('no vocabulary_audio_played when audio missing', !evTypes.includes('vocabulary_audio_played'));
check('events carry stable ids + eventId + sessionId',
  localProvider.getStoredEvents().every((e) => !!e.eventId && e.sessionId === result.sessionId && typeof e.lessonId === 'string'));

// -- grammar tab ------------------------------------------------------------------------------------
await go('#/lesson/hsk1-l01/grammar');
check('grammar tab renders 2 cards', await waitFor(() => $('.grammar-card').length === 2));
check('structure boxes highlight focus in red', $('.structure-box .struct-focus').length >= 2);
await result.events.flush();
check('grammar_section_opened logged once',
  localProvider.getStoredEvents().filter((e) => e.eventType === 'grammar_section_opened').length === 1);

// -- dialogue tab --------------------------------------------------------------------------------------
await go('#/lesson/hsk1-l01/dialogue');
check('dialogue opens Text 1 (2 bubbles)', await waitFor(() => $('.conv-line').length === 2),
  `got ${$('.conv-line').length}`);
check('selector lists 4 listening items (3 texts + tongue twister)', $('.dialogue-chip').length === 4);
(Array.from($('.dialogue-chip'))[2] as HTMLElement | undefined)?.click();
check('Text 3 shows 4 bubbles after switching', await waitFor(() => $('.conv-line').length === 4));
check('Text 3 bubble sides: 3 left + 1 right', $('.side-left').length === 3 && $('.side-right').length === 1);
check('key chips derived from dialogue text', $('.key-chip').length >= 2);
const listenBtn = byText('.dialogue-controls .btn', 'Listening challenge') as HTMLElement | undefined;
check('listening challenge button exists', !!listenBtn);
listenBtn?.click();
check('listening mode blurs text (class on panel)', !!doc.querySelector('.dialogue-panel.listening'));
listenBtn?.click();
check('listening mode toggles off', !doc.querySelector('.dialogue-panel.listening'));
const convPlayBtn = doc.querySelector('.conv-line .play-btn') as HTMLElement | null;
convPlayBtn?.click();
await result.events.flush();
check('no conversation_played when audio missing',
  !localProvider.getStoredEvents().some((e) => e.eventType === 'conversation_played'));

// -- practice tab: full quiz run -------------------------------------------------------------------------
await go('#/lesson/hsk1-l01/practice');
check('practice shows the book’s 3 speaking activities', await waitFor(() => $('.activity-row').length === 3));
check('practice intro shows start button', !!byText('.btn', 'Start quiz'));
(byText('.btn', 'Start quiz') as HTMLElement | undefined)?.click();
check('quiz shows 4 options', await waitFor(() => $('.quiz-opt').length === 4));
let guard = 0;
while (!$('.quiz-result').length && guard < 14) {
  const opts = $('.quiz-opt');
  if (opts.length === 0) break;
  (opts[0] as HTMLElement).click();
  guard += 1;
  await sleep(1000);
}
check('quiz finishes with a result card', await waitFor(() => $('.quiz-result').length === 1), `guard=${guard}`);
const quizStats = await result.progress.getQuizStats('hsk1-l01');
check('quiz stats stored (best/total/attempts)', !!quizStats && quizStats.total === 10 && quizStats.attempts >= 1,
  JSON.stringify(quizStats));
await result.events.flush();
check('practice_quiz_completed logged',
  localProvider.getStoredEvents().some((e) => e.eventType === 'practice_quiz_completed'));

// -- completion flow ----------------------------------------------------------------------------------------
const completeBtn = byText('.controls-right .btn', 'Mark lesson complete') as HTMLElement | undefined;
check('complete button exists', !!completeBtn);
completeBtn?.click();
check('completed chip shown after click', await waitFor(() => !!doc.querySelector('.chip-completed')));
await result.provider.flush();
const raw = JSON.parse(win.localStorage.getItem('hsk1.progress.v1') ?? '{}');
const stored = raw.lessons?.['hsk1-l01'];
check('localStorage: status completed + completedAt + 100%',
  stored?.status === 'completed' && !!stored?.completedAt && stored?.completionPercentage === 100);
await result.events.flush();
check('lesson_completed event logged',
  localProvider.getStoredEvents().some((e) => e.eventType === 'lesson_completed'));

// -- active time tracking --------------------------------------------------------------------------------------
result.tracker.ping();
await sleep(2300);
await result.tracker.flush();
const rec1 = await result.progress.getLessonProgress('hsk1-l01');
check('active learning time accumulated (>=2s)', (rec1?.activeLearningSeconds ?? 0) >= 2,
  `got ${rec1?.activeLearningSeconds}`);

// -- un-complete --------------------------------------------------------------------------------------------------
(byText('.controls-right .btn', 'Completed') as HTMLElement | undefined)?.click();
check('un-marking completion works',
  await waitFor(() => !doc.querySelector('.chip-completed') && !!doc.querySelector('.chip-in_progress')));
await result.events.flush();
check('lesson_uncompleted event logged',
  localProvider.getStoredEvents().some((e) => e.eventType === 'lesson_uncompleted'));

// -- home reflects state -------------------------------------------------------------------------------------------
await go('#/');
check('home re-renders', await waitFor(() => $('.lesson-card').length === 15));
check('lesson 1 card shows in-progress chip', !!doc.querySelector('.lesson-card .chip-in_progress'));
check('lesson 1 card shows quiz best', !!byText('.lesson-card .card-meta', 'quiz best'));

// -- lesson 2 spot checks -------------------------------------------------------------------------------------------------
await go('#/lesson/hsk1-l02');
check('lesson 2 words tab renders 15 word cards', await waitFor(() => $('.word-card').length === 15),
  `got ${$('.word-card').length}`);
check('lesson 2 has sentence list (read-aloud lines)', $('.sentence-list .example-row').length === 3);
await go('#/lesson/hsk1-l02/grammar');
check('lesson 2 grammar: official + derived cards', await waitFor(() => $('.grammar-card').length === 2));
check('word-order formula highlights 主语/谓语/宾语', $('.structure-box .struct-focus').length >= 3);
await go('#/lesson/hsk1-l02/dialogue');
check('lesson 2 dialogue opens Text 1 (2 bubbles)', await waitFor(() => $('.conv-line').length === 2));
check('lesson 2 selector lists 4 items', $('.dialogue-chip').length === 4);
(Array.from($('.dialogue-chip'))[1] as HTMLElement | undefined)?.click();
check('lesson 2 Text 2 shows 4 bubbles', await waitFor(() => $('.conv-line').length === 4));
await go('#/lesson/hsk1-l02/practice');
check('lesson 2 practice shows 4 activities', await waitFor(() => $('.activity-row').length === 4));

// -- lesson 3 spot checks -------------------------------------------------------------------------------------------------
await go('#/lesson/hsk1-l03');
check('lesson 3 words tab renders 22 word cards', await waitFor(() => $('.word-card').length === 22),
  `got ${$('.word-card').length}`);
check('lesson 3 read-aloud sentences listed', $('.sentence-list .example-row').length === 6);
await go('#/lesson/hsk1-l03/grammar');
check('lesson 3 grammar: 3 official cards', await waitFor(() => $('.grammar-card').length === 3));
check('“是” card highlights 是/不是 in both formulas', $('.structure-box .struct-focus').length >= 4);
await go('#/lesson/hsk1-l03/dialogue');
check('lesson 3 dialogue opens Text 1 (2 bubbles)', await waitFor(() => $('.conv-line').length === 2));
(Array.from($('.dialogue-chip'))[2] as HTMLElement | undefined)?.click();
check('lesson 3 Text 3 shows 6 bubbles', await waitFor(() => $('.conv-line').length === 6));
await go('#/lesson/hsk1-l03/practice');
check('lesson 3 practice shows 4 activities', await waitFor(() => $('.activity-row').length === 4));

// -- lesson 4 spot checks -------------------------------------------------------------------------------------------------
await go('#/lesson/hsk1-l04');
check('lesson 4 words tab renders 21 word cards', await waitFor(() => $('.word-card').length === 21),
  `got ${$('.word-card').length}`);
check('lesson 4 read-aloud sentences listed', $('.sentence-list .example-row').length === 5);
await go('#/lesson/hsk1-l04/grammar');
check('lesson 4 grammar: 4 official cards', await waitFor(() => $('.grammar-card').length === 4));
check('“有” card highlights 有/没有 across formulas', $('.structure-box .struct-focus').length >= 4);
await go('#/lesson/hsk1-l04/dialogue');
check('lesson 4 dialogue opens Text 1 (4 bubbles)', await waitFor(() => $('.conv-line').length === 4));
check('lesson 4 selector lists 3 texts (no tongue twister)', $('.dialogue-chip').length === 3);
(Array.from($('.dialogue-chip'))[2] as HTMLElement | undefined)?.click();
check('lesson 4 Text 3 shows 6 bubbles', await waitFor(() => $('.conv-line').length === 6));
await go('#/lesson/hsk1-l04/practice');
check('lesson 4 practice shows 5 activities', await waitFor(() => $('.activity-row').length === 5));

// -- lesson 5 spot checks -------------------------------------------------------------------------------------------------
await go('#/lesson/hsk1-l05');
check('lesson 5 words tab renders 22 word cards', await waitFor(() => $('.word-card').length === 22),
  `got ${$('.word-card').length}`);
check('lesson 5 read-aloud sentences listed', $('.sentence-list .example-row').length === 4);
await go('#/lesson/hsk1-l05/grammar');
check('lesson 5 grammar: 3 official cards', await waitFor(() => $('.grammar-card').length === 3));
check('date-order formula highlights 年月日号星期', $('.structure-box .struct-focus').length >= 5);
await go('#/lesson/hsk1-l05/dialogue');
check('lesson 5 dialogue opens Text 1 (4 bubbles)', await waitFor(() => $('.conv-line').length === 4));
(Array.from($('.dialogue-chip'))[2] as HTMLElement | undefined)?.click();
check('lesson 5 Text 3 shows 6 bubbles', await waitFor(() => $('.conv-line').length === 6));
await go('#/lesson/hsk1-l05/practice');
check('lesson 5 practice shows 5 activities', await waitFor(() => $('.activity-row').length === 5));

// -- lesson 6 spot checks -------------------------------------------------------------------------------------------------
await go('#/lesson/hsk1-l06');
check('lesson 6 words tab renders 23 word cards', await waitFor(() => $('.word-card').length === 23),
  `got ${$('.word-card').length}`);
check('lesson 6 read-aloud sentences listed', $('.sentence-list .example-row').length === 5);
await go('#/lesson/hsk1-l06/grammar');
check('lesson 6 grammar: 3 official cards', await waitFor(() => $('.grammar-card').length === 3));
await go('#/lesson/hsk1-l06/dialogue');
check('lesson 6 dialogue opens Text 1 (4 bubbles)', await waitFor(() => $('.conv-line').length === 4));
(Array.from($('.dialogue-chip'))[2] as HTMLElement | undefined)?.click();
check('lesson 6 Text 3 shows 6 bubbles with 4 speakers', await waitFor(() => $('.conv-line').length === 6));
check('lesson 6 uses 4 avatar colors (family incl. children)', $('.avatar').length === 6);
await go('#/lesson/hsk1-l06/practice');
check('lesson 6 practice shows 5 activities', await waitFor(() => $('.activity-row').length === 5));

// -- lesson 7 spot checks -------------------------------------------------------------------------------------------------
await go('#/lesson/hsk1-l07');
check('lesson 7 words tab renders 27 word cards', await waitFor(() => $('.word-card').length === 27),
  `got ${$('.word-card').length}`);
check('lesson 7 read-aloud sentences listed', $('.sentence-list .example-row').length === 6);
await go('#/lesson/hsk1-l07/grammar');
check('lesson 7 grammar: 4 official cards', await waitFor(() => $('.grammar-card').length === 4));
await go('#/lesson/hsk1-l07/dialogue');
check('lesson 7 dialogue opens Text 1 (4 bubbles)', await waitFor(() => $('.conv-line').length === 4));
(Array.from($('.dialogue-chip'))[2] as HTMLElement | undefined)?.click();
check('lesson 7 Text 3 shows 6 bubbles', await waitFor(() => $('.conv-line').length === 6));
await go('#/lesson/hsk1-l07/practice');
check('lesson 7 practice shows 5 activities', await waitFor(() => $('.activity-row').length === 5));

// -- lesson 8 spot checks -------------------------------------------------------------------------------------------------
await go('#/lesson/hsk1-l08');
check('lesson 8 words tab renders 24 word cards', await waitFor(() => $('.word-card').length === 24),
  `got ${$('.word-card').length}`);
check('lesson 8 read-aloud sentences listed', $('.sentence-list .example-row').length === 9);
await go('#/lesson/hsk1-l08/grammar');
check('lesson 8 grammar: 3 official cards', await waitFor(() => $('.grammar-card').length === 3));
check('position-word formula highlights 7 words', $('.structure-box .struct-focus').length >= 7);
await go('#/lesson/hsk1-l08/dialogue');
check('lesson 8 dialogue opens Text 1 (4 bubbles)', await waitFor(() => $('.conv-line').length === 4));
(Array.from($('.dialogue-chip'))[2] as HTMLElement | undefined)?.click();
check('lesson 8 Text 3 shows 6 bubbles', await waitFor(() => $('.conv-line').length === 6));
await go('#/lesson/hsk1-l08/practice');
check('lesson 8 practice shows 6 activities', await waitFor(() => $('.activity-row').length === 6));

// -- lesson 9 spot checks -------------------------------------------------------------------------------------------------
await go('#/lesson/hsk1-l09');
check('lesson 9 words tab renders 23 word cards', await waitFor(() => $('.word-card').length === 23),
  `got ${$('.word-card').length}`);
check('lesson 9 read-aloud sentences listed', $('.sentence-list .example-row').length === 9);
await go('#/lesson/hsk1-l09/grammar');
check('lesson 9 grammar: 3 official cards', await waitFor(() => $('.grammar-card').length === 3));
check('existential card highlights 有/是/没有/不是', $('.structure-box .struct-focus').length >= 6);
await go('#/lesson/hsk1-l09/dialogue');
check('lesson 9 dialogue opens Text 1 (4 bubbles)', await waitFor(() => $('.conv-line').length === 4));
(Array.from($('.dialogue-chip'))[2] as HTMLElement | undefined)?.click();
check('lesson 9 Text 3 shows 6 bubbles', await waitFor(() => $('.conv-line').length === 6));
await go('#/lesson/hsk1-l09/practice');
check('lesson 9 practice shows 7 activities', await waitFor(() => $('.activity-row').length === 7));

// -- lesson 10 spot checks ------------------------------------------------------------------------------------------------
await go('#/lesson/hsk1-l10');
check('lesson 10 words tab renders 23 word cards', await waitFor(() => $('.word-card').length === 23),
  `got ${$('.word-card').length}`);
check('lesson 10 read-aloud sentences listed', $('.sentence-list .example-row').length === 6);
await go('#/lesson/hsk1-l10/grammar');
check('lesson 10 grammar: 3 official cards', await waitFor(() => $('.grammar-card').length === 3));
check('RMB formula highlights yuan/jiao/fen units', $('.structure-box .struct-focus').length >= 5);
await go('#/lesson/hsk1-l10/dialogue');
check('lesson 10 dialogue opens Text 1 (5 bubbles)', await waitFor(() => $('.conv-line').length === 5));
(Array.from($('.dialogue-chip'))[2] as HTMLElement | undefined)?.click();
check('lesson 10 Text 3 shows 6 bubbles', await waitFor(() => $('.conv-line').length === 6));
await go('#/lesson/hsk1-l10/practice');
check('lesson 10 practice shows 6 activities', await waitFor(() => $('.activity-row').length === 6));

// -- lesson 11 spot checks ------------------------------------------------------------------------------------------------
await go('#/lesson/hsk1-l11');
check('lesson 11 words tab renders 25 word cards', await waitFor(() => $('.word-card').length === 25),
  `got ${$('.word-card').length}`);
check('lesson 11 read-aloud sentences listed', $('.sentence-list .example-row').length === 8);
await go('#/lesson/hsk1-l11/grammar');
check('lesson 11 grammar: 3 official cards', await waitFor(() => $('.grammar-card').length === 3));
check('A-not-A formulas highlight 不/没', $('.structure-box .struct-focus').length >= 3);
await go('#/lesson/hsk1-l11/dialogue');
check('lesson 11 dialogue opens Text 1 (4 bubbles)', await waitFor(() => $('.conv-line').length === 4));
(Array.from($('.dialogue-chip'))[2] as HTMLElement | undefined)?.click();
check('lesson 11 Text 3 shows 6 bubbles', await waitFor(() => $('.conv-line').length === 6));
await go('#/lesson/hsk1-l11/practice');
check('lesson 11 practice shows 5 activities', await waitFor(() => $('.activity-row').length === 5));

// -- lesson 12 spot checks ------------------------------------------------------------------------------------------------
await go('#/lesson/hsk1-l12');
check('lesson 12 words tab renders 24 word cards', await waitFor(() => $('.word-card').length === 24),
  `got ${$('.word-card').length}`);
check('lesson 12 read-aloud sentences listed', $('.sentence-list .example-row').length === 9);
await go('#/lesson/hsk1-l12/grammar');
check('lesson 12 grammar: 3 official cards', await waitFor(() => $('.grammar-card').length === 3));
check('le(1) card highlights 了/没', $('.structure-box .struct-focus').length >= 4);
await go('#/lesson/hsk1-l12/dialogue');
check('lesson 12 dialogue opens Text 1 (4 bubbles)', await waitFor(() => $('.conv-line').length === 4));
(Array.from($('.dialogue-chip'))[2] as HTMLElement | undefined)?.click();
check('lesson 12 Text 3 shows 6 bubbles', await waitFor(() => $('.conv-line').length === 6));
await go('#/lesson/hsk1-l12/practice');
check('lesson 12 practice shows 7 activities', await waitFor(() => $('.activity-row').length === 7));

// -- lesson 13 spot checks ------------------------------------------------------------------------------------------------
await go('#/lesson/hsk1-l13');
check('lesson 13 words tab renders 20 word cards', await waitFor(() => $('.word-card').length === 20),
  `got ${$('.word-card').length}`);
check('lesson 13 read-aloud sentences listed', $('.sentence-list .example-row').length === 9);
await go('#/lesson/hsk1-l13/grammar');
check('lesson 13 grammar: 3 official cards', await waitFor(() => $('.grammar-card').length === 3));
await go('#/lesson/hsk1-l13/dialogue');
check('lesson 13 dialogue opens Text 1 (4 bubbles)', await waitFor(() => $('.conv-line').length === 4));
(Array.from($('.dialogue-chip'))[2] as HTMLElement | undefined)?.click();
check('lesson 13 Text 3 shows 6 bubbles', await waitFor(() => $('.conv-line').length === 6));
await go('#/lesson/hsk1-l13/practice');
check('lesson 13 practice shows 8 activities', await waitFor(() => $('.activity-row').length === 8));

// -- lesson 14 spot checks ------------------------------------------------------------------------------------------------
await go('#/lesson/hsk1-l14');
check('lesson 14 words tab renders 28 word cards', await waitFor(() => $('.word-card').length === 28),
  `got ${$('.word-card').length}`);
check('lesson 14 read-aloud sentences listed', $('.sentence-list .example-row').length === 6);
await go('#/lesson/hsk1-l14/grammar');
check('lesson 14 grammar: 3 official cards', await waitFor(() => $('.grammar-card').length === 3));
check('separable-words card lists 9 words', $('.structure-box .struct-focus').length >= 9);
await go('#/lesson/hsk1-l14/dialogue');
check('lesson 14 dialogue opens Text 1 (4 bubbles)', await waitFor(() => $('.conv-line').length === 4));
(Array.from($('.dialogue-chip'))[1] as HTMLElement | undefined)?.click();
check('lesson 14 Text 2 shows 5 bubbles (3 speakers)', await waitFor(() => $('.conv-line').length === 5));
await go('#/lesson/hsk1-l14/practice');
check('lesson 14 practice shows 8 activities', await waitFor(() => $('.activity-row').length === 8));

// -- lesson 15 spot checks ------------------------------------------------------------------------------------------------
await go('#/lesson/hsk1-l15');
check('lesson 15 words tab renders 20 word cards', await waitFor(() => $('.word-card').length === 20),
  `got ${$('.word-card').length}`);
check('lesson 15 read-aloud sentences listed', $('.sentence-list .example-row').length === 3);
await go('#/lesson/hsk1-l15/grammar');
check('lesson 15 grammar: coordinate-sentence card', await waitFor(() => $('.grammar-card').length === 1));
await go('#/lesson/hsk1-l15/dialogue');
check('lesson 15 dialogue opens Text 1 (4 bubbles)', await waitFor(() => $('.conv-line').length === 4));
(Array.from($('.dialogue-chip'))[2] as HTMLElement | undefined)?.click();
check('lesson 15 Text 3 shows 6 bubbles (3 female voices)', await waitFor(() => $('.conv-line').length === 6));
await go('#/lesson/hsk1-l15/practice');
check('lesson 15 practice shows 6 activities', await waitFor(() => $('.activity-row').length === 6));
await go('#/');
check('course overview shows 15/15 lesson cards all available', await waitFor(() => $('.lesson-card').length === 15) && $('.lesson-card-unavailable').length === 0);

// -- idempotency -------------------------------------------------------------------------------------------------------
const before = localProvider.getStoredEvents().length;
const sampleEvent = localProvider.getStoredEvents()[0]!;
await result.provider.logEvents([sampleEvent, sampleEvent]);
check('duplicate eventId submissions ignored', localProvider.getStoredEvents().length === before);

// ---- report ------------------------------------------------------------------------------------------------------------
console.log(`\n${passed} passed, ${failures.length} failed.`);
if (failures.length > 0) {
  for (const f of failures) console.error(f);
  process.exit(1);
}
console.log('SMOKE OK');
process.exit(0);
