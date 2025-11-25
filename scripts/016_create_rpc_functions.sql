-- Create RPC function to get profile with secret key
CREATE OR REPLACE FUNCTION get_profile_with_key(user_id_input UUID)
RETURNS TABLE (
  id UUID,
  email TEXT,
  display_name TEXT,
  secret_key TEXT
) 
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT p.id, p.email, p.display_name, p.secret_key
  FROM profiles p
  WHERE p.id = user_id_input;
END;
$$;

-- Create RPC function to get user's friends list  
CREATE OR REPLACE FUNCTION get_user_friends_list(user_id_input UUID)
RETURNS TABLE (
  id UUID,
  status TEXT,
  created_at TIMESTAMP WITH TIME ZONE,
  friend JSONB
)
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    f.id,
    'accepted'::TEXT as status,
    f.created_at,
    jsonb_build_object(
      'id', p.id,
      'display_name', p.display_name,
      'email', p.email,
      'secret_key', p.secret_key
    ) as friend
  FROM friendships f
  JOIN profiles p ON p.id = f.friend_id
  WHERE f.user_id = user_id_input
  ORDER BY f.created_at DESC;
END;
$$;
