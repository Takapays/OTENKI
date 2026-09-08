# V1.6.13 release / regression audit

Canonical baseline: **V1.5.231 = V1.6.1**
Previous release: **V1.6.12**
Candidate: **V1.6.13**

| Audit item | V1.6.1 baseline | V1.6.12 | V1.6.13 | Result |
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
| Instagram A-E | existing | existing | byte-identical | PASS |

## Requested-change validation
- PC empty/detail hint changed to `山をタップでグラフ表示📊`.
- Mobile map hint changed to `山をタップでグラフ表示📊`.
- Desktop model graph slot remains before the mountain hero.
- Mobile model graph slot is immediately after the mountain hero/name banner.
- One detail API fetch hydrates both responsive slots; CSS displays only the relevant slot.
- Mobile map legend reduced from 22px circles / 10-11px text to 18px circles / 9px primary text with tighter padding/gaps.
- Instagram bot file is byte-identical to V1.6.12.
- Server differs from V1.6.12 only by APP_VERSION.
- `python tests/test_v1613_guard.py`: 38 PASS.
- `node --check app.js`: PASS.
- `python -m py_compile server.py instagram_bot.py`: PASS (existing inherited regex SyntaxWarning only).

**Release decision: PASS — no regression detected; requested scope only.**
