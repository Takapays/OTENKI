# RELEASE AUDIT V1.5.85

## Scope
日本百名山 Priority-C 30座を一括で通過ポイント拡充。

## Data policy
- 公開チェックポイントCTを優先。
- 公開区間CTが一部のみの場合、既存確認済み総CTとの差分だけを `derived-verified` として使用。
- 距離按分、標高差、直線距離によるCT推定は不使用。
- 新規地点座標は天気格子取得用の代表位置で、登山ナビ用途ではない。

## Safety correction
- 伊吹山: 米原市公式（2026年）で麓からの入山禁止を確認。上野登山口代表を廃止し、ドライブウェイ山頂駐車場ルートへ変更。

## Source families
- 環境省 国立公園コース: 雄阿寒岳、霧島山ほか
- 米原市公式: 伊吹山の2026年入山規制
- YAMAP公開モデルコース: 天城山、石鎚山、乗鞍岳、霧ヶ峰、八幡平ほか
- 既存V1.5.47/48確認済みネットワークCT: 阿蘇山、金峰山ほか
- 信州山学ガイド: 苗場山、美ヶ原

## Runtime audit
- C30 count: 30
- OK: 30
- FAIL: 0
- 5 points or more: 30
- node --check: PASS
- server.py / instagram_bot.py py_compile: PASS
