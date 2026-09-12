# Traten V1.6.51 Release Audit

Base: V1.6.50

## Intended change
- Carousel preview route checks the seven required dates as before.
- If a date has fewer than the required fresh Hyakumeizan rows, preview generation foreground-fills only that missing date using the existing national-cache acquisition/persistence path.
- The existing per-date national cache lock is reused so preview generation does not duplicate a normal UI/scheduled refresh.
- Freshness threshold remains unchanged; stale results are not accepted.
- If refill still cannot reach the minimum, the route returns a 409 with the incomplete dates.

## Regression checks performed before packaging
PASS:
- `python -m py_compile server.py instagram_bot.py`
- `node --check app.js`
- Preview-refill helper tests: 4 scenarios
  1. already-complete date performs no refill
  2. incomplete date fetches only missing rows and releases the existing date lock
  3. busy date lock waits/re-reads and does not duplicate-fetch or unlock another worker's lock
  4. seven-day preparation refills only incomplete dates
- Approved V1.6.50 page-2 implementation preview was re-rendered byte-for-byte identical (SHA-256 matched).
- Full 9-page carousel render smoke test succeeded at 1080x1920 for all nine pages.
- `national-100-points.json`: 100 unique rows
- `national-runtime-points-v161.json`: 300 unique rows
- `national-300-points.json`: 300 unique rows
- Critical V1.6.50 files byte-identical after this fix:
  - app.js
  - index.html
  - instagram_bot.py
  - instagram_carousel_forecast_bg.png
  - national-100-points.json
  - national-runtime-points-v161.json
  - national-300-points.json
  - instagram-carousel-logo.jpg
  - instagram-japan-base.png
- Critical server functions confirmed unchanged:
  - `_instagram_load_fresh_100_results`
  - `_refresh_rolling_100_cache`
  - `_instagram_post_with_lock`
  - `instagram_reel_preview_url`
  - `instagram_reel_preview_status`
  - `instagram_carousel_static`
  - `instagram_national_static`
  - `instagram_national_reel`
  - `instagram_post_national`

## Existing warning
`server.py` still emits the pre-existing Python SyntaxWarning for the JavaScript regex string `\\s`; this was present before V1.6.51 and was not changed.

## Environment limitation
A live Supabase/upstream-weather end-to-end request could not be executed in the build environment because external network access is unavailable. The refill path itself was exercised with dependency-controlled regression tests, and the production cache/fetch functions it calls were not modified.
