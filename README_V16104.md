# Traten V1.6.104

V1.6.104 accelerates manual nationwide 「最新情報取り込み」 without changing A-E forecast semantics.

- MET Norway, deterministic NOAA GFS, and JMA MSM are fetched concurrently for each batch.
- Manual refresh is split into 25-mountain requests and the map updates after every batch.
- Priority is no longer north-to-south: the first 25 are 10 Alpine/major high mountains plus representative mountains across Japan; the next 50 are two additional curated priority groups; the final 25 are the remaining 百名山 in stable catalog order.
- Each request contains only its 25 mountains, avoiding four repeated full-100 Supabase result reads.
- GEFS and meteoblue remain selective second-stage fallbacks only.
- The temporary 11/7 maintenance notice now says analysis is available via the 「最新情報を取り込み」 button.
- V1.6.102 Supabase egress controls and V1.6.101 wind-7 grading remain unchanged.
