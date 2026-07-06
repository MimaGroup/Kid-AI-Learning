-- Master Seed Script - Run this to populate all initial content
-- This script is safe to run multiple times (uses ON CONFLICT DO NOTHING)
-- Run this AFTER applying RLS policies

-- ============================================
-- 1. BADGES (Gamification)
-- ============================================

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

-- ============================================
-- 2. DAILY CHALLENGES (30 days worth)
-- ============================================

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

-- ============================================
-- 3. PREMIUM ACTIVITIES
-- ============================================

INSERT INTO premium_activities (activity_id, activity_name, is_premium) VALUES
  ('advanced-math', 'Advanced Math Challenges', true),
  ('ai-story-creator', 'AI Story Creator', true),
  ('science-lab', 'Virtual Science Lab', true),
  ('coding-basics', 'Coding Basics', true),
  ('pattern-training', 'Pattern Training Pro', true),
  ('ai-friend-custom', 'Custom AI Friend Creator', true),
  ('math-adventure', 'Math Adventure', false),
  ('word-builder', 'Word Builder', false),
  ('memory-match', 'Memory Match', false),
  ('ai-detective', 'AI Detective Game', false),
  ('ai-quiz', 'AI Quiz Challenge', false),
  ('basic-science', 'Basic Science Quiz', false)
ON CONFLICT (activity_id) DO NOTHING;

-- ============================================
-- 4. QUIZ QUESTIONS (Sample Content)
-- ============================================

-- Create quiz_questions table if it doesn't exist
CREATE TABLE IF NOT EXISTS quiz_questions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  subject TEXT NOT NULL,
  difficulty TEXT NOT NULL CHECK (difficulty IN ('easy', 'medium', 'hard')),
  age_group TEXT NOT NULL,
  question TEXT NOT NULL,
  options JSONB NOT NULL,
  correct_answer TEXT NOT NULL,
  explanation TEXT,
  points INTEGER DEFAULT 10,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on quiz_questions
ALTER TABLE quiz_questions ENABLE ROW LEVEL SECURITY;

-- Drop existing policy if it exists
DROP POLICY IF EXISTS "Anyone can view quiz questions" ON quiz_questions;

-- Allow everyone to read quiz questions
CREATE POLICY "Anyone can view quiz questions" ON quiz_questions
  FOR SELECT USING (true);

