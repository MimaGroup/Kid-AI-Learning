# Database Setup Guide

This guide explains how to set up the required database tables for the AI Kids Learning platform.

## Required Tables

The platform requires several database tables to function properly. Most are already set up, but some optional features require additional tables.

## Notifications Table (Optional)

The in-app notifications feature requires a `notifications` table. If you want to enable notifications:

### Setup Instructions

1. **Navigate to your Supabase project**
   - Go to https://supabase.com/dashboard
   - Select your project

2. **Open the SQL Editor**
   - Click on "SQL Editor" in the left sidebar
   - Click "New query"

3. **Run the notifications table script**
   - Copy the contents of `scripts/create-notifications-table.sql`
   - Paste into the SQL Editor
   - Click "Run" or press Cmd/Ctrl + Enter

4. **Verify the table was created**
   - Go to "Table Editor" in the left sidebar
   - You should see a new `notifications` table

### What This Enables

Once the notifications table is created, users will see:
- A notification bell icon in the header
- Real-time notifications for achievements
- Progress update notifications
- Subscription-related notifications

### If You Skip This

If you don't create the notifications table:
- The notification bell will not appear (graceful degradation)
- All other features will continue to work normally
- You can add it later without any issues

## Other Database Tables

All other required tables should already be set up through the initial database migration. These include:
- `profiles` - User profiles
- `children` - Child profiles
- `user_progress` - Learning progress tracking
- `achievements` - Achievement system
- `subscriptions` - Subscription management

If you're missing any of these core tables, please contact support.
