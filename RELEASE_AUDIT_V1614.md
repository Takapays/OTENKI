# V1.6.14 release / regression audit

Canonical baseline: **V1.5.231 = V1.6.1**
Previous release: **V1.6.13**
Candidate: **V1.6.14**

| Audit item | V1.6.1 baseline | V1.6.13 | V1.6.14 | Result |
|---|---:|---:|---:|---|
| Japan 300 mountains | 300 | 300 | 300 | PASS |
| Coordinate issues | 0 | 0 | 0 | PASS |
| Missing CT | 0 | 0 | 0 | PASS |
| Estimated CT | 1 | 1 | 1 | PASS |
| Representative routes | 415 | 416 | 416 | PASS |
| Existing fixed points | protected | unchanged | unchanged | PASS |
| Existing CT definitions | protected | unchanged | unchanged | PASS |
| Existing representative-route definitions | protected | unchanged | unchanged | PASS |
| Existing JS function declarations | protected | 421 | 421 / deletion 0 | PASS |
| Existing server top-level functions | protected | 149 | 149 / deletion 0 | PASS |
| National A-E logic | existing | existing | unchanged | PASS |
| MET/GFS same-hour mean + D/E floor | existing | existing | unchanged | PASS |
| Instagram A-E | existing | existing | byte-identical | PASS |

## Requested-change validation
- Wind chart fixed vertical range: `0–7 m/s`.
- Gust chart fixed vertical range: `0–15 m/s`.
- Precipitation chart fixed vertical range: `0–7 mm/h`.
- Wind and gust retain MET Norway / NOAA GFS / center-value line comparison.
- Precipitation renders two side-by-side bars per available hour (MET Norway and NOAA GFS), with no third center-value bar.
- Synthetic 10-hour test produced exactly 20 precipitation bars.
- Values above a fixed ceiling are not silently hidden: plotted at the ceiling and marked `↑`; raw values and A-E grading inputs are not modified.
- National grading/merge helpers execute with A/D/E regression cases unchanged.
- Server differs from V1.6.13 only by `APP_VERSION`.
- Instagram bot is byte-identical to V1.6.13.
- `python tests/test_v1614_guard.py`: 35 PASS.
- `node --check app.js`: PASS.
- `python -m py_compile server.py instagram_bot.py`: PASS (existing inherited regex SyntaxWarning only).

**Release decision: PASS — no regression detected; requested graph scope only.**
