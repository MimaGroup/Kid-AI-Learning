-- Seed Daily Challenges
-- This script populates the daily_challenges table with a variety of challenges

-- Clear existing challenges (optional - remove if you want to keep existing data)
-- DELETE FROM daily_challenges;

-- Insert daily challenges for the next 30 days
INSERT INTO daily_challenges (challenge_id, title, description, activity_type, target_value, points_reward, active_date) VALUES
  -- Week 1
  ('challenge_001', 'Quiz Master', 'Complete 3 quizzes today', 'quiz', 3, 50, CURRENT_DATE),
  ('challenge_002', 'Math Whiz', 'Solve 10 math problems', 'math', 10, 40, CURRENT_DATE + INTERVAL '1 day'),
  ('challenge_003', 'Word Wizard', 'Learn 5 new words', 'word', 5, 35, CURRENT_DATE + INTERVAL '2 days'),
  ('challenge_004', 'Memory Master', 'Complete 2 memory games', 'memory', 2, 30, CURRENT_DATE + INTERVAL '3 days'),
  ('challenge_005', 'AI Explorer', 'Chat with an AI friend for 10 minutes', 'ai_chat', 10, 45, CURRENT_DATE + INTERVAL '4 days'),
  ('challenge_006', 'Speed Learner', 'Complete any activity in under 5 minutes', 'speed', 1, 60, CURRENT_DATE + INTERVAL '5 days'),
  ('challenge_007', 'Perfect Score', 'Get 100% on any quiz', 'perfect', 1, 75, CURRENT_DATE + INTERVAL '6 days'),
  
  -- Week 2
  ('challenge_008', 'Early Bird', 'Complete an activity before 10 AM', 'time', 1, 40, CURRENT_DATE + INTERVAL '7 days'),
  ('challenge_009', 'Pattern Pro', 'Complete 3 pattern recognition activities', 'pattern', 3, 50, CURRENT_DATE + INTERVAL '8 days'),
  ('challenge_010', 'Story Time', 'Read 2 educational stories', 'reading', 2, 35, CURRENT_DATE + INTERVAL '9 days'),
  ('challenge_011', 'Quiz Champion', 'Complete 5 quizzes today', 'quiz', 5, 80, CURRENT_DATE + INTERVAL '10 days'),
  ('challenge_012', 'Math Marathon', 'Solve 20 math problems', 'math', 20, 70, CURRENT_DATE + INTERVAL '11 days'),
  ('challenge_013', 'Vocabulary Builder', 'Learn 10 new words', 'word', 10, 60, CURRENT_DATE + INTERVAL '12 days'),
  ('challenge_014', 'Memory Champion', 'Complete 4 memory games with perfect score', 'memory', 4, 90, CURRENT_DATE + INTERVAL '13 days'),
  
  -- Week 3
  ('challenge_015', 'AI Buddy', 'Have 3 conversations with AI friends', 'ai_chat', 3, 55, CURRENT_DATE + INTERVAL '14 days'),
  ('challenge_016', 'Quick Thinker', 'Complete 3 activities in under 3 minutes each', 'speed', 3, 85, CURRENT_DATE + INTERVAL '15 days'),
  ('challenge_017', 'Learning Streak', 'Complete at least 1 activity (maintain streak)', 'streak', 1, 40, CURRENT_DATE + INTERVAL '16 days'),
  ('challenge_018', 'Science Explorer', 'Complete 2 science quizzes', 'science', 2, 45, CURRENT_DATE + INTERVAL '17 days'),
  ('challenge_019', 'Creative Mind', 'Complete 2 creative activities', 'creative', 2, 50, CURRENT_DATE + INTERVAL '18 days'),
  ('challenge_020', 'Super Learner', 'Earn 100 points today', 'points', 100, 100, CURRENT_DATE + INTERVAL '19 days'),
  ('challenge_021', 'Night Owl', 'Complete an activity after 6 PM', 'time', 1, 40, CURRENT_DATE + INTERVAL '20 days'),
  
  -- Week 4
  ('challenge_022', 'Quiz Expert', 'Complete 4 quizzes with 80%+ score', 'quiz', 4, 70, CURRENT_DATE + INTERVAL '21 days'),
  ('challenge_023', 'Math Genius', 'Solve 15 math problems correctly', 'math', 15, 65, CURRENT_DATE + INTERVAL '22 days'),
  ('challenge_024', 'Word Master', 'Learn 8 new words and use them', 'word', 8, 55, CURRENT_DATE + INTERVAL '23 days'),
  ('challenge_025', 'Memory Expert', 'Complete 3 memory games', 'memory', 3, 45, CURRENT_DATE + INTERVAL '24 days'),
  ('challenge_026', 'AI Conversation', 'Chat with AI friends for 15 minutes', 'ai_chat', 15, 60, CURRENT_DATE + INTERVAL '25 days'),
  ('challenge_027', 'Lightning Fast', 'Complete any quiz in under 2 minutes', 'speed', 1, 80, CURRENT_DATE + INTERVAL '26 days'),
  ('challenge_028', 'Perfect Week', 'Complete activities 7 days in a row', 'streak', 7, 150, CURRENT_DATE + INTERVAL '27 days'),
  
  -- Bonus challenges
  ('challenge_029', 'Ultimate Learner', 'Complete 10 different activities today', 'variety', 10, 120, CURRENT_DATE + INTERVAL '28 days'),
  ('challenge_030', 'Knowledge Master', 'Earn 200 points today', 'points', 200, 150, CURRENT_DATE + INTERVAL '29 days')
ON CONFLICT (challenge_id) DO NOTHING;

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_daily_challenges_active_date ON daily_challenges(active_date);

COMMENT ON TABLE daily_challenges IS 'Daily challenges that refresh and provide variety for users';
