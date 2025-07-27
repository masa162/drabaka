# SQL_temp - 一時SQLファイル作業領域

## 📋 概要
Supabase SQL Editorで手動実行するための一時SQLファイルを格納するディレクトリです。

## 🔄 運用フロー
1. **Claude Code**: 修正SQLを `SQL_temp/` に出力
2. **開発者**: ファイルを開いてコピー
3. **Supabase**: SQL Editorにペーストして実行
4. **完了後**: ファイルを `sql_archive/` に移動

## 📁 ファイル命名規則
- `fix-[内容]-YYYYMMDD-HHMM.sql`
- 例: `fix-tuesday-dramas-20250727-1500.sql`

## 🧹 メンテナンス
- **実行後**: 即座に `sql_archive/` に移動
- **未実行**: 一週間後に確認・整理
- **作業中**: `.tmp` 拡張子を付加

## 💡 利点
- ✅ ファイルの場所が明確
- ✅ 実行前後の状態管理
- ✅ 作業履歴の追跡
- ✅ gitignoreで秘匿情報保護可能