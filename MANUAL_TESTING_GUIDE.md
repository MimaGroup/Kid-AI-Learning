# Manual Testing Guide - AI Kids Learning Platform

This guide provides step-by-step instructions for manually testing all critical features of the platform.

## 🎯 Testing Environment Setup

### Prerequisites
- Modern browser (Chrome, Firefox, Safari, or Edge)
- Test email account
- Stripe test card: `4242 4242 4242 4242`
- Access to browser developer tools

### Test Accounts
Create these test accounts for different scenarios:
- **Free User**: test-free-[timestamp]@example.com
- **Premium User**: test-premium-[timestamp]@example.com

---

## Test Suite 1: Authentication & Onboarding

### Test 1.1: User Signup
**Objective**: Verify new users can create accounts successfully

**Steps**:
1. Navigate to `/auth/sign-up`
2. Enter email: `test-user-[timestamp]@example.com`
3. Enter password: `TestPassword123!`
4. Click "Sign Up"

**Expected Results**:
- ✅ Form validates input
- ✅ Success message appears
- ✅ Redirected to onboarding flow
- ✅ Welcome email sent (check email)

**Pass/Fail**: ___________

---

### Test 1.2: Onboarding Flow
**Objective**: Verify onboarding completes successfully

**Steps**:
1. After signup, complete all 5 onboarding steps
2. Read each step carefully
3. Click "Next" through all steps
4. Click "Get Started" on final step

**Expected Results**:
- ✅ Progress bar updates correctly
- ✅ All content displays properly
- ✅ Navigation works (Previous/Next buttons)
- ✅ Redirected to child profile creation

**Pass/Fail**: ___________

---

### Test 1.3: Child Profile Creation
**Objective**: Verify parents can create child profiles

**Steps**:
1. Enter child name: "Test Child"
2. Select age: 7
3. Select grade: "2nd Grade"
4. Click "Create Profile"

**Expected Results**:
- ✅ Form validates input
- ✅ Profile created successfully
- ✅ Redirected to kids dashboard
- ✅ Child name appears in dashboard

**Pass/Fail**: ___________

---

### Test 1.4: Login
**Objective**: Verify existing users can log in

**Steps**:
1. Log out if logged in
2. Navigate to `/auth/login`
3. Enter test account credentials
4. Click "Log In"

**Expected Results**:
- ✅ Login successful
- ✅ Redirected to appropriate dashboard
- ✅ User session persists

**Pass/Fail**: ___________

---

## Test Suite 2: Games & Activities

### Test 2.1: AI Quiz Game
**Objective**: Verify AI Quiz works correctly

**Steps**:
1. Navigate to `/kids/games/ai-quiz`
2. Select a topic (e.g., "Science")
3. Answer all questions
4. Complete the quiz

**Expected Results**:
- ✅ Game loads without errors
- ✅ Questions display properly
- ✅ Answer selection works
- ✅ Score calculated correctly
- ✅ Completion message shows
- ✅ Progress saved (check parent dashboard)

**Pass/Fail**: ___________

---

### Test 2.2: Word Builder Game
**Objective**: Verify Word Builder works correctly

**Steps**:
1. Navigate to `/kids/games/word-builder`
2. Complete word building challenges
3. Submit answers
4. Complete the game

**Expected Results**:
- ✅ Game loads without errors
- ✅ Drag and drop works (if applicable)
- ✅ Word validation works
- ✅ Score calculated correctly
- ✅ Progress saved

**Pass/Fail**: ___________

---

### Test 2.3: Story Time
**Objective**: Verify Story Time generates and displays stories

**Steps**:
1. Navigate to `/kids/games/story-time`
2. Select story preferences
3. Generate a story
4. Read through the story

**Expected Results**:
- ✅ Story generates successfully
- ✅ Content is age-appropriate
- ✅ Images display properly
- ✅ Navigation works
- ✅ Progress saved

**Pass/Fail**: ___________

---

## Test Suite 3: Premium Upgrade Flow

### Test 3.1: View Pricing
**Objective**: Verify pricing page displays correctly

**Steps**:
1. Navigate to `/pricing`
2. Review both pricing plans
3. Check all features listed
4. Verify trust badges display

**Expected Results**:
- ✅ Both plans display correctly
- ✅ Prices show correctly
- ✅ Features list complete
- ✅ Trust badges visible
- ✅ CTAs work

**Pass/Fail**: ___________

---

### Test 3.2: Stripe Checkout
**Objective**: Verify payment processing works

**Steps**:
1. Click "Get Started" on Monthly plan
2. Redirected to Stripe checkout
3. Enter test card: `4242 4242 4242 4242`
4. Enter any future expiry date
5. Enter any 3-digit CVC
6. Enter billing details
7. Click "Subscribe"

**Expected Results**:
- ✅ Redirected to Stripe checkout
- ✅ Checkout form loads correctly
- ✅ Test card accepted
- ✅ Payment processes successfully
- ✅ Redirected to success page

**Pass/Fail**: ___________

---

### Test 3.3: Premium Access
**Objective**: Verify premium features unlock after payment

**Steps**:
1. After successful payment, navigate to games
2. Try accessing previously locked content
3. Check subscription status in dashboard

**Expected Results**:
- ✅ All content unlocked
- ✅ No "Upgrade" prompts
- ✅ Subscription status shows "Premium"
- ✅ Welcome email received

