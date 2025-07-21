import { supabase } from './client';
import { Review, ReviewInsert } from '../types/database';

export class ReviewService {
  // ドラマ別レビュー取得
  static async getByDramaId(dramaId: number): Promise<Review[]> {
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .eq('drama_id', dramaId)
      .order('created_at', { ascending: false });
      
    if (error) {
      console.error('Error fetching reviews:', error);
      throw error;
    }
    return data || [];
  }
  
  // 最新レビュー取得（ホームページ用）
  static async getLatest(limit: number = 10): Promise<Review[]> {
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);
      
    if (error) {
      console.error('Error fetching latest reviews:', error);
      throw error;
    }
    return data || [];
  }
  
  // レビュー投稿
  static async create(review: ReviewInsert): Promise<Review> {
    const { data, error } = await supabase
      .from('reviews')
      .insert(review)
      .select()
      .single();
      
    if (error) {
      console.error('Error creating review:', error);
      throw error;
    }
    return data;
  }
  
  // 統計取得
  static async getStats(dramaId: number) {
    const { data, error } = await supabase
      .from('reviews')
      .select('rating')
      .eq('drama_id', dramaId);
      
    if (error) {
      console.error('Error fetching review stats:', error);
      throw error;
    }
    
    const total = data.length;
    const average = total > 0 ? data.reduce((sum, r) => sum + r.rating, 0) / total : 0;
    
    return { 
      total, 
      average: Math.round(average * 100) / 100,
      brainEmojis: '🧠'.repeat(Math.round(average))
    };
  }
}