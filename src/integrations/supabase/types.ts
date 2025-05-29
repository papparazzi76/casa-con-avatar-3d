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
      detailed_property_valuations: {
        Row: {
          anno_construccion: number
          banos: number
          created_at: string
          direccion_completa: string
          email: string
          estado_banos: string
          estado_cocina: string
          estado_electricidad: string
          estado_fontaneria: string
          estado_puertas: string
          estado_ventanas: string
          exterior_interior: string
          fecha_procesamiento: string | null
          habitaciones: number
          id: string
          observaciones: string | null
          orientacion: string
          planta: string
          procesado: boolean | null
          resultado_valoracion: Json | null
          superficie_jardin: number | null
          superficie_m2: number
          superficie_terraza: number | null
          tiene_aire_acondicionado: boolean | null
          tiene_ascensor: boolean | null
          tiene_calefaccion: boolean | null
          tiene_garaje: boolean | null
          tiene_jardin: boolean | null
          tiene_piscina: boolean | null
          tiene_terraza: boolean | null
          tiene_trastero: boolean | null
          tipo_vivienda: string
          updated_at: string
          user_id: string | null
          zona_deportiva: boolean | null
          zona_juegos_infantiles: boolean | null
          zonas_comunes: string[] | null
        }
        Insert: {
          anno_construccion: number
          banos: number
          created_at?: string
          direccion_completa: string
          email: string
          estado_banos: string
          estado_cocina: string
          estado_electricidad: string
          estado_fontaneria: string
          estado_puertas: string
          estado_ventanas: string
          exterior_interior: string
          fecha_procesamiento?: string | null
          habitaciones: number
          id?: string
          observaciones?: string | null
          orientacion: string
          planta: string
          procesado?: boolean | null
          resultado_valoracion?: Json | null
          superficie_jardin?: number | null
          superficie_m2: number
          superficie_terraza?: number | null
          tiene_aire_acondicionado?: boolean | null
          tiene_ascensor?: boolean | null
          tiene_calefaccion?: boolean | null
          tiene_garaje?: boolean | null
          tiene_jardin?: boolean | null
          tiene_piscina?: boolean | null
          tiene_terraza?: boolean | null
          tiene_trastero?: boolean | null
          tipo_vivienda: string
          updated_at?: string
          user_id?: string | null
          zona_deportiva?: boolean | null
          zona_juegos_infantiles?: boolean | null
          zonas_comunes?: string[] | null
        }
        Update: {
          anno_construccion?: number
          banos?: number
          created_at?: string
          direccion_completa?: string
          email?: string
          estado_banos?: string
          estado_cocina?: string
          estado_electricidad?: string
          estado_fontaneria?: string
          estado_puertas?: string
          estado_ventanas?: string
          exterior_interior?: string
          fecha_procesamiento?: string | null
          habitaciones?: number
          id?: string
          observaciones?: string | null
          orientacion?: string
          planta?: string
          procesado?: boolean | null
          resultado_valoracion?: Json | null
          superficie_jardin?: number | null
          superficie_m2?: number
          superficie_terraza?: number | null
          tiene_aire_acondicionado?: boolean | null
          tiene_ascensor?: boolean | null
          tiene_calefaccion?: boolean | null
          tiene_garaje?: boolean | null
          tiene_jardin?: boolean | null
          tiene_piscina?: boolean | null
          tiene_terraza?: boolean | null
          tiene_trastero?: boolean | null
          tipo_vivienda?: string
          updated_at?: string
          user_id?: string | null
          zona_deportiva?: boolean | null
          zona_juegos_infantiles?: boolean | null
          zonas_comunes?: string[] | null
        }
        Relationships: []
      }
      "Idealista Valladolid": {
        Row: {
          Característica_1: string
          Característica_2: string
          Característica_3: string
          Descripción: string
          Precio: string
          Timestamp: string
          Titulo: string
          URL: string
          URL_ingresadas: string
        }
        Insert: {
          Característica_1: string
          Característica_2: string
          Característica_3: string
          Descripción: string
          Precio: string
          Timestamp: string
          Titulo: string
          URL: string
          URL_ingresadas: string
        }
        Update: {
          Característica_1?: string
          Característica_2?: string
          Característica_3?: string
          Descripción?: string
          Precio?: string
          Timestamp?: string
          Titulo?: string
          URL?: string
          URL_ingresadas?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          full_name: string | null
          id: string
          updated_at: string
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id: string
          updated_at?: string
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          updated_at?: string
          username?: string | null
        }
        Relationships: []
      }
      properties: {
        Row: {
          address: string
          area: number
          bathrooms: number
          created_at: string
          currency: string
          description: string
          features: string[] | null
          id: string
          latitude: number | null
          location: string
          longitude: number | null
          operation_type: string
          postal_code: string | null
          price: number
          property_type: string
          rooms: number
          status: string
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          address: string
          area: number
          bathrooms: number
          created_at?: string
          currency?: string
          description: string
          features?: string[] | null
          id?: string
          latitude?: number | null
          location: string
          longitude?: number | null
          operation_type: string
          postal_code?: string | null
          price: number
          property_type: string
          rooms: number
          status?: string
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          address?: string
          area?: number
          bathrooms?: number
          created_at?: string
          currency?: string
          description?: string
          features?: string[] | null
          id?: string
          latitude?: number | null
          location?: string
          longitude?: number | null
          operation_type?: string
          postal_code?: string | null
          price?: number
          property_type?: string
          rooms?: number
          status?: string
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      property_images: {
        Row: {
          created_at: string
          id: string
          image_url: string
          is_main: boolean
          order_num: number
          property_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          image_url: string
          is_main?: boolean
          order_num?: number
          property_id: string
        }
        Update: {
          created_at?: string
          id?: string
          image_url?: string
          is_main?: boolean
          order_num?: number
          property_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "property_images_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
      property_valuations: {
        Row: {
          address: string
          bathrooms: number
          bedrooms: number
          created_at: string
          estimated_price: number
          extras: string[] | null
          high_range: number
          id: string
          locality: string
          low_range: number
          postal_code: string
          property_type: string
          state: string
          surface_m2: number
          updated_at: string
          user_id: string | null
          valuation_data: Json
          year_built: number
        }
        Insert: {
          address: string
          bathrooms: number
          bedrooms: number
          created_at?: string
          estimated_price: number
          extras?: string[] | null
          high_range: number
          id?: string
          locality: string
          low_range: number
          postal_code: string
          property_type: string
          state: string
          surface_m2: number
          updated_at?: string
          user_id?: string | null
          valuation_data: Json
          year_built: number
        }
        Update: {
          address?: string
          bathrooms?: number
          bedrooms?: number
          created_at?: string
          estimated_price?: number
          extras?: string[] | null
          high_range?: number
          id?: string
          locality?: string
          low_range?: number
          postal_code?: string
          property_type?: string
          state?: string
          surface_m2?: number
          updated_at?: string
          user_id?: string | null
          valuation_data?: Json
          year_built?: number
        }
        Relationships: []
      }
      property_videos: {
        Row: {
          created_at: string
          id: string
          is_main: boolean
          order_num: number
          property_id: string
          video_url: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_main?: boolean
          order_num?: number
          property_id: string
          video_url: string
        }
        Update: {
          created_at?: string
          id?: string
          is_main?: boolean
          order_num?: number
          property_id?: string
          video_url?: string
        }
        Relationships: [
          {
            foreignKeyName: "property_videos_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
      reform_budgets: {
        Row: {
          created_at: string
          data: Json
          id: string
          reform_type: string
          status: string
          total_amount: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          data: Json
          id?: string
          reform_type: string
          status?: string
          total_amount?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          data?: Json
          id?: string
          reform_type?: string
          status?: string
          total_amount?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      special_offer_registrations: {
        Row: {
          created_at: string | null
          email: string
          id: string
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          user_id?: string | null
        }
        Relationships: []
      }
      user_uploaded_images: {
        Row: {
          created_at: string
          furniture_style: string | null
          id: string
          image_type: string
          image_url: string
          processed: boolean
          room_type: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          furniture_style?: string | null
          id?: string
          image_type: string
          image_url: string
          processed?: boolean
          room_type?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          furniture_style?: string | null
          id?: string
          image_type?: string
          image_url?: string
          processed?: boolean
          room_type?: string | null
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_remaining_special_offer_spots: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
    }
    Enums: {
      [_ in never]: never
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
    Enums: {},
  },
} as const
