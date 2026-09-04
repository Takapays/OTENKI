# V1.5.95

Render Freeでリール生成時に `HTTP 502: empty response` になる問題への省メモリ修正です。

- Gunicornを 2 workers x 4 threads から 1 worker x 2 threads へ削減。
- Chromiumを1 renderer processに制限。
- 3シーンごとにブラウザページを作り直さず、1 context / 1 pageを再利用。
- リール生成の前後でGCを実行。
- Renderログへリール生成 start / done / failed を明示。
- `MALLOC_ARENA_MAX=2` を設定してPython/Glibcのメモリ膨張を抑制。
- PC/モバイル/server/cache keyをV1.5.95へ統一。
