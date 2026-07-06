# Security Documentation

## Overview

This document outlines the security measures implemented in the AI Kids Learning platform.

## Security Features

### 1. Rate Limiting

**Implementation:** Middleware-based rate limiting
- **API Routes:** 100 requests per minute per IP
- **Authentication:** 5 requests per 5 minutes per IP
- **Payment Routes:** 10 requests per minute per IP

**Headers:**
- `X-RateLimit-Limit`: Maximum requests allowed
- `X-RateLimit-Remaining`: Requests remaining
- `X-RateLimit-Reset`: When the limit resets
- `Retry-After`: Seconds to wait before retrying (on 429)

### 2. Security Headers

**Implemented Headers:**
- `Strict-Transport-Security`: Forces HTTPS
- `Content-Security-Policy`: Prevents XSS attacks
- `X-Frame-Options`: Prevents clickjacking
- `X-Content-Type-Options`: Prevents MIME sniffing
- `Referrer-Policy`: Controls referrer information
- `X-XSS-Protection`: Browser XSS protection
- `Permissions-Policy`: Restricts browser features

### 3. Input Validation

**Validation Library:** Zod

**Validated Inputs:**
- Child profiles (name, age, avatar_color, learning_level)
- Progress tracking (child_id, activity_id, score, time_spent)
- Email addresses
- Passwords (min 8 chars, uppercase, lowercase, number)

**Sanitization:**
- HTML entity encoding
- String length limits
- Character whitelisting for names

### 4. Authentication & Authorization

**Implementation:** Supabase Auth + Row Level Security (RLS)

**Protected Routes:**
- All `/api/*` routes require authentication
- `/parent/*` routes require parent authentication
- `/kids/*` routes require authentication

**Session Management:**
- Automatic session refresh in middleware
- Secure cookie handling
- HTTP-only cookies

### 5. Database Security

**Row Level Security (RLS):**
- Users can only access their own data
- Children profiles linked to parent_id
- Progress data linked to child_id
- Subscriptions linked to user_id

**Query Security:**
- Parameterized queries (Supabase client)
- No raw SQL from user input
- Service role client only for admin operations

### 6. API Security

**Authentication:**
- JWT tokens via Supabase
- Token validation on every request
- Automatic token refresh

**Authorization:**
- User can only access their own children
- User can only modify their own data
- Admin operations require service role

**Audit Logging:**
- User actions logged
- IP address tracking
- Timestamp recording
- Metadata capture

### 7. Payment Security

**Stripe Integration:**
- PCI DSS compliant (Stripe handles card data)
- Webhook signature verification
- Secure API key storage
- Rate limiting on payment endpoints

**Environment Variables:**
- `STRIPE_SECRET_KEY`: Server-side only
- `STRIPE_WEBHOOK_SECRET`: Webhook verification
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`: Client-side (safe)

### 8. COPPA Compliance

**Children's Data Protection:**
- Parental consent required
- No direct data collection from children
- Secure data storage
- Data deletion on request
- Privacy policy compliance

## Security Best Practices

### Environment Variables

**Never commit:**
- API keys
- Database credentials
- Webhook secrets
- Service role keys

**Use:**
- Vercel environment variables
- `.env.local` for local development
- `NEXT_PUBLIC_*` prefix only for client-safe variables

### Code Security

**Do:**
- Validate all user input
- Sanitize HTML output
- Use parameterized queries
- Implement rate limiting
- Log security events
- Keep dependencies updated

**Don't:**
- Trust user input
- Expose sensitive data in errors
- Use `eval()` or similar
- Store secrets in code
- Disable security features

## Incident Response

### If a Security Issue is Discovered:

1. **Assess Impact:** Determine severity and affected users
2. **Contain:** Disable affected features if necessary
3. **Fix:** Implement and test fix
4. **Deploy:** Push fix to production immediately
5. **Notify:** Inform affected users if required
6. **Document:** Record incident and response

### Reporting Security Issues

Email: security@kids-learning-ai.com (TODO: Set up)

## Security Checklist

- [x] Rate limiting implemented
- [x] Security headers configured
- [x] Input validation on all forms
- [x] Authentication on protected routes
- [x] Row Level Security (RLS) enabled
- [x] CSRF protection (via Supabase)
- [x] XSS prevention (sanitization)
- [x] SQL injection prevention (parameterized queries)
- [x] Secure session management
- [x] Audit logging
- [x] HTTPS enforced (HSTS)
- [x] Environment variables secured
- [ ] Security monitoring (TODO: Add Sentry/monitoring)
- [ ] Regular security audits (TODO: Schedule)
- [ ] Penetration testing (TODO: Before launch)

## Future Enhancements

1. **Redis-based Rate Limiting:** For distributed systems
2. **Advanced Monitoring:** Sentry, LogRocket, or similar
3. **2FA:** Two-factor authentication for parents
4. **IP Whitelisting:** For admin operations
5. **Automated Security Scans:** GitHub Dependabot, Snyk
6. **WAF:** Web Application Firewall (Cloudflare)
7. **DDoS Protection:** Advanced rate limiting
8. **Security Headers Testing:** Regular audits

## Compliance

- **COPPA:** Children's Online Privacy Protection Act
- **GDPR:** General Data Protection Regulation (if EU users)
- **PCI DSS:** Payment Card Industry Data Security Standard (via Stripe)

## Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Next.js Security](https://nextjs.org/docs/app/building-your-application/configuring/security)
- [Supabase Security](https://supabase.com/docs/guides/auth/row-level-security)
- [Stripe Security](https://stripe.com/docs/security)
