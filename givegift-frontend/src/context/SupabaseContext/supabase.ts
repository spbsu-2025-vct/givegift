import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl: string = import.meta.env.VITE_SUPABASE_URL || "";
const supabaseKey: string = import.meta.env.VITE_SUPABASE_PUBLIC_KEY || "";

// Singleton Supabase client
export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);
