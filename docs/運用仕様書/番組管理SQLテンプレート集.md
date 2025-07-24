# 番組管理SQLテンプレート集

**プロジェクト**: ドラマバカ一代 v2  
**対象**: Supabase PostgreSQL Database  
**更新日**: 2025年7月24日  

## 📋 概要

このドキュメントでは、季節クール切り替えや番組ステータス管理に必要なSQLテンプレートを提供します。Supabase Dashboard → SQL Editorで実行してください。

## 🔄 番組管理ワークフロー

### 基本ワークフロー
```
1. フロントエンド確認 (localhost:3003)
   ↓
2. Supabase Dashboard SQL実行
   ↓ 
3. フロントエンド反映確認
   ↓
4. 本番環境確認 (dramabaka.com)
```

## 📊 日常管理用SQL

### 現在の番組状況確認
```sql
-- 放送中番組の一覧表示
SELECT 
  id,
  title,
  broadcaster,
  timeslot,
  status,
  year,
  season
FROM dramas 
WHERE status = 'airing'
ORDER BY timeslot;

-- 全ステータス別件数確認
SELECT 
  status,
  COUNT(*) as count
FROM dramas 
GROUP BY status 
ORDER BY status;

-- 季節・年別番組数確認
SELECT 
  year,
  season,
  status,
  COUNT(*) as count
FROM dramas 
GROUP BY year, season, status 
ORDER BY year DESC, season, status;
```

### 重複チェック
```sql
-- タイトル重複確認
SELECT 
  title,
  COUNT(*) as count
FROM dramas 
GROUP BY title 
HAVING COUNT(*) > 1 
ORDER BY title;

-- 重複エントリの詳細表示
SELECT 
  id,
  title,
  broadcaster,
  timeslot,
  created_at
FROM dramas 
WHERE title IN (
  SELECT title 
  FROM dramas 
  GROUP BY title 
  HAVING COUNT(*) > 1
)
ORDER BY title, created_at;
```

## 🎭 ステータス管理SQL

### 番組ステータスの説明
- `upcoming`: 放送予定
- `airing`: 放送中  
- `completed`: 放送終了

### 個別ステータス変更
```sql
-- 特定の番組を放送中に変更
UPDATE dramas 
SET status = 'airing' 
WHERE id = [番組ID];

-- 特定の番組を放送終了に変更
UPDATE dramas 
SET status = 'completed' 
WHERE id = [番組ID];

-- 複数番組の一括ステータス変更
UPDATE dramas 
SET status = 'airing' 
WHERE id IN ([ID1], [ID2], [ID3]);
```

### 季節クール別一括変更
```sql
-- 前クール番組を一括で放送終了に
UPDATE dramas 
SET status = 'completed' 
WHERE year = 2025 
  AND season = 'summer' 
  AND status = 'airing';

-- 新クール番組を一括で放送中に
UPDATE dramas 
SET status = 'airing' 
WHERE year = 2025 
  AND season = 'autumn' 
  AND status = 'upcoming';
```

## 🆕 新番組追加SQL

### 単一番組追加テンプレート
```sql
INSERT INTO dramas (
  title,
  broadcaster,
  timeslot,
  air_day,
  year,
  season,
  status,
  genre,
  main_cast,
  synopsis
) VALUES (
  '番組タイトル',
  '放送局名',
  '月21:00',
  '月曜日',
  2025,
  'autumn',
  'upcoming',
  'ドラマ・学園',
  '主演俳優名, 共演者名',
  'あらすじの内容をここに記載します。'
);
```

### 複数番組一括追加テンプレート
```sql
INSERT INTO dramas (title, broadcaster, timeslot, air_day, year, season, status, genre, main_cast, synopsis) VALUES
('番組1', 'フジテレビ', '月21:00', '月曜日', 2025, 'autumn', 'upcoming', 'ドラマ・恋愛', '俳優A, 女優B', 'あらすじ1'),
('番組2', 'TBS', '火21:00', '火曜日', 2025, 'autumn', 'upcoming', 'ドラマ・サスペンス', '俳優C, 俳優D', 'あらすじ2'),
('番組3', 'テレビ朝日', '水21:00', '水曜日', 2025, 'autumn', 'upcoming', 'ドラマ・コメディ', '女優E, 俳優F', 'あらすじ3');
```

## 🗂️ 季節クール切り替え手順

### 新クール開始時（例：2025年秋クール）

