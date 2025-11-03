# URGENT: Database Fix Required

## Issue
Users are getting "Database error saving new user" when creating child profiles.

**Error Message:**
\`\`\`
Failed to create child profile: insert or update on table "children" 
violates foreign key constraint "children_parent_id_fkey"
\`\`\`

## Root Cause
The `children` table has a `child_id` column that references `auth.users(id)`, but the API doesn't create separate auth users for children. Children are simple profile records, not separate authenticated users.

## Fix Required

Run this SQL script in your Supabase SQL Editor **immediately**:

\`\`\`sql
-- Remove child_id column completely
ALTER TABLE children DROP COLUMN IF EXISTS child_id CASCADE;

-- Ensure all required columns exist
ALTER TABLE children 
  ALTER COLUMN name SET NOT NULL,
  ALTER COLUMN age SET NOT NULL,
  ALTER COLUMN parent_id SET NOT NULL;

-- Add unique constraint on parent_id + name
ALTER TABLE children DROP CONSTRAINT IF EXISTS children_parent_id_name_key;
ALTER TABLE children ADD CONSTRAINT children_parent_id_name_key UNIQUE(parent_id, name);
\`\`\`

## Verification

After running the script, verify the table structure:

\`\`\`sql
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'children'
ORDER BY ordinal_position;
\`\`\`

Expected columns:
- id (uuid, not null)
- parent_id (uuid, not null) - references auth.users
- name (text, not null)
- age (integer, not null)
- avatar_color (text)
- learning_level (text)
- created_at (timestamp)
- updated_at (timestamp)

## Test

After applying the fix, test by creating a new child profile. It should work without errors.
