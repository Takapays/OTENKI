# RELEASE AUDIT V1.5.96

- Base runtime: V1.5.95
- Root cause confirmed from Render Events: instance OOM above 512MB during Reel generation.
- `server.py`: Playwright startup removed; reel renderer status switched to Pillow + ffmpeg.
- `instagram_bot.py`: Playwright scene renderer replaced with Pillow-native 3-scene renderer.
- ffmpeg video path uses 720x1280, x264 ultrafast, single encoding thread.
- Synthetic 100-mountain Reel render completed locally: PASS.
- Generated MP4 size in test: ~0.9MB.
- `python -m py_compile server.py instagram_bot.py`: PASS.
- `index.html`: V1.5.96 version/cache keys confirmed.
