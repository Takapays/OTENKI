# TRATEN V1.6.38

Route-point meteoblue reliability fix.

- meteoblue route-point requests: max 2 concurrent
- one retry for transient HTTP 429 / 5xx
- explicit failure reason in model details when meteoblue cannot be fetched
- cache/version keys synchronized to V1.6.38

No weather grading thresholds or route data are changed.
