# V1.5.95 Release Audit

## Purpose
V1.5.94でChromium起動問題を越えた後、リール生成リクエストがRender edgeから `HTTP 502: empty response` となる症状を、worker落ち/OOMを主因候補として省メモリ化する。

## Changes
- Gunicorn: workers 1 / threads 2 / timeout 300 / max-requests recycle enabled.
- Chromium: renderer process limit 1, background/extension/GPU features minimized.
- Playwright: one context and one page reused for hero/map/features screenshots.
- GC: before/after synchronous Reel preparation.
- Diagnostics: `instagram_reel_preview_prepare_start`, `done`, `failed` logs.
- UI/server version markers: 1.5.95.

## Notes
502はFlaskが返した500ではなく、Render edgeがアプリprocessから正常応答を受け取れなかった時に発生する。V1.5.95はまずメモリ/worker安定性を優先する。
