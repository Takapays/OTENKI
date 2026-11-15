# V1.6.110 release audit

Scope: Instagram Graph transport only.

- Version synchronized to 1.6.110 in server/app/index.
- Direct token `/me` probe retained.
- New direct target Instagram account probe added.
- Legacy bot calls are wrapped so EAA Facebook/System User tokens use `graph.facebook.com`.
- No change to forecast engine, grade thresholds, national cache TTLs, priority ordering, or Supabase refresh policy.
