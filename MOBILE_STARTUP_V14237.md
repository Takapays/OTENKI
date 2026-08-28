# V1.4.237 スマホ初期表示の軽量化

## 目的
スマホでトラテンTOPを開いたとき、初画面と関係の薄い通信・JavaScript処理が同時に走って表示開始を圧迫しないようにする。

## 変更
- TOPの初期HTMLから `camera-data.js` / `access-data.js` / `access.js` / `access.css` の同期的な初期読込を外した。
- 上記は必要な操作時にオンデマンド読込し、操作がなければ `load` 後の idle 時間に先読みする。
- 山情報を開く場合はアクセスDB・固定カメラDBの準備完了を待ってから情報カードを表示する。
- 山行地点行を追加した場合も、アクセスUIを遅延読込後にその行へ接続する。
- 全国一括判定のLeaflet地図と共有キャッシュ取得をDOM初期化直後には開始せず、全国判定セクションが画面へ近づいた時、または初期表示後のidle時に開始する。
- Render起動直後の全国キャッシュ自動更新に45秒のboot graceを追加し、コールドスタート直後のHTML/JS配信とバックグラウンド更新が競合しないようにした。

## 初期クリティカルパスから外した自前アセット
- camera-data.js: 37,114 bytes
- access-data.js: 74,355 bytes
- access.js: 64,084 bytes
- access.css: 7,925 bytes
- 合計: 183,478 bytes（raw）
- gzip換算合計: 約46.6KB

加えて、Leaflet CDNのJS/CSSと全国共有キャッシュAPI呼び出しも初期ロード直後から外れる。

## 互換性
- 天気分析ロジック、代表コース、CT、固定地点、アクセスDB、カメラDB、水場DBの内容は変更していない。
- optional resourceの読込に失敗しても、天気分析本体は継続する。

## 監査
- `node --check app.js`: OK
- `python3 -m py_compile server.py`: OK
- CT: 875/875、CT情報なし 0
- 展開後CT: 899区間、CT情報なし 0、route build errors 0、alignment errors 0
- 全国標準CT: 300/300
- 代表コース: 380
- 固定登山口座標: 300/300

※ 現環境にはFlaskランタイムがないため、Render相当のHTTP実起動試験は未実施。構文・静的監査まで実施。
