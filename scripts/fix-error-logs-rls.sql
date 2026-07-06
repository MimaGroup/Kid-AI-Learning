-- Fix Row Level Security for error_logs table
-- This allows the application to insert error logs

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow insert error logs" ON error_logs;
DROP POLICY IF EXISTS "Allow read error logs for admins" ON error_logs;

-- Create policy to allow inserting error logs from the application
CREATE POLICY "Allow insert error logs"
ON error_logs
FOR INSERT
TO authenticated, anon
WITH CHECK (true);

-- Create policy to allow reading error logs for authenticated users (admins)
CREATE POLICY "Allow read error logs for admins"
ON error_logs
FOR SELECT
TO authenticated
USING (true);

-- Grant necessary permissions
GRANT INSERT ON error_logs TO authenticated, anon;
GRANT SELECT ON error_logs TO authenticated;
