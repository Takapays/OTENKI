# RELEASE AUDIT V1.5.44

## Source provenance
- Source ZIP: `/mnt/data/traten-v1.5.43-full.zip`
- Fresh baseline: `/mnt/data/traten1544_base/traten1543`
- Work tree: `/mnt/data/traten1544_work/traten1543`

## Change
- Disabled `estimatedGeneratedCourseTimeInfo()` as a runtime fallback in `courseTimeInfo()`.
- Added 24 publicly checked directional CT entries in `V1544_ESTIMATE_REPLACEMENT_COURSE_TIMES`.
- V1.5.43 estimated 120 directions -> V1.5.44 estimated 0.
- 96 directions for which an exact endpoint/direction public standard CT was not uniquely confirmed are intentionally returned as CT unavailable; no regression/coordinate estimate is substituted.
- No coordinates changed.
- No weather, thunder-risk, nationwide A/B/C, or progressive-model merge logic changed.

## Actual audits
- `node --check app.js`: PASS
- `python3 -m py_compile server.py`: PASS
- All-CT baseline V1.5.43: 300 mountains / 380 courses / 972 segments / direct 842 / composed 10 / estimated 120 / missing 0 / conflicts 0 / reverseFlags 1.
- All-CT V1.5.44: 300 mountains / 380 courses / 972 segments / composed 10 / estimated 0 / missing 96 / conflicts 0 / reverseFlags 1.
  - Note: the audit script's `direct` counter also counts missing rows because it is defined as `!composed && !estimated`; current printed `direct=962` is therefore not the count of available direct CTs. Available non-composed rows are 866 (=962-96), exactly 24 more than baseline.
- Classic routes: 9 routes / 109 segments / missing 0 / estimated 0 / derived 0; byte-identical audit output to V1.5.43.
- Fixed trailhead coverage: 300/300; byte-identical audit output to V1.5.43.
- Progressive markers (`mergeAnalysisResults`, `progressiveStates`, `Promise.all`, `renderAll`) counts are identical to V1.5.43.
- No file deletions.

## Not verified
- Render production/browser visual check was not performed.
