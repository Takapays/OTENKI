# V1.6.110 deploy check

After deploy:

1. Open `/instagram-admin` and run Token diagnostic.
2. Confirm `directGraphProbe.ok=true`.
3. Confirm `targetInstagramProbe.ok=true`; this verifies the configured Instagram account through `graph.facebook.com` with the current EAA System User token.
4. Run Instagram connection check.
5. Preview the carousel, then run manual publish once.

No new Render environment variable is required.
