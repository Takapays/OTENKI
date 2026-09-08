# V1.6.18 Release Audit

Canonical baseline: V1.5.231 = V1.6.1. Previous: V1.6.17.

| Item | Canonical V1.6.1 | Previous V1.6.17 | V1.6.18 | Result |
|---|---:|---:|---:|---|
| Mountains | 300 | 300 | 300 | PASS |
| Coordinate issues | 0 | 0 | 0 | PASS |
| Missing CT | 0 | 0 | 0 | PASS |
| Estimated CT | 1 | 1 | 1 | PASS |
| Representative routes | 415 | 416 | 416 | PASS |
| Fixed points | preserved | preserved | unchanged | PASS |
| CT definitions | preserved | preserved | unchanged | PASS |
| National A-E logic | baseline | unchanged | unchanged | PASS |
| MET/GFS merge | baseline | unchanged | unchanged | PASS |
| Mountain model charts | - | detailed UI | simplified / enlarged | PASS |
| Reel scene-1 analysis/counts | - | 300 rows | 300 rows | PASS |
| Reel scene-1 Alps markers | - | all plotted | ~50% display-only | PASS |
| Reel scene-2 | - | live Yarigatake | unchanged | PASS |

V1.6.18 changes only the nationwide mountain model-chart presentation and Reel scene-1 marker density around the Japanese Alps, plus version identifiers/cache revision. The marker thinning occurs only immediately before scene-1 rendering; source nationwide rows and A-E counts remain unchanged. No route/CT/fixed-point data file is included in the diff.

Validation: Python compile PASS; app.js syntax PASS; V1.6.18 guard PASS. Live production weather APIs and Instagram publish were not invoked in the build container.
