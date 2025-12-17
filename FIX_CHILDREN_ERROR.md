# Fix for "Failed to create child profile" Error

## Problem
Users getting error: `insert or update on table "children" violates foreign key constraint "children_parent_id_fkey"`

## Root Cause
The foreign key constraint is checking if the parent_id exists in the profiles table, but some users don't have profiles created yet due to the earlier signup trigger issue.

## Solution - Run These Scripts in Order

### Step 1: Fix User Signup Trigger (if not done already)
Run the script from earlier to ensure all new signups create profiles:

```sql
-- Drop and recreate the signup trigger with error handling
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, display_name, role, created_at, updated_at)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1)),
    COALESCE(new.raw_user_meta_data->>'role', 'parent'),
    now(),
    now()
  )
  ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    updated_at = now();
  
  RETURN new;
EXCEPTION
  WHEN OTHERS THEN
    RAISE WARNING 'Error creating profile for user %: %', new.id, SQLERRM;
    RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

### Step 2: Create Missing Profiles for Existing Users
This ensures all existing auth users have profiles:

```sql
-- Create profiles for any auth users that don't have them
INSERT INTO public.profiles (id, email, display_name, role, created_at, updated_at)
SELECT 
  au.id,
  au.email,
  COALESCE(au.raw_user_meta_data->>'display_name', split_part(au.email, '@', 1)),
  COALESCE(au.raw_user_meta_data->>'role', 'parent'),
  au.created_at,
  now()
FROM auth.users au
LEFT JOIN public.profiles p ON p.id = au.id
WHERE p.id IS NULL
ON CONFLICT (id) DO NOTHING;
```

### Step 3: Fix the Foreign Key Constraint
Run the script `scripts/13-fix-children-foreign-key.sql`

## How to Run

1. Go to Supabase Dashboard → SQL Editor
2. Copy and paste Step 1 script → Run
3. Copy and paste Step 2 script → Run  
4. Copy and paste Step 3 script → Run
5. Test creating a child profile

## Verification

After running all scripts, verify:
1. Check that your user has a profile: `SELECT * FROM profiles WHERE id = auth.uid();`
2. Try creating a child profile again
3. Error should be resolved
