-- Row Level Security Policies for user_progress table
-- Users can view and create their own progress records

-- Policy: Users can view their own progress
CREATE POLICY "Users can view own progress"
ON user_progress
FOR SELECT
USING (auth.uid() = user_id);

-- Policy: Users can create progress records
CREATE POLICY "Users can create progress records"
ON user_progress
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Policy: Users can update their own progress (for corrections)
CREATE POLICY "Users can update own progress"
ON user_progress
FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Note: Typically progress records should not be deleted
-- If you need deletion, add a DELETE policy similar to above
