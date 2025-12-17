# Rate Limiting Implementation

## Overview

The AI Kids Learning platform now uses **Upstash Redis** for distributed, production-ready rate limiting. This ensures consistent rate limiting across multiple server instances and prevents abuse of expensive AI operations.

## Architecture

### Rate Limiting Utility (`lib/rate-limit.ts`)

The centralized rate limiting utility provides:
- **Sliding window algorithm** for accurate rate limiting
- **Distributed storage** using Upstash Redis
- **Graceful degradation** (fails open if Redis is unavailable)
- **Flexible configuration** for different endpoint types

### Rate Limit Configurations

| Endpoint Type | Requests | Time Window | Use Case |
|--------------|----------|-------------|----------|
| General API | 100 | 1 minute | Standard API operations |
| Authentication | 5 | 5 minutes | Login/signup attempts |
| Payment | 10 | 1 minute | Stripe operations |
| AI Generation | 3 | 1 minute | Quiz/mystery generation |
| AI Chat | 10 | 1 minute | AI friend conversations |
| Premium AI Generation | 10 | 1 minute | For premium users |
| Premium AI Chat | 30 | 1 minute | For premium users |

## Implementation Details

### 1. Middleware Rate Limiting (`middleware.ts`)

Global rate limiting applied to all API routes:
- IP-based identification
- Different limits for auth, payment, and general API routes
- Returns 429 status with retry-after headers when exceeded

### 2. AI Endpoint Rate Limiting

Individual AI endpoints have additional rate limiting:

#### Quiz Generation (`/api/generate/quiz`)
- 3 AI generations per minute per user
- Falls back to pre-made questions when limit exceeded
- User-friendly error messages

#### Mystery Generation (`/api/generate/mystery`)
- 3 AI generations per minute per user
- Falls back to pre-made mysteries when limit exceeded

#### AI Friend Chat (`/api/ai-friend/chat`)
- 10 messages per minute per user
- Falls back to simple responses when limit exceeded
- Maintains conversation flow even when rate limited

### 3. User Identification

Rate limits are tracked per:
- **Authenticated users**: By user ID from Supabase auth
- **Anonymous users**: By IP address (from middleware)

### 4. Response Headers

When rate limited, responses include:
- `X-RateLimit-Limit`: Maximum requests allowed
- `X-RateLimit-Remaining`: Requests remaining in window
- `X-RateLimit-Reset`: ISO timestamp when limit resets
- `Retry-After`: Seconds to wait before retrying

## Environment Variables

Required Upstash Redis environment variables:
```
UPSTASH-KV_KV_REST_API_URL=https://your-redis-url.upstash.io
UPSTASH-KV_KV_REST_API_TOKEN=your-token-here
```

These are automatically configured when you connect the Upstash integration in Vercel.

## Benefits

### 1. Cost Control
- Prevents abuse of expensive AI API calls (Groq)
- Limits Stripe API usage to prevent quota issues
- Protects against runaway costs

### 2. Security
- Prevents brute force attacks on authentication
- Mitigates DDoS attempts
- Protects against API abuse

### 3. Fair Usage
- Ensures all users get fair access to resources
- Prevents single users from monopolizing AI services
- Maintains platform stability

### 4. User Experience
- Graceful degradation with fallback responses
- Clear error messages explaining wait times
- Maintains functionality even when rate limited

## Testing Rate Limits

### Test Authentication Rate Limit
```bash
# Make 6 login attempts within 5 minutes
for i in {1..6}; do
  curl -X POST http://localhost:3000/api/auth/login \
    -H "Content-Type: application/json" \
    -d '{"email":"test@example.com","password":"wrong"}'
done
# 6th request should return 429
```

### Test AI Generation Rate Limit
```bash
# Make 4 quiz generation requests within 1 minute
for i in {1..4}; do
  curl -X POST http://localhost:3000/api/generate/quiz \
    -H "Content-Type: application/json" \
    -d '{"topic":"AI","difficulty":"beginner","count":5}'
done
# 4th request should return fallback questions
```

### Test AI Chat Rate Limit
```bash
# Make 11 chat requests within 1 minute
for i in {1..11}; do
  curl -X POST http://localhost:3000/api/ai-friend/chat \
    -H "Content-Type: application/json" \
    -d '{"friendName":"Buddy","personality":"Friendly","message":"Hi!"}'
done
# 11th request should return fallback response
```

## Monitoring

### Check Rate Limit Usage

You can monitor rate limit usage in Upstash Redis dashboard:
1. Go to Upstash console
2. Select your Redis database
3. Use the Data Browser to view keys with pattern `ratelimit:*`

### Key Patterns

Rate limit keys follow this pattern:
```
ratelimit:{identifier}:{endpoint}
```

Examples:
- `ratelimit:192.168.1.1:api` - IP-based API rate limit
- `ratelimit:user-123:ai-generation` - User-based AI generation limit
- `ratelimit:user-456:ai-chat` - User-based chat limit

## Future Enhancements

### 1. Premium User Support
- Implement `isPremiumUser()` function to check subscription status
- Apply higher rate limits for premium users
- Add premium tier indicators in responses

### 2. Dynamic Rate Limits
- Adjust limits based on system load
- Implement burst allowances for occasional spikes
- Add time-of-day based limits

### 3. Rate Limit Analytics
- Track rate limit hits per endpoint
- Identify users frequently hitting limits
- Optimize limits based on usage patterns

### 4. Custom Rate Limits
- Allow admins to set custom limits per user
- Implement whitelist for trusted users
- Add temporary limit increases for special events

## Troubleshooting

### Rate Limits Not Working

1. **Check Upstash Connection**
   ```bash
   # Verify environment variables are set
   echo $UPSTASH-KV_KV_REST_API_URL
   echo $UPSTASH-KV_KV_REST_API_TOKEN
   ```

2. **Check Redis Connectivity**
   - Verify Upstash dashboard shows active connections
   - Check for any error logs in Vercel deployment logs

3. **Verify Middleware is Running**
   - Check that middleware.ts is being executed
   - Look for rate limit headers in API responses

### Users Hitting Limits Too Quickly

1. **Review Rate Limit Configuration**
   - Check if limits are too restrictive
   - Consider increasing limits for specific endpoints

2. **Check for Legitimate High Usage**
   - Review user behavior patterns
   - Consider implementing premium tiers with higher limits

3. **Investigate Potential Abuse**
   - Check for unusual patterns in rate limit hits
   - Review IP addresses hitting limits frequently

## Security Considerations

1. **Fail Open Strategy**: If Redis is unavailable, requests are allowed to prevent service disruption
2. **IP Spoofing**: Consider using additional identifiers beyond IP for critical endpoints
3. **Distributed Attacks**: Monitor for coordinated attacks from multiple IPs
4. **Rate Limit Bypass**: Ensure rate limiting cannot be bypassed by manipulating headers

## Compliance

Rate limiting helps with:
- **COPPA Compliance**: Prevents excessive data collection from children
- **API Terms of Service**: Ensures compliance with third-party API usage limits (Groq, Stripe)
- **Fair Use Policies**: Maintains equitable access for all users

---

**Status**: ✅ Implemented and Production Ready

**Last Updated**: 2025-10-19

**Dependencies**: 
- `@upstash/redis` v1.35.6
- Upstash Redis integration configured in Vercel
