# Traten V1.6.91 Release Audit

## Baseline
- Exact baseline: V1.6.90 package.
- Scope: nationwide ridge-wind continuity and its failure handling.

## Problem addressed
The short-range national decision can use JMA MSM ridge-wind evidence, but JMA is configured for four forecast days (today through +3). Beyond that boundary the previous implementation could fall back to the MET Norway / direct GFS surface-wind decision. This made adjacent forecast days use different wind evidence and could create a large optimistic jump such as many more A grades on the first JMA-out-of-range day.

## V1.6.91 implementation
1. The direct NOAA GFS regional GRIB request now asks for 925 / 850 / 700 / 600 hPa U/V wind and HGT in the same request as the existing surface fields.
2. Ridge wind uses the registered summit elevation and actual GFS pressure-level HGT values. The summit is interpolated between the nearest available vertical anchors (surface/925/850/700/600 hPa).
3. A missing individual 850 or 700 hPa level no longer breaks the estimate; other available pressure levels can bracket the summit.
4. If pressure-level HGT is unavailable but actual 850/700 wind exists, the established nominal 850/700-height estimator is retained only as an explicitly degraded fallback.
5. Surface/10 m wind alone is never promoted to ridge-wind evidence.
6. `_national_gfs_results()` tries recent GFS cycles newest first and retains the cycle with the best ridge-wind coverage. A non-latest selected cycle is marked `cycleFallback` and `ridgeDecisionStatus=gfs-pressure-previous-cycle`.
7. Final national grade is safety-side worst-of: existing integrated grade, JMA ridge grade when available, and GFS pressure-level ridge grade when available.
8. For a summit >=500 m with neither usable JMA nor GFS ridge evidence, an otherwise A result becomes B. Existing B/C/D/E is not worsened only because upper-air data is missing.
9. Missing upper-air evidence is stored as `ridgeDecisionStatus=unavailable` with the normal cache TTL. It is a valid cache state and does not force a provider retry every time a date is opened.
10. JMA production acquisition returns immediately for dates outside its configured forecast horizon.
11. Detail UI shows JMA and GFS ridge-wind series and explains the A-suppression state when upper-air evidence is unavailable.

## Cache identity
National engine changed from:
`metno-gfs-jma-ridge-gust-worstof-v16-consistent-grade`

to:
`metno-gfs-jma-ridge-gust-worstof-v17-gfs-pressure-continuity`

This intentionally invalidates older derived national grades.

## Preserved behavior
- MET Norway / NOAA GFS element integration remains the base decision.
- meteoblue remains a selective arbiter.
- WeatherAPI remains a bounded safety-side overlay.
- V1.6.89 cache-only first paint remains provider-network-free.
- V1.6.90 cache age / remaining TTL display remains visible on cache-only first paint.
- Supabase primary + local fallback architecture is unchanged.
- Four-hour national cache TTL is unchanged.
- The estimated gust remains decision evidence; no removed gust UI is reintroduced.

## Verification performed
- `node --check app.js`: PASS.
- `python3 -m py_compile server.py`: PASS, with the pre-existing unrelated invalid-escape SyntaxWarning.
- `test_v1691_ridge_continuity.py`: PASS.
  - actual-height 850/700 interpolation
  - 925/700 fallback when 850 is absent
  - degraded nominal-height fallback only when pressure-level wind exists
  - no surface-only ridge fabrication
  - A -> B cap when all upper-air evidence is unavailable
  - no forced worsening of existing C
  - GFS ridge safety-side downgrade
  - previous-cycle metadata
  - no missing-ridge penalty below 500 m
- `test_v1691_cache_regressions.py`: PASS.
  - V1.6.89 cacheOnly ordering retained
  - V1.6.90 cache-age display retained
  - V1.6.91 unavailable-ridge state is cacheable
- NOAA NOMADS official filter pages were checked for GFS UGRD/VGRD/HGT and 925/850/700/600 hPa availability.

## Not claimed / production acceptance
- No live NOMADS GRIB download was completed from this build container.
- No live Supabase read/write was executed here.
- The real 9/29 A-E distribution is not claimed until the new engine cache is generated in production.
- GEFS fallback is intentionally not included in V1.6.91. The agreed first stage is GFS multi-level -> older GFS cycle -> A suppression when all ridge evidence is unavailable.
