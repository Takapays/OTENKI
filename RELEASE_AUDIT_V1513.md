# トラテン V1.5.13 Release Audit

## 目的
木曽駒ヶ岳〜宝剣岳で顕在化した「親区間にはCTがあるのに、中間通過ポイントを選ぶと子区間がCT情報なしになる」問題を全国横断で点検し、確認できる区間は固定CTへ昇格し、同型の未登録ケースには全国共通の安全側フォールバックを追加する。

## 固定CT追加（14方向）
### 木曽駒ヶ岳〜宝剣岳（6方向）
- 宝剣岳 → 宝剣山荘 20分
- 宝剣山荘 → 宝剣岳 20分
- 宝剣山荘 → 頂上山荘 40分
- 頂上山荘 → 宝剣山荘 35分
- 頂上山荘 → 木曽駒ヶ岳 20分
- 木曽駒ヶ岳 → 頂上山荘 15分

公開根拠: YAMA HACK「木曽駒ヶ岳コースガイド」「宝剣岳寄り道コース」。

### 八方池周辺（4方向）
- 八方池山荘 → 八方池 100分
- 八方池 → 唐松岳頂上山荘 150分
- 唐松岳頂上山荘 → 八方池 120分
- 八方池 → 八方池山荘 80分

公開根拠: 白馬村公式観光サイト「モデルコース・登山口へのアクセス」。

### 一ノ沢〜常念乗越・常念小屋（4方向）
- 一ノ沢登山口 → 常念乗越 270分
- 常念乗越 → 常念小屋 1分
- 常念小屋 → 常念乗越 1分
- 常念乗越 → 一ノ沢登山口 170分

公開根拠: 常念小屋公式「一の沢登山コース」、YAMAP標準モデル。

## 全国共通の中間地点フォールバック
ユーザーが選択したルートで、確認済みの親区間 A→D の途中に B/C を追加し、子区間だけCT未登録になる場合を対象とする。

適用条件:
- 親CTは確認済み/合成CTのみ（推定・既存按分を親にしない）
- 中間地点は固定座標必須
- 最大5区間の窓で探索
- 選択チェーンの直線距離合計 / 親端点の直線距離 <= 1.60
- 既に確認済み子CTがある場合は親CTから差し引く
- 残時間だけを未確定子区間へ距離比で配分
- 結果は `derived:true` の「按分CT」であり、確認済みCTへ自動昇格しない
- 親CTが無い場合は従来どおり「CT情報なし」とし、通過時刻手入力を促す

このため「公開根拠がないのに自動確定」することはない。

## 実監査
`node audit_intermediate_ct_v1513.js`
- V1.5.13固定14方向: 14/14 OK
- 実ルート文脈フォールバック: 高妻山の中間区間で derived CT生成 OK

`node audit_expanded_ct_v14232.js`
- 日本三百名山: 300
- 代表コース: 380
- 展開後方向別区間: 901
- 確認済み/合成CT: 755（V1.5.12: 751）
- 推定CT: 134
- 中間地点按分CT: 12（V1.5.12: 16）
- CT missing: 0
- route build errors: 0
- point/segment alignment errors: 0

`node audit_representative_enrichment_v14159.js`
- courses=380
- enriched_courses=19
- added_points=24
- bad=0

水場回帰:
- `python audit_water_300.py --dry-run`: 300/300, network requestなし
- `python audit_water_v2_candidates.py --dry-run`: 65/65, network requestなし

構文:
- app.js / water-sources.js / trailheads.js / huts.js / live-cameras.js: `node --check` OK
- server.py / water audit scripts: Python compile OK
- index / guide / huts / trailheads / live-cameras / water-sources: HTML parser OK

## 気象分析回帰
`async function analyze()` は V1.5.12 と byte-identical。
SHA-256: `3146a73e1290f20a91fd90192c7db8420ec51ab078d4740cc736a11edde74a5d`

## 注意
固定候補カタログは「候補一覧」であり、配列順そのものが登山道トポロジーとは限らない。そのため全国スキャンで隣接して見える地点を機械的に確認済みCTへ昇格していない。公開標準CTで端点・方向が確認できたものだけ固定し、それ以外の親CT分割ケースは「按分CT」と明示して扱う。

ブラウザ実描画・Supabase実通信はこの環境では実施していない。
