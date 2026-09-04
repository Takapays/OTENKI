# RELEASE AUDIT V1.5.87

## Reel renderer rebuild
- Replaced the old Pillow-drawn Reel layout with HTML/CSS rendered by Playwright + Chromium.
- Approved mock is treated as the layout source of truth instead of an approximate redraw.
- 1080x1920 vertical output.
- A/B/C markers are mandatory and rendered from the actual nationwide result rows.
- A/B/C count cards are mandatory.
- Hero scene includes prominent `明日の` messaging, nationwide map, CTA and Traten branding.
- Final scene uses the approved copy:
  - まったく新しい登山天気ツール
  - トラテンでできること
  - 全部無料！
  - 全国分析 / 三百名山を2週間先まで
  - 自分専用天気予報 / 通過ポイントを入れたらルート分析
  - 登山判断サポート / 時間帯別の風・雨・気温・視界
  - 登山ポータル / 登山口アクセス・ライブカメラ・山小屋HP・水場
  - 登る前に、トラテン。
  - otenki.onrender.com
- Preview and publish use the same `render_national_reel()` output path, so there is no separate visual implementation.
- Old Pillow Reel layout is no longer used as a fallback. Missing Playwright/Chromium returns an explicit error instead of silently producing the old design.

## Stability
- Playwright renders only three fixed scenes; ffmpeg encodes those scene images and original BGM.
- No per-frame browser rendering.
- Bundled Japan map is the default to avoid tile-server delays.
- `INSTAGRAM_REEL_USE_LIVE_GSI=1` optionally enables the same GSI standard tiles used by the nationwide site map, with bundled-map fallback.
- Admin status now exposes `reelRenderer` diagnostics.

## Representative course check
- Existing V1.5.78-V1.5.86 waypoint enrichment files already wrap `representativeCourseOptions` and place the added points into their representative route definitions.
- V1.5.87 does not remove or bypass those route overrides.
