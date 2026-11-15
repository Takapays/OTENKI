# Traten V1.6.109

Instagram access-token diagnostics and runtime re-sync release.

- Adds an admin-only token diagnostic showing only safe metadata (length, first/last 4 chars, short SHA-256, whitespace/normalization flags).
- Directly probes Meta Graph `/me` with the Render environment token to separate Render-secret problems from `instagram_bot` module state.
- Normalizes `INSTAGRAM_ACCESS_TOKEN` and re-syncs it into `instagram_bot` before connection tests and publishes.
- No forecast model, rating threshold, nationwide priority, cache TTL, or Supabase egress behavior changes.
