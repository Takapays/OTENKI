# V1.6.106 デプロイ確認

1. GitHubへZIP展開内容を上書きしてPush。
2. Renderのデプロイ完了後 `/api/health` で `version: "1.6.106"` を確認。
3. `/instagram-admin` で「カルーセルをプレビュー」を押す。
   - 明日分の補完が必要な場合は `xx/100座` の進捗が動くこと。
   - 2〜7日先は保存済みデータがあれば短時間で通過すること。
4. GitHub Actionsの「Instagramの自動投稿」は12:10 JSTの専用workflowを継続利用。
5. `NATIONAL_CACHE_REFRESH_TOKEN` はGitHub Actions SecretとRenderで同じ値を維持。