#### Step 1: 前クール終了処理
```sql
-- 夏クール番組を放送終了に変更
UPDATE dramas 
SET status = 'completed' 
WHERE year = 2025 
  AND season = 'summer' 
  AND status = 'airing';

-- 変更確認
SELECT title, status FROM dramas 
WHERE year = 2025 AND season = 'summer';
```

#### Step 2: 新クール番組データ準備
```sql
-- 秋クール番組を一括追加
INSERT INTO dramas (title, broadcaster, timeslot, air_day, year, season, status, genre, main_cast, synopsis) VALUES
-- ここに新番組データを記載
('新番組1', '放送局', '時間', '曜日', 2025, 'autumn', 'upcoming', 'ジャンル', 'キャスト', 'あらすじ');
```

#### Step 3: 放送開始時のステータス変更
```sql
-- 放送開始日に秋クール番組を放送中に変更
UPDATE dramas 
SET status = 'airing' 
WHERE year = 2025 
  AND season = 'autumn' 
  AND status = 'upcoming';
```

#### Step 4: 確認
```sql
-- 現在放送中の番組確認
SELECT 
  title,
  broadcaster,
  timeslot,
  season,
  status
FROM dramas 
WHERE status = 'airing'
ORDER BY timeslot;
```

## 🧹 データメンテナンス

### 古いデータのクリーンアップ
```sql
-- 2年以上前の完了番組を削除（実行前に慎重確認）
DELETE FROM dramas 
WHERE status = 'completed' 
  AND year < 2023;

-- レビューのない番組の確認
SELECT 
  d.id,
  d.title,
  COUNT(r.id) as review_count
FROM dramas d
LEFT JOIN reviews r ON d.id = r.drama_id
GROUP BY d.id, d.title
HAVING COUNT(r.id) = 0
ORDER BY d.created_at DESC;
```

### データ整合性チェック
```sql
-- 必須フィールドのNULLチェック
SELECT id, title, 'broadcaster' as missing_field
FROM dramas WHERE broadcaster IS NULL
UNION ALL
SELECT id, title, 'timeslot' as missing_field  
FROM dramas WHERE timeslot IS NULL
UNION ALL
SELECT id, title, 'status' as missing_field
FROM dramas WHERE status IS NULL;

-- 無効なステータス値チェック
SELECT id, title, status
FROM dramas 
WHERE status NOT IN ('upcoming', 'airing', 'completed');
```

## 📈 統計・分析SQL

### 番組統計
```sql
-- 放送局別番組数
SELECT 
  broadcaster,
  COUNT(*) as total_dramas,
  COUNT(CASE WHEN status = 'airing' THEN 1 END) as airing_count,
  COUNT(CASE WHEN status = 'completed' THEN 1 END) as completed_count
FROM dramas 
GROUP BY broadcaster 
ORDER BY total_dramas DESC;

-- 時間帯別番組数
SELECT 
  SUBSTRING(timeslot FROM '[0-9]+:[0-9]+') as time_only,
  COUNT(*) as count
FROM dramas 
WHERE timeslot IS NOT NULL
GROUP BY SUBSTRING(timeslot FROM '[0-9]+:[0-9]+')
ORDER BY time_only;

-- 月別番組開始数（トレンド分析）
SELECT 
  DATE_TRUNC('month', created_at) as month,
  COUNT(*) as new_dramas
FROM dramas 
GROUP BY DATE_TRUNC('month', created_at)
ORDER BY month DESC;
```

## ⚠️ 注意事項

### 実行前の確認事項
1. **バックアップ**: 重要な変更前はデータエクスポートを推奨
2. **テスト**: まずWHERE句でSELECTして対象を確認
3. **段階実行**: 大量データの変更は小分けして実行
4. **ロールバック**: 問題発生時の復旧手順を事前確認

### 実行例（安全な手順）
```sql
-- 1. まず対象を確認
SELECT id, title, status 
FROM dramas 
WHERE year = 2025 AND season = 'summer';

-- 2. 問題なければ実行
UPDATE dramas 
SET status = 'completed' 
WHERE year = 2025 AND season = 'summer';

-- 3. 結果を確認
SELECT id, title, status 
FROM dramas 
WHERE year = 2025 AND season = 'summer';
```

## 🔗 関連リンク

- **Supabase Dashboard**: https://supabase.com/dashboard
- **SQL Editor**: Dashboard → SQL Editor
- **Table Editor**: Dashboard → Table Editor → dramas
- **本番サイト**: https://dramabaka.com
- **開発環境**: http://localhost:3003

---

**運用担当者へ**: このテンプレート集を使用して安全で効率的な番組管理を行ってください。不明な点があれば開発チームにご相談ください。