# Complete User Journey Testing Guide

This guide will help you test the entire user flow of your AI Kids Learning Platform from signup to premium subscription access.

## Prerequisites

- Use Stripe test cards (e.g., `4242 4242 4242 4242`)
- Test in an incognito/private browser window for clean testing
- Have access to your Supabase dashboard to verify data
- Have access to your Stripe dashboard to verify subscriptions

---

## Test Flow 1: New User Signup → Free Tier

### Step 1: Visit Homepage
- **URL:** `https://your-domain.com` or `http://localhost:3000`
- **Expected:** 
  - See landing page with "AI Kids Learning Platform" title
  - See "Getting Started Guide" and "Sign In" buttons
  - See 3 feature cards (Fun Games, Earn Rewards, Learn AI)

### Step 2: Sign Up
- **Action:** Click "Getting Started Guide" or navigate to `/auth/sign-up`
- **Fill in:**
  - Email: `test@example.com`
  - Password: `TestPassword123!`
- **Click:** "Sign Up"
- **Expected:**
  - Success message or redirect
  - Check email for verification link (if email verification is enabled)
  - Redirect to `/parent/dashboard`

### Step 3: Parent Dashboard (Free Tier)
- **URL:** `/parent/dashboard`
- **Expected:**
  - See "Parent Dashboard" title
  - See your email displayed
  - See "Sign Out" button
  - See tabs: "Child Profiles" and "Learning Progress"
  - See "Add Child" button
  - See links to: Kids Learning, AI Activities, Subscription, Settings

### Step 4: Add Child Profile
- **Action:** Click "Add Child" button
- **Fill in:**
  - Name: `Emma`
  - Age: `8`
  - Avatar: Select any avatar
- **Click:** "Add Child"
- **Expected:**
  - Child card appears with name, age, and avatar
  - Can see Edit and Delete buttons on child card

### Step 5: Test Free Tier Access
- **Action:** Click "View Progress" or navigate to `/kids/home`
- **Expected:**
  - See kids home page
  - Access to FREE games only:
    - AI Quiz Challenge
    - Memory Match
    - Math Adventure
    - Word Builder
  - LOCKED premium features:
    - AI Friend Creator (should show lock icon)
    - Pattern Training (should show lock icon)
    - AI Detective (should show lock icon)

### Step 6: Verify Subscription Status
- **Action:** Navigate to `/parent/subscription`
- **Expected:**
  - See current plan: "Free Plan"
  - See "Upgrade to Premium" button
  - See subscription status: "No active subscription"

---

## Test Flow 2: Upgrade to Premium (Monthly)

### Step 1: View Pricing
- **Action:** Navigate to `/pricing`
- **Expected:**
  - See 3 plans: Free, Premium Monthly ($9.99/month), Premium Yearly ($99.99/year)
  - See "Most Popular" badge on Yearly plan
  - See feature lists for each plan
  - See FAQ section at bottom

### Step 2: Start Monthly Subscription
- **Action:** Click "Start Monthly" button on Premium Monthly plan
- **Expected:**
  - Redirect to Stripe Checkout page
  - See subscription details: "Premium Monthly subscription" - $9.99/month
  - See your email pre-filled

### Step 3: Complete Payment
- **Fill in Stripe test card:**
  - Card: `4242 4242 4242 4242`
  - Expiry: `12/34`
  - CVC: `123`
  - Name: `Test User`
  - Country: Any
- **Click:** "Subscribe" or "Pay"
- **Expected:**
  - Payment processes successfully
  - Redirect to `/payment/success`

### Step 4: Payment Success Page
- **URL:** `/payment/success`
- **Expected:**
  - See success message
  - See "Go to Dashboard" button
  - Click button to return to dashboard

### Step 5: Verify Premium Access
- **Action:** Navigate to `/parent/subscription`
- **Expected:**
  - See current plan: "Premium Monthly" or "monthly"
  - See subscription status: "active"
  - See next billing date
  - See "Cancel Subscription" button

### Step 6: Test Premium Features
- **Action:** Navigate to `/kids/home`
- **Expected:**
  - ALL games are now unlocked (no lock icons)
  - Can access:
    - AI Friend Creator
    - Pattern Training
    - AI Detective
    - All other premium features

### Step 7: Verify in Stripe Dashboard
- **Action:** Go to Stripe Dashboard → Customers
- **Expected:**
  - See new customer with your test email
  - See active subscription for $9.99/month
  - See successful payment

### Step 8: Verify in Supabase Dashboard
- **Action:** Go to Supabase → Table Editor → `subscriptions` table
- **Expected:**
  - See new row with:
    - `user_id`: Your user ID
    - `plan_type`: "monthly"
    - `status`: "active"
    - `stripe_subscription_id`: Subscription ID from Stripe
    - `current_period_end`: Future date

---

## Test Flow 3: Subscription Management

### Step 1: Cancel Subscription
- **Action:** Navigate to `/parent/subscription`
- **Click:** "Cancel Subscription" button
- **Confirm:** Cancellation
- **Expected:**
  - Success message
  - Subscription status changes to "canceled" or "active" (until period end)
  - Still have access until current period ends

### Step 2: Verify Cancellation
- **Action:** Check Stripe Dashboard
- **Expected:**
  - Subscription shows as "Canceled" or "Will cancel at period end"
  - No future charges scheduled