**Pass/Fail**: ___________

---

## Test Suite 4: Parent Dashboard

### Test 4.1: Activity Feed
**Objective**: Verify activity feed shows recent activities

**Steps**:
1. Navigate to `/parent/dashboard`
2. Review activity feed
3. Complete a game as child
4. Refresh dashboard

**Expected Results**:
- ✅ Activity feed displays
- ✅ Recent activities shown
- ✅ New activities appear after refresh
- ✅ Timestamps accurate

**Pass/Fail**: ___________

---

### Test 4.2: Progress Tracking
**Objective**: Verify progress stats are accurate

**Steps**:
1. Note current progress stats
2. Complete multiple activities
3. Return to dashboard
4. Check updated stats

**Expected Results**:
- ✅ Stats update correctly
- ✅ Counts are accurate
- ✅ Charts display properly
- ✅ Data matches actual activity

**Pass/Fail**: ___________

---

### Test 4.3: Notifications
**Objective**: Verify notifications work correctly

**Steps**:
1. Check notification bell
2. Complete an activity that triggers achievement
3. Check for new notification
4. Click notification
5. Mark as read

**Expected Results**:
- ✅ Notification bell shows count
- ✅ New notifications appear
- ✅ Clicking opens notification
- ✅ Mark as read works
- ✅ Count updates

**Pass/Fail**: ___________

---

## Test Suite 5: Email Notifications

### Test 5.1: Welcome Email
**Objective**: Verify welcome email is sent

**Steps**:
1. Create new account
2. Check email inbox
3. Open welcome email
4. Click links in email

**Expected Results**:
- ✅ Email received within 5 minutes
- ✅ Content displays correctly
- ✅ Links work
- ✅ Unsubscribe link present

**Pass/Fail**: ___________

---

### Test 5.2: Achievement Email
**Objective**: Verify achievement emails are sent

**Steps**:
1. Complete activities to earn achievement
2. Check email inbox
3. Open achievement email

**Expected Results**:
- ✅ Email received
- ✅ Achievement details correct
- ✅ Encouragement message present
- ✅ Links work

**Pass/Fail**: ___________

---

## Test Suite 6: Mobile Responsiveness

### Test 6.1: Mobile Navigation
**Objective**: Verify site works on mobile devices

**Steps**:
1. Open site on mobile device or use browser dev tools
2. Test navigation menu
3. Navigate through pages
4. Test all interactive elements

**Expected Results**:
- ✅ Layout adapts to mobile
- ✅ Navigation menu works
- ✅ All buttons clickable
- ✅ Text readable
- ✅ Images scale properly

**Pass/Fail**: ___________

---

### Test 6.2: Mobile Games
**Objective**: Verify games work on mobile

**Steps**:
1. Open any game on mobile
2. Complete the game
3. Test all interactions

**Expected Results**:
- ✅ Game loads correctly
- ✅ Touch interactions work
- ✅ Layout fits screen
- ✅ Performance acceptable

**Pass/Fail**: ___________

---

## Test Suite 7: Performance

### Test 7.1: Page Load Speed
**Objective**: Verify pages load quickly

**Steps**:
1. Open browser dev tools
2. Go to Network tab
3. Load homepage
4. Check load time

**Expected Results**:
- ✅ Homepage loads < 3 seconds
- ✅ No console errors
- ✅ Images load properly
- ✅ Fonts load correctly

**Pass/Fail**: ___________

---

### Test 7.2: Lighthouse Audit
**Objective**: Verify good Lighthouse scores

**Steps**:
1. Open Chrome DevTools
2. Go to Lighthouse tab
3. Run audit on homepage
4. Review scores

**Expected Results**:
- ✅ Performance > 80
- ✅ Accessibility > 90
- ✅ Best Practices > 90
- ✅ SEO > 90

**Pass/Fail**: ___________

---

## Test Suite 8: Error Handling

### Test 8.1: Form Validation
**Objective**: Verify forms validate input correctly

**Steps**:
1. Try submitting forms with invalid data
2. Leave required fields empty
3. Enter invalid email format
4. Enter weak password

**Expected Results**:
- ✅ Validation errors show
- ✅ Error messages clear
- ✅ Form doesn't submit
- ✅ Fields highlighted

**Pass/Fail**: ___________

---

### Test 8.2: Network Errors
**Objective**: Verify graceful error handling

**Steps**:
1. Open dev tools
2. Go to Network tab
3. Enable offline mode
4. Try using the app

**Expected Results**:
- ✅ Error messages display
- ✅ No crashes
- ✅ Helpful error text
- ✅ Retry options available

**Pass/Fail**: ___________

---

## Final Checklist

Before marking testing complete, verify:

- [ ] All test suites completed
- [ ] All critical bugs documented
- [ ] High-priority bugs fixed
- [ ] Performance benchmarks met
- [ ] Cross-browser testing done
- [ ] Mobile testing done
- [ ] Email delivery verified
- [ ] Analytics tracking verified
- [ ] Payment flow tested
- [ ] Security checks passed

**Tester Name**: _______________
**Date**: _______________
**Overall Status**: Pass / Fail / Needs Work

**Notes**:
_______________________________________________
_______________________________________________
_______________________________________________
