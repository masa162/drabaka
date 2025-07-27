-- 古いダミーデータ修正SQL
-- 実行日: 2025年7月27日
-- 対象: トラックガール２、シンデレラ クロゼット、極道上司に愛されたら

-- 1. トラックガール２: 全項目修正（完全にダミーデータだった）
UPDATE dramas SET
  broadcaster = 'フジテレビ',
  timeslot = '火24:45',
  air_day = '火曜日',
  year = 2025,
  season = 'summer',
  status = 'airing',
  genre = 'ハートフルコメディ',
  main_cast = '遠藤さくら（乃木坂46）',
  synopsis = '女性トラック運転手「トラックめいめい」さんのSNSアカウントを原案としたFODオリジナルドラマの第2弾。人生をポジティブに過ごす女性トラック運転手の鞍手じゅんと、彼女を取り巻く愉快な仲間たちとの日常を描いたハートフルコメディドラマ。'
WHERE id = 59 AND title = 'トラックガール２';

-- 2. シンデレラ クロゼット: 全項目修正（完全にダミーデータだった）
UPDATE dramas SET
  broadcaster = 'TBS',
  timeslot = '火24:58',
  air_day = '火曜日',
  year = 2025,
  season = 'summer',
  status = 'airing',
  genre = '青春ラブストーリー',
  main_cast = '尾碕真花、松本怜生',
  synopsis = '地方から上京し、オシャレな大学生活を夢見るものの、周囲に馴染めずにいた女子大生の福永春香。ある日、憧れの先輩から食事に誘われるが、着ていく服がなく困り果ててしまう。そんな春香を救ったのは、謎の美女・神山光。実は光は女装男子で、春香は光との出会いをきっかけにメイクやファッションに目覚め、成長していくという新感覚の青春ラブストーリー。'
WHERE id = 65 AND title = 'シンデレラ クロゼット';

-- 3. 極道上司に愛されたら: 全項目修正（完全にダミーデータだった）
UPDATE dramas SET
  broadcaster = 'MBS/TBS',
  timeslot = '火24:59',
  air_day = '火曜日',
  year = 2025,
  season = 'summer',
  status = 'airing',
  genre = 'ラブストーリー',
  main_cast = '戸塚祥太（A.B.C-Z）、紺野彩夏',
  synopsis = '恋人に浮気され家を失った主人公・真琴が、社内で「極道上司」と恐れられる部長・小田切に助けられるところから始まる。しかし、小田切には極道の若頭という裏の顔があり、甘くて危険な同居生活が描かれるラブストーリー。'
WHERE id = 69 AND title = '極道上司に愛されたら';

-- 確認クエリ
SELECT 
  id,
  title,
  broadcaster,
  timeslot,
  air_day,
  main_cast,
  LEFT(synopsis, 60) as synopsis_preview,
  updated_at
FROM dramas 
WHERE id IN (59, 65, 69)
ORDER BY id;