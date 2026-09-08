# V1.6.22 Release Audit

Canonical baseline: **V1.5.231 = V1.6.1**  
Previous release: **V1.6.21**

| Item | Canonical V1.6.1 | V1.6.21 | V1.6.22 | Result |
|---|---:|---:|---:|---|
| Mountains | 300 | 300 | 300 | PASS |
| Representative routes | 415 | 416 | 416 | PASS |
| Missing CT | 0 | 0 | 0 | PASS |
| Estimated CT | 1 | 1 | 1 | PASS |
| Coordinate issues | 0 | 0 | 0 | PASS |
| Existing baseline JS top-level functions removed | 0 | 0 | 0 | PASS |
| Existing baseline server top-level functions removed | 0 | 0 | 0 | PASS |
| Existing V1.6.21 JS top-level functions removed | - | - | 0 | PASS |
| Existing V1.6.21 server top-level functions removed | - | - | 0 | PASS |

## Intended changes

- Delete the two user-requested explanatory UI blocks.
- Add hourly 06:00-15:00 A-E marks above the three national-detail graphs.
- Add hourly-only A-E thresholds while preserving the existing daily A-E aggregation.
- Keep D/E safety behavior at each hour: if either model is D/E, the hour cannot be averaged below D/E.

## Regression isolation

- `server.py` normalized diff versus V1.6.21: version string only.
- `data-audit.html` normalized diff versus V1.6.21: version string only.
- `app.js` changes are confined to the two requested UI removals/guard and the hourly-grade rendering helpers/criteria text.
- `index.html` changes are confined to the two requested UI removals, hourly-grade styles, and cache/version strings.
- Route/CT/fixed-point definitions were not touched.
- Instagram renderer/posting code was not touched.

## Verification

- `python3 -m py_compile server.py`: PASS
- `node --check app.js`: PASS
- `tests/test_v1622_guard.py`: PASS
- `tests/test_v1622_hourly_grade.js`: PASS
- Canonical V1.6.1 JS top-level functions missing in candidate: 0
- Canonical V1.6.1 server top-level functions missing in candidate: 0
- V1.6.21 JS top-level functions missing in candidate: 0
- V1.6.21 server top-level functions missing in candidate: 0

**Release decision: PASS / regression detected: 0**
