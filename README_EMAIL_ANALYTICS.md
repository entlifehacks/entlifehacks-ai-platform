# Email Analytics & A/B Testing Setup Guide

## Overview
This guide explains the comprehensive email analytics dashboard and A/B testing system for tracking email campaign performance.

## Features

### 1. Email Analytics Dashboard
- **Engagement Trends**: Line chart showing sent, opened, and clicked emails over time
- **Template Performance**: Bar chart comparing open rates and click rates by template type
- **Conversion Funnel**: Visual representation of email journey (sent → delivered → opened → clicked)
- **Email Distribution**: Pie chart showing email volume by template type
- **Date Range Filtering**: View data for last 7, 30, or 90 days

### 2. A/B Testing System
- Create A/B tests for different email subject lines
- Track performance metrics for each variant (sent, opened, clicked)
- Automatic winner calculation based on open rates
- Compare click-through rates between variants
- Test different subject lines for each template type

## Database Schema

### A/B Tests Table
```sql
CREATE TABLE ab_tests (
  id UUID PRIMARY KEY,
  name TEXT NOT NULL,
  template_type TEXT NOT NULL,
  variant_a_subject TEXT NOT NULL,
  variant_b_subject TEXT NOT NULL,
  variant_a_sent INTEGER DEFAULT 0,
  variant_b_sent INTEGER DEFAULT 0,
  variant_a_opened INTEGER DEFAULT 0,
  variant_b_opened INTEGER DEFAULT 0,
  variant_a_clicked INTEGER DEFAULT 0,
  variant_b_clicked INTEGER DEFAULT 0,
  status TEXT DEFAULT 'active',
  winner TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Email Logs Extensions
```sql
ALTER TABLE email_logs ADD COLUMN ab_test_id UUID REFERENCES ab_tests(id);
ALTER TABLE email_logs ADD COLUMN variant TEXT;
```

## Setup Instructions

### 1. Run Database Migration
```bash
# Connect to your Supabase project
psql -h db.YOUR_PROJECT_REF.supabase.co -U postgres

# Run the migration
\i supabase/migrations/003_ab_testing.sql
```

### 2. Access Analytics Dashboard
1. Log in to Admin Dashboard
2. Navigate to "Analytics" tab
3. View comprehensive email performance metrics
4. Use date range selector to filter data

### 3. Create A/B Tests
1. Go to "A/B Testing" tab in Admin Dashboard
2. Click "Create New Test"
3. Fill in test details:
   - Test name (e.g., "Day 3 Subject Line Test")
   - Template type (immediate, day3, or day7)
   - Variant A subject line
   - Variant B subject line
4. Click "Create Test"

### 4. Implement A/B Testing in Email Sending
Update your email sending logic to randomly assign variants:

```typescript
// In your email sending function
const activeTest = await supabase
  .from('ab_tests')
  .select('*')
  .eq('template_type', templateType)
  .eq('status', 'active')
  .single();

if (activeTest.data) {
  const variant = Math.random() < 0.5 ? 'A' : 'B';
  const subject = variant === 'A' 
    ? activeTest.data.variant_a_subject 
    : activeTest.data.variant_b_subject;
  
  // Send email with selected subject
  // Log variant in email_logs table
}
```

## Key Metrics Explained

### Open Rate
Percentage of delivered emails that were opened by recipients.
Formula: (Opened / Sent) × 100

### Click-Through Rate (CTR)
Percentage of sent emails where recipients clicked a link.
Formula: (Clicked / Sent) × 100

### Conversion Funnel
Shows drop-off at each stage:
1. Sent: Total emails sent
2. Delivered: Successfully delivered to inbox
3. Opened: Recipient opened the email
4. Clicked: Recipient clicked a link in the email

## Best Practices

### A/B Testing
1. **Test One Variable**: Only change subject line, not content
2. **Sufficient Sample Size**: Wait for at least 100 sends per variant
3. **Statistical Significance**: Run tests for at least 3-7 days
4. **Clear Hypothesis**: Know what you're testing and why
5. **Document Results**: Use insights to improve future campaigns

### Analytics Review
1. **Weekly Review**: Check analytics every Monday
2. **Template Comparison**: Identify best-performing templates
3. **Trend Analysis**: Look for patterns in engagement over time
4. **Segment Analysis**: Compare performance across different audiences
5. **Action Items**: Use data to optimize email strategy

## Troubleshooting

### No Data Showing
- Ensure emails are being sent and logged to email_logs table
- Check date range filter settings
- Verify Supabase connection is working

### A/B Test Not Tracking
- Confirm ab_test_id and variant are being logged in email_logs
- Check that test status is 'active'
- Verify email sending logic includes A/B test assignment

### Charts Not Rendering
- Ensure recharts library is installed: `npm install recharts`
- Check browser console for errors
- Verify data format matches chart requirements

## Advanced Features

### Custom Metrics
Add custom tracking by extending email_logs table:
```sql
ALTER TABLE email_logs ADD COLUMN conversion_at TIMESTAMP;
ALTER TABLE email_logs ADD COLUMN revenue DECIMAL;
```

### Automated Winner Selection
Create a scheduled function to automatically declare winners:
```typescript
// After 7 days and 200+ sends, pick winner
const winner = variantAOpenRate > variantBOpenRate ? 'A' : 'B';
await supabase
  .from('ab_tests')
  .update({ winner, status: 'completed' })
  .eq('id', testId);
```

## Support
For issues or questions, check the main README or contact support.
