# V1.5.8 Release Audit

## 実装監査
- APP_VERSION: app.js / server.py = 1.5.8
- 個別分析ログ: route_label / route_path / start_date / end_date / overnight_count / itinerary = PASS
- itinerary上限: 40地点 = PASS
- itinerary保存項目: point_name / point_type / point_role / date / time / stay のみ = PASS
- 緯度経度をitineraryへ保存しない = PASS
- metadata sanitizerで email / IP / User-Agent / address 等を除外 = PASS
- synthetic usage event 2件の集計: 分析履歴2件 / 同一ルート分析2回 / unique session 2 = PASS
- 管理画面: 分析履歴 / 人気ルートのDOM ID重複なし = PASS
- Supabase schema migration: 不要（既存 usage_events.metadata JSONを利用）

## 全国分析キャッシュ監査
- 百名山固定地点: 100 / unique 100 = PASS
- rolling days default: 7 = PASS
- fresh TTL default: 14400秒（4時間） = PASS
- GitHub Actions wake-up cron: 7,22,37,52分 = PASS
- オンデマンド全国分析の新規結果は `_national_supabase_write(date_text,points,new_results)` でSupabaseへ保存 = PASS
- バックグラウンド自動ウォーム範囲: 百名山100座 × 翌日〜7日先のみ = 維持
- national_outlook_cache をTTL切れでDELETEするアプリ処理: なし = PASS
- 二百名山・三百名山: 自動ウォームなし / ユーザー分析時の共有キャッシュ保存あり = PASS

## 気象・CT回帰監査
- progressive `async function analyze()` はV1.5.7と byte-identical = PASS
- analyze SHA-256: `af1a4462556a8cad9f1fd07dd834c122006a1b3e5e7191fa0dd1ec1af63f268e`
- mountains: 300
- representative courses: 380
- expanded directional segments: 901
- verified/composed CT: 751
- estimated CT: 134
- derived intermediate-point CT: 16
- CT missing: 0
- route build errors: 0
- point/segment alignment errors: 0

## 構文・静的監査
- Python compile: server.py / audit_water_300.py / audit_water_v2_candidates.py / audit_access_coverage.py / audit_fixed_access.py = PASS
- JS node --check: app.js / access.js / access-data.js / camera-data.js / live-cameras.js / trailheads.js / huts.js / hut-data.js / resource-mountain-data.js / water-sources.js = PASS
- YAML parse: render.yaml + GitHub workflows = PASS
- active HTML cache key: V1.5.8 = PASS

## リリースルール
- `water-mountain-cache.json`: ZIP非同梱
- `water-v2-candidates.json`: ZIP非同梱
- `WATER_V2_CANDIDATES.csv`: ZIP非同梱
- `WATER_V2_CANDIDATES.md`: ZIP非同梱
- `__pycache__`: ZIP非同梱

## 実行環境上の制約
- このコンテナにはFlaskがインストールされていないため、ローカルHTTPサーバーを起動したブラウザ/API実通信テストは未実施。
- 代わりにPython関数をAST抽出してsynthetic event集計・privacy sanitizerを実行し、JS helperもNodeで実行確認した。
