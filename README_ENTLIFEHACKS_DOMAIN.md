# Custom Domain Setup for entlifehacks.com

## Quick Setup Guide

### Step 1: Deploy Your Application

First, deploy to Vercel or Netlify:

**Vercel:**
```bash
npm install -g vercel
vercel --prod
```

**Netlify:**
```bash
npm install -g netlify-cli
netlify deploy --prod
```

You'll get a temporary URL like `your-app.vercel.app` or `your-app.netlify.app`

### Step 2: Add Custom Domain in Platform

**For Vercel:**
1. Go to your project dashboard
2. Navigate to **Settings** → **Domains**
3. Click **Add Domain**
4. Enter: `entlifehacks.com`
5. Vercel will provide DNS records

**For Netlify:**
1. Go to your site dashboard
2. Select **Domain Settings** → **Add custom domain**
3. Enter: `entlifehacks.com`
4. Click **Verify** and **Add domain**

### Step 3: Configure DNS Records

Go to your domain registrar (where you bought entlifehacks.com) and add these DNS records:

**For Vercel:**
```
Type: A
Name: @
Value: 76.76.21.21
TTL: 3600

Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600
```

**For Netlify:**
```
Type: A
Name: @
Value: 75.2.60.5
TTL: 3600

Type: CNAME
Name: www
Value: [your-site-name].netlify.app
TTL: 3600
```

### Step 4: SSL Certificate (Automatic)

Both Vercel and Netlify automatically provision SSL certificates via Let's Encrypt.
- Wait 5-10 minutes after DNS propagation
- Your site will automatically be served over HTTPS

### Step 5: Verify Setup

Check DNS propagation:
```bash
dig entlifehacks.com +short
nslookup entlifehacks.com
```

Test your site:
- https://entlifehacks.com
- https://www.entlifehacks.com
- https://entlifehacks.com/admin (Admin Dashboard)

## Environment Variables

Create `.env.production` with your domain:

```bash
VITE_APP_URL=https://entlifehacks.com
VITE_ADMIN_EMAIL=admin@entlifehacks.com
VITE_PLAUSIBLE_DOMAIN=entlifehacks.com
```

## Accessing Admin Panel

After deployment:
1. Go to https://entlifehacks.com/admin
2. Use credentials from your `.env.production`:
   - Email: Value of `VITE_ADMIN_EMAIL`
   - Password: Value of `VITE_ADMIN_PASSWORD`

## Troubleshooting

**DNS not propagating:**
- Wait 24-48 hours for full propagation
- Clear browser cache
- Use incognito mode

**SSL certificate issues:**
- Ensure DNS is properly configured
- Wait for automatic provisioning (5-10 min)
- Check platform dashboard for SSL status

**Admin page not loading:**
- Verify deployment completed successfully
- Check browser console for errors
- Ensure all environment variables are set

## Support

For detailed guides, see:
- README_CUSTOM_DOMAIN.md (full documentation)
- Vercel Docs: https://vercel.com/docs/concepts/projects/domains
- Netlify Docs: https://docs.netlify.com/domains-https/custom-domains/
