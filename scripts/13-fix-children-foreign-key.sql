-- Fix for "children_parent_id_fkey" foreign key constraint error
-- This script ensures the foreign key is properly configured

-- First, let's see what foreign keys exist
SELECT
    tc.constraint_name,
    tc.table_name,
    kcu.column_name,
    ccu.table_name AS foreign_table_name,
    ccu.column_name AS foreign_column_name
FROM information_schema.table_constraints AS tc
JOIN information_schema.key_column_usage AS kcu
    ON tc.constraint_name = kcu.constraint_name
JOIN information_schema.constraint_column_usage AS ccu
    ON ccu.constraint_name = tc.constraint_name
WHERE tc.table_name = 'children' AND tc.constraint_type = 'FOREIGN KEY';

-- Drop the existing foreign key constraint if it exists
ALTER TABLE children DROP CONSTRAINT IF EXISTS children_parent_id_fkey CASCADE;

-- Recreate the foreign key with proper configuration
-- This ensures parent_id references profiles.id (not auth.users.id)
ALTER TABLE children
ADD CONSTRAINT children_parent_id_fkey
FOREIGN KEY (parent_id)
REFERENCES profiles(id)
ON DELETE CASCADE;

-- Verify the constraint was created
SELECT
    tc.constraint_name,
    tc.table_name,
    kcu.column_name,
    ccu.table_name AS foreign_table_name,
    ccu.column_name AS foreign_column_name
FROM information_schema.table_constraints AS tc
JOIN information_schema.key_column_usage AS kcu
    ON tc.constraint_name = kcu.constraint_name
JOIN information_schema.constraint_column_usage AS ccu
    ON ccu.constraint_name = tc.constraint_name
WHERE tc.table_name = 'children' AND tc.constraint_type = 'FOREIGN KEY';
