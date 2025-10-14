-- Create subscriptions table to track user subscriptions
CREATE TABLE IF NOT EXISTS subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  stripe_customer_id TEXT UNIQUE,
  stripe_subscription_id TEXT UNIQUE,
  plan_type TEXT NOT NULL CHECK (plan_type IN ('free', 'monthly', 'yearly')),
  status TEXT NOT NULL CHECK (status IN ('active', 'canceled', 'past_due', 'trialing')),
  current_period_start TIMESTAMP WITH TIME ZONE,
  current_period_end TIMESTAMP WITH TIME ZONE,
  cancel_at_period_end BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Create payment_history table to track all payments
CREATE TABLE IF NOT EXISTS payment_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  subscription_id UUID REFERENCES subscriptions(id) ON DELETE SET NULL,
  stripe_payment_intent_id TEXT UNIQUE,
  amount INTEGER NOT NULL,
  currency TEXT DEFAULT 'usd',
  status TEXT NOT NULL CHECK (status IN ('succeeded', 'pending', 'failed')),
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add premium flag to activities (we'll mark which activities are premium)
CREATE TABLE IF NOT EXISTS premium_activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  activity_id TEXT UNIQUE NOT NULL,
  activity_name TEXT NOT NULL,
  is_premium BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE payment_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE premium_activities ENABLE ROW LEVEL SECURITY;

-- RLS Policies for subscriptions
DROP POLICY IF EXISTS "Users can view their own subscription" ON subscriptions;
CREATE POLICY "Users can view their own subscription" ON subscriptions
  FOR SELECT TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own subscription" ON subscriptions;
CREATE POLICY "Users can insert their own subscription" ON subscriptions
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own subscription" ON subscriptions;
CREATE POLICY "Users can update their own subscription" ON subscriptions
  FOR UPDATE TO authenticated USING (auth.uid() = user_id);

-- RLS Policies for payment_history
DROP POLICY IF EXISTS "Users can view their own payment history" ON payment_history;
CREATE POLICY "Users can view their own payment history" ON payment_history
  FOR SELECT TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own payment history" ON payment_history;
CREATE POLICY "Users can insert their own payment history" ON payment_history
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

-- RLS Policies for premium_activities (everyone can view)
DROP POLICY IF EXISTS "Anyone can view premium activities" ON premium_activities;
CREATE POLICY "Anyone can view premium activities" ON premium_activities
  FOR SELECT TO authenticated USING (true);

-- Insert default premium activities
INSERT INTO premium_activities (activity_id, activity_name, is_premium) VALUES
  ('pattern-training', 'Pattern Training', true),
  ('ai-friend', 'AI Friend Creator', true),
  ('math-adventure', 'Math Adventure', false),
  ('word-builder', 'Word Builder', false),
  ('memory-match', 'Memory Match', false),
  ('ai-detective', 'AI Detective Game', false),
  ('ai-quiz', 'AI Quiz Challenge', false)
ON CONFLICT (activity_id) DO NOTHING;

-- Create function to check if user has premium access
CREATE OR REPLACE FUNCTION has_premium_access(user_uuid UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM subscriptions
    WHERE user_id = user_uuid
    AND status = 'active'
    AND plan_type IN ('monthly', 'yearly')
    AND current_period_end > NOW()
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
