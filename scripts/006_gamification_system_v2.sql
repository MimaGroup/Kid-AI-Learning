-- Gamification System Schema (Version 2 - Safe to re-run)
-- Add gamification columns to profiles table
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS points INTEGER DEFAULT 0;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS level INTEGER DEFAULT 1;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS experience INTEGER DEFAULT 0;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS streak_days INTEGER DEFAULT 0;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS last_activity_date DATE;

-- Create badges table
CREATE TABLE IF NOT EXISTS badges (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  badge_id TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL,
  points_required INTEGER DEFAULT 0,
  category TEXT NOT NULL,
  rarity TEXT DEFAULT 'common' CHECK (rarity IN ('common', 'rare', 'epic', 'legendary')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user_badges table (many-to-many relationship)
CREATE TABLE IF NOT EXISTS user_badges (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) NOT NULL,
  badge_id TEXT REFERENCES badges(badge_id) NOT NULL,
  earned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, badge_id)
);

-- Create daily_challenges table
CREATE TABLE IF NOT EXISTS daily_challenges (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  challenge_id TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  activity_type TEXT NOT NULL,
  target_value INTEGER NOT NULL,
  points_reward INTEGER NOT NULL,
  active_date DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user_daily_challenges table (track completion)
CREATE TABLE IF NOT EXISTS user_daily_challenges (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) NOT NULL,
  challenge_id TEXT REFERENCES daily_challenges(challenge_id) NOT NULL,
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  points_earned INTEGER NOT NULL,
  UNIQUE(user_id, challenge_id)
);

-- Enable RLS
ALTER TABLE badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_daily_challenges ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Anyone can view badges" ON badges;
DROP POLICY IF EXISTS "Users can view own badges" ON user_badges;
DROP POLICY IF EXISTS "Users can earn badges" ON user_badges;
DROP POLICY IF EXISTS "Anyone can view daily challenges" ON daily_challenges;
DROP POLICY IF EXISTS "Users can view own challenge progress" ON user_daily_challenges;
DROP POLICY IF EXISTS "Users can complete challenges" ON user_daily_challenges;

-- Create RLS Policies
CREATE POLICY "Anyone can view badges" ON badges FOR SELECT USING (true);
CREATE POLICY "Users can view own badges" ON user_badges FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can earn badges" ON user_badges FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Anyone can view daily challenges" ON daily_challenges FOR SELECT USING (true);
CREATE POLICY "Users can view own challenge progress" ON user_daily_challenges FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can complete challenges" ON user_daily_challenges FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Insert default badges (safe to re-run)
INSERT INTO badges (badge_id, name, description, icon, points_required, category, rarity) VALUES
  ('first_steps', 'First Steps', 'Complete your first activity', '🎯', 0, 'milestone', 'common'),
  ('quick_learner', 'Quick Learner', 'Complete 5 activities', '⚡', 50, 'milestone', 'common'),
  ('dedicated_student', 'Dedicated Student', 'Complete 25 activities', '📚', 250, 'milestone', 'rare'),
  ('master_learner', 'Master Learner', 'Complete 100 activities', '🎓', 1000, 'milestone', 'epic'),
  ('perfect_score', 'Perfect Score', 'Get 100% on any quiz', '💯', 20, 'achievement', 'rare'),
  ('streak_3', '3 Day Streak', 'Learn for 3 days in a row', '🔥', 30, 'streak', 'common'),
  ('streak_7', '7 Day Streak', 'Learn for 7 days in a row', '🔥', 70, 'streak', 'rare'),
  ('streak_30', '30 Day Streak', 'Learn for 30 days in a row', '🔥', 300, 'streak', 'epic'),
  ('math_wizard', 'Math Wizard', 'Complete 10 math activities', '🧮', 100, 'subject', 'rare'),
  ('word_master', 'Word Master', 'Complete 10 word activities', '📝', 100, 'subject', 'rare'),
  ('memory_champion', 'Memory Champion', 'Complete 10 memory games', '🧠', 100, 'subject', 'rare'),
  ('ai_explorer', 'AI Explorer', 'Chat with AI friends 10 times', '🤖', 100, 'social', 'rare'),
  ('early_bird', 'Early Bird', 'Complete an activity before 9 AM', '🌅', 25, 'special', 'common'),
  ('night_owl', 'Night Owl', 'Complete an activity after 8 PM', '🦉', 25, 'special', 'common'),
  ('speed_demon', 'Speed Demon', 'Complete a quiz in under 2 minutes', '⚡', 50, 'achievement', 'rare'),
  ('legendary_learner', 'Legendary Learner', 'Reach level 10', '👑', 2000, 'milestone', 'legendary')
ON CONFLICT (badge_id) DO NOTHING;
