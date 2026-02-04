# Admin Panel Setup Guide

This guide will help you set up the admin panel for the Desire Realty website.

## 1. Database Setup (Neon DB)

Run the following SQL in your Neon database console to create the required tables:

```sql
-- Blogs table for blog management
CREATE TABLE IF NOT EXISTS blogs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  cover_image TEXT,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for faster slug lookups
CREATE INDEX IF NOT EXISTS idx_blogs_slug ON blogs(slug);
CREATE INDEX IF NOT EXISTS idx_blogs_status ON blogs(status);
CREATE INDEX IF NOT EXISTS idx_blogs_published_at ON blogs(published_at DESC);

-- Page views table for analytics
CREATE TABLE IF NOT EXISTS page_views (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  page_path TEXT NOT NULL,
  referrer TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for analytics queries
CREATE INDEX IF NOT EXISTS idx_page_views_created_at ON page_views(created_at);
CREATE INDEX IF NOT EXISTS idx_page_views_page_path ON page_views(page_path);

-- Enquiry clicks table for tracking
CREATE TABLE IF NOT EXISTS enquiry_clicks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id TEXT,
  project_name TEXT,
  source TEXT DEFAULT 'unknown',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for analytics queries
CREATE INDEX IF NOT EXISTS idx_enquiry_clicks_created_at ON enquiry_clicks(created_at);
CREATE INDEX IF NOT EXISTS idx_enquiry_clicks_project_id ON enquiry_clicks(project_id);
```

## 2. Generate Admin Password Hash

Run this command to generate a password hash:

```bash
node scripts/generate-password-hash.js YOUR_PASSWORD
```

Example:
```bash
node scripts/generate-password-hash.js MySecureAdminPassword123
```

This will output a bcrypt hash that you'll use in the next step.

## 3. Environment Variables (Netlify)

Add these environment variables to your Netlify site:

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | Your Neon database connection string | `postgresql://user:pass@host/db` |
| `ADMIN_EMAIL` | Admin login email | `admin@desirerealty.com` |
| `ADMIN_PASSWORD_HASH` | Bcrypt hash from step 2 | `$2a$10$...` |
| `JWT_SECRET` | Random secret for JWT tokens (32+ chars) | `your-super-secret-jwt-key-here` |

### How to add in Netlify:
1. Go to your Netlify site dashboard
2. Navigate to **Site settings** → **Environment variables**
3. Add each variable above

## 4. Deploy

After setting up the database and environment variables, deploy your site:

```bash
npm run build
netlify deploy --prod
```

## 5. Access Admin Panel

Navigate to: `https://your-site.netlify.app/admin/login`

Login with:
- **Email**: The `ADMIN_EMAIL` you set
- **Password**: The password you used to generate the hash

## Features

### Dashboard (`/admin`)
- View total page views, enquiry clicks, and form submissions
- Quick access to create blogs and view analytics
- Recent enquiries list

### Blog Management (`/admin/blogs`)
- Create, edit, and delete blog posts
- Rich text editor with formatting options
- Publish/unpublish toggle
- Cover image support

### Analytics (`/admin/analytics`)
- Page views over time chart
- Enquiry clicks by project
- Top pages table
- Recent enquiries

### Public Blog (`/blogs`)
- Lists all published blogs
- Individual blog pages at `/blogs/:slug`
- Reading time calculation
- Call-to-action sections

## Troubleshooting

### Login not working
1. Check that `ADMIN_EMAIL` matches exactly what you're entering
2. Regenerate the password hash and update `ADMIN_PASSWORD_HASH`
3. Check Netlify function logs for errors

### Analytics not showing
1. Ensure the database tables are created
2. Check that `DATABASE_URL` is correct
3. Wait for some page visits to generate data

### Blog not saving
1. Check Netlify function logs for errors
2. Verify database connection
3. Ensure you're logged in (token not expired)
