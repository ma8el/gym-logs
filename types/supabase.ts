export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      days_of_week: {
        Row: {
          id: number
          name: string
        }
        Insert: {
          id?: number
          name: string
        }
        Update: {
          id?: number
          name?: string
        }
      }
      exercises: {
        Row: {
          description: string | null
          id: number
          muscles: number[] | null
          name: string
        }
        Insert: {
          description?: string | null
          id?: number
          muscles?: number[] | null
          name: string
        }
        Update: {
          description?: string | null
          id?: number
          muscles?: number[] | null
          name?: string
        }
      }
      muscles: {
        Row: {
          description: string | null
          id: number
          name: string
        }
        Insert: {
          description?: string | null
          id?: number
          name: string
        }
        Update: {
          description?: string | null
          id?: number
          name?: string
        }
      }
      planned_workouts: {
        Row: {
          day_of_week_id: number
          id: number
          time_of_day: string | null
          workout_id: number
          workout_plan_id: number
        }
        Insert: {
          day_of_week_id: number
          id?: number
          time_of_day?: string | null
          workout_id: number
          workout_plan_id: number
        }
        Update: {
          day_of_week_id?: number
          id?: number
          time_of_day?: string | null
          workout_id?: number
          workout_plan_id?: number
        }
      }
      profiles: {
        Row: {
          avatar_url: string | null
          full_name: string | null
          id: string
          updated_at: string | null
          username: string | null
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          full_name?: string | null
          id: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
      }
      scheduled_workout_plans: {
        Row: {
          id: number
          workout_plan_id: number
          workout_schedule_id: number
        }
        Insert: {
          id?: number
          workout_plan_id: number
          workout_schedule_id: number
        }
        Update: {
          id?: number
          workout_plan_id?: number
          workout_schedule_id?: number
        }
      }
      workout_exercises: {
        Row: {
          created_at: string
          exercise_id: number
          id: number
          reps: number
          resttime: number | null
          rir: number | null
          sets: number
          updated_at: string
          weight: number
          workout_id: number
        }
        Insert: {
          created_at?: string
          exercise_id: number
          id?: number
          reps: number
          resttime?: number | null
          rir?: number | null
          sets: number
          updated_at?: string
          weight: number
          workout_id: number
        }
        Update: {
          created_at?: string
          exercise_id?: number
          id?: number
          reps?: number
          resttime?: number | null
          rir?: number | null
          sets?: number
          updated_at?: string
          weight?: number
          workout_id?: number
        }
      }
      workout_plans: {
        Row: {
          created_at: string
          description: string | null
          id: number
          name: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: number
          name: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: number
          name?: string
          updated_at?: string
          user_id?: string
        }
      }
      workout_schedule: {
        Row: {
          created_at: string
          ends_at: string
          id: number
          starts_at: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          ends_at: string
          id?: number
          starts_at: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          ends_at?: string
          id?: number
          starts_at?: string
          updated_at?: string
          user_id?: string
        }
      }
      workout_sessions: {
        Row: {
          created_at: string
          finished_at: string | null
          id: number
          notes: string | null
          performance: Json | null
          scheduled_at: string
          started_at: string | null
          updated_at: string
          user_id: string
          workout_id: number
        }
        Insert: {
          created_at?: string
          finished_at?: string | null
          id?: number
          notes?: string | null
          performance?: Json | null
          scheduled_at: string
          started_at?: string | null
          updated_at?: string
          user_id: string
          workout_id: number
        }
        Update: {
          created_at?: string
          finished_at?: string | null
          id?: number
          notes?: string | null
          performance?: Json | null
          scheduled_at?: string
          started_at?: string | null
          updated_at?: string
          user_id?: string
          workout_id?: number
        }
      }
      workouts: {
        Row: {
          created_at: string
          description: string | null
          id: number
          name: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: number
          name: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: number
          name?: string
          updated_at?: string
          user_id?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      delete_avatar: {
        Args: {
          avatar_url: string
        }
        Returns: Record<string, unknown>
      }
      delete_storage_object: {
        Args: {
          bucket: string
          object: string
        }
        Returns: Record<string, unknown>
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  storage: {
    Tables: {
      buckets: {
        Row: {
          allowed_mime_types: string[] | null
          avif_autodetection: boolean | null
          created_at: string | null
          file_size_limit: number | null
          id: string
          name: string
          owner: string | null
          public: boolean | null
          updated_at: string | null
        }
        Insert: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id: string
          name: string
          owner?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Update: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id?: string
          name?: string
          owner?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
      }
      migrations: {
        Row: {
          executed_at: string | null
          hash: string
          id: number
          name: string
        }
        Insert: {
          executed_at?: string | null
          hash: string
          id: number
          name: string
        }
        Update: {
          executed_at?: string | null
          hash?: string
          id?: number
          name?: string
        }
      }
      objects: {
        Row: {
          bucket_id: string | null
          created_at: string | null
          id: string
          last_accessed_at: string | null
          metadata: Json | null
          name: string | null
          owner: string | null
          path_tokens: string[] | null
          updated_at: string | null
          version: string | null
        }
        Insert: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Update: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_insert_object: {
        Args: {
          bucketid: string
          name: string
          owner: string
          metadata: Json
        }
        Returns: undefined
      }
      extension: {
        Args: {
          name: string
        }
        Returns: string
      }
      filename: {
        Args: {
          name: string
        }
        Returns: string
      }
      foldername: {
        Args: {
          name: string
        }
        Returns: unknown
      }
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>
        Returns: {
          size: number
          bucket_id: string
        }[]
      }
      search: {
        Args: {
          prefix: string
          bucketname: string
          limits?: number
          levels?: number
          offsets?: number
          search?: string
          sortcolumn?: string
          sortorder?: string
        }
        Returns: {
          name: string
          id: string
          updated_at: string
          created_at: string
          last_accessed_at: string
          metadata: Json
        }[]
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
