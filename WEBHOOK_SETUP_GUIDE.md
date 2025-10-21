# Stripe Webhook Setup Guide

## Quick Setup for Test Mode

Since you've already configured products and prices in Stripe, here's how to set up the webhook endpoint:

### Step 1: Get Your Deployment URL

After deploying to Vercel, your webhook URL will be:
\`\`\`
https://your-domain.vercel.app/api/stripe/webhook
\`\`\`

Or if you have a custom domain:
\`\`\`
https://your-domain.com/api/stripe/webhook
\`\`\`

### Step 2: Configure Webhook in Stripe Dashboard

1. Go to [Stripe Dashboard](https://dashboard.stripe.com)
2. Make sure you're in **Test Mode** (toggle in top right)
3. Navigate to **Developers** → **Webhooks**
4. Click **Add endpoint**

### Step 3: Configure Endpoint Settings

**Endpoint URL**: Enter your webhook URL from Step 1

**Description**: `Test webhook for AI Kids Learning Platform`

**Events to send**: Select these 6 events:
- `checkout.session.completed` - When a user completes checkout
- `customer.subscription.created` - When a subscription is created
- `customer.subscription.updated` - When a subscription is modified
- `customer.subscription.deleted` - When a subscription is cancelled
- `invoice.payment_succeeded` - When a payment succeeds
- `invoice.payment_failed` - When a payment fails

Click **Add endpoint**

### Step 4: Get Webhook Signing Secret

After creating the endpoint:
1. Click on the webhook you just created
2. In the **Signing secret** section, click **Reveal**
3. Copy the secret (starts with `whsec_...`)

### Step 5: Add Secret to Vercel

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Find `STRIPE_WEBHOOK_SECRET` and update it with the secret you copied
4. Make sure it's set for the **Production** environment
5. Click **Save**

### Step 6: Redeploy (if needed)

If you updated the environment variable:
1. Go to **Deployments** tab
2. Click the three dots on the latest deployment
3. Click **Redeploy**

### Step 7: Test the Webhook

1. In Stripe Dashboard, go to your webhook endpoint
2. Click **Send test webhook**
3. Select `checkout.session.completed`
4. Click **Send test webhook**
5. Check the response - should see `200 OK`

## What the Webhook Does

Your webhook automatically handles:

1. **Checkout Completed**: Creates subscription in database, sends welcome email
2. **Subscription Created/Updated**: Updates subscription status in database
3. **Subscription Deleted**: Marks subscription as cancelled
4. **Payment Succeeded**: Records payment, sends receipt email
5. **Payment Failed**: Updates subscription to past_due, records failed payment

## Monitoring Webhooks

### View Webhook Logs in Stripe
1. Go to **Developers** → **Webhooks**
2. Click on your endpoint
3. View **Recent events** to see all webhook deliveries
4. Click on any event to see request/response details

### Common Issues

**Webhook returns 400 "Invalid signature"**
- Solution: Verify `STRIPE_WEBHOOK_SECRET` is correct in Vercel
- Solution: Make sure you copied the signing secret from the correct webhook endpoint

**Webhook returns 500 error**
- Solution: Check Vercel logs for detailed error message
- Solution: Verify Supabase credentials are correct
- Solution: Check database tables exist (subscriptions, payment_history)

**Webhook not receiving events**
- Solution: Verify webhook URL is correct and accessible
- Solution: Check webhook is enabled in Stripe Dashboard
- Solution: Verify you're testing in the correct mode (test vs live)

## Testing the Full Flow

1. Go to your pricing page
2. Click "Get Started" on a plan
3. Use Stripe test card: `4242 4242 4242 4242`
4. Complete checkout
5. Verify:
   - Subscription appears in Stripe Dashboard
   - Subscription record created in database
   - User has premium access
   - Welcome email sent

## Moving to Live Mode

When ready for production:
1. Follow the same steps above but in **Live Mode**
2. Use your live domain URL for the webhook
3. Update all Stripe environment variables to live keys
4. Test with a real card (you can cancel immediately after testing)

## Need Help?

- View webhook attempts: Stripe Dashboard → Webhooks → [Your endpoint] → Attempts
- Check Vercel logs: Vercel Dashboard → Deployments → [Latest] → Logs
- Test webhook delivery: Stripe Dashboard → Webhooks → Send test webhook
