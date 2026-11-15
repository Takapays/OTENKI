# V1.6.105 デプロイ確認

1. ZIP内容をGitHubリポジトリへ上書きしてください。
2. `.github/workflows/instagram-auto-post.yml` が追加されていることを確認してください。
3. GitHub Settings > Secrets and variables > Actions に `NATIONAL_CACHE_REFRESH_TOKEN` が存在し、Renderの同名環境変数と同じ値であることを確認してください。
4. デプロイ後 `/api/health` で以下を確認してください。
   - `version: "1.6.105"`
   - `instagram_auto_post_enabled: true`
   - `instagram_auto_post_separate_scheduler: true`
5. GitHub Actions > Instagram auto post > Run workflow で手動テストできます。
6. `/instagram-admin` のカルーセルプレビューは、押下直後に進捗表示へ切り替わることを確認してください。

自動投稿の定刻は毎日12:10 JST（GitHub cron: 03:10 UTC）です。
