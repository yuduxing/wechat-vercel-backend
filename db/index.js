import { createClient } from '@supabase/supabase-js'
import { SUPABASE_URL, SUPABASE_ANON_KEY } from '../config/index.js'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
console.log("supabase connected!")