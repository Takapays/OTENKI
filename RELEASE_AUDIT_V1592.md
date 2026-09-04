# V1.5.92 Release Audit

## Purpose
Fix Render deployment failures around Playwright installation.

## Verified package state
- requirements.txt contains `playwright`: PASS
- requirements.txt preserves Flask / gunicorn / eccodes / Pillow / japanize-matplotlib / imageio-ffmpeg: PASS
- render.yaml installs requirements before running `python -m playwright install chromium`: PASS
- server APP_VERSION = 1.5.92: PASS
- index cache keys bumped from 1.5.91 to 1.5.92: PASS

## Notes
The observed Render error `No module named playwright` occurs when the browser install command runs before Playwright is present in the environment. This release guarantees the repository-level dependency and build sequence are both present in the diff.
