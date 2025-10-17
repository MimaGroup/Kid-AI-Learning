-- Add admin role support to profiles table
-- This script adds admin functionality to existing users

-- Update the role column to support admin
ALTER TABLE public.profiles 
  ALTER COLUMN role SET DEFAULT 'user';

-- Add check constraint for valid roles
ALTER TABLE public.profiles 
  ADD CONSTRAINT valid_role CHECK (role IN ('user', 'admin'));

-- Create function to check if user is admin
CREATE OR REPLACE FUNCTION public.is_admin(user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = user_id AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission
GRANT EXECUTE ON FUNCTION public.is_admin TO authenticated;

-- To make a user an admin, run:
-- UPDATE public.profiles SET role = 'admin' WHERE email = 'your-admin-email@example.com';
