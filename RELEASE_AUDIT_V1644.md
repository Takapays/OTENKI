# TRATEN V1.6.44 nationwide-cache hotfix audit

## Scope

This release repairs nationwide-cache scheduling and cache reuse only. The validated direct reference is V1.6.42. V1.6.43 source bytes were not available in the Library; therefore V1.6.44 is also distributed as a transactional patcher that accepts V1.6.42 or V1.6.43, preserves unrelated source changes, and aborts before writing if any target cache fragment differs.

Canonical regression baseline remains V1.6.1 (= V1.5.231). No route/CT/catalog source is intentionally changed.

## Root cause

V1.6.39 intentionally tightened Meteoblue 429 protection: browser concurrency 1, browser start interval 1.8 s, server interval 2 s, 60 s cooldown, and nationwide Meteoblue worker count 1. That protection is retained.

The cache refresher still iterated every due 25-point chunk in one scheduled HTTP request. Once Meteoblue arbitration became serialized, a large 300-mountain refresh could run close to or beyond the external scheduler HTTP window. Separately, every successful Supabase upsert was followed by per-chunk read-back verification; a transient short read was promoted to `database read-back incomplete`, which the scheduler treated as fatal. Finally, the browser discarded the complete local nationwide snapshot when the aggregate `freshUntil` was stale because even one stale row makes the aggregate timestamp old.

## V1.6.44 changes

1. Scheduled/background cache work receives a 210 s default cycle budget with a 60 s batch-start guard. It stops only between 25-point chunks. Foreground/user-triggered nationwide analysis remains unbounded and still attempts all due rows.
2. Scheduled Supabase writes are acknowledged per chunk but verified once by the authoritative aggregate read at the end of the batch sequence. Real write failures remain fatal. Foreground immediate verification remains enabled; transient read-after-write lag is a warning rather than a database-write failure.
3. Expected scheduled remainder is explicitly represented as `scheduled-remaining` / `maintenanceDeferred` and is scheduler-recoverable. The next 15-minute cycle resumes the remaining rows.
4. A partially refreshed date is finished before work is sprayed across other dates. This prevents seven simultaneously partial forecast dates after introducing a time budget.
5. Browser nationwide cache keeps a five-minute stale bridge when aggregate `freshUntil` is already old. This prevents one stale mountain from deleting an otherwise useful nationwide snapshot while the server catches up. Engine mismatch and empty results still invalidate the browser cache.
6. Existing V1.6.39 Meteoblue anti-429 controls are unchanged. National engine/cache generation remains `metno-gfs-mb-v10-daily-light-rain` / `traten:national-outlook:v10-daily-light-rain`, so valid weather rows are not invalidated by this transport-only fix.

## Source-diff guard

V1.6.42 -> V1.6.44 server top-level function count: unchanged, 172 -> 172.
Only these existing server functions changed:

- `_national_fetch_and_persist`
- `_refresh_rolling_100_cache`
- `_refresh_national_local_cache`
- `_refresh_national_persistent_cache`
- `national_outlook_refresh_cache`

Critical weather/rating and transport functions are byte-identical to V1.6.42, including `_national_grade`, `_national_result_from_metno`, `_national_gfs_results`, `_national_result_from_meteoblue`, `_national_merge_two_models`, `_national_meteoblue_results`, `_meteoblue_upstream_fetch`, `national_outlook`, `_national_response`, and `_national_snapshot`.

Frontend source changes are version synchronization, one browser-cache TTL constant, and `writeNationalOutlookBrowserCache` only.

## Executed tests

- `python3 -m py_compile server.py`: PASS (one pre-existing invalid-escape SyntaxWarning in embedded JavaScript remains unchanged)
- `node --check app.js`: PASS
- V1.6.44 cache hotfix isolated tests: PASS
  - foreground 50-point request still processes 25 + 25
  - scheduled deadline stops after a chunk and reports remaining rows without a DB error
  - scheduled final Supabase read lag remains pending/retryable
  - foreground transient read-after-write lag is warning-only if final read catches up
  - actual Supabase write failure remains fatal
- Browser cache tests: PASS
  - stale aggregate gets five-minute bridge
  - fresh aggregate keeps server expiry
  - wrong engine invalidates
- Existing V1.6.40 production-function daily rating suite against V1.6.39: 20/20 PASS
- Transactional patcher against pristine V1.6.42: PASS and byte-identical to validated V1.6.44 candidate
- Transactional patcher against simulated V1.6.43 with unrelated source change: PASS; unrelated change preserved
- Transactional patcher against simulated V1.6.43 with changed target cache block: PASS; safely aborted with no write

## Production acceptance still required

No live Render, real Supabase, real GitHub Actions, or live weather-API request was executed from this build environment. After deployment, production acceptance is:

- scheduled `national-cache-refresh.yml` returns HTTP 200 rather than 503 for expected partial work;
- refresh JSON shows `scheduledBudgetSeconds: 210`, and may show `scheduled-remaining` while catching up;
- subsequent runs reduce `remainingDueAfter` and complete a date rather than spreading partial rows across all dates;
- `database write failed` / `persistent cache read failed` remain hard failures;
- user nationwide map can immediately reuse cached results while background refresh continues.
