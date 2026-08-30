# V1.5.32 Release Audit

## 対象
- 基準: `traten-v1.5.31-full.zip` を展開した実ソース
- 変更: 登山口アクセス情報拡充 batch 2
- バージョン: V1.5.31 → V1.5.32

## 追加したアクセス情報
公開情報を確認できた主要登山口・交通起点を19件追加。

- みずがき山自然公園
- 一の鳥居苑地（飯縄山）
- 仁田峠（普賢岳）
- 伊吹山ドライブウェイ山頂駐車場
- 公時神社（金時神社）登山口
- 十里木高原登山口
- 古寺案内センター（朝日連峰）
- 大峯大橋（山上ヶ岳）
- 天城高原ハイカー専用駐車場
- 妙義神社入口
- 徳和・乾徳山登山口
- 新穂高ロープウェイ 西穂高口駅
- 曽爾高原登山口
- 深田記念公園・茅ヶ岳登山口
- 奥胎内ヒュッテ（足ノ松尾根ルート起点）
- 武平峠登山口
- 中登山道口 御在所岳
- 斑尾高原ビジターセンター（山の家）
- 泉ヶ岳大駐車場

座標は追加・変更していない。

## 実監査結果

### 1. 構文
- `node --check app.js`: PASS
- `node --check access-data.js`: PASS
- `python3 -m py_compile server.py`: PASS

### 2. アクセスDB
V1.5.31:
- 実DBユニーク件数: 253
- `audit_access_coverage.py`: candidates 426 / covered 200 / missing 226

V1.5.32:
- 実DBユニーク件数: 272
- Access meta: 6.0.6 / count 272
- `audit_access_coverage.py`: candidates 426 / covered 222 / missing 204

差分:
- 固定アクセス情報: +19件
- 代表ルート等から抽出した候補カバー: +22地点
- missing: 226 → 204

追加対象19件は、canonical名またはaliasから全件resolverで解決できることを実行確認。
- emptyFields: 0
- badLinks（https形式チェック）: 0

### 3. CT / 地点・区間整合
`audit_all_ct_v1523.js` を V1.5.31 / V1.5.32 の双方で実行し、出力を比較。
- 日本三百名山: 300
- 代表コース: 380
- 代表コース区間: 901
- direct: 757
- composed: 12
- estimated: 132
- missing: 0
- flags: 48
- conflicts: 0
- reverseFlags: 1
- V1.5.31 と出力完全一致

### 4. 王道ルート組立
`audit_classic_routes_v1518.js` を V1.5.31 / V1.5.32 の双方で実行し比較。
- 9ルート
- 109区間
- missing: 0
- estimated: 0
- derived: 0
- V1.5.31 と出力完全一致

### 5. 固定座標監査
`audit_fixed_access.py` を V1.5.31 / V1.5.32 の双方で実行し比較。
- 出力完全一致
- 現行監査スクリプト結果: 299/300
- 既存の `観音岳(鳳凰)` 1件が Missing fixed coordinates として残る
- 今回のアクセス情報追加に伴う固定座標変更はなし

### 6. progressive weather rendering
- `app.js` の実差分は APP_VERSION のみ
- `mergeAnalysisResults()` / `progressiveStates` / モデル到着ごとの `renderAll()` / 最終 `Promise.all(...)` は変更なし

### 7. 変更ファイル
- `access-data.js`
- `ACCESS_COVERAGE.csv`
- `ACCESS_COVERAGE_REPORT.md`
- `ACCESS_MISSING_ONLY.txt`
- `app.js`
- `server.py`
- `index.html`
- `trailheads.html`
- `huts.html`
- `water-sources.html`
- `live-cameras.html`
- `guide.html`
- `README.md`
- `CHANGELOG.md`
- `RELEASE_AUDIT_V1532.md`

### 8. 削除
- 削除ファイルなし

### 9. 未実施
- Render本番環境での実画面確認は未実施。
- 公開情報はWeb検索で確認したが、全リンクに対する独立HTTP疎通テストは未実施。
