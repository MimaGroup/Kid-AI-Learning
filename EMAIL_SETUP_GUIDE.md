# Email Notification Setup Guide

This guide explains how to set up email notifications for AI Kids Learning using Resend.

## Overview

The app sends automated emails for:
- Welcome emails after signup
- Subscription confirmations
- Payment receipts
- Subscription expiration warnings
- Contact form submissions

## Setup Instructions

### 1. Create a Resend Account

1. Go to [resend.com](https://resend.com)
2. Sign up for a free account (100 emails/day free tier)
3. Verify your email address

### 2. Get Your API Key

1. Log into your Resend dashboard
2. Go to **API Keys** section
3. Click **Create API Key**
4. Copy the API key (starts with `re_`)

### 3. Add Domain (Optional but Recommended)

For production, you should verify your domain:

1. In Resend dashboard, go to **Domains**
2. Click **Add Domain**
3. Enter your domain: `kids-learning-ai.com`
4. Add the DNS records provided by Resend to your domain registrar
5. Wait for verification (usually 5-10 minutes)

**Note:** Until domain is verified, emails will be sent from `onboarding@resend.dev`

### 4. Add Environment Variable

Add the Resend API key to your Vercel project:

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add new variable:
   - **Name:** `RESEND_API_KEY`
   - **Value:** Your Resend API key (e.g., `re_123abc...`)
   - **Environment:** Production, Preview, Development
3. Click **Save**
4. Redeploy your app

### 5. Update Email Addresses

Update the email addresses in the code:

**In `lib/email.tsx`:**
\`\`\`typescript
from: "AI Kids Learning <noreply@kids-learning-ai.com>"
\`\`\`

**In `app/api/contact/route.ts`:**
\`\`\`typescript
to: "support@kids-learning-ai.com" // Your actual support email
\`\`\`

## Email Templates

All email templates are defined in `lib/email.tsx`:

- `welcome` - Sent after user signup
- `subscriptionConfirmation` - Sent after successful subscription
- `paymentReceipt` - Sent after each payment
- `subscriptionExpiring` - Sent before subscription expires
- `contactFormSubmission` - Sent when contact form is submitted

## Testing Emails

### Development Testing

1. Set `RESEND_API_KEY` in your local `.env.local` file
2. Use your own email address for testing
3. Check Resend dashboard for delivery status

### Test Email Sending

You can test email sending by:

1. Signing up for a new account (welcome email)
2. Subscribing to a plan (subscription confirmation)
3. Submitting the contact form (contact form email)

## Email Triggers

### Welcome Email
- **Trigger:** User signs up
- **Sent from:** `hooks/use-auth.tsx` → `app/api/send-welcome-email/route.ts`
- **Recipient:** New user's email

### Subscription Confirmation
- **Trigger:** Stripe webhook `checkout.session.completed`
- **Sent from:** `app/api/stripe/webhook/route.ts`
- **Recipient:** Subscriber's email

### Payment Receipt
- **Trigger:** Stripe webhook `invoice.payment_succeeded`
- **Sent from:** `app/api/stripe/webhook/route.ts`
- **Recipient:** Customer's email

### Contact Form
- **Trigger:** User submits contact form
- **Sent from:** `app/api/contact/route.ts`
- **Recipients:** Support team + user confirmation

## Monitoring

Check email delivery status in:
- Resend Dashboard → Emails
- View delivery status, opens, clicks
- Check for bounces or failures

## Troubleshooting

### Emails Not Sending

1. **Check API Key:** Verify `RESEND_API_KEY` is set correctly
2. **Check Logs:** Look for `[v0] Email sent successfully` or error messages
3. **Check Resend Dashboard:** View email status and errors
4. **Verify Domain:** Ensure domain is verified in Resend (for production)

### Emails Going to Spam

1. Verify your domain in Resend
2. Add SPF, DKIM, and DMARC records
3. Use a professional "from" address
4. Avoid spam trigger words in subject lines

### Rate Limits

- **Free Tier:** 100 emails/day
- **Paid Plans:** Higher limits available
- Monitor usage in Resend dashboard

## Production Checklist

Before going live:

- [ ] Resend account created
- [ ] API key added to Vercel environment variables
- [ ] Domain verified in Resend
- [ ] DNS records added (SPF, DKIM, DMARC)
- [ ] Email addresses updated in code
- [ ] Test emails sent successfully
- [ ] Stripe webhook configured to trigger emails
- [ ] Email templates reviewed and customized

## Support

For issues with Resend:
- Documentation: [resend.com/docs](https://resend.com/docs)
- Support: [resend.com/support](https://resend.com/support)

For app-specific email issues:
- Check application logs
- Review webhook delivery in Stripe dashboard
- Test API routes directly
