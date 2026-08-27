# V1.4.230 ライブカメラ専用ページ公開修正

原因: `server.py` の `PUBLIC_FILES` にライブカメラ専用ページ一式が未登録だったため、`/live-cameras.html` を要求しても catch-all が `index.html` を返していた。

修正: `live-cameras.html`, `live-cameras.js`, `live-cameras.css`, `camera-data.js` を公開対象に追加。
