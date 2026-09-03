# V1.5.67 Instagram 全国分析 Bot

## 目的
翌日の日本百名山100座の全国判定が **fresh 100/100** になった後、Instagramへ全国分析画像を1日1回だけ自動投稿し、プロフィールのリンクからトラテンへ誘導します。

## 安全条件
- 対象は常に「翌日」だけ。7日先行キャッシュが完成しても複数日を連投しません。
- `INSTAGRAM_AUTO_POST_HOUR_JST`（初期値17時）より前は投稿しません。
- fresh 100/100未満では投稿しません。stale行は投稿画像に使いません。
- ローカル状態に加え、Instagram直近投稿の `#tratenYYYYMMDD` を確認してRender再起動後の二重投稿を防ぎます。
- Instagram APIエラーは全国キャッシュ更新の成否に影響させません。
- アクセストークンはコードに保存しません。

## Render環境変数
- `INSTAGRAM_USER_ID` : Instagram Professional accountのID
- `INSTAGRAM_ACCESS_TOKEN` : Content Publishing権限を持つアクセストークン
- `INSTAGRAM_IMAGE_SECRET` : 投稿画像URL署名用の任意の長いランダム文字列（推奨）
- `INSTAGRAM_GRAPH_API_VERSION` : 初期値 `v24.0`。Meta側の利用可能バージョンに合わせて変更可能
- `INSTAGRAM_GRAPH_BASE_URL` : 初期値 `https://graph.instagram.com`。利用するMeta認証方式が別Graphホストを要求する場合に変更可能
- `PUBLIC_BASE_URL` : `https://otenki.onrender.com`
- `INSTAGRAM_AUTO_POST_HOUR_JST` : 初期値 `17`
- `INSTAGRAM_AUTO_POST` : 初期値 `0`。テスト完了後に `1`

## 導入手順
1. InstagramをProfessional（Business/Creator）にする。
2. Meta側でInstagram APIのContent Publishingを利用できるアプリ/トークンを用意する。
3. Renderに上記環境変数を設定する。最初は `INSTAGRAM_AUTO_POST=0` のまま。
4. `GET /api/instagram/status` を `X-Traten-Cache-Token` 付きで呼び、`tomorrowFreshCount=100` を確認する。
5. `POST /api/instagram/post-national` を同じヘッダー付きで呼び、手動投稿を1回確認する。
6. 問題なければ `INSTAGRAM_AUTO_POST=1` に変更する。

## 手動投稿API
`POST /api/instagram/post-national`

ヘッダー:
- `Content-Type: application/json`
- `X-Traten-Cache-Token: <NATIONAL_CACHE_REFRESH_TOKEN>`

本文例:
```json
{"date":"2026-09-04","force":false}
```

`force=true` は同日再投稿を許すため、通常運用では使用しません。

## 投稿画像
1080 x 1350 JPEG。トラテンロゴ、A/B/C座数と比率、A/C判定の山の例、サイト誘導を表示します。
サーバーに日本語フォントがある場合は自動利用します。必要なら `INSTAGRAM_FONT_PATH` でサーバー内フォントを指定できます。


## V1.5.67 変更
- 浅間山・草津白根山が取得できない通常状態を考慮し、Instagram投稿の最低件数を100件から98件へ変更。
- `INSTAGRAM_MIN_NATIONAL_RESULTS` 未設定時は98。97件以下は投稿拒否。
- 投稿画像の説明文を「取得できた百名山で比較」に変更。
