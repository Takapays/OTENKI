#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DIST="$ROOT/dist"
rm -rf "$DIST"
mkdir -p "$DIST"
files=(
  index.html guide.html trailheads.html huts.html water-sources.html live-cameras.html trailhead-access.html
  app.js api-config.js styles.css ui-v1.4.254.css
  access.js access-data.js access.css
  resource-index.css resource-mountain-data.js
  trailheads.js huts.js hut-data.js
  water-sources.js water-sources.css
  camera-data.js live-cameras.js live-cameras.css
  trailhead-access.js
  manifest.json robots.txt sitemap.xml BingSiteAuth.xml google5a7b3dfd79ff97f0.html
  favicon.ico favicon-32.png traten-logo.png traten-logo.webp traten-icon-180.png traten-icon-192.png traten-icon-512.png
  traten-ogp-v127.png traten-ogp-v147.png
)
for f in "${files[@]}"; do
  [[ -f "$ROOT/$f" ]] && cp "$ROOT/$f" "$DIST/$f"
done
# IndexNow verification file, if present.
for f in "$ROOT"/*.txt; do
  [[ -f "$f" ]] || continue
  base="$(basename "$f")"
  [[ "$base" =~ ^[0-9a-f]{32}\.txt$ ]] && cp "$f" "$DIST/$base"
done
printf 'Static frontend built: %s files\n' "$(find "$DIST" -maxdepth 1 -type f | wc -l)"
