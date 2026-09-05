# RELEASE AUDIT V1.5.113

## Regression hotfix
- V1.5.112 regression cause confirmed: resolved fixed route point IDs were not guaranteed to exist in the live `candidates` list used by `candidateOptions()` / `addPointRow()`.
- Fix inserted before `$('points').innerHTML=''`: every resolved route point is mapped to an existing same-id/equivalent candidate or injected into `candidates`.
- This preserves the V1.5.112 ability to resolve 小仙丈ヶ岳 from the fixed catalog without producing blank route rows.

## Preserved fixes
- 仙丈ヶ岳 representative-route fixed-point resolution.
- 赤岳鉱泉 corrected coordinate.
- 甲斐駒ヶ岳 / 赤岳 representative-course enrichments.
- V1.5.111 nationwide 300-mountain warm-cache logic.

## Static verification
- `node --check app.js`: PASS
- `python3 -m py_compile server.py`: PASS
- APP_VERSION / index cache busters: 1.5.113
- No CT, weather scoring, national cache algorithm, or new coordinate values changed in this hotfix.
