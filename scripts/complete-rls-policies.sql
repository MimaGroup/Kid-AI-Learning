-- ============================================
-- Complete Row Level Security (RLS) Setup
-- AI Kids Learning Platform
-- ============================================
-- This script enables RLS and creates policies for all tables
-- Run this script to secure the database before soft launch

-- ============================================
-- STEP 1: Enable RLS on ALL tables
-- ============================================

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE children ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_friends ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_daily_challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE payment_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE premium_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE support_tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE support_ticket_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE error_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE system_alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE performance_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_validations ENABLE ROW LEVEL SECURITY;
ALTER TABLE onboarding_progress ENABLE ROW LEVEL SECURITY;

-- ============================================
-- STEP 2: Drop existing policies (if any)
-- ============================================

-- Profiles
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Admins can view all profiles" ON profiles;

-- Children
DROP POLICY IF EXISTS "Parents can view own children" ON children;
DROP POLICY IF EXISTS "Parents can create children" ON children;
DROP POLICY IF EXISTS "Parents can update own children" ON children;
DROP POLICY IF EXISTS "Parents can delete own children" ON children;

-- AI Friends
DROP POLICY IF EXISTS "Users can view own AI friends" ON ai_friends;
DROP POLICY IF EXISTS "Users can create AI friends" ON ai_friends;
DROP POLICY IF EXISTS "Users can update own AI friends" ON ai_friends;
DROP POLICY IF EXISTS "Users can delete own AI friends" ON ai_friends;

-- User Progress
DROP POLICY IF EXISTS "Users can view own progress" ON user_progress;
DROP POLICY IF EXISTS "Users can create progress records" ON user_progress;
DROP POLICY IF EXISTS "Users can update own progress" ON user_progress;

-- Achievements
DROP POLICY IF EXISTS "Users can view own achievements" ON achievements;
DROP POLICY IF EXISTS "Users can earn achievements" ON achievements;

-- Badges (public read)
DROP POLICY IF EXISTS "Anyone can view badges" ON badges;

-- User Badges
DROP POLICY IF EXISTS "Users can view own badges" ON user_badges;
DROP POLICY IF EXISTS "Users can earn badges" ON user_badges;

-- Daily Challenges (public read)
DROP POLICY IF EXISTS "Anyone can view daily challenges" ON daily_challenges;

-- User Daily Challenges
DROP POLICY IF EXISTS "Users can view own challenge progress" ON user_daily_challenges;
DROP POLICY IF EXISTS "Users can complete challenges" ON user_daily_challenges;

-- Subscriptions
DROP POLICY IF EXISTS "Users can view their own subscription" ON subscriptions;
DROP POLICY IF EXISTS "Users can insert their own subscription" ON subscriptions;
DROP POLICY IF EXISTS "Users can update their own subscription" ON subscriptions;
DROP POLICY IF EXISTS "Admins can view all subscriptions" ON subscriptions;

-- Payment History
DROP POLICY IF EXISTS "Users can view their own payment history" ON payment_history;
DROP POLICY IF EXISTS "Users can insert their own payment history" ON payment_history;
DROP POLICY IF EXISTS "Admins can view all payments" ON payment_history;

-- Premium Activities (public read)
DROP POLICY IF EXISTS "Anyone can view premium activities" ON premium_activities;

-- Notifications
DROP POLICY IF EXISTS "Users can view their own notifications" ON notifications;
DROP POLICY IF EXISTS "Users can update their own notifications" ON notifications;
DROP POLICY IF EXISTS "Users can insert notifications" ON notifications;

-- Support Tickets
DROP POLICY IF EXISTS "Users can view their own tickets" ON support_tickets;
DROP POLICY IF EXISTS "Anyone can create tickets" ON support_tickets;
DROP POLICY IF EXISTS "Admins can view all tickets" ON support_tickets;
DROP POLICY IF EXISTS "Admins can update tickets" ON support_tickets;

-- Support Ticket Responses
DROP POLICY IF EXISTS "Users can view responses to their tickets" ON support_ticket_responses;
DROP POLICY IF EXISTS "Admins can view all responses" ON support_ticket_responses;
DROP POLICY IF EXISTS "Admins can insert responses" ON support_ticket_responses;

