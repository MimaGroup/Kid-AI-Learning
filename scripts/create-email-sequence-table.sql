-- Create email_sequence table for tracking onboarding email sequence
-- This table tracks where each user is in the 5-email trial onboarding sequence

CREATE TABLE IF NOT EXISTS email_sequence (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  email text NOT NULL,
  trial_started_at timestamp with time zone DEFAULT now(),
  last_email_sent integer DEFAULT 0,
  next_send_at timestamp with time zone,
  completed boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Create index for efficient querying of pending emails
CREATE INDEX IF NOT EXISTS idx_email_sequence_next_send 
  ON email_sequence(next_send_at) 
  WHERE completed = false;

-- Create index for user lookup
CREATE INDEX IF NOT EXISTS idx_email_sequence_user_id 
  ON email_sequence(user_id);

-- Create index for email lookup
CREATE INDEX IF NOT EXISTS idx_email_sequence_email 
  ON email_sequence(email);

-- Enable Row Level Security
ALTER TABLE email_sequence ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view their own email sequence
CREATE POLICY "Users can view own email sequence" ON email_sequence
  FOR SELECT USING (auth.uid() = user_id);

-- Policy: Service role can manage all email sequences (for cron jobs)
CREATE POLICY "Service role can manage email sequences" ON email_sequence
  FOR ALL USING (auth.role() = 'service_role');

-- Policy: Allow insert for authenticated users (when starting trial)
CREATE POLICY "Authenticated users can start email sequence" ON email_sequence
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Add trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_email_sequence_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER email_sequence_updated_at
  BEFORE UPDATE ON email_sequence
  FOR EACH ROW
  EXECUTE FUNCTION update_email_sequence_updated_at();

-- Grant permissions
GRANT ALL ON email_sequence TO authenticated;
GRANT ALL ON email_sequence TO service_role;
