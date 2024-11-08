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
      biographies: {
        Row: {
          created_at: string
          date_of_birth: string
          date_of_death: string
          descrption: string
          id: string
          main_message: string
          name_person: string
          photo_path: string
          photo_person: string
          profile_id: string
          status: Database["public"]["Enums"]["Biography_Status"]
        }
        Insert: {
          created_at?: string
          date_of_birth: string
          date_of_death: string
          descrption: string
          id?: string
          main_message: string
          name_person: string
          photo_path: string
          photo_person: string
          profile_id: string
          status?: Database["public"]["Enums"]["Biography_Status"]
        }
        Update: {
          created_at?: string
          date_of_birth?: string
          date_of_death?: string
          descrption?: string
          id?: string
          main_message?: string
          name_person?: string
          photo_path?: string
          photo_person?: string
          profile_id?: string
          status?: Database["public"]["Enums"]["Biography_Status"]
        }
        Relationships: [
          {
            foreignKeyName: "biographies_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      images_biographies: {
        Row: {
          biography_id: string
          created_at: string
          id: number
          image_path: string
          image_url: string
        }
        Insert: {
          biography_id: string
          created_at?: string
          id?: number
          image_path: string
          image_url: string
        }
        Update: {
          biography_id?: string
          created_at?: string
          id?: number
          image_path?: string
          image_url?: string
        }
        Relationships: [
          {
            foreignKeyName: "images_biographies_biography_id_fkey"
            columns: ["biography_id"]
            isOneToOne: false
            referencedRelation: "biographies"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          biography_id: string
          created_at: string
          id: number
          message_text: string
        }
        Insert: {
          biography_id: string
          created_at?: string
          id?: number
          message_text: string
        }
        Update: {
          biography_id?: string
          created_at?: string
          id?: number
          message_text?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_biography_id_fkey"
            columns: ["biography_id"]
            isOneToOne: false
            referencedRelation: "biographies"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          amount: number
          biography_id: string
          created_at: string
          id: number
          price: number
          shipping_cost: number
          status: Database["public"]["Enums"]["Order_Status"]
          total_cost: number
          user_id: string
        }
        Insert: {
          amount?: number
          biography_id: string
          created_at?: string
          id?: number
          price: number
          shipping_cost: number
          status?: Database["public"]["Enums"]["Order_Status"]
          total_cost: number
          user_id: string
        }
        Update: {
          amount?: number
          biography_id?: string
          created_at?: string
          id?: number
          price?: number
          shipping_cost?: number
          status?: Database["public"]["Enums"]["Order_Status"]
          total_cost?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "orders_biography_id_fkey"
            columns: ["biography_id"]
            isOneToOne: false
            referencedRelation: "biographies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          created_at: string
          id: string
          name: string
          price: number
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          price: number
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          price?: number
        }
        Relationships: []
      }
      profiles: {
        Row: {
          address: string | null
          avatar_path: string | null
          avatar_url: string | null
          company: string | null
          country: string | null
          created_at: string
          departament: string | null
          district: string | null
          email: string
          first_name: string
          id: string
          last_name: string | null
          phone: string | null
          province: string | null
          role: Database["public"]["Enums"]["Role"]
        }
        Insert: {
          address?: string | null
          avatar_path?: string | null
          avatar_url?: string | null
          company?: string | null
          country?: string | null
          created_at?: string
          departament?: string | null
          district?: string | null
          email: string
          first_name: string
          id: string
          last_name?: string | null
          phone?: string | null
          province?: string | null
          role?: Database["public"]["Enums"]["Role"]
        }
        Update: {
          address?: string | null
          avatar_path?: string | null
          avatar_url?: string | null
          company?: string | null
          country?: string | null
          created_at?: string
          departament?: string | null
          district?: string | null
          email?: string
          first_name?: string
          id?: string
          last_name?: string | null
          phone?: string | null
          province?: string | null
          role?: Database["public"]["Enums"]["Role"]
        }
        Relationships: []
      }
      videos_biographies: {
        Row: {
          biography_id: string
          created_at: string
          id: number
          video_path: string
          video_url: string
        }
        Insert: {
          biography_id: string
          created_at?: string
          id?: number
          video_path: string
          video_url: string
        }
        Update: {
          biography_id?: string
          created_at?: string
          id?: number
          video_path?: string
          video_url?: string
        }
        Relationships: [
          {
            foreignKeyName: "videos_biographies_biography_id_fkey"
            columns: ["biography_id"]
            isOneToOne: false
            referencedRelation: "biographies"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      Biography_Status: "privado" | "publico"
      Order_Status:
        | "pendiente"
        | "pagado"
        | "procesando"
        | "enviado"
        | "entregado"
        | "cancelado"
        | "fallido"
        | "rembolsado"
      Role: "user" | "admin"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
