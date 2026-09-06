# Traten V1.5.219

## Instagram Bot 永続化対策
- Botの投稿原稿（caption）を投稿前に `drafts.json` へ保存するよう変更。
- 投稿済み／処理中状態 (`state.json`) も永続領域優先へ変更。
- 生成済み静止画とリールのキャッシュも同じ永続領域へ保存。
- Render Persistent Disk の標準的な `/var/data/traten-instagram` を自動利用。
- `INSTAGRAM_PERSIST_DIR` または `TRATEN_PERSIST_DIR` が設定されていれば、そのパスを最優先で利用。
- 永続領域が利用できない環境では `/tmp/traten-instagram` にフォールバックするが、その場合 `status.storagePersistent=false` で判別可能。
- state/drafts は一時ファイル + fsync + atomic replace で保存し、書き込み途中の破損を抑止。
- 原稿履歴は直近45日分を保存。

### Render 側推奨
Persistent Disk を `/var/data` にマウントしておけば、Renderの再起動・再デプロイ後も原稿・Bot状態・生成メディアを保持できます。
- 再起動でリール確定処理のバックグラウンドスレッドが消えても、保存済み `pendingCreationId` を使って次回 status/post 処理で確定処理を自動再開。
- `/var/data` が単なるエフェメラル領域の場合は永続と誤判定せず、`status.storagePersistent=false` と警告を返す。
