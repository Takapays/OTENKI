# TRATEN V1.6.42

meteoblue 429 diagnostic endpoint release.

- Adds `/api/diag/meteoblue` protected by the existing usage-dashboard Basic Auth.
- Sends exactly one direct, uncached, un-retried request to the same meteoblue package used by TRATEN.
- Bypasses the app's 429 circuit breaker only for diagnosis so the current upstream response can be observed.
- Returns HTTP status, elapsed time, Retry-After, common rate-limit headers, server header, and a redacted response body preview.
- Never returns the meteoblue API key.
- Existing meteoblue pacing/cooldown, weather logic, national grading, route/CT data and Instagram behavior are unchanged.
