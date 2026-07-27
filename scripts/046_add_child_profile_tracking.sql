-- Adds per-child activity attribution.
--
-- Background: migration 12-final-children-table-fix.sql intentionally dropped
-- "children.child_id" — children do not have their own auth.users identity, which is
-- correct (they log in through the parent's session). However nothing replaced it:
-- user_progress/achievements/ai_friends have only ever recorded the PARENT's own
-- user_id, with no way to tell which child profile actually did the activity. That
-- broke per-child views (parent dashboard, weekly email summaries) once multiple
-- children share one account.
--
-- This adds a nullable child_profile_id referencing the "children" profile row
-- (not an auth user). Nullable so existing historical rows and any flow that hasn't
-- selected an active child yet keep working exactly as before (family-wide fallback).

ALTER TABLE user_progress ADD COLUMN IF NOT EXISTS child_profile_id UUID REFERENCES children(id) ON DELETE SET NULL;
ALTER TABLE achievements ADD COLUMN IF NOT EXISTS child_profile_id UUID REFERENCES children(id) ON DELETE SET NULL;
ALTER TABLE ai_friends ADD COLUMN IF NOT EXISTS child_profile_id UUID REFERENCES children(id) ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS idx_user_progress_child_profile_id ON user_progress(child_profile_id);
CREATE INDEX IF NOT EXISTS idx_achievements_child_profile_id ON achievements(child_profile_id);
CREATE INDEX IF NOT EXISTS idx_ai_friends_child_profile_id ON ai_friends(child_profile_id);
