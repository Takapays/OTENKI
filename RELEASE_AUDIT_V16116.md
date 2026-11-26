# V1.6.116 audit
- Existing server.py, app.js and index.html differ from V115 only by version strings.
- cloud_run_national_job.py is byte-identical to V115.
- Added cloud_run_instagram_job.py and mock test: dry run, publish, incomplete cache, invalid account, wrong image origin and publish failure tests passed.
- All existing V115 test scripts (version strings updated), Python compilation and node --check app.js passed. Existing SyntaxWarning in embedded JS remains.
- This is an overlay ZIP, not a complete repository. The existing instagram_bot.py and assets are retained in the user's repository and were not available in this overlay for full end-to-end local verification. Live Meta, GCP image endpoint, permissions and actual publishing remain to be tested.
