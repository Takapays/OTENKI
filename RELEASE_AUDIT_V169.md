# V1.6.9 data-audit connection audit

## Root cause corrected
The admin audit page was not auditing the same runtime as the main app.

1. `/data-audit` served `data-audit.html` directly, bypassing the server's JS/CSS version rewriter.
2. `data-audit.html` hard-coded `app.js?v=1.5.14`. Because versioned JS is served as immutable for one year, an old cached app.js could survive indefinitely.
3. More importantly, the audit page loaded only `app.js`. The main `index.html` loads 39 runtime JS files, including representative route enrichment, cleanup, regression recovery and V1.6.2 recovery layers. Therefore even a current app.js alone is not the complete runtime catalog.

## V1.6.9 correction
- `/data-audit` now uses `_serve_public_html("data-audit.html")`, which rewrites every local JS/CSS query to the running `APP_VERSION`.
- `data-audit.html` contains exactly the same 39 runtime script sources as V1.6.9 `index.html`, in the same order.
- Each runtime script has an onerror guard. Any asset failure stops the audit instead of displaying partial counts.
- The audit calls `/api/health` and requires server version == runtime data version. A mismatch stops the audit.
- Reload now reloads the page/runtime instead of only recalculating in memory.

## Regression containment
No route, CT, fixed point, weather, forecast, or representative-course data was edited.
`app.js` is byte-identical to V1.6.8 after normalizing the single APP_VERSION line.
`index.html` is byte-identical to V1.6.8 after normalizing visible version metadata and `?v=` cache keys.
V1.6.8 PC representative-course UI is therefore retained unchanged.

Baseline lineage: V1.5.231 = V1.6.1 is the canonical recovery baseline. V1.6.9 is a differential correction on top of V1.6.8.
