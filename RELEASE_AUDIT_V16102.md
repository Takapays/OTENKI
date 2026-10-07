# Traten V1.6.102 Release Audit

## Baseline
- Exact baseline: V1.6.101 package.
- Scope: reduce Supabase egress without changing forecast or rating semantics.

## Changes
1. `_national_100_date_cache_status()` now calls `_national_supabase_read_meta()` rather than `_national_supabase_read()`.
   - Routine rolling checks transfer only cache identity/timestamps.
   - Full `result` JSON is not downloaded merely to decide whether a row is fresh/stale/missing.
2. `NATIONAL_OUTLOOK_REFRESH_INTERVAL` default changes from 900 to 3600 seconds and is clamped to a minimum of 3600 seconds.
3. `/api/national-outlook/refresh-cache` has a server-side interval gate. Calls arriving before the next eligible refresh return HTTP 200 with `state=interval-not-due` and do not execute the persistent refresh cycle.
4. External scheduled refreshes now update the shared refresh-runtime timestamps so the interval gate and `/api/health` use the same last-run state.

## Preserved behavior
- National engine remains `metno-gfs-jma-ridge-gust-worstof-v19-cumulative-wind7`.
- 7 rolling forecast days remain enabled.
- 100 mountains per rolling day remain enabled.
- 4-hour forecast cache TTL remains 14400 seconds.
- Chunk size remains 25.
- A-E thresholds remain unchanged, including V1.6.101 daily C wind accumulation threshold of 7 m/s.
- JMA MSM / deterministic GFS ridge wind / GEFS fallback behavior is unchanged.
- User-triggered national analysis and detail behavior is unchanged.

## Verification
- `node --check app.js`: PASS
- `python3 -m py_compile server.py`: PASS (pre-existing unrelated invalid-escape SyntaxWarning may remain)
- `python3 test_v16102_egress.py`: PASS
- `python3 test_v16102_regression.py`: PASS (V1.6.101 wind-7 / no-A-B-auto-refresh / tapped-detail behavior retained)

## Production note
Actual Supabase egress reduction must be measured after the provider allowance resets; no live Supabase billing counter is available in the build environment.
