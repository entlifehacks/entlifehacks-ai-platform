import { createClient } from '@supabase/supabase-js';


// Initialize Supabase client
// Using direct values from project configuration
const supabaseUrl = 'https://hsgqghfvrnzexwywkdtc.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhzZ3FnaGZ2cm56ZXh3eXdrZHRjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjExNzk3MjAsImV4cCI6MjA3Njc1NTcyMH0.yuDGi0m_WDOVFjL0o9CnlnVu31_0GU0d_62cmHfg5aY';
const supabase = createClient(supabaseUrl, supabaseKey);


export { supabase };