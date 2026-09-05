# V1.5.109 Release Audit

## Representative-route KPI
- Representative courses: 379
- Strict 3-point trailhead/summit/trailhead routes: **250 -> 243**
- Reduced in this release: **7**

## V1.5.109 target audit
- 一切経山: PASS
- 磐梯山: PASS
- 蔵王山（熊野岳）: PASS
- 巻機山: PASS
- 越百山: PASS
- 米山: PASS
- 山上ヶ岳: PASS
- Missing fixed point: 0
- Missing adjacent CT: 0
- Estimated CT in target routes: 0

## Static checks
- `node --check app.js`: PASS
- `node --check representative-route-enrichment-v15109.js`: PASS
- `python3 -m py_compile server.py`: PASS
- `node audit_v15109.js`: 379 courses / 243 strict 3-point / bad 0
