# V1.6.106 Release Audit

## Scope
Instagramカルーセルの待ち時間改善のみ。全国分析の判定ロジックは変更しない。

## Changes
- 1日目はfresh必須。
- 2〜7日先はSupabaseのfresh + stale TTL内の保存済み行を利用可能。
- 保存済み行が不足する日だけ不足山を取得。
- 既存25座チャンクごとに管理画面・自動投稿ジョブへ山単位進捗を通知。
- 自動投稿は事前準備した7日分データをそのままpublisherへ渡し、投稿段階で7日freshを再要求しない。
- signed carousel static endpointも同じ1日目fresh / 未来日保存済み可の読み取り方に統一。

## Protected behavior
- V19 engine unchanged.
- cumulative wind C threshold 7m/s unchanged.
- 25-mountain chunk size unchanged.
- priority order / MET-GFS-JMA parallel acquisition unchanged.
- Supabase metadata-only egress reductions unchanged.
- 12:10 JST dedicated Instagram workflow unchanged.

## Local checks
- Python compile: PASS
- Node syntax: PASS
- V1.6.106 Instagram policy regression: PASS
- egress / notice / progressive / V1.6.101 behavior regression: PASS
