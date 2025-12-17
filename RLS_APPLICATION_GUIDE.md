# RLS Application Guide

This guide will help you apply Row Level Security (RLS) policies to your Supabase database.

## Prerequisites

Before applying RLS policies, ensure you have:

1. ✅ Supabase project created and connected
2. ✅ All database tables created (21 tables)
3. ✅ Environment variables configured:
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`

## Method 1: Using Supabase Dashboard (Recommended)

This is the most reliable method for applying RLS policies.

### Steps:

1. **Open Supabase Dashboard**
   - Go to https://supabase.com/dashboard
   - Select your project: AI Kids Learning

2. **Navigate to SQL Editor**
   - Click on "SQL Editor" in the left sidebar
   - Click "New Query"

3. **Copy and Paste SQL**
   - Open `scripts/complete-rls-policies.sql` in your code editor
   - Copy the entire contents
   - Paste into the SQL Editor

4. **Execute the Script**
   - Click "Run" button (or press Cmd/Ctrl + Enter)
   - Wait for execution to complete (may take 30-60 seconds)
   - Check for any errors in the output

5. **Verify Success**
   - You should see "Success. No rows returned" or similar
   - Any errors about "already exists" are normal and can be ignored

## Method 2: Using Node.js Script (Alternative)

If you prefer to run from the command line:

### Steps:

1. **Install tsx (if not already installed)**
   ```bash
   npm install -g tsx
   ```

2. **Run the Application Script**
   ```bash
   npm run apply-rls
   ```

3. **Verify the Application**
   ```bash
   npm run verify-rls
   ```

## Verification

After applying RLS policies, verify they're working correctly:

### Option A: Run Verification Script
```bash
npm run verify-rls
```

Expected output:
- ✅ All 21 tables should have RLS enabled
- ✅ 60+ policies should be in place
- ✅ No tables should show "DISABLED"

### Option B: Manual Verification in Supabase

1. Go to SQL Editor in Supabase Dashboard
2. Run this query:
   ```sql
   SELECT tablename, rowsecurity 
   FROM pg_tables 
   WHERE schemaname = 'public' 
   ORDER BY tablename;
   ```
3. Verify all tables show `rowsecurity = true`

## What RLS Policies Do

The RLS policies implement a three-tier security model:

### 1. User-Owned Data
Users can only access their own records:
- `profiles` - Own profile
- `children` - Own children
- `ai_friends` - Own AI friends
- `user_progress` - Own progress
- `achievements` - Own achievements
- `user_badges` - Own badges
- `user_daily_challenges` - Own challenge progress
- `subscriptions` - Own subscription
- `payment_history` - Own payments
- `notifications` - Own notifications
- `onboarding_progress` - Own onboarding data

### 2. Public Data
Anyone can read (but not modify):
- `badges` - All badge definitions
- `daily_challenges` - All daily challenges
- `premium_activities` - All premium content

### 3. Admin-Only Data
Only users with `role='admin'` can access:
- `email_log` - Email sending logs
- `error_logs` - Application errors
- `system_alerts` - System alerts
- `performance_metrics` - Performance data
- `content_validations` - Content moderation logs

### 4. Special Cases

**Support Tickets:**
- Anyone can create tickets (for contact form)
- Users can view their own tickets
- Admins can view and update all tickets

**Support Ticket Responses:**
- Users can view responses to their tickets
- Admins can view and create all responses

## Troubleshooting

### Error: "permission denied for table users"

This error occurs when RLS policies reference tables that don't exist or have incorrect permissions.

**Solution:**
1. Ensure all tables are created
2. Re-run the RLS script
3. Check that the `is_admin()` function was created successfully

### Error: "policy already exists"

This is normal and can be ignored. It means the policy was already created in a previous run.

### Error: "function is_admin() does not exist"

The helper function wasn't created properly.

**Solution:**
Run this SQL in Supabase Dashboard:
```sql
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

### Some tables still show RLS disabled

**Solution:**
1. Check if the table exists: `SELECT * FROM information_schema.tables WHERE table_name = 'your_table';`
2. Manually enable RLS: `ALTER TABLE your_table ENABLE ROW LEVEL SECURITY;`
3. Re-run the RLS script

## Testing RLS Policies

After applying RLS, test that they work correctly:

### Test 1: User Can Access Own Data
1. Sign up as a regular user
2. Create a child profile
3. Verify you can see your child
4. Try to access another user's data (should fail)

### Test 2: Admin Can Access All Data
1. Sign in as admin user
2. Go to admin dashboard
3. Verify you can see all users, subscriptions, etc.

### Test 3: Public Data is Accessible
1. Without signing in, try to view badges or challenges
2. Should be able to read but not modify

### Test 4: Support Tickets Work
1. Submit a contact form (creates support ticket)
2. Verify ticket appears in admin dashboard
3. Respond to ticket as admin
4. Verify response is saved

## Next Steps

After successfully applying RLS policies:

1. ✅ Update API routes to use regular Supabase client instead of service role
2. ✅ Test all user flows to ensure RLS doesn't block legitimate access
3. ✅ Monitor error logs for RLS-related issues
4. ✅ Document any custom policies added for new features

## Important Notes

- **Service Role Key Bypass:** The service role key bypasses RLS. Only use it for admin operations.
- **Testing:** Always test RLS policies in a development environment first.
- **Backup:** Supabase automatically backs up your database, but consider taking a manual backup before applying RLS.
- **Performance:** RLS policies can impact query performance. Monitor and optimize as needed.

## Support

If you encounter issues:
1. Check the Supabase logs in the Dashboard
2. Review the error messages carefully
3. Consult the Supabase RLS documentation: https://supabase.com/docs/guides/auth/row-level-security
4. Ask for help in the Supabase Discord community

---

**Status:** Ready to apply RLS policies
**Last Updated:** 2025-10-20
</markdown>
