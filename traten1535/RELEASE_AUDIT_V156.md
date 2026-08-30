# V1.5.6 Release Audit

## Change
- 赤岳 → 阿弥陀岳: 95分（YAMAP標準モデルのチェックポイント合算）
- 阿弥陀岳 → 美濃戸口: 201分 / 3時間21分（YAMAP標準モデル・御小屋尾根の下山チェックポイント合算）

## Source calculation
### 赤岳 → 阿弥陀岳
- 赤岳 → 分岐: 25分
- 分岐 → 中岳: 15分
- 中岳 → 中岳のコル: 30分
- 中岳のコル → 阿弥陀岳: 25分
- 合計: 95分

### 阿弥陀岳 → 美濃戸口
YAMAP「美濃戸口登山口-御小屋山-阿弥陀岳 往復コース」の阿弥陀岳→八ヶ岳山荘（美濃戸口）をチェックポイント合算。
- 合計: 201分（3時間21分）

## Static / syntax audit
- `node --check app.js`: PASS
- `python3 -m py_compile server.py audit_water_300.py audit_water_v2_candidates.py`: PASS
- APP_VERSION: 1.5.6
- CT direct key `赤岳→阿弥陀岳`: 95 = PASS
- CT direct key `阿弥陀岳→美濃戸口`: 201 = PASS
- V1.5.5 app.jsから、version更新＋上記2CT行以外の差分なし: PASS
- progressive `analyze()` V1.5.5とバイト一致: PASS
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

## Release rules
- water-mountain-cache.json: release ZIP excluded
- water-v2-candidates.json / WATER_V2_CANDIDATES.csv / WATER_V2_CANDIDATES.md: runtime candidate cache/output excluded from release ZIP
