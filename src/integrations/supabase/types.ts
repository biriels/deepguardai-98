export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      ai_predictions: {
        Row: {
          accuracy_score: number | null
          actual_value: number | null
          confidence_score: number
          created_at: string
          features_used: Json | null
          id: string
          model_version: string | null
          pair_symbol: string
          predicted_direction: string | null
          predicted_value: number | null
          prediction_type: string
          target_time: string
          timeframe: string
        }
        Insert: {
          accuracy_score?: number | null
          actual_value?: number | null
          confidence_score: number
          created_at?: string
          features_used?: Json | null
          id?: string
          model_version?: string | null
          pair_symbol: string
          predicted_direction?: string | null
          predicted_value?: number | null
          prediction_type: string
          target_time: string
          timeframe: string
        }
        Update: {
          accuracy_score?: number | null
          actual_value?: number | null
          confidence_score?: number
          created_at?: string
          features_used?: Json | null
          id?: string
          model_version?: string | null
          pair_symbol?: string
          predicted_direction?: string | null
          predicted_value?: number | null
          prediction_type?: string
          target_time?: string
          timeframe?: string
        }
        Relationships: [
          {
            foreignKeyName: "ai_predictions_pair_symbol_fkey"
            columns: ["pair_symbol"]
            isOneToOne: false
            referencedRelation: "forex_pairs"
            referencedColumns: ["symbol"]
          },
        ]
      }
      api_usage: {
        Row: {
          created_at: string | null
          endpoint: string
          id: string
          method: string
          request_size_bytes: number | null
          response_size_bytes: number | null
          response_time_ms: number | null
          status_code: number | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          endpoint: string
          id?: string
          method: string
          request_size_bytes?: number | null
          response_size_bytes?: number | null
          response_time_ms?: number | null
          status_code?: number | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          endpoint?: string
          id?: string
          method?: string
          request_size_bytes?: number | null
          response_size_bytes?: number | null
          response_time_ms?: number | null
          status_code?: number | null
          user_id?: string
        }
        Relationships: []
      }
      detection_results: {
        Row: {
          analysis_details: Json | null
          confidence_level: string | null
          created_at: string | null
          detection_score: number
          file_name: string
          file_url: string | null
          id: string
          is_deepfake: boolean
          processing_time_ms: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          analysis_details?: Json | null
          confidence_level?: string | null
          created_at?: string | null
          detection_score: number
          file_name: string
          file_url?: string | null
          id?: string
          is_deepfake: boolean
          processing_time_ms?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          analysis_details?: Json | null
          confidence_level?: string | null
          created_at?: string | null
          detection_score?: number
          file_name?: string
          file_url?: string | null
          id?: string
          is_deepfake?: boolean
          processing_time_ms?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      forex_pairs: {
        Row: {
          ask_price: number | null
          base_currency: string
          bid_price: number | null
          created_at: string
          current_price: number | null
          daily_change: number | null
          daily_change_percent: number | null
          daily_high: number | null
          daily_low: number | null
          id: string
          last_updated: string | null
          quote_currency: string
          spread: number | null
          symbol: string
          volume: number | null
        }
        Insert: {
          ask_price?: number | null
          base_currency: string
          bid_price?: number | null
          created_at?: string
          current_price?: number | null
          daily_change?: number | null
          daily_change_percent?: number | null
          daily_high?: number | null
          daily_low?: number | null
          id?: string
          last_updated?: string | null
          quote_currency: string
          spread?: number | null
          symbol: string
          volume?: number | null
        }
        Update: {
          ask_price?: number | null
          base_currency?: string
          bid_price?: number | null
          created_at?: string
          current_price?: number | null
          daily_change?: number | null
          daily_change_percent?: number | null
          daily_high?: number | null
          daily_low?: number | null
          id?: string
          last_updated?: string | null
          quote_currency?: string
          spread?: number | null
          symbol?: string
          volume?: number | null
        }
        Relationships: []
      }
      market_sentiment: {
        Row: {
          created_at: string
          fear_greed_index: number | null
          id: string
          news_count: number | null
          pair_symbol: string
          sentiment_label: string
          sentiment_score: number
          social_mentions: number | null
          volatility_index: number | null
        }
        Insert: {
          created_at?: string
          fear_greed_index?: number | null
          id?: string
          news_count?: number | null
          pair_symbol: string
          sentiment_label: string
          sentiment_score: number
          social_mentions?: number | null
          volatility_index?: number | null
        }
        Update: {
          created_at?: string
          fear_greed_index?: number | null
          id?: string
          news_count?: number | null
          pair_symbol?: string
          sentiment_label?: string
          sentiment_score?: number
          social_mentions?: number | null
          volatility_index?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "market_sentiment_pair_symbol_fkey"
            columns: ["pair_symbol"]
            isOneToOne: false
            referencedRelation: "forex_pairs"
            referencedColumns: ["symbol"]
          },
        ]
      }
      monitoring_alerts: {
        Row: {
          alert_type: string
          created_at: string | null
          id: string
          is_read: boolean | null
          message: string
          metadata: Json | null
          severity: string
          title: string
          user_id: string
        }
        Insert: {
          alert_type: string
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          message: string
          metadata?: Json | null
          severity: string
          title: string
          user_id: string
        }
        Update: {
          alert_type?: string
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          message?: string
          metadata?: Json | null
          severity?: string
          title?: string
          user_id?: string
        }
        Relationships: []
      }
      phone_breach_detections: {
        Row: {
          breach_details: Json | null
          created_at: string
          detection_date: string
          id: string
          is_breached: boolean
          phone_number: string
          risk_level: string | null
          total_breaches: number | null
          user_id: string | null
        }
        Insert: {
          breach_details?: Json | null
          created_at?: string
          detection_date?: string
          id?: string
          is_breached?: boolean
          phone_number: string
          risk_level?: string | null
          total_breaches?: number | null
          user_id?: string | null
        }
        Update: {
          breach_details?: Json | null
          created_at?: string
          detection_date?: string
          id?: string
          is_breached?: boolean
          phone_number?: string
          risk_level?: string | null
          total_breaches?: number | null
          user_id?: string | null
        }
        Relationships: []
      }
      phone_breaches: {
        Row: {
          breach_date: string
          breach_name: string
          created_at: string
          data_exposed: string[] | null
          description: string | null
          id: string
          is_verified: boolean | null
          phone_number: string
          severity: string | null
          source: string | null
          updated_at: string
        }
        Insert: {
          breach_date: string
          breach_name: string
          created_at?: string
          data_exposed?: string[] | null
          description?: string | null
          id?: string
          is_verified?: boolean | null
          phone_number: string
          severity?: string | null
          source?: string | null
          updated_at?: string
        }
        Update: {
          breach_date?: string
          breach_name?: string
          created_at?: string
          data_exposed?: string[] | null
          description?: string | null
          id?: string
          is_verified?: boolean | null
          phone_number?: string
          severity?: string | null
          source?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      price_history: {
        Row: {
          close_price: number
          created_at: string
          high_price: number
          id: string
          low_price: number
          open_price: number
          pair_symbol: string
          timeframe: string
          timestamp: string
          volume: number | null
        }
        Insert: {
          close_price: number
          created_at?: string
          high_price: number
          id?: string
          low_price: number
          open_price: number
          pair_symbol: string
          timeframe: string
          timestamp: string
          volume?: number | null
        }
        Update: {
          close_price?: number
          created_at?: string
          high_price?: number
          id?: string
          low_price?: number
          open_price?: number
          pair_symbol?: string
          timeframe?: string
          timestamp?: string
          volume?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "price_history_pair_symbol_fkey"
            columns: ["pair_symbol"]
            isOneToOne: false
            referencedRelation: "forex_pairs"
            referencedColumns: ["symbol"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          email: string | null
          full_name: string | null
          id: string
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id: string
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      technical_indicators: {
        Row: {
          calculated_at: string
          id: string
          indicator_name: string
          indicator_value: number | null
          pair_symbol: string
          signal: string | null
          timeframe: string
        }
        Insert: {
          calculated_at?: string
          id?: string
          indicator_name: string
          indicator_value?: number | null
          pair_symbol: string
          signal?: string | null
          timeframe: string
        }
        Update: {
          calculated_at?: string
          id?: string
          indicator_name?: string
          indicator_value?: number | null
          pair_symbol?: string
          signal?: string | null
          timeframe?: string
        }
        Relationships: [
          {
            foreignKeyName: "technical_indicators_pair_symbol_fkey"
            columns: ["pair_symbol"]
            isOneToOne: false
            referencedRelation: "forex_pairs"
            referencedColumns: ["symbol"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _user_id: string
          _role: Database["public"]["Enums"]["app_role"]
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "premium" | "standard"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "premium", "standard"],
    },
  },
} as const
