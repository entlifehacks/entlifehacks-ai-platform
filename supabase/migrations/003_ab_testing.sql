-- Create A/B testing table
CREATE TABLE IF NOT EXISTS ab_tests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  template_type TEXT NOT NULL,
  variant_a_subject TEXT NOT NULL,
  variant_b_subject TEXT NOT NULL,
  variant_a_content TEXT,
  variant_b_content TEXT,
  variant_a_sent INTEGER DEFAULT 0,
  variant_b_sent INTEGER DEFAULT 0,
  variant_a_opened INTEGER DEFAULT 0,
  variant_b_opened INTEGER DEFAULT 0,
  variant_a_clicked INTEGER DEFAULT 0,
  variant_b_clicked INTEGER DEFAULT 0,
  status TEXT DEFAULT 'active',
  winner TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE
);

-- Add variant tracking to email_logs
ALTER TABLE email_logs ADD COLUMN IF NOT EXISTS ab_test_id UUID REFERENCES ab_tests(id);
ALTER TABLE email_logs ADD COLUMN IF NOT EXISTS variant TEXT;

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_email_logs_ab_test ON email_logs(ab_test_id);
CREATE INDEX IF NOT EXISTS idx_ab_tests_status ON ab_tests(status);

-- Enable RLS
ALTER TABLE ab_tests ENABLE ROW LEVEL SECURITY;

-- Create policy for authenticated access
CREATE POLICY "Enable all access for authenticated users" ON ab_tests
  FOR ALL USING (true);
