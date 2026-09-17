# Traten V1.6.52 Release Audit

Base: V1.6.51

## Intended change
- Instagramカルーセルを全10枚化。
- 9枚目にユーザー支給の広告画像をそのまま追加。
- 10枚目は従来のエンドページを維持。
- 既存の表紙/7日分判定ページ/投稿API/署名付き静的配信の構成は継続。
- プレビューUIの文言と期待枚数を10枚へ更新。

## Regression checks performed before packaging
PASS:
- `python -m py_compile server.py instagram_bot.py`
  - 既存の `server.py` JavaScript文字列 `\\s` に対する SyntaxWarning は継続。新規不具合ではありません。
- Synthetic 10-page carousel render: PASS
  - 10ファイル生成を確認
  - pages 1-8,10: 1080x1920
  - page 9: 971x1619（支給広告画像をそのまま使用）
- Page 9 byte-identity check: PASS
  - 生成された9枚目PNGのSHA-256が `instagram_carousel_promo_page9.png` と一致
- Cover/end page indicators updated: PASS
  - page 1 indicator: `1/10`
  - end page indicator: `10/10`
- Preview/admin text updated to 10枚表記: PASS

## Files intentionally changed
- instagram_bot.py
- server.py
- instagram_carousel_promo_page9.png

## Files intentionally unchanged
- instagram_carousel_forecast_bg.png
- instagram_carousel_cover_master.png
- instagram_carousel_end_master.png
- instagram-carousel-logo.jpg
- Reel generation code and assets
- National weather cache/fetch logic

## Environment limitation
- Live Instagram Graph API posting was not executed in the build environment because external network access is unavailable.
- Validation was performed with local render smoke tests and static asset identity checks.
