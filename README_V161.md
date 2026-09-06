# Traten V1.6.1

## Purpose
V1.6.1 is a regression-recovery release based on V1.5.230. It restores previously implemented non-route behavior without intentionally removing current V1.5.230 features.

## Restored areas
- Conservative nationwide A/B/C guards, including gust handling.
- Nationwide cache chunking (default 25), per-chunk persistence, incomplete-write detection, missing-row refill, cacheOnly behavior, and original cache age/TTL metadata.
- Proactive rolling cache generation and cache update health/status fields.
- Static delivery for dedicated pages and referenced JS/CSS assets.
- Water index and route-extras availability APIs.
- Auto-refresh start/stop behavior, local inter-process lock, and update state reporting.
- Existing Instagram bot auto-post decision hook after successful cache refresh.
- Gzip/immutable versioned asset behavior, current usage-event acceptance, and IndexNow public-page set.

## Retained current behavior
- Current meteoblue/fallback model flow and current Open-Meteo 429 confidence handling.
- Current external mountain-weather links.
- Current Instagram state persistence/resume behavior and reel assets.
- Current mobile mountain-detail behavior.
- Current V1.5.230 route catalog/runtime results are protected by the included regression baseline.

## Nationwide cache default
`NATIONAL_OUTLOOK_CHUNK_SIZE` defaults to `25`. An explicit Render environment variable still overrides the default.

## Important
This FULL ZIP is intended to be deployable as a complete application tree. No production credentials, runtime cache, social-post state, or user data are included.

V1.5.230 remains the rollback target if production-only behavior reveals a problem.
