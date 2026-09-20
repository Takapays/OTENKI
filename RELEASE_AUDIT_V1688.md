# Release Audit V1.6.88

## Scope
- index.html: scene infographic desktop grid and app.js cache-busting version.
- app.js: saved-route restore date policy and downstream overnight itinerary propagation.

## Intended behavior
1. Saved route with start date today/future: restore the exact saved dates and times.
2. Saved route with start date in the past: shift all route dates so point 01 starts tomorrow; keep all relative date offsets and point times.
3. Marking an intermediate hut/camp as overnight: recalculate all following points from next-morning departure and continue through any later overnight points.
4. PC scene report: title, score/status, and best-time remain visible and aligned.

## Static checks
- node --check app.js
- python -m py_compile server.py
- grep verification for APP_VERSION and app.js query version.

Browser / deployed-environment behavior is not claimed until tested there.
