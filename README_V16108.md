# Traten V1.6.108

Instagram manual publish consistency fix.

- Manual publish now uses the same fresh-first / saved-fallback cache policy as carousel preview.
- A successful preview can no longer be followed by an immediate `fresh nationwide cache is incomplete` failure solely because tomorrow rows crossed the 4-hour fresh TTL.
- Manual publish validates the saved 7-day carousel set and passes that exact set to the existing Instagram publisher.
- Dedicated 12:10 JST GitHub Action auto-post path is unchanged.
- National forecast engine V19, wind-7 threshold, priority-25 progressive refresh, and Supabase egress controls are unchanged.
