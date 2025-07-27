# SQL Archive - 実行済みSQLファイル保管庫

## 📋 概要
このディレクトリは実行済みのSQLファイルを保管する場所です。

## 📁 ファイル分類

### 🗓️ 2025年7月26日 - 大規模データ更新
- `drama-data-update-20250726.sql` - CSVデータ45件の一括処理用SQL
- `insert-new-dramas.sql` - 新規ドラマ9件の追加SQL
- `fix-incomplete-manual.sql` - 未完了データ4件の修正SQL

### 🔄 重複データ解決
- `remove-duplicate.sql` - DOPE重複削除
- `remove-all-duplicates.sql` - 全重複データ8件削除
- `duplicate-cleanup.sql` - 重複クリーンアップ
- `summer-dramas-insert.sql` - 夏ドラマ追加

### ✏️ 個別修正
- `update-astrid-status.sql` - アストリッド放送状況修正
- `fix-corrections-0727.sql` - 0727チェック結果修正（3件）
- `fix-dummy-data-0727.sql` - ダミーデータ修正（3件）

## 🔧 運用ルール
1. **実行済みSQL**: 実行後すぐにこのディレクトリに移動
2. **ファイル命名**: `作業内容-YYYYMMDD.sql` 形式推奨
3. **実行記録**: 各ファイルに実行日時をコメント記載

## 📊 実行統計
- **総実行SQL数**: 10件
- **処理ドラマ数**: 59件（重複削除含む）
- **最終更新**: 2025年7月27日