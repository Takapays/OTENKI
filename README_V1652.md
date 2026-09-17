# Traten V1.6.52

Base: V1.6.51

## Change
Instagramカルーセルを9枚構成から10枚構成へ変更しました。

- 既存の1枚目（表紙）、2〜8枚目（7日分の判定ページ）、最終CTAページの流れは維持。
- ユーザー指定の広告画像を**加工せずそのまま**9枚目として追加。
- 既存の最終ページは10枚目へ移動。
- カルーセルのページ表示、プレビューUI、投稿結果のページ数表示を10枚へ更新。
- キャッシュキー（CAROUSEL_RENDER_REV）を更新し、旧9枚キャッシュを再利用しないようにしました。

## Added production asset
- instagram_carousel_promo_page9.png

## Changed production files
- instagram_bot.py
- server.py
- instagram_carousel_promo_page9.png
