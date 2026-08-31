# GitHub Desktop

## Summary
V1.5.58 Fix release version and cache refresh

## Description
- Fix index.html still showing V1.5.52 after later deployments.
- Align app.js, server.py, visible HTML version and asset cache-busters to V1.5.58.
- Force index HTML and SPA fallback HTML to revalidate/no-store so a new deployment cannot keep an old document shell.
- Add an automated version-consistency audit to catch future release mismatches.
- No CT, coordinates, mountain data or weather logic changes.
