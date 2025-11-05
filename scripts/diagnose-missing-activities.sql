-- Diagnostic script to find missing activities for dejan_djurdje

-- 1. Check if dejan_djurdje exists in profiles
SELECT 
  id,
  email,
  display_name,
  created_at,
  last_activity_date,
  points,
  level
FROM profiles
WHERE email LIKE '%dejan%' OR display_name LIKE '%dejan%';

-- 2. Check all user_progress records for dejan (if we find his ID above)
-- Replace 'USER_ID_HERE' with the actual ID from query 1
-- SELECT 
--   up.*,
--   p.email,
--   p.display_name
-- FROM user_progress up
-- LEFT JOIN profiles p ON up.user_id = p.id
-- WHERE up.user_id = 'USER_ID_HERE'
-- ORDER BY up.completed_at DESC;

-- 3. Check for orphaned user_progress records (no matching profile)
SELECT 
  up.id,
  up.user_id,
  up.activity_type,
  up.score,
  up.completed_at,
  'NO PROFILE FOUND' as issue
FROM user_progress up
LEFT JOIN profiles p ON up.user_id = p.id
WHERE p.id IS NULL
ORDER BY up.completed_at DESC
LIMIT 20;

-- 4. Check all recent activities with user info
SELECT 
  up.id,
  up.user_id,
  p.email,
  p.display_name,
  up.activity_type,
  up.score,
  up.completed_at
FROM user_progress up
INNER JOIN profiles p ON up.user_id = p.id
ORDER BY up.completed_at DESC
LIMIT 50;

-- 5. Count activities per user
SELECT 
  p.email,
  p.display_name,
  COUNT(up.id) as activity_count,
  MAX(up.completed_at) as last_activity
FROM profiles p
LEFT JOIN user_progress up ON p.id = up.user_id
GROUP BY p.id, p.email, p.display_name
ORDER BY activity_count DESC;
