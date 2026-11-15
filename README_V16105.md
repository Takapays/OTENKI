# トラテン V1.6.105

Instagram自動投稿と管理画面プレビューの安定化リリースです。

## 変更点
- Instagram自動投稿を全国キャッシュ更新HTTPから分離。
- 毎日12:10 JSTに専用GitHub Actionsから `/api/instagram/auto-post-start` を起動。
- 専用ジョブは必要な7日分の百名山freshキャッシュを補完してから既存の投稿・重複防止ロジックを実行。
- カルーセルプレビューを非同期化。管理画面は2秒ごとに進捗を取得し、キャッシュ確認・画像生成中を表示。
- カルーセル枚数を `instagram_bot.CAROUSEL_PAGE_COUNT` / 実URL数から動的取得し、旧UIの10枚固定チェックを廃止。
- Instagram管理画面の古いV1.6.54表示をV1.6.105へ修正。
- `/api/health` に専用Instagramスケジューラ状態を追加。

全国分析の判定エンジン、風7m/s基準、V1.6.104の主要山優先25座、Supabase省エグレス設計は変更していません。
