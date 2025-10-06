-- Row Level Security Policies for ai_friends table
-- Users can only manage their own AI friends

-- Policy: Users can view their own AI friends
CREATE POLICY "Users can view own AI friends"
ON ai_friends
FOR SELECT
USING (auth.uid() = user_id);

-- Policy: Users can create AI friends
CREATE POLICY "Users can create AI friends"
ON ai_friends
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Policy: Users can update their own AI friends
CREATE POLICY "Users can update own AI friends"
ON ai_friends
FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Policy: Users can delete their own AI friends
CREATE POLICY "Users can delete own AI friends"
ON ai_friends
FOR DELETE
USING (auth.uid() = user_id);
