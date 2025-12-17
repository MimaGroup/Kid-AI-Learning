# Uptime Monitoring Setup Guide

This guide walks you through setting up uptime monitoring to ensure your application is always available.

## Option 1: UptimeRobot (Recommended - Free)

### Step 1: Create Account

1. Go to [uptimerobot.com](https://uptimerobot.com)
2. Sign up for a free account
3. Verify your email

### Step 2: Add Monitors

Create monitors for critical endpoints:

#### Monitor 1: Homepage
- **Monitor Type**: HTTP(s)
- **Friendly Name**: AI Kids Learning - Homepage
- **URL**: `https://your-domain.vercel.app`
- **Monitoring Interval**: 5 minutes
- **Monitor Timeout**: 30 seconds
- **Alert Contacts**: Your email

#### Monitor 2: API Health Check
- **Monitor Type**: HTTP(s)
- **Friendly Name**: AI Kids Learning - API Health
- **URL**: `https://your-domain.vercel.app/api/health`
- **Monitoring Interval**: 5 minutes
- **Monitor Timeout**: 30 seconds
- **Alert Contacts**: Your email

#### Monitor 3: Authentication
- **Monitor Type**: HTTP(s)
- **Friendly Name**: AI Kids Learning - Auth
- **URL**: `https://your-domain.vercel.app/auth/login`
- **Monitoring Interval**: 5 minutes
- **Monitor Timeout**: 30 seconds
- **Alert Contacts**: Your email

#### Monitor 4: Stripe Webhook
- **Monitor Type**: HTTP(s)
- **Friendly Name**: AI Kids Learning - Stripe Webhook
- **URL**: `https://your-domain.vercel.app/api/stripe/webhook`
- **Monitoring Interval**: 5 minutes
- **Monitor Timeout**: 30 seconds
- **Alert Contacts**: Your email
- **Expected Status Code**: 405 (Method Not Allowed for GET)

### Step 3: Configure Alerts

1. Go to **My Settings** → **Alert Contacts**
2. Add alert contacts:
   - **Email**: Your email (already added)
   - **SMS**: Add phone number (optional, requires upgrade)
   - **Slack**: Add Slack webhook (optional)
   - **Discord**: Add Discord webhook (optional)

3. Set alert preferences:
   - **Alert when**: Down
   - **Alert after**: 2 failed checks (to avoid false positives)
   - **Re-alert if still down**: Every 30 minutes

### Step 4: Create Status Page (Optional)

1. Go to **Public Status Pages**
2. Click **Add New Status Page**
3. Configure:
   - **Page Name**: AI Kids Learning Status
   - **Monitors**: Select all monitors
   - **Custom Domain**: status.your-domain.com (optional)
4. Share status page URL with users

### Free Tier Limits
- 50 monitors
- 5-minute check intervals
- Email alerts
- 2-month data retention

## Option 2: Better Uptime (Alternative)

### Step 1: Create Account

1. Go to [betteruptime.com](https://betteruptime.com)
2. Sign up for a free account
3. Verify your email

### Step 2: Add Monitors

1. Click **Create Monitor**
2. Configure monitor:
   - **URL**: `https://your-domain.vercel.app`
   - **Name**: AI Kids Learning
   - **Check frequency**: Every 3 minutes
   - **Request timeout**: 30 seconds
   - **Expected status code**: 200

3. Add more monitors for:
   - `/api/health`
   - `/auth/login`
   - `/api/stripe/webhook`

### Step 3: Configure Incidents

1. Go to **Incidents** → **Settings**
2. Set up incident policies:
   - **Create incident after**: 2 failed checks
   - **Auto-resolve after**: 2 successful checks
   - **Escalation**: After 15 minutes, escalate to phone

### Free Tier Limits
- 10 monitors
- 3-minute check intervals
- Unlimited team members
- Status pages included

## Option 3: Vercel Monitoring (Built-in)

Vercel provides basic monitoring for all deployments:

### Step 1: Enable Monitoring

1. Go to your Vercel project dashboard
2. Navigate to **Analytics** → **Web Vitals**
3. View real-time performance metrics

### Step 2: Set Up Alerts

1. Go to **Settings** → **Notifications**
2. Enable alerts for:
   - **Deployment failures**
   - **Build errors**
   - **Function errors**

### Limitations
- No uptime monitoring (only deployment monitoring)
- No external health checks
- Requires Vercel Pro plan for advanced features

## Option 4: Pingdom (Enterprise)

For production applications with SLA requirements:

1. Go to [pingdom.com](https://www.pingdom.com)
2. Sign up for trial (14 days free)
3. Add monitors with advanced features:
   - Multi-location checks
   - Transaction monitoring
   - Real user monitoring (RUM)
   - Detailed performance reports

**Cost**: Starting at $10/month

## Health Check Endpoint

Ensure your application has a health check endpoint:

```typescript
// app/api/health/route.ts
import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET() {
  const checks = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    checks: {
      api: true,
      database: false,
      redis: false,
    },
  }

  try {
    // Check database connection
    const supabase = await createClient()
    const { error } = await supabase.from('users').select('count').limit(1)
    checks.checks.database = !error

    // Check Redis connection (if using Upstash)
    // const redis = new Redis({ ... })
    // await redis.ping()
    // checks.checks.redis = true

    // Determine overall status
    const allHealthy = Object.values(checks.checks).every(Boolean)
    checks.status = allHealthy ? 'healthy' : 'degraded'

    return NextResponse.json(checks, {
      status: allHealthy ? 200 : 503,
    })
  } catch (error) {
    checks.status = 'unhealthy'
    return NextResponse.json(checks, { status: 503 })
  }
}
```

## Monitoring Best Practices

### 1. Monitor Critical Paths

Focus on endpoints that affect user experience:
- Homepage (first impression)
- Authentication (user access)
- Payment processing (revenue)
- API health (system status)

### 2. Set Appropriate Intervals

- **Critical services**: 1-3 minutes
- **Important services**: 5 minutes
- **Non-critical services**: 10-15 minutes

### 3. Avoid False Positives

- Require 2+ failed checks before alerting
- Set reasonable timeouts (30 seconds)
- Monitor from multiple locations

### 4. Create Runbooks

Document response procedures:
- Who to contact
- Escalation process
- Common issues and fixes
- Recovery procedures

### 5. Review Metrics Weekly

- Check uptime percentage (target: 99.9%)
- Review incident history
- Identify patterns
- Optimize slow endpoints

## Alert Fatigue Prevention

### Reduce Noise

1. **Adjust thresholds**: Require multiple failures
2. **Group alerts**: Combine related monitors
3. **Scheduled maintenance**: Pause monitors during deployments
4. **Smart routing**: Send critical alerts to phone, others to email

### Alert Priorities

- **Critical** (Phone/SMS): Payment processing down, database offline
- **High** (Email): API errors, authentication issues
- **Medium** (Email): Slow response times, high error rates
- **Low** (Dashboard): Minor issues, warnings

## Incident Response Plan

### When Alert Fires

1. **Acknowledge**: Confirm you received the alert
2. **Investigate**: Check Vercel logs, Sentry errors, database status
3. **Diagnose**: Identify root cause
4. **Fix**: Apply solution or rollback deployment
5. **Verify**: Confirm service is restored
6. **Document**: Record incident details and resolution

### Escalation Path

- **0-5 minutes**: On-call engineer investigates
- **5-15 minutes**: Escalate to senior engineer
- **15-30 minutes**: Escalate to CTO/technical lead
- **30+ minutes**: Notify stakeholders, post status update

## Status Page Communication

Keep users informed during incidents:

1. **Investigating**: "We're aware of an issue and investigating"
2. **Identified**: "We've identified the issue and are working on a fix"
3. **Monitoring**: "Fix has been applied, monitoring for stability"
4. **Resolved**: "Issue has been resolved"

## Monitoring Checklist

Before soft launch:

- [ ] Set up uptime monitoring (UptimeRobot or Better Uptime)
- [ ] Add monitors for critical endpoints
- [ ] Configure email alerts
- [ ] Test alert delivery (trigger test alert)
- [ ] Create status page (optional)
- [ ] Document incident response procedures
- [ ] Set up Sentry for error tracking
- [ ] Enable Vercel deployment notifications
- [ ] Test health check endpoint
- [ ] Review monitoring dashboard

## Support

- UptimeRobot: [uptimerobot.com/help](https://uptimerobot.com/help)
- Better Uptime: [betteruptime.com/docs](https://betteruptime.com/docs)
- Pingdom: [pingdom.com/support](https://www.pingdom.com/support)
