-- アストリッドとラファエル　文書係の事件録のステータス更新
-- 実行日: 2025年7月26日
-- 3-5月放送終了のため、statusをcompletedに変更

UPDATE dramas SET
  status = 'completed',
  season = 'spring'
WHERE id = 115 AND title = 'アストリッドとラファエル　文書係の事件録';

-- 更新確認クエリ
SELECT id, title, status, season, year, broadcaster 
FROM dramas 
WHERE id = 115;