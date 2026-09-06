# Traten V1.5.215

## Fix
- Fixed Instagram admin Reel preview crash: `Cannot set properties of null (setting 'hidden')`.
- Cause: Reel completion handler referenced removed DOM id `previewImg`.
- Fix: hide the existing `previewImg1` and `previewImg2` elements instead.
- Keeps the V1.5.214 approved Instagram A/B/C marker placement and timestamp rendering unchanged.
- Bumped app/server/cache version to V1.5.215.
