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
          created_at: string;
        };
        Insert: {
          id: string;
          email?: string;
          full_name?: string;
          avatar_url?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string;
          avatar_url?: string;
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
          avatar_url: string | null;
          skills: string[];
          projects: JsonArray;
          experience: JsonArray;
          education: JsonArray;
          social_links: JsonObject;
          is_published: boolean;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          slug: string;
          title?: string;
          bio?: string;
          avatar_url?: string | null;
          skills?: string[];
          projects?: JsonArray;
          experience?: JsonArray;
          education?: JsonArray;
          social_links?: JsonObject;
          is_published?: boolean;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          slug?: string;
          title?: string;
          bio?: string;
          avatar_url?: string | null;
          skills?: string[];
          projects?: JsonArray;
          experience?: JsonArray;
          education?: JsonArray;
          social_links?: JsonObject;
          is_published?: boolean;
          updated_at?: string;
        };
      };
    };
  };
}

export type Portfolio = Database["public"]["Tables"]["portfolios"]["Row"];
export type Profile = Database["public"]["Tables"]["profiles"]["Row"];
