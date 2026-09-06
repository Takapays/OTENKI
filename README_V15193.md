# Traten V1.5.193

## Instagram Reel preview cache fix
- `/api/instagram/reel-preview-url` no longer fails immediately just because the 4-hour nationwide cache is incomplete.
- The Instagram path now fetches only missing/expired nationwide rows on demand, writes successful rows back to Supabase, and reuses them for the Reel.
- If only a few rows still fail upstream, the existing unexpired stale cache (maximum 24 hours) can complete the set instead of dropping the entire preview.
- `_instagram_load_fresh_100_results()` now returns the actual available rows instead of converting every sub-98 result to an empty list, so error counts are meaningful.
- Minimum nationwide count remains 98; no threshold was lowered.
