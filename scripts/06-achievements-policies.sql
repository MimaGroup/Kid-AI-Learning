-- Row Level Security Policies for achievements table
-- Users can view their own achievements, system creates them

-- Policy: Users can view their own achievements
CREATE POLICY "Users can view own achievements"
ON achievements
FOR SELECT
USING (auth.uid() = user_id);

-- Policy: System can create achievements (via service role)
-- Users can also create achievements (for now - can restrict later)
CREATE POLICY "Users can earn achievements"
ON achievements
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Note: Achievements should not be updated or deleted by users
-- Only SELECT and INSERT policies are defined
