# Release Audit V1.6.89

## Baseline
- Exact implementation baseline: V1.6.88 package supplied in the conversation.

## Root cause confirmed for the +3-day delay
`national_outlook()` called `_national_repair_snapshot_jma()` before checking `cacheOnly:true`.

The JMA short-range expectation window is `today ... today+3` when `OPENMETEO_JMA_SHADOW_DAYS=4`. Therefore the +3 day is the last JMA edge day. If cached rows lacked usable JMA ridge series there, every date-open could synchronously retry JMA before returning the already-saved cache. That explains why adjacent dates could appear immediately while +3 repeatedly took tens of seconds.

## V1.6.89 behavior
1. `cacheOnly:true` returns from Supabase/local cache without forecast-provider network access.
2. Existing cached JMA evidence is reconciled locally only.
3. Explicit `全国を判定` still retains JMA repair/update logic.
4. The browser paints shared cached grades first and keeps them on screen while an explicit refresh request runs.
5. Supabase/local fallback selection logic is unchanged; health now exposes the active backend more clearly.
6. Client/server/index versions are synchronized to 1.6.89.

## Refresh architecture note
- Supabase remains the persistent primary cache whenever configured and not degraded.
- Local `/tmp` remains fallback/checkpoint storage.
- The token-protected external refresh endpoint remains available for scheduled GitHub Actions / Cloud Scheduler.
- `NATIONAL_OUTLOOK_AUTO_REFRESH` remains an operator-controlled in-process worker switch and is not forcibly overridden by code.

## Static verification
- `node --check app.js`: PASS
- `python -m py_compile server.py`: PASS (pre-existing invalid-escape SyntaxWarning remains)
- `test_v1689_cache_behavior.py`: PASS
- Diff against V1.6.88 inspected; changes are limited to version synchronization, cache-only/JMA first-paint behavior, active-backend diagnostics, and cached-first explicit refresh UX.

## Not claimed
- No live Supabase write/read was executed from this offline build environment.
- No Cloud Run/GitHub Actions deployment was performed.
- Browser visual behavior after production deployment is not claimed until verified there.
