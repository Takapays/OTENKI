# V1.6.105 Release Audit

## Scope
Instagram scheduling / preview UX only. Forecast decision semantics are protected.

## Fixed
- Nationwide refresh no longer waits for Instagram publishing.
- Dedicated scheduled Instagram job with polling status endpoint.
- Carousel preview no longer performs 7-day cache fill synchronously in the browser request.
- Admin UI reports cache-fill progress and render progress.
- Carousel page count is dynamic; the stale hard-coded 10-page expectation is removed.
- Admin version label is synchronized to V1.6.105.

## Protected behavior
- National engine: `metno-gfs-jma-ridge-gust-worstof-v19-cumulative-wind7` unchanged.
- Daily cumulative C wind threshold: 7 m/s unchanged.
- GEFS fallback / meteoblue arbiter logic unchanged.
- Supabase TTL / egress controls unchanged.
- V1.6.104 popular-mountain priority and progressive 25-mountain manual refresh unchanged.
- Existing Instagram publishing and remote duplicate-prevention functions are reused, not replaced.
