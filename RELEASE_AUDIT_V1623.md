# V1.6.23 Release Audit

Canonical baseline: **V1.5.231 = V1.6.1**  
Previous release: **V1.6.22**

| Item | Canonical V1.6.1 | V1.6.22 | V1.6.23 | Result |
|---|---:|---:|---:|---|
| Mountains | 300 | 300 | 300 | PASS |
| Representative routes | 415 | 416 | 416 | PASS |
| Missing CT | 0 | 0 | 0 | PASS |
| Estimated CT | 1 | 1 | 1 | PASS |
| Coordinate issues | 0 | 0 | 0 | PASS |
| Existing baseline JS top-level functions removed | 0 | 0 | 0 | PASS |
| Existing baseline server top-level functions removed | 0 | 0 | 0 | PASS |
| Existing V1.6.22 JS top-level functions removed | - | - | 0 | PASS |
| Existing V1.6.22 server top-level functions removed | - | - | 0 | PASS |

## Intended changes

- Mobile hourly A-E display: 5 x 2 layout -> one row of 10 slots (06:00-15:00).
- Remove the explanatory text below the hourly A-E strip.
- Keep hourly thresholds, D/E floor behavior, daily national A-E aggregation, chart data, and colors unchanged.

## Regression isolation

- `app.js`: only app-version string plus removal of the requested hourly explanatory paragraph.
- `index.html`: only cache/version strings plus the mobile hourly-grid presentation rule.
- `server.py`: version string only after normalization.
- `data-audit.html`: version/cache strings only after normalization.
- Route/CT/fixed-point definitions were not touched.
- Instagram renderer/posting code was not touched.

## Verification

- `python3 -m py_compile server.py`: PASS (existing SyntaxWarning only)
- `node --check app.js`: PASS
- `tests/test_v1623_guard.py`: PASS
- Existing hourly-grade logic test: PASS
- Canonical V1.6.1 JS top-level functions missing in candidate: 0
- Canonical V1.6.1 server top-level functions missing in candidate: 0
- V1.6.22 JS top-level functions missing in candidate: 0
- V1.6.22 server top-level functions missing in candidate: 0

**Release decision: PASS / regression detected: 0**
