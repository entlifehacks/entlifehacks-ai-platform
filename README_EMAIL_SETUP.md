# Email Integration Setup Guide

## Overview
This application now includes real email functionality using SendGrid with automated follow-up sequences and delivery tracking.

## Features Implemented

### 1. Email Templates
- **Immediate Report**: Sent immediately after questionnaire completion with personalized ROI analysis
- **Day 3 Follow-up**: Sent 3 days later with industry insights and success stories
- **Day 7 Consultation**: Sent 7 days later with special offers and consultation booking

### 2. Email Tracking
- Delivery confirmation
- Open tracking
- Click tracking
- Failed delivery monitoring
- Complete email history per recipient

### 3. Admin Dashboard
- Email statistics overview (sent, delivered, opened, clicked, failed)
- Recent email activity table
- Real-time tracking updates
- Tabbed interface for submissions and email tracking

## Setup Instructions

### Step 1: Get SendGrid API Key
1. Sign up for SendGrid at https://sendgrid.com
2. Navigate to Settings > API Keys
3. Create a new API key with "Mail Send" permissions
4. Copy the API key (you'll only see it once!)

### Step 2: Deploy Supabase Edge Function
1. Install Supabase CLI: `npm install -g supabase`
2. Login to Supabase: `supabase login`
3. Link your project: `supabase link --project-ref YOUR_PROJECT_REF`
4. Create the edge function file at `supabase/functions/send-email/index.ts`
5. Copy the following code:

```typescript
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type'
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { to, subject, html, templateType } = await req.json()
    const SENDGRID_API_KEY = Deno.env.get('SENDGRID_API_KEY')

    if (!SENDGRID_API_KEY) {
      throw new Error('SendGrid API key not configured')
    }

    const emailData = {
      personalizations: [{
        to: [{ email: to }],
        subject: subject
      }],
      from: { 
        email: 'noreply@yourdomain.com',
        name: 'AI Consulting Services'
      },
      content: [{
        type: 'text/html',
        value: html
      }]
    }

    const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${SENDGRID_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(emailData)
    })

    if (!response.ok) {
      const error = await response.text()
      throw new Error(`SendGrid error: ${error}`)
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        messageId: response.headers.get('x-message-id')
      }),
      { headers: { 'Content-Type': 'application/json', ...corsHeaders } }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
    )
  }
})
```

6. Deploy the function: `supabase functions deploy send-email`
7. Set the SendGrid API key: `supabase secrets set SENDGRID_API_KEY=your_api_key_here`

### Step 3: Update Frontend Configuration
1. Open `src/utils/sendgridService.ts`
2. Replace `https://your-project.supabase.co` with your actual Supabase project URL
3. The URL format is: `https://[PROJECT_REF].supabase.co`

### Step 4: Configure Sender Email
1. In SendGrid, verify your sender email address or domain
2. Update the `from` email in the edge function to match your verified sender
3. Recommended: Use a custom domain for better deliverability

### Step 5: Set Up Email Scheduling (Optional)
For automated processing of scheduled emails, set up a cron job:

1. Create a new edge function `process-scheduled-emails`:
```typescript
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

serve(async (req) => {
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
  )

  // Call the processScheduledEmails method
  // This would need to be adapted to work server-side
  
  return new Response(JSON.stringify({ success: true }), {
    headers: { 'Content-Type': 'application/json' }
  })
})
```

2. Set up a cron job in Supabase to call this function every hour

## Database Schema

The following tables are automatically created:

### email_logs
- `id`: UUID primary key
- `recipient_email`: Email address
- `recipient_name`: Recipient name
- `subject`: Email subject
- `template_type`: Type of email (immediate, day3, day7)
- `message_id`: SendGrid message ID
- `status`: Email status (pending, sent, failed)
- `sent_at`: Timestamp when sent
- `delivered_at`: Timestamp when delivered
- `opened_at`: Timestamp when opened
- `clicked_at`: Timestamp when clicked
- `error_message`: Error details if failed
- `metadata`: Additional data (JSONB)

### scheduled_emails
- `id`: UUID primary key
- `recipient_email`: Email address
- `recipient_name`: Recipient name
- `subject`: Email subject
- `template_type`: Type of email (day3, day7)
- `scheduled_for`: When to send
- `status`: Status (pending, sent, failed)
- `created_at`: When scheduled
- `sent_at`: When actually sent
- `data`: Email template data (JSONB)
- `submission_id`: Related submission ID

## Testing

1. Complete the questionnaire on the website
2. Check the admin dashboard > Email Tracking tab
3. Verify the immediate email was sent
4. Check that day 3 and day 7 emails are scheduled
5. Monitor delivery status in the admin panel

## Troubleshooting

### Emails not sending
- Verify SendGrid API key is set correctly
- Check edge function logs in Supabase dashboard
- Ensure sender email is verified in SendGrid
- Check CORS headers are properly configured

### Emails going to spam
- Set up SPF, DKIM, and DMARC records for your domain
- Use a verified custom domain instead of generic email
- Warm up your sending domain gradually
- Monitor sender reputation in SendGrid

### Scheduled emails not processing
- Implement the cron job for processing scheduled emails
- Or manually trigger processing from admin dashboard
- Check database for pending scheduled emails

## Production Checklist

- [ ] SendGrid API key configured in Supabase secrets
- [ ] Edge function deployed and tested
- [ ] Sender email/domain verified in SendGrid
- [ ] SPF/DKIM/DMARC records configured
- [ ] Email templates reviewed and approved
- [ ] Unsubscribe links functional
- [ ] Privacy policy and terms updated
- [ ] Email scheduling cron job configured
- [ ] Monitoring and alerts set up
- [ ] Rate limits configured appropriately

## Support

For issues or questions:
- SendGrid Documentation: https://docs.sendgrid.com
- Supabase Edge Functions: https://supabase.com/docs/guides/functions
- Project Repository: [Your repo URL]
