# V1.5.51 release audit

## Scope
- Sole baseline: `traten-v1.5.50-full.zip`.
- Priority repair: 御嶽 and 八ヶ岳（赤岳） custom-route CT behavior.
- Acceptance is based on the actual points offered by `コースを自分で設計`, not only predeclared area graphs.
- No coordinate/elevation CT estimation is enabled.

## Custom-route acceptance
`node audit_custom_route_ct_v1551.js`

- Areas: 2
- UI-selectable focus points: 23
- Ordered point pairs: 282
- Resolved: 282
- Direct: 53
- Composed from verified public CT: 229
- Estimated: 0
- Missing: 0
- Long (>10 h) verified composed pairs: 12
- Example routes: 5/5 PASS

### 御嶽
- Points: 7
- Ordered pairs: 42
- Resolved: 42
- Missing: 0
- Estimated: 0

### 八ヶ岳（赤岳）
- Points: 16
- Ordered pairs: 240
- Resolved: 240
- Missing: 0
- Estimated: 0

V1.5.51 connects the previously isolated southern Yatsugatake route-builder clusters through verified public CTs: 美濃戸口/美濃戸, 富士見高原/編笠, 観音平/編笠, 編笠/青年小屋, 青年小屋/権現岳, 権現小屋/権現岳, and 権現岳/赤岳.

For these two audited custom-route groups only, a verified composed path may exceed 10 hours. This prevents a long but fully verified traverse from being mislabeled `CT情報なし`. The 24-hour/8-edge graph bounds remain, and no estimated edge is used.

## Regression
- Area network: 36 areas / 424 directed adjacent edges / 424 direct verified / missing 0 / estimated 0 / disconnected 0.
- Hyakumeizan union: 700/700 direct verified / missing 0 / estimated 0.
- Classic routes: 9 routes / 109 segments / missing 0 / estimated 0 / derived 0.
- Legacy 300: 300 mountains / 378 courses / 972 segments / direct 959 / composed 13 / estimated 0 / missing 81 / conflicts 0.

## Syntax
- `node --check app.js`: PASS
- `node --check audit_custom_route_ct_v1551.js`: PASS
- `python3 -m py_compile server.py`: PASS
