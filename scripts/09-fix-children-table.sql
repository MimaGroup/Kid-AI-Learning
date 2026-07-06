-- Fix children table schema to match API expectations
-- Add missing columns

-- Add missing columns to children table
ALTER TABLE children 
ADD COLUMN IF NOT EXISTS name TEXT,
ADD COLUMN IF NOT EXISTS age INTEGER CHECK (age >= 3 AND age <= 18),
ADD COLUMN IF NOT EXISTS avatar_color TEXT DEFAULT '#4F46E5',
ADD COLUMN IF NOT EXISTS learning_level TEXT DEFAULT 'beginner' CHECK (learning_level IN ('beginner', 'intermediate', 'advanced'));

-- Update existing rows to have default values
UPDATE children SET name = 'Child' WHERE name IS NULL;
UPDATE children SET age = 8 WHERE age IS NULL;
UPDATE children SET avatar_color = '#4F46E5' WHERE avatar_color IS NULL;
UPDATE children SET learning_level = 'beginner' WHERE learning_level IS NULL;

-- Make name NOT NULL after setting defaults
ALTER TABLE children ALTER COLUMN name SET NOT NULL;

-- Add updated_at column if it doesn't exist
ALTER TABLE children ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- Create or replace trigger for updated_at
CREATE OR REPLACE FUNCTION update_children_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS children_updated_at ON children;
CREATE TRIGGER children_updated_at
  BEFORE UPDATE ON children
  FOR EACH ROW
  EXECUTE FUNCTION update_children_updated_at();

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_children_parent_id ON children(parent_id);
CREATE INDEX IF NOT EXISTS idx_children_child_id ON children(child_id);
