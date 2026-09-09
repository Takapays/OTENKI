# Traten V1.6.26 — 3-model mountain PoC

This release adds an **unlinked, noindex diagnostic PoC page only**:

- `/poc-models.html`
- Compare MET Norway / NOAA GFS / meteoblue for 06:00-15:00.
- Preset high mountains: Fuji, Kitadake, Okuhotaka, Yarigatake, Shirouma.
- Compare wind, gust, precipitation, temperature and per-model hourly A-E.
- Show MET-vs-GFS disagreement hours and how meteoblue resolves those disagreements.
- Show a three-model median grade for PoC inspection only. It is **not** used by production nationwide analysis.

Existing nationwide logic, route logic, CT, Instagram and user-facing screens are unchanged except the normal version/cache string bump.
