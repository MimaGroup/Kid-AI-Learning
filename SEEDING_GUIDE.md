# Database Seeding Guide

This guide explains how to populate your database with initial content for launch.

## Quick Start

**Run the master seed script in Supabase SQL Editor:**

1. Go to your Supabase Dashboard → SQL Editor
2. Copy the entire content from `scripts/master-seed-all-content.sql`
3. Paste and click "Run"
4. Wait for success message

That's it! Your database now has all the initial content needed for launch.

## What Gets Seeded

### 1. Badges (16 total)
- **Milestone badges**: First Steps, Quick Learner, Dedicated Student, Master Learner, Legendary Learner
- **Streak badges**: 3 Day, 7 Day, 30 Day Streaks
- **Subject badges**: Math Wizard, Word Master, Memory Champion
- **Achievement badges**: Perfect Score, Speed Demon
- **Social badges**: AI Explorer
- **Special badges**: Early Bird, Night Owl

### 2. Daily Challenges (30 days)
- Week 1: Basic challenges (Quiz Master, Math Whiz, Word Wizard, etc.)
- Week 2: Intermediate challenges (Quiz Champion, Math Marathon, etc.)
- Week 3: Advanced challenges (AI Buddy, Quick Thinker, etc.)
- Week 4: Expert challenges (Quiz Expert, Math Genius, etc.)
- Bonus: Ultimate Learner, Knowledge Master

### 3. Premium Activities (12 total)
**Premium (requires subscription):**
- Advanced Math Challenges
- AI Story Creator
- Virtual Science Lab
- Coding Basics
- Pattern Training Pro
- Custom AI Friend Creator

**Free:**
- Math Adventure
- Word Builder
- Memory Match
- AI Detective Game
- AI Quiz Challenge
- Basic Science Quiz

### 4. Quiz Questions (28 questions)
**Subjects covered:**
- Math (8 questions: easy & medium)
- Science (7 questions: easy & medium)
- English (7 questions: easy & medium)
- Geography (3 questions: easy)
- History (2 questions: easy)
- Logic (2 questions: medium)

**Age groups:**
- 6-8 years (easy questions)
- 9-11 years (medium questions)

## Individual Seed Scripts

If you prefer to run scripts separately:

### Badges Only
```sql
-- Run: scripts/006_gamification_system_v2.sql
```

### Daily Challenges Only
```sql
-- Run: scripts/seed-daily-challenges.sql
```

### Quiz Questions Only
```sql
-- Run: scripts/seed-quiz-content.sql
```

### Premium Activities Only
```sql
-- Run: scripts/008_create_subscriptions_schema.sql
```

## Verification

After seeding, verify the data was inserted:

```sql
-- Check badges
SELECT COUNT(*) as badge_count FROM badges;
-- Expected: 16

-- Check daily challenges
SELECT COUNT(*) as challenge_count FROM daily_challenges;
-- Expected: 30

-- Check premium activities
SELECT COUNT(*) as activity_count FROM premium_activities;
-- Expected: 12

-- Check quiz questions
SELECT COUNT(*) as question_count FROM quiz_questions;
-- Expected: 28

-- View today's challenge
SELECT * FROM daily_challenges 
WHERE active_date = CURRENT_DATE;

-- View all badges by rarity
SELECT rarity, COUNT(*) as count 
FROM badges 
GROUP BY rarity 
ORDER BY 
  CASE rarity 
    WHEN 'common' THEN 1 
    WHEN 'rare' THEN 2 
    WHEN 'epic' THEN 3 
    WHEN 'legendary' THEN 4 
  END;
```

## Adding More Content

### Add More Quiz Questions

```sql
INSERT INTO quiz_questions (subject, difficulty, age_group, question, options, correct_answer, explanation, points) VALUES
  ('math', 'easy', '6-8', 'Your question here?', '["Option 1", "Option 2", "Option 3", "Option 4"]', 'Correct Answer', 'Explanation here', 10);
```

### Add More Badges

```sql
INSERT INTO badges (badge_id, name, description, icon, points_required, category, rarity) VALUES
  ('new_badge', 'Badge Name', 'Badge description', '🎯', 100, 'milestone', 'rare');
```

### Add More Daily Challenges

```sql
INSERT INTO daily_challenges (challenge_id, title, description, activity_type, target_value, points_reward, active_date) VALUES
  ('challenge_031', 'New Challenge', 'Challenge description', 'quiz', 5, 50, CURRENT_DATE + INTERVAL '30 days');
```

## Content Recommendations for Production

Before full launch, consider adding:

1. **More Quiz Questions** (aim for 100+ per subject)
   - Multiple difficulty levels
   - Various age groups
   - Diverse topics within each subject

2. **More Daily Challenges** (aim for 90+ days)
   - Seasonal challenges
   - Holiday-themed challenges
   - Progressive difficulty

3. **More Badges** (aim for 30-50 total)
   - Subject-specific achievements
   - Seasonal badges
   - Community badges

4. **AI Friend Personalities** (if not already in database)
   - Different character types
   - Age-appropriate personalities
   - Educational focus areas

## Troubleshooting

### Error: "duplicate key value violates unique constraint"
This means the content already exists. The script uses `ON CONFLICT DO NOTHING` to safely skip duplicates.

### Error: "relation does not exist"
Run the RLS policies script first: `scripts/complete-rls-policies.sql`

### No data showing in app
Check RLS policies are applied and users have proper permissions.

## Next Steps

After seeding:
1. ✅ Test the app with real user accounts
2. ✅ Verify badges are earned correctly
3. ✅ Check daily challenges appear
4. ✅ Test quiz questions display properly
5. ✅ Verify premium content is gated correctly

Your database is now ready for soft launch! 🚀
