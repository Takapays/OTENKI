# トラテン V1.6.111

Instagram専用スケジューラの二重ゲートを解消。

- GitHub Actions の専用 `/api/instagram/auto-post-start` は、旧 `INSTAGRAM_AUTO_POST` 環境変数に依存せず投稿ジョブを開始する。
- 旧全国キャッシュ更新後の自動投稿経路は従来どおり `INSTAGRAM_AUTO_POST` を尊重する。
- `/api/health` の `instagram_auto_post_enabled` は専用スケジューラが有効であることを示し、旧設定は `instagram_legacy_auto_post_enabled` に分離。
- Meta Graph互換、トークン診断、全国分析ロジックはV1.6.110から変更なし。
