-- Create permissions system tables
-- This allows granular control over user rights

-- Permissions table: defines available permissions
CREATE TABLE IF NOT EXISTS permissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  description TEXT,
  resource TEXT NOT NULL, -- e.g., 'users', 'content', 'analytics'
  action TEXT NOT NULL, -- e.g., 'create', 'read', 'update', 'delete'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Role permissions: maps permissions to roles
CREATE TABLE IF NOT EXISTS role_permissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  role TEXT NOT NULL CHECK (role IN ('parent', 'child', 'admin', 'moderator', 'educator')),
  permission_id UUID REFERENCES permissions(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(role, permission_id)
);

-- User specific permissions: override role permissions for specific users
CREATE TABLE IF NOT EXISTS user_permissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  permission_id UUID REFERENCES permissions(id) ON DELETE CASCADE,
  granted BOOLEAN DEFAULT true, -- true=grant, false=revoke
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, permission_id)
);

-- Enable RLS
ALTER TABLE permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE role_permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_permissions ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Anyone can view permissions" ON permissions FOR SELECT USING (true);

CREATE POLICY "Admin can manage permissions" ON permissions FOR ALL USING (
  auth.uid() IN (SELECT id FROM profiles WHERE role = 'admin')
);

CREATE POLICY "Anyone can view role permissions" ON role_permissions FOR SELECT USING (true);

CREATE POLICY "Admin can manage role permissions" ON role_permissions FOR ALL USING (
  auth.uid() IN (SELECT id FROM profiles WHERE role = 'admin')
);

CREATE POLICY "Users can view their own permissions" ON user_permissions FOR SELECT USING (
  auth.uid() = user_id OR auth.uid() IN (SELECT id FROM profiles WHERE role = 'admin')
);

CREATE POLICY "Admin can manage user permissions" ON user_permissions FOR ALL USING (
  auth.uid() IN (SELECT id FROM profiles WHERE role = 'admin')
);

-- Insert default permissions
INSERT INTO permissions (name, description, resource, action) VALUES
  ('view_dashboard', 'View parent dashboard', 'dashboard', 'read'),
  ('manage_children', 'Create and manage child profiles', 'children', 'manage'),
  ('view_analytics', 'View learning analytics', 'analytics', 'read'),
  ('view_advanced_analytics', 'View advanced analytics and insights', 'analytics', 'read_advanced'),
  ('manage_subscription', 'Manage subscription and billing', 'subscription', 'manage'),
  ('access_premium_content', 'Access premium learning activities', 'content', 'read_premium'),
  ('play_activities', 'Access learning activities and games', 'activities', 'read'),
  ('earn_achievements', 'Earn badges and achievements', 'achievements', 'create'),
  ('use_ai_friend', 'Use AI friend chat feature', 'ai_friend', 'use'),
  ('view_all_users', 'View all user profiles', 'users', 'read'),
  ('manage_users', 'Create, update, and delete users', 'users', 'manage'),
  ('moderate_content', 'Review and moderate user content', 'content', 'moderate'),
  ('view_system_logs', 'View system error logs', 'logs', 'read'),
  ('manage_support_tickets', 'View and respond to support tickets', 'support', 'manage')
ON CONFLICT (name) DO NOTHING;

-- Assign default permissions to roles
-- Parent permissions
INSERT INTO role_permissions (role, permission_id) 
SELECT 'parent', id FROM permissions WHERE name IN (
  'view_dashboard',
  'manage_children',
  'view_analytics',
  'manage_subscription'
) ON CONFLICT (role, permission_id) DO NOTHING;

-- Child permissions
INSERT INTO role_permissions (role, permission_id)
SELECT 'child', id FROM permissions WHERE name IN (
  'play_activities',
  'earn_achievements',
  'use_ai_friend'
) ON CONFLICT (role, permission_id) DO NOTHING;

-- Admin permissions (all permissions)
INSERT INTO role_permissions (role, permission_id)
SELECT 'admin', id FROM permissions
ON CONFLICT (role, permission_id) DO NOTHING;

-- Add new moderator and educator roles
ALTER TABLE profiles DROP CONSTRAINT IF EXISTS profiles_role_check;
ALTER TABLE profiles ADD CONSTRAINT profiles_role_check 
  CHECK (role IN ('parent', 'child', 'admin', 'moderator', 'educator'));

-- Moderator permissions
INSERT INTO role_permissions (role, permission_id)
SELECT 'moderator', id FROM permissions WHERE name IN (
  'view_dashboard',
  'view_all_users',
  'moderate_content',
  'manage_support_tickets'
) ON CONFLICT (role, permission_id) DO NOTHING;

-- Educator permissions
INSERT INTO role_permissions (role, permission_id)
SELECT 'educator', id FROM permissions WHERE name IN (
  'view_dashboard',
  'view_all_users',
  'view_analytics',
  'view_advanced_analytics',
  'moderate_content'
) ON CONFLICT (role, permission_id) DO NOTHING;
