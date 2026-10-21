# Active Learning Time — Policy (Phase 1)

Implementation: `src/services/timeTracker.ts` (`ActiveTimeTracker`), wired in `src/bootstrap.ts`,
parameters in `src/config.ts → timeTracking`.

> **What this number is:** an *estimate of active application usage* while a lesson page is open.
> **What it is not:** a measure of attention, effort, or comprehension. The UI says so
> (`S.activeTimeNote`), and teacher-facing surfaces must present it as observational data only
> (spec §19: never label students by recorded time).

## Counting rule

One second is counted only when **all** conditions hold at tick time (1 s resolution):

1. A lesson page is open (home/other routes do not count).
2. The browser tab is **visible** (`document.visibilityState === 'visible'`).
3. The user interacted within the **idle timeout** (default: 120 s).

Counted interactions ("pings"): `pointerdown`, `keydown`, `wheel`, `touchstart` (global, capture
phase) and any audio clip actually starting playback. Passive presence does not ping.

## Lifecycle

| Situation | Behavior |
|---|---|
| Navigate into lesson | `tracker.setLesson(id)` — starts the single interval timer; time from the previous lesson is flushed first |
| Navigate away / to home | `setLesson(null)` — final flush, timer stopped |
| Tab hidden | Counting stops immediately; accumulated time is flushed; on return, counting resumes **only after a new interaction** (a merely-visible tab is not active use) |
| Idle > timeout | Counting pauses silently; resumes on next ping |
| Periodic flush | Every 15 s (configurable) accumulated whole seconds go to `ProgressService.addActiveTime(lessonId, s)` |
| Page hidden/closed | `pagehide` + `visibilitychange→hidden` flush time, events, and provider writes |
| Hard refresh / crash | At most one flush interval (≤15 s) of unbanked time is lost — accepted, documented trade-off |
| Duplicate timers | Impossible: `startTimer()` no-ops when a timer exists; all lifecycle goes through `setLesson()` |
| Multiple tabs | Each tab counts independently; worst case two tabs of the same lesson overlap — server-side clamping in Phase 2 (below) is the mitigation |
| Feature disabled | `config.features.timeTracking=false` → tracker destroyed at boot; no counting, no flushes |

## Storage path

Flushes write `activeLearningSeconds` (additive) into the lesson's `LessonProgressRecord` via the
configured provider (localStorage in Phase 1). Failed flushes return the seconds to the
accumulator for retry — time is never dropped silently.

## Phase 2 server-side validation

The backend must treat client time as untrusted input (spec §18D):

- Clamp each delta to the wall-clock time between that student's last two writes (+ small margin).
- Optionally cap per-day totals per student and flag (not punish) outliers for teacher review.
- Aggregate only via `StudentLessonProgress.ActiveLearningSeconds`; never recompute from events.
