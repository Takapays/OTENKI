# Traten V1.6.90 Release Audit

## Baseline
- Baseline: V1.6.89
- Scope: 全国分析のキャッシュ年齢表示のみ。

## Implemented change
V1.6.89では、全国分析ボタン実行後のレスポンスでは `cache.ageSeconds` / `cache.freshRemainingSeconds` を表示していましたが、初期表示・日付変更時の `cacheOnly:true` レスポンスでは表示していませんでした。

V1.6.90では、`loadNationalOutlookSharedCacheOnly()` の共有キャッシュ表示にも同じ値を追加表示します。

表示例:
`キャッシュ年齢 約35分 / 4時間TTL残り 約205分（キャッシュヒット）`

## Protected behavior
- `cacheOnly:true` は引き続きキャッシュだけを読み、JMA等の同期取得を開始しない。
- 全国分析の判定ロジック、A-E判定、MET Norway / NOAA GFS / JMA補完処理は変更なし。
- Supabase primary / local fallback の切替ロジックは変更なし。
- 4時間TTL (`14400秒`) は変更なし。
- ブラウザキャッシュキー/エンジンIDは変更なし。

## Version synchronization
- app.js: 1.6.90
- server.py: 1.6.90
- index.html visible version: V1.6.90
- app.js cache-buster: `?v=1.6.90`

## Verification
- `node --check app.js`
- `python3 -m py_compile server.py`
- V1.6.89差分確認: app.jsはバージョン更新＋cacheOnly表示へのキャッシュ年齢追加のみ。server.pyはバージョンのみ。index.htmlは表示バージョン/cache-busterのみ。
- 実ブラウザ/本番ネットワーク動作は未確認。デプロイ後に全国分析を開き、ボタンを押さずキャッシュ年齢が表示されることを確認する。
