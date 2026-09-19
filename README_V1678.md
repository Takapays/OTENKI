# V1.6.78

- Fixed missing nationwide ridge-wind estimates for lower summits by replacing the old 1200 m hard cutoff with a surface-to-850 hPa blend from 500-1500 m.
- National cache now rejects mountain rows that lack same-generation JMA ridge-wind evidence, preventing nearby mountains from being graded on different wind inputs.
- National detail uses the shared JMA cache first and performs one direct JMA fallback request only when ridge-wind series is missing.
- Bumped nationwide cache engine so old rows without ridge evidence are not reused.
- No A-E threshold changes in this release.
