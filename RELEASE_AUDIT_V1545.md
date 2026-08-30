# V1.5.45 release audit

## Baseline

- Sole source baseline: uploaded `traten-v1.5.44-full.zip`.
- Version: `1.5.44` -> `1.5.45`.
- No weather-analysis logic, progressive-rendering implementation, or existing fixed-coordinate record was edited.
- Coordinate/elevation regression CT fallback remains disabled.

## Hyakumeizan network audit

V1.5.45 unions every currently declared route option for the 100 Famous Mountains into a directed trail network. Existing route enrichments are applied first; any remaining composed edge is expanded to its verified underlying direct CT edges before the network pass. Kuju additionally has an explicit branch network beyond the representative-route catalog.

Actual result (`HYAKUMEIZAN_NETWORK_CT_AUDIT_V1545.json`):

- Mountains: 100
- Route definitions: 140
- Route endpoint edges before minimal expansion: 435
- Unique adjacent audit edges after expansion: 419
- Verified direct CT: 419
- Composed-only: 0
- Estimated: 0
- Missing: 0
- Explicit area networks: 1 (Kuju)
- Route-definition exclusions: 4

Important scope statement: this is a complete audit of the major trail network currently declared by the application for the Hyakumeizan, plus the new explicit Kuju branch graph. It does **not** claim that every minor/unregistered real-world trail in Japan has been cataloged. Unknown routes are not silently treated as audited.

## Kuju explicit area graph

Nodes: 長者原 / 雨ヶ池越 / 坊ガツル / 法華院温泉山荘 / 砂防ダム / 諏蛾守越 / 久住分かれ避難小屋 / 久住山 / 段原 / 大船山.

Actual result (`AREA_NETWORK_CT_AUDIT_V1545.json`):

- Areas: 1
- Nodes: 10
- Directed adjacent edges: 20
- Verified direct: 20
- Composed-only: 0
- Estimated: 0
- Missing: 0

## CT additions / route-definition corrections

Publicly checked CTs added for the remaining Hyakumeizan network gaps include:

- 羅臼岳 -> 羅臼温泉登山口: 270 min (official Shiretoko Rausu Visitor Center, down 4.5 h).
- トムラウシ温泉登山口 <-> トムラウシ山: 385 / 302 min (published Yamareco standard-route checkpoint totals).
- 大朝日岳 -> 日暮沢: 340 min (published Higure-sawa circuit standard times).
- 飯豊山 -> 大日杉登山口: 425 min (published Dainichisugi route standard times).
- 大網登山口 <-> 雨飾山: 175 / 130 min (published route guide).
- 聖岳 -> 椹島: 360 min (published Hyakumeizan course data).
- Kuju legacy long-route compatibility CTs are sums of the new verified adjacent network edges and are marked `composed-verified`, never estimated.

No CT was created for these invalid generated endpoint pairs:

1. 燧ヶ岳 / 小沢平登山口: not treated as a current major direct summit route; old/side trail context must not be auto-connected.
2. 燧ヶ岳 / 山ノ鼻（至仏山東面登山道入口）: cross-area catalog mismatch; removed from automatic route generation.
3. 草津白根山 / 白根火山・湯釜側起点: current volcanic restriction makes the generated summit endpoint inappropriate; no CT fabricated.
4. 浅間山 / 高峰高原・車坂峠 -> true crater summit: current permitted destination is 前掛山, not the crater summit; no CT fabricated.

## Nationwide legacy audit

The older 300-mountain representative-course audit is retained as a broader regression/gap signal, not as the new Hyakumeizan network acceptance test.

V1.5.45 result:

- Mountains: 300
- Courses: 377
- Segments: 967
- Direct: 955
- Composed: 12
- Estimated: 0
- Missing: 81
- CT conflicts: 0

The remaining 81 are outside the completed Hyakumeizan source-declared network acceptance scope. They remain CT unavailable rather than estimated.

## Regression checks

- `node --check app.js`: PASS
- `node --check audit_area_network_v1545.js`: PASS
- `node --check audit_hyakumeizan_network_v1545.js`: PASS
- `python3 -m py_compile server.py`: PASS
- Hyakumeizan network audit: PASS (419/419 direct, missing 0, estimated 0, composed-only 0)
- Kuju explicit network audit: PASS (20/20 direct, missing 0, estimated 0, composed-only 0)
- Existing 300-mountain audit: executed successfully; estimated 0; CT conflicts 0

## Files added for auditability

- `audit_area_network_v1545.js`
- `audit_hyakumeizan_network_v1545.js`
- `AREA_NETWORK_CT_AUDIT_V1545.json/.txt`
- `HYAKUMEIZAN_NETWORK_CT_AUDIT_V1545.json/.txt`
- `NATIONAL_CT_GAP_AUDIT_V1545.json`
- `ALL_CT_AUDIT_V1545.txt`
- `RELEASE_AUDIT_V1545.md`
