import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-in-production";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL!;

// CORS headers
const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  "Access-Control-Allow-Methods": "POST, GET, PUT, DELETE, OPTIONS",
  "Content-Type": "application/json",
};

// Verify JWT token
const verifyToken = (token: string): { email: string } | null => {
  try {
    const jwt = require("jsonwebtoken");
    const decoded = jwt.verify(token, JWT_SECRET) as { email: string };
    return decoded;
  } catch {
    return null;
  }
};

// Middleware to check auth
const isAuthenticated = (event: HandlerEvent): boolean => {
  const authHeader = event.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return false;
  }
  const token = authHeader.split(" ")[1];
  const decoded = verifyToken(token);
  return decoded !== null && decoded.email === ADMIN_EMAIL;
};

// Generate slug from title
const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
};

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  // Handle CORS preflight
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers, body: "" };
  }

  const path = event.path.replace("/.netlify/functions/blogs-api", "");
  const pathParts = path.split("/").filter(Boolean);

  try {
    // GET /blogs - List all blogs (public: only published, admin: all)
    if (event.httpMethod === "GET" && pathParts.length === 0) {
      const isAdmin = isAuthenticated(event);
      
      let blogs;
      if (isAdmin) {
        blogs = await sql`
          SELECT id, title, slug, excerpt, cover_image, status, published_at, created_at, updated_at
          FROM blogs
          ORDER BY created_at DESC
        `;
      } else {
        blogs = await sql`
          SELECT id, title, slug, excerpt, cover_image, published_at, created_at
          FROM blogs
          WHERE status = 'published'
          ORDER BY published_at DESC
        `;
      }

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ blogs }),
      };
    }

    // GET /blogs/:slug - Get single blog by slug (public)
    if (event.httpMethod === "GET" && pathParts.length === 1) {
      const slugOrId = pathParts[0];
      const isAdmin = isAuthenticated(event);

      let blog;
      if (isAdmin) {
        blog = await sql`
          SELECT * FROM blogs WHERE slug = ${slugOrId} OR id::text = ${slugOrId}
        `;
      } else {
        blog = await sql`
          SELECT * FROM blogs WHERE (slug = ${slugOrId} OR id::text = ${slugOrId}) AND status = 'published'
        `;
      }

      if (blog.length === 0) {
        return {
          statusCode: 404,
          headers,
          body: JSON.stringify({ error: "Blog not found" }),
        };
      }

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ blog: blog[0] }),
      };
    }

    // All other operations require authentication
    if (!isAuthenticated(event)) {
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({ error: "Unauthorized" }),
      };
    }

    // POST /blogs - Create new blog
    if (event.httpMethod === "POST" && pathParts.length === 0) {
      const { title, content, excerpt, cover_image, status } = JSON.parse(event.body || "{}");

      if (!title || !content) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: "Title and content are required" }),
        };
      }

      const slug = generateSlug(title);
      const publishedAt = status === "published" ? new Date().toISOString() : null;

      const result = await sql`
        INSERT INTO blogs (title, slug, content, excerpt, cover_image, status, published_at)
        VALUES (${title}, ${slug}, ${content}, ${excerpt || ""}, ${cover_image || ""}, ${status || "draft"}, ${publishedAt})
        RETURNING *
      `;

      return {
        statusCode: 201,
        headers,
        body: JSON.stringify({ blog: result[0] }),
      };
    }

    // PUT /blogs/:id - Update blog
    if (event.httpMethod === "PUT" && pathParts.length === 1) {
      const id = pathParts[0];
      const { title, content, excerpt, cover_image, status } = JSON.parse(event.body || "{}");

      // Get current blog to check if status is changing to published
      const currentBlog = await sql`SELECT * FROM blogs WHERE id = ${id}`;
      if (currentBlog.length === 0) {
        return {
          statusCode: 404,
          headers,
          body: JSON.stringify({ error: "Blog not found" }),
        };
      }

      const slug = title ? generateSlug(title) : currentBlog[0].slug;
      let publishedAt = currentBlog[0].published_at;
      
      // Set published_at if publishing for the first time
      if (status === "published" && currentBlog[0].status !== "published") {
        publishedAt = new Date().toISOString();
      }

      const result = await sql`
        UPDATE blogs
        SET 
          title = COALESCE(${title}, title),
          slug = ${slug},
          content = COALESCE(${content}, content),
          excerpt = COALESCE(${excerpt}, excerpt),
          cover_image = COALESCE(${cover_image}, cover_image),
          status = COALESCE(${status}, status),
          published_at = ${publishedAt},
          updated_at = NOW()
        WHERE id = ${id}
        RETURNING *
      `;

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ blog: result[0] }),
      };
    }

    // DELETE /blogs/:id - Delete blog
    if (event.httpMethod === "DELETE" && pathParts.length === 1) {
      const id = pathParts[0];

      await sql`DELETE FROM blogs WHERE id = ${id}`;

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ success: true }),
      };
    }

    // PATCH /blogs/:id/toggle - Toggle publish status
    if (event.httpMethod === "PATCH" && pathParts.length === 2 && pathParts[1] === "toggle") {
      const id = pathParts[0];

      const currentBlog = await sql`SELECT * FROM blogs WHERE id = ${id}`;
      if (currentBlog.length === 0) {
        return {
          statusCode: 404,
          headers,
          body: JSON.stringify({ error: "Blog not found" }),
        };
      }

      const newStatus = currentBlog[0].status === "published" ? "draft" : "published";
      const publishedAt = newStatus === "published" ? new Date().toISOString() : null;

      const result = await sql`
        UPDATE blogs
        SET status = ${newStatus}, published_at = ${publishedAt}, updated_at = NOW()
        WHERE id = ${id}
        RETURNING *
      `;

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ blog: result[0] }),
      };
    }

    return {
      statusCode: 404,
      headers,
      body: JSON.stringify({ error: "Not found" }),
    };
  } catch (error) {
    console.error("Blogs API error:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "Internal server error", details: String(error) }),
    };
  }
};

export { handler };
