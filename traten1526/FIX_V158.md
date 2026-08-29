# V1.5.8 変更内容

## 1. 全国分析の共有キャッシュ整理
- 百名山100座 × 翌日〜7日先はV1.5.7のローリングウォームキャッシュを維持。
- 二百名山・三百名山を含むオンデマンド全国分析も、ユーザーが新規取得した結果をSupabase `national_outlook_cache` へupsertする既存経路を維持・明確化。
- 4時間fresh TTL内は他ユーザーが共有再利用する。
- 二百名山・三百名山はバックグラウンド自動ウォームしない。
- TTL切れを理由にアプリからSupabase行をDELETEする処理は持たない。必要時に同じcache_keyへ再取得結果をupsertする。

## 2. 個別分析の匿名ルート履歴
`weather_analysis` の既存 `usage_events.metadata` に、V1.5.8以降は以下を保存する。
- route_label
- route_path（地点名を順番に連結）
- start_date / end_date
- overnight_count
- itinerary（point_name / point_type / point_role / date / time / stay）

保存しない情報:
- 緯度経度
- 氏名
- メール
- IPアドレス
- User-Agent
- 住所

最大40地点までに制限し、既存Supabase `usage_events` のmetadata JSONを使うためDBスキーマ変更は不要。

## 3. 管理画面
`usage-dashboard.html` に追加:
- 直近の分析履歴 最大100件
- 人気ルート TOP20
- 各分析の計画日、各地点の通過日時、泊数、地点数

過去の `weather_analysis` にはitineraryがないため、詳細履歴はV1.5.8以降のみ蓄積される。
