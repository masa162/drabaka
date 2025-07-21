// Database type definitions for Supabase
export type Database = {
  public: {
    Tables: {
      dramas: {
        Row: {
          id: number;
          title: string;
          slug: string;
          year: number;
          season: 'spring' | 'summer' | 'autumn' | 'winter';
          broadcaster: string;
          timeslot: string | null;
          air_day: string | null;
          genre: string | null;
          synopsis: string | null;
          main_cast: string | null;
          status: 'airing' | 'completed' | 'upcoming';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          title: string;
          slug: string;
          year: number;
          season: 'spring' | 'summer' | 'autumn' | 'winter';
          broadcaster: string;
          timeslot?: string;
          air_day?: string;
          genre?: string;
          synopsis?: string;
          main_cast?: string;
          status?: 'airing' | 'completed' | 'upcoming';
        };
        Update: {
          title?: string;
          slug?: string;
          year?: number;
          season?: 'spring' | 'summer' | 'autumn' | 'winter';
          broadcaster?: string;
          timeslot?: string;
          air_day?: string;
          genre?: string;
          synopsis?: string;
          main_cast?: string;
          status?: 'airing' | 'completed' | 'upcoming';
          updated_at?: string;
        };
      };
      reviews: {
        Row: {
          id: string;
          drama_id: number;
          nickname: string;
          rating: number;
          comment: string | null;
          created_at: string;
        };
        Insert: {
          drama_id: number;
          nickname?: string;
          rating: number;
          comment?: string;
        };
        Update: {
          nickname?: string;
          rating?: number;
          comment?: string;
        };
      };
      likes: {
        Row: {
          id: string;
          review_id: string;
          user_session: string;
          created_at: string;
        };
        Insert: {
          review_id: string;
          user_session: string;
        };
        Update: never;
      };
    };
  };
};

// Type aliases for easier use
export type Drama = Database['public']['Tables']['dramas']['Row'];
export type DramaInsert = Database['public']['Tables']['dramas']['Insert'];
export type DramaUpdate = Database['public']['Tables']['dramas']['Update'];

export type Review = Database['public']['Tables']['reviews']['Row'];
export type ReviewInsert = Database['public']['Tables']['reviews']['Insert'];
export type ReviewUpdate = Database['public']['Tables']['reviews']['Update'];

export type Like = Database['public']['Tables']['likes']['Row'];
export type LikeInsert = Database['public']['Tables']['likes']['Insert'];