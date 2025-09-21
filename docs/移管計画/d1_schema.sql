-- Cloudflare D1 (SQLite) Schema for ドラマバカ一代
-- Last Updated: 2025-09-21
-- This schema is converted from the original PostgreSQL schema.

-- dramas テーブル
-- SERIAL -> INTEGER PRIMARY KEY AUTOINCREMENT
-- VARCHAR(n) -> TEXT
-- TIMESTAMP -> TEXT
-- NOW() -> datetime('now', 'localtime')
CREATE TABLE dramas (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  year INTEGER NOT NULL,
  season TEXT CHECK (season IN ('spring', 'summer', 'autumn', 'winter')),
  broadcaster TEXT NOT NULL,
  timeslot TEXT,
  air_day TEXT,
  genre TEXT,
  synopsis TEXT,
  main_cast TEXT,
  status TEXT CHECK (status IN ('airing', 'completed', 'upcoming')) DEFAULT 'airing',
  featured_weekly BOOLEAN DEFAULT FALSE,
  featured_popular BOOLEAN DEFAULT FALSE,
  featured_priority INTEGER,
  created_at TEXT DEFAULT (datetime('now', 'localtime')),
  updated_at TEXT DEFAULT (datetime('now', 'localtime'))
);

-- reviews テーブル
-- UUID -> TEXT
-- gen_random_uuid() -> lower(hex(randomblob(16)))
CREATE TABLE reviews (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  drama_id INTEGER REFERENCES dramas(id) ON DELETE CASCADE,
  nickname TEXT DEFAULT '匿名ユーザー',
  rating INTEGER CHECK (rating >= 1 AND rating <= 5) NOT NULL,
  comment TEXT,
  created_at TEXT DEFAULT (datetime('now', 'localtime'))
);

-- likes テーブル
-- UUID -> TEXT
-- gen_random_uuid() -> lower(hex(randomblob(16)))
CREATE TABLE likes (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  review_id TEXT REFERENCES reviews(id) ON DELETE CASCADE,
  user_session TEXT NOT NULL,
  created_at TEXT DEFAULT (datetime('now', 'localtime')),
  UNIQUE(review_id, user_session)
);
