# URGENT: Fix Signup Error

## Problem
Users are getting "Database error saving new user" when trying to sign up.

## Root Cause
The database trigger `handle_new_user()` is failing silently, preventing profile creation after successful auth signup.

## Immediate Fix Required

### Step 1: Run the Fix Script in Supabase

1. Go to your Supabase Dashboard: https://supabase.com/dashboard
2. Select your project: "AI Kids Learning"
3. Go to **SQL Editor** (left sidebar)
4. Click **New Query**
5. Copy and paste the contents of `scripts/fix-signup-trigger.sql`
6. Click **Run** (or press Cmd/Ctrl + Enter)

### Step 2: Verify the Fix

After running the script, test signup:

1. Go to your app signup page
2. Try creating a new account with a test email
3. Check if signup succeeds without errors

### Step 3: Check Existing Failed Signups

Some users may have successfully created auth accounts but failed to create profiles. Run this query to find them:

\`\`\`sql
-- Find users without profiles
SELECT 
  au.id,
  au.email,
  au.created_at
FROM auth.users au
LEFT JOIN public.profiles p ON au.id = p.id
WHERE p.id IS NULL
ORDER BY au.created_at DESC;
\`\`\`

If you find any, create their profiles manually:

\`\`\`sql
-- Create missing profiles (replace with actual user IDs)
INSERT INTO public.profiles (id, email, display_name, role, created_at, updated_at)
SELECT 
  au.id,
  au.email,
  split_part(au.email, '@', 1) as display_name,
  'parent' as role,
  au.created_at,
  now() as updated_at
FROM auth.users au
LEFT JOIN public.profiles p ON au.id = p.id
WHERE p.id IS NULL;
\`\`\`

### Step 4: Notify Affected Users

Email users who tried to sign up but failed:
- Apologize for the issue
- Let them know it's fixed
- Ask them to try signing up again
- Offer support if they have questions

## What Changed

The trigger now:
1. Handles errors gracefully with `EXCEPTION` block
2. Uses `ON CONFLICT` to prevent duplicate key errors
3. Logs warnings instead of failing silently
4. Returns successfully even if profile creation fails (auth account still created)

## Prevention

This fix ensures:
- Signups never fail due to profile creation issues
- Errors are logged for debugging
- Users can still authenticate even if profile creation has issues
- Duplicate signups are handled gracefully

## Timeline

- **Immediate**: Run the fix script (5 minutes)
- **Within 1 hour**: Test signup flow
- **Within 24 hours**: Check for and fix orphaned auth accounts
- **Within 48 hours**: Email affected users

## Support

If issues persist after running the fix:
1. Check Supabase logs for errors
2. Verify the trigger exists: `SELECT * FROM information_schema.triggers WHERE trigger_name = 'on_auth_user_created';`
3. Check RLS policies on profiles table
4. Contact support with error logs
