# Custom Domain Setup Guide

This guide covers setting up a custom domain (e.g., `eclh.ai` or `eclhconsulting.com`) for your AI consulting application.

## Table of Contents
1. [Domain Registration](#domain-registration)
2. [Vercel Deployment](#vercel-deployment)
3. [Netlify Deployment](#netlify-deployment)
4. [Custom Server Deployment](#custom-server-deployment)
5. [DNS Configuration](#dns-configuration)
6. [SSL Certificate Setup](#ssl-certificate-setup)
7. [Environment Variables](#environment-variables)
8. [Post-Deployment Checklist](#post-deployment-checklist)

---

## Domain Registration

### Purchase a Domain
1. **Recommended Registrars:**
   - [Namecheap](https://www.namecheap.com) - Affordable, good UI
   - [Google Domains](https://domains.google) - Simple, integrated with Google services
   - [Cloudflare Registrar](https://www.cloudflare.com/products/registrar/) - At-cost pricing, free DNS
   - [GoDaddy](https://www.godaddy.com) - Popular, extensive support

2. **Domain Suggestions:**
   - `eclh.ai` - Short, memorable, tech-focused
   - `eclhconsulting.com` - Professional, descriptive
   - `eclhai.com` - Alternative if .ai is unavailable
   - `geteclh.com` - Modern SaaS naming convention

---

## Vercel Deployment

### Step 1: Deploy to Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy your application
vercel

# Deploy to production
vercel --prod
```

### Step 2: Add Custom Domain

1. Go to your project on [Vercel Dashboard](https://vercel.com/dashboard)
2. Navigate to **Settings** → **Domains**
3. Click **Add Domain**
4. Enter your domain: `eclh.ai` or `eclhconsulting.com`
5. Vercel will provide DNS records to configure

### Step 3: Configure DNS (Vercel)

**For Root Domain (eclh.ai):**
```
Type: A
Name: @
Value: 76.76.21.21
TTL: 3600
```

**For www Subdomain:**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600
```

### Step 4: SSL Certificate (Automatic)
- Vercel automatically provisions SSL certificates via Let's Encrypt
- No manual configuration needed
- Certificate auto-renews every 90 days

---

## Netlify Deployment

### Step 1: Deploy to Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Initialize and deploy
netlify init

# Build and deploy
npm run build
netlify deploy --prod
```

### Step 2: Add Custom Domain

1. Go to [Netlify Dashboard](https://app.netlify.com)
2. Select your site
3. Go to **Domain Settings** → **Add custom domain**
4. Enter your domain: `eclh.ai`
5. Click **Verify** and **Add domain**

### Step 3: Configure DNS (Netlify)

**Option A: Use Netlify DNS (Recommended)**
1. Click **Set up Netlify DNS**
2. Update nameservers at your registrar:
   ```
   dns1.p01.nsone.net
   dns2.p01.nsone.net
   dns3.p01.nsone.net
   dns4.p01.nsone.net
   ```

**Option B: External DNS**
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

### Step 4: Enable HTTPS
1. Go to **Domain Settings** → **HTTPS**
2. Click **Verify DNS configuration**
3. Click **Provision certificate** (automatic via Let's Encrypt)

---

## Custom Server Deployment

### Prerequisites
- Ubuntu 20.04+ server
- Node.js 18+ installed
- Nginx installed
- Domain pointing to server IP

### Step 1: Build Application

```bash
# On your local machine
npm run build

# Upload to server
scp -r dist/* user@your-server:/var/www/eclh.ai/
```

### Step 2: Configure Nginx

```bash
# Create Nginx configuration
sudo nano /etc/nginx/sites-available/eclh.ai
```

```nginx
server {
    listen 80;
    server_name eclh.ai www.eclh.ai;
    root /var/www/eclh.ai;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
}
```

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/eclh.ai /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### Step 3: SSL with Let's Encrypt

```bash
# Install Certbot
sudo apt update
sudo apt install certbot python3-certbot-nginx

# Obtain SSL certificate
sudo certbot --nginx -d eclh.ai -d www.eclh.ai

# Test auto-renewal
sudo certbot renew --dry-run
```

### Step 4: Configure DNS

Point your domain to your server's IP:

```
Type: A
Name: @
Value: [Your Server IP]
TTL: 3600

Type: A
Name: www
Value: [Your Server IP]
TTL: 3600
```

---

## DNS Configuration

### Cloudflare DNS (Recommended for Performance)

1. **Add Site to Cloudflare:**
   - Sign up at [Cloudflare](https://dash.cloudflare.com)
   - Click **Add a Site**
   - Enter your domain: `eclh.ai`
   - Select Free plan

2. **Update Nameservers:**
   ```
   ns1.cloudflare.com
   ns2.cloudflare.com
   ```

3. **Add DNS Records:**
   ```
   Type: A
   Name: @
   Value: [Your hosting provider's IP or use CNAME for Vercel/Netlify]
   Proxy: Enabled (orange cloud)
   
   Type: CNAME
   Name: www
   Value: eclh.ai
   Proxy: Enabled
   ```

4. **Enable Performance Features:**
   - Go to **Speed** → **Optimization**
   - Enable Auto Minify (JS, CSS, HTML)
   - Enable Brotli compression
   - Enable HTTP/3 (QUIC)

5. **Configure SSL:**
   - Go to **SSL/TLS** → **Overview**
   - Set to **Full (strict)**
   - Enable **Always Use HTTPS**
   - Enable **Automatic HTTPS Rewrites**

### DNS Propagation
- DNS changes can take 24-48 hours to propagate globally
- Check propagation status: [whatsmydns.net](https://www.whatsmydns.net)
- Use `dig` or `nslookup` to verify:
  ```bash
  dig eclh.ai
  nslookup eclh.ai
  ```

---

## SSL Certificate Setup

### Automatic SSL (Vercel/Netlify)
✅ **No action required** - SSL certificates are automatically provisioned and renewed

### Manual SSL (Custom Server)

**Option 1: Let's Encrypt (Free)**
```bash
sudo certbot certonly --nginx -d eclh.ai -d www.eclh.ai
```

**Option 2: Cloudflare Origin Certificate**
1. Go to Cloudflare **SSL/TLS** → **Origin Server**
2. Click **Create Certificate**
3. Download certificate and private key
4. Install on your server:
   ```bash
   sudo nano /etc/nginx/ssl/eclh.ai.crt
   sudo nano /etc/nginx/ssl/eclh.ai.key
   ```

5. Update Nginx config:
   ```nginx
   ssl_certificate /etc/nginx/ssl/eclh.ai.crt;
   ssl_certificate_key /etc/nginx/ssl/eclh.ai.key;
   ```

---

## Environment Variables

### Create Production Environment File

```bash
# .env.production
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_APP_URL=https://eclh.ai
VITE_SENDGRID_API_KEY=your-sendgrid-key
VITE_ADMIN_EMAIL=admin@eclh.ai
VITE_CALENDLY_URL=https://calendly.com/eclh-consulting
```

### Platform-Specific Configuration

**Vercel:**
1. Go to **Settings** → **Environment Variables**
2. Add each variable with **Production** scope
3. Redeploy to apply changes

**Netlify:**
1. Go to **Site settings** → **Environment variables**
2. Add each key-value pair
3. Redeploy to apply changes

**Custom Server:**
```bash
# Create .env file on server
nano /var/www/eclh.ai/.env.production

# Set proper permissions
chmod 600 /var/www/eclh.ai/.env.production
```

### Domain-Specific Settings

Update these files with your custom domain:

**1. Update `package.json`:**
```json
{
  "homepage": "https://eclh.ai"
}
```

**2. Update `public/robots.txt`:**
```
User-agent: *
Allow: /

Sitemap: https://eclh.ai/sitemap.xml
```

**3. Create `public/sitemap.xml`:**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://eclh.ai/</loc>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://eclh.ai/admin</loc>
    <priority>0.8</priority>
  </url>
</urlset>
```

---

## Post-Deployment Checklist

### Functionality Testing
- [ ] Homepage loads correctly
- [ ] All navigation links work
- [ ] Questionnaire submission works
- [ ] Email notifications are sent
- [ ] Admin dashboard accessible
- [ ] Calendly widget loads
- [ ] Forms validate properly
- [ ] Mobile responsive design works

### Performance Testing
- [ ] Run [Google PageSpeed Insights](https://pagespeed.web.dev/)
- [ ] Run [GTmetrix](https://gtmetrix.com/)
- [ ] Check [WebPageTest](https://www.webpagetest.org/)
- [ ] Target: 90+ PageSpeed score

### SEO Configuration
- [ ] Add Google Analytics
- [ ] Submit sitemap to Google Search Console
- [ ] Verify domain ownership
- [ ] Set up Google Business Profile
- [ ] Configure social media meta tags

### Security Checks
- [ ] HTTPS enabled and working
- [ ] SSL certificate valid (A+ rating on [SSL Labs](https://www.ssllabs.com/ssltest/))
- [ ] Security headers configured
- [ ] CORS properly configured
- [ ] Environment variables secured

### Monitoring Setup
- [ ] Set up uptime monitoring ([UptimeRobot](https://uptimerobot.com/))
- [ ] Configure error tracking ([Sentry](https://sentry.io/))
- [ ] Set up analytics ([Plausible](https://plausible.io/) or Google Analytics)
- [ ] Enable Vercel/Netlify analytics

---

## Troubleshooting

### Domain Not Resolving
```bash
# Check DNS propagation
dig eclh.ai +short

# Flush local DNS cache
# macOS:
sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder

# Windows:
ipconfig /flushdns

# Linux:
sudo systemd-resolve --flush-caches
```

### SSL Certificate Issues
- Verify DNS records are correct
- Wait 24 hours for DNS propagation
- Check Cloudflare SSL mode (should be Full or Full Strict)
- Verify certificate expiration date

### 404 Errors on Refresh
Add rewrite rules for single-page application:

**Vercel** - Create `vercel.json`:
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

**Netlify** - Create `public/_redirects`:
```
/*    /index.html   200
```

---

## Support Resources

- **Vercel Docs:** https://vercel.com/docs
- **Netlify Docs:** https://docs.netlify.com
- **Cloudflare Docs:** https://developers.cloudflare.com
- **Let's Encrypt:** https://letsencrypt.org/docs/
- **DNS Checker:** https://dnschecker.org

---

## Estimated Timeline

| Task | Duration |
|------|----------|
| Domain purchase | 10 minutes |
| Deploy to hosting | 15 minutes |
| DNS configuration | 5 minutes |
| DNS propagation | 1-24 hours |
| SSL certificate | Automatic (5-10 min) |
| Testing & verification | 30 minutes |

**Total:** 1-2 hours (excluding DNS propagation wait time)

---

For additional support, contact your hosting provider or consult their documentation.
