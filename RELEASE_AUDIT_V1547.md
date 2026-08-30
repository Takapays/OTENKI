# V1.5.47 release audit

## Baseline

- Sole source baseline: `traten-v1.5.46-full.zip` from the immediately preceding development turn.
- Version after this work: **V1.5.47**.
- Scope: nationwide second-wave mountain-area CT network expansion beyond the Alps / Yatsugatake / Kuju focus.
- CT policy: endpoint-specific public CT only; no coordinate/elevation estimates; unsupported reverse directions are omitted rather than inferred.

## Explicit mountain-area network acceptance

`node audit_area_network_v1547.js`

- Areas: **31**
- Unique named nodes: **225**
- Directed adjacent edges: **367**
- Direct verified: **367**
- Missing: **0**
- Estimated: **0**
- Composed-only: **0**
- Disconnected areas: **0**

V1.5.47 adds 15 area graphs to the 16 retained V1.5.46 graphs: 尾瀬, 富士山, 丹沢, 妙高・火打, 霧島, 大山, 剣山〜三嶺, 宮之浦岳, 谷川岳, 大朝日, 飯豊大日杉, 奥秩父雲取, 阿蘇, 祖母山, 石鎚山.

## Hyakumeizan union audit

`node audit_hyakumeizan_network_v1547.js`

- Mountains: **100**
- Declared route definitions: **140**
- Route endpoint edges before explicit-area union: **434**
- Unique adjacent audit edges after union: **645**
- Direct verified: **645**
- Missing: **0**
- Estimated: **0**
- Composed-only: **0**
- Existing route-definition exclusions: **4**
- Explicit area networks: **31**

## Nationwide legacy regression signal

`node audit_all_ct_v1523.js`

- Mountains: **300**
- Courses: **376**
- Segments: **963**
- Direct: **952**
- Composed: **11**
- Estimated: **0**
- Missing: **81**
- CT conflicts: **0**

The remaining 81 legacy directions stay unavailable. V1.5.47 does not fill them with regression or proportional guesses.

## Classic route regression

`node audit_classic_routes_v1520_detail.js`

- classic routes: **9**
- directional adjacent segments: **109**
- missing: **0**
- estimated: **0**
- derived: **0**

`node audit_representative_v14198.js`: PASS (376 representative courses parsed; supplemental generated definitions resolved).

The older `audit_expanded_ct_v14232.js` is retained for historical comparison but is no longer a release acceptance gate because it assumes the pre-V1.5.44 estimation behavior. It reports point/segment alignment errors **0**; its old missing/estimate counters are not used as current CT acceptance criteria.

## Conflict corrections

Two older direct values were superseded by higher-authority current public values:

- 韓国岳登山口 -> 霧島山（韓国岳）: **90 min**, Environment Ministry official course (old Yamareco value 123 removed).
- 大山（弥山） -> 六合目避難小屋: **60 min**, Environment Ministry official course (old Yamareco value 53 removed).

The release-wide direct CT conflict scan remains **0**.

## Strict no-inference review

During final review, V1.5.47 removed candidate reverse-direction values that were initially tempting to mirror from the opposite direction but were not explicitly stated by a public source. In particular, no reverse CT was inferred for:

- 竜宮十字路 -> 山ノ鼻 from the forward 80-minute Oze Foundation record.
- 剣ヶ峰 -> 富士宮ルート山頂 from the forward 20-minute Fujinomiya official model.

This is intentional and preserves the user's no-estimate/no-guess rule.

## Regression / source-diff checks

- `node --check app.js`: PASS
- `node --check audit_area_network_v1547.js`: PASS
- `node --check audit_hyakumeizan_network_v1547.js`: PASS
- `python3 -m py_compile server.py`: PASS
- `app.js` diff versus V1.5.46: 5 hunks; version, two authoritative CT corrections, V1.5.47 network/CT declarations, course-table registration only.
- Changed `lat:` / `lon:` records versus V1.5.46: **0**
- Changed weather / forecast / model / progressive-rendering code lines: **0**
- `server.py` / `index.html`: version/cache-bust only.

## Known incomplete major networks

See `NATIONWIDE_NETWORK_GAP_AUDIT_V1547.md`. Most importantly, 大雪山核心縦走, full 飯豊/朝日 traverses, full 奥秩父 main ridge, 谷川主脈/馬蹄形, and several Tohoku volcanic-area branch networks are **not** claimed complete where exact adjacent CT could not be confirmed. No estimate was substituted.

## Package verification

To be completed against the generated V1.5.47 ZIP artifacts; final SHA-256 and fresh-extraction rerun results are appended after packaging.

### Final package verification result

- `traten-v1.5.47-full.zip`: `unzip -t` PASS.
- `traten-v1.5.47-changed-files.zip`: `unzip -t` PASS.
- Fresh extraction of the full ZIP and rerun:
  - area network: 31 areas / 225 nodes / 367 edges / 367 direct / missing 0 / estimated 0 / composed-only 0 / disconnected 0.
  - Hyakumeizan union: 645/645 direct / missing 0 / estimated 0 / composed-only 0.
  - legacy 300: estimated 0 / CT conflicts 0 / missing 81 intentionally unresolved.
  - classic routes: 9 / 109 segments / missing 0 / estimated 0 / derived 0.
- `app.js` SHA-256 matched work/full/changed verification copies: `9502208d6daa3aefefc5227b2f053aa9867375b501088bff0a85a35a770e9931`.
