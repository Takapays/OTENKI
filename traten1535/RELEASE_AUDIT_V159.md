# トラテン V1.5.9 実監査結果

## 対象
- 全国一括判定の地図内 前日/翌日ナビ
- V1.5.8分析履歴を利用したCT要確認区間キュー
- V1.5.7/V1.5.8の全国共有キャッシュ、水場、CT、progressive weather renderingの回帰

## 全国日付ナビ
- 地図右上Leaflet controlを `‹ 日付 ›` 形式へ変更: PASS
- 前日ボタン `data-national-date-shift=-1`: PASS
- 翌日ボタン `data-national-date-shift=1`: PASS
- 日付変更は既存date inputのchangeイベントへ流し、共有キャッシュ再読込を再利用: PASS
- inputのmin/max外では矢印disabled: PASS（ソース確認）
- `styles.css` のindex側キャッシュキーをV1.5.9へ更新: PASS

## 7日共有キャッシュの維持確認
- `NATIONAL_OUTLOOK_CACHE_TTL` 既定14400秒（4時間）: 維持
- `NATIONAL_100_ROLLING_DAYS` 既定7日: 維持
- 1サイクル1日分: 維持
- GitHub Actions wake-up: `7,22,37,52 * * * *`（15分間隔）: 維持
- 百名山ローリングウォーム + 二百/三百名山オンデマンド共有の既存設計: 変更なし

## CT要確認区間
- weather_analysis成功時に、分析ルートの隣接区間を既存 `courseTimeInfo()` で確認: 実装確認
- 確認済み/合成済みCTは記録対象外: 実装確認
- `estimated=true` / `sourceType=estimated` は `estimated` として記録: 実装確認
- resolverがnullの場合は `missing` として記録: 実装確認
- metadataへ保存する項目: from_name / to_name / status / minutes / source
- server側sanitizerでネスト配列を明示許可: PASS
- usage-dashboardへ「CT要確認区間」追加: PASS
- 集計項目: 山 / 区間 / 現在状態 / 利用回数 / ユニークセッション / 最終利用
- 利用履歴だけで確認済みCTへ自動昇格する処理: なし

## 構文・回帰
- `node --check app.js`: PASS
- `python3 -m py_compile server.py`: PASS
- HTMLParser: index / guide / usage-dashboard / water / huts / trailheads / live-cameras PASS
- 展開後代表コースCT監査:
  - mountains: 300
  - courses: 380
  - expanded directional segments: 901
  - verified/composed CT: 751
  - estimated CT: 134
  - derived intermediate-point CT: 16
  - CT missing: 0
  - route build errors: 0
  - point/segment alignment errors: 0
- 代表コース監査: 380コース / supplemental generated 16
- progressive `async function analyze()`:
  - V1.5.8 SHA-256: `3146a73e1290f20a91fd90192c7db8420ec51ab078d4740cc736a11edde74a5d`
  - V1.5.9 SHA-256: `3146a73e1290f20a91fd90192c7db8420ec51ab078d4740cc736a11edde74a5d`
  - byte-identical: PASS
- active HTML asset queryに `v=1.5.8`: 0件

## 実行環境上の制約
- このコンテナにはFlaskがインストールされていないため、ローカルHTTPサーバーを起動してのブラウザ実表示/Supabase実通信は未実施。
- 上記はソース、構文、既存監査スクリプト、静的HTML解析による実監査結果。
