# V1.6.17 Release Audit

Canonical baseline: V1.5.231 = V1.6.1. Previous: V1.6.16.

| Item | Canonical V1.6.1 | Previous V1.6.16 | V1.6.17 | Result |
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
| Static Instagram carousel | - | 2 pages | 2 pages | PASS |
| Reel scene 2 | - | fixed Yarigatake screenshot | live date-specific Yarigatake | PASS |

V1.6.17 changes only Instagram Reel rendering/data-loading plus version identifiers. app.js, index.html and data-audit.html are version-only changes. No route/CT/fixed-point data files are included in this diff.

Validation: Python compile PASS; app.js syntax PASS; V1.6.17 guard PASS; synthetic 864x1536 scene render PASS. Live production weather APIs and Instagram publish were not invoked in the build container.
