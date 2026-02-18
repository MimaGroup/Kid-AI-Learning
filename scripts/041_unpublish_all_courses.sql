-- Unpublish all courses until content is fully reviewed and ready for users
-- To republish a specific course when ready, run:
--   UPDATE courses SET is_published = true WHERE slug = 'ai-osnove-za-otroke';

UPDATE courses SET is_published = false;