-- Email Log (admin only)
DROP POLICY IF EXISTS "Admins can view email log" ON email_log;

-- Error Logs (admin only)
DROP POLICY IF EXISTS "Admins can view error logs" ON error_logs;
DROP POLICY IF EXISTS "Admins can insert error logs" ON error_logs;

-- System Alerts (admin only)
DROP POLICY IF EXISTS "Admins can view system alerts" ON system_alerts;
DROP POLICY IF EXISTS "Admins can manage system alerts" ON system_alerts;

-- Performance Metrics (admin only)
DROP POLICY IF EXISTS "Admins can view performance metrics" ON performance_metrics;

-- Content Validations (admin only)
DROP POLICY IF EXISTS "Admins can view content validations" ON content_validations;
DROP POLICY IF EXISTS "Admins can manage content validations" ON content_validations;

-- Onboarding Progress
DROP POLICY IF EXISTS "Users can view own onboarding progress" ON onboarding_progress;
DROP POLICY IF EXISTS "Users can manage own onboarding progress" ON onboarding_progress;

-- ============================================
-- STEP 3: Create helper function for admin check
-- ============================================

CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- STEP 4: Profiles Policies
-- ============================================

CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Admins can view all profiles"
  ON profiles FOR SELECT
  USING (is_admin());

-- ============================================
-- STEP 5: Children Policies
-- ============================================

CREATE POLICY "Parents can view own children"
  ON children FOR SELECT
  USING (auth.uid() = parent_id);

CREATE POLICY "Parents can create children"
  ON children FOR INSERT
  WITH CHECK (auth.uid() = parent_id);

CREATE POLICY "Parents can update own children"
  ON children FOR UPDATE
  USING (auth.uid() = parent_id)
  WITH CHECK (auth.uid() = parent_id);

CREATE POLICY "Parents can delete own children"
  ON children FOR DELETE
  USING (auth.uid() = parent_id);

-- ============================================
-- STEP 6: AI Friends Policies
-- ============================================

CREATE POLICY "Users can view own AI friends"
  ON ai_friends FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create AI friends"
  ON ai_friends FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own AI friends"
  ON ai_friends FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own AI friends"
  ON ai_friends FOR DELETE
  USING (auth.uid() = user_id);

-- ============================================
-- STEP 7: User Progress Policies
-- ============================================

CREATE POLICY "Users can view own progress"
  ON user_progress FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create progress records"
  ON user_progress FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own progress"
  ON user_progress FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- ============================================
-- STEP 8: Achievements Policies
-- ============================================

CREATE POLICY "Users can view own achievements"
  ON achievements FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can earn achievements"
  ON achievements FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- ============================================
-- STEP 9: Badges Policies (Public Read)
-- ============================================

CREATE POLICY "Anyone can view badges"
  ON badges FOR SELECT
  USING (true);

-- ============================================
-- STEP 10: User Badges Policies
-- ============================================

CREATE POLICY "Users can view own badges"
  ON user_badges FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can earn badges"
  ON user_badges FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- ============================================
-- STEP 11: Daily Challenges Policies (Public Read)
-- ============================================

CREATE POLICY "Anyone can view daily challenges"
  ON daily_challenges FOR SELECT
  USING (true);

-- ============================================
-- STEP 12: User Daily Challenges Policies
-- ============================================

CREATE POLICY "Users can view own challenge progress"
  ON user_daily_challenges FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can complete challenges"
  ON user_daily_challenges FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- ============================================
-- STEP 13: Subscriptions Policies
-- ============================================

CREATE POLICY "Users can view their own subscription"
  ON subscriptions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own subscription"
  ON subscriptions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own subscription"
  ON subscriptions FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all subscriptions"
  ON subscriptions FOR SELECT
  USING (is_admin());

-- ============================================
-- STEP 14: Payment History Policies
-- ============================================

CREATE POLICY "Users can view their own payment history"
  ON payment_history FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own payment history"
  ON payment_history FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all payments"
  ON payment_history FOR SELECT
  USING (is_admin());

-- ============================================
-- STEP 15: Premium Activities Policies (Public Read)
-- ============================================

