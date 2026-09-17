# Traten V1.6.53 Release Audit

Base: V1.6.52

## Intended change
`app.js` と `server.py` の実行バージョンを同期し、管理画面のデータ監査にあるバージョン整合性チェックを正常化する。

## Root cause verified
- V1.6.52 `server.py`: `APP_VERSION = "1.6.52"`
- V1.6.52で実運用される既存 `app.js`: `APP_VERSION = '1.6.49'`
- `data-audit.html` は `TratenDataAudit.build().version` と `/api/health.version` を比較し、不一致時に監査を停止する。
- `/data-audit` は `_serve_public_html()` 経由で配信され、JS/CSSの `?v=` は実行中の `APP_VERSION` に書き換えられるため、原因はURLキャッシュではなく `app.js` 内部バージョンの未更新。

## Regression checks before packaging
PASS:
- `node --check app.js`
- `python -m py_compile server.py instagram_bot.py`
- `app.js APP_VERSION == server.py APP_VERSION == 1.6.53`
- data-audit HTML version rewriter simulation: `app.js?v=1.6.53`
- `app.js` change scope: APP_VERSION 1行のみ
- `server.py` change scope: APP_VERSIONとInstagram管理画面表示バージョンの2箇所のみ
- 10-page carousel render smoke test
- Page 9 byte identity: source promotional image SHA-256 matched rendered page 9
- Mock Instagram carousel publish: 10 child containers + 1 CAROUSEL parent
- `instagram_bot.py` byte-identical to V1.6.52

## Existing warning
`server.py` の埋め込みJavaScript正規表現 `\\s` に対する既存SyntaxWarningは継続。今回の変更対象外。

## Environment limitation
本番Render/Supabase/Instagram Graph APIへの実接続投稿は未実施。
