# Traten V1.6.57 Release Audit

Base: V1.6.56

## Intended changes
1. WeatherAPI.com safe-side production guard for nationwide A-E results.
2. Daily WeatherAPI comparison summary artifact.
3. Render legacy-site migration notice made independent of `#mountainArea` presence and restricted to the legacy public top page.

## Regression checks performed before packaging
PASS:
- `python -m py_compile server.py instagram_bot.py`
- `node --check app.js`
- `server.py` existing top-level functions removed: 0
- Existing server functions changed: only `_national_fetch_and_persist` and `_weatherapi_shadow_collect`
- Added server helpers only:
  - `_weatherapi_guard_base_result`
  - `_weatherapi_guard_overlay`
  - `_weatherapi_guard_carry_forward`
  - `_weatherapi_daily_summary`
- `instagram_bot.py` byte-identical to V1.6.56
- WeatherAPI guard dependency-controlled tests:
  - 2+ grade worse + material adverse weather + today + <=10 km => maximum one-grade downgrade
  - WeatherAPI optimistic result never improves production grade
  - >10 km => warning only
  - day +2 => warning only
  - weak adverse evidence => no production change
  - daily summary exact / divergence / optimistic / pessimistic counts
  - carry-forward recomputes from a newly fetched base grade instead of cumulatively downgrading the old adjusted grade
- Render notice host/path tests:
  - `otenki.onrender.com/` => shown
  - `otenki.onrender.com/index.html` => shown
  - Render admin path => hidden
  - Cloud Run host => hidden
- WeatherAPI workflow schedule remains `35 21 * * *` (06:35 JST daily)
- Workflow still targets the Cloud Run production WeatherAPI refresh endpoint
- Workflow artifact now includes both full comparison JSON and summary JSON

## Existing warning
`server.py` still emits the pre-existing Python SyntaxWarning for the embedded JavaScript regex `\s`. This warning existed before V1.6.57 and was not introduced by this release.

## Not verified in this build environment
- Live WeatherAPI.com 100-mountain execution after V1.6.57 deployment
- Live Supabase write/read-back of the production WeatherAPI overlay
- Live Render browser display after deployment
- Live Cloud Run nationwide UI display after deployment

These items require deployment and runtime verification. They are not marked PASS here.
