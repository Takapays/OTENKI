# Release Audit V1.5.64

## Scope
- Rebalanced route point A-E logic to reduce overly optimistic A grades.
- Tightened nationwide A/B/C logic and bumped national cache engine to avoid reusing old grades.
- Added multi-model adverse-side guards.
- Expanded Guide with rating logic and Open-Meteo congestion/fallback behavior.
- Distribution policy: changed-files ZIP only from V1.5.63 onward.

## Route point decision changes
- A guard: average wind >=5 m/s, gust >=12 m/s, precipitation >=0.1 mm/h, visibility <5 km, thunder above LOW, or adverse-model signal prevents A.
- Wind scoring now begins at 5 m/s / gust 12 m/s.
- Visibility scoring now begins below 5 km and becomes progressively stricter below 3 km / 1 km / 500 m.
- Three or more mild factors among wind, rain, low visibility, low apparent temperature, and heavy cloud add a compound-risk point.
- All available models are checked for adverse scenarios. Multiple adverse models or a strong adverse model can cap optimistic grades.

## Nationwide decision changes
- A requires zero caution hours from 06:00-15:00.
- Any caution hour -> at least B.
- Any extreme hour or 2+ severe hours -> C.
- Caution thresholds include average wind 5 m/s, gust 12 m/s, precipitation 0.1 mm/h, and where available visibility <5 km / CAPE >=500.
- National cache engine changed to `metno-gfs-v3-conservative` so old cached grades are not reused.

## Guide changes
- Added "トラテンの判定ロジック" section.
- Added explicit A-grade guard explanation.
- Added compound-risk and adverse-model explanation.
- Added Open-Meteo HTTP 429 behavior: only points with zero normal-model rows fall back to MET Norway + NOAA GFS direct retrieval; fallback-only results are low confidence.

## Verification
- `node --check app.js`: PASS
- `python -m py_compile server.py`: PASS
- Version consistency: PASS / 1.5.64
- Route grade synthetic tests: PASS
- Nationwide grade synthetic tests: PASS
- Guide logic/static checks: PASS
- Nationwide custom-route displayed pairs: 11,560 / missing 0 / estimated 0
- Explicit area network: 424/424 / missing 0 / estimated 0
- Hyakumeizan union network: 700/700 / missing 0 / estimated 0

## Important limitation
This release does not attempt to reproduce or reverse-engineer the proprietary rating of another weather service. The goal is to prevent Traten from showing A when credible mountain-weather caution factors or adverse model scenarios are present. Exact 9/5-9/6 Alps agreement with third-party grades was not asserted as a test result.
