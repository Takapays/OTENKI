# Traten V1.6.94

Hotfix for nationwide cold-cache failure introduced in V1.6.92/93.

When no in-process per-point cache existed, `_national_fetch_shared()` dereferenced `cached.get(...)` while `cached` was `None`, so each 25-mountain chunk failed before forecast providers were called. V1.6.94 adds the missing cold-cache guard.

Forecast logic and the V18 cache engine are unchanged.
