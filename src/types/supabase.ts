export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      aircraft_defects: {
        Row: {
          id: string
          aircraft_id: string
          description: string
          reported_by: string
          reported_date: string
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          aircraft_id: string
          description: string
          reported_by: string
          reported_date: string
          status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          aircraft_id?: string
          description?: string
          reported_by?: string
          reported_date?: string
          status?: string
          created_at?: string
          updated_at?: string
        }
      }
      // ... rest of your existing tables ...
    }
  }
}