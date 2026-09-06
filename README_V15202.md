# Traten V1.5.202

## Fix
- Fixed the dynamic scene-1 rendering path for Instagram static preview / reel preview.
- `_instagram_load_fresh_100_results()` now merges `lat`, `lon`, and `elevation` from the 100-mountain master point list into the fresh Supabase results.

## Root cause
- Supabase cached results only contained the forecast `result` payload, which has `grade` but not `lat/lon`.
- V1.5.201 page-1 rendering redraws A/B/C markers from `lat/lon/grade`.
- As a result, the renderer had no coordinates and raised: `scene1 marker plotting produced no output`.

## Effect
- `静止画をプレビュー` works again.
- `リールをプレビュー` works again.
- Page 1 continues to update the date and next-day A/B/C results automatically while keeping yesterday's approved design.
