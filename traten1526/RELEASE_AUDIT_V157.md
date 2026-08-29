# V1.5.7 Release Audit

## Change
- 全国分析の先行キャッシュを翌日百名山100座から、翌日〜7日先の百名山100座へ拡張。
- 最大700行をSupabaseで保持し、fresh TTLは4時間を維持。
- 15分周期で期限切れ・欠損を確認し、1サイクル1日分（最大100座）だけ処理。
- GitHub ActionsのRender wake-upを15分間隔へ変更。
- バックグラウンド維持対象は百名山100座・翌日〜7日先だけ。二百名山・三百名山はオンデマンドのまま。

## Rolling-cache logic audit
- national-100-points.json: 100 unique = PASS
- rolling days: 7 = PASS
- rolling target rows: 700 = PASS
- dates per cycle: 1 = PASS
- all 700 rows missing simulation: first cycle fetches only 100 rows = PASS
- seven-cycle simulation: 7 dates × 100 rows = 700 rows populated = PASS
- all-fresh simulation: fetch 0 rows = PASS
- mixed simulation: first 3 dates fresh / 4th date 25 stale -> only 25 rows fetched = PASS
- background persistent refresh no longer calls generic non-100 stale-row refresher = PASS
- GitHub Actions cron: 7,22,37,52 minutes each hour = PASS
- Render env: rolling auto cache ON / days 7 / dates per cycle 1 = PASS

## Static / syntax audit
- Python compile: server.py / audit_water_300.py / audit_water_v2_candidates.py / audit_access_coverage.py / audit_fixed_access.py = PASS
- JS node --check: app.js / access.js / access-data.js / camera-data.js / live-cameras.js / trailheads.js / huts.js / hut-data.js / resource-mountain-data.js / water-sources.js = PASS
- YAML parse: render.yaml + 3 GitHub workflows = PASS
- APP_VERSION: 1.5.7
- progressive analyze() V1.5.6 byte-identical = PASS
- analyze SHA-256: `3146a73e1290f20a91fd90192c7db8420ec51ab078d4740cc736a11edde74a5d`

## CT regression audit
- mountains: 300
- representative courses: 380
- expanded directional segments: 901
- verified/composed CT: 751
- estimated CT: 134
- derived intermediate-point CT: 16
- CT missing: 0
- route build errors: 0
- point/segment alignment errors: 0

## Water regression audit
- fixed audit points: 300/300
- Water V2 target mountains: 65/65 geometry available
- Water V2 modes: route-corridor 31 / fixed-point-buffer 34
- Water V2 corridor centers: 533
- public-source seeds: 1

## Release rules
- water-mountain-cache.json: release ZIP excluded
- water-v2-candidates.json / WATER_V2_CANDIDATES.csv / WATER_V2_CANDIDATES.md: release ZIP excluded
