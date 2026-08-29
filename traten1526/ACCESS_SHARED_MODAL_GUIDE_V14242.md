# V1.4.242

## 登山口アクセス導線

- 登山口一覧は `index.html?access=<登山口名>&mountain=<山名>` へ遷移する。
- TOPの `app.js` が `access` パラメータを検出し、`ensureAccessResources()` で既存 `access-data.js` / `access.js` / `access.css` を遅延読込する。
- `window.TratenTrailheadAccess.open()` を呼び、山情報カードの「アクセス」と同一モーダルを表示する。
- 表示後はURLから `access` / `mountain` を削除し、リロードでモーダルが再度開かないようにする。
- 旧 `trailhead-access.html` は互換用に残すが、登山口一覧からはリンクしない。

## guide.html

V1.4.242までの現行仕様に合わせ、水場監査とオンデマンドレポ検索、山域→山の資源一覧、ライブカメラ種類削除、共通アクセス画面、初期表示軽量化、気象モデルの段階反映を更新。
