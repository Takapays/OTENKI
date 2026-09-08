# V1.6.21 Release Audit

Canonical baseline: **V1.5.231 = V1.6.1**  
Previous release: **V1.6.20**

| Item | Canonical V1.6.1 | V1.6.20 | V1.6.21 | Result |
|---|---:|---:|---:|---|
| Mountains | 300 | 300 | 300 | PASS |
| Representative routes | 415 | 416 | 416 | PASS |
| Missing CT | 0 | 0 | 0 | PASS |
| Estimated CT | 1 | 1 | 1 | PASS |
| Coordinate issues | 0 | 0 | 0 | PASS |
| Existing JS top-level functions removed | - | - | 0 | PASS |
| Existing server top-level functions removed | - | - | 0 | PASS |

## Intended changes only

- National mountain-detail chart Y-axis values: larger, bolder, darker.
- National mountain-detail chart X-axis hour labels: larger, bolder, darker.
- SVG plot margins expanded to prevent clipping after font enlargement.

No national A-E decision logic, weather-model integration, Instagram renderer, route data, CT data, or fixed-point data was changed.

## Verification

- `python3 -m py_compile server.py`: PASS
- `node --check app.js`: PASS
- `tests/test_v1621_guard.py`: PASS
- Normalized `server.py` vs V1.6.20: version string only
- Normalized `data-audit.html` vs V1.6.20: version string only
- App normalized diff is confined to chart SVG dimensions/margins and axis classes.
- Index normalized diff is confined to axis-label styling.

**Release decision: PASS / regression detected: 0**
