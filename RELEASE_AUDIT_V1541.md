# RELEASE AUDIT V1.5.41

## Purpose

V1.5.40 で残っていた代表コース CT 8:00-9:59 の16区間を再監査し、長距離区間を確認済み通過ポイントで分割する。

## Result summary

- Representative CT 8:00-9:59: **16 -> 3**
- Resolved: **13 segments**
- Representative CT >=10:00: **0 -> 0**
- Mountain/hut candidate pairs >=10:00: **0 -> 0**
- New verified intermediate fixed route points: **4**
- Existing coordinate changes: **0**
- Deleted files: **0**

## CT audit

V1.5.40 baseline:

- mountains 300
- courses 380
- segments 921
- direct 780
- composed 12
- estimated 129
- missing 0
- flags 43
- conflicts 0
- reverseFlags 1

V1.5.41:

- mountains **300**
- courses **380**
- segments **941**
- direct **807**
- composed **12**
- estimated **122**
- missing **0**
- flags **42**
- conflicts **0**
- reverseFlags **1**

Course count 380 is preserved, including valid alternate routes such as オプタテシケ山・望岳台 and 安平路山・摺古木自然園入口.

## Remaining 8:00-9:59 representative segments

- カムイエクウチカウシ山: 札内川ヒュッテ駐車場 -> 山頂 9:20
- カムイエクウチカウシ山: 山頂 -> 札内川ヒュッテ駐車場 8:30
- 笊ヶ岳: 老平 -> 布引山（千挺木山） 8:55

No coordinate or CT was guessed to force these below 8 hours.

## Classic routes

`audit_classic_routes_v1518.js` output is byte-identical to V1.5.40:

- 9 routes
- 109 segments
- missing 0
- estimated 0
- derived 0

## Fixed trailhead coordinates

`audit_fixed_access.py` output is byte-identical to V1.5.40:

- Japan 300 fixed/resolved trailhead coverage: **300/300**
- missing fixed coordinates: **0**

## Syntax

- `node --check app.js`: PASS
- `node --check access-data.js`: PASS
- `python3 -m py_compile server.py`: PASS
- generated `__pycache__` removed before packaging

## Weather / progressive rendering

No weather-analysis, thunder-risk, nationwide A/B/C, model-fetch, or progressive-rendering logic was modified.

Symbol counts baseline/current:

- `function mergeAnalysisResults`: 1 / 1
- `progressiveStates`: 3 / 3
- `Promise.all`: 9 / 9

`app.js` diff hunks are limited to version, CT tables, route fixed points, representative-route definitions, and route-option handling.

## Visual verification

Render production / browser visual verification was **not performed** in this environment.
