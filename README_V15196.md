# Traten V1.5.196

## Scope
- Reduce Instagram Reel preview/post rendering memory usage.
- Keep the approved 1080x1920 / 12-second Reel design while changing the rendering pipeline.
- Prevent accidental on-demand public Reel regeneration.

## Changes
- Replaced the per-frame JPG sequence pipeline with a low-memory still-scene pipeline.
- Rendered only two full-resolution still scenes and composed the final MP4 with ffmpeg loops/concat.
- Added a per-date render lock to prevent duplicate concurrent Reel rendering in the same process.
- The signed public Reel endpoint now serves only a ready cached MP4 and returns 503 until prepared.
- Bumped app/server/index version strings to 1.5.196.

## Intended effect
- Avoid holding 144 full-size frame files and related Pillow/ffmpeg buffers during preview/post preparation.
- Greatly reduce transient memory pressure on smaller Render instances.

## Verification
- python -m py_compile server.py instagram_bot.py : PASS
- node --check app.js : PASS
