// Prebuild step: snapshot published blogs from Neon so react-snap can prerender
// each /blogs/<slug> page into static HTML (SSG) and the SPA can hydrate from a
// static JSON file when the Netlify function is not reachable (e.g. at snap time).
//
// Outputs:
//   public/blog-data/index.json      -> list of published blogs (BlogsList fallback)
//   public/blog-data/<slug>.json     -> { blog } per post (BlogDetail fallback)
//   reactsnap-routes.json            -> include[] for scripts/snap.mjs
//   public/sitemap.xml               -> regenerated with blog URLs appended
//
// Requires DATABASE_URL. Fails loudly if the DB is unreachable so a broken build
// never silently ships zero blog routes.

import { neon } from "@neondatabase/serverless";
import { readFileSync, writeFileSync, mkdirSync, rmSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const BLOG_DATA_DIR = path.join(ROOT, "public", "blog-data");
const ROUTES_FILE = path.join(ROOT, "reactsnap-routes.json");
const SITEMAP_FILE = path.join(ROOT, "public", "sitemap.xml");

const SITE = "https://desirerealty.in";

// Static + project routes that must always be prerendered (mirrors the prior
// package.json reactSnap.include list).
const BASE_ROUTES = [
  "/",
  "/about",
  "/blogs",
  "/privacy",
  "/terms",
  "/project/nilgiri-project",
  "/project/brajeshwar-avenue",
  "/project/nri-avenue",
  "/project/smart-city",
  "/project/ganesh-vihar",
  "/project/brajeshwar-crown",
];

// Static sitemap entries (non-blog), kept in sync with the routes above.
const STATIC_SITEMAP = [
  { loc: "/", changefreq: "weekly", priority: "1.0" },
  { loc: "/about/", changefreq: "monthly", priority: "0.8" },
  { loc: "/blogs/", changefreq: "weekly", priority: "0.7" },
  { loc: "/project/nilgiri-project/", changefreq: "monthly", priority: "0.9" },
  { loc: "/project/brajeshwar-avenue/", changefreq: "monthly", priority: "0.9" },
  { loc: "/project/nri-avenue/", changefreq: "monthly", priority: "0.9" },
  { loc: "/project/smart-city/", changefreq: "monthly", priority: "0.9" },
  { loc: "/project/ganesh-vihar/", changefreq: "monthly", priority: "0.9" },
  { loc: "/project/brajeshwar-crown/", changefreq: "monthly", priority: "0.9" },
  { loc: "/privacy/", changefreq: "yearly", priority: "0.3" },
  { loc: "/terms/", changefreq: "yearly", priority: "0.3" },
];

// Minimal .env loader so local builds work without dotenv. Netlify injects
// env vars directly, so this is a no-op in CI.
function loadEnvFile() {
  if (process.env.DATABASE_URL) return;
  const envPath = path.join(ROOT, ".env");
  if (!existsSync(envPath)) return;
  for (const line of readFileSync(envPath, "utf8").split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/i);
    if (!m) continue;
    const key = m[1];
    let val = m[2].trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    if (!(key in process.env)) process.env[key] = val;
  }
}

function isoDate(d) {
  return new Date(d || Date.now()).toISOString().slice(0, 10);
}

function buildSitemap(blogs) {
  const today = isoDate(Date.now());
  const entries = [
    ...STATIC_SITEMAP.map((e) => ({ ...e, lastmod: today })),
    ...blogs.map((b) => ({
      loc: `/blogs/${b.slug}/`,
      changefreq: "monthly",
      priority: "0.6",
      lastmod: isoDate(b.published_at || b.updated_at || b.created_at),
    })),
  ];
  const urls = entries
    .map(
      (e) =>
        `  <url>\n    <loc>${SITE}${e.loc}</loc>\n    <lastmod>${e.lastmod}</lastmod>\n    <changefreq>${e.changefreq}</changefreq>\n    <priority>${e.priority}</priority>\n  </url>`
    )
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

async function main() {
  loadEnvFile();

  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) {
    throw new Error("DATABASE_URL not set — cannot snapshot blogs for SSG.");
  }

  const sql = neon(dbUrl);

  // Full rows so BlogDetail has everything it needs without a live request.
  const blogs = await sql`
    SELECT id, title, slug, content, excerpt, cover_image, published_at, created_at, updated_at
    FROM blogs
    WHERE status = 'published'
    ORDER BY published_at DESC
  `;

  // Reset the snapshot dir so deleted/unpublished posts don't linger.
  rmSync(BLOG_DATA_DIR, { recursive: true, force: true });
  mkdirSync(BLOG_DATA_DIR, { recursive: true });

  // List snapshot (shape mirrors blogs-api list endpoint: { blogs }).
  const listRows = blogs.map(({ content, ...rest }) => rest);
  writeFileSync(path.join(BLOG_DATA_DIR, "index.json"), JSON.stringify({ blogs: listRows }));

  // Per-slug snapshot (shape mirrors blogs-api detail endpoint: { blog }).
  for (const blog of blogs) {
    writeFileSync(path.join(BLOG_DATA_DIR, `${blog.slug}.json`), JSON.stringify({ blog }));
  }

  // Routes for react-snap.
  const routes = [...BASE_ROUTES, ...blogs.map((b) => `/blogs/${b.slug}`)];
  writeFileSync(ROUTES_FILE, JSON.stringify(routes, null, 2));

  // Sitemap including blog URLs.
  writeFileSync(SITEMAP_FILE, buildSitemap(blogs));

  console.log(`[generate-blog-routes] ${blogs.length} published blogs snapshotted.`);
  console.log(`[generate-blog-routes] ${routes.length} routes -> reactsnap-routes.json`);
  console.log(`[generate-blog-routes] sitemap.xml regenerated.`);
}

main().catch((err) => {
  console.error("[generate-blog-routes] FAILED:", err.message);
  process.exit(1);
});
