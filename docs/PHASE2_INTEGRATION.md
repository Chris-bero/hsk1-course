# Phase 2 Integration Handover — Google Apps Script + Google Sheets

> Required by the project spec: *"When Phase 1 is complete, document the exact components, data
> structures, and interfaces that will need to be connected to Google Apps Script."*
> This is that document. Nothing in Phase 2 requires rewriting lesson, vocabulary, grammar,
> conversation, or audio components.

## 1. Target architecture

```
Student website (this repo)
   → ProgressProvider implementation ("API service" layer, in-browser)
      → Google Apps Script web app (backend: auth, validation, batched sheet I/O)
         → Google Sheets (5 worksheets, see §4)
Teacher dashboard (Phase 2, separate surface)
   → same Apps Script backend, teacher-authorized operations only
```

Rule: the browser talks **only** to the Apps Script endpoint — never to Sheets/Drive APIs,
never with privileged credentials (spec §18A, §20).

## 2. Exact connection points (files to touch in Phase 2)

| # | File | What changes |
|---|---|---|
| 1 | `src/progress/RemoteProgressProvider.ts` | Implement the `ProgressProvider` interface against the Apps Script HTTP API (§5). Currently a documented stub that throws. |
| 2 | `src/config.ts` | `progress.provider: 'remote'`, `progress.remoteEndpoint: '<apps-script-url>'`. The URL is public-by-design; it is NOT a secret and NOT auth. |
| 3 | `src/services/identity.ts` | Add real sign-in (see §6). Keep `stu-local-*` as a **migration key**: on first authenticated sync, the backend maps (or re-keys) local records to the authenticated StudentID. |
| 4 | `src/bootstrap.ts` | Nothing structural — `createProgressProvider()` already handles remote init + **fallback to local on failure** with an honest badge. Optionally add an offline outbox wrapper (§7). |
| 5 | `src/progress/EventLogger.ts` | Already batches + re-queues on failure. Phase 2: point flush cadence at the remote provider; keep `eventId` (idempotency). |
| 6 | `src/config.ts` → `features.vocabularyCompletion` | Flip to `true` when teachers want per-word tracking (machinery already works locally end-to-end). |
| 7 | UI sync badge | Already renders all four honest states: `local-only / pending / synced / error` (`src/ui/components/header.ts`). Remote provider must maintain `syncState` truthfully. |
| 8 | Teacher dashboard | New surface (separate app or Apps Script-served page). Consumes teacher-only API operations (§5). **Not** part of the student bundle. |

Explicitly **unchanged**: `src/content/**`, `src/ui/components/**` (all lesson rendering),
`src/services/audioService.ts`, `timeTracker.ts`, `settings.ts`, the audio pipeline and all
stable IDs.

## 3. Data structures already aligned with the sheets

TypeScript types in `src/types/progress.ts` mirror the sheet schema 1:1:

- `StudentProfile` → **Students**
- (course content registry) → **Lessons** (derived from `src/content/course.ts`: LessonID,
  LessonTitle, LessonOrder, VocabularyCount, CourseLevel — keep the sheet in sync at release time
  via a small export script rather than manual entry)
- `LessonProgressRecord` → **StudentLessonProgress**
- `VocabularyProgressRecord` → **StudentVocabularyProgress**
- `LearningEvent` → **LearningEvents**

Redundancy note (spec §18B): `TotalVocabularyCount` and `CompletionPercentage` are **derived**
from content/records. They are stored for sheet convenience only; the backend must recompute,
never trust client values (spec §18D).

## 4. Spreadsheet schema (starting point — review before build)

**Students**: `StudentID | StudentName | EmailOrIdentifier | CourseLevel | EnrollmentDate | AccountStatus | MigratedFromLocalID`
**Lessons**: `LessonID | LessonTitle | LessonOrder | VocabularyCount | CourseLevel`
**StudentLessonProgress**: `StudentID | LessonID | Status | StartedAt | LastActivityAt | CompletedAt | ActiveLearningSeconds | CompletedVocabularyCount | TotalVocabularyCount | CompletionPercentage`
**StudentVocabularyProgress**: `StudentID | LessonID | VocabularyID | Status | FirstViewedAt | LastReviewedAt | MarkedCompletedAt`
**LearningEvents**: `EventID | StudentID | LessonID | VocabularyID | EventType | Timestamp | SessionID`

Conventions: ISO-8601 UTC timestamps; `Status` enums exactly as in `src/types/progress.ts`;
`EventID` unique (dedupe key); one row per (Student, Lesson) and per (Student, Lesson, Vocabulary) —
upsert, never append duplicates.

