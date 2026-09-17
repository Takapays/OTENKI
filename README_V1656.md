# Traten V1.6.56

Base: V1.6.55

## Change
WeatherAPI.com shadow comparison JSON now records the provider location returned for each requested mountain so the representative-location rounding can be audited without changing production A-E decisions.

Added per-row fields:
- `weatherapiName`
- `weatherapiRegion`
- `weatherapiLat`
- `weatherapiLon`
- `weatherapiLocationDistanceKm`

Added top-level shadow-audit summaries:
- `weatherapiLocationsFound`
- `uniqueWeatherapiLocations`
- `sharedWeatherapiLocationGroups`
- `avgWeatherapiLocationDistanceKm`
- `maxWeatherapiLocationDistanceKm`
- `sharedWeatherapiLocations`

## Production behavior
- Existing production national A-E decision logic is unchanged.
- Existing WeatherAPI shadow `shadowGrade` calculation is unchanged.
- Existing MET Norway / GFS / meteoblue paths are unchanged.
- Existing national Supabase cache behavior is unchanged.
- Existing Instagram behavior is unchanged.
- Existing WeatherAPI daily GitHub Actions workflow is unchanged.

## Changed production files
- `server.py`
- `app.js` (version sync only)
