# V1.5.36 Release Audit

## 対象
- 基準: `traten-v1.5.35-full.zip`
- 変更: 観音岳(鳳凰) の固定登山口座標監査未解決を解消
- バージョン: V1.5.35 → V1.5.36

## 原因
旧 `audit_fixed_access.py` が確認しているのは山頂座標ではなく、日本三百名山それぞれに「固定座標付き登山口が直接配列定義されているか」。
観音岳(鳳凰) は `V1423_HOUOU_COMMON` を spread して登山口を持っていたため、実データ上は夜叉神峠登山口が存在するのに監査の静的解析では 299/300 と判定されていた。

## 座標確認
- 観音岳(鳳凰) 山頂: 35.701667, 138.304722 / 2841m
  - 国土地理院「日本の主な山岳」掲載値を維持。
- 夜叉神峠登山口: 35.635523, 138.345424 / 約1400m
  - 公開登山口情報で再確認し、旧値 35.6528, 138.3310 から補正。

## 実施変更
- `観音岳(鳳凰)` の `BUILTIN_ROUTE_CATALOG` を明示配列化。
- 夜叉神峠登山口の既存固定座標4箇所を確認値へ統一。
- 観音岳山頂座標は変更なし。
- APP_VERSION / UI version / cache-buster を 1.5.36 に更新。

## 実監査
### 構文
- `node --check app.js`: PASS
- `python3 -m py_compile server.py`: PASS

### 固定登山口座標
`python3 audit_fixed_access.py`
- V1.5.35: 299/300、missing = 観音岳(鳳凰)
- V1.5.36: 300/300、missing = 0

### CT
`node audit_all_ct_v1523.js`
- mountains: 300
- courses: 380
- segments: 901
- direct: 757
- composed: 12
- estimated: 132
- missing: 0
- conflicts: 0
- reverseFlags: 1
- heuristic flags: 48 → 47

差分は、夜叉神峠登山口の座標補正により既存の `CLOSE_5KM_GT300 観音岳(鳳凰)` 1件が解消したことだけ。CT値そのものの変更はなし。

### 王道ルート
`node audit_classic_routes_v1518.js`
- routes: 9
- segments: 109
- missing: 0
- estimated: 0
- derived: 0
- V1.5.35 と完全一致

### progressive weather rendering
- 気象取得・mergeAnalysisResults・progressiveStates・renderAll の処理に変更なし。

### 削除
- 削除ファイルなし。
