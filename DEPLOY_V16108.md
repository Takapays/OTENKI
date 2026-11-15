# V1.6.108 deployment

1. Overlay the package on the existing repository and push `main`.
2. Confirm `/api/health` reports `version: 1.6.108`.
3. Open `/instagram-admin`, preview the target date, then use `この予報日をInstagramへ投稿`.
4. For the dedicated scheduler test, run GitHub Actions -> `Instagram auto post` -> `Run workflow` once manually.