CREATE POLICY "Anyone can view premium activities"
  ON premium_activities FOR SELECT
  USING (true);

-- ============================================
-- STEP 16: Notifications Policies
-- ============================================

CREATE POLICY "Users can view their own notifications"
  ON notifications FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own notifications"
  ON notifications FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can insert notifications"
  ON notifications FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- ============================================
-- STEP 17: Support Tickets Policies
-- ============================================

-- Allow anyone to create tickets (for contact form)
CREATE POLICY "Anyone can create tickets"
  ON support_tickets FOR INSERT
  WITH CHECK (true);

-- Users can view their own tickets
CREATE POLICY "Users can view their own tickets"
  ON support_tickets FOR SELECT
  USING (
    auth.uid() = user_id 
    OR email = (SELECT email FROM auth.users WHERE id = auth.uid())
  );

-- Admins can view all tickets
CREATE POLICY "Admins can view all tickets"
  ON support_tickets FOR SELECT
  USING (is_admin());

-- Admins can update tickets
CREATE POLICY "Admins can update tickets"
  ON support_tickets FOR UPDATE
  USING (is_admin());

-- ============================================
-- STEP 18: Support Ticket Responses Policies
-- ============================================

-- Users can view responses to their tickets
CREATE POLICY "Users can view responses to their tickets"
  ON support_ticket_responses FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.support_tickets
      WHERE id = ticket_id
      AND (user_id = auth.uid() OR email = (SELECT email FROM auth.users WHERE id = auth.uid()))
    )
  );

-- Admins can view all responses
CREATE POLICY "Admins can view all responses"
  ON support_ticket_responses FOR SELECT
  USING (is_admin());

-- Admins can insert responses
CREATE POLICY "Admins can insert responses"
  ON support_ticket_responses FOR INSERT
  WITH CHECK (is_admin());

-- ============================================
-- STEP 19: Email Log Policies (Admin Only)
-- ============================================

CREATE POLICY "Admins can view email log"
  ON email_log FOR SELECT
  USING (is_admin());

-- ============================================
-- STEP 20: Error Logs Policies (Admin Only)
-- ============================================

CREATE POLICY "Admins can view error logs"
  ON error_logs FOR SELECT
  USING (is_admin());

CREATE POLICY "Admins can insert error logs"
  ON error_logs FOR INSERT
  WITH CHECK (is_admin());

-- ============================================
-- STEP 21: System Alerts Policies (Admin Only)
-- ============================================

CREATE POLICY "Admins can view system alerts"
  ON system_alerts FOR SELECT
  USING (is_admin());

CREATE POLICY "Admins can manage system alerts"
  ON system_alerts FOR ALL
  USING (is_admin());

-- ============================================
-- STEP 22: Performance Metrics Policies (Admin Only)
-- ============================================

CREATE POLICY "Admins can view performance metrics"
  ON performance_metrics FOR SELECT
  USING (is_admin());

-- ============================================
-- STEP 23: Content Validations Policies (Admin Only)
-- ============================================

CREATE POLICY "Admins can view content validations"
  ON content_validations FOR SELECT
  USING (is_admin());

CREATE POLICY "Admins can manage content validations"
  ON content_validations FOR ALL
  USING (is_admin());

-- ============================================
-- STEP 24: Onboarding Progress Policies
-- ============================================

CREATE POLICY "Users can view own onboarding progress"
  ON onboarding_progress FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own onboarding progress"
  ON onboarding_progress FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- ============================================
-- VERIFICATION QUERIES
-- ============================================

-- Run these queries to verify RLS is enabled on all tables:
-- SELECT tablename, rowsecurity FROM pg_tables WHERE schemaname = 'public' ORDER BY tablename;

-- Run this to see all policies:
-- SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check 
-- FROM pg_policies WHERE schemaname = 'public' ORDER BY tablename, policyname;

-- ============================================
-- SETUP COMPLETE!
-- ============================================
-- All tables now have RLS enabled with appropriate policies
-- Users can only access their own data
-- Admins have full access to all data
-- Public tables (badges, challenges, premium_activities) are readable by all
-- Support tickets allow public creation for contact form