## 5. Apps Script API contract (to implement)

Single endpoint, POST JSON, envelope:

```jsonc
// request
{ "op": "updateLessonProgress", "studentId": "...", "payload": { ... }, "idempotencyKey": "..." }
// response
{ "ok": true, "data": { ... } }          // or
{ "ok": false, "error": { "code": "FORBIDDEN", "message": "..." } }
```

Operations (spec §18C), all server-validated against the authenticated identity:

| op | used by | notes |
|---|---|---|
| `getStudentProfile` | student app boot | returns only the caller's profile |
| `getCourseProgress` | home page | all lesson rows for the caller |
| `getLessonProgress` | lesson open | single lesson row + vocab rows (batched read) |
| `updateLessonProgress` | time flush, completion toggle | server recomputes %, clamps time deltas (§7) |
| `markVocabulary` | explicit learned/unlearned | upsert by (student, lesson, vocab) |
| `logEvents` | EventLogger flush | **batch**, dedupe by EventID |
| `migrateLocalProgress` | first sign-in | body: local snapshot keyed by `stu-local-*`; server validates + maps |
| `teacherListStudents` / `teacherStudentReport` / `teacherCourseOverview` | dashboard | teacher role only (§8) |

Use `ContentService` JSON responses; batch sheet reads/writes (`getValues`/`setValues` on ranges,
`LockService` for concurrent writers — spec §18C "batch operations", §18E "concurrent activity").

## 6. Authentication strategy (document BEFORE deploying — spec §18D)

A hidden URL or a studentId in localStorage is **not** authentication. Options to evaluate, in
order of preference:

1. **Google Sign-In (OAuth) in the student site + ID-token verification in Apps Script.**
   Apps Script verifies the token's audience/signature, maps Google account → StudentID via the
   Students sheet (EmailOrIdentifier). Teachers = flagged rows/role column. Strongest fit for
   institutional Google accounts.
2. **Teacher-issued codes**: teacher creates student rows; site exchanges a one-time code for a
   rotating session token stored server-side (Script properties / sheet), hashed. Workable for
   young learners without accounts; must handle code sharing/rotation.
3. **Institutional SSO proxy** (if the school has one) fronting the Apps Script URL.

Whatever is chosen: document execution permissions (`execute as user` vs `web app`), deployment
channel (head deployments, `doPost` only), web-app access setting ("anyone" is acceptable ONLY
because every request is authenticated at the application layer — the URL itself grants nothing),
and quota implications (Apps Script ~limited daily URL-fetch/execution time; batch aggressively).

## 7. Data integrity & offline behavior (spec §18E)

Already in place client-side, to preserve in Phase 2:

- **Idempotency**: every event has a client UUID `eventId`; `logEvents` dedupes server-side.
- **No silent loss**: `EventLogger.flush()` re-queues failed batches; `ActiveTimeTracker.flush()`
  returns seconds to the accumulator on failure. Phase 2: wrap the remote provider with a
  persistent **outbox** (IndexedDB/localStorage) so writes survive page close while offline.
- **Honest sync state**: badge shows `pending` while outbox non-empty, `error` on repeated
  failure, `synced` only after server acks.
- **Server-side validation**: clamp `activeLearningSeconds` deltas (≤ wall-clock between calls +
  margin), reject unknown Lesson/Vocabulary IDs, recompute `CompletionPercentage` and
  `CompletedVocabularyCount`, rate-limit per student, reject malformed envelopes.
- **Concurrency**: `LockService` around read-modify-write per student; upsert semantics.

## 8. Teacher dashboard (Phase 2 scope)

Data needs are fully covered by the sheets:

- **Overview**: per student — lessons completed /15, course %, total active seconds,
  vocab completed, last activity, status bucket (completed / progressing / not started / stale).
- **Student report**: per-lesson rows (status, time, vocab counts), vocabulary detail, recent
  meaningful events timeline (from LearningEvents, filtered by the stable event types).
- **Course view**: aggregation queries; "lessons with most incomplete records"; "no activity
  for N days" (observational flags only — the spec forbids labeling students inattentive based
  on time alone).

Permissions: enforce in the backend (role check on every teacher op). Hiding UI elements is not
access control. Students must never be able to read other students' rows — every student-scoped
op validates `studentId == authenticated identity`.

## 9. Pre-Phase-2 checklist — **DONE (2026-10-20)**

