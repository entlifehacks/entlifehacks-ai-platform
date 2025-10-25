# Admin Email Notification Setup & Testing Guide

## ✅ Current Status
**Admin email notifications ARE set up!** The system is configured to send you an email whenever someone submits the contact form.

---

## 🔧 Configuration Required

### 1. Set Your Admin Email Address
You need to add your admin email to Supabase secrets:

**Steps:**
1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Go to **Settings** → **Edge Functions** → **Secrets**
4. Add a new secret:
   - **Name:** `ADMIN_EMAIL`
   - **Value:** `your-email@example.com` (replace with your actual email)
5. Click **Save**

**Current Default:** If not set, emails go to `admin@example.com`

### 2. Verify SendGrid API Key
The system uses the existing `VITE_SENDGRID_API_KEY` secret.

---

## 📧 How It Works

### Contact Form Flow:
1. User fills out contact form at `/#contact` section
2. Data is saved to `contact_submissions` table in Supabase
3. Edge function `send-contact-notification` triggers
4. SendGrid sends email to your admin email
5. You receive notification with all contact details

### Email Contains:
- ✉️ Contact's name
- 📧 Contact's email (clickable mailto link)
- 📱 Phone number (if provided)
- 🏢 Company name (if provided)
- 💬 Their message
- ⏰ Submission timestamp
- 🎯 Preferred contact method

---

## 🧪 Step-by-Step Testing

### Step 1: Set Admin Email
```
1. Add ADMIN_EMAIL secret in Supabase (see above)
2. Use YOUR real email address
```

### Step 2: Test the Contact Form
```
1. Open your website
2. Scroll to the Contact section (or go to /#contact)
3. Fill out the form with test data:
   - Name: Test User
   - Email: test@example.com
   - Phone: +1 555-0000
   - Company: Test Company
   - Message: This is a test submission
4. Click "Send Message"
```

### Step 3: Verify Success
```
✅ You should see: "Message sent! Thank you for reaching out..."
✅ Check your email inbox (the one you set as ADMIN_EMAIL)
✅ Look for: "🔔 New Contact Form Submission from Test User"
```

### Step 4: Check Admin Dashboard
```
1. Go to /admin
2. Click "Contact Inquiries" tab
3. You should see your test submission with all details
```

---

## 🔍 Troubleshooting

### Not Receiving Emails?

**Check 1: Spam Folder**
- Check your spam/junk folder
- Mark as "Not Spam" if found there

**Check 2: SendGrid Sender Verification**
- SendGrid requires sender email verification
- Go to SendGrid dashboard → Settings → Sender Authentication
- Verify your domain or single sender email

**Check 3: Edge Function Logs**
```
1. Go to Supabase Dashboard
2. Edge Functions → send-contact-notification
3. Click "Logs" tab
4. Look for errors or success messages
```

**Check 4: Admin Email Secret**
```
1. Verify ADMIN_EMAIL is set correctly
2. No typos in email address
3. Email address is valid and active
```

**Check 5: Database Entry**
```
1. Go to Supabase Dashboard → Table Editor
2. Open "contact_submissions" table
3. Verify your test submission is there
4. If yes, the form works - issue is with email sending
```

---

## 🎯 Quick Test Command

To test if the edge function works directly:

```bash
# Use this curl command (replace with your values)
curl -X POST \
  https://hsgqghfvrnzexwywkdtc.supabase.co/functions/v1/send-contact-notification \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "+1 555-0000",
    "company": "Test Co",
    "message": "Test message",
    "preferredContactMethod": "email"
  }'
```

---

## 📊 Monitoring

### View All Contact Submissions:
- **Admin Dashboard:** `/admin` → Contact Inquiries tab
- **Supabase:** Table Editor → `contact_submissions`

### Check Email Delivery:
- **SendGrid Dashboard:** Activity Feed
- **Supabase:** Edge Functions → Logs

---

## ✨ Next Steps

1. **Set ADMIN_EMAIL secret** (most important!)
2. **Test the contact form** with real data
3. **Check your email** for notification
4. **Verify in admin dashboard** that submission appears

Need help? Check the edge function logs in Supabase for detailed error messages.
