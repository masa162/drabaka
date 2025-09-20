
import type { D1Database } from '@cloudflare/workers-types';
import { Drama } from '../types/database';

// D1の実行結果は型付けされないため、ここで型アサーションを行う
type DramaFromDB = Omit<Drama, 'featured_weekly' | 'featured_popular'> & {
  featured_weekly: number;
  featured_popular: number;
};

function convertDramaFromDB(dbObj: DramaFromDB): Drama {
  return {
    ...dbObj,
    featured_weekly: dbObj.featured_weekly === 1,
    featured_popular: dbObj.featured_popular === 1,
  };
}

export class DramaService {
  // 全ドラマ取得
  static async getAll(db: D1Database): Promise<Drama[]> {
    const stmt = db.prepare('SELECT * FROM dramas ORDER BY created_at DESC');
    const { results } = await stmt.all<DramaFromDB>();
    return results ? results.map(convertDramaFromDB) : [];
  }

  // ID指定取得
  static async getById(db: D1Database, id: number): Promise<Drama | null> {
    const stmt = db.prepare('SELECT * FROM dramas WHERE id = ?');
    const result = await stmt.bind(id).first<DramaFromDB>();
    return result ? convertDramaFromDB(result) : null;
  }

  // 放送中ドラマ取得
  static async getCurrentDramas(db: D1Database): Promise<Drama[]> {
    const stmt = db.prepare("SELECT * FROM dramas WHERE status = 'airing' ORDER BY title");
    const { results } = await stmt.all<DramaFromDB>();
    return results ? results.map(convertDramaFromDB) : [];
  }

  // 放送曜日別ドラマ取得
  static async getCurrentDramasByDay(db: D1Database): Promise<{[key: string]: Drama[]}> {
    const stmt = db.prepare("SELECT * FROM dramas WHERE status = 'airing' ORDER BY air_day, timeslot");
    const { results } = await stmt.all<DramaFromDB>();
    
    const dramasByDay: {[key: string]: Drama[]} = {
      '月曜日': [], '火曜日': [], '水曜日': [], '木曜日': [],
      '金曜日': [], '土曜日': [], '日曜日': [], 'その他': []
    };

    results?.forEach(drama => {
      const dramaConverted = convertDramaFromDB(drama);
      const day = dramaConverted.air_day || 'その他';
      if (dramasByDay[day]) {
        dramasByDay[day].push(dramaConverted);
      } else {
        dramasByDay['その他'].push(dramaConverted);
      }
    });
    
    return dramasByDay;
  }

  // 完了ドラマ取得
  static async getCompletedDramas(db: D1Database): Promise<Drama[]> {
    const stmt = db.prepare("SELECT * FROM dramas WHERE status = 'completed' ORDER BY title");
    const { results } = await stmt.all<DramaFromDB>();
    return results ? results.map(convertDramaFromDB) : [];
  }

  // 検索機能
  static async search(db: D1Database, query: string): Promise<Drama[]> {
    const stmt = db.prepare(
      "SELECT * FROM dramas WHERE title LIKE ? OR broadcaster LIKE ? OR main_cast LIKE ? ORDER BY title"
    );
    const searchTerm = `%${query}%`;
    const { results } = await stmt.bind(searchTerm, searchTerm, searchTerm).all<DramaFromDB>();
    return results ? results.map(convertDramaFromDB) : [];
  }

  // 今週の要注意ドラマ取得
  static async getFeaturedWeekly(db: D1Database): Promise<Drama | null> {
    const stmt = db.prepare(
      "SELECT * FROM dramas WHERE featured_weekly = 1 AND status = 'airing' ORDER BY featured_priority LIMIT 1"
    );
    const result = await stmt.first<DramaFromDB>();
    return result ? convertDramaFromDB(result) : null;
  }

  // 話題のドラマ取得
  static async getFeaturedPopular(db: D1Database): Promise<Drama[]> {
    const stmt = db.prepare(
      "SELECT * FROM dramas WHERE featured_popular = 1 ORDER BY featured_priority, created_at DESC LIMIT 4"
    );
    const { results } = await stmt.all<DramaFromDB>();
    return results ? results.map(convertDramaFromDB) : [];
  }
}
