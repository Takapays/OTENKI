# Traten V1.6.58

Base: V1.6.57

## Fix
Cloud Run / Render public top page `/` now uses the existing `_serve_public_html("index.html")` path instead of returning the raw `index.html` file.

This makes the HTML asset references follow the running server version on every release:
- `app.js?v=<APP_VERSION>`
- `styles.css?v=<APP_VERSION>`

## Why
The checked-in `index.html` still contains legacy `?v=1.6.49` asset URLs. Versioned JS/CSS responses are intentionally served with long-lived immutable cache headers. A browser that first opened Cloud Run while V1.6.53 was deployed could therefore retain the V1.6.53 JavaScript bytes under the legacy `app.js?v=1.6.49` URL and continue reusing them after later server deployments.

## Changed production files
- `server.py`
- `app.js` (version sync only)

WeatherAPI V1.6.57 behavior and the Render migration notice are unchanged.
