-- 重複データ削除SQL
-- 実行日: 2025年7月26日
-- 古い重複エントリを削除（新しいIDを保持）

-- 明日はもっと、い日になる (古いID:47を削除、新しいID:107を保持)
DELETE FROM dramas WHERE id = 47 AND title = '明日はもっと、いい日になる';

-- 大追跡～警視庁SSBC強行犯係～ (古いID:56を削除、新しいID:112を保持)
DELETE FROM dramas WHERE id = 56 AND title = '大追跡～警視庁SSBC強行犯係';

-- レプリカ (古いID:50を削除、新しいID:108を保持)
DELETE FROM dramas WHERE id = 50 AND title = 'レプリカ';

-- スティンガース (古いID:52を削除、新しいID:109を保持)
DELETE FROM dramas WHERE id = 52 AND title = 'スティンガース　警視庁おとり捜査係';

-- 北くん (古いID:53を削除、新しいID:110を保持)
DELETE FROM dramas WHERE id = 53 AND title = '北くんがかわいすぎて手に余るので';

-- グアム (古いID:55を削除、新しいID:111を保持)
DELETE FROM dramas WHERE id = 55 AND title = '私があなたといる理由～グアムを訪れた夫婦～';

-- 彩香ちゃん (古いID:66を削除、新しいID:113を保持)
DELETE FROM dramas WHERE id = 66 AND title LIKE '彩香ちゃんは弘子先輩に恋してる2nd%';

-- アストリッド (古いID:87を削除、新しいID:115を保持)
DELETE FROM dramas WHERE id = 87 AND title = 'アストリッドとラファエル　文書係の事件簿';

-- 削除確認クエリ
SELECT count(*) as total_count FROM dramas;

-- 重複チェッククエリ
SELECT title, count(*) as duplicate_count 
FROM dramas 
GROUP BY title 
HAVING count(*) > 1;