-- Complete Row Level Security Setup (Safe Version)
-- This script can be run multiple times safely

-- ============================================
-- STEP 1: Enable RLS on all tables
-- ============================================
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE children ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_friends ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;

-- ============================================
-- STEP 2: Drop existing policies if they exist
-- ============================================
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;

DROP POLICY IF EXISTS "Parents can view own children" ON children;
DROP POLICY IF EXISTS "Parents can create children" ON children;
DROP POLICY IF EXISTS "Parents can update own children" ON children;
DROP POLICY IF EXISTS "Parents can delete own children" ON children;

DROP POLICY IF EXISTS "Users can view own AI friends" ON ai_friends;
DROP POLICY IF EXISTS "Users can create AI friends" ON ai_friends;
DROP POLICY IF EXISTS "Users can update own AI friends" ON ai_friends;
DROP POLICY IF EXISTS "Users can delete own AI friends" ON ai_friends;

DROP POLICY IF EXISTS "Users can view own progress" ON user_progress;
DROP POLICY IF EXISTS "Users can create progress records" ON user_progress;
DROP POLICY IF EXISTS "Users can update own progress" ON user_progress;

DROP POLICY IF EXISTS "Users can view own achievements" ON achievements;
DROP POLICY IF EXISTS "Users can earn achievements" ON achievements;

-- ============================================
-- STEP 3: Create Profiles Policies
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
-- STEP 4: Create Children Policies
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
-- STEP 5: Create AI Friends Policies
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
-- STEP 6: Create User Progress Policies
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
-- STEP 7: Create Achievements Policies
-- ============================================
CREATE POLICY "Users can view own achievements"
ON achievements FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can earn achievements"
ON achievements FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- ============================================
-- STEP 8: Auto-create Profile on Signup
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
-- Verification Query
-- ============================================
SELECT 
  schemaname,
  tablename,
  policyname
FROM pg_policies
WHERE schemaname = 'public'
ORDER BY tablename, policyname;
