# RELEASE AUDIT V1.6.72

## Scope
Nationwide analysis safety alignment only.

## Changes
- Added JMA MSM 850/700/600 hPa wind to the existing nationwide JMA batch request.
- Added nationwide summit ridge-wind estimate mirroring route analysis: 850/700 interpolation by elevation, 0.95 peak exposure, surface wind floor.
- Nationwide JMA safety grade uses ridge wind for wind thresholds while retaining raw 10 m wind in diagnostics.
- Existing JMA worst-of rule remains one-way safety-side: JMA can worsen but never improve the MET Norway + GFS base grade.
- 600 hPa is diagnostic only and does not change the ridge formula.
- Visibility is still unavailable on the JMA nationwide path and is not synthesized.
- Updated nationwide tap-guide wording from meteoblue to JMA MSM.
- Bumped national engine key to force fresh V1.6.72 nationwide cache generation.

## Regression checks
- python -m py_compile server.py: PASS
- node --check app.js: PASS
- Existing route-analysis ridgeWindEstimate in app.js was not changed.
- Existing national MET Norway + GFS merge policy was not rewritten.
- Existing JMA worst-of direction was not changed.
