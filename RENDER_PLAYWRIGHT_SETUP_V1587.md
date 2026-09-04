# Render setup for V1.5.87 Reel renderer

V1.5.87 changes Reel layout rendering from Pillow drawing to HTML/CSS + Playwright/Chromium.
This is a one-time Render build setup.

## Build Command
Keep the existing Build Command and append:

```sh
./install-playwright-v1587.sh
```

Equivalent commands:

```sh
python -m pip install -r requirements-reel-v1587.txt
python -m playwright install chromium
```

Do not put Instagram tokens in the build command.

## After deploy
Open `/instagram-admin` -> `状態確認`.
`reelRenderer` should report `engine: playwright` and `package: true`.
Then run `リールをプレビュー`.

## Optional exact GSI tile background
The default uses the bundled Japan base map for reliability and overlays live A/B/C data.
If the Render instance can reach GSI tiles quickly, set:

`INSTAGRAM_REEL_USE_LIVE_GSI=1`

This switches the background to the same GSI standard-map tile source used by the nationwide site map.
If tile retrieval fails, generation automatically falls back to the bundled base map.
