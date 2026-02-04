-- =====================================================
-- Admin Panel Database Schema for Neon DB
-- Run this SQL in your Neon DB console
-- =====================================================

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

-- Media uploads table for tracking uploaded images
CREATE TABLE IF NOT EXISTS media_uploads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  url TEXT NOT NULL,
  public_id TEXT,
  filename TEXT,
  mime_type TEXT,
  size_bytes INTEGER,
  width INTEGER,
  height INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for media queries
CREATE INDEX IF NOT EXISTS idx_media_uploads_created_at ON media_uploads(created_at DESC);

-- =====================================================
-- Environment Variables Required in Netlify:
-- =====================================================
-- ADMIN_EMAIL: your-admin@email.com
-- ADMIN_PASSWORD_HASH: (generate using bcrypt - see below)
-- JWT_SECRET: (generate a random 32+ character string)
-- DATABASE_URL: (your Neon connection string)
-- CLOUDINARY_CLOUD_NAME: (your Cloudinary cloud name)
-- CLOUDINARY_API_KEY: (your Cloudinary API key)
-- CLOUDINARY_API_SECRET: (your Cloudinary API secret)
--
-- To generate password hash, run this in Node.js:
-- const bcrypt = require('bcryptjs');
-- bcrypt.hash('your-password', 10).then(console.log);
-- =====================================================
