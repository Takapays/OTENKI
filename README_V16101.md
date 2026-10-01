# Traten V1.6.101

V1.6.101 adjusts the nationwide daily wind rule after ridge-wind integration and removes the V1.6.100 A/B-only automatic page-open re-fetch.

- Normal first paint uses the shared cache without A/B-specific automatic provider requests.
- `最新情報取り込み` still performs a deliberate full refresh.
- Opening a mountain still performs the live one-point detail calculation and writes the authoritative result back to shared cache.
- B caution remains wind >=5 m/s.
- Wind accumulation into daily C now starts at >=7 m/s (two or more qualifying hours).
- Gust >=12 m/s and rain >=0.5 mm/h remain C-accumulation conditions.
- D/E thresholds are unchanged.
