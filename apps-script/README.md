# apps-script/ — Phase 2 backend (Google Apps Script)

These files are **copy-pasted into an Apps Script project bound to a Google
Spreadsheet** — they are not part of the Vite build. Full step-by-step
deployment (Arabic): [`../docs/DEPLOY_PHASE2_AR.md`](../docs/DEPLOY_PHASE2_AR.md).

| File | Role |
|---|---|
| `Code.gs` | The whole backend: JSON envelope API (`doPost`), teacher dashboard entry (`doGet`), `teacherApi()` for `google.script.run`, auth (teacher-issued student codes → hashed session tokens), server-side validation against `COURSE_DATA`, derived-field recomputation, active-time clamping, EventID dedupe, `LockService`, batching, rate limits, sheet auto-creation + Lessons seeding. |
| `LessonsData.gs` | **Generated — do not edit.** `npm run lessons:export` rebuilds it from `src/content/course.ts` (15 lessons / 331 vocabulary ids). The backend uses it to seed the `Lessons` sheet and to reject unknown lesson/vocabulary ids. |
| `Dashboard.html` | Teacher dashboard UI (EN + AR), opened from the **private `?k=…` link** — no login form to fill (product decision 2026-10). The bare `/exec` URL serves an empty "Nothing here" page, so publishing the student endpoint (it ships in `src/config.ts`) does not expose class data. Teacher ops are additionally unreachable from the public student endpoint. Views: students overview with status buckets, per-student report (lessons / quiz bests / recent events), course-wide view + inactivity flags, add-student form. Self-contained (inline CSS/JS). |
| `appsscript.json` | Optional manifest (V8 runtime, timezone). |

## Worksheets created automatically (first run of `setupSheets`)

`Students` · `Lessons` · `StudentLessonProgress` · `StudentVocabularyProgress` ·
`LearningEvents` · `StudentQuizStats` · `Sessions`

Schema + conventions: `docs/PHASE2_INTEGRATION.md` §4 (as updated by §9).

## API contract

Single endpoint, `POST` JSON (sent as `text/plain` to stay a CORS-simple request):

```jsonc
// request
{ "op": "updateLessonProgress", "token": "<session token>", "payload": { "record": { /* … */ } } }
// response
{ "ok": true,  "data": { /* … */ } }
{ "ok": false, "error": { "code": "SIGN_IN_FAILED", "message": "…" } }
```

Student ops: `ping` `signIn` `getStudentProfile` `getCourseProgress`
`getLessonProgress` `updateLessonProgress` `markVocabulary` `saveQuizStats`
`logEvents` `migrateLocalProgress`.
Teacher ops — **only via `teacherApi()` from the dashboard page** (the public
`doPost` endpoint rejects them with `FORBIDDEN`): `teacherAddStudent`
`teacherListStudents` `teacherStudentReport` `teacherCourseOverview`.

Error codes: `BAD_REQUEST` `UNKNOWN_OP` `INVALID_TOKEN` `FORBIDDEN`
`SIGN_IN_FAILED` `ACCOUNT_INACTIVE` `NO_PROFILE` `NOT_FOUND` `DUPLICATE_STUDENT`
`UNKNOWN_LESSON` `UNKNOWN_VOCABULARY` `RATE_LIMITED` `BUSY` `NOT_CONFIGURED`
`INTERNAL`. The client treats `BAD_REQUEST`/`UNKNOWN_*`/`FORBIDDEN`/
`NOT_CONFIGURED` as permanent (drops the queued op) and everything else as
retryable (keeps it in the outbox).

## Testing without deploying

`scripts/mock_backend.mjs` mirrors these rules in memory;
`npm run test:remote` exercises the real client stack against it (108 checks),
including offline/online transitions, duplicate submissions and invalid IDs.
