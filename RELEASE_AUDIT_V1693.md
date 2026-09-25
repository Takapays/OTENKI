# Traten V1.6.93 Release Audit

## Baseline
- Exact baseline: V1.6.92 package.
- Scope: nationwide cold-fill resilience after the GEFS fallback release.

## Production symptom investigated
After V1.6.92 deployment, a cold nationwide analysis could return the UI message:
`現在、予報データの取得が混み合っています...`

The message is shown when the server returns a `partial` national response with zero rows. The UI previously used the same congestion wording even when `rateLimited` was false.

## Code-level failure path found
V1.6.91/92 expanded the same direct GFS NOMADS request to include both:
- base forecast fields used by the nationwide decision (2 m temperature, 10 m wind, gust, precipitation, cloud), and
- 925/850/700/600 hPa wind/HGT used only for ridge-wind enrichment.

That made the larger upper-air request a single point of failure for the base GFS row. If that expanded request timed out/failed during a cold cache fill, GFS could contribute zero base rows. If MET Norway was simultaneously rate-limited or temporarily unavailable, the national response could contain zero mountains even though ridge-wind evidence is optional and GEFS cannot replace the missing base weather decision by itself.

This is a robustness defect independent of whether the specific production incident was caused by NOMADS timeout, MET Norway throttling, or both; production provider logs were not available in this offline build environment.

## V1.6.93 changes
1. Keep the normal expanded GFS request so one successful GRIB still supplies both base and ridge evidence.
2. If that expanded request fails, retry the same cycle/hour with a lightweight base-only GFS request that excludes pressure-level fields.
3. If the expanded GRIB is syntactically valid but contains no usable base wind/temperature, merge a lightweight base retry before declaring the hour missing.
4. Cycle selection now prioritizes base forecast coverage first, ridge coverage second. Ridge enrichment must not cause a more complete base forecast to be discarded.
5. Deterministic previous-cycle recovery is bounded to latest + one previous cycle. If ridge evidence is still unavailable, the existing GEFS fallback handles upper-air resilience instead of multiplying foreground latency across four older GFS cycles.
6. Once the latest cycle already has complete base rows, an older-cycle upper-air failure does not repeat lightweight base retries.
7. GEFS is requested only for mountains that already have a usable base model row (MET Norway or deterministic GFS). GEFS is never spent trying to rescue a mountain that has no base weather decision.
8. The zero-result UI now says `混み合っています` only when the server actually reports rate limiting. Other zero-result failures use a neutral temporary-upstream-unavailable message.

## Cache compatibility
The national cache engine remains:
`metno-gfs-jma-ridge-gust-worstof-v18-gefs-fallback`

This is intentional. V1.6.93 changes transport/failure handling, not the V1.6.92 grade semantics, so valid V1.6.92 caches remain compatible and another full +1..+7 cold rebuild is avoided.

## Preserved behavior
- MET Norway + deterministic GFS remain the base decision.
- JMA MSM and deterministic GFS pressure-level ridge evidence remain primary safety-side ridge sources.
- GEFS ensemble mean remains last-resort upper-air fallback only.
- GEFS-only calm evidence cannot certify A; the B confidence cap remains.
- If all upper-air evidence is unavailable, summits >=500 m still suppress an otherwise-A grade to B.
- V1.6.89 provider-free `cacheOnly` first paint remains.
- V1.6.90 cache-age / TTL display remains.
- Supabase primary + local fallback and 4-hour TTL remain unchanged.

## Verification performed
- `node --check app.js`: PASS.
- `python -m py_compile server.py`: PASS; the pre-existing unrelated invalid-escape SyntaxWarning remains.
- `test_v1693_gfs_base_survival.py`: PASS.
  - expanded upper-air GFS request forced to timeout
  - lightweight base GFS retry still returns a valid GFS national row
  - latest complete base prevents repeated base retry on the previous cycle
  - national engine identity remains V18
- `test_v1692_gefs_fallback.py`: PASS, confirming GEFS safety behavior is unchanged.
- `test_v1693_cache_regressions.py`: PASS, confirming cache-only first paint, cache-age display, GEFS status and V18 cache identity.
- Source diff against V1.6.92 reviewed: changes are limited to version sync, GFS base-survival/fallback ordering, bounded cycle recovery, GEFS base-row gating, and truthful zero-row UI wording.

## Not claimed
- No live NOMADS/MET Norway/Supabase request was executed from this build container.
- No production provider log was available to identify the exact upstream response that triggered the user's incident.
- Production acceptance still requires deployment and one real nationwide refresh.
