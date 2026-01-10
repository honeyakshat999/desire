# Deployment Guide - Neon DB + Netlify

## Prerequisites
1. Create a free Neon account at https://neon.tech
2. Create a Netlify account at https://netlify.com

## Database Setup (Neon)

### 1. Create Neon Project
- Sign up/login to Neon
- Create a new project
- Note your connection details

### 2. Create Database Schema
Run this SQL in Neon SQL Editor:

```sql
CREATE TABLE enquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  mobile TEXT NOT NULL,
  email TEXT NOT NULL,
  project TEXT NOT NULL,
  message TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_enquiries_created_at ON enquiries(created_at DESC);
```

## Netlify Deployment

### Option 1: Deploy via Git (Recommended)

1. **Push to Git Repository**
   ```bash
   git add .
   git commit -m "Configure Neon DB and Netlify Functions"
   git push
   ```

2. **Connect to Netlify**
   - Go to https://app.netlify.com
   - Click "Add new site" → "Import an existing project"
   - Connect your Git repository
   - Netlify will auto-detect settings from `netlify.toml`

3. **Add Environment Variables**
   In Netlify Dashboard → Site settings → Environment variables:
   - `NEON_HOST` = your-neon-host.neon.tech
   - `NEON_DATABASE` = your-database-name
   - `NEON_USER` = your-username
   - `NEON_PASSWORD` = your-password

4. **Deploy**
   - Netlify will automatically build and deploy
   - Future pushes trigger automatic deployments

### Option 2: Deploy via Netlify CLI

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Login**
   ```bash
   netlify login
   ```

3. **Initialize Site**
   ```bash
   cd desire
   netlify init
   ```

4. **Add Environment Variables**
   ```bash
   netlify env:set NEON_HOST "your-neon-host.neon.tech"
   netlify env:set NEON_DATABASE "your-database-name"
   netlify env:set NEON_USER "your-username"
   netlify env:set NEON_PASSWORD "your-password"
   ```

5. **Deploy**
   ```bash
   netlify deploy --build --prod
   ```

## Local Development

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Create Local .env (for Netlify Dev)**
   Create `.env` file (NOT committed to git):
   ```
   NEON_HOST=your-neon-host.neon.tech
   NEON_DATABASE=your-database-name
   NEON_USER=your-username
   NEON_PASSWORD=your-password
   ```

3. **Run Locally with Netlify Dev**
   ```bash
   netlify dev
   ```
   This runs both your Vite dev server and Netlify Functions locally.

## Post-Deployment

### Verify Installation
1. Visit your site URL
2. Test the enquiry form
3. Check Neon dashboard to verify records are saved

### View Function Logs
- Netlify Dashboard → Functions → `submit-enquiry` → View logs

### Security Notes
- Never commit `.env` file to git
- All DB credentials are stored securely in Netlify environment variables
- Frontend has no direct database access (secure by design)

## Troubleshooting

### Function Not Found (404)
- Verify `netlify/functions/submit-enquiry.ts` exists
- Check `netlify.toml` has `[functions]` section
- Redeploy after adding the function

### Database Connection Error
- Verify environment variables are set correctly in Netlify
- Test connection in Neon SQL Editor
- Check Neon project is not paused (free tier auto-pauses after inactivity)

### Build Errors
- Run `npm install` to ensure all dependencies are installed
- Check `@neondatabase/serverless` is in `package.json`
- Verify Node.js version compatibility (18+)

## Migration from Supabase
- ✅ Removed Supabase client imports
- ✅ Replaced direct DB calls with Netlify Function
- ✅ Updated form submission handler
- ❌ Email notifications removed (add to function if needed)
- Note: Old `.env` contains Supabase keys—remove from git tracking if committed

## Cost
- **Neon**: Free tier includes 0.5GB storage, 512MB RAM
- **Netlify**: Free tier includes 100GB bandwidth, 300 build minutes/month, 125k function invocations
