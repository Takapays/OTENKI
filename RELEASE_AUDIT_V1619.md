# V1.6.19 Release Audit

Canonical baseline: V1.5.231 = V1.6.1. Previous: V1.6.18.

| Item | Canonical V1.6.1 | Previous V1.6.18 | V1.6.19 | Result |
|---|---:|---:|---:|---|
| Japan 300 mountains | 300 | 300 | 300 | PASS |
| Coordinate issues | 0 | 0 | 0 | PASS |
| Missing CT | 0 | 0 | 0 | PASS |
| Estimated CT | 1 | 1 | 1 | PASS |
| Representative routes | 415 | 416 | 416 | PASS (no decrease) |
| Existing fixed-point definitions | baseline protected | unchanged | unchanged | PASS |
| Existing CT definitions | baseline protected | unchanged | unchanged | PASS |
| Existing JS top-level functions removed | - | - | 0 | PASS |
| Existing server top-level functions removed | - | - | 0 | PASS |
| B color | - | legend `#4f8f3a` / display mismatch | display `#4f8f3a` | PASS |
| C color | - | legend `#b08a19` / display mismatch | display `#b08a19` | PASS |

V1.6.19 is a display-only color hotfix. `app.js`, `server.py`, and `data-audit.html` differ from V1.6.18 only by the version/cache identifier. The only functional UI change is two CSS overrides in `index.html`, forcing national B and C grade displays to the exact legend colors. No route/CT/fixed-point data file is included in this diff.

Validation: B/C legend-display color identity PASS; app.js syntax PASS; server.py compile PASS; existing top-level JS/server function deletion count 0.
