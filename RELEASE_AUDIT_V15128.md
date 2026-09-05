# RELEASE AUDIT V1.5.128

## 3点コース改善
フル読み込み相当（app.js + 既存route-enrichment群 + cleanup）で、今回対象4コースを3点状態から解消。

- 三ッ峠山 / 三ツ峠登山口ルート
  - 三ツ峠登山口 → 四季楽園 → 三ッ峠山 → 四季楽園 → 三ツ峠登山口
  - directional CT: 76 / 18 / 5 / 66 min
- 武奈ヶ岳 / イン谷口ルート
  - イン谷口 → 金糞峠 → 武奈ヶ岳 → 金糞峠 → イン谷口
  - directional CT: 98 / 97 / 76 / 85 min
- 阿蘇山（高岳） / 仙酔峡駐車場・仙酔峡登山口ルート
  - 同一固定座標の細分化済み仙酔峡ルートがあるため冗長3点版のみ除外
- 霧島山（韓国岳） / えびの高原・韓国岳登山口ルート
  - 同一固定座標の細分化済み韓国岳・大浪池周回があるため冗長3点版のみ除外

## Source verification
- 四季楽園座標: PORTALFIELD/mikketa 公開位置 北緯35°32′58″ 東経138°48′25″、標高1727m。
- 三ッ峠山CT: YAMAP 三ッ峠山・御坂側モデルコース公開チェックポイント合算。
- 金糞峠座標: 公開登山記録GPS表 35.1452, 135.5424、標高校正878m。
- 武奈ヶ岳CT: YAMAP 金糞峠-コヤマノ岳-武奈ヶ岳往復モデル公開チェックポイント合算。

## Regression checks
- 三ッ峠山 / 三ツ峠登山口: missing CT 0, estimated CT 0
- 武奈ヶ岳 / イン谷口: missing CT 0, estimated CT 0
- 仙丈ヶ岳: existing split route CTs remain non-estimated
- 甲斐駒ヶ岳: existing split route CTs remain non-estimated
- 赤岳: existing split route CTs remain non-estimated

## Static checks
- `node --check app.js`: PASS
- `python3 -m py_compile server.py`: PASS
- ZIP integrity: PASS

Browser/Render production visual verification is not performed in this environment.
