# Supabase運用概要とドラマバカ一代v2での実装

## Supabaseとは
**Supabase = Firebase代替のオープンソースBaaS（Backend as a Service）**
- PostgreSQLベースのリアルタイムデータベース
- REST API・GraphQL API自動生成
- 認証・ストレージ・Edge Functions内蔵

## 一般的なSupabase運用フロー

### 1. 開発環境での作業
```mermaid
開発者 → ローカル開発 → Supabase Dashboard → 本番環境
```

### 2. データ管理の基本パターン
- **SQL Editor**: 直接SQLでデータ操作
- **Table Editor**: GUI でのデータ編集
- **API経由**: アプリケーションからの操作

### 3. 運用レベル別アプローチ

#### レベル1: 開発・プロトタイプ段階
- Supabase Dashboard でのGUI操作
- SQL Editorでの直接データ投入
- **本件該当**: 現在この段階

#### レベル2: 小規模運用段階  
- アプリケーション内での管理画面
- CSV インポート機能
- **本件目標**: ドラマデータの効率的管理

#### レベル3: 本格運用段階
- 自動データ同期
- 外部API連携
- バックアップ・監視体制

## 本件（ドラマバカ一代v2）での具体的運用

### 現在の構成
```
Next.js App ←→ Supabase PostgreSQL
    ↓              ↓
Web UI         Dashboard GUI
```

### データベース構造（実装済み）
```sql
-- ドラマテーブル
dramas (
  id: 自動採番
  title: "タイトル" 
  broadcaster: "TBS" ← 必須だが不足
  air_day: "月曜日" ← CSVにあり
  timeslot: "21:00" ← 調査必要
  year: 2025
  season: "summer"
  status: "airing"
)
```

### 推奨データ投入戦略

#### Phase 1: 基本データ投入（今回）
```sql
-- 最小限の情報で投入
INSERT INTO dramas (title, air_day, year, season, broadcaster, status)
VALUES 
  ('あんぱん', '月曜日', 2025, 'summer', '調査中', 'airing'),
  ('明日はもっと、いい日になる', '月曜日', 2025, 'summer', '調査中', 'airing');
```

#### Phase 2: 詳細情報追加
```sql
-- 後から詳細を UPDATE
UPDATE dramas 
SET broadcaster = 'TBS', timeslot = '月21:00'
WHERE title = 'あんぱん';
```

### データ管理の3つの方法

#### 方法1: Supabase Dashboard（現在推奨）
- **メリット**: GUI で簡単、SQL不要
- **用途**: 開発段階、少量データ
- **手順**: Table Editor → Insert row

#### 方法2: SQL Editor（効率的）
- **メリット**: 一括処理、正確性
- **用途**: まとめてデータ投入
- **手順**: SQL Editor → INSERT文実行

#### 方法3: アプリケーション経由（将来）
- **メリット**: ユーザビリティ、運用効率
- **用途**: 日常的なデータ更新
- **実装**: 管理画面機能

## 本件での推奨アプローチ

### 今回のドラマデータ投入手順

1. **放送局情報の調査** ⭐️ **現在ここ**
   ```
   主要ドラマ10-15本の放送局・時間を調査
   → パターンを把握
   → 残りは「調査中」で投入
   ```

2. **段階的データ投入**
   ```sql
   -- Step1: 調査済みドラマ
   INSERT INTO dramas (title, broadcaster, timeslot, air_day...)
   
   -- Step2: 未調査ドラマ
   INSERT INTO dramas (title, broadcaster='調査中', air_day...)
   ```

3. **継続的な情報更新**
   ```
   週次で放送局情報を調査・更新
   → 番組表サイトから情報収集
   → UPDATE文で更新
   ```

### データ品質管理

#### 優先度付けアプローチ
```
高優先度: 人気ドラマ、地上波キー局
中優先度: 準キー局、BS局  
低優先度: CS局、配信限定
```

#### 情報ソース
- **公式サイト**: 各局の番組表
- **テレビ情報サイト**: Yahoo!テレビ、TVer等
- **ドラマ情報サイト**: ザテレビジョン等

## 運用上の注意点

### セキュリティ
- **RLS（Row Level Security）**: 既に設定済み
- **API Key管理**: 環境変数で適切に管理済み

### パフォーマンス
- **インデックス**: 検索頻度の高いカラムに設定
- **キャッシュ**: Next.js ISRで自動キャッシュ

### コスト
- **Free Tier**: 月間500MB、50,000 API calls
- **本件規模**: 十分に無料枠内で運用可能

## 次のアクション

1. **主要ドラマ15本の放送局調査**（30分程度）
2. **SQL INSERT文の生成**（15分程度）  
3. **Supabase Dashboard でのデータ投入**（10分程度）
4. **サイドバー表示の確認**（5分程度）

**合計所要時間: 約1時間**

---

このアプローチで進めることで、実用的なデータを素早く構築できます。どの部分から始めますか？