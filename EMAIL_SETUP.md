# Email Notification Setup Guide

## Overview
The system sends email notifications when users submit enquiries using Resend (free tier: 100 emails/day).

## Setup Steps

### 1. Create Resend Account (Free)
1. Go to https://resend.com/signup
2. Sign up with your email
3. Verify your email address

### 2. Get API Key
1. Login to Resend dashboard
2. Go to **API Keys** section
3. Click **Create API Key**
4. Name it "Desire Realty Notifications"
5. Copy the API key (starts with `re_...`)

### 3. Add Environment Variables to Netlify

Go to Netlify Dashboard → Your Site → Site settings → Environment variables and add:

**Required:**
- `RESEND_API_KEY` = `key value` (from step 2)
- `NOTIFICATION_EMAIL` = `kyleinnovates@gmail.com` (where you want to receive notifications)

**Note:** After adding these variables, trigger a new deploy.

### 4. Domain Verification (Optional but Recommended)

For production use, verify your domain:

1. In Resend dashboard, go to **Domains**
2. Click **Add Domain**
3. Enter your domain (e.g., `desirerealty.com`)
4. Add the DNS records shown (TXT, MX, etc.)
5. Wait for verification (5-30 minutes)

After verification, update the function to use your domain:
```typescript
from: 'Desire Realty <notifications@desirerealty.com>'
```

### 5. Testing

**Local Testing:**
1. Add to `.env` file:
   ```
   RESEND_API_KEY=re_your_key
   NOTIFICATION_EMAIL=your-email@example.com
   ```
2. Run `netlify dev`
3. Submit a test enquiry
4. Check your email inbox (and spam folder)

**Production Testing:**
1. Deploy to Netlify with env vars set
2. Visit your live site
3. Submit a test enquiry
4. Check email within 1-2 minutes

## Email Format

You'll receive emails with:
- Subject: "New Enquiry: [Project Name]"
- Content:
  - Project interested in
  - Customer name
  - Mobile number
  - Email address
  - Optional message
  - Timestamp (IST)

## Troubleshooting

### Not receiving emails?
1. Check Netlify function logs (Functions → submit-enquiry → Logs)
2. Verify environment variables are set correctly
3. Check spam/junk folder
4. Verify NOTIFICATION_EMAIL is correct
5. Ensure RESEND_API_KEY is valid

### "Email error (non-critical)" in logs?
- Email sending failed but enquiry was saved
- Common causes:
  - Invalid API key
  - Rate limit exceeded (100/day on free tier)
  - Invalid email address
- Check Resend dashboard → Logs for details

### Free Tier Limits
- **100 emails per day**
- **3,000 emails per month**
- If exceeded, emails won't send but enquiries still save to database

## Cost & Scaling

**Free Tier (Current):**
- 100 emails/day
- 3,000 emails/month
- Perfect for small-medium sites

**Paid Plans (if needed):**
- $20/month: 50,000 emails
- $80/month: 200,000 emails
- Or use alternative free services (SendGrid, Brevo)

## Alternative Free Services

If you need more emails:
- **Brevo** (formerly Sendinblue): 300 emails/day
- **SendGrid**: 100 emails/day
- **Mailgun**: 5,000 emails for 3 months trial

## Current Configuration

- **From:** `onboarding@resend.dev` (Resend test domain)
- **To:** Value of `NOTIFICATION_EMAIL` env var
- **When:** After successful database save
- **Failure handling:** Non-blocking (enquiry saves even if email fails)

## Security Notes

- Never commit `.env` with real API keys
- API keys stored securely in Netlify
- Email sending happens server-side only
- No sensitive data exposed to frontend
