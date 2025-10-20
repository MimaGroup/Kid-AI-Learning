-- ============================================
-- RLS Verification Script
-- Run this after applying complete-rls-policies.sql
-- ============================================

-- Check that RLS is enabled on all tables
SELECT 
  tablename,
  CASE 
    WHEN rowsecurity THEN '✓ Enabled'
    ELSE '✗ DISABLED'
  END as rls_status
FROM pg_tables 
WHERE schemaname = 'public' 
ORDER BY tablename;

-- Count policies per table
SELECT 
  tablename,
  COUNT(*) as policy_count
FROM pg_policies 
WHERE schemaname = 'public'
GROUP BY tablename
ORDER BY tablename;

-- List all policies with details
SELECT 
  tablename,
  policyname,
  cmd as operation,
  CASE 
    WHEN permissive = 'PERMISSIVE' THEN '✓ Permissive'
    ELSE 'Restrictive'
  END as type
FROM pg_policies 
WHERE schemaname = 'public'
ORDER BY tablename, policyname;

-- Test admin function
SELECT is_admin() as am_i_admin;

-- ============================================
-- Expected Results:
-- ============================================
-- All 21 tables should have RLS enabled
-- Total policies should be 60+
-- is_admin() should return true/false based on your role
