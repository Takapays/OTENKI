# V1.5.27 Release Audit

## 基準ソース
- V1.5.26 full ZIP (`traten-v1.5.26-full.zip`) を直接展開して作業開始。
- V1.5.23〜V1.5.26 の `FIX_*.md` / `RELEASE_AUDIT_*.md` は基準版と `cmp` で完全一致を確認。
- V1.5.23〜V1.5.26 の変更を含むV1.5.26ソースを巻き戻さず継承。

## V1.5.27 変更内容
- 03「縦走気象グラフ」の「風・降水」「気温・雲量」両グラフ直下に日付帯を追加。
- 同じ日の連続地点は1つの日付帯としてまとめて表示。
- 日付が変わる地点間の中間位置に、グラフ内の縦破線を追加。
- 既存のバー、折れ線、数値、地点番号、地点名、時刻表示は維持。

## 実監査結果
- JavaScript構文: `node --check app.js` PASS
- Python構文: `python3 -m py_compile server.py` PASS
- CSS波括弧: 3609 / 3609 PASS
- 日付表示ヘルパー機能テスト:
  - サンプル5地点 / 3日で日付帯3区分 PASS
  - 日付変更境界2本 PASS
  - `8/30`, `8/31`, `9/1` 表示 PASS
- 展開後代表コースCT監査:
  - 山: 300
  - 代表コース: 380
  - 方向別区間: 901
  - 確認済み/合成CT: 769
  - 推定CT: 132
  - 按分CT: 0
  - CT情報なし: 0
  - ルート組立エラー: 0
  - 地点/CT不一致: 0
- 全CT補助監査:
  - missing: 0
  - duplicate key conflicts: 0
  - 距離ベース確認フラグ: 48（情報フラグ。V1.5.26由来の既存値を自動変更せず）
  - reverse ratio flag: 1（既存の監査対象。今回変更なし）
- 王道ルート監査:
  - 9ルート
  - 109方向区間
  - CT情報なし: 0
  - 推定CT: 0
  - 按分CT: 0
- progressive `analyze()`:
  - V1.5.26と byte-identical PASS
  - 7517 bytes
  - SHA-256 `3146a73e1290f20a91fd90192c7db8420ec51ab078d4740cc736a11edde74a5d`
- 主要画面バージョン表記:
  - `index.html / guide.html / trailheads.html / huts.html / water-sources.html / live-cameras.html` で V1.5.27 PASS
- V1.5.23〜V1.5.26履歴保持:
  - `FIX_V1523.md` PASS
  - `FIX_V1524.md` PASS
  - `FIX_V1525.md` PASS
  - `FIX_V1526.md` PASS
  - 各 `RELEASE_AUDIT_V1523〜V1526.md` PASS

## リリース除外
- `__pycache__`
- `water-mountain-cache.json`
- Water V2 runtime/generated candidate cache類

## 未実施
- 実ブラウザでのPC/スマホ視覚確認は未実施。
