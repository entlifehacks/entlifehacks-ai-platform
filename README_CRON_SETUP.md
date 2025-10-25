# Automated Email Processing Cron Job Setup

## Overview

The `process-scheduled-emails` edge function automatically processes pending scheduled emails every hour. It includes retry logic, error handling, and status tracking.

## Features

- ✅ Processes up to 50 pending emails per run
- ✅ Automatic retry logic (up to 3 attempts)
- ✅ Error tracking and logging
- ✅ Status updates (pending → sent/failed)
- ✅ Hourly execution via Supabase cron

## Setup Instructions

### 1. Verify Edge Function Deployment

The `process-scheduled-emails` function should already be deployed. Verify in Supabase Dashboard:
- Go to **Edge Functions** section
- Confirm `process-scheduled-emails` is listed and active

### 2. Set Up Cron Job in Supabase

**Option A: Using Supabase Dashboard (Recommended)**

1. Go to your Supabase project dashboard
2. Navigate to **Database** → **Extensions**
3. Enable the `pg_cron` extension if not already enabled
4. Go to **SQL Editor** and run:

```sql
-- Create cron job to run every hour
SELECT cron.schedule(
  'process-scheduled-emails-hourly',
  '0 * * * *', -- Every hour at minute 0
  $$
  SELECT net.http_post(
    url := 'https://YOUR_PROJECT_REF.supabase.co/functions/v1/process-scheduled-emails',
    headers := jsonb_build_object(
      'Authorization', 'Bearer YOUR_SERVICE_ROLE_KEY',
      'Content-Type', 'application/json'
    ),
    body := '{}'::jsonb
  );
  $$
);
```

**Replace:**
- `YOUR_PROJECT_REF` with your Supabase project reference
- `YOUR_SERVICE_ROLE_KEY` with your service role key (from Settings → API)

**Option B: Using pg_net Extension**

If `pg_cron` is not available, use `pg_net` with a webhook:

```sql
-- Enable pg_net extension
CREATE EXTENSION IF NOT EXISTS pg_net;

-- Create a function to trigger the edge function
CREATE OR REPLACE FUNCTION trigger_email_processing()
RETURNS void AS $$
BEGIN
  PERFORM net.http_post(
    url := 'https://YOUR_PROJECT_REF.supabase.co/functions/v1/process-scheduled-emails',
    headers := jsonb_build_object(
      'Authorization', 'Bearer YOUR_SERVICE_ROLE_KEY',
      'Content-Type', 'application/json'
    )
  );
END;
$$ LANGUAGE plpgsql;

-- Schedule it with pg_cron
SELECT cron.schedule(
  'process-scheduled-emails-hourly',
  '0 * * * *',
  'SELECT trigger_email_processing();'
);
```

### 3. Verify Cron Job Setup

Check if the cron job is scheduled:

```sql
SELECT * FROM cron.job;
```

You should see an entry for `process-scheduled-emails-hourly`.

### 4. Monitor Cron Job Execution

View cron job execution history:

```sql
SELECT * FROM cron.job_run_details 
WHERE jobid = (SELECT jobid FROM cron.job WHERE jobname = 'process-scheduled-emails-hourly')
ORDER BY start_time DESC 
LIMIT 10;
```

### 5. Manual Testing

Test the edge function manually before setting up the cron:

```bash
curl -X POST \
  https://YOUR_PROJECT_REF.supabase.co/functions/v1/process-scheduled-emails \
  -H "Authorization: Bearer YOUR_SERVICE_ROLE_KEY" \
  -H "Content-Type: application/json"
```

## How It Works

### Email Processing Flow

1. **Query**: Fetches pending emails where `scheduled_for <= now()` and `retry_count < 3`
2. **Send**: Calls `send-email` function for each email
3. **Update**: Updates status based on result:
   - **Success**: `status = 'sent'`, records `sent_at` and `message_id`
   - **Failure**: Increments `retry_count`, records `last_error` and `last_attempt_at`
   - **Max Retries**: After 3 failed attempts, `status = 'failed'`

### Retry Logic

- Emails are retried up to 3 times
- Each retry increments `retry_count`
- After 3 failures, email is marked as permanently failed
- Retry timing: Hourly (on next cron run)

## Database Schema

The `scheduled_emails` table includes:

```sql
- id (uuid, primary key)
- recipient_email (text)
- recipient_name (text)
- subject (text)
- template_type (text) -- 'day3' or 'day7'
- scheduled_for (timestamptz)
- status (text) -- 'pending', 'sent', 'failed'
- data (jsonb) -- Email template data
- retry_count (integer) -- Number of retry attempts
- last_error (text) -- Last error message
- last_attempt_at (timestamptz) -- Last send attempt
- sent_at (timestamptz) -- When successfully sent
- message_id (text) -- SendGrid message ID
- created_at (timestamptz)
```

## Monitoring & Troubleshooting

### Check Pending Emails

```sql
SELECT * FROM scheduled_emails 
WHERE status = 'pending' 
AND scheduled_for <= NOW()
ORDER BY scheduled_for;
```

### Check Failed Emails

```sql
SELECT * FROM scheduled_emails 
WHERE status = 'failed'
ORDER BY created_at DESC;
```

### View Retry Status

```sql
SELECT 
  recipient_email,
  template_type,
  retry_count,
  last_error,
  last_attempt_at
FROM scheduled_emails 
WHERE retry_count > 0
ORDER BY last_attempt_at DESC;
```

### Reset Failed Email for Retry

```sql
UPDATE scheduled_emails 
SET status = 'pending', retry_count = 0, last_error = NULL
WHERE id = 'EMAIL_ID';
```

## Customization

### Change Cron Schedule

Modify the cron expression in the schedule command:

- Every 30 minutes: `*/30 * * * *`
- Every 2 hours: `0 */2 * * *`
- Daily at 9 AM: `0 9 * * *`
- Every 15 minutes: `*/15 * * * *`

### Adjust Retry Limit

Edit the edge function to change max retries:

```typescript
.lt('retry_count', 5) // Change from 3 to 5
```

### Batch Size

Modify the limit in the edge function:

```typescript
.limit(100) // Change from 50 to 100
```

## Security Notes

- ⚠️ Never expose your service role key in client code
- ✅ Cron jobs use server-side credentials only
- ✅ Edge function validates Supabase credentials
- ✅ CORS headers properly configured

## Support

If emails are not being processed:
1. Check cron job is scheduled: `SELECT * FROM cron.job;`
2. Check for errors: `SELECT * FROM cron.job_run_details;`
3. Verify edge function is deployed and active
4. Test edge function manually with curl
5. Check SendGrid API key is configured in edge function secrets
6. Review `email_logs` table for send errors
