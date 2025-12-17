# Switching Stripe from Test to Live Mode

## Prerequisites
- Stripe account fully verified
- Business details completed
- Bank account connected for payouts

---

## Step 1: Complete Stripe Account Verification

1. Log into Stripe Dashboard: https://dashboard.stripe.com
2. Click on "Activate your account" banner (if shown)
3. Complete all required information:
   - Business details
   - Personal information
   - Bank account for payouts
   - Tax information
4. Wait for verification (usually instant, can take 1-2 business days)

---

## Step 2: Create Live Products and Prices

1. In Stripe Dashboard, toggle to **Live Mode** (top right corner)
2. Go to **Products** → **Add Product**

### Create Monthly Subscription
- **Name**: Premium Monthly
- **Description**: Monthly subscription to AI Kids Learning Platform
- **Pricing**: 
  - Price: $9.99
  - Billing period: Monthly
  - Currency: USD
- Click **Save product**
- **Copy the Price ID** (starts with `price_live_...`)

### Create Yearly Subscription
- **Name**: Premium Yearly
- **Description**: Yearly subscription to AI Kids Learning Platform (Save 17%)
- **Pricing**:
  - Price: $99.99
  - Billing period: Yearly
  - Currency: USD
- Click **Save product**
- **Copy the Price ID** (starts with `price_live_...`)

---

## Step 3: Get Live API Keys

1. In Stripe Dashboard (Live Mode), go to **Developers** → **API Keys**
2. Copy the following keys:
   - **Publishable key** (starts with `pk_live_...`)
   - **Secret key** (starts with `sk_live_...`) - Click "Reveal test key"

---

## Step 4: Configure Live Webhook

1. Go to **Developers** → **Webhooks**
2. Click **Add endpoint**
3. **Endpoint URL**: `https://kids-learning-ai.com/api/stripe/webhook`
4. **Description**: Production webhook for AI Kids Learning
5. **Events to send**:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
6. Click **Add endpoint**
7. **Copy the Signing secret** (starts with `whsec_...`)

---

## Step 5: Update Vercel Environment Variables

1. Go to Vercel Dashboard: https://vercel.com
2. Select your project: **AI Kids Learning**
3. Go to **Settings** → **Environment Variables**
4. Update the following variables with LIVE values:

### Update These Variables:
```
STRIPE_SECRET_KEY=sk_live_YOUR_LIVE_SECRET_KEY
STRIPE_PUBLISHABLE_KEY=pk_live_YOUR_LIVE_PUBLISHABLE_KEY
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_YOUR_LIVE_PUBLISHABLE_KEY
NEXT_PUBLIC_STRIPE_MONTHLY_PRICE_ID=price_live_YOUR_MONTHLY_PRICE_ID
NEXT_PUBLIC_STRIPE_YEARLY_PRICE_ID=price_live_YOUR_YEARLY_PRICE_ID
STRIPE_WEBHOOK_SECRET=whsec_YOUR_LIVE_WEBHOOK_SECRET
```

5. Make sure to select **Production** environment for these variables
6. Click **Save**

---

## Step 6: Redeploy Application

1. In Vercel Dashboard, go to **Deployments**
2. Click **Redeploy** on the latest deployment
3. Wait for deployment to complete
4. Verify deployment is successful

---

## Step 7: Test Live Payment

### Important: Test with Real Card
1. Go to your live site: https://kids-learning-ai.com
2. Sign up with a NEW email (not used in test mode)
3. Go to Pricing page
4. Click "Get Started" on Monthly plan
5. Use a REAL credit card (you'll be charged)
6. Complete the checkout

### Verify Everything Works:
- [ ] Payment succeeds in Stripe Dashboard
- [ ] Subscription appears in Stripe Dashboard → Customers
- [ ] User gets premium access in the app
- [ ] Welcome email is sent
- [ ] Subscription confirmation email is sent
- [ ] User can access premium content

### Cancel Test Subscription:
1. In Stripe Dashboard → Customers
2. Find your test customer
3. Click on the subscription
4. Click **Cancel subscription**
5. Confirm cancellation
6. You'll receive a prorated refund

---

## Step 8: Monitor for Issues

### First 24 Hours:
- Check Stripe Dashboard regularly for payments
- Monitor error logs in Vercel
- Watch for failed webhook deliveries in Stripe
- Respond to any customer support requests quickly

### Common Issues:

**Issue**: Webhook not receiving events
- **Solution**: Check webhook URL is correct and accessible
- **Solution**: Verify webhook secret is correct in env vars

**Issue**: Payment succeeds but user doesn't get access
- **Solution**: Check webhook is processing correctly
- **Solution**: Check database for subscription record
- **Solution**: Check Supabase logs for errors

**Issue**: Emails not sending
- **Solution**: Verify Resend API key is correct
- **Solution**: Check email sending logs
- **Solution**: Verify domain is verified in Resend

---

## Rollback Plan (If Needed)

If you encounter critical issues and need to rollback to test mode:

1. In Vercel, revert environment variables to test mode values
2. Redeploy application
3. Investigate and fix issues
4. Try live mode switch again when ready

---

## Important Notes

- **Never mix test and live keys** - Always use matching keys (all test or all live)
- **Test thoroughly** - Make a real purchase and verify everything works
- **Monitor closely** - Watch for issues in the first 24-48 hours
- **Have support ready** - Be prepared to help users with payment issues
- **Keep test mode** - You can still use test mode for development by switching in Stripe Dashboard

---

## Checklist

- [ ] Stripe account verified
- [ ] Live products created (Monthly & Yearly)
- [ ] Live API keys copied
- [ ] Live webhook configured
- [ ] Vercel environment variables updated
- [ ] Application redeployed
- [ ] Test payment completed successfully
- [ ] User received premium access
- [ ] Emails sent correctly
- [ ] Test subscription cancelled
- [ ] Monitoring active

---

## Support

If you encounter issues:
- **Stripe Support**: https://support.stripe.com
- **Vercel Support**: https://vercel.com/help
- **Check webhook logs**: Stripe Dashboard → Developers → Webhooks → [Your webhook] → Attempts

**You're ready to accept real payments!** 🎉
