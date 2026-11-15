# V1.6.109 deployment

1. Deploy normally.
2. Confirm `/api/health` reports `version: 1.6.109`.
3. Open `/instagram-admin` and press `トークン診断`.
4. Compare `environment.prefix4`, `suffix4`, and length with the valid Meta token locally; do not share the full token.
5. `directGraphProbe.ok: true` proves Render is sending a parseable token directly to Meta.
6. Then press `Instagram接続確認` and retry the post.
