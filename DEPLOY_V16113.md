# V1.6.113 deploy

GitHubへZIP内容を上書きしてデプロイ。`.github/workflows/national-cache-refresh.yml` も上書き対象です。
Renderの既存環境変数は変更不要です。

デプロイ後 `/api/health` で以下を確認:
- version: 1.6.113
- national_scheduled_refresh_interval_seconds: 900
- national_scheduled_chunk_size: 10

GitHub Actions「全国キャッシュを更新する」を手動実行し、300秒以内にJSONが返ることを確認してください。
