# Traten V1.6.60 Release Audit

Base: V1.6.59

## Files intentionally changed
- `server.py`
- `app.js`

## Files added to this diff package
- `README_V1660.md`
- `RELEASE_AUDIT_V1660.md`

## Regression checks actually performed

### Syntax
- `python -m py_compile server.py`: PASS
  - Existing JavaScript-in-Python string SyntaxWarning for `\\s` remains; not introduced by V1.6.60.
- `node --check app.js`: PASS

### Supabase outage fallback isolated tests
- HTTP 402 classified as recoverable and activates local-only circuit breaker: PASS
- HTTP 401 is not classified as recoverable and is not masked: PASS
- With a synthetic fresh local disk snapshot, national date cache status falls back to `local-only` after Supabase failure: PASS
- While fallback is active, `_national_fetch_and_persist()` skips Supabase write/read-back and returns an `ok=True`, `backend=local-only` result using the existing fetch + local checkpoint path: PASS

### Temporary maintenance notice isolated JavaScript tests
- Render top page at 2026-09-20 00:00 JST: displayed: PASS
- Cloud Run top page at 2026-09-23 23:59 JST: displayed: PASS
- Cloud Run top page at 2026-09-24 00:00 JST: hidden: PASS
- Render `/instagram-admin`: hidden: PASS
- Other host: hidden: PASS

### Function / file regression checks
- `server.py` function count: V1.6.59 = 212, V1.6.60 = 218
  - Existing function deletion: 0
  - New helper functions: 6
- `app.js` named function count: V1.6.59 = 516, V1.6.60 = 517
  - New function: temporary maintenance notice function
- `instagram_bot.py`: SHA-256 byte-identical to V1.6.59: PASS
- Existing Render migration notice function remains present: PASS
- Existing WeatherAPI guard version remains `v1657-safe-side-v1`: PASS
- Working-tree changed production files versus V1.6.59: `server.py`, `app.js` only: PASS

## Data / asset checks
- Mountain data files (100/300 datasets) are not present in the V1.6.59 diff working package used for this build, so their row counts were not re-read in this audit: UNCONFIRMED.
- No mountain data file is included in the V1.6.60 diff ZIP: confirmed.
- Instagram assets are not changed by this diff; `instagram_bot.py` is byte-identical: confirmed.

## Not executed / unconfirmed
- A live Supabase HTTP 402 was not intentionally triggered against the production project.
- A real Cloud Run container restart during active fallback was not tested.
- Production end-to-end behavior after Supabase fair-use restriction is therefore not fully confirmed until the restriction actually occurs or an isolated staging environment reproduces it.
