import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://lduzdqmujnkjqgotflup.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxkdXpkcW11am5ranFnb3RmbHVwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkxMzI4MDksImV4cCI6MjA2NDcwODgwOX0.W7jEwN8MoH-Z0nffrIM-xF3wCUde7HBFG2JnriH0hFM';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

window.supabase = supabase;
