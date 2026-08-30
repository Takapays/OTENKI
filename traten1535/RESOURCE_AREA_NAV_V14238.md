# V1.4.238 山域→山 選択式リソースナビ

## 変更
- ヘッダーの「登山口 / 山小屋 / 水場 / ライブカメラ」各ページを、TOPの山選択と同じ15山域区分に統一。
- 各ページは、その機能の登録データが存在する山域だけを表示。
- 山域選択後に、その山域内でデータがある山だけを表示。
- 登山口ページは山→登山口の紐付けを代表ルート固定データから生成。
- 登山口カードから専用アクセス詳細ページ `trailhead-access.html` へリンク。
- 山小屋ページは代表ルート上の山小屋と固定公式HPの両方がある山だけを表示。
- 水場ページは固定監査で `checked=true / available=true` の山だけを山域・山リストへ表示。未監査・ERRは水場なし扱いしない。
- ライブカメラページは固定カメラDBの `mountains` をTOP山域へ再分類。

## データ監査
- 共通山域定義: 15山域（TOPと同順・同名称）
- 登山口: 161山が山→アクセスDBへ解決、15山域
- 山小屋: 93山が代表ルート→公式HPへ解決、15山域
- ライブカメラ: 90カメラ / 66山を共通山域へ解決、データあり14山域のみ表示
- 水場: 現在の同梱キャッシュは監査済み35/300、水場あり7座。表示山域は水場あり山のみから動的生成
- 固定登山口座標: 300/300
- JS syntax: app.js / trailheads.js / huts.js / trailhead-access.js / water-sources.js / live-cameras.js / resource-mountain-data.js OK
- Python compile: server.py / access・water audit scripts OK
- HTML local asset references: missing 0

## 既存機能
天気分析、代表コース、CT、固定座標、アクセスDB内容、山小屋URL、カメラDB、水場キャッシュ内容は変更していない。
