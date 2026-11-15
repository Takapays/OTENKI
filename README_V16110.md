# Traten V1.6.110

Instagram Graph host compatibility fix.

- Keeps the valid Render `INSTAGRAM_ACCESS_TOKEN` and existing System User setup.
- For EAA... Facebook/System User tokens, legacy `instagram_bot` Graph calls are forced from `graph.instagram.com` to `graph.facebook.com`.
- `/api/instagram/test-connection` now probes the configured `INSTAGRAM_USER_ID` directly instead of the legacy bot transport.
- Token diagnostic now reports both the System User `/me` probe and the target Instagram account probe.
- Manual and dedicated auto-post paths use the same compatibility wrapper.
- Weather judgment, V19 engine, 7 m/s wind threshold, priority-25 ordering, and Supabase egress logic are unchanged.
