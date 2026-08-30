# TRATEN V1.5.53 Release Audit

## Scope
V1.5.52 full ZIP was used as the sole baseline. This release fixes the South Yatsugatake CT gaps reported from the actual custom-route UI and adds a global safety guard against implausible verified-edge graph detours.

## South Yatsugatake direct CT fixes
Verified custom-route checks: **8/8 PASS**.

- 美濃戸口 -> 赤岳鉱泉: 187 min
- 赤岳鉱泉 -> 美濃戸口: 87 min
- 美濃戸口 -> 行者小屋: 223 min
- 行者小屋 -> 美濃戸口: 187 min
- 美濃戸 -> 赤岳鉱泉: 135 min
- 赤岳鉱泉 -> 美濃戸: 45 min
- 美濃戸 -> 行者小屋: 171 min
- 行者小屋 -> 美濃戸: 145 min

These are direct verified/verified-subtotal CTs, not estimated CTs.

## Same-class defects outside Yatsugatake
The new route-integrity scan evaluates the regional candidate sets used by the custom-route UI and compares composed verified paths with endpoint geography.

- unique candidate sets scanned: **22**
- raw implausible composed paths detected: **32**
- implausible paths leaked through `courseTimeInfo()` to the UI: **0**

Examples that V1.5.52 could incorrectly expose and V1.5.53 now refuses unless a sensible verified path exists include local endpoints connected through a remote mountain/trailhead loop.

Two additional real local gaps found during this review were repaired with public CT evidence:
- 空木平避難小屋 -> 空木駒峰ヒュッテ: 44 min
- 焼岳小屋 -> 焼岳: 59 min
- 焼岳 -> 焼岳小屋: 160 min

When a direct/sensible verified CT is still unavailable, V1.5.53 returns CT情報なし rather than showing an absurd detour time. No estimated CT fallback was re-enabled.

## Regression
- JavaScript syntax: PASS (`node --check app.js`)
- Python syntax: PASS (`python -m py_compile server.py`)
- explicit area networks: 36 areas / 264 nodes / 424 directed adjacent edges / verifiedDirect 424 / missing 0 / estimated 0 / composedOnly 0 / disconnected 0
- Hyakumeizan + explicit area network audit: 700 unique adjacent edges / verifiedDirect 700 / missing 0 / estimated 0 / composedOnly 0
- classic routes: 9 routes / 109 segments / missing 0 / estimated 0 / derived 0
- legacy 300-mountain audit: 974 segments / direct 958 / composed 16 / estimated 0 / missing 80 / conflicts 0
- route-integrity targeted checks: 11/11 PASS
- route-integrity implausible UI leaks: 0

## Unresolved
The legacy 300-mountain audit still contains 80 missing CT segments outside this release scope. They were not filled with guesses. This release must not be described as nationwide CT-missing = 0.

## Change isolation
Existing fixed point coordinates were not edited. Weather model selection, nationwide weather analysis, progressive rendering, water, camera, access, and hut features were not changed.
