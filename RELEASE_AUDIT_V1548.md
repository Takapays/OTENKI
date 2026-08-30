# V1.5.48 release audit

## Baseline

- Sole source baseline: `traten-v1.5.47-full.zip` from the immediately preceding release.
- Version after this work: **V1.5.48**.
- Scope: deep-dive of five previously deferred mountain-area networks: 大雪山, 飯豊連峰, 朝日連峰, 奥秩父主脈, 谷川主脈.
- CT policy: public endpoint-specific CT only; no coordinate/elevation regression; no proportional split; no unsupported reverse mirroring.

## Explicit mountain-area network acceptance

`node audit_area_network_v1548.js`

- Areas: **36**
- Unique named nodes: **264**
- Directed adjacent audit edges: **424**
- Direct verified: **424**
- Missing: **0**
- Estimated: **0**
- Composed-only: **0**
- Disconnected areas: **0**

V1.5.48 adds five connected deep-dive graphs to the 31 retained V1.5.47 graphs.

## Hyakumeizan union audit

`node audit_hyakumeizan_network_v1548.js`

- Mountains: **100**
- Declared route definitions: **140**
- Route endpoint edges before explicit-area union: **434**
- Unique adjacent audit edges after union: **700**
- Direct verified: **700**
- Missing: **0**
- Estimated: **0**
- Composed-only: **0**
- Existing route-definition exclusions: **4**
- Explicit area networks: **36**

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

The legacy 81 missing directions are outside this five-area network acceptance scope and remain unavailable; none were filled by inference.

## Conflict review

Three newly discovered public values conflicted with already registered verified direct CT:

- トムラウシ山 -> トムラウシ短縮コース登山口
- 大弛峠 -> 国師ヶ岳
- 国師ヶ岳 -> 大弛峠

V1.5.48 does **not** add duplicate conflicting values. Existing direct verified values are retained. Release-wide direct CT conflict count is **0**.

## Regression / source-diff checks

- `node --check app.js`: PASS
- `node --check audit_area_network_v1548.js`: PASS
- `node --check audit_hyakumeizan_network_v1548.js`: PASS
- `python3 -m py_compile server.py`: PASS
- `app.js` diff versus V1.5.47: version + V1.5.48 CT/network declarations + course-table registration only.
- Changed existing `lat:` / `lon:` records versus V1.5.47: **0**
- Changed weather / forecast / ECMWF / ICON / GFS / JMA / progressive-rendering code lines: **0**
- `server.py` / `index.html`: version/cache-bust only.

## Scope honesty / remaining structure gaps

See `NATIONWIDE_NETWORK_GAP_AUDIT_V1548.md`.

Most importantly:
- 大雪山: core traverse completed as a connected graph, but not every alternative approach/minor peak.
- 飯豊: main 御沢–飯豊–大日 ridge completed; northern side approaches and 杁差/北股 branches are not claimed complete.
- 朝日: 大朝日–以東–大鳥池 main traverse completed; all side approaches are not claimed complete.
- 奥秩父: some long main-ridge sections remain intentionally coarse because public sources expose section totals but not trustworthy adjacent subsegment CT.
- 谷川: forward main ridge completed; reverse is not mirrored without source, and 馬蹄形 is outside this pass.

No unmodeled branch is counted as audited merely because the declared graph passes.

## Package verification

To be appended after ZIP generation and fresh extraction rerun.

### Final package verification result

- `traten-v1.5.48-full.zip`: `unzip -t` PASS.
- `traten-v1.5.48-changed-files.zip`: `unzip -t` PASS.
- Fresh extraction of the full ZIP and rerun:
  - area network: 36 areas / 264 nodes / 424 edges / 424 direct / missing 0 / estimated 0 / composed-only 0 / disconnected 0.
  - Hyakumeizan union: 700/700 direct / missing 0 / estimated 0 / composed-only 0.
  - legacy 300: estimated 0 / CT conflicts 0 / missing 81 intentionally unresolved outside this pass.
  - classic routes: 9 / 109 segments / missing 0 / estimated 0 / derived 0.
- `app.js` SHA-256 matched work/full/changed verification copies: `3e4366333fc5c6b93740286282a2c86c0251020571e1c71db733048692e65af0`.
