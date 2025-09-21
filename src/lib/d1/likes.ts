import type { D1Database, D1PreparedStatement } from '@cloudflare/workers-types';
import { Like, LikeInsert } from '../types/database';

export class LikeService {
  // レビューのいいね数を取得
  static async getLikeCount(db: D1Database, reviewId: string): Promise<number> {
    const stmt = db.prepare('SELECT COUNT(*) as count FROM likes WHERE review_id = ?');
    const result = await stmt.bind(reviewId).first<{ count: number }>();
    return result?.count || 0;
  }

  // ユーザーがレビューにいいねしているかチェック
  static async hasUserLiked(db: D1Database, reviewId: string, userSession: string): Promise<boolean> {
    const stmt = db.prepare('SELECT id FROM likes WHERE review_id = ? AND user_session = ?');
    const result = await stmt.bind(reviewId, userSession).first();
    return result !== null;
  }

  // いいねの切り替え（トグル）
  static async toggleLike(db: D1Database, reviewId: string, userSession: string): Promise<{
    liked: boolean;
    likeCount: number;
  }> {
    const hasLiked = await this.hasUserLiked(db, reviewId, userSession);

    if (hasLiked) {
      // いいねを削除
      const deleteStmt = db.prepare('DELETE FROM likes WHERE review_id = ? AND user_session = ?');
      await deleteStmt.bind(reviewId, userSession).run();
    } else {
      // いいねを追加
      const insertStmt = db.prepare('INSERT INTO likes (review_id, user_session) VALUES (?, ?)');
      await insertStmt.bind(reviewId, userSession).run();
    }

    const newLikeCount = await this.getLikeCount(db, reviewId);

    return {
      liked: !hasLiked,
      likeCount: newLikeCount,
    };
  }

  // 複数レビューのいいね情報を一括取得
  static async getBulkLikeInfo(db: D1Database, reviewIds: string[], userSession: string): Promise<{
    [reviewId: string]: {
      count: number;
      userLiked: boolean;
    };
  }> {
    if (reviewIds.length === 0) {
      return {};
    }

    const placeholders = reviewIds.map(() => '?').join(',');

    // D1バッチを使用して2つのクエリを並行実行
    const batch: D1PreparedStatement[] = [
      // 各レビューのいいね数を取得
      db.prepare(`SELECT review_id, COUNT(*) as count FROM likes WHERE review_id IN (${placeholders}) GROUP BY review_id`).bind(...reviewIds),
      // ユーザーがいいねしたレビューを取得
      db.prepare(`SELECT review_id FROM likes WHERE review_id IN (${placeholders}) AND user_session = ?`).bind(...reviewIds, userSession)
    ];

    const [countResults, userLikedResults] = await db.batch<any>([
      batch[0],
      batch[1]
    ]);

    const likeCounts = countResults.results || [];
    const userLikedIds = new Set((userLikedResults.results || []).map(r => r.review_id));

    const result: { [reviewId: string]: { count: number; userLiked: boolean } } = {};
    const countsMap = new Map(likeCounts.map(item => [item.review_id, item.count]));

    reviewIds.forEach(reviewId => {
      result[reviewId] = {
        count: countsMap.get(reviewId) || 0,
        userLiked: userLikedIds.has(reviewId),
      };
    });

    return result;
  }
}