# OTENKI V1.5.92

Render / Playwright deployment hotfix.

## Included changes
- `requirements.txt`: explicitly includes `playwright` while preserving the current production Python dependencies.
- `render.yaml`: build command installs both Python dependencies and the matching Playwright Chromium binary.
- `server.py`: version bump to V1.5.92.
- `index.html`: cache keys bumped to V1.5.92.

## Expected Render build command
`pip install -r requirements.txt && python -m playwright install chromium`

This package is a DIFF package. Upload/overwrite these files in the repository root.
