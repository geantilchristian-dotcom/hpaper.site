import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Product = {
  id: string;
  name: string;
  category: string;
  price: string | null;
  description: string;
  image: string | null;
  created_at: string;
};

export type ProductInput = {
  name: string;
  category: string;
  price: string;
  description: string;
  image: string;
};
