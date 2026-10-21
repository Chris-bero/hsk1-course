# Content Extraction Workflow — adding each lesson from the official PDFs

Goal: accurate, complete extraction of all 15 NEW HSK 1 lessons (vocabulary, example sentences,
grammar, conversations) into typed data files. Lesson 1 currently holds clearly-marked SAMPLE
content that will be replaced by the real extraction.

## Per-lesson steps

1. **Create the data file** `src/content/lessons/hsk1-lNN.ts` (NN = zero-padded official lesson
   number), exporting a `Lesson` object (type: `src/types/content.ts`).
2. **Register it** in `src/content/course.ts`: import the file and append it to
   `extractedLessons` (in course order). The registry pads itself to
   `course.totalLessons`, so home-page slots and titles update automatically.
3. **Generate audio**:
   ```bash
   npm run audio:manifest
   python3 scripts/generate_audio.py --only hsk1-lNN
   npm run audio:manifest
   ```
4. **Verify**:
   ```bash
   npm run typecheck && npm run smoke && npm run build
   ```
   Then eyeball the lesson in `npm run dev` (or the single-file preview build).

No other files change — navigation, progress, events, and audio discovery are registry-driven.

## PDF section → data field mapping (typical HSK Standard Course layout)

| PDF section | Lesson field | Notes |
|---|---|---|
| 课文 / Dialogue texts | `conversations[]` | One `Conversation` per dialogue; split `lines[]` per speaker turn; give each speaker a `voice` ('female'/'male') for natural dialogues; optional `context` = the situation line shown under the title |
| 生词 / New words | `vocabulary[]` | hanzi, pinyin (with tone marks), English gloss, part of speech; set `keyWord: true` on the lesson's core words (⭐ chip + "Key words" filter + dialogue key chips); include the word's own example sentences under `examples[]` if the book pairs them |
| 例句 / Example sentences | `sentences[]` | Lesson-level sentences not tied to one word |
| 注释 / 语法 / Notes & grammar | `grammar[]` | `focusHanzi` = the grammar character (badge, red in `structure`, yellow highlight in examples); optional `structureNegative` for the negative pattern; `explanation` bilingual (zh from the book where available, en concise); `examples[]` may **reuse IDs** of `sentences[]` entries — audio is generated once per ID |
| 学习目标 / Objectives (if present) | `objectives[]` | Bilingual bullets |
| Lesson title | `title` + `titlePinyin` | Pinyin of the title appears on the home card and in the header subtitle |

## ID assignment rules (stable forever)

- Vocabulary: `hsk1-lNN-v01…` in book order (v01, v02, …; zero-pad to 2).
- Vocabulary examples: `hsk1-lNN-vMM-e01…`
- Lesson sentences: `hsk1-lNN-s01…`
- Grammar points: `hsk1-lNN-g01…`
- Conversations: `hsk1-lNN-d01…`; lines: `hsk1-lNN-d01-01…`
- When a grammar example is literally the same sentence as a lesson sentence, **reuse the
  sentence's ID** in `grammar[].examples` (single audio clip, single progress identity).
- Never renumber IDs after publication. Corrections fix text in place; deletions leave gaps.

## Quality checklist per lesson

- [ ] Every hanzi string has correct characters (simplified, matching the book).
- [ ] Pinyin includes tone marks (nǐ hǎo, not ni3 hao3); neutral tones unmarked (xièxie);
      tone sandhi written as pronounced where the book does so (e.g. 不客气 → bú kèqi) —
      follow the source PDF's convention consistently.
- [ ] English glosses are natural and level-appropriate; parts of speech included.
- [ ] Conversation speakers have consistent names/voices across the lesson.
- [ ] Grammar explanations are bilingual and match the book's terminology.
- [ ] Vocabulary count in the book matches `vocabulary.length` (the home card shows it).
- [ ] Audio generated for every clip (`npm run audio:manifest` reports "0 missing" for the lesson)
      and spot-checked by ear (names, numbers, and 不/一 sandhi are the usual suspects).
- [ ] `npm run smoke` passes; lesson renders in dev with pinyin/translation toggles and speed
      control working; "Mark lesson complete" persists across reload.

## Replacing the Lesson 1 sample

When the official Lesson 1 PDF arrives: overwrite `src/content/lessons/hsk1-l01.ts` with the
extracted content (keep the same ID scheme; if the official lesson's vocabulary differs, the
sample's IDs simply disappear with it — acceptable pre-release, since no real student data
exists yet). Delete stale sample mp3s from `src/assets/audio/` that no longer appear in the
manifest output, then regenerate.
