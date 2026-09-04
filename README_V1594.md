# V1.5.94

## Render / Playwright hotfix
- Chromium installation moved from the Reel preview HTTP request to server startup.
- Multi-worker startup is serialized with a deploy-local file lock.
- Reel requests never download Chromium; missing browser now returns a fast JSON error.
- Instagram admin API parser now shows HTTP status and response body instead of only `response parse error`.
- Gunicorn timeout raised to 300 seconds for first deploy startup/render margin.
- UI/server/cache version markers unified to V1.5.94.
