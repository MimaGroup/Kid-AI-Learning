# Sentry Setup Guide

This guide walks you through setting up Sentry for error tracking and performance monitoring.

## Step 1: Create Sentry Account

1. Go to [sentry.io](https://sentry.io)
2. Sign up for a free account (includes 5,000 errors/month)
3. Create a new project:
   - Platform: **Next.js**
   - Project name: **ai-kids-learning**
   - Alert frequency: **On every new issue**

## Step 2: Get Your DSN

After creating the project, Sentry will show you a DSN (Data Source Name). It looks like:

```
https://abc123def456@o123456.ingest.sentry.io/7890123
```

Copy this DSN - you'll need it in the next step.

## Step 3: Add Environment Variable

Add the Sentry DSN to your Vercel project:

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add a new variable:
   - **Name**: `NEXT_PUBLIC_SENTRY_DSN`
   - **Value**: Your Sentry DSN (from Step 2)
   - **Environments**: Production, Preview, Development

4. Click **Save**

## Step 4: Deploy

Redeploy your application to activate Sentry:

```bash
git commit -m "Add Sentry monitoring"
git push
```

Or trigger a redeploy from the Vercel dashboard.

## Step 5: Verify Setup

1. After deployment, visit your application
2. Trigger a test error (optional):
   - Go to `/api/test-sentry` (if you create this endpoint)
   - Or throw an error in your browser console: `throw new Error("Test Sentry")`
3. Check your Sentry dashboard - you should see the error appear within seconds

## What Sentry Tracks

### Automatic Tracking
- Unhandled JavaScript errors
- Unhandled promise rejections
- React component errors (via ErrorBoundary)
- API route errors
- Performance metrics (page load times, API response times)

### Manual Tracking
Use the Sentry helpers in your code:

```typescript
import { captureException, captureMessage, setUser } from '@/lib/sentry'

// Capture an exception with context
try {
  // Your code
} catch (error) {
  captureException(error, {
    userId: user.id,
    action: 'checkout',
  })
}

// Capture a message
captureMessage('User completed onboarding', 'info')

// Set user context
setUser({
  id: user.id,
  email: user.email,
  username: user.name,
})
```

## Sentry Dashboard Features

### Issues
- View all errors grouped by type
- See stack traces and breadcrumbs
- Track error frequency and affected users
- Mark issues as resolved

### Performance
- Monitor page load times
- Track API endpoint performance
- Identify slow database queries
- See performance trends over time

### Releases
- Track errors by deployment version
- See which release introduced new errors
- Monitor error rates after deployments

### Alerts
Configure alerts for:
- New error types
- Error spike detection
- Performance degradation
- Custom conditions

## Alert Configuration

Set up email/Slack alerts:

1. Go to **Settings** → **Alerts**
2. Create a new alert rule:
   - **When**: A new issue is created
   - **If**: None (alert on all new issues)
   - **Then**: Send notification to email/Slack
3. Save the rule

## Best Practices

1. **Filter Noise**: Ignore known errors that don't need fixing
   - Go to issue → **Ignore** → Set conditions
   
2. **Set Up Releases**: Tag errors with release versions
   - Add `SENTRY_RELEASE` environment variable with your version

3. **Monitor Performance**: Set performance budgets
   - Alert when page load exceeds 3 seconds
   - Alert when API calls exceed 1 second

4. **Review Weekly**: Check Sentry dashboard weekly
   - Resolve fixed issues
   - Prioritize high-frequency errors
   - Monitor error trends

## Troubleshooting

### Errors Not Appearing in Sentry

1. Check DSN is correct in environment variables
2. Verify `NEXT_PUBLIC_SENTRY_DSN` starts with `NEXT_PUBLIC_`
3. Check browser console for Sentry initialization logs
4. Ensure you've redeployed after adding the DSN

### Too Many Errors

1. Adjust sample rate in `lib/sentry.ts`:
   ```typescript
   tracesSampleRate: 0.1, // 10% of transactions
   ```

2. Add error filters to ignore non-critical errors

### Performance Impact

Sentry has minimal performance impact:
- ~10KB added to bundle size
- Errors sent asynchronously
- Performance monitoring samples 10% of requests by default

## Cost Management

Free tier includes:
- 5,000 errors/month
- 10,000 performance transactions/month
- 1 project
- 30-day data retention

If you exceed limits:
- Errors are dropped (oldest first)
- Consider upgrading to Team plan ($26/month)
- Or adjust sample rates to reduce volume

## Support

- Sentry Docs: [docs.sentry.io](https://docs.sentry.io)
- Next.js Integration: [docs.sentry.io/platforms/javascript/guides/nextjs](https://docs.sentry.io/platforms/javascript/guides/nextjs)
- Community Forum: [forum.sentry.io](https://forum.sentry.io)
