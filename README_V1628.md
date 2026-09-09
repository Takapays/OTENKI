# Traten V1.6.28

Base: V1.6.27 PoC fix.

## Weather integration policy
- Temperature: MET Norway is the primary value. Direct NOAA GFS temperature is excluded from the decision path.
- Gust: MET Norway real gust when present; meteoblue when MET gust is unavailable. Direct NOAA GFS gust is excluded from the decision path.
- Mean wind: MET Norway + NOAA GFS center. If their difference is >= 3.0 m/s and meteoblue is available, use the 3-model median as arbiter.
- Rain: MET Norway + NOAA GFS center. If their difference is >= 0.7 mm/h and meteoblue is available, use the 3-model median as arbiter.
- Missing rain/gust is kept missing; it is not converted to zero or average wind.
- meteoblue 3-hour gust data is linearly interpolated onto the 1-hour timeline for display/integration, avoiding artificial 3-hour steps.

## API-credit protection
- Nationwide map does not call meteoblue for all 300 mountains.
- meteoblue is used on national mountain detail / point analysis where its extra information is needed.
- Server-side meteoblue payload cache is 6 hours. One payload contains multiple forecast days and is reused.

## Apply
Overwrite the V1.6.27 files with this changed-files package.