- [x] Review §4 schema against the final 15-lesson dataset → **Lessons sheet is seeded
      automatically** from `apps-script/LessonsData.gs` (generated by `npm run lessons:export`
      out of `src/content/course.ts` — 15 lessons / 331 vocabulary ids). Two sheets were ADDED
      to §4: **StudentQuizStats** (the provider contract includes quiz stats) and **Sessions**
      (hashed session tokens). `Students.EmailOrIdentifier` became `Students.AccessCode`
      (teacher-issued codes — the chosen auth option).
- [x] Choose + document auth option (§6) → **Option 2: teacher-issued codes** for students
      (MANDATORY sign-in gate — no anonymous browsing; product decision 2026-10). Teacher
      creates Student rows (dashboard form or directly in the sheet) and sends name+code by
      hand; `signIn` exchanges them for a random 64-hex session token stored **hashed**
      (SHA-256), 90-day TTL, sliding last-seen. **Teacher dashboard: nothing to type** (owner
      decision) — it is served only on a private `?k=<DASH_KEY>` link (key auto-generated in
      Script Properties, printed by `setupSheets`, rotatable via `rotateDashKey`); the bare
      `/exec` URL serves an empty page, so the public student endpoint URL cannot expose class
      data. Teacher ops are only served on the private `teacherApi`/HtmlService channel; the
      public `doPost` endpoint rejects every `teacher*` op with FORBIDDEN, so students can never
      reach class data through the site. Deployment mode, access setting and quotas:
      `docs/DEPLOY_PHASE2_AR.md`.
- [x] Implement `RemoteProgressProvider` + outbox → `src/progress/RemoteProgressProvider.ts`
      (cache-first reads, optimistic writes, honest syncState) + `src/progress/outbox.ts`
      (persistent queue in localStorage, per-key merge, chunked event batches, permanent-error
      drop so a rejected op can never jam the queue). `LocalProgressProvider` remains the
      signed-out/offline-boot fallback.
- [x] Build migration for `stu-local-*` snapshots → `migrateLocalProgress` (client sends the
      local snapshot once at first sign-in; server merges with later-activity-wins + max-seconds
      rules and records `MigratedFromLocalID` for idempotency).
- [x] Implement Apps Script ops (§5) → `apps-script/Code.gs`: all §5 ops + `signIn`,
      `teacherAddStudent`, `ping`. Server-side ID validation against
      COURSE_DATA, derived-field recomputation, wall-clock time clamping, EventID dedupe,
      `LockService` around read-modify-write, batched `getValues`/`setValues`, per-identity
      rate limit (120/min). Channel guard: `teacher*` ops are dashboard-channel-only.
- [x] Sync the **Lessons** sheet from `src/content/course.ts` via an export script →
      `npm run lessons:export` (no manual rows, ever).
- [x] Build teacher dashboard → `apps-script/Dashboard.html`, served by the SAME web-app
      deployment (`doGet`), teacher-role ops only via `google.script.run → teacherApi()`.
      Overview (status buckets), per-student report (lessons, quiz bests, recent events),
      course view (per-lesson completion + "no activity for N days" observational flags),
      add-student form. EN + AR bilingual UI.
- [x] End-to-end test: two students + one teacher, offline/online transitions, duplicate
      submissions, invalid IDs → `npm run test:remote` (**108 checks**, `test/remote.ts` against
      `scripts/mock_backend.mjs`, an in-memory mirror of Code.gs rules) INCLUDING a real-UI pass:
      jsdom + real bootstrap + sign-in dialog + migration + study actions + sign-out.
      Phase 1 regression: `npm run smoke` still **161/161**.

## 10. Latency notes (2026-10 product update)

Apps Script cold starts (5–20 s after idle) dominated the original sign-in
flow, which took 3–4 sequential round trips. Fixes now in place:

- **One-round-trip sign-in**: `signIn` accepts an optional `migrate` payload
  and returns `{token, student, migration?, courseProgress}` — credentials,
  local-snapshot migration and the full student cache land in a single request.
- **One-round-trip boot**: `getCourseProgress` also returns the student
  profile, so a returning visit initializes with one call.
- **Cold-start absorber**: the gate calls `provider.warmUp()` (a fire-and-
  forget `ping`) on mount and on first keystroke — the instance wakes while
  the student is still typing their name.
- **Warm-instance bootstrap cache**: sheet existence checks + Lessons seeding
  run once per Apps Script instance (module-global flag) and Lessons reseeding
  is guarded by a content fingerprint in Script Properties (`LESSONS_FP`),
  so steady-state requests skip all setup reads.
- **Cheaper sessions**: token creation appends directly (no full `Sessions`
  read); expired sessions are pruned lazily (~5% of creations).
- Honest UX for the residual cold start: spinner + "first sign-in can take a
  few seconds" note on the gate.
