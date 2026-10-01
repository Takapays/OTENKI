# Traten V1.6.101 Release Audit

## Baseline
- Exact baseline: V1.6.100.

## Requested changes
1. Removed the A/B-only automatic page-open re-fetch introduced in V1.6.100. Normal page/date open returns the shared cache only.
2. Kept explicit `最新情報取り込み` as a true forced full refresh.
3. Kept tapped-mountain live detail authoritative and shared-cache write-back behavior.
4. Changed only the wind threshold used to accumulate daily C from 5 m/s to 7 m/s.
   - B caution: wind >=5 m/s remains unchanged.
   - C accumulation: wind >=7 m/s for 2+ qualifying hours.
   - C accumulation gust >=12 m/s and rain >=0.5 mm/h remain unchanged.
   - Strong: wind >=9 / gust >=18 / rain >=1.5 remains unchanged.
   - Extreme: wind >=15 / gust >=25 / rain >=6 remains unchanged.
5. Updated the user-facing ABCDE criteria text.

## Cache identity
Because this changes grade semantics, the national engine is bumped to:
`metno-gfs-jma-ridge-gust-worstof-v19-cumulative-wind7`

This prevents V1.6.100 and older derived grades from being reused as V1.6.101 grades.

## Verification
- JS syntax check.
- Python compile.
- Static regression guards for no A/B auto re-fetch, full manual refresh, tapped-detail authority, cache-age display, and engine/version synchronization.
- Rule tests for B at wind 5-6.9 m/s and C accumulation at wind >=7 m/s.
