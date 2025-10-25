// Documentation content in simple English for non-technical users
export const documentationContent: Record<string, string> = {
  'ADMIN_ACCESS_GUIDE.md': `# Admin Dashboard - Simple Guide

## How to Access Your Admin Panel

### Step 1: Go to the Admin Page
1. Open your website
2. Add /admin to the end of your website address
   - Example: yourwebsite.com/admin

### Step 2: Login
- Username: admin
- Password: admin123
- (Important: Change this password for security!)

### Step 3: View Your Data
Once logged in, you'll see tabs at the top:
- **Contact** - See messages from your contact form
- **Questionnaire** - See completed questionnaires
- **Analytics** - View website statistics
- **Email Settings** - Manage email templates
- **Documentation** - Read guides (you're here!)

## What Each Tab Does

### Contact Tab
Shows all messages from your contact form including:
- Person's name, Email address, Phone number
- Company name, Their message, When they sent it

### Questionnaire Tab
Shows completed business questionnaires with:
- Business type, Challenges they face
- Budget information, Contact details

### Analytics Tab
Shows website performance:
- Number of visitors, Form submissions, Email open rates

### Email Settings Tab
Manage automated emails:
- Edit email templates, Schedule follow-up emails, View email statistics

## Quick Tips
- Check the admin panel daily for new submissions
- Download data regularly for backup
- Keep your login password secure`,

  'COMPLETE_PROCESS_FLOW.md': `# What Happens When Someone Fills Out a Form

## Contact Form Process

### Step 1: Customer Fills Contact Form
They enter: Name, Email, Phone, Company, Message, How they want to be contacted

### Step 2: Form is Submitted
- Information saves to database
- Customer sees "Thank you" message

### Step 3: Emails Are Sent
Two emails go out automatically:
1. **To Customer**: Thank you email confirming we received their message
2. **To You (Admin)**: Notification with their details

### Step 4: You Can View in Admin Panel
- Go to admin/Contact tab
- See all details
- Follow up with customer

## Questionnaire Process

### Step 1: Customer Starts Questionnaire
They answer 6 questions about their business

### Step 2: Questionnaire Submitted
- Answers save to database
- Results page shows recommendations
- PDF report generated

### Step 3: Automated Emails
1. **Immediate**: Welcome email with PDF report
2. **Day 3**: Follow-up email
3. **Day 7**: Case study email
4. **Day 14**: Final check-in email

### Step 4: Admin Can Track Everything
- View all submissions, See email status, Download reports`,

  'README_EMAIL_SETUP.md': `# Email Setup - Simple Instructions

## What You Need
- SendGrid account (free tier works)
- Your email address

## Step-by-Step Setup

### Part 1: Get SendGrid API Key
1. Go to sendgrid.com
2. Sign up for free account
3. Click "Settings" then "API Keys"
4. Click "Create API Key"
5. Give it a name like "MyWebsite"
6. Choose "Full Access"
7. Click "Create & View"
8. **Copy the key** (you'll need it next)

### Part 2: Add Key to Your Website
1. Find your website's environment settings
2. Add this variable:
   - Name: VITE_SENDGRID_API_KEY
   - Value: (paste your API key)
3. Save settings and restart your website

### Part 3: Verify Your Email
1. In SendGrid, go to "Settings" > "Sender Authentication"
2. Click "Verify a Single Sender"
3. Enter your email address
4. Check your email for verification link
5. Click the link to verify

### Part 4: Test It
1. Go to your website
2. Fill out contact form
3. Submit it
4. Check if you received email

## Troubleshooting
- **No email received?** Check spam folder
- **Error message?** Check API key is correct
- **Still not working?** Make sure email is verified in SendGrid`,

  'README_CALENDLY_SETUP.md': `# Calendly Setup - Simple Instructions

## What is Calendly?
Calendly is a scheduling tool that lets customers book meetings with you automatically. No more back-and-forth emails to find a time!

## Step-by-Step Setup

### Part 1: Create Your Calendly Account
1. Go to calendly.com
2. Click "Sign Up" (free account available)
3. Enter your email and create password
4. Verify your email address

### Part 2: Set Your Availability
1. Log into Calendly
2. Click "Availability" in the menu
3. Set your working hours:
   - Choose days you're available
   - Set start and end times
   - Add breaks if needed
4. Click "Save"

### Part 3: Create an Event Type
1. Click "Event Types" in menu
2. Click "Create New Event Type"
3. Choose event type:
   - **One-on-One**: For individual meetings
   - **Group**: For multiple people
   - **Collective**: For team meetings
4. Set meeting details:
   - Name: "AI Consultation" or "Discovery Call"
   - Duration: 30 minutes, 60 minutes, etc.
   - Location: Phone, Video call, or In-person
5. Click "Save & Close"

### Part 4: Get Your Calendly Link
1. Go to your Event Types page
2. Find your event
3. Click "Copy Link"
4. Your link looks like: calendly.com/yourname/meeting
5. **Save this link** - you'll need it next

### Part 5: Add Calendly to Your Website
1. Go to your website's admin panel
2. Find the section where Calendly appears
3. Replace the example link with YOUR Calendly link
4. Save changes
5. Test it by clicking the "Schedule a Call" button

## Customize Your Booking Page

### Add Your Branding
1. In Calendly, go to "Account" > "Branding"
2. Upload your logo
3. Choose your brand colors
4. Add a welcome message

### Set Up Notifications
1. Go to "Account" > "Notifications"
2. Enable email notifications for:
   - New bookings
   - Cancellations
   - Reminders
3. Add your email address

### Add Questions for Customers
1. Edit your Event Type
2. Scroll to "Invitee Questions"
3. Add custom questions like:
   - "What's your biggest business challenge?"
   - "What's your budget range?"
   - "How did you hear about us?"
4. Save changes

## Connect Your Calendar

### Google Calendar
1. In Calendly, go to "Integrations"
2. Click "Google Calendar"
3. Click "Connect"
4. Sign in to Google
5. Allow Calendly access

### Outlook Calendar
1. Go to "Integrations"
2. Click "Office 365/Outlook"
3. Click "Connect"
4. Sign in to Microsoft
5. Allow Calendly access

## Set Up Confirmation Emails

### Customize Confirmation Email
1. Edit your Event Type
2. Scroll to "Notifications & Cancellation Policy"
3. Click "Edit" on confirmation email
4. Customize the message
5. Add any important information
6. Save changes

### Add Calendar Invites
1. In Event Type settings
2. Enable "Calendar Invitations"
3. Choose to send invites to both parties
4. Save settings

## Advanced Features

### Set Buffer Times
1. Edit Event Type
2. Go to "Scheduling Settings"
3. Add buffer time before/after meetings
4. This prevents back-to-back bookings

### Limit Bookings
1. In Event Type settings
2. Set "Date Range":
   - How far in advance can people book?
   - Example: 60 days into the future
3. Set minimum notice:
   - Example: 24 hours before meeting

### Add Team Members (Paid Plans)
1. Go to "Account" > "Users"
2. Click "Add User"
3. Enter team member's email
4. Assign them to event types
5. They can now take bookings too

## Troubleshooting

### Calendly Not Showing on Website?
- Check that you copied the correct link
- Make sure link starts with https://
- Clear your browser cache
- Try a different browser

### Not Receiving Booking Notifications?
- Check spam/junk folder
- Verify email in Calendly settings
- Check notification settings are ON

### Calendar Not Syncing?
- Disconnect and reconnect calendar
- Check calendar permissions
- Make sure you're using the right calendar

### Double Bookings Happening?
- Check all calendars are connected
- Enable "Check for conflicts"
- Set proper buffer times

## Best Practices

### For Better Bookings
- Use clear event names
- Write helpful descriptions
- Set realistic meeting durations
- Add preparation instructions

### Professional Touch
- Upload a professional photo
- Write a friendly welcome message
- Send reminder emails (24 hours before)
- Follow up after meetings

### Time Management
- Block personal time in your calendar
- Set buffer times between meetings
- Limit daily bookings if needed
- Use different event types for different services

## Integration with Your Website

### Where Calendly Appears
Your website shows Calendly in these places:
1. **Hero Section**: "Schedule a Call" button
2. **Contact Section**: Embedded calendar widget
3. **Results Page**: After questionnaire completion

### Update Your Calendly Link
1. Copy your Calendly link
2. Go to website code
3. Find CalendlyWidget component
4. Replace the URL with your link
5. Save and test

## Pricing Plans

### Free Plan Includes:
- Unlimited meetings
- 1 event type
- Basic integrations
- Email notifications

### Paid Plans Add:
- Multiple event types
- Team scheduling
- Custom branding
- SMS reminders
- Payment collection
- Advanced integrations

## Getting Help
- Calendly Help Center: help.calendly.com
- Video tutorials: calendly.com/resources
- Contact support: support@calendly.com

## Quick Checklist
✓ Account created and verified
✓ Availability set
✓ Event type created
✓ Calendar connected
✓ Link copied and added to website
✓ Notifications enabled
✓ Confirmation emails customized
✓ Test booking completed

Your Calendly is now ready to accept bookings!`,
};

