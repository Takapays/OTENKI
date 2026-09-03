# RELEASE AUDIT V1.5.76

- Instagram自動投稿をReel動画へ変更（既定 `INSTAGRAM_AUTO_MEDIA=reel`）。
- 翌日の全国分析100座（最低98座）の実データから9:16動画を自動生成。
- 国土地理院の標準地図タイル上にA/B/Cを実座標で描画。
- 冒頭で「明日の」を強調、A/B/C集計を表示。
- 最後に主要機能（全国分析2週間先、自分専用天気予報、登山判断サポート、登山ポータル）を表示。
- オリジナル生成BGMを自動付与。
- Instagram APIへ `media_type=REELS` / `video_url` / `share_to_feed=true` で投稿。
- 静止画投稿へ戻す場合は `INSTAGRAM_AUTO_MEDIA=image`。
- 全国分析の気象取得ロジックは変更なし。
