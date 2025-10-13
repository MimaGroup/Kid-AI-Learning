-- Fix Daily Challenges RLS Policy
-- Allow system to insert daily challenges

-- Drop and recreate the INSERT policy for daily_challenges
DROP POLICY IF EXISTS "System can create daily challenges" ON daily_challenges;

-- Allow anyone to insert daily challenges (the API will control what gets inserted)
CREATE POLICY "System can create daily challenges" 
  ON daily_challenges 
  FOR INSERT 
  WITH CHECK (true);

-- Also ensure the existing policies are correct
DROP POLICY IF EXISTS "Anyone can view daily challenges" ON daily_challenges;
CREATE POLICY "Anyone can view daily challenges" 
  ON daily_challenges 
  FOR SELECT 
  USING (true);
