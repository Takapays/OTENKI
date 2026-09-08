# V1.6.20 Release Audit

Canonical baseline: V1.5.231 = V1.6.1  
Previous release: V1.6.19

| Item | Canonical V1.6.1 | V1.6.19 | V1.6.20 | Result |
|---|---:|---:|---:|---|
| Mountains | 300 | 300 | 300 | PASS |
| Coordinate issues | 0 | 0 | 0 | PASS |
| Missing CT | 0 | 0 | 0 | PASS |
| Estimated CT | 1 | 1 | 1 | PASS |
| Representative routes | 415 | 416 | 416 | PASS (increase retained) |
| Existing representative routes | baseline | retained | retained | PASS |
| Fixed points | baseline | retained | unchanged | PASS |
| Existing CT | baseline | retained | unchanged | PASS |
| Existing top-level JS functions removed | - | - | 0 | PASS |
| Existing top-level server functions removed | - | - | 0 | PASS |

## Scope check

V1.6.20 changes only national-outlook presentation and version/cache identifiers. No route/CT/fixed-point data file is included in the diff. `server.py` and `data-audit.html` are byte-identical to V1.6.19 after normalizing the version string. `app.js` changes only the mountain-detail DOM ordering/wrapper plus the version string. A-E logic, weather integration, Instagram rendering, and data catalogs are unchanged.

## UI checks

- Mobile map overlay legend hidden.
- Mobile legend rendered as a sibling immediately below the map.
- Mobile grade circles: 14px; legend text: 7px.
- Desktop mountain hero appears before the graph and remains outside the scroll body.
- Desktop graph is the first content in the scrollable body below the hero.
- B/C colors remain identical to the legend.
- `node --check app.js`: PASS.
- `python -m py_compile server.py`: PASS (pre-existing SyntaxWarning only).
- `tests/test_v1620_guard.py`: PASS.

Release decision: PASS / releasable.
