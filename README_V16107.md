# Traten V1.6.107

Instagram carousel reliability patch on top of V1.6.106.

- Tomorrow remains fresh-first, but a complete saved set still inside the national 24-hour stale TTL is accepted immediately.
- If the rolling nationwide refresher owns the same forecast-date lock, Instagram preview/auto-post follows the Supabase checkpoints instead of failing after 3 seconds.
- Lock-follow progress is exposed as the persisted mountain count, so the admin preview can move 0/100 -> 25/100 -> 50/100 etc.
- When the date lock becomes available, only remaining rows are fetched using the existing 25-mountain chunk pipeline.
- Carousel public image delivery uses the same fresh-first/saved-fallback policy, preventing a preview from succeeding only to fail when Meta fetches the image URLs.
- Dedicated Instagram schedule remains 12:10 JST.
- Forecast engine/grades, V19 cache engine, wind 7 m/s C rule, priority mountain order and Supabase egress controls are unchanged.
