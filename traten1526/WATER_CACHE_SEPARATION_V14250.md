# V1.4.250 水場固定監査キャッシュの分離

## 目的
`water-mountain-cache.json` はGitHub Actionsが継続的に育てる生成データです。アプリ本体と同じ `main` に監査結果を連続commitすると、ローカル開発・通常リリースとのmergeで競合し、古いキャッシュへ巻き戻る危険がありました。

## V1.4.250の変更
- 定期水場監査の保存先を `main` から専用 `water-cache` ブランチへ分離。
- 1座ごとのcheckpoint commitは維持し、保存先だけ `water-cache` に変更。
- Render側は `water-cache` ブランチのRaw JSONを5分TTLで取得して正本として利用。
- GitHub一時障害時は直近の正常なリモート値を保持し、それも無ければローカルJSONへフォールバック。
- リリースZIPには `water-mountain-cache.json` を含めない。ZIP展開で監査進捗を巻き戻さない。

## 初回移行
V1.4.250をmainへpushすると、workflow変更のpush triggerでActionsが起動します。`water-cache` ブランチが無ければ、その時点のmain（復旧済みキャッシュを含む）から新規作成し、その後の監査結果を専用ブランチへ保存します。

## 運用
- `water-mountain-cache.json` は人手で通常リリースに含めない。
- 水場監査はActionsの `Refresh water source cache` を手動実行可能。
- 今後の定期監査commitはmainへ入らないため、通常のGitHub Desktop pull/pushと競合しにくくなります。
