import { supabase } from './client';
import { Like, LikeInsert } from '../types/database';

export class LikeService {
  // レビューのいいね数を取得
  static async getLikeCount(reviewId: string): Promise<number> {
    const { count, error } = await supabase
      .from('likes')
      .select('*', { count: 'exact' })
      .eq('review_id', reviewId);
      
    if (error) {
      console.error('Error fetching like count:', error);
      return 0;
    }
    
    return count || 0;
  }
  
  // ユーザーがレビューにいいねしているかチェック
  static async hasUserLiked(reviewId: string, userSession: string): Promise<boolean> {
    const { data, error } = await supabase
      .from('likes')
      .select('id')
      .eq('review_id', reviewId)
      .eq('user_session', userSession)
      .maybeSingle();
      
    if (error) {
      console.error('Error checking user like:', error);
      return false;
    }
    
    return data !== null;
  }
  
  // いいねを追加
  static async addLike(reviewId: string, userSession: string): Promise<Like | null> {
    // 重複チェック
    const hasLiked = await this.hasUserLiked(reviewId, userSession);
    if (hasLiked) {
      throw new Error('既にいいねしています');
    }
    
    const likeData: LikeInsert = {
      review_id: reviewId,
      user_session: userSession
    };
    
    const { data, error } = await supabase
      .from('likes')
      .insert(likeData)
      .select()
      .single();
      
    if (error) {
      console.error('Error adding like:', error);
      throw error;
    }
    
    return data;
  }
  
  // いいねを削除
  static async removeLike(reviewId: string, userSession: string): Promise<void> {
    const { error } = await supabase
      .from('likes')
      .delete()
      .eq('review_id', reviewId)
      .eq('user_session', userSession);
      
    if (error) {
      console.error('Error removing like:', error);
      throw error;
    }
  }
  
  // いいねの切り替え（トグル）
  static async toggleLike(reviewId: string, userSession: string): Promise<{
    liked: boolean;
    likeCount: number;
  }> {
    const hasLiked = await this.hasUserLiked(reviewId, userSession);
    
    if (hasLiked) {
      await this.removeLike(reviewId, userSession);
    } else {
      await this.addLike(reviewId, userSession);
    }
    
    const likeCount = await this.getLikeCount(reviewId);
    
    return {
      liked: !hasLiked,
      likeCount
    };
  }
  
  // 複数レビューのいいね情報を一括取得
  static async getBulkLikeInfo(reviewIds: string[], userSession: string): Promise<{
    [reviewId: string]: {
      count: number;
      userLiked: boolean;
    };
  }> {
    if (reviewIds.length === 0) {
      return {};
    }
    
    // いいね数を取得
    const { data: likeCounts, error: countError } = await supabase
      .from('likes')
      .select('review_id')
      .in('review_id', reviewIds);
      
    if (countError) {
      console.error('Error fetching bulk like counts:', countError);
      return {};
    }
    
    // ユーザーのいいね状態を取得
    const { data: userLikes, error: userError } = await supabase
      .from('likes')
      .select('review_id')
      .in('review_id', reviewIds)
      .eq('user_session', userSession);
      
    if (userError) {
      console.error('Error fetching user likes:', userError);
    }
    
    // 結果を集計
    const result: { [reviewId: string]: { count: number; userLiked: boolean } } = {};
    
    reviewIds.forEach(reviewId => {
      const count = likeCounts?.filter(like => like.review_id === reviewId).length || 0;
      const userLiked = userLikes?.some(like => like.review_id === reviewId) || false;
      
      result[reviewId] = { count, userLiked };
    });
    
    return result;
  }
}