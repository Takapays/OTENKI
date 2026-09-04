# OTENKI V1.5.98

## Purpose
V1.5.97 の新デザインが旧MP4キャッシュに隠れる問題を修正。

## Changes
- Reel URL に `v=1598` を追加し、同一日付でも旧動画URLと分離。
- Reel MP4 配信に `no-store / no-cache / max-age=0` を付与。
- MP4の一時保存ディレクトリ/ファイル名も v1598 に変更し、旧生成物を再利用しない。
- V1.5.97 のPillowデザインはそのまま維持。
- Playwright / Chromium は未使用のまま。
- PC / mobile / server version を V1.5.98 に統一。
