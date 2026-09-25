# V1.6.93 デプロイ後チェック

1. `/api/health` で `version: "1.6.93"` を確認。
2. `national_cache_engine` は **V1.6.92と同じ** `metno-gfs-jma-ridge-gust-worstof-v18-gefs-fallback` のままであることを確認。
3. `national_cache_active_backend` が通常時 `supabase-primary` であることを確認。
4. 既存V1.6.92キャッシュは互換なので、今回のデプロイで全日付を作り直す必要はない。
5. 問題が出た日付で「全国を判定」を1回実行し、0座のまま `混み合っています` へ落ちないことを確認。
6. JMA範囲外の日（今日+4以降）を確認し、NOAA GFS稜線風またはGEFSフォールバックが使えることを確認。
7. 上空風取得に失敗しても、ベースのGFS風・雨などが取得できれば全国マップ自体は表示されることを確認。
8. GEFSが使われる場合は詳細の稜線風に `NOAA GEFS アンサンブル平均（補助）` が表示されることを確認。
9. キャッシュ年齢 / 4時間TTL残り表示が初期表示・日付切替で継続表示されることを確認。
10. もし再び0座になる場合は、Render/Cloud Runログの `national_metno_partial`, `national_gfs_failed_all`, `national_gefs_failed_all`, `national_missing` の行を確認する。
