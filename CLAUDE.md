# CLAUDE.md — foodsurprise-strategy

株式会社フードサプライズ様の法人向け営業戦略サイト。**作業前に必ず読むこと。**

## このリポジトリは何か
- 山形ギフト（うまいもんセット／13ヶ月定期便）の**B2B営業戦略提案書**。
- 成果物は **単一ファイルの静的HTMLデッキ**（`index.html`）を **Vercel** に置くもの。
- 提案の核：**「13ヶ月定期便を売るのではない。13回、企業を思い出してもらう “年間感謝カレンダー” として届ける」**。この軸は勝手に変えない。

## ファイル構成
```
index.html               # デッキ本体。CSS・画像（Base64）すべて内包の単一ファイル
vercel.json              # cleanUrls + 全パスを index.html へ rewrite
README.md                # デプロイ前提（直下に index/vercel/README を置く）
deep-research-report.md  # 根拠データ（数字・出典はここ）
260227_…営業資料.pptx     # 元素材（参照用・直接編集しない）
…プレ商談台本.docx        # 元素材（参照用・直接編集しない）
```

## 編集の鉄則
- **単一ファイル主義**：`index.html` はCSS・JS・**画像（Base64埋め込み）まで内包**。
  README記載の通り **assets フォルダは作らない**。画像追加も外部参照せず Base64 で埋める。
- **色はハードコードしない**。`:root` のCSS変数を使う：
  `--green #174f3b / --gold #bd8b2f / --orange #d76522 / --ink #1e2723 / --bg #eef2f0 / --paper #fff`（他 green2/green3/gold2/orange2/muted/line）。
- **A4ページ構造を踏襲**：`.page` = 794×1123px（A4・印刷/モバイル対応済み）。
  新規ページは既存 `.page` を複製してから中身を差し替える。
- **フッターのページ番号を必ず更新**（各 `.page > .footer` に連番。現状 1〜13）。
- 既存の**コンポーネントクラスを再利用**（独自スタイルを増やさない）：
  `.cover` `.section-title` `.box(.gold/.orange)` `.quote(.big)` `.two-col` `.three-col`
  `.card(.goldline/.orangeline)` `.product-card` `.market-box` `.rank` `.script(.script-title)`
  `.roadmap/.step` `.final-message` `.footer` `table(.orange-head)`。
- フォント体系は既存維持：本文＝明朝（Yu Mincho等）、ラベル/英字＝Georgia、表/タグ＝Yu Gothic。

## 文章ルール
- 書き言葉（営業文面・フォーム・メール）は **「御社」ではなく「貴社」**。
- **数字・統計は捏造しない**。根拠は `deep-research-report.md`。出せないものは空欄か「要確認」。
- 提案は**仮説として**置く（断定しない）。末尾の「成果を保証するものではない」注記のトーンを保つ。
- 優先3動線（住宅・工務店／自動車ディーラー／士業・地域密着BtoB）の構成を軸にする。

## デプロイ
- README記載通り **リポジトリ直下に `index.html` / `vercel.json` / `README.md`**。
- 案件ごとの独立Vercelデプロイ（標準運用）。`vercel.json` の rewrite は触らない限り維持。

## 作業フロー
1. 構成変更（ページ追加・順序変更・コンセプト調整）は **plan mode で骨子を合意してから**着手。
2. 文言だけの修正は該当 `.page` セクションのみ触る。`:root` やCSSは読まなくてよい。
3. レイアウト/トークン変更は `<style>` 内のみ。各セクションの文言は触らない。
4. 確認：`index.html` をブラウザで直接開く（依存なし）。印刷プレビューでA4崩れも確認。
5. 画像は Base64 で埋め込む（ファイルが肥大する点に注意。不要画像枠は削除する方針）。
