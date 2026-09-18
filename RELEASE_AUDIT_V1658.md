# Traten V1.6.58 Release Audit

Base: V1.6.57

## Intended change
- Public root `/` now returns `_serve_public_html("index.html")`.
- Existing `_serve_public_html` rewrites local JS/CSS query parameter `v` to the running `APP_VERSION` and serves HTML with no-store/no-cache headers.
- `APP_VERSION` synchronized to 1.6.58 in `server.py` and `app.js`.

## Regression checks performed before packaging
PASS:
- `python -m py_compile server.py instagram_bot.py`
- `node --check app.js`
- Existing `server.py` function count unchanged: 211 AST function definitions before/after.
- `app.js` production change is version sync only.
- Render migration notice remains present and unchanged from V1.6.57, including target Cloud Run URL.
- Root HTML rewrite simulation using the production helper logic:
  - `app.js?v=1.6.58` present
  - `styles.css?v=1.6.58` present
  - legacy `app.js?v=1.6.49` absent from served HTML
  - legacy `styles.css?v=1.6.49` absent from served HTML

## Existing warning
`server.py` still emits the pre-existing Python SyntaxWarning for the JavaScript regex string `\\s`; this was not introduced by V1.6.58.

## Not changed
- WeatherAPI production assistance logic added in V1.6.57
- WeatherAPI shadow workflow
- MET Norway / GFS / meteoblue logic
- Instagram logic/assets
- mountain datasets
- Render migration notice behavior/text/link

## Post-deploy check still required
- `/api/health` reports 1.6.58 on Cloud Run and Render after their deployments.
- Opening `/` returns HTML referencing `app.js?v=1.6.58` and `styles.css?v=1.6.58`.
- Devices that previously showed V1.6.53 load V1.6.58 after normal navigation to `/`.
