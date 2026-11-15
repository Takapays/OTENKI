# V1.6.107 release audit

## Scope
Instagram cache coordination only. No forecast-grade/model changes.

## Fixed
- V1.6.106 could fail a carousel preview with `{"YYYY-MM-DD":0}` when the nationwide rolling refresher held the same date lock.
- V1.6.107 follows that existing writer for up to 15 minutes, polling Supabase checkpoints every 2 seconds.
- Tomorrow is fresh-first, with a complete saved set inside the existing 24-hour stale TTL accepted as a bounded fallback.
- If the lock is later acquired, only missing/fresh-due rows are filled using the existing 25-row chunk path.
- Meta-facing carousel static image loading uses the same tomorrow fallback, eliminating preview/publish policy mismatch.

## Preserved
- V19 national engine ID.
- Daily C cumulative wind threshold 7 m/s.
- 25-mountain progressive nationwide refresh and curated priority order.
- Supabase metadata-only scheduled status checks and 3600-second interval gate.
- Dedicated Instagram scheduler at 12:10 JST.

## Verification
See bundled V1.6.107 tests. Python compile and JS syntax checks are run before packaging.
