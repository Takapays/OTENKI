# V1.4.236 水場監査の増分・ローテーション化

## 背景
V1.4.235 の全未解決一括バッチでは GitHub Actions / public Overpass の組み合わせで 502・timeout が多発し、35/300 までしか確定できなかった。

## 変更
- 確認済みの山は再取得しない（既存35座を保持）。
- 1回のActionsで未解決16座だけ処理。
- 4座×最大4バッチ。
- 未解決は `checked_at` の古い順に選び、失敗した山は時刻更新され実質的に最後尾へ回る。
- 1バッチ最大3エンドポイントを順番に試す。
  1. `overpass.private.coffee`
  2. `maps.mail.ru`
  3. `overpass-api.de`
- 6時間ごとに自動実行。手動実行も可能。
- Actions上限5分。
- `OK / 0` と通信失敗は別扱い。通信失敗を水場なしにはしない。
- GitHub Actions の Node 20 警告回避のため checkout/setup-python を Node 24+ 世代へ更新。

## 目的
一度に300座を完成させるのではなく、確定結果を失わず数日かけてDBを育てる。public Overpass の負荷状況に左右されても、同じ山だけが永遠に先頭で詰まらない構成にする。
