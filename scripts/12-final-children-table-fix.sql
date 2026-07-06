-- Final fix for children table - remove child_id completely
-- Children are simple profiles, not separate auth users

-- Drop the child_id column entirely
ALTER TABLE children DROP COLUMN IF EXISTS child_id CASCADE;

-- Ensure all required columns exist with proper constraints
ALTER TABLE children 
  ALTER COLUMN name SET NOT NULL,
  ALTER COLUMN age SET NOT NULL,
  ALTER COLUMN parent_id SET NOT NULL;

-- Add unique constraint on parent_id + name
ALTER TABLE children DROP CONSTRAINT IF EXISTS children_parent_id_name_key;
ALTER TABLE children ADD CONSTRAINT children_parent_id_name_key UNIQUE(parent_id, name);

-- Verify the table structure
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_name = 'children'
ORDER BY ordinal_position;
