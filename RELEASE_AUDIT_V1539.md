# RELEASE AUDIT V1.5.39

## Scope
- Base: V1.5.38 full source
- Target: V1.5.39
- Purpose: hut CT correction and systemic audit, especially Japan 100 Famous Mountains and peak/hut pairs.

## Direct CT corrections
- 朝日岳（新潟・富山） → 朝日小屋: 0:50 (朝日小屋公式)
- 朝日小屋 → 朝日岳（新潟・富山）: 1:00 (朝日小屋公式)
- 女人堂 → 御嶽山（剣ヶ峰）: 2:30 (長野県山小屋情報ポータル)
- 御嶽山（剣ヶ峰） → 女人堂: 1:30 (公開登山ガイド)
- 石室山荘 → 御嶽山（剣ヶ峰）: 0:40 (公開登山ガイド)
- 御嶽山（剣ヶ峰） → 石室山荘: 0:45 (複数公開山行記録照合)
- 二の池ヒュッテ ↔ 御嶽山（剣ヶ峰）: 0:15 / 0:15 (長野県山小屋情報ポータル)
- 五の池小屋 → 御嶽山（剣ヶ峰）: 2:00 (公開登山ガイド)
- 御嶽山（剣ヶ峰） → 五の池小屋: 1:30 (公開登山ガイド)
- 田の原登山口 → 二の池ヒュッテ: 3:40 (二の池ヒュッテ公式)
- 笠ヶ岳山荘 → 笠ヶ岳（岐阜）: 0:20 (飛騨高山旅ガイド)
- 笠ヶ岳（岐阜） → 笠ヶ岳山荘: 0:15 (公開コース案内)

## Systemic hut CT audit
`audit_hut_ct_v1539.js` was executed against the actual V1.5.39 source.

Result:
- Japan 300 mountains scanned: 300
- Same-mountain peak/trailhead ↔ hut direction pairs scanned: 850
- Japan 100 Famous Mountains direction pairs without a verified CT: 326
- Implausible short-distance graph detours blocked by the new guard: 9
- Representative course segments >= 10:00: 10
- Selectable mountain/hut-related pairs >= 10:00: 29

No unverified value was auto-filled for the remaining missing pairs.

## Detour safety guard
When there is no direct CT, graph composition is rejected if it creates an obviously implausible local detour:
- distance <= 0.15 km and CT > 60 min, or
- distance <= 3 km, composed path >= 4 edges, and CT > 300 min.

This prevents examples such as:
- 冷池山荘 → 鹿島槍ヶ岳: old composed 23:12 at 2.42 km
- 前常念岳 ↔ 常念小屋: old composed about 12 h at 1.16 km
- 西岳 ↔ 槍沢ロッヂ: old composed about 17 h at 2.14 km
from being displayed as valid CTs.

## >=10:00 review list
Generated:
- `CT_10H_PLUS_V1539.md`
- `CT_10H_PLUS_V1539.csv`

The list intentionally includes both plausible long approaches and suspicious composed values so they can be reviewed separately instead of silently corrected.

## Regression audits
### JavaScript / Python syntax
- `node --check app.js`: PASS
- `node --check audit_hut_ct_v1539.js`: PASS
- `python3 -m py_compile server.py`: PASS
- generated `__pycache__` removed before packaging

### Representative CT audit
V1.5.38 baseline vs V1.5.39 stdout: EXACTLY IDENTICAL
- mountains: 300
- courses: 380
- segments: 901
- direct: 757
- composed: 12
- estimated: 132
- missing: 0
- flags: 47
- conflicts: 0
- reverseFlags: 1

### Classic routes
V1.5.38 baseline vs V1.5.39 stdout: EXACTLY IDENTICAL
- routes: 9
- segments: 109
- missing: 0
- estimated: 0
- derived: 0

### Fixed coordinates
V1.5.38 baseline vs V1.5.39 stdout: EXACTLY IDENTICAL
- fixed/resolved trailhead coverage: 300/300
- missing fixed coordinates: none
- no latitude/longitude changes were made in V1.5.39

### Weather / progressive rendering
No weather-model acquisition, merge, analysis, thunder-risk, national A/B/C, or progressive-rendering code was intentionally changed in V1.5.39. The functional changes are limited to CT correction data, CT composition safety handling, audit tooling, version/cache markers, and documentation.

## Production status
- Source-level and packaged-artifact audits completed.
- Render production was not redeployed or visually verified in this audit.
