# Traten V1.5.183

- Added dual-ensemble weather logic.
- Open-Meteo group and independent backup group are now fetched and evaluated separately when both are available.
- Backup group: MET Norway + NOAA GFS direct + meteoblue.
- Groups receive equal weight; this is not a 4-vs-3 model majority vote.
- Cross-group disagreement lowers confidence. Safety-relevant disagreement preserves the adverse side for wind/rain/visibility, while gust/CAPE remain adverse-side maxima.
- Backup-group representative values remain median-centered to resist a single outlier.
- Timeline blending now gives equal weight to the two ensemble groups when both exist.
- Guide logic section updated with the dual-ensemble explanation.
- Version/cache busters updated to V1.5.183.
