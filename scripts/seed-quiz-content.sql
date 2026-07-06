-- Seed Quiz Content
-- This script creates sample quiz questions across different subjects and difficulty levels
-- Note: In production, you'll want many more questions

-- Create a temporary table for quiz questions (if you don't have one)
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

-- Enable RLS
ALTER TABLE quiz_questions ENABLE ROW LEVEL SECURITY;

-- Allow everyone to read quiz questions
DROP POLICY IF EXISTS "Anyone can view quiz questions" ON quiz_questions;
CREATE POLICY "Anyone can view quiz questions" ON quiz_questions
  FOR SELECT USING (true);

-- Insert sample quiz questions
INSERT INTO quiz_questions (subject, difficulty, age_group, question, options, correct_answer, explanation, points) VALUES
  -- Math - Easy
  ('math', 'easy', '6-8', 'What is 5 + 3?', '["6", "7", "8", "9"]', '8', 'When you add 5 and 3, you get 8!', 10),
  ('math', 'easy', '6-8', 'What is 10 - 4?', '["4", "5", "6", "7"]', '6', 'When you subtract 4 from 10, you get 6!', 10),
  ('math', 'easy', '6-8', 'What is 2 × 3?', '["5", "6", "7", "8"]', '6', 'When you multiply 2 by 3, you get 6!', 10),
  
  -- Math - Medium
  ('math', 'medium', '9-11', 'What is 15 × 4?', '["50", "55", "60", "65"]', '60', 'When you multiply 15 by 4, you get 60!', 15),
  ('math', 'medium', '9-11', 'What is 144 ÷ 12?', '["10", "11", "12", "13"]', '12', 'When you divide 144 by 12, you get 12!', 15),
  ('math', 'medium', '9-11', 'What is 25% of 80?', '["15", "20", "25", "30"]', '20', '25% means one quarter, and one quarter of 80 is 20!', 15),
  
  -- Science - Easy
  ('science', 'easy', '6-8', 'What do plants need to grow?', '["Only water", "Only sunlight", "Water, sunlight, and air", "Only soil"]', 'Water, sunlight, and air', 'Plants need water, sunlight, and air (carbon dioxide) to grow through photosynthesis!', 10),
  ('science', 'easy', '6-8', 'How many legs does a spider have?', '["6", "8", "10", "12"]', '8', 'Spiders have 8 legs, which makes them arachnids, not insects!', 10),
  ('science', 'easy', '6-8', 'What is the largest planet in our solar system?', '["Earth", "Mars", "Jupiter", "Saturn"]', 'Jupiter', 'Jupiter is the largest planet in our solar system!', 10),
  
  -- Science - Medium
  ('science', 'medium', '9-11', 'What is the process by which plants make food?', '["Respiration", "Photosynthesis", "Digestion", "Fermentation"]', 'Photosynthesis', 'Photosynthesis is how plants use sunlight to make food from carbon dioxide and water!', 15),
  ('science', 'medium', '9-11', 'What is the chemical symbol for water?', '["H2O", "CO2", "O2", "H2"]', 'H2O', 'Water is made of 2 hydrogen atoms and 1 oxygen atom, so its symbol is H2O!', 15),
  
  -- English - Easy
  ('english', 'easy', '6-8', 'What is a noun?', '["An action word", "A describing word", "A person, place, or thing", "A connecting word"]', 'A person, place, or thing', 'A noun is a word that names a person, place, or thing!', 10),
  ('english', 'easy', '6-8', 'Which word is a verb?', '["Happy", "Run", "Blue", "Cat"]', 'Run', 'A verb is an action word, and "run" describes an action!', 10),
  ('english', 'easy', '6-8', 'What is the opposite of "hot"?', '["Warm", "Cold", "Cool", "Freezing"]', 'Cold', 'Cold is the opposite of hot!', 10),
  
  -- English - Medium
  ('english', 'medium', '9-11', 'What is a synonym for "happy"?', '["Sad", "Joyful", "Angry", "Tired"]', 'Joyful', 'A synonym is a word with a similar meaning. Joyful means the same as happy!', 15),
  ('english', 'medium', '9-11', 'Which sentence is correct?', '["She don''t like pizza", "She doesn''t like pizza", "She not like pizza", "She no like pizza"]', 'She doesn''t like pizza', 'The correct form uses "doesn''t" for third person singular!', 15),
  
  -- Geography - Easy
  ('geography', 'easy', '6-8', 'What is the capital of France?', '["London", "Berlin", "Paris", "Rome"]', 'Paris', 'Paris is the capital city of France!', 10),
  ('geography', 'easy', '6-8', 'Which continent is the largest?', '["Africa", "Asia", "Europe", "North America"]', 'Asia', 'Asia is the largest continent by both area and population!', 10),
  
  -- History - Easy
  ('history', 'easy', '6-8', 'Who was the first president of the United States?', '["Abraham Lincoln", "George Washington", "Thomas Jefferson", "John Adams"]', 'George Washington', 'George Washington was the first president of the United States!', 10),
  
  -- Logic - Medium
  ('logic', 'medium', '9-11', 'If all roses are flowers, and some flowers are red, which statement must be true?', '["All roses are red", "Some roses might be red", "No roses are red", "All flowers are roses"]', 'Some roses might be red', 'We know roses are flowers, and some flowers are red, so some roses might be red!', 15)
ON CONFLICT DO NOTHING;

CREATE INDEX IF NOT EXISTS idx_quiz_questions_subject ON quiz_questions(subject);
CREATE INDEX IF NOT EXISTS idx_quiz_questions_difficulty ON quiz_questions(difficulty);
CREATE INDEX IF NOT EXISTS idx_quiz_questions_age_group ON quiz_questions(age_group);

COMMENT ON TABLE quiz_questions IS 'Quiz questions for various subjects and difficulty levels';
