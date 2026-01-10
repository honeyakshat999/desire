# Testing Database Connection

## Quick Diagnostic Checklist

### 1. Check if you're testing locally or on Netlify
- **Local**: You need to run `netlify dev` (not `npm run dev`)
- **Production**: Check Netlify function logs

### 2. Verify Environment Variables (Most Common Issue)

**For Netlify Deployed Site:**
1. Go to Netlify Dashboard → Your Site → Site settings → Environment variables
2. Verify these 4 variables are set:
   - `NEON_HOST` (e.g., ep-xxx-xxx.us-east-2.aws.neon.tech)
   - `NEON_DATABASE` (e.g., neondb or your DB name)
   - `NEON_USER` (your Neon username)
   - `NEON_PASSWORD` (your Neon password)
3. After adding/updating env vars, **trigger a redeploy** (Deploys → Trigger deploy)

**For Local Testing:**
1. Create `.env` file in the `desire/` folder (NOT committed to git):
   ```
   NEON_HOST=your-host.neon.tech
   NEON_DATABASE=your-database
   NEON_USER=your-username
   NEON_PASSWORD=your-password
   ```
2. Run `netlify dev` (not `npm run dev`)
3. Test form at `http://localhost:8888`

### 3. View Error Details

**In Browser Console (F12):**
- Open DevTools → Console tab
- Submit the form
- Look for error messages with details

**In Netlify Function Logs (Production):**
1. Netlify Dashboard → Functions → `submit-enquiry`
2. Click on recent invocations
3. Check logs for:
   - "Missing Neon environment variables" → Env vars not set
   - "Database connected successfully" → Connection works
   - Connection errors → Check Neon host/credentials

### 4. Test Neon Database Directly

**Verify table exists:**
1. Go to Neon Console → SQL Editor
2. Run:
   ```sql
   SELECT * FROM enquiries LIMIT 1;
   ```
3. If error "relation does not exist":
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
   ```

**Test a manual insert:**
```sql
INSERT INTO enquiries (name, mobile, email, project, message)
VALUES ('Test User', '1234567890', 'test@example.com', 'general', 'Test message');

SELECT * FROM enquiries ORDER BY created_at DESC LIMIT 5;
```

If this works, your database is fine; the issue is with the function connection.

### 5. Common Errors & Solutions

| Error Message | Solution |
|--------------|----------|
| "Database configuration missing" | Add env variables in Netlify, redeploy |
| "Function not found (404)" | Verify `netlify/functions/submit-enquiry.ts` exists; redeploy |
| "no pg_hba.conf entry" | Wrong username/password or host |
| "relation 'enquiries' does not exist" | Run CREATE TABLE query in Neon |
| "Cannot find module @neondatabase/serverless" | Run `npm install`, commit, push |
| Function works locally but not on Netlify | Env vars not set on Netlify |

### 6. Manual Function Test (Production)

After deploying, test the function directly:

```bash
curl -X POST https://your-site.netlify.app/.netlify/functions/submit-enquiry \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","mobile":"1234567890","email":"test@test.com","project":"general"}'
```

Expected response:
- Success: `{"success":true,"message":"Enquiry submitted successfully"}`
- Error: JSON with `error` and `details` fields

### 7. Step-by-Step Local Test

```bash
# 1. Install dependencies (if not done)
cd desire
npm install

# 2. Create .env file with your Neon credentials
# (see format above)

# 3. Run with Netlify Dev
netlify dev

# 4. Open browser to http://localhost:8888
# 5. Submit form and check console
```

### 8. Re-deployment Steps (if you just set env vars)

```bash
# Option A: Via Git (if connected)
git add .
git commit -m "Add error logging"
git push
# Netlify auto-deploys

# Option B: Via Netlify Dashboard
# Deploys → Trigger deploy → Deploy site

# Option C: Via CLI
netlify deploy --build --prod
```

---

## Quick Fix Checklist

✅ Environment variables set in Netlify  
✅ Triggered redeploy after setting env vars  
✅ `@neondatabase/serverless` in package.json  
✅ Table `enquiries` exists in Neon  
✅ Neon project is active (not paused)  
✅ Using `netlify dev` for local testing (not `npm run dev`)  

If all checked and still failing, share:
1. Browser console error message
2. Netlify function log output
