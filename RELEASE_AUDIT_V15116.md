# Release audit V1.5.116

- Fixed missing A/B/C map markers in Instagram reels.
- Root cause: cached Supabase forecast results lacked `lat` and `lon`; the Pillow renderer skipped every row.
- Coordinates and elevation are now merged from the 300-point mountain master before rendering.
- Bumped reel asset/cache version from 15115 to 15116.
- Preserved the 294/300 freshness requirement introduced in V1.5.115.
