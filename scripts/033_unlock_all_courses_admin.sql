-- Unlock all courses for admin user danijel.milovanovic88+2
-- Inserts course_purchases records for every published course

INSERT INTO course_purchases (user_id, course_id, amount, currency, status, stripe_payment_intent_id, stripe_session_id)
SELECT 
  u.id AS user_id,
  c.id AS course_id,
  0 AS amount,
  'eur' AS currency,
  'completed' AS status,
  'admin_grant' AS stripe_payment_intent_id,
  'admin_grant' AS stripe_session_id
FROM auth.users u
CROSS JOIN courses c
WHERE u.email = 'danijel.milovanovic88+2@gmail.com'
  AND c.is_published = true
ON CONFLICT (user_id, course_id) DO NOTHING;
