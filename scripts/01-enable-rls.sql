-- Enable Row Level Security on all tables
-- This ensures that policies must be defined for users to access data

-- Enable RLS on profiles table
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Enable RLS on children table
ALTER TABLE children ENABLE ROW LEVEL SECURITY;

-- Enable RLS on ai_friends table
ALTER TABLE ai_friends ENABLE ROW LEVEL SECURITY;

-- Enable RLS on user_progress table
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;

-- Enable RLS on achievements table
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;
