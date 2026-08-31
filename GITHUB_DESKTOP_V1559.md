# GitHub Desktop - V1.5.59

Summary:
`V1.5.59 Fix stale access-data cache`

Description:
- Fixes Ontake access information remaining unavailable after deployment.
- Root cause was optional assets still using the fixed cache key `v=1.4.242` while Render served versioned assets as one-year immutable cache.
- Makes optional assets follow `APP_VERSION`, so V1.5.59 loads `access-data.js?v=1.5.59`.
- Confirms both `田の原登山口` and `中の湯登山口（黒沢口）` exist in the live access DB payload.
- No CT, coordinate, route graph, or weather logic changes.
