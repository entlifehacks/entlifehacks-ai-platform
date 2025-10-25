# Google Analytics 4 (GA4) Setup Guide

## Overview
This guide explains how to set up Google Analytics 4 tracking for the ECLH AI Consulting application, including event tracking for user behavior, conversions, and GDPR compliance.

## Prerequisites
- Google Analytics 4 account
- GA4 Measurement ID (format: G-XXXXXXXXXX)

## Setup Instructions

### 1. Create GA4 Property
1. Go to [Google Analytics](https://analytics.google.com/)
2. Click "Admin" → "Create Property"
3. Enter property name: "ECLH AI Consulting"
4. Configure timezone and currency
5. Click "Create" and accept terms
6. Copy your Measurement ID (G-XXXXXXXXXX)

### 2. Configure Environment Variables
Add to `.env.production`:
```bash
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

For local development, add to `.env.local`:
```bash
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

### 3. Tracked Events

#### Automatic Events
- **Page Views**: Tracked automatically on route changes
- **Session Start**: Tracked when user visits site

#### Custom Events Tracked
1. **CTA Clicks** (`cta_click`)
   - Hero "Start Free Assessment" button
   - Location and button name tracked

2. **Questionnaire Progress** (`questionnaire_progress`)
   - Each step completion
   - Progress percentage
   - Step number

3. **Questionnaire Completion** (`questionnaire_complete`)
   - Business type
   - Budget range
   - Marked as conversion event

4. **Calendly Booking** (`calendly_booking`)
   - Consultation scheduled
   - Event type tracked
   - Marked as conversion event

5. **Form Submissions** (`form_submit`)
   - Contact form submissions
   - Success/failure status

### 4. Set Up Conversions in GA4
1. Go to GA4 → Admin → Events
2. Mark these as conversions:
   - `questionnaire_complete`
   - `calendly_booking`
3. Click "Mark as conversion" for each

### 5. GDPR Compliance
The application includes:
- Cookie consent banner on first visit
- Consent stored in localStorage
- GA4 consent mode integration
- Analytics disabled until user accepts

Users can:
- Accept all cookies
- Decline tracking
- Consent choice persists across sessions

### 6. Testing GA4 Setup

#### Test in Development
```bash
npm run dev
```

Open browser console and check for:
- `gtag` function loaded
- No console errors
- Cookie consent banner appears

#### Test Events
1. Click "Start Free Assessment" → Check `cta_click` event
2. Complete questionnaire → Check `questionnaire_progress` and `questionnaire_complete`
3. Schedule consultation → Check `calendly_booking`

#### Verify in GA4 Realtime
1. Go to GA4 → Reports → Realtime
2. Perform actions on site
3. Events should appear within 30 seconds

### 7. Custom Reports

#### Recommended Custom Reports
1. **Conversion Funnel**
   - Page view → CTA click → Questionnaire start → Completion → Booking

2. **Questionnaire Drop-off**
   - Track which step users abandon
   - Optimize based on data

3. **Lead Quality**
   - Business type distribution
   - Budget ranges
   - ROI estimates

### 8. Privacy Policy Update
Ensure your privacy policy mentions:
- Google Analytics usage
- Cookie usage
- Data collection practices
- User rights (GDPR)

## Event Tracking Reference

### trackPageView(url, title)
```typescript
trackPageView('/questionnaire', 'AI Assessment');
```

### trackCTAClick(buttonName, location)
```typescript
trackCTAClick('Start Free Assessment', 'Hero Section');
```

### trackQuestionnaireStep(step, totalSteps)
```typescript
trackQuestionnaireStep(3, 6);
```

### trackQuestionnaireComplete(data)
```typescript
trackQuestionnaireComplete({
  businessType: 'Technology',
  budget: 50000
});
```

### trackCalendlyBooking(eventType)
```typescript
trackCalendlyBooking('AI Consultation');
```

## Troubleshooting

### Events Not Showing
- Check Measurement ID is correct
- Verify cookie consent accepted
- Check browser console for errors
- Ensure ad blockers disabled for testing

### Cookie Consent Not Working
- Clear localStorage
- Check browser console
- Verify CookieConsent component loaded

### Calendly Events Not Tracked
- Ensure Calendly embed loaded
- Check postMessage listener active
- Verify event name matches

## Best Practices
1. Test all events before production
2. Set up conversion goals
3. Create custom dashboards
4. Monitor realtime reports regularly
5. Review privacy compliance quarterly

## Support
For issues or questions:
- GA4 Documentation: https://support.google.com/analytics/
- ECLH Support: support@eclh.ai
