# V1.6.108 release audit

## Fix
V1.6.107 carousel preview accepted a complete saved tomorrow set inside the national stale TTL, but `/api/instagram/post-national` still required `_instagram_load_fresh_100_results`. This could make preview succeed and manual publishing fail immediately.

V1.6.108 changes only the manual publish preparation path:
- tomorrow: fresh-first, complete saved fallback;
- days 2-7: saved rows inside the existing national stale TTL;
- the validated week is passed directly to the existing carousel publisher.

## Protected behavior
- Existing Meta publishing, deduplication, captions and renderer are unchanged.
- Dedicated 12:10 JST auto-post workflow is unchanged.
- National weather engine and thresholds are unchanged.
