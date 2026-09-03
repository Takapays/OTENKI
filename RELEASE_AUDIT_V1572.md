# RELEASE AUDIT V1.5.72

## 変更
- `/instagram-admin` ブラウザ管理画面追加
- Instagram接続確認API追加
- 任意日の投稿画像プレビューURL API追加
- 手動投稿は既存の二重投稿防止を維持。force指定時のみ明示的に無視可能
- 全国分析の気象取得ロジックは変更なし（MET Norway + NOAA GFS direct）

## セキュリティ
- 管理APIは `NATIONAL_CACHE_REFRESH_TOKEN` 必須
- 管理画面自体には秘密情報を埋め込まない
- 入力トークンはURLやHTMLに保存せず sessionStorage のみ
- Instagram access tokenはレスポンスへ返さない

## 確認
- Python構文チェック
- 管理画面ルートと認証保護APIのFlask test client確認
- 差分ZIPはV1.5.71から変更されたファイルのみ
