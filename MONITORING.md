# Monitoring & Error Tracking

This document describes the monitoring and error tracking system for the AI Kids Learning platform.

## Overview

The platform includes comprehensive monitoring for:
- **Error Tracking**: Automatic logging of client and server errors
- **Performance Monitoring**: API response times and slow operations
- **System Health**: Real-time monitoring dashboard
- **Alerting**: Critical error notifications

## Components

### 1. Error Boundary
- Catches React component errors
- Logs errors to database automatically
- Shows user-friendly error UI
- Located in `components/error-boundary.tsx`

### 2. Global Error Handlers
- Catches unhandled promise rejections
- Catches global JavaScript errors
- Initialized in `app/layout.tsx`
- Logs all errors to monitoring system

### 3. API Monitoring
- Automatic performance tracking for API routes
- Error logging with stack traces
- Slow operation detection (>1s)
- Use `withMonitoring()` wrapper for API routes

### 4. Monitoring Dashboard
- Real-time error logs
- System alerts
- Performance metrics
- Located at `/admin` → Monitoring tab

## Usage

### Logging Errors Manually

```typescript
import { logError } from '@/lib/monitoring'

try {
  // Your code
} catch (error) {
  await logError({
    error_type: 'custom_error',
    error_message: error.message,
    stack_trace: error.stack,
    severity: 'high',
    source: 'api',
    endpoint: '/api/my-endpoint',
  })
}
```

### Tracking Performance

```typescript
import { trackOperation } from '@/lib/api-monitor'

const result = await trackOperation(
  'database_query',
  async () => {
    return await supabase.from('users').select('*')
  },
  { severity: 'medium' }
)
```

### Wrapping API Routes

```typescript
import { withMonitoring } from '@/lib/api-monitor'

export const POST = withMonitoring(
  async (req: NextRequest) => {
    // Your handler code
    return NextResponse.json({ success: true })
  },
  { endpoint: '/api/my-endpoint' }
)
```

### Creating System Alerts

```typescript
import { createSystemAlert } from '@/lib/monitoring'

await createSystemAlert({
  alert_type: 'performance',
  title: 'High API Latency',
  description: 'API response times exceeded 2s threshold',
  severity: 'warning',
  affected_service: 'api',
})
```

## Error Severity Levels

- **low**: Minor issues, informational
- **medium**: Errors that don't affect core functionality
- **high**: Errors affecting user experience
- **critical**: System-wide failures, data loss, security issues

## Alert Types

- **info**: Informational messages
- **warning**: Potential issues requiring attention
- **error**: Errors requiring investigation
- **critical**: Urgent issues requiring immediate action

## Monitoring Dashboard

Access the monitoring dashboard at `/admin` → Monitoring tab:

- **Total Errors**: Count of all errors in selected time range
- **Critical Errors**: Count of critical severity errors
- **Active Alerts**: Number of unresolved system alerts
- **Avg Response Time**: Average API response time

### Time Ranges
- Last Hour
- Last 24 Hours
- Last 7 Days
- Last 30 Days

## Database Tables

### error_logs
Stores all application errors with:
- error_type, error_message, stack_trace
- severity, source, endpoint
- user_id, metadata
- resolved status

### system_alerts
Stores system-wide alerts with:
- alert_type, title, description
- severity, status
- affected_service, metadata

### performance_metrics
Stores performance data with:
- metric_type, metric_name
- duration_ms, status
- endpoint, metadata

## Best Practices

1. **Always log critical errors** - Use severity: 'critical' for system failures
2. **Include context** - Add metadata with relevant information
3. **Monitor slow operations** - Track operations taking >1s
4. **Review logs regularly** - Check monitoring dashboard daily
5. **Set up alerts** - Configure email alerts for critical errors
6. **Clean up old logs** - Archive logs older than 90 days

## Rate Limiting

Error logging endpoints are rate-limited to prevent abuse:
- 100 requests per minute per IP
- Errors are logged even if rate limit is exceeded (fail-open)

## Future Enhancements

- [ ] Email notifications for critical errors
- [ ] Slack/Discord webhook integration
- [ ] Performance trend analysis
- [ ] Automated error grouping
- [ ] User impact tracking
- [ ] Custom dashboards per service