---

## Test Flow 4: Yearly Subscription

### Step 1: Sign Up New User (or use existing)
- **Action:** Create new account or use existing free account
- **Navigate to:** `/pricing`

### Step 2: Subscribe to Yearly Plan
- **Action:** Click "Start Yearly" button on Premium Yearly plan
- **Expected:**
  - Redirect to Stripe Checkout
  - See $99.99/year pricing
  - See "Save $20 annually" message

### Step 3: Complete Payment
- **Use test card:** `4242 4242 4242 4242`
- **Complete checkout**
- **Expected:**
  - Successful payment
  - Redirect to success page

### Step 4: Verify Yearly Subscription
- **Action:** Navigate to `/parent/subscription`
- **Expected:**
  - See plan: "Premium Yearly" or "yearly"
  - See status: "active"
  - See next billing date (1 year from now)

---

## Test Flow 5: Kids Learning Experience

### Step 1: Access Kids Home
- **Action:** Navigate to `/kids/home`
- **Expected:**
  - Kid-friendly interface with colorful design
  - See available games/activities
  - See progress indicators

### Step 2: Play a Game
- **Action:** Click on any game (e.g., "AI Quiz Challenge")
- **Expected:**
  - Game loads successfully
  - Can interact with game
  - Progress is tracked

### Step 3: Check Progress
- **Action:** Return to `/parent/dashboard`
- **Click:** "Learning Progress" tab
- **Expected:**
  - See child's activity
  - See games played
  - See achievements/badges earned

---

## Test Flow 6: Error Scenarios

### Test 1: Invalid Login
- **Action:** Try to login with wrong password
- **Expected:** Error message "Invalid credentials"

### Test 2: Duplicate Email
- **Action:** Try to sign up with existing email
- **Expected:** Error message about existing account

### Test 3: Expired Card
- **Use test card:** `4000 0000 0000 0069`
- **Expected:** Payment declined with "Card expired" error

### Test 4: Insufficient Funds
- **Use test card:** `4000 0000 0000 9995`
- **Expected:** Payment declined with "Insufficient funds" error

### Test 5: Access Premium Without Subscription
- **Action:** Logout, login with free account
- **Try to access:** `/kids/ai-friend/page` (premium feature)
- **Expected:** Redirect to pricing or show "Upgrade required" message

---

## Test Flow 7: Authentication Edge Cases

### Test 1: Protected Routes
- **Action:** Logout, try to access `/parent/dashboard` directly
- **Expected:** Redirect to `/auth/login`

### Test 2: Session Persistence
- **Action:** Login, close browser, reopen
- **Expected:** Still logged in (session persists)

### Test 3: Logout
- **Action:** Click "Sign Out" button
- **Expected:** 
  - Logged out successfully
  - Redirect to homepage or login page
  - Cannot access protected routes

---

## Checklist Summary

Use this checklist to track your testing progress:

- [ ] Homepage loads correctly
- [ ] Sign up flow works
- [ ] Email verification (if enabled)
- [ ] Login flow works
- [ ] Parent dashboard displays correctly
- [ ] Can add child profiles
- [ ] Can edit child profiles
- [ ] Can delete child profiles
- [ ] Free tier access restrictions work
- [ ] Pricing page displays correctly
- [ ] Monthly subscription checkout works
- [ ] Yearly subscription checkout works
- [ ] Payment success page works
- [ ] Subscription status updates correctly
- [ ] Premium features unlock after payment
- [ ] Subscription management page works
- [ ] Can cancel subscription
- [ ] Kids home page works
- [ ] Games/activities load correctly
- [ ] Progress tracking works
- [ ] Protected routes are secured
- [ ] Logout works correctly
- [ ] Error handling works (invalid cards, etc.)
- [ ] Stripe webhook processes correctly
- [ ] Supabase data updates correctly

---

## Common Issues & Solutions

### Issue: "No such price" error
**Solution:** Verify Price IDs in environment variables match Stripe dashboard

### Issue: Checkout redirects to error page
**Solution:** Check Stripe webhook is configured correctly

### Issue: Premium features still locked after payment
**Solution:** 
1. Check subscription status API returns `hasPremium: true`
2. Verify Stripe webhook processed successfully
3. Check Supabase `subscriptions` table has correct data

### Issue: Can't access protected routes
**Solution:** Verify Supabase auth is working and session is valid

### Issue: Child profiles not saving
**Solution:** Check Supabase `children` table permissions and RLS policies

---

## Next Steps After Testing

Once all tests pass:

1. **Switch to Live Mode:**
   - Update Stripe keys to live mode
   - Update Price IDs to live prices
   - Test with real payment (small amount)

2. **Add Missing Features:**
   - Terms of Service page
   - Privacy Policy page
   - Contact/Support page
   - Email notifications

3. **Polish UI/UX:**
   - Improve error messages
   - Add loading states
   - Improve mobile responsiveness
   - Add animations

4. **Set Up Monitoring:**
   - Error tracking (Sentry)
   - Analytics (Google Analytics, Vercel Analytics)
   - Subscription metrics dashboard

5. **Launch:**
   - Announce to users
   - Monitor for issues
   - Collect feedback
