# Traten V1.6.102

V1.6.102 is a Supabase-egress reduction release based on V1.6.101.

## Changes
- Keeps the 7-day x 100-mountain rolling cache and 4-hour forecast TTL unchanged.
- Scheduled rolling-cache due checks now use metadata-only Supabase reads (`cache_key`, `generated_ts`, `fresh_until`, `stale_until`) instead of downloading each mountain's full `result` JSON.
- Background refresh interval is now at least 3600 seconds. An existing Render environment value of 900 seconds is clamped to 3600 seconds.
- The token-protected scheduled refresh endpoint skips expensive refresh work when the previous refresh finished less than one refresh interval ago. This makes the historical 15-minute GitHub wake-up schedule inexpensive without requiring an immediate workflow edit.
- National A-E thresholds, ridge-wind logic, GFS/JMA/GEFS integration, cache engine identity, 4-hour TTL, and on-demand mountain behavior are unchanged.

## Expected effect
The largest reduction is from removing full forecast-result payloads from routine seven-day freshness checks. Full result JSON is still read when a date actually needs refresh/merge work or when the user requests national results.
