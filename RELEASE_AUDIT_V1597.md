# RELEASE AUDIT V1.5.97

- Base runtime: V1.5.96
- Goal: improve Reel visual quality without reintroducing Playwright / Chromium.
- `instagram_bot.py`: Pillow-only Reel scene renderer redesigned for all three scenes.
- Scene 1: refined hero composition, A/B/C chips, map card.
- Scene 2: ABC marker-centric nationwide map plus A/C sample mountain cards.
- Scene 3: cleaned feature cards and stronger CTA.
- Output path/version names updated to v1597.
- `server.py`: APP_VERSION updated to 1.5.97.
- `index.html`: visible version and cache keys updated to 1.5.97.
- `python -m py_compile server.py instagram_bot.py`: PASS.
