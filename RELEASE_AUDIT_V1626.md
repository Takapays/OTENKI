# V1.6.26 Release Audit — meteoblue 3-model PoC

Canonical baseline: **V1.5.231 = V1.6.1**  
Previous release: **V1.6.25**

| Item | Canonical V1.6.1 | V1.6.25 | V1.6.26 | Result |
|---|---:|---:|---:|---|
| Mountains | 300 | 300 | 300 | PASS |
| Representative routes | 415 | 416 | 416 | PASS |
| Missing CT | 0 | 0 | 0 | PASS |
| Estimated CT | 1 | 1 | 1 | PASS |
| Coordinate issues | 0 | 0 | 0 | PASS |
| Existing V1.6.25 app.js logic | - | baseline | version only | PASS |
| Existing V1.6.25 national logic | - | baseline | unchanged | PASS |
| Existing V1.6.25 Instagram logic | - | baseline | unchanged | PASS |

## Scope

V1.6.26 is a PoC-only release. It adds `poc-models.html`, makes that file available in the existing public-file allowlist, and marks it `noindex, nofollow`.

The PoC page uses existing Traten endpoints/integration:
- MET Norway via the existing proxy.
- NOAA GFS via `/api/noaa-gfs`.
- meteoblue via the already existing server-side `/api/meteoblue` proxy, so the API key remains server-side.

No production grade, national cache engine, weather blending, route data, fixed points, CT, or Instagram logic is changed.

## PoC output

For each selected mountain/date:
- 06:00-15:00 model-by-model wind / gust / precipitation / temperature.
- Hourly A-E for each model using the current hourly thresholds.
- MET↔GFS disagreement count.
- During disagreement, count of hours where meteoblue aligns with MET or GFS.
- Count of hours with a 2-of-3 exact-grade agreement.
- Maximum inter-model spread.
- A 3-model median grade for diagnostic comparison only.

## Verification

- `node --check app.js`: PASS
- embedded PoC JavaScript syntax: PASS
- `python3 -m py_compile server.py`: PASS
- `tests/test_v1626_poc.py`: PASS
- `app.js` versus V1.6.25: APP_VERSION only.
- `server.py` versus V1.6.25: APP_VERSION + PoC public-file allowlist + PoC noindex header only.
- Canonical V1.6.1 audit values: 300 mountains / 415 representative routes / missing CT 0 / estimated CT 1 / coordinate errors 0.

## Environment limitation of this build session

The build container has no `METEOBLUE_API_KEY` and cannot reach external DNS, so live forecast calls were not executed locally. The production server already contains the meteoblue server-side proxy and expects `METEOBLUE_API_KEY`; the PoC page is designed to execute live after deployment without exposing that key.

**Release decision: PASS as an isolated PoC / production forecast logic changed: NO**
