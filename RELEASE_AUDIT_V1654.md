# Traten V1.6.54 Release Audit

Base: V1.6.53

## Intended change
- `otenki.onrender.com` の公開メイン画面だけに移行案内を追加。
- 新アドレスへのクリック可能リンクを追加。
- Cloud Run版では案内を表示しない。
- 管理系ページでは案内を表示しない。
- 自動転送は実装しない。

## Production changes
### app.js
- APP_VERSION: 1.6.53 -> 1.6.54
- `showRenderMigrationNotice()` を追加。
- hostname が `otenki.onrender.com` と完全一致する場合だけ実行。
- `mountainArea` が存在する公開メイン画面だけを対象化。

### server.py
- APP_VERSION: 1.6.53 -> 1.6.54
- Instagram管理画面の表示バージョン: V1.6.53 -> V1.6.54

## Regression checks performed before packaging
PASS:
- `node --check app.js`
- `python -m py_compile server.py`
- app.js/server.py version synchronization: V1.6.54
- Render hostname + public main root -> migration notice inserted
- Cloud Run hostname -> migration notice not inserted
- Render hostname + non-main/admin page -> migration notice not inserted
- Migration link target equals `https://traten-1075463785472.asia-northeast1.run.app`
- V1.6.53 diff inspection: only the intended app.js block/version and server.py version strings changed

## Existing warning
`server.py` emits the pre-existing Python SyntaxWarning for the embedded JavaScript regex `\\s`. This warning existed before this change and the relevant line was not modified.

## Not verified in this build environment
- Final visual appearance in the live Render browser after deployment.
- Live Render/Cloud Run deployment itself.
