# Traten V1.6.57

Base: V1.6.56

## 1. WeatherAPI.com safe-side production guard
WeatherAPI.com remains a secondary source. The existing MET Norway / NOAA GFS / meteoblue nationwide decision remains the base grade.

Production rule:
- WeatherAPI never improves the base A-E grade.
- A production downgrade is considered only when WeatherAPI is 2+ grades worse AND `maxRain >= 1.5 mm/h` OR `severeHours >= 2`.
- Today / tomorrow and WeatherAPI returned-location distance <= 10 km: downgrade by at most one grade.
- Day +2: warning only.
- Returned-location distance > 10 km: warning only.
- Daily WeatherAPI overlay is carried across later MET/GFS cache refreshes for up to 36 hours, and is recomputed from the newly fetched base grade to avoid cumulative downgrades.
- WeatherAPI attribution/warning is shown in the nationwide mountain detail when WeatherAPI metadata is present.

The daily WeatherAPI workflow still runs once per day and now also writes `weatherapi-shadow-summary.json` into the artifact. The summary contains match rate, 2+ grade divergence, optimistic/pessimistic counts, distance-bin divergence, production adjustments and warnings.

## 2. Render migration notice
The legacy Render public top page (`otenki.onrender.com` `/` or `/index.html`) displays:

`トラテンは新しいアドレスへ移行しました　新アドレスはこちら`

The link points to:
`https://traten-1075463785472.asia-northeast1.run.app`

The notice is not shown on Cloud Run or Render admin/API paths. V1.6.57 includes the notice implementation directly, so deployment of V1.6.54 is not a prerequisite for the notice code to exist in this release.

## Changed production files
- `server.py`
- `app.js`
- `.github/workflows/weatherapi-shadow-refresh.yml`

## Added release files
- `README_V1657.md`
- `RELEASE_AUDIT_V1657.md`
