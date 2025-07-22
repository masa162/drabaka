import { supabase } from './client';
import { Drama } from '../types/database';

export class DramaService {
  // 全ドラマ取得
  static async getAll(): Promise<Drama[]> {
    const { data, error } = await supabase
      .from('dramas')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (error) {
      console.error('Error fetching dramas:', error);
      throw error;
    }
    return data || [];
  }
  
  // ID指定取得
  static async getById(id: number): Promise<Drama | null> {
    const { data, error } = await supabase
      .from('dramas')
      .select('*')
      .eq('id', id)
      .single();
      
    if (error) {
      console.error('Error fetching drama by id:', error);
      return null;
    }
    return data;
  }
  
  // 放送中ドラマ取得
  static async getCurrentDramas(): Promise<Drama[]> {
    const { data, error } = await supabase
      .from('dramas')
      .select('*')
      .eq('status', 'airing')
      .order('title');
      
    if (error) {
      console.error('Error fetching current dramas:', error);
      throw error;
    }
    return data || [];
  }
  
  // 放送曜日別ドラマ取得
  static async getCurrentDramasByDay(): Promise<{[key: string]: Drama[]}> {
    const { data, error } = await supabase
      .from('dramas')
      .select('*')
      .eq('status', 'airing')
      .order('air_day, timeslot');
      
    if (error) {
      console.error('Error fetching current dramas by day:', error);
      throw error;
    }
    
    // 曜日別にグループ化
    const dramasByDay: {[key: string]: Drama[]} = {
      '月曜日': [],
      '火曜日': [],
      '水曜日': [],
      '木曜日': [],
      '金曜日': [],
      '土曜日': [],
      '日曜日': [],
      'その他': []
    };
    
    data?.forEach(drama => {
      const day = drama.air_day || 'その他';
      if (dramasByDay[day]) {
        dramasByDay[day].push(drama);
      } else {
        dramasByDay['その他'].push(drama);
      }
    });
    
    return dramasByDay;
  }
  
  // 完了ドラマ取得（サンプルデータ用）
  static async getCompletedDramas(): Promise<Drama[]> {
    const { data, error } = await supabase
      .from('dramas')
      .select('*')
      .eq('status', 'completed')
      .order('title');
      
    if (error) {
      console.error('Error fetching completed dramas:', error);
      throw error;
    }
    return data || [];
  }
  
  // 検索機能
  static async search(query: string): Promise<Drama[]> {
    const { data, error } = await supabase
      .from('dramas')
      .select('*')
      .or(`title.ilike.%${query}%,broadcaster.ilike.%${query}%,main_cast.ilike.%${query}%`)
      .order('title');
      
    if (error) {
      console.error('Error searching dramas:', error);
      throw error;
    }
    return data || [];
  }
  
  // 今週の要注意ドラマ取得
  static async getFeaturedWeekly(): Promise<Drama | null> {
    const { data, error } = await supabase
      .from('dramas')
      .select('*')
      .eq('featured_weekly', true)
      .eq('status', 'airing')
      .order('featured_priority')
      .limit(1)
      .single();
      
    if (error) {
      console.error('Error fetching featured weekly drama:', error);
      return null;
    }
    return data;
  }
  
  // 話題のドラマ取得
  static async getFeaturedPopular(): Promise<Drama[]> {
    const { data, error } = await supabase
      .from('dramas')
      .select('*')
      .eq('featured_popular', true)
      .order('featured_priority, created_at desc')
      .limit(4);
      
    if (error) {
      console.error('Error fetching featured popular dramas:', error);
      return [];
    }
    return data || [];
  }
}