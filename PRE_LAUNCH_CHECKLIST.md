# Pre-Launch Checklist for AI Kids Learning Platform

## 1. Stripe Production Setup

### Switch to Live Mode
- [ ] Log into Stripe Dashboard (https://dashboard.stripe.com)
- [ ] Complete Stripe account verification (business details, bank account)
- [ ] Switch from Test Mode to Live Mode (toggle in top right)
- [ ] Create live products and prices:
  - [ ] Monthly subscription ($9.99/month)
  - [ ] Yearly subscription ($99.99/year)
- [ ] Copy live Price IDs

### Update Environment Variables in Vercel
- [ ] Go to Vercel Project Settings → Environment Variables
- [ ] Update the following with LIVE values:
  - [ ] `STRIPE_SECRET_KEY` (starts with `sk_live_`)
  - [ ] `STRIPE_PUBLISHABLE_KEY` (starts with `pk_live_`)
  - [ ] `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` (starts with `pk_live_`)
  - [ ] `NEXT_PUBLIC_STRIPE_MONTHLY_PRICE_ID` (live monthly price ID)
  - [ ] `NEXT_PUBLIC_STRIPE_YEARLY_PRICE_ID` (live yearly price ID)
- [ ] Redeploy the application after updating env vars

### Configure Stripe Webhook for Production
- [ ] In Stripe Dashboard → Developers → Webhooks
- [ ] Add endpoint: `https://kids-learning-ai.com/api/stripe/webhook`
- [ ] Select events to listen to:
  - [ ] `checkout.session.completed`
  - [ ] `customer.subscription.created`
  - [ ] `customer.subscription.updated`
  - [ ] `customer.subscription.deleted`
  - [ ] `invoice.payment_succeeded`
  - [ ] `invoice.payment_failed`
- [ ] Copy the webhook signing secret
- [ ] Update `STRIPE_WEBHOOK_SECRET` in Vercel environment variables
- [ ] Redeploy

### Test Live Payment
- [ ] Make a small test purchase with real card ($1 or minimum amount)
- [ ] Verify subscription is created in Stripe
- [ ] Verify user gets premium access in app
- [ ] Verify email notifications are sent
- [ ] Cancel test subscription

---

## 2. Email Service Setup (Resend)

### Configure Resend
- [ ] Sign up at https://resend.com
- [ ] Verify your domain (kids-learning-ai.com)
- [ ] Add DNS records for email authentication (SPF, DKIM)
- [ ] Create API key
- [ ] Add `RESEND_API_KEY` to Vercel environment variables
- [ ] Set `RESEND_FROM_EMAIL` (e.g., noreply@kids-learning-ai.com)
- [ ] Redeploy

### Test Email Notifications
- [ ] Test welcome email (sign up new account)
- [ ] Test subscription confirmation email
- [ ] Test payment receipt email
- [ ] Test contact form submission
- [ ] Verify emails don't go to spam

---

## 3. SEO & Analytics

### SEO Setup
- [x] Sitemap.xml configured
- [x] Robots.txt configured
- [x] Open Graph meta tags added
- [x] Twitter Card meta tags added
- [ ] Submit sitemap to Google Search Console
- [ ] Submit sitemap to Bing Webmaster Tools
- [ ] Verify site ownership in search consoles

### Analytics Setup
- [ ] Set up Google Analytics 4
  - [ ] Create GA4 property
  - [ ] Add tracking code to app
  - [ ] Set up conversion goals (signups, subscriptions)
- [ ] Set up Vercel Analytics (already included)
- [ ] Configure event tracking for key actions:
  - [ ] Sign ups
  - [ ] Subscription purchases
  - [ ] Activity completions
  - [ ] Contact form submissions

---

## 4. Security Audit

### Environment Variables
- [ ] All sensitive keys are in environment variables (not hardcoded)
- [ ] No `.env` files committed to git
- [ ] Production keys are different from test keys
- [ ] `NEXT_PUBLIC_*` variables contain no secrets

### Authentication & Authorization
- [ ] Supabase Row Level Security (RLS) enabled on all tables
- [ ] Protected routes require authentication
- [ ] API routes validate user sessions
- [ ] Premium content checks subscription status
- [ ] CSRF protection enabled

### API Security
- [ ] Rate limiting on API routes (consider Vercel Edge Config)
- [ ] Input validation on all forms
- [ ] SQL injection prevention (using Supabase client)
- [ ] XSS prevention (React escapes by default)
- [ ] Webhook signature verification (Stripe)

### HTTPS & Certificates
- [ ] SSL certificate auto-provisioned by Vercel
- [ ] Force HTTPS (Vercel does this automatically)
- [ ] HSTS headers configured

---

## 5. Performance Optimization

### Images
- [ ] All images use Next.js Image component
- [ ] Images are optimized and compressed
- [ ] Proper width/height attributes set
- [ ] Lazy loading enabled for below-fold images

### Code Optimization
- [ ] Remove console.log statements (except error logging)
- [ ] Remove unused dependencies
- [ ] Code splitting implemented (Next.js does this)
- [ ] Dynamic imports for heavy components

### Caching
- [ ] Static pages cached at edge (Vercel CDN)
- [ ] API responses have appropriate cache headers
- [ ] Database queries optimized

### Performance Testing
- [ ] Run Lighthouse audit (aim for 90+ scores)
- [ ] Test on slow 3G connection
- [ ] Test on mobile devices
- [ ] Check Core Web Vitals

---

## 6. Database & Backup

### Supabase Production Setup
- [ ] Review database schema
- [ ] Ensure all tables have proper indexes
- [ ] Row Level Security (RLS) policies tested
- [ ] Database backups enabled (Supabase does this automatically)
- [ ] Consider upgrading Supabase plan for production

### Data Migration
- [ ] Export test data if needed
- [ ] Plan for data migration strategy
- [ ] Test restore from backup

---

## 7. Monitoring & Error Tracking

### Error Monitoring
- [ ] Set up Sentry or similar error tracking
  - [ ] Create Sentry project
  - [ ] Add Sentry SDK to app
  - [ ] Configure error reporting
  - [ ] Set up alerts for critical errors

### Uptime Monitoring
- [ ] Set up uptime monitoring (UptimeRobot, Pingdom, or Vercel)
- [ ] Configure alerts for downtime
- [ ] Monitor API endpoints

### Performance Monitoring
- [ ] Vercel Analytics enabled
- [ ] Monitor API response times
- [ ] Track database query performance
- [ ] Set up alerts for slow pages

---

## 8. Legal & Compliance

### COPPA Compliance (Children's Online Privacy Protection Act)
- [x] Privacy Policy includes COPPA compliance
- [x] Parental consent mechanism (parent creates account)
- [ ] Review data collection practices
- [ ] Ensure no third-party tracking of children
- [ ] Age verification in place

### GDPR Compliance (if serving EU users)
- [ ] Cookie consent banner (if using cookies)
- [ ] Data export functionality
- [ ] Data deletion functionality
- [ ] Privacy Policy includes GDPR rights

### Terms & Policies
- [x] Privacy Policy published
- [x] Terms of Service published
- [ ] Review with legal counsel (recommended)

---

## 9. User Testing

### Critical User Flows
- [ ] New user signup → email verification → login
- [ ] Free tier access (what can users do without paying?)
- [ ] Subscription purchase (monthly)
- [ ] Subscription purchase (yearly)
- [ ] Premium content access after payment
- [ ] Child profile creation
- [ ] Activity completion and progress tracking
- [ ] Subscription cancellation
- [ ] Password reset flow

### Cross-Browser Testing
- [ ] Chrome (desktop & mobile)
- [ ] Safari (desktop & mobile)
- [ ] Firefox
- [ ] Edge

### Device Testing
- [ ] iPhone (various sizes)
- [ ] Android phone
- [ ] iPad/tablet
- [ ] Desktop (1920x1080)
- [ ] Laptop (1366x768)

---

## 10. Customer Support Setup

### Support Channels
- [x] Contact form functional
- [ ] Set up support email (support@kids-learning-ai.com)
- [ ] Create FAQ with common questions
- [ ] Consider live chat (Intercom, Crisp, etc.)

### Documentation
- [ ] Create user guide for parents
- [ ] Create troubleshooting guide
- [ ] Document common issues and solutions

---

## 11. Marketing & Launch Preparation

### Pre-Launch Marketing
- [ ] Create social media accounts (Twitter, Facebook, Instagram)
- [ ] Prepare launch announcement
- [ ] Create demo video
- [ ] Prepare press kit
- [ ] Reach out to education bloggers/influencers

### Launch Strategy
- [ ] Decide: Soft launch vs. Full launch
- [ ] Set launch date
- [ ] Prepare launch day checklist
- [ ] Plan for handling support requests
- [ ] Monitor server capacity

### Post-Launch
- [ ] Collect user feedback
- [ ] Monitor analytics and metrics
- [ ] Track conversion rates
- [ ] Plan feature updates based on feedback

---

## 12. Final Checks

### Pre-Launch Review
- [ ] All features working as expected
- [ ] No broken links
- [ ] All forms submitting correctly
- [ ] All emails sending correctly
- [ ] Mobile experience is smooth
- [ ] Loading times are acceptable
- [ ] Error messages are user-friendly
- [ ] Success messages are clear

### Team Readiness
- [ ] Support team trained (if applicable)
- [ ] Escalation process defined
- [ ] On-call schedule set (if applicable)

### Rollback Plan
- [ ] Document how to rollback deployment
- [ ] Keep previous version accessible
- [ ] Have emergency contact list

---

## Launch Day Checklist

### Morning of Launch
- [ ] Final smoke test of all critical flows
- [ ] Verify all monitoring is active
- [ ] Check server capacity
- [ ] Ensure support channels are monitored

### During Launch
- [ ] Monitor error rates
- [ ] Watch analytics for traffic spikes
- [ ] Respond to support requests quickly
- [ ] Monitor social media mentions

### Post-Launch (First 24 Hours)
- [ ] Review error logs
- [ ] Check conversion rates
- [ ] Gather initial user feedback
- [ ] Address any critical issues immediately

---

## Success Metrics to Track

### Key Performance Indicators (KPIs)
- Sign-up conversion rate (visitors → sign-ups)
- Free-to-paid conversion rate
- Monthly Recurring Revenue (MRR)
- Customer Acquisition Cost (CAC)
- Customer Lifetime Value (LTV)
- Churn rate
- Daily/Monthly Active Users (DAU/MAU)
- Average session duration
- Activities completed per user

### Technical Metrics
- Page load time
- API response time
- Error rate
- Uptime percentage
- Core Web Vitals scores

---

## Emergency Contacts

- **Vercel Support**: https://vercel.com/help
- **Stripe Support**: https://support.stripe.com
- **Supabase Support**: https://supabase.com/support
- **Domain Registrar (Neoserv)**: [Add contact info]

---

## Notes

- This checklist should be completed over several days, not rushed
- Test thoroughly before switching to live mode
- Start with a soft launch to a small group if possible
- Have a rollback plan ready
- Monitor closely for the first 48 hours after launch

**Good luck with your launch!** 🚀
