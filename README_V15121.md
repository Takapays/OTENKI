# OTENKI V1.5.121

## Purpose
Desktop browser was still serving an old cached `app.js` because `index.html` kept `app.js?v=1.5.113` and the visible version badge stayed hard-coded at V1.5.118.

## Fix
- `index.html` included in the diff again.
- `app.js` cache-buster changed to `?v=1.5.121`.
- CSS/route enrichment asset cache-busters in `index.html` also moved to `1.5.121`.
- Desktop and mobile visible version labels changed to V1.5.121.
- `app.js` now synchronizes visible version badges from `APP_VERSION` after load.
- V1.5.120 traverse candidate preservation remains in `app.js`.

## Expected result
Desktop and smartphone execute the same V1.5.121 candidate logic. Red岳 corridor candidates such as 横岳（八ヶ岳）, 阿弥陀岳, 赤岳天望荘, 硫黄岳山荘 and the South Alps corridor candidate 甲斐駒ヶ岳 remain selectable where their fixed coordinates are available.
