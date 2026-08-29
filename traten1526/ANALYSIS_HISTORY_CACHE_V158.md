# V1.5.8 分析履歴・共有キャッシュ設計

## 全国分析キャッシュ
- Warm cache: 日本百名山100座、翌日〜7日先、4時間fresh TTL。15分周期で1日分ずつ自動更新。
- Opportunistic cache: 二百名山・三百名山を含め、ユーザーが全国分析で取得した結果をSupabaseへupsert。4時間以内は共有再利用するが、自動巡回更新はしない。
- TTL切れでDELETEはしない。`fresh_until` と `stale_until` により利用可否を判断し、必要時に同じcache_keyへ再取得結果をupsertする。

## 個別分析履歴
既存の `usage_events` の `metadata` JSONを利用するためDBスキーマ変更は不要。V1.5.8以降の `weather_analysis` に以下を保存する。
- route_label
- route_path
- start_date / end_date
- overnight_count
- itinerary: point_name / point_type / point_role / date / time / stay

保存しないもの: 緯度経度、氏名、メール、IPアドレス、User-Agent、住所。

## 管理画面
- 直近の分析履歴: 最大100件
- 人気ルートTOP20: 山名 + 地点列で集計
- 既存の日別利用、地点、山、エラー集計は維持。
- V1.5.8以前のイベントにはitineraryがないため、過去詳細は復元しない。
