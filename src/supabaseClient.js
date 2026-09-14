import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://eoxeocqbhguqjfsncduv.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_QGWwqa4JIyCoFb_txYU5rQ_G7dVgdXx';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
