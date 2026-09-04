# RELEASE AUDIT V1.5.98

- Base: V1.5.97
- Root cause of apparent no-change: Reel preview/public URL remained stable for the same date, allowing old MP4 cache reuse.
- `instagram_bot.reel_url()`: appends version query `v=1598`.
- Rendered file path changed to `traten-instagram-reels-v1598/...-v1598.mp4`.
- Reel endpoint disables cache and conditional reuse.
- `python -m py_compile server.py instagram_bot.py`: PASS.
