# V1.4.251 水場固定監査を手動実行専用へ変更

## 変更
- GitHub Actions `Refresh water source cache` の定期cronを削除。
- workflowファイル変更時などのpush自動実行も削除。
- `workflow_dispatch` のみ残し、GitHub Actions画面の `Run workflow` から必要時に手動実行する。
- 1回の実行では未監査山を最大10座、1座ずつcheckpoint commitして `water-cache` ブランチへ保存する。
- 300/300完了後は、手動実行しない限り監査処理は起動しない。

## 維持事項
- 監査済み山は再監査対象にしない。
- 未監査・通信失敗は「水場なし」と扱わない。
- `water-mountain-cache.json` は通常リリースZIPに含めない。
- アプリ本体は `water-cache` ブランチの最新正常キャッシュを優先取得する。
