# Admin Dashboard Access Guide

## How to Access Contact Form Submissions

Follow these simple steps to view all contact form submissions:

### Step 1: Navigate to Admin Dashboard
1. Open your website in a browser
2. Add `/admin` to the end of your website URL
   - Example: If your site is `https://yourwebsite.com`, go to `https://yourwebsite.com/admin`

### Step 2: Login to Admin Panel
1. You'll see an admin login screen
2. Enter your admin credentials:
   - **Username**: admin
   - **Password**: admin123
   - (Note: Change these credentials in production for security!)

### Step 3: View Contact Submissions
1. Once logged in, you'll see the Admin Dashboard
2. Click on the **"Contact"** tab at the top of the dashboard
3. You'll see a table with all contact form submissions including:
   - Name
   - Email
   - Phone Number (newly added!)
   - Company
   - Message
   - Preferred Contact Method
   - Submission Date

### Step 4: Manage Submissions
- View all submission details in the table
- Sort by date to see newest submissions first
- Export data if needed (feature may vary)

## Database Storage Location

Contact submissions are stored in **Supabase** database:
- **Table Name**: `contact_submissions`
- **Columns**: 
  - id (auto-generated)
  - name
  - email
  - phone (newly added)
  - company
  - message
  - preferred_contact_method
  - created_at (timestamp)

## Quick Access URL
Just remember: **YourWebsite.com/admin**

---

**Security Note**: Make sure to change the default admin password in production!
