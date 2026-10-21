# NEW HSK 1 Course Site

Interactive Chinese-learning website for the **NEW HSK 1** course (15 lessons), built in two phases:

- **Phase 1 (complete):** a complete educational product — lessons with vocabulary, example
  sentences, grammar and conversations; natural Mandarin audio with adjustable speed; pinyin /
  translation show-hide; tab-based lesson study (Words / Grammar / Dialogue / Practice with a
  best-score quiz); lesson navigation; lesson completion; local progress tracking; responsive
  bilingual (EN/中文) UI with light/dark themes.
- **Phase 2 (implemented 2026-10, live):** student profiles + teacher monitoring backed by
  Google Apps Script + Google Sheets. **Sign-in is mandatory** — a full-page gate blocks all
  course content until the student enters the teacher-issued **name + access code**; progress
  then syncs through a persistent offline-safe outbox, and any earlier local progress migrates
  automatically (once). Each student gets a **personal profile page** (`#/me`): totals
  (lessons, course %, words mastered, active time, last activity), lesson-by-lesson breakdown
  and quiz bests. The **teacher dashboard** (same Apps Script deployment, private `?k=…` link,
  nothing to type) shows per-student reports, course-wide completion and observational inactivity
  flags; teacher ops are technically unreachable from the public student endpoint. All code lives
  in `apps-script/` + `src/progress/`; deploy steps:
  [`docs/DEPLOY_PHASE2_AR.md`](docs/DEPLOY_PHASE2_AR.md) (Arabic, step-by-step).

> **Content status:** ALL 15 lessons are extracted from 《新HSK教程1》 (PDFs + textbook dialogue
> pages) with **1276 generated audio clips** across 4 neural voices shared by the characters.
> See [`docs/CONTENT_EXTRACTION.md`](docs/CONTENT_EXTRACTION.md) for the per-lesson workflow.

## Quick start

```bash
npm install
npm run dev          # local dev server (http://localhost:5173)
npm run build        # production build → dist/ (static files, host anywhere)
npm run preview      # serve the production build locally
npm run typecheck    # TypeScript strict check
npm run smoke        # jsdom end-to-end smoke test (161 checks)
npm run test:remote  # Phase 2 end-to-end: provider + outbox + migration + teacher ops + real UI (108 checks)
npm run lessons:export   # regenerate apps-script/LessonsData.gs after content changes
```

`preview-dist/index.html` (produced by `npm run build:preview`) is a single self-contained file
(all JS/CSS/audio inlined) for quick previews without a server. Note: inside sandboxed embedded
viewers, browser storage may be unavailable, so progress there lives for the page session only —
the badge in the header always tells the truth about where data is stored.

### Hosting on GitHub Pages (zero-config)

`.github/workflows/deploy-pages.yml` builds and deploys `dist/` to GitHub Pages on every push to
`main` (one-time: repo Settings → Pages → Source: **GitHub Actions**). Arabic step-by-step:
[`docs/GITHUB_AR.md`](docs/GITHUB_AR.md). Phase 2 deployment (Apps Script + Sheets):
[`docs/DEPLOY_PHASE2_AR.md`](docs/DEPLOY_PHASE2_AR.md).

## Audio pipeline (natural Mandarin TTS)

Audio is **pre-generated** with `edge-tts` (Microsoft neural voices: `zh-CN-XiaoxiaoNeural` for
female, `zh-CN-YunxiNeural` for male) so quality is identical on every device. Playback speed
(0.5×–1.25×) is applied via `playbackRate` — no re-synthesis needed.

```bash
npm run audio:manifest                     # scan content → audio-manifest.json + runtime manifest
python3 scripts/generate_audio.py          # generate all missing clips (pip3 install edge-tts)
python3 scripts/generate_audio.py --only hsk1-l03   # one lesson
npm run audio:manifest                     # re-run to update the runtime manifest
```

