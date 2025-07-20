import { createClient } from "@supabase/supabase-js"

export interface CountryAudioRow {
  id: number
  slug: string
  url: string
  language: string
}

export interface CountryAudioInsert {
  slug: string
  url: string
  language: string
}

export interface Database {
  public: {
    Tables: {
      country_audio: {
        Row: CountryAudioRow
        Insert: CountryAudioInsert
        Update: Partial<CountryAudioInsert>
      }
    }
  }
}

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL!
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY!

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)

export async function getCountryAudio(slug: string) {
  const { data, error } = await supabase
    .from('country_audio')
    .select('*')
    .eq('slug', slug)
    .maybeSingle()

  if (error) throw error
  return data
}

export async function insertCountryAudio(entry: CountryAudioInsert) {
  const { data, error } = await supabase
    .from('country_audio')
    .insert(entry)
    .select()
    .single()

  if (error) throw error
  return data
}
