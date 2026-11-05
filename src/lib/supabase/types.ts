type JsonArray = unknown[];
type JsonObject = Record<string, unknown>;

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string | null;
          full_name: string | null;
          avatar_url: string | null;
          role: "user" | "admin";
          bio: string | null;
          website: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email?: string;
          full_name?: string;
          avatar_url?: string;
          role?: "user" | "admin";
          bio?: string;
          website?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string;
          avatar_url?: string;
          role?: "user" | "admin";
          bio?: string;
          website?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      portfolio_visits: {
        Row: {
          id: number;
          portfolio_id: string;
          slug: string;
          viewed_on: string;
          created_at: string;
        };
        Insert: {
          id?: number;
          portfolio_id: string;
          slug: string;
          viewed_on?: string;
          created_at?: string;
        };
        Update: {
          id?: number;
          portfolio_id?: string;
          slug?: string;
          viewed_on?: string;
          created_at?: string;
        };
      };
      portfolios: {
        Row: {
          id: string;
          user_id: string;
          slug: string;
          title: string;
          bio: string;
          template: string;
          avatar_url: string | null;
          skills: string[];
          projects: JsonArray;
          experience: JsonArray;
          education: JsonArray;
          social_links: JsonObject;
          is_published: boolean;
          view_count: number;
          last_viewed_at: string | null;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          slug: string;
          title?: string;
          bio?: string;
          template?: string;
          avatar_url?: string | null;
          skills?: string[];
          projects?: JsonArray;
          experience?: JsonArray;
          education?: JsonArray;
          social_links?: JsonObject;
          is_published?: boolean;
          view_count?: number;
          last_viewed_at?: string | null;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          slug?: string;
          title?: string;
          bio?: string;
          template?: string;
          avatar_url?: string | null;
          skills?: string[];
          projects?: JsonArray;
          experience?: JsonArray;
          education?: JsonArray;
          social_links?: JsonObject;
          is_published?: boolean;
          view_count?: number;
          last_viewed_at?: string | null;
          updated_at?: string;
        };
      };
    };
  };
}

export type Portfolio = Database["public"]["Tables"]["portfolios"]["Row"];
export type Profile = Database["public"]["Tables"]["profiles"]["Row"];
