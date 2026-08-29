# V1.4.228 Model Role Blend

- Wind baseline: ECMWF IFS when available.
- Rain baseline: JMA MSM when available.
- Visibility reference: ICON when available.
- CAPE: maximum across available models.
- GFS adverse guard: CAUTION when materially worse than the blended baseline.
- JMA MSM already used via Open-Meteo JMA API.
- Direct LFM is not added due to official distribution route and large GRIB2 files.
- SCW is not scraped or embedded.
