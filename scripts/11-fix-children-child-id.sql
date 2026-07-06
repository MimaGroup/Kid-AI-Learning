-- Fix the children table to remove the auth.users foreign key constraint on child_id
-- Children should be simple database records, not separate auth users

-- Drop the foreign key constraint on child_id
ALTER TABLE children DROP CONSTRAINT IF EXISTS children_child_id_fkey;

-- Make child_id nullable and add a default value
ALTER TABLE children ALTER COLUMN child_id DROP NOT NULL;
ALTER TABLE children ALTER COLUMN child_id SET DEFAULT gen_random_uuid();

-- Update existing rows to have a child_id if they don't have one
UPDATE children SET child_id = gen_random_uuid() WHERE child_id IS NULL;

-- Now make it NOT NULL again with the default in place
ALTER TABLE children ALTER COLUMN child_id SET NOT NULL;

-- Drop the old unique constraint that included child_id
ALTER TABLE children DROP CONSTRAINT IF EXISTS children_parent_id_child_id_key;

-- Add a new unique constraint on parent_id and name (each parent can't have duplicate child names)
ALTER TABLE children ADD CONSTRAINT children_parent_id_name_key UNIQUE(parent_id, name);