-- Insert sample quiz questions
INSERT INTO quiz_questions (subject, difficulty, age_group, question, options, correct_answer, explanation, points) VALUES
  -- Math - Easy
  ('math', 'easy', '6-8', 'What is 5 + 3?', '["6", "7", "8", "9"]', '8', 'When you add 5 and 3, you get 8!', 10),
  ('math', 'easy', '6-8', 'What is 10 - 4?', '["4", "5", "6", "7"]', '6', 'When you subtract 4 from 10, you get 6!', 10),
  ('math', 'easy', '6-8', 'What is 2 × 3?', '["5", "6", "7", "8"]', '6', 'When you multiply 2 by 3, you get 6!', 10),
  ('math', 'easy', '6-8', 'What is 12 ÷ 4?', '["2", "3", "4", "5"]', '3', 'When you divide 12 by 4, you get 3!', 10),
  
  -- Math - Medium
  ('math', 'medium', '9-11', 'What is 15 × 4?', '["50", "55", "60", "65"]', '60', 'When you multiply 15 by 4, you get 60!', 15),
  ('math', 'medium', '9-11', 'What is 144 ÷ 12?', '["10", "11", "12", "13"]', '12', 'When you divide 144 by 12, you get 12!', 15),
  ('math', 'medium', '9-11', 'What is 25% of 80?', '["15", "20", "25", "30"]', '20', '25% means one quarter, and one quarter of 80 is 20!', 15),
  ('math', 'medium', '9-11', 'What is 7²?', '["14", "49", "42", "56"]', '49', '7 squared (7 × 7) equals 49!', 15),
  
  -- Science - Easy
  ('science', 'easy', '6-8', 'What do plants need to grow?', '["Only water", "Only sunlight", "Water, sunlight, and air", "Only soil"]', 'Water, sunlight, and air', 'Plants need water, sunlight, and air (carbon dioxide) to grow through photosynthesis!', 10),
  ('science', 'easy', '6-8', 'How many legs does a spider have?', '["6", "8", "10", "12"]', '8', 'Spiders have 8 legs, which makes them arachnids, not insects!', 10),
  ('science', 'easy', '6-8', 'What is the largest planet in our solar system?', '["Earth", "Mars", "Jupiter", "Saturn"]', 'Jupiter', 'Jupiter is the largest planet in our solar system!', 10),
  ('science', 'easy', '6-8', 'What do bees make?', '["Milk", "Honey", "Butter", "Cheese"]', 'Honey', 'Bees collect nectar from flowers and make honey!', 10),
  
  -- Science - Medium
  ('science', 'medium', '9-11', 'What is the process by which plants make food?', '["Respiration", "Photosynthesis", "Digestion", "Fermentation"]', 'Photosynthesis', 'Photosynthesis is how plants use sunlight to make food from carbon dioxide and water!', 15),
  ('science', 'medium', '9-11', 'What is the chemical symbol for water?', '["H2O", "CO2", "O2", "H2"]', 'H2O', 'Water is made of 2 hydrogen atoms and 1 oxygen atom, so its symbol is H2O!', 15),
  ('science', 'medium', '9-11', 'How many bones are in the human body?', '["186", "206", "226", "246"]', '206', 'An adult human has 206 bones in their body!', 15),
  
  -- English - Easy
  ('english', 'easy', '6-8', 'What is a noun?', '["An action word", "A describing word", "A person, place, or thing", "A connecting word"]', 'A person, place, or thing', 'A noun is a word that names a person, place, or thing!', 10),
  ('english', 'easy', '6-8', 'Which word is a verb?', '["Happy", "Run", "Blue", "Cat"]', 'Run', 'A verb is an action word, and "run" describes an action!', 10),
  ('english', 'easy', '6-8', 'What is the opposite of "hot"?', '["Warm", "Cold", "Cool", "Freezing"]', 'Cold', 'Cold is the opposite of hot!', 10),
  ('english', 'easy', '6-8', 'How many vowels are in the English alphabet?', '["3", "4", "5", "6"]', '5', 'The five vowels are A, E, I, O, and U!', 10),
  
  -- English - Medium
  ('english', 'medium', '9-11', 'What is a synonym for "happy"?', '["Sad", "Joyful", "Angry", "Tired"]', 'Joyful', 'A synonym is a word with a similar meaning. Joyful means the same as happy!', 15),
  ('english', 'medium', '9-11', 'Which sentence is correct?', '["She don''t like pizza", "She doesn''t like pizza", "She not like pizza", "She no like pizza"]', 'She doesn''t like pizza', 'The correct form uses "doesn''t" for third person singular!', 15),
  ('english', 'medium', '9-11', 'What is an adjective?', '["A person", "An action", "A describing word", "A place"]', 'A describing word', 'An adjective describes or modifies a noun!', 15),
  
  -- Geography - Easy
  ('geography', 'easy', '6-8', 'What is the capital of France?', '["London", "Berlin", "Paris", "Rome"]', 'Paris', 'Paris is the capital city of France!', 10),
  ('geography', 'easy', '6-8', 'Which continent is the largest?', '["Africa", "Asia", "Europe", "North America"]', 'Asia', 'Asia is the largest continent by both area and population!', 10),
  ('geography', 'easy', '6-8', 'Which ocean is the largest?', '["Atlantic", "Pacific", "Indian", "Arctic"]', 'Pacific', 'The Pacific Ocean is the largest ocean on Earth!', 10),
  
  -- History - Easy
  ('history', 'easy', '6-8', 'Who was the first president of the United States?', '["Abraham Lincoln", "George Washington", "Thomas Jefferson", "John Adams"]', 'George Washington', 'George Washington was the first president of the United States!', 10),
  ('history', 'easy', '6-8', 'In which year did World War II end?', '["1943", "1944", "1945", "1946"]', '1945', 'World War II ended in 1945!', 10),
  
  -- Logic - Medium
  ('logic', 'medium', '9-11', 'If all roses are flowers, and some flowers are red, which statement must be true?', '["All roses are red", "Some roses might be red", "No roses are red", "All flowers are roses"]', 'Some roses might be red', 'We know roses are flowers, and some flowers are red, so some roses might be red!', 15),
  ('logic', 'medium', '9-11', 'What comes next in the pattern: 2, 4, 8, 16, ?', '["20", "24", "32", "64"]', '32', 'Each number is doubled: 2×2=4, 4×2=8, 8×2=16, 16×2=32!', 15)
ON CONFLICT DO NOTHING;

-- ============================================
-- Create indexes for better performance
-- ============================================

CREATE INDEX IF NOT EXISTS idx_daily_challenges_active_date ON daily_challenges(active_date);
CREATE INDEX IF NOT EXISTS idx_quiz_questions_subject ON quiz_questions(subject);
CREATE INDEX IF NOT EXISTS idx_quiz_questions_difficulty ON quiz_questions(difficulty);
CREATE INDEX IF NOT EXISTS idx_quiz_questions_age_group ON quiz_questions(age_group);
CREATE INDEX IF NOT EXISTS idx_badges_category ON badges(category);
CREATE INDEX IF NOT EXISTS idx_badges_rarity ON badges(rarity);

-- ============================================
-- Success message
-- ============================================

DO $$
BEGIN
  RAISE NOTICE '✅ All content seeded successfully!';
  RAISE NOTICE '📊 Seeded: 16 badges, 30 daily challenges, 12 premium activities, 28 quiz questions';
  RAISE NOTICE '🚀 Your database is ready for launch!';
END $$;
