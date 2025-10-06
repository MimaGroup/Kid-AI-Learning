-- Row Level Security Policies for children table
-- Parents can manage their own children's accounts

-- Policy: Parents can view their own children
CREATE POLICY "Parents can view own children"
ON children
FOR SELECT
USING (auth.uid() = parent_id);

-- Policy: Parents can create children accounts
CREATE POLICY "Parents can create children"
ON children
FOR INSERT
WITH CHECK (auth.uid() = parent_id);

-- Policy: Parents can update their children's info
CREATE POLICY "Parents can update own children"
ON children
FOR UPDATE
USING (auth.uid() = parent_id)
WITH CHECK (auth.uid() = parent_id);

-- Policy: Parents can delete their children's accounts
CREATE POLICY "Parents can delete own children"
ON children
FOR DELETE
USING (auth.uid() = parent_id);
