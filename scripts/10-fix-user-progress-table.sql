-- Fix user_progress table schema to match API expectations
-- Add missing columns

-- Add missing columns to user_progress table
ALTER TABLE user_progress 
ADD COLUMN IF NOT EXISTS total_questions INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS time_spent INTEGER DEFAULT 0;

-- Update activity_id to allow NULL (it's optional)
ALTER TABLE user_progress ALTER COLUMN activity_id DROP NOT NULL;
