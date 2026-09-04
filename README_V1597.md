# OTENKI V1.5.97

## Purpose
V1.5.96 で復旧した軽量Reel生成を維持しつつ、見た目をモック寄りに再構築したデザイン改善版。

## Changes
- Reel生成は引き続き Pillow + ffmpeg の軽量構成。
- 3シーンのレイアウトを全面刷新。
- 1枚目: ヒーローカード + A/B/C集計 + 全国マップで第一印象を改善。
- 2枚目: ABCマーク中心の全国マップ + A/C判定例カードを追加。
- 3枚目: 機能紹介カードとCTAを整理し、縦長Reel向けに最適化。
- A/B/C マーク、全国マップ、無料訴求、URL導線は維持。
- PC / mobile / server version を V1.5.97 に統一。

## Runtime note
Playwright / Chromium は引き続きリール生成では未使用です。
Render Free (512MB) での安定動作を優先したまま、見た目だけを強化しています。
