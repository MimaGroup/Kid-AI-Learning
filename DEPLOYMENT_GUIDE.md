# AI for Kids Learning Platform - Deployment Guide

**Version:** 1.0  
**Last Updated:** January 2025  
**Status:** Production Ready

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Environment Setup](#environment-setup)
3. [Database Setup](#database-setup)
4. [Deployment Steps](#deployment-steps)
5. [Post-Deployment Verification](#post-deployment-verification)
6. [Monitoring & Maintenance](#monitoring--maintenance)
7. [Troubleshooting](#troubleshooting)

---

## Prerequisites

### Required Accounts:
- **Vercel Account** - For hosting the Next.js application
- **Supabase Account** - For database and authentication
- **Groq Account** - For AI model inference (free tier available)

### Required Tools:
- Node.js 18+ and npm/yarn
- Git
- Vercel CLI (optional but recommended)

### Technical Requirements:
- Next.js 14+ compatible hosting
- PostgreSQL database (provided by Supabase)
- HTTPS enabled (automatic with Vercel)

---

## Environment Setup

### 1. Supabase Setup

**Create a Supabase Project:**
1. Go to [supabase.com](https://supabase.com)
2. Click "New Project"
3. Choose organization and project name
4. Select region (choose closest to your users)
5. Set database password (save this securely)
6. Wait for project to be created (~2 minutes)

**Get Supabase Credentials:**
1. Go to Project Settings > API
2. Copy the following:
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - anon/public key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - service_role key → `SUPABASE_SERVICE_ROLE_KEY` (keep secret!)

### 2. Groq API Setup

**Get Groq API Key:**
1. Go to [console.groq.com](https://console.groq.com)
2. Sign up or log in
3. Go to API Keys section
4. Create new API key
5. Copy the key → `GROQ_API_KEY`

**Note:** Free tier includes 6000 tokens per minute, sufficient for testing and small deployments.

### 3. Environment Variables

Create a `.env.local` file in your project root:

\`\`\`env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Groq AI
GROQ_API_KEY=your_groq_api_key

# Site URLs
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL=http://localhost:3000
\`\`\`

---

## Database Setup

### 1. Run Migration Scripts

Execute the following SQL scripts in order in your Supabase SQL Editor:

**Script 1: Initial Schema**
\`\`\`sql
-- Run: scripts/001_create_database_schema.sql
-- Creates: profiles, children, user_progress, achievements, ai_friends tables
\`\`\`

**Script 2: Enable RLS**
\`\`\`sql
-- Run: scripts/01-enable-rls.sql
-- Enables Row Level Security on all tables
\`\`\`

**Script 3: Children Table**
\`\`\`sql
-- Run: scripts/08-create-children-table.sql
-- Creates children table with proper relationships
\`\`\`

**Script 4: Fix Children Table**
\`\`\`sql
-- Run: scripts/09-fix-children-table.sql
-- Fixes children table structure
\`\`\`

**Script 5: Fix User Progress**
\`\`\`sql
-- Run: scripts/10-fix-user-progress-table.sql
-- Fixes user_progress table
\`\`\`

**Script 6: Gamification System**
\`\`\`sql
-- Run: scripts/006_gamification_system_v2.sql
-- Creates: badges, user_badges, daily_challenges, user_daily_challenges tables
-- Inserts 16 default badges
\`\`\`

**Script 7: Fix Daily Challenges RLS**
\`\`\`sql
-- Run: scripts/007_fix_daily_challenges_rls.sql
-- Fixes RLS policies for daily challenges
\`\`\`

### 2. Verify Database Setup

Run this query to verify all tables exist:

\`\`\`sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;
\`\`\`

Expected tables:
- achievements
- ai_friends
- badges
- children
- daily_challenges
- profiles
- user_badges
- user_daily_challenges
- user_progress

---

## Deployment Steps

### Option 1: Deploy with Vercel (Recommended)

**Step 1: Connect Repository**
1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Vercel will auto-detect Next.js

**Step 2: Configure Environment Variables**
1. In Vercel project settings, go to "Environment Variables"
2. Add all variables from your `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `GROQ_API_KEY`
   - `NEXT_PUBLIC_SITE_URL` (use your Vercel domain)

**Step 3: Deploy**
1. Click "Deploy"
2. Wait for build to complete (~2-5 minutes)
3. Vercel will provide a production URL

**Step 4: Update Supabase Redirect URLs**
1. Go to Supabase Dashboard > Authentication > URL Configuration
2. Add your Vercel domain to "Site URL"
3. Add `https://your-domain.vercel.app/**` to "Redirect URLs"

### Option 2: Deploy with Other Platforms

The app can be deployed to any platform that supports Next.js:
- **Netlify**: Similar process to Vercel
- **Railway**: Supports Next.js with PostgreSQL
- **AWS Amplify**: Full AWS integration
- **Self-hosted**: Use `npm run build` and `npm start`

---

## Post-Deployment Verification

### 1. Test Core Functionality

**Authentication:**
- [ ] Can create parent account
- [ ] Can log in
- [ ] Can log out
- [ ] Session persists across page refreshes

**Child Management:**
- [ ] Can create child profile
- [ ] Can view child list
- [ ] Can delete child profile

**Games:**
- [ ] Math Adventure loads and works
- [ ] Word Builder loads and works
- [ ] Memory Match loads and works
- [ ] Pattern Training loads and works
- [ ] AI Quiz generates questions
- [ ] AI Detective generates mysteries

**AI Features:**
- [ ] Can create AI friend
- [ ] Can chat with AI friend
- [ ] AI responses are appropriate
- [ ] Rate limiting works

**Gamification:**
- [ ] Points are awarded after activities
- [ ] Level increases with XP
- [ ] Badges unlock correctly
- [ ] Streak tracking works

**Daily Challenges:**
- [ ] Three challenges appear on kids home
- [ ] Progress bars update
- [ ] Bonus points awarded on completion

**Content Library:**
- [ ] Videos load and play
- [ ] Stories are readable
- [ ] Resources are accessible

**PWA:**
- [ ] Install prompt appears
- [ ] App can be installed
- [ ] Works offline after installation
- [ ] Service worker registers

**Tutorial:**
- [ ] Tour starts on first visit
- [ ] All steps work correctly
- [ ] Can skip or complete tour

### 2. Performance Checks

**Page Load Times:**
- Home page: < 3 seconds
- Game pages: < 2 seconds
- Dashboard: < 3 seconds

**API Response Times:**
- Database queries: < 500ms
- AI generation: < 5 seconds

**Lighthouse Scores (Target):**
- Performance: > 80
- Accessibility: > 90
- Best Practices: > 90
- SEO: > 90

### 3. Security Verification

**Database Security:**
- [ ] RLS policies are enabled
- [ ] Users can only access their own data
- [ ] Service role key is not exposed

**API Security:**
- [ ] Rate limiting is active
- [ ] Input validation works
- [ ] Error messages don't leak sensitive info

**Authentication:**
- [ ] Passwords are hashed
- [ ] Sessions expire appropriately
- [ ] CSRF protection is active

---

## Monitoring & Maintenance

### 1. Set Up Monitoring

**Vercel Analytics:**
- Enable Vercel Analytics in project settings
- Monitor page views, performance, and errors

**Supabase Monitoring:**
- Check database usage in Supabase dashboard
- Monitor API requests and errors
- Set up alerts for high usage

**Groq API Monitoring:**
- Monitor token usage in Groq console
- Set up alerts for rate limit approaches
- Track API errors

### 2. Regular Maintenance Tasks

**Daily:**
- Check error logs in Vercel
- Monitor Groq API usage
- Review user feedback

**Weekly:**
- Review database performance
- Check for failed API calls
- Update content library if needed

**Monthly:**
- Review and optimize database queries
- Update dependencies
- Security audit
- Performance optimization

### 3. Backup Strategy

**Database Backups:**
- Supabase provides automatic daily backups
- Enable Point-in-Time Recovery (PITR) for production
- Test restore process quarterly

**Code Backups:**
- Git repository serves as code backup
- Tag releases for easy rollback
- Keep deployment history in Vercel

---

## Troubleshooting

### Common Issues

**Issue: "Too Many Requests" from Groq API**
- **Cause:** Rate limit exceeded (6000 TPM on free tier)
- **Solution:** Implement request queuing or upgrade to paid tier
- **Temporary Fix:** Fallback content is automatically used

**Issue: Database connection errors**
- **Cause:** Invalid credentials or RLS blocking access
- **Solution:** Verify environment variables and RLS policies
- **Check:** Supabase logs for specific error messages

**Issue: PWA not installing**
- **Cause:** HTTPS required, or browser doesn't support PWA
- **Solution:** Ensure site is served over HTTPS (automatic with Vercel)
- **Note:** iOS Safari has limited PWA support

**Issue: Gamification not updating**
- **Cause:** User not authenticated or database error
- **Solution:** Check authentication status and database logs
- **Fallback:** Guest mode uses localStorage

**Issue: Daily challenges not appearing**
- **Cause:** RLS policy blocking inserts or service role key missing
- **Solution:** Verify service role key and RLS policies
- **Check:** Run script 007_fix_daily_challenges_rls.sql

### Debug Mode

Enable debug logging by checking browser console for `[v0]` prefixed messages:
- Service worker registration
- Offline/online status
- API calls and responses
- Gamification updates

### Getting Help

**Resources:**
- Next.js Documentation: [nextjs.org/docs](https://nextjs.org/docs)
- Supabase Documentation: [supabase.com/docs](https://supabase.com/docs)
- Groq Documentation: [console.groq.com/docs](https://console.groq.com/docs)
- Vercel Support: [vercel.com/support](https://vercel.com/support)

**Support Channels:**
- GitHub Issues (if open source)
- Email support
- Community forums

---

## Scaling Considerations

### When to Scale

**Groq API:**
- Free tier: 6000 TPM (suitable for ~100 concurrent users)
- Paid tier: Higher limits and faster responses
- Consider caching AI responses for common queries

**Supabase:**
- Free tier: 500MB database, 2GB bandwidth
- Pro tier: 8GB database, 50GB bandwidth
- Consider read replicas for high traffic

**Vercel:**
- Hobby tier: Suitable for small deployments
- Pro tier: Better performance and analytics
- Enterprise: Custom solutions for large scale

### Performance Optimization

**Code Splitting:**
- Games are already lazy-loaded
- Consider splitting large components

**Caching:**
- Implement Redis for API response caching
- Cache AI-generated content
- Use CDN for static assets

**Database:**
- Add indexes for frequently queried columns
- Implement connection pooling
- Consider read replicas

---

## Deployment Checklist

### Pre-Deployment
- [ ] All environment variables configured
- [ ] Database migrations run successfully
- [ ] RLS policies tested
- [ ] All features tested locally
- [ ] Code reviewed and approved
- [ ] Dependencies updated
- [ ] Security audit completed

### Deployment
- [ ] Code pushed to production branch
- [ ] Vercel deployment successful
- [ ] Environment variables set in Vercel
- [ ] Custom domain configured (if applicable)
- [ ] SSL certificate active

### Post-Deployment
- [ ] All core features tested in production
- [ ] Performance metrics acceptable
- [ ] Error monitoring active
- [ ] Analytics configured
- [ ] Backup strategy verified
- [ ] Documentation updated
- [ ] Team notified of deployment

---

## Rollback Procedure

If issues occur after deployment:

1. **Immediate Rollback:**
   - Go to Vercel dashboard
   - Find previous successful deployment
   - Click "Promote to Production"

2. **Database Rollback:**
   - Use Supabase PITR if enabled
   - Or restore from latest backup
   - Verify data integrity

3. **Verify Rollback:**
   - Test critical features
   - Check error logs
   - Monitor user reports

4. **Post-Mortem:**
   - Document what went wrong
   - Create fix plan
   - Test fix in staging
   - Redeploy when ready

---

## Success Criteria

Deployment is successful when:
- [ ] All features work as expected
- [ ] No critical errors in logs
- [ ] Performance meets targets
- [ ] Security checks pass
- [ ] Users can complete core workflows
- [ ] Monitoring is active
- [ ] Team is trained on maintenance

---

**Deployment Guide Version:** 1.0  
**Last Updated:** January 2025  
**Maintained By:** Development Team  
**Next Review:** Quarterly
