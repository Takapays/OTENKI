# OTENKI V1.5.96

## Purpose
Render Free (512MB) でリールプレビュー生成時に発生していた OOM / HTTP 502 を解消する軽量化版。

## Changes
- リール生成から Playwright / Chromium を完全に除外。
- Pillow で 9:16 の3シーンを直接描画。
- 全国マップ上の A / B / C マーカーを維持。
- ffmpeg は 720x1280 / threads=1 / ultrafast で低メモリ化。
- Gunicorn は 1 worker / 2 threads / timeout 300 を継続。
- Instagram status の reelRenderer は `pillow+ffmpeg` を返す。
- PC / mobile / server version を V1.5.96 に統一。

## Render note
現在 Render Dashboard の Build Command に Playwright install が残っていても動作上は問題ありません。
V1.5.96 のリール生成処理は Chromium を起動しません。