Details: [`docs/AUDIO_PIPELINE.md`](docs/AUDIO_PIPELINE.md).

## Project layout

```
src/
  types/          content.ts + progress.ts — the typed contracts (stable IDs, sheet-parity records)
  config.ts       feature flags, tracking policy parameters, storage keys, progress provider choice
  content/        course registry + lessons/hsk1-lNN.ts data files (pure data, no UI)
  i18n/           bilingual UI strings (EN + 中文)
  services/       audioService, settings, identity (+remote session), timeTracker, generated audio manifest
  progress/       ProgressProvider interface · LocalProgressProvider · RemoteProgressProvider (Phase 2,
                  implemented) · Outbox (persistent offline-safe write queue) · ProgressService facade
                  · EventLogger · provider factory
  ui/             dom helpers + components: header (tabs + auth chip/badge), signInDialog (Phase 2),
                  homeView (lesson grid / how-it-works), lessonView (control bar + tab shell), wordsTab,
                  grammarTab, dialogueTab, practiceTab (quiz), common — render functions, no framework
  app.ts          hash router + view lifecycle
  bootstrap.ts    the ONLY place implementations are wired together (+ sign-in/sign-out stack swap)
  main.ts         entry (css + bootstrap)
apps-script/      Phase 2 backend: Code.gs (JSON API + validation + locking) · LessonsData.gs
                  (generated course registry for server-side validation) · Dashboard.html (teacher UI)
scripts/          audio manifest exporter (TS) · lessons exporter (TS) · batch TTS generator (Python)
                  · mock_backend.mjs (in-memory backend mirror for tests)
test/             jsdom smoke test · remote/Phase 2 end-to-end test · asset stub loader
docs/             architecture, Phase 2 handover + deployment guide (AR), time policy, audio pipeline,
                  content workflow
```

## Design documents

| Document | Purpose |
|---|---|
| [ARCHITECTURE.md](docs/ARCHITECTURE.md) | Module boundaries, ID scheme, data flow, design decisions |
| [PHASE2_INTEGRATION.md](docs/PHASE2_INTEGRATION.md) | **Handover doc**: components/interfaces connected to Google Apps Script, sheet schema, API contract, security checklist (§9 records what was built) |
| [DEPLOY_PHASE2_AR.md](docs/DEPLOY_PHASE2_AR.md) | **دليل النشر بالعربية**: خطوة بخطوة — Sheets + Apps Script + ربط الموقع + تسجيل الطلاب |
| [ACTIVE_TIME_POLICY.md](docs/ACTIVE_TIME_POLICY.md) | Documented active-learning-time policy (what counts, what doesn't) |
| [AUDIO_PIPELINE.md](docs/AUDIO_PIPELINE.md) | TTS generation, voices, regeneration rules |
| [CONTENT_EXTRACTION.md](docs/CONTENT_EXTRACTION.md) | Step-by-step workflow for adding each lesson from the PDFs |
| [WINDOWS_SETUP.md](docs/WINDOWS_SETUP.md) | Windows: fixing "npm is not recognized", zero-install viewing, no-Node publishing |

## Honesty guarantees (by design)

- The header badge always shows where progress lives: **"Saved on this device only"** while
  signed out, **"Waiting to sync…"** while the outbox has queued writes, **"Synced"** only after
  server acks, **"Sync error — saved locally"** on repeated failure. Nothing is ever presented
  as synced/visible to a teacher when it isn't.
- Playing audio never marks a word "learned"; only an explicit student action does.
- Learning time is labeled everywhere as an *estimate of active app usage*, not attention —
  on the client AND the server (the backend clamps time deltas to wall-clock and never lets
  seconds decrease or jump).
- Completion percentages are derived, never trusted: the Apps Script backend recomputes them
  from its own vocabulary rows and validates every lesson/vocabulary ID against the generated
  course registry.
- Students can never read another student's data: identity comes from the session token
  server-side; teacher-only operations reject student tokens (`FORBIDDEN`).
