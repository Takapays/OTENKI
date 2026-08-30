# RELEASE AUDIT V1.5.49

## Baseline
- Sole baseline: `traten-v1.5.48-full.zip`
- Release: `V1.5.49`

## Scope
This release changes presentation/copy only:
- TOP value proposition for 3-second comprehension.
- Two primary entry paths: nationwide map discovery / personalized route-time forecast.
- Nationwide analysis wording and CTA.
- User guide rewritten around the two use cases and a four-step personalized forecast flow.
- Stale guide wording about estimated CT removed; unverified CT is described as `CT情報なし`.

## No-change areas
- Weather analysis logic: unchanged.
- Progressive rendering logic: unchanged.
- CT data/tables: unchanged.
- Fixed coordinates: unchanged.
- Route/network definitions: unchanged.

## Actual regression checks
- `node --check app.js`: PASS
- `python3 -m py_compile server.py`: PASS
- `index.html` HTML parser: PASS
- `guide.html` HTML parser: PASS
- V1.5.48 -> V1.5.49 `app.js` diff: APP_VERSION only.
- V1.5.48 -> V1.5.49 `server.py` diff: APP_VERSION only.
- Fixed-coordinate-related changed lines in `app.js`: 0
- Weather/forecast/ECMWF/ICON/GFS/JMA/progressive-related changed lines in `app.js`: 0

## CT / route audits rerun
### Explicit mountain-area network
- areas: 36
- nodes: 264
- directed adjacent edges: 424
- verified direct: 424
- missing: 0
- estimated: 0
- composed-only: 0
- disconnected areas: 0

### Hyakumeizan + explicit network union
- mountains: 100
- route definitions: 140
- unique adjacent audit edges: 700
- verified direct: 700
- missing: 0
- estimated: 0
- composed-only: 0

### Legacy 300-mountain audit
- mountains: 300
- courses: 376
- segments: 963
- direct: 952
- composed: 11
- estimated: 0
- missing: 81
- conflicts: 0
- reverse flags: 1

### Classic routes
- routes: 9
- segments: 109
- missing: 0
- estimated: 0
- derived: 0

## UX changes
### TOP
Primary statement:
- `全国の登山日和を地図で見る。`
- `自分専用の登山天気予報をつくる。`

Primary entry actions:
1. `全国から登山日和を探す` -> nationwide map
2. `自分専用予報をつくる` -> route planner

Personalized forecast flow shown directly on TOP:
`山を選ぶ -> ルート・出発時刻 -> 通過時刻ごとの天気`

### Guide
The beginning of the guide now explains the two user intents before detailed feature documentation:
- destination undecided -> use nationwide analysis
- destination decided -> create a personalized forecast

The personalized flow is described as:
`山を選ぶ -> ルートを決める -> 出発時刻を入れる -> 自分専用予報を見る`

## Acceptance
PASS for the requested V1.5.49 scope.
