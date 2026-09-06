# Traten V1.5.224

## CT audit cleanup batch

- Data-audit threshold `通過ポイント少なめ` remains the V1.5.222 rule: **3 points or fewer**.
- Prioritize reducing `CT情報なし`, then replace estimated CT with public directional CT.
- Current audit after this batch:
  - mountains: 300
  - coordinate issues: 0
  - CT情報なし: **14** (V1.5.223 baseline 35)
  - 推定CT: **22** (V1.5.223 baseline 33)
  - derived/apportioned CT: 0
  - sparse waypoints: 196
  - representative routes audited: 373

## CT additions / replacements

Public or official endpoint-matched directional times were added for multiple routes including 乳頭山, 経ヶ岳（福井）, 黒法師岳, 大無間山, 焼山（金山登山口）, 斑尾山, 芦別岳, 会津朝日岳, 大滝根山, 南駒ヶ岳, 三頭山, 東赤石山, 涌蓋山, 七ヶ岳 and others.

## Route integrity cleanup

Representative summit routes that are currently prohibited/closed or whose declared endpoint is not a normal public hiking route are not exposed as valid representative routes. This avoids reducing CT-missing counts by inventing times for unusable routes.

## Audit policy

- No coordinate/elevation-derived CT was introduced.
- No proportional/apportioned CT was introduced.
- Directional CT is only promoted from estimate/missing when a public route source supports the relevant endpoint and direction.
