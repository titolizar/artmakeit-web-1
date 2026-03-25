import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://lweujwpuohwwhruegkys.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your_anon_key_here';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
