import dotenv from 'dotenv';

dotenv.config();

export const APP_ID = process.env.APP_ID;
export const APP_SECRET = process.env.APP_SECRET;
export const JWT_SECRET = process.env.JWT_SECRET;
export const SUPABASE_URL = process.env.SUPABASE_URL;
export const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;
