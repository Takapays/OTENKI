# Traten V1.6.92 Release Audit

## Baseline
- Exact baseline: V1.6.91 package.
- Scope: add a bounded NOAA GEFS upper-air fallback without changing the base MET Norway / deterministic GFS integration.

## Why this release exists
V1.6.91 made deterministic NOAA GFS pressure-level wind the medium-range ridge-wind source and retained older GFS-cycle fallback. If JMA MSM and deterministic GFS upper-air data are both unavailable, however, the only remaining safe behavior was to suppress A to B. V1.6.92 adds independent NOAA GEFS ensemble-mean upper-air evidence before falling back to that no-upper-air state.

## V1.6.92 implementation
1. Added NOAA GEFS 0.5 degree ensemble-mean (`geavg`) GRIB2 acquisition through the official NOMADS GEFS filter.
2. GEFS is requested only for mountains >=500 m where neither usable JMA ridge series nor deterministic GFS pressure-level ridge series exists.
3. Requested GEFS variables are UGRD / VGRD / HGT at 925 / 850 / 700 / 500 hPa plus 10 m U/V. Surface wind is supporting context only and is never promoted to ridge evidence by itself.
4. At 925 / 850 / 700 hPa, registered summit elevation is interpolated against retrieved pressure-level HGT and wind.
5. The GEFS ensemble-mean pgrb2a path exposes 500-hPa wind but can lack a matching 500-hPa HGT record. A real 500-hPa wind may therefore be used with a nominal 5570 m anchor only for a high summit that needs an upper bracket; this is explicitly marked degraded. No wind value is invented.
6. GEFS native 3-hour daytime anchors are expanded to the 06:00-15:00 JST decision grid by linear time interpolation. Interpolated hours are marked as such in the series metadata.
7. Recent GEFS cycles are tried newest-first; the best ridge-coverage cycle is retained. A non-newest cycle is recorded with cycle-fallback metadata.
8. Final national grade remains safety-side worst-of across base integration, JMA ridge, deterministic GFS ridge, and GEFS ridge when present.
9. GEFS is deliberately asymmetric: a worse GEFS ridge grade can worsen the final grade, but a calm GEFS-only fallback does not certify A. With no JMA/GFS primary upper-air evidence, an otherwise A grade is capped at B.
10. If GEFS also fails, the V1.6.91 no-upper-air state remains: 10 m wind is not fabricated into ridge wind; A is capped at B for summits >=500 m; existing B/C/D/E is not worsened solely because data is missing.
11. GEFS availability/failure state is cacheable under the normal four-hour national cache policy, preventing repeated long provider waits on every date-open.
12. Detail UI now shows GEFS as a separate supplemental ridge-wind line and identifies GEFS-only A suppression distinctly from complete upper-air unavailability.
13. `/api/health` exposes `national_gefs_fallback_enabled=true` and the GEFS fallback source.

## Cache identity
National engine changed from:
`metno-gfs-jma-ridge-gust-worstof-v17-gfs-pressure-continuity`

to:
`metno-gfs-jma-ridge-gust-worstof-v18-gefs-fallback`

`ridgeContinuityVersion` changed to `v1692-ridge-continuity-v2`.

This intentionally invalidates V1.6.91 and older derived national grades.

## Preserved behavior
- MET Norway + deterministic NOAA GFS remain the base element integration.
- JMA MSM and deterministic GFS remain the primary ridge-wind evidence.
- meteoblue remains a selective arbiter.
- WeatherAPI remains a bounded safety-side overlay.
- V1.6.89 cache-only first paint remains provider-network-free.
- V1.6.90 cache age / remaining TTL remains visible on cache-only first paint.
- Supabase primary + local fallback architecture is unchanged.
- National cache TTL remains four hours.
- V1.6.91 older deterministic GFS cycle fallback is retained.

## Verification performed
- `node --check app.js`: PASS.
- `python -m py_compile server.py`: PASS with the pre-existing unrelated invalid-escape SyntaxWarning.
- `test_v1692_gefs_fallback.py`: PASS.
  - GEFS 850/700 actual-HGT interpolation
  - high-summit real 500-hPa wind + explicitly degraded nominal 500-hPa height anchor
  - no surface-only ridge fabrication
  - native 3-hour GEFS -> hourly 06-15 interpolation
  - GEFS URL/file/level/variable construction
  - calm GEFS-only fallback keeps A capped to B
  - adverse GEFS can worsen the grade safety-side
  - existing C is not made safer by GEFS
  - primary GFS status remains primary when primary evidence exists
- `test_v1692_cache_regressions.py`: PASS.
  - V1.6.89 cacheOnly provider-free ordering retained
  - V1.6.90 cache-age display retained
  - V1.6.92 engine / continuity identity and GEFS cache state guards retained
- NOAA/NCEP official product pages were checked for GEFS 0.5-degree ensemble-mean file naming, forecast cadence, and NOMADS availability of HGT / UGRD / VGRD and the required pressure levels.

## Not claimed / production acceptance
- No live GEFS GRIB download was completed from this build container; production network behavior must be checked after deployment.
- No live Supabase read/write was executed here.
- The real 9/29 A-E distribution is not claimed until V1.6.92 cache is generated in production.
- GEFS ensemble mean is a fallback signal, not a substitute for deterministic GFS or JMA MSM and not a guarantee of mountain safety.
