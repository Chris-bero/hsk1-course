# Architecture (Phase 1, designed for Phase 2)

## Layer map

```
┌────────────────────────────────────────────────────────────────────┐
│  UI components (src/ui/*)  — pure render functions, no storage,    │
│  no network, no audio-tech knowledge. Receive an AppContext.       │
├────────────────────────────────────────────────────────────────────┤
│  App shell / router (src/app.ts) — view lifecycle, race guard,     │
│  cleanup of subscriptions, toast host                              │
├────────────────────────────────────────────────────────────────────┤
│  Services (src/services/*)                                         │
│   • AudioService      — playback, speed, sequences, missing clips  │
│   • ActiveTimeTracker — active-time policy (see ACTIVE_TIME_POLICY)│
│   • SettingsStore     — pinyin/translation/speed, persisted        │
│   • identity          — local student + session ids                │
├────────────────────────────────────────────────────────────────────┤
│  Progress domain (src/progress/*)                                  │
│   • ProgressService   — the ONLY progress API components use       │
│   • EventLogger       — configurable, batched, deduped events      │
│   • ProgressProvider  — interface (the Phase 2 seam)               │
│       ├─ LocalProgressProvider   (Phase 1: localStorage)           │
│       └─ RemoteProgressProvider  (Phase 2 stub: Apps Script API)   │
├────────────────────────────────────────────────────────────────────┤
│  Content (src/content/*) — typed lesson data, course registry.     │
│  Static, versioned with the app; drives audio manifest + UI.       │
└────────────────────────────────────────────────────────────────────┘
        Wiring happens in exactly one file: src/bootstrap.ts
```

This satisfies spec §20's required separations:

| Spec requirement | Where it lives |
|---|---|
| 1. Educational lesson content | `src/content/**` (pure data modules typed by `src/types/content.ts`) |
| 2. UI components | `src/ui/**` + `src/app.ts` — tab-based lesson view: Words / Grammar / Dialogue / Practice |
| 3. Audio / TTS services | `src/services/audioService.ts` + generated manifest + `scripts/generate_audio.py` |
| 4. Lesson completion logic | `src/progress/ProgressService.ts` (`setLessonCompleted`, derived %) |
| 5. Student progress interfaces | `src/progress/ProgressProvider.ts`, `src/types/progress.ts` |
| 6. Local persistence | `src/progress/LocalProgressProvider.ts` |
| 7. Future cloud synchronization | `src/progress/RemoteProgressProvider.ts` (stub) + `createProgressProvider` factory |
| 8. Authentication-related services | `src/services/identity.ts` (Phase 1 local identity; Phase 2 replaces/augments — see PHASE2_INTEGRATION.md §Identity) |

## Stable ID scheme

IDs are permanent, content-level, and human-readable. UI redesigns, reordering,
or translation changes never affect them. Progress records reference **only** these IDs.

| Entity | Pattern | Example |
|---|---|---|
| Course | fixed | `new-hsk-1` |
| Lesson | `hsk1-lNN` | `hsk1-l01` |
| Vocabulary entry | `hsk1-lNN-vMM` | `hsk1-l01-v03` |
| Vocabulary example | `hsk1-lNN-vMM-eKK` | `hsk1-l01-v03-e01` |
| Lesson sentence | `hsk1-lNN-sMM` | `hsk1-l01-s03` |
| Grammar point | `hsk1-lNN-gMM` | `hsk1-l01-g02` |
| Conversation | `hsk1-lNN-dMM` | `hsk1-l01-d01` |
| Conversation line | `hsk1-lNN-dMM-LL` | `hsk1-l01-d01-04` |
| Audio clip | == content item id | `audio/hsk1-l01-v03.mp3` |
| Student (Phase 1) | `stu-local-<uuid>` | device-local only |
| Session | `sess-<uuid>` | per browser session (survives refresh) |
| Event | `<uuid>` | idempotency key for Phase 2 |

Rules:
- A sentence reused as a grammar example keeps the SAME id → one audio clip, one record.
- IDs are never renumbered. If official lesson numbering differs from the sample,
  files are replaced wholesale (see CONTENT_EXTRACTION.md), keeping the scheme.

## Data flow

**Rendering:** `course.ts` registry → `app.ts` route → view component → DOM.
Content is imported statically; the build inlines it (fast, offline-friendly, type-safe).

**Progress writes:** component → `ProgressService` (business rules: viewed ≠ played ≠ completed;
derived percentages; dedupe) → `EventLogger` (batched, kill-switchable) + `ProgressProvider`
(debounced localStorage writes, `flush()` on pagehide/route change).

**Progress reads (Phase 2):** same `ProgressService` API — the provider underneath becomes an
HTTP client for the Apps Script endpoint. Components change zero lines.

**Audio:** component → `AudioService.play(ctx)` → manifest lookup (clipId → URL) → single
`<audio>` element with `playbackRate` → `onPlayed` → central, honest telemetry
(events fire only when audio truly starts) + time-tracker ping.

## Key design decisions

1. **Vanilla TS + Vite, no framework.** 15 mostly-static lessons don't need a runtime framework;
   components are plain functions returning DOM. Fewer moving parts to maintain, trivially hostable.
2. **Provider interface with async contract from day one.** The local provider is synchronous but
   the interface is Promise-based, so the network provider drops in without touching call sites.
3. **Generated audio manifest.** `scripts/export_audio_manifest.ts` emits both the JSON manifest
   (for the Python TTS generator) and `audioManifest.generated.ts` (clip id → URL imports for the
   bundler). Missing clips never break builds; they degrade to a toast.
4. **Honest telemetry.** Viewed (IntersectionObserver-rendered), audio-played (onPlayed), and
   completed (explicit action) are three distinct signals, per spec §17C. Completion % is derived,
   never authoritative (server must recompute in Phase 2).
5. **Single wiring point.** `bootstrap.ts` chooses implementations; everything else receives
   dependencies via `AppContext`/constructor injection → testable (see `test/smoke.ts`).
6. **Config-driven behavior.** Feature flags (`vocabularyCompletion`, event logging kill-switches,
   time-tracking policy) live in `src/config.ts` — no code edits needed to change policy.
7. **Storage-safe boot.** Sandboxed/blocked storage falls back to in-memory (session-only) with a
   console warning; the UI badge never overstates persistence.
8. **Practice quiz stays out of the core schema.** `QuizStats` (best score / attempts) is stored
   via the provider but deliberately kept separate from the sheet-parity progress records; a
   Phase 2 sheet can adopt it later without touching `LessonProgressRecord`.

## Adding lesson N (checklist)

1. Create `src/content/lessons/hsk1-lNN.ts` implementing `Lesson` (template + field mapping in
   CONTENT_EXTRACTION.md).
2. Import it in `src/content/course.ts`, replacing the corresponding `null`.
3. `npm run audio:manifest && python3 scripts/generate_audio.py --only hsk1-lNN && npm run audio:manifest`
4. `npm run typecheck && npm run smoke && npm run build`.

No other file changes. UI, navigation, progress, events and audio discover lessons via the registry.
