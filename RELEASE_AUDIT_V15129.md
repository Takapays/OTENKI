# RELEASE AUDIT V1.5.129

## UI分類

- 種類選択：`登山口・下山口 / 山頂 / 山小屋・峠` の3区分
- `hut`：山小屋・峠に表示、宿泊チェック表示
- 既存 `camp`：山小屋・峠に表示、宿泊チェック表示、UI表示名は山小屋
- `pass`：山小屋・峠に表示、宿泊チェック非表示
- `trailhead`：登山口・下山口として独立維持
- `peak`：山頂として独立維持

## 回帰確認

- 保存データは選択地点の実typeを保持するため、読込後も宿泊可否を再現。
- 山小屋の翌朝出発時刻・公式HPリンクの既存判定を維持。
- 既存テント場は旧 `camp` データとの後方互換を維持。
- 残り3点代表コース：197本のまま（変動なし）。

## 静的監査

- `node --check app.js`: PASS
- `python3 -m py_compile server.py`: PASS
- `audit_version_consistency.py`: PASS
- UI分類単体監査：PASS

