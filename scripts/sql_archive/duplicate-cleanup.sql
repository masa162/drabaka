-- ドラマデータベース重複エントリ削除SQL
-- 実行日: 2025年7月24日
-- 目的: 古い不完全なエントリを削除し、新しい詳細なエントリを保持

-- 削除対象エントリ（7月22日作成の基本情報のみ）
-- 各タイトルについて、より古く詳細情報が少ないエントリを削除

-- 1. しあわせな結婚 (ID 30 を削除、ID 60 を保持)
DELETE FROM dramas WHERE id = 30;

-- 2. 大追跡～警視庁SSBC強行犯係 (ID 28 を削除、ID 56 を保持)
DELETE FROM dramas WHERE id = 28;

-- 3. 明日はもっと、いい日になる (ID 25 を削除、ID 47 を保持)
DELETE FROM dramas WHERE id = 25;

-- 4. 能面検事 (ID 31 を削除、ID 67 を保持)
DELETE FROM dramas WHERE id = 31;

-- 5. 誘拐の日 (ID 26 を削除、ID 51 を保持)
DELETE FROM dramas WHERE id = 26;

-- 削除後の確認クエリ
-- 重複チェック
SELECT title, COUNT(*) as count
FROM dramas 
GROUP BY title 
HAVING COUNT(*) > 1 
ORDER BY title;

-- 総件数確認
SELECT COUNT(*) as total_dramas FROM dramas;