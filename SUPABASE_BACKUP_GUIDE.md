# Supabase Database Backup Guide

This guide walks you through enabling automated backups and testing restore procedures for your Supabase database.

## Step 1: Enable Automated Backups

### For Free Tier Projects
Supabase Free tier includes:
- Daily automated backups (retained for 7 days)
- Point-in-time recovery (PITR) not available

### For Pro Tier Projects ($25/month)
Supabase Pro tier includes:
- Daily automated backups (retained for 30 days)
- Point-in-time recovery (PITR) - restore to any point in the last 7 days

### Enable Backups

1. Go to your Supabase project dashboard
2. Navigate to **Settings** → **Database**
3. Scroll to **Backup Settings**
4. Backups are **enabled by default** - no action needed
5. Verify backup schedule:
   - **Frequency**: Daily at 2:00 AM UTC
   - **Retention**: 7 days (Free) or 30 days (Pro)

## Step 2: Manual Backup (Recommended Before Launch)

Create a manual backup before your soft launch:

### Option A: Using Supabase Dashboard

1. Go to **Database** → **Backups**
2. Click **Create Backup**
3. Enter a description: "Pre-launch backup - Oct 21, 2025"
4. Click **Create**
5. Wait for backup to complete (usually 1-5 minutes)

### Option B: Using pg_dump (Advanced)

\`\`\`bash
# Install PostgreSQL client tools
brew install postgresql  # macOS
# or
sudo apt-get install postgresql-client  # Linux

# Get connection string from Supabase dashboard
# Settings → Database → Connection string (Direct connection)

# Create backup
pg_dump "postgresql://postgres:[YOUR-PASSWORD]@[YOUR-PROJECT-REF].supabase.co:5432/postgres" > backup_$(date +%Y%m%d).sql

# Verify backup file
ls -lh backup_*.sql
\`\`\`

## Step 3: Test Restore Process

### Test Restore on a New Project (Recommended)

1. Create a new Supabase project (test project)
2. Go to **Database** → **Backups**
3. Find your backup
4. Click **Restore** → **Restore to new project**
5. Select the test project
6. Click **Restore**
7. Wait for restore to complete (5-15 minutes)
8. Verify data in test project:
   - Check tables exist
   - Verify row counts match
   - Test queries

### Test Restore on Same Project (Caution)

**WARNING**: This will overwrite your current database!

Only do this in development/staging:

1. Go to **Database** → **Backups**
2. Find your backup
3. Click **Restore** → **Restore to this project**
4. Confirm the action
5. Wait for restore to complete
6. Verify data

## Step 4: Backup Verification Checklist

After creating a backup, verify it contains all critical data:

\`\`\`sql
-- Check all tables exist
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public'
ORDER BY table_name;

-- Verify row counts
SELECT 
  'users' as table_name, COUNT(*) as row_count FROM users
UNION ALL
SELECT 'subscriptions', COUNT(*) FROM subscriptions
UNION ALL
SELECT 'children', COUNT(*) FROM children
UNION ALL
SELECT 'activities', COUNT(*) FROM activities
UNION ALL
SELECT 'achievements', COUNT(*) FROM achievements
UNION ALL
SELECT 'payment_history', COUNT(*) FROM payment_history;

-- Check RLS policies exist
SELECT schemaname, tablename, policyname 
FROM pg_policies 
WHERE schemaname = 'public'
ORDER BY tablename, policyname;

-- Verify indexes
SELECT tablename, indexname 
FROM pg_indexes 
WHERE schemaname = 'public'
ORDER BY tablename;
\`\`\`

## Step 5: Set Up Backup Monitoring

### Create Backup Alerts

1. Go to **Settings** → **Integrations**
2. Set up Slack or email notifications
3. Enable alerts for:
   - Backup failures
   - Backup completion
   - Storage warnings

### Monitor Backup Status

Check backup status regularly:

1. Go to **Database** → **Backups**
2. Verify latest backup date
3. Check backup size (should be consistent)
4. Review any error messages

## Backup Best Practices

### 1. Multiple Backup Strategies

Don't rely on Supabase backups alone:

- **Supabase automated backups**: Daily (primary)
- **Manual backups before major changes**: Weekly
- **Export critical data**: Monthly CSV exports
- **Off-site backups**: Store backups in separate cloud storage

### 2. Backup Before Major Changes

Always create a manual backup before:
- Database schema changes
- Bulk data updates
- Deploying new features
- Running migration scripts

### 3. Test Restores Regularly

- Test restore process monthly
- Verify data integrity after restore
- Document restore time (RTO - Recovery Time Objective)
- Measure data loss window (RPO - Recovery Point Objective)

### 4. Document Backup Procedures

Create a runbook with:
- Backup schedule
- Restore procedures
- Contact information
- Escalation process

## Disaster Recovery Plan

### Scenario 1: Accidental Data Deletion

**Recovery Steps:**
1. Identify when data was deleted
2. Find most recent backup before deletion
3. Restore backup to test project
4. Export deleted data from test project
5. Import data back to production
6. Verify data integrity

**Time to Recover**: 30-60 minutes

### Scenario 2: Database Corruption

**Recovery Steps:**
1. Create emergency backup of current state
2. Identify last known good backup
3. Restore backup to production (or new project)
4. Update DNS/connection strings if needed
5. Verify application functionality
6. Notify users of any data loss

**Time to Recover**: 1-2 hours

### Scenario 3: Complete Project Loss

**Recovery Steps:**
1. Create new Supabase project
2. Restore from most recent backup
3. Update environment variables in Vercel
4. Redeploy application
5. Test all functionality
6. Monitor for issues

**Time to Recover**: 2-4 hours

## Backup Storage Costs

### Supabase Backup Storage

- **Free tier**: Included (7-day retention)
- **Pro tier**: Included (30-day retention)
- **Additional storage**: $0.125/GB/month

### External Backup Storage (Optional)

Store backups in:
- **AWS S3**: $0.023/GB/month
- **Google Cloud Storage**: $0.020/GB/month
- **Vercel Blob**: $0.15/GB/month

## Automated Backup Script (Optional)

Create a cron job to backup daily:

\`\`\`bash
#!/bin/bash
# backup-supabase.sh

DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/backups/supabase"
BACKUP_FILE="$BACKUP_DIR/backup_$DATE.sql"

# Create backup directory
mkdir -p $BACKUP_DIR

# Run pg_dump
pg_dump "postgresql://postgres:[PASSWORD]@[PROJECT-REF].supabase.co:5432/postgres" > $BACKUP_FILE

# Compress backup
gzip $BACKUP_FILE

# Upload to S3 (optional)
aws s3 cp $BACKUP_FILE.gz s3://my-backups/supabase/

# Delete backups older than 30 days
find $BACKUP_DIR -name "backup_*.sql.gz" -mtime +30 -delete

echo "Backup completed: $BACKUP_FILE.gz"
\`\`\`

Add to crontab:
\`\`\`bash
# Run daily at 3 AM
0 3 * * * /path/to/backup-supabase.sh
\`\`\`

## Support

- Supabase Docs: [supabase.com/docs/guides/platform/backups](https://supabase.com/docs/guides/platform/backups)
- Community: [github.com/supabase/supabase/discussions](https://github.com/supabase/supabase/discussions)
- Support: support@supabase.io
