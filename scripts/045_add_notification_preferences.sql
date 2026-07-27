-- Adds parent-controlled notification preferences (GDPR/ZVOP-2: parents must be able
-- to control what data-driven emails they receive about their child).
ALTER TABLE profiles
  ADD COLUMN IF NOT EXISTS email_notifications_enabled BOOLEAN DEFAULT true,
  ADD COLUMN IF NOT EXISTS weekly_reports_enabled BOOLEAN DEFAULT true,
  ADD COLUMN IF NOT EXISTS achievement_alerts_enabled BOOLEAN DEFAULT true;
