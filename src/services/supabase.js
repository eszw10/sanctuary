import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://yeteudgpvylbfnhuqhhh.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlldGV1ZGdwdnlsYmZuaHVxaGhoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ0OTkzMzUsImV4cCI6MjA2MDA3NTMzNX0.bxwEKPXpnAZL890J2uBS9z7WuCtKXlUzMOqqF1Sof1s";

export const supabase = createClient(supabaseUrl, supabaseKey);
