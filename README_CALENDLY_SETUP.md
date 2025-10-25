# Calendly Integration Setup Guide

## Overview
This application integrates Calendly to allow users to book 30-minute consultation calls directly from the results page. The integration includes automatic email prefilling and calendar invites.

## Setup Steps

### 1. Create a Calendly Account
1. Go to [calendly.com](https://calendly.com)
2. Sign up for a free account (or use an existing account)
3. Complete your profile setup

### 2. Create a 30-Minute Event Type
1. In your Calendly dashboard, click "Create" → "Event Type"
2. Choose "One-on-One"
3. Set the following:
   - **Event name**: "AI Consultation Call" (or similar)
   - **Duration**: 30 minutes
   - **Location**: Zoom, Google Meet, or Phone Call
4. Configure your availability hours
5. Add any custom questions you want to ask
6. Save the event type

### 3. Get Your Calendly URL
1. Click on your event type
2. Click "Copy Link" - it will look like: `https://calendly.com/your-username/30min`
3. Copy this URL

### 4. Update the Application
1. Open `src/components/CalendlyWidget.tsx`
2. Find line 16: `url: 'https://calendly.com/your-calendly-username/30min',`
3. Replace with your actual Calendly URL
4. Save the file

### 5. Test the Integration
1. Complete the questionnaire
2. On the results page, click "Book Free 30-Min Consultation"
3. The Calendly widget should open with your booking page
4. User's name and email should be pre-filled

## Features

✅ **Modal Interface**: Clean popup experience
✅ **Auto-Prefill**: User's name and email from questionnaire
✅ **Calendar Invites**: Automatic via Calendly
✅ **Email Reminders**: Automatic via Calendly
✅ **Timezone Detection**: Automatic via Calendly
✅ **Rescheduling**: Built into Calendly

## Customization Options

### Change Event Duration
Edit your Calendly event type settings to adjust duration (15, 30, 45, or 60 minutes)

### Add Custom Questions
In Calendly dashboard → Event Type → Edit → Add custom questions

### Branding
Upgrade to Calendly Pro to remove Calendly branding and add your logo

### Multiple Event Types
Create different event types for different consultation lengths or purposes

## Troubleshooting

**Widget not loading?**
- Check that Calendly scripts are loaded in `index.html`
- Verify your Calendly URL is correct
- Check browser console for errors

**Prefill not working?**
- Ensure user data is being passed correctly in `AppLayout.tsx`
- Check that email and name fields match Calendly's expected format

**Modal not closing?**
- Clear browser cache
- Check for JavaScript errors in console

## Advanced: Calendly Webhooks
For advanced tracking, you can set up Calendly webhooks to:
- Track when bookings are made
- Send custom notifications
- Update your database

See: https://developer.calendly.com/api-docs/docs/getting-started-with-webhooks

## Support
- Calendly Help: https://help.calendly.com
- Calendly API Docs: https://developer.calendly.com
