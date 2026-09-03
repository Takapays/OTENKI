# RELEASE AUDIT V1.5.71

## Root cause
`nationalMountainPoint()` set `eligible` from `representativeCourseOptions(name).length > 0`.
浅間山・草津白根山 are intentionally excluded from generated representative routes (V1.5.45), so the browser removed them before POSTing `/api/national-outlook`. The server therefore correctly logged `total=98 missing_count=0`.

## Fix
- Nationwide weather eligibility now depends only on having a resolved summit coordinate.
- `eligible:true` for resolved national points.
- Route availability is retained separately as `hasRepresentativeCourse`.
- Existing route exclusions for volcanic/restricted routes remain unchanged.
- Nationwide engine remains MET Norway + NOAA GFS direct; no Open-Meteo path was added.

## Expected behavior
With the 百名山 filter selected, `/api/national-outlook` receives 100 points. If all models succeed, `national_summary total=100 returned=100 missing_count=0`. If a weather source truly fails for a mountain, `total=100 returned<100` and the mountain appears in `missing`.
