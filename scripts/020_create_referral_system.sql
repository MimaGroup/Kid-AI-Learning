-- Referral System Tables
-- Tracks referral codes, invitations, and rewards

-- Add referral_code to profiles if not exists
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS referral_code TEXT UNIQUE;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS referred_by UUID REFERENCES auth.users(id);
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS referral_count INTEGER DEFAULT 0;

-- Create referral_invitations table
CREATE TABLE IF NOT EXISTS referral_invitations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  referrer_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  invitee_email TEXT NOT NULL,
  invitee_name TEXT,
  referral_code TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'expired')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE DEFAULT (NOW() + INTERVAL '30 days'),
  accepted_at TIMESTAMP WITH TIME ZONE,
  invitee_id UUID REFERENCES auth.users(id)
);

-- Create referral_rewards table
CREATE TABLE IF NOT EXISTS referral_rewards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  reward_type TEXT NOT NULL CHECK (reward_type IN ('free_month', 'extended_trial', 'discount', 'credits')),
  reward_value TEXT NOT NULL,
  source TEXT NOT NULL CHECK (source IN ('referral_sent', 'referral_received')),
  referral_id UUID REFERENCES referral_invitations(id),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'claimed', 'expired', 'applied')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  claimed_at TIMESTAMP WITH TIME ZONE,
  expires_at TIMESTAMP WITH TIME ZONE DEFAULT (NOW() + INTERVAL '90 days')
);

-- Enable RLS
ALTER TABLE referral_invitations ENABLE ROW LEVEL SECURITY;
ALTER TABLE referral_rewards ENABLE ROW LEVEL SECURITY;

-- RLS Policies for referral_invitations
DROP POLICY IF EXISTS "Users can view their sent invitations" ON referral_invitations;
CREATE POLICY "Users can view their sent invitations" ON referral_invitations
  FOR SELECT TO authenticated USING (auth.uid() = referrer_id);

DROP POLICY IF EXISTS "Users can create invitations" ON referral_invitations;
CREATE POLICY "Users can create invitations" ON referral_invitations
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = referrer_id);

DROP POLICY IF EXISTS "System can update invitations" ON referral_invitations;
CREATE POLICY "System can update invitations" ON referral_invitations
  FOR UPDATE TO authenticated USING (true);

-- RLS Policies for referral_rewards
DROP POLICY IF EXISTS "Users can view their rewards" ON referral_rewards;
CREATE POLICY "Users can view their rewards" ON referral_rewards
  FOR SELECT TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "System can create rewards" ON referral_rewards;
CREATE POLICY "System can create rewards" ON referral_rewards
  FOR INSERT TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "Users can update their rewards" ON referral_rewards;
CREATE POLICY "Users can update their rewards" ON referral_rewards
  FOR UPDATE TO authenticated USING (auth.uid() = user_id);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_referral_invitations_referrer ON referral_invitations(referrer_id);
CREATE INDEX IF NOT EXISTS idx_referral_invitations_code ON referral_invitations(referral_code);
CREATE INDEX IF NOT EXISTS idx_referral_invitations_email ON referral_invitations(invitee_email);
CREATE INDEX IF NOT EXISTS idx_referral_rewards_user ON referral_rewards(user_id);
CREATE INDEX IF NOT EXISTS idx_profiles_referral_code ON profiles(referral_code);

-- Function to generate unique referral code
CREATE OR REPLACE FUNCTION generate_referral_code()
RETURNS TEXT AS $$
DECLARE
  chars TEXT := 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  result TEXT := '';
  i INTEGER;
BEGIN
  FOR i IN 1..8 LOOP
    result := result || substr(chars, floor(random() * length(chars) + 1)::integer, 1);
  END LOOP;
  RETURN result;
END;
$$ LANGUAGE plpgsql;

-- Function to ensure user has referral code
CREATE OR REPLACE FUNCTION ensure_referral_code()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.referral_code IS NULL THEN
    NEW.referral_code := generate_referral_code();
    -- Ensure uniqueness
    WHILE EXISTS (SELECT 1 FROM profiles WHERE referral_code = NEW.referral_code AND id != NEW.id) LOOP
      NEW.referral_code := generate_referral_code();
    END LOOP;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-generate referral code
DROP TRIGGER IF EXISTS ensure_referral_code_trigger ON profiles;
CREATE TRIGGER ensure_referral_code_trigger
  BEFORE INSERT OR UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION ensure_referral_code();

-- Update existing profiles without referral codes
UPDATE profiles 
SET referral_code = generate_referral_code()
WHERE referral_code IS NULL;
