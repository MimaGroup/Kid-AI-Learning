-- Complete Row Level Security Setup
-- Run this entire script in Supabase SQL Editor to secure all tables

-- ============================================
-- STEP 1: Enable RLS on all tables
-- ============================================
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE children ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_friends ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;

-- ============================================
-- STEP 2: Profiles Policies
-- ============================================
CREATE POLICY "Users can view own profile"
ON profiles FOR SELECT
USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
ON profiles FOR INSERT
WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile"
ON profiles FOR UPDATE
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

-- ============================================
-- STEP 3: Children Policies
-- ============================================
CREATE POLICY "Parents can view own children"
ON children FOR SELECT
USING (auth.uid() = parent_id);

CREATE POLICY "Parents can create children"
ON children FOR INSERT
WITH CHECK (auth.uid() = parent_id);

CREATE POLICY "Parents can update own children"
ON children FOR UPDATE
USING (auth.uid() = parent_id)
WITH CHECK (auth.uid() = parent_id);

CREATE POLICY "Parents can delete own children"
ON children FOR DELETE
USING (auth.uid() = parent_id);

-- ============================================
-- STEP 4: AI Friends Policies
-- ============================================
CREATE POLICY "Users can view own AI friends"
ON ai_friends FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create AI friends"
ON ai_friends FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own AI friends"
ON ai_friends FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own AI friends"
ON ai_friends FOR DELETE
USING (auth.uid() = user_id);

-- ============================================
-- STEP 5: User Progress Policies
-- ============================================
CREATE POLICY "Users can view own progress"
ON user_progress FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create progress records"
ON user_progress FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own progress"
ON user_progress FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- ============================================
-- STEP 6: Achievements Policies
-- ============================================
CREATE POLICY "Users can view own achievements"
ON achievements FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can earn achievements"
ON achievements FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- ============================================
-- STEP 7: Auto-create Profile on Signup
-- ============================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, display_name, role, created_at, updated_at)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1)),
    COALESCE(new.raw_user_meta_data->>'role', 'parent'),
    now(),
    now()
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================
-- Setup Complete!
-- ============================================
