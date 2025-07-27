-- 重複データ削除SQL
-- 実行日: 2025年7月26日

-- DOPE 麻薬取締部特捜課の重複を削除（古いID:42を削除、新しいID:114を保持）
DELETE FROM dramas WHERE id = 42 AND title = 'DOPE 麻薬取締部特捜課';

-- 削除確認クエリ
SELECT id, title FROM dramas WHERE title = 'DOPE 麻薬取締部特捜課';