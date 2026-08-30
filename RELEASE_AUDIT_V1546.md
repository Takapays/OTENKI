# V1.5.46 release audit

## Baseline

- Sole source baseline: `traten-v1.5.45-full.zip` created in the immediately preceding development turn.
- Version after this work: **V1.5.46**.
- Scope: Alps-centered **major mountain-area trail network** audit, not one representative route per summit.
- CT policy: published/checked values only; no coordinate/elevation regression guesses; closure/invalid-route issues are handled by route definition rather than fabricated CT.

## Explicit mountain-area network acceptance

`node audit_area_network_v1546.js`

- Areas: **16**
- Unique named nodes across explicit graphs: **141**
- Directed adjacent edges: **264**
- Direct verified: **264**
- Missing: **0**
- Estimated: **0**
- Composed-only: **0**
- Disconnected areas: **0**

The acceptance test now checks both CT status and undirected graph connectivity, preventing a false 100% result where two valid subgraphs inside the same named mountain area do not connect.

### Explicit graphs

1. くじゅう連山
2. 北アルプス・槍穂高
3. 北アルプス・表銀座常念
4. 北アルプス・裏銀座双六
5. 北アルプス・雲ノ平薬師沢
6. 北アルプス・後立山白馬
7. 北アルプス・立山剱
8. 北アルプス・薬師岳
9. 中央アルプス・木曽駒空木
10. 南アルプス・白峰塩見
11. 南アルプス・鳳凰三山
12. 南アルプス・北沢峠甲斐駒仙丈
13. 南アルプス・荒川赤石
14. 南アルプス・聖岳
15. 八ヶ岳・南八ヶ岳
16. 八ヶ岳・北八ヶ岳天狗

## Key topology corrections / additions

- 槍穂高: connected the Kamikochi/Yokoo branch to Yarisawa Lodge instead of leaving the Yari approach as an isolated valid subgraph.
- 表銀座常念: connected Tsubakuro / Daitenso / Otensho / Jonen / Chogatake into one graph.
- 雲ノ平: added Oritate / Tarodaira / Yakushizawa / Kumonodaira / Mitsumata branch.
- 後立山: added the Hakuba Sanso / Shakushi / Shirouma-Yarigatake / Tengu Sanso / Kaerazu / Karamatsu ridge so Hakuba and the Goryu-Kashimayari side are not separate islands.
- 立山剱: connected Murodo to Tsurugisawa in the same area graph; retained Hayatsuki ridge branch.
- 中央アルプス: separated Kiso-Komagatake checkpoints around Norikoshi-jodo/Nakadake and expanded the south ridge through Gokurakudaira / Nigosawa-Omine / Hinokio / Kumazawa / Higashikawa / Kisodono / Utsugi.
- 南アルプス南部: added Arakawa-Akaishi loop and split the Hijiri Sawarajima approach into trailhead, bridge, ruins, pass/viewpoint and hut sections.

## Hyakumeizan union audit

`node audit_hyakumeizan_network_v1546.js`

- Mountains: **100**
- Declared route definitions: **140**
- Route endpoint edges before minimal/composed expansion: **435**
- Unique adjacent audit edges after union with explicit area graphs: **574**
- Direct verified: **574**
- Missing: **0**
- Estimated: **0**
- Composed-only: **0**
- Existing route-definition exclusions: **4**
- Explicit area networks: **16**

The four V1.5.45 safety exclusions remain in force (Oze cross-area/old-route cases, Kusatsu-Shirane restricted summit endpoint, Asama crater-summit endpoint). No CT was invented for those routes.

## Nationwide legacy regression signal

`node audit_all_ct_v1523.js`

- Mountains: **300**
- Courses: **377**
- Segments: **967**
- Direct: **955**
- Composed: **12**
- Estimated: **0**
- Missing: **81**
- CT conflicts: **0**

The 81 remaining legacy gaps are outside the completed explicit Alps/Hyakumeizan major-network acceptance scope. They remain unavailable rather than estimated.

## Regression / source-diff checks

- `node --check app.js`: PASS
- `node --check audit_area_network_v1546.js`: PASS
- `node --check audit_hyakumeizan_network_v1546.js`: PASS
- `python -m py_compile server.py`: PASS
- `app.js` diff versus V1.5.45 is limited to APP_VERSION, V1.5.46 CT additions, V1.5.46 explicit network declarations, and course-time table registration.
- Diff scan found **no changed `lat:` / `lon:` records**.
- Diff scan found **no weather/forecast/model/progressive-rendering code changes**.
- `server.py` / `index.html` changes are version/cache-bust only.

## Important scope statement

This version materially expands from “routes already registered for each summit” to explicit Alps-centered major mountain-area graphs. The acceptance result **does not claim every minor/unregistered path in the Japanese Alps is cataloged**. It does claim that every directed adjacent section declared in these 16 major graphs has a direct, non-estimated CT and that every graph is connected. Unknown/unregistered trails are not silently treated as audited.

## Package verification

- `traten-v1.5.46-full.zip`: `unzip -t` PASS, no compressed-data errors.
- `traten-v1.5.46-changed-files.zip`: `unzip -t` PASS, no compressed-data errors.
- Full ZIP was extracted to a fresh verification directory and all V1.5.46 audits were rerun there: area 264/264 direct, Hyakumeizan union 574/574 direct, legacy estimated 0 / conflicts 0.
- `app.js` SHA-256 matched across working source, freshly extracted full ZIP, and freshly extracted changed-files ZIP: `04eb615045b248d27f6beb5916baa007e02acd8238573f925f9c6a0879fa94c3`.
