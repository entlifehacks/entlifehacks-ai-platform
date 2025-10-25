# 🚀 INTERACTIVE SETUP & TEST GUIDE
## Admin Email Notifications - Step by Step

---

## ⚡ QUICK START (5 Minutes)

### **STEP 1: Create the Edge Function** ⚙️

The edge function needs to be created in your Supabase project. Here's the code:

**File:** `supabase/functions/send-contact-notification/index.ts`

```typescript
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const SENDGRID_API_KEY = Deno.env.get('VITE_SENDGRID_API_KEY')
const ADMIN_EMAIL = Deno.env.get('ADMIN_EMAIL') || 'admin@example.com'

serve(async (req) => {
  try {
    const { name, email, phone, company, message, preferredContactMethod } = await req.json()

    const emailBody = {
      personalizations: [{
        to: [{ email: ADMIN_EMAIL }],
        subject: `🔔 New Contact Form Submission from ${name}`
      }],
      from: { email: 'noreply@yourdomain.com', name: 'Your Website' },
      content: [{
        type: 'text/html',
        value: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
          ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
          <p><strong>Preferred Contact:</strong> ${preferredContactMethod}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        `
      }]
    }

    const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${SENDGRID_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(emailBody)
    })

    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
})
```

**How to deploy:**
```bash
# In your terminal
supabase functions deploy send-contact-notification
```

---

### **STEP 2: Set Your Admin Email** 📧

1. Go to: https://supabase.com/dashboard
2. Select your project
3. Click **Settings** (left sidebar)
4. Click **Edge Functions**
5. Click **Secrets** tab
6. Click **Add Secret**
7. Enter:
   - **Name:** `ADMIN_EMAIL`
   - **Value:** `your-actual-email@gmail.com` ← YOUR EMAIL HERE
8. Click **Save**

---

### **STEP 3: Test It!** 🧪

**Option A: Test via Website**
1. Open your website
2. Scroll to Contact section
3. Fill out form:
   - Name: `Test User`
   - Email: `test@example.com`
   - Message: `Testing admin notifications`
4. Click **Send Message**
5. ✅ Check your email inbox!

**Option B: Test via Terminal**
```bash
curl -X POST \
  https://YOUR-PROJECT-REF.supabase.co/functions/v1/send-contact-notification \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "+1 555-0000",
    "company": "Test Co",
    "message": "This is a test",
    "preferredContactMethod": "email"
  }'
```

---

## ✅ VERIFICATION CHECKLIST

- [ ] Edge function deployed to Supabase
- [ ] ADMIN_EMAIL secret set with YOUR email
- [ ] VITE_SENDGRID_API_KEY secret exists
- [ ] SendGrid sender verified
- [ ] Test form submitted
- [ ] Email received in inbox
- [ ] Submission appears in /admin dashboard

---

## 🔥 TROUBLESHOOTING

### "Function not found" error
→ Deploy the edge function: `supabase functions deploy send-contact-notification`

### No email received
→ Check spam folder first
→ Verify ADMIN_EMAIL is YOUR email
→ Check SendGrid Activity Feed for delivery status

### "Unauthorized" error
→ Verify VITE_SENDGRID_API_KEY is set in Supabase secrets

### Email in spam
→ Set up SendGrid domain authentication
→ Add SPF/DKIM records to your domain

---

## 📊 WHERE TO CHECK RESULTS

**1. Your Email Inbox**
- Subject: "🔔 New Contact Form Submission from [Name]"

**2. Admin Dashboard**
- Go to: `/admin`
- Tab: "Contact Inquiries"

**3. Supabase Database**
- Dashboard → Table Editor → `contact_submissions`

**4. SendGrid Dashboard**
- Activity Feed shows all sent emails

**5. Edge Function Logs**
- Supabase → Edge Functions → send-contact-notification → Logs

---

## 🎯 NEXT: Test Right Now!

1. Deploy edge function (see STEP 1)
2. Set ADMIN_EMAIL (see STEP 2)
3. Submit test form (see STEP 3)
4. Check your email! 📬

**Need help?** Check the edge function logs for error messages.
