# RELEASE AUDIT V1.5.121

- Base: V1.5.120 app/server + current full `index.html` from OTENKI118 baseline.
- Root cause confirmed: desktop index referenced `app.js?v=1.5.113`; visible badges were hard-coded `V1.5.118`.
- `index.html` now references `app.js?v=1.5.121`.
- Desktop visible version: V1.5.121.
- Mobile visible version: V1.5.121.
- `APP_VERSION` in `app.js`: 1.5.121.
- `APP_VERSION` in `server.py`: 1.5.121.
- V1.5.120 traverse-preserving `loadCandidates()` code retained.
- `node --check app.js`: PASS.
- `python3 -m py_compile server.py`: PASS.
