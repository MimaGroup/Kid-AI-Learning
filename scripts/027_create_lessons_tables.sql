-- Create course_lessons table (stores pre-written lesson content)
CREATE TABLE IF NOT EXISTS course_lessons (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  module_index INTEGER NOT NULL,
  lesson_index INTEGER NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  content_type TEXT NOT NULL DEFAULT 'text' CHECK (content_type IN ('text', 'activity', 'project')),
  duration_minutes INTEGER NOT NULL DEFAULT 10,
  key_concepts JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(course_id, module_index, lesson_index)
);

-- Create lesson_progress table (tracks per-user progress)
CREATE TABLE IF NOT EXISTS lesson_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  lesson_id UUID NOT NULL REFERENCES course_lessons(id) ON DELETE CASCADE,
  course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'not_started' CHECK (status IN ('not_started', 'in_progress', 'completed')),
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  quiz_score INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, lesson_id)
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_lessons_course ON course_lessons(course_id);
CREATE INDEX IF NOT EXISTS idx_lessons_order ON course_lessons(course_id, module_index, lesson_index);
CREATE INDEX IF NOT EXISTS idx_progress_user ON lesson_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_progress_course ON lesson_progress(course_id);
CREATE INDEX IF NOT EXISTS idx_progress_lesson ON lesson_progress(lesson_id);
CREATE INDEX IF NOT EXISTS idx_progress_user_course ON lesson_progress(user_id, course_id);

-- Enable RLS
ALTER TABLE course_lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE lesson_progress ENABLE ROW LEVEL SECURITY;

-- RLS policies for course_lessons (public read for published courses)
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'lessons_public_read') THEN
    CREATE POLICY lessons_public_read ON course_lessons FOR SELECT
    USING (EXISTS (SELECT 1 FROM courses WHERE courses.id = course_lessons.course_id AND courses.is_published = true));
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'lessons_service_insert') THEN
    CREATE POLICY lessons_service_insert ON course_lessons FOR INSERT WITH CHECK (true);
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'lessons_service_update') THEN
    CREATE POLICY lessons_service_update ON course_lessons FOR UPDATE USING (true);
  END IF;
END $$;

-- RLS policies for lesson_progress (users can read/write their own progress)
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'progress_user_read') THEN
    CREATE POLICY progress_user_read ON lesson_progress FOR SELECT USING (auth.uid() = user_id);
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'progress_user_insert') THEN
    CREATE POLICY progress_user_insert ON lesson_progress FOR INSERT WITH CHECK (auth.uid() = user_id);
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'progress_user_update') THEN
    CREATE POLICY progress_user_update ON lesson_progress FOR UPDATE USING (auth.uid() = user_id);
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'progress_service_insert') THEN
    CREATE POLICY progress_service_insert ON lesson_progress FOR INSERT WITH CHECK (true);
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'progress_service_update') THEN
    CREATE POLICY progress_service_update ON lesson_progress FOR UPDATE USING (true);
  END IF;
END $$;
