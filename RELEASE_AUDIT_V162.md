# RELEASE AUDIT V1.6.2

## Release scope
V1.6.1を基準に、現行成果を保護したまま次を統合した。

1. 代表コース0件の6山を過去版と現行安全規制で再監査。
2. 箱根山に現在利用可能な「駒ヶ岳頂上駅→箱根駒ヶ岳→神山→頂上駅」を固定座標・公開方向別CTのみで復旧。旧大涌谷ルートは復活させない。
3. 渡島駒ヶ岳・太平山は現在利用可能な代替ルートを確認したが、固定地点座標を十分に確定できないため推測登録しない。
4. 景鶴山・草津白根山・桜島は安全規制上、過去の山頂コースを復活させない。
5. 全国先行キャッシュは300座・翌日〜7日・25座単位チェックポイントを維持。
6. GitHub workflowはschedule/manualのみに固定し、concurrencyを追加。回復可能な429/取得タイムアウト等の部分更新はJSON上の未完了を保持したままschedulerAcceptedとして扱う。DB書込/読戻し・設定不備はHTTP 503を維持。
7. guide.htmlを現行のmeteoblue/MET Norway/Open-Meteo/NOAA GFSロジックと300座キャッシュ仕様に同期。

## Representative-route regression result
V1.6.1 runtime baseline → V1.6.2:
- mountains: 300 → 300
- representative routes: 415 → 416
- no representative: 6 → 5
- CT missing: 0 → 0
- estimated CT: 1 → 1
- derived/proportional CT: 0 → 0
- coordinate issues: 0 → 0
- sparse fixed-waypoint mountains: 156 → 155

全300山のruntimeカタログ比較で変更を許可した山は箱根山のみ。その他299山はV1.6.1と一致。

## Cache requirements
- `NATIONAL_PREFETCH_COUNT` default: **300**
- `NATIONAL_OUTLOOK_CHUNK_SIZE` default: **25**
- 25座ごとに取得→保存→読戻し確認を行い、300座対象を維持する。
- `pull_request` trigger: **なし**
- workflow: schedule + workflow_dispatch
- concurrent duplicate scheduler run: suppressed by GitHub Actions concurrency

## Automated verification
- Python regression/function suite: **48 PASS** (`TRATEN_ALLOW_FRAMEWORK_STUB=1`)
- Pure JavaScript cache suite: **10 PASS**
- Route regression audit: **PASS** (approved catalog delta = 箱根山のみ)
- 300 mountains: PASS
- local referenced JS: syntax checked separately at packaging
- protected server functions: existing retained-feature audit remains in package

## Test limitation
Pythonの48テストはframework/network/DB doublesを使用し、実Flask/Render/Supabase/GitHub Actions/外部APIを呼んでいない。添付メールは従来workflowが約9分で失敗したことを示すが、詳細step logはないため、V1.6.2は確認できたscheduler/PR-trigger/部分更新の失敗条件を改善し、実本番成功済みとは主張しない。

## Newly identified regressions
- guide.htmlが300座実装に対して百名山100座と記載していた。
- 箱根山は旧大涌谷ルート除外後、合法な代替ルート再開後も代表コース0件のままだった。
- 添付GitHub画面ではpull_request起動だった一方、V1.6.1配布ZIP内workflowはschedule/manualのみで、repo main側と配布物のworkflow状態に不一致があった。

Rollback target: **V1.6.1**.
