# Release Audit V1.5.61

## Scope
地点別予報カードの視認性と風情報の意味を整理。

## Changes
- 気温・平均風速・雨・視界の主要数値タイポグラフィを統一。
- 風カード名を「平均風速」に変更。
- 風向の角度（例: 170°）を削除し、方位のみ表示。
- 既存の突風データがある場合は「最大瞬間 ○m/s」を併記。
- バージョンを 1.5.61 へ更新。

## Non-scope
- 気象計算ロジックそのものは変更なし。
- CT、経路、座標、アクセス情報は変更なし。

## Verification
- JavaScript syntax: PASS
- Python syntax: PASS
- Version consistency: PASS
- ZIP integrity: PASS
