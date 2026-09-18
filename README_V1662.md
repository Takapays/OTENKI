# Traten V1.6.62

Base: V1.6.61

## Change
Adds a daily Open-Meteo JMA MSM shadow comparison for the Japan 100 mountains.

- Shadow only: does not change the production national A-E decision.
- 100 mountains x 4 forecast days.
- 25 mountains per Open-Meteo request: normally 4 API calls per day.
- Runs daily at 06:20 JST via GitHub Actions and can also be run manually.
- Uses `/v1/jma` with `models=jma_msm`.
- Sends each registered mountain elevation explicitly and uses `cell_selection=nearest`.
- Uses 06:00-15:00 JST hourly values.
- Captures temperature, precipitation, humidity, cloud cover and 10 m wind.
- Compares the JMA MSM shadow grade with the existing national grade and reports exact / one-step / two-plus differences and JMA-worse / JMA-better counts.
- Saves the JSON as a GitHub Actions artifact for 30 days.

## Important limitation
JMA MSM through this API path has no native wind-gust, CAPE or visibility inputs used by other Traten paths. V1.6.62 does not fabricate those values. Therefore the JMA MSM `shadowGrade` is a comparison signal, not a production-grade replacement.

## Not changed
- Production MET Norway / GFS / meteoblue national decision
- WeatherAPI safety-side overlay
- Supabase local-only fallback
- Route UI and saved routes
- Instagram logic
