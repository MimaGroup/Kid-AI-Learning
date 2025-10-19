-- Create content validation tracking table
CREATE TABLE IF NOT EXISTS public.content_validations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content_id TEXT NOT NULL,
  content_type TEXT NOT NULL,
  validator_email TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('passed', 'failed', 'needs_review')),
  functionality_score INTEGER NOT NULL DEFAULT 0,
  educational_score INTEGER NOT NULL DEFAULT 0,
  technical_score INTEGER NOT NULL DEFAULT 0,
  ux_score INTEGER NOT NULL DEFAULT 0,
  overall_score INTEGER NOT NULL DEFAULT 0,
  notes TEXT,
  issues JSONB DEFAULT '[]'::jsonb,
  validated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_content_validations_content_id ON public.content_validations(content_id);
CREATE INDEX IF NOT EXISTS idx_content_validations_status ON public.content_validations(status);
CREATE INDEX IF NOT EXISTS idx_content_validations_validated_at ON public.content_validations(validated_at DESC);

-- Enable RLS
ALTER TABLE public.content_validations ENABLE ROW LEVEL SECURITY;

-- Policy: Admins can do everything
CREATE POLICY "Admins can manage content validations"
  ON public.content_validations
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Policy: Users can view validations
CREATE POLICY "Users can view content validations"
  ON public.content_validations
  FOR SELECT
  TO authenticated
  USING (true);
