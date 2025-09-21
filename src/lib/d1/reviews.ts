import type { D1Database } from '@cloudflare/workers-types';
import { Review, ReviewInsert } from '../types/database';

export class ReviewService {
  // ドラマ別レビュー取得
  static async getByDramaId(db: D1Database, dramaId: number): Promise<Review[]> {
    const stmt = db.prepare('SELECT * FROM reviews WHERE drama_id = ? ORDER BY created_at DESC');
    const { results } = await stmt.bind(dramaId).all<Review>();
    return results || [];
  }

  // 最新レビュー取得（ホームページ用）
  static async getLatest(db: D1Database, limit: number = 10): Promise<Review[]> {
    const stmt = db.prepare('SELECT * FROM reviews ORDER BY created_at DESC LIMIT ?');
    const { results } = await stmt.bind(limit).all<Review>();
    return results || [];
  }

  // レビュー投稿
  static async create(db: D1Database, review: ReviewInsert): Promise<Review> {
    const stmt = db.prepare(
      'INSERT INTO reviews (drama_id, nickname, rating, comment) VALUES (?, ?, ?, ?) RETURNING *'
    );
    const result = await stmt.bind(
      review.drama_id,
      review.nickname || '匿名ユーザー',
      review.rating,
      review.comment || null
    ).first<Review>();

    if (!result) {
      throw new Error('Failed to create review');
    }
    return result;
  }

  // 統計取得
  static async getStats(db: D1Database, dramaId: number): Promise<{
    total: number;
    average: number;
    brainEmojis: string;
  }> {
    const stmt = db.prepare('SELECT COUNT(*) as total, AVG(rating) as average FROM reviews WHERE drama_id = ?');
    const stats = await stmt.bind(dramaId).first<{ total: number; average: number | null }>();

    const total = stats?.total || 0;
    const average = stats?.average || 0;

    return {
      total,
      average: Math.round(average * 100) / 100,
      brainEmojis: '⭐'.repeat(Math.round(average))
    };
  }
}