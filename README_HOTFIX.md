# V1.5.85 Reel Preview Hotfix 3

## Root cause
`/api/instagram/national-reel/<date>` calls Flask `send_file(...)`, but `server.py` imported only `send_from_directory` and did not import `send_file`.

The Reel itself could be generated successfully, then the response failed with `NameError: name 'send_file' is not defined`, producing `instagram_national_reel_failed` and causing the browser video element to show a load error.

## Fix
- Add `send_file` to the Flask import in `server.py`.
- No other behavior changed.

## Deploy
Replace `server.py` only, then redeploy/restart Render.
