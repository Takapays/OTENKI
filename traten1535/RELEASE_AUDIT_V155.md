# V1.5.5 Release Audit

## 水場拡張監査 V2
- 対象: アルプス＋八ヶ岳 65座
  - 北アルプス 34座
  - 中央アルプス 6座
  - 南アルプス 22座
  - 八ヶ岳 3座
- V2 route geometry: 65/65 PASS
  - route-corridor: 31座
  - fixed-point-buffer fallback: 34座
  - corridor centers: 533点（1座最大44点）
- Public-source seed validator: PASS
- 初期public seed: 白馬岳「銀嶺水」1件
- 座標推測: なし（seedは公開座標＋出典URL必須）
- OSM拡張タグ: drinking_water / spring / water_tap / water_well / water_point / fountain=drinking
- ルート距離スコアリング: PASS（synthetic test）
- 飲用タグ高優先度化: PASS（synthetic test）
- 「温泉」等の疑義候補降格: PASS（synthetic test）
- 固定DBへの自動昇格: なし
- 既存固定水場との90m重複判定: 実装済み
- resume: 未実行山を優先、失敗済みは古い試行から再試行

## GitHub Actions
- `.github/workflows/water-v2-candidate-audit.yml`: YAML parse PASS
- 起動: workflow_dispatch のみ（定期cronなし）
- 保存先: dedicated `water-candidates` branch
- 保存ファイル:
  - water-v2-candidates.json
  - WATER_V2_CANDIDATES.csv
  - WATER_V2_CANDIDATES.md
- 通常mainの固定水場キャッシュへ自動反映しない
- 既存 `water-source-audit.yml` は従来どおり dedicated `water-cache` branch / manual-only を維持

## ローカル実行
- `python audit_water_v2_candidates.py --dry-run`: PASS
- この実行環境では外部DNSが利用できず、Overpass live scanは実行不可（Temporary failure in name resolution）。
- したがってV1.5.5リリース監査では「実候補件数」は未確定。GitHub Actions実行時に候補キューを生成する設計。

## 構文・資産
- JavaScript syntax: app.js / water-sources.js / trailheads.js / huts.js / live-cameras.js = OK
- Python compile: server.py / audit_water_300.py / audit_water_v2_candidates.py = OK
- HTML parse: index.html / guide.html / huts.html / trailheads.html / live-cameras.html / water-sources.html = OK
- workflow YAML: water-source-audit.yml / water-v2-candidate-audit.yml = OK
- traten-logo.png: 358226 bytes
- traten-logo SHA-256: 8b8c7474fb3635af4d0ad1c106f88cd4bf2a8fc567267d1bed301d8bb21a3aa7

## 既存水場監査
- `audit_water_300.py --dry-run`: Japan 300 audit route points 300/300 / PASS
- V1.5.4の白馬岳「栂池温泉→銀嶺水」固定補正を維持
- V2候補データと `water-mountain-cache.json` は通常リリースZIPに含めない

## 回帰
- Core Japan 300 list: 300
- V1.5.4 app.js を `1.5.4→1.5.5` だけ正規化したものとV1.5.5 app.jsが完全一致: PASS
- server.py / audit_water_300.py もバージョン文字列以外V1.5.4と一致: PASS
- Progressive analyze() function: V1.5.4と byte-identical
- Progressive analyze() SHA-256: 3146a73e1290f20a91fd90192c7db8420ec51ab078d4740cc736a11edde74a5d
- よってV1.5.4監査済みのCT/代表コースデータ領域に変更なし:
  - 300座 / 380代表コース / 901方向別CT
  - 確認済み・合成751 / 推定134 / 中間地点按分16
  - CT欠損0 / ルート組立0 / 地点CT不一致0
