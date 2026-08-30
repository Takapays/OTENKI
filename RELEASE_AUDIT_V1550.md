# RELEASE AUDIT V1.5.50

## Baseline
- Sole baseline: `traten-v1.5.49-full.zip`
- Release: `V1.5.50`
- Focus: real `コースを自分で設計` CT gaps reported in くじゅう and 御嶽.

## Root cause
The previous mountain-area acceptance gate only checked edges explicitly declared in the area graphs. It did not test every point actually offered by the custom route builder.

A second runtime issue amplified the problem: the legacy CT composer intentionally isolated Yamareco plans from other verified public CT sources and ranked source authority before route length. As a result, connected verified sections could fail to compose, or a very long detour could be selected and then rejected as implausible.

Concrete baseline example: `長者原 -> 三俣山` had a verified 137-minute path through `砂防ダム -> 諏蛾守越`, but the old composer selected a 501-minute detour and the UI returned `CT情報なし`.

## V1.5.50 changes
### 1. New verified-only composition fallback
Added `shortestVerifiedCourseTimeInfo()`.
- Uses only already registered, publicly verified CT edges.
- May combine independently verified sources when exact endpoint names connect.
- Chooses the shortest known verified path, max 8 edges / under 24 hours.
- Never invokes coordinate/elevation CT estimation.
- Direct CT still wins first; the legacy composer is still tried before this fallback.
- Fallback route segments of 10 hours or more remain rejected.

### 2. Kuju selectable-point CT additions
Added public model-course endpoint CTs for the missing focus links:
- 牧ノ戸峠 -> 星生山: 154 min
- 星生山 -> 牧ノ戸峠: 102 min
- 星生山 -> 久住分かれ避難小屋: 60 min
- 久住分かれ避難小屋 -> 星生山: 38 min
- 久住山 -> 中岳(くじゅう): 61 min
- 中岳(くじゅう) -> 久住山: 45 min
- 諏蛾守越 -> 三俣山: 47 min
- 三俣山 -> 諏蛾守越: 72 min

The YAMAP public model-course pages checked on 2026-08-31 include the Makinoto/Hossho/Kuju/Nakadake route and the Sugamori/Mimata routes.

### 3. Ontake selectable-point CT additions
Added public route/model endpoint CTs for:
- 中の湯登山口（黒沢口） -> 女人堂: 148 min
- 女人堂 -> 中の湯登山口（黒沢口）: 84 min
- 女人堂 -> 石室山荘: 80 min
- 石室山荘 -> 女人堂: 45 min
- 二の池ヒュッテ -> 五の池小屋: 45 min
- 五の池小屋 -> 二の池ヒュッテ: 45 min

These are verified public route/standard-plan endpoint CTs. The Nakanoyu/Nyonindo direction values use a published Yamareco standard plan; Ninoike/Gonoike uses a published Kōjitsusansō route report. They are not coordinate/elevation estimates.

## New acceptance gate: custom-route selectable points
`node audit_custom_route_ct_v1550.js`

### Baseline V1.5.49 using the same audit
- Focus areas: 2
- UI-selectable focus points: 17
- Ordered point pairs tested: 132
- Resolved: 67
- Missing: 65
- Estimated: 0

Breakdown:
- くじゅう: 30 / 90 resolved, 60 missing
- 御嶽: 37 / 42 resolved, 5 missing

### V1.5.50
- Focus areas: 2
- UI-selectable focus points: 17
- Ordered point pairs tested: 132
- Resolved: **132 / 132**
- Direct: 37
- Verified composed: 95
- Missing: **0**
- Estimated: **0**
- Missing point definitions: **0**
- Example route assemblies: **5 / 5 PASS**

Breakdown:
- くじゅう: **90 / 90 resolved**, missing 0, estimated 0
- 御嶽: **42 / 42 resolved**, missing 0, estimated 0

Example route assemblies verified:
- 牧ノ戸峠 -> 星生山 -> 久住山 -> 中岳
- 長者原 -> 法華院温泉山荘 -> 三俣山
- 坊ガツル -> 大船山 -> 長者原
- 中の湯 -> 女人堂 -> 石室山荘 -> 剣ヶ峰 -> 二の池ヒュッテ -> 五の池小屋
- 田の原 -> 剣ヶ峰 -> 二の池ヒュッテ

## Existing CT/network regression audits
### Explicit mountain-area network
- areas: 36
- nodes: 264
- directed adjacent edges: 424
- verified direct: 424
- missing: 0
- estimated: 0
- composed-only: 0
- disconnected: 0

### Hyakumeizan + explicit network union
Direct-only network acceptance remains unchanged:
- route definitions: 140
- unique adjacent audit edges: 700
- verified direct: 700
- missing: 0
- estimated: 0
- composed-only: 0

### Legacy 300-mountain signal
- mountains: 300
- courses: 378
- segments: 972
- direct: 959
- composed: 13
- estimated: 0
- missing: 81
- CT conflicts: 0

The legacy 81 missing directions remain outside this Kuju/Ontake fix and are not estimated.

### Classic routes
- routes: 9
- segments: 109
- missing: 0
- estimated: 0
- derived: 0

## Source / code regression checks
- `node --check app.js`: PASS
- `node --check audit_custom_route_ct_v1550.js`: PASS
- `python3 -m py_compile server.py`: PASS
- Existing fixed `lat:` / `lon:` changed lines vs V1.5.49: **0**
- Weather / forecast / ECMWF / ICON / GFS / JMA / progressive-rendering changed lines: **0**
- `server.py`: version only
- `index.html`: version/cache-bust only
- CT direct-conflict audit: **0 conflicts**

## Scope honesty
V1.5.50 fixes the reported custom-route CT failure mechanism for the currently selectable Kuju and Ontake focus points and introduces a route-builder-specific acceptance test. It does **not** claim every selectable point in every mountain nationwide has now been audited. The same selectable-point audit approach should be expanded mountain-area by mountain-area.

## Acceptance
PASS for V1.5.50 scope.
