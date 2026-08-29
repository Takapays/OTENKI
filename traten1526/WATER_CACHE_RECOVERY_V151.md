# V1.5.1 Water Cache Recovery

## Cause
The completed water audit cache was found in historical main commit `ea3633c` (300/300 checked, 61 mountains with candidates), while the current application expects the authoritative cache on the dedicated `water-cache` branch. The branch had never actually been created, so the remote fetch returned no data and the release ZIP intentionally had no local fallback cache.

## Fix
- Keep `water-mountain-cache.json` excluded from normal release ZIPs.
- Server fetch order: dedicated `water-cache` branch -> immutable recovery commit `ea3633c` -> local fallback.
- If all cache sources are unavailable, `/api/water-mountain-index` now returns HTTP 503 instead of reporting a legitimate-looking 0-mountain audit.
- On the first manual water audit after this release, if `water-cache` does not yet exist, GitHub Actions seeds it from immutable commit `ea3633c`, then resumes against the current 300-mountain list and pushes checkpoint commits to `water-cache`.
- Current V1.5.1 list differs from the recovered cache by exactly three names: new `茶臼岳（那須岳）`, `丹沢山`, `観音岳(鳳凰)` replace old `三本槍岳`, `塔ノ岳`, `地蔵岳(鳳凰)`. The workflow therefore preserves the 297 matching audited rows and audits only the three new representative mountains.

## Release rule
`water-mountain-cache.json` remains excluded from both changed-files and full release ZIPs.
