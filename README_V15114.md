# OTENKI V1.5.114

Instagram Reelの描画を固定デザイン方式へ変更しました。

- 1枚目は承認済みの全国分析画像を固定背景として使用
- 毎日変えるのは日付と全国分析のA/B/Cマーカーのみ
- 2枚目の機能紹介画像も固定
- 3枚目の旧CTA画面は廃止
- 12秒、2画面、フェード切替、オリジナルBGM付き
- Pillow + FFmpegのみで生成し、Playwright/Chromiumは不使用
- Instagram認証、公開、重複投稿防止ロジックは変更なし

## 差分ファイル

- `instagram_bot.py`
- `server.py`
- `requirements.txt`
- `instagram-reel-map-background-v15114.png`
- `instagram-reel-features-v15114.png`

