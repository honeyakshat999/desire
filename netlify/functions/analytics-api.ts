import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import { neon } from "@neondatabase/serverless";
import jwt from "jsonwebtoken";

// Allowed origins for CORS
const ALLOWED_ORIGINS = [
  "https://desirerealty.in",
  "https://www.desirerealty.in",
  process.env.URL,
].filter(Boolean);

const getCorsOrigin = (event: any) => {
  const origin = event?.headers?.origin || "";
  if (ALLOWED_ORIGINS.includes(origin)) return origin;
  if (origin.startsWith("http://localhost:")) return origin;
  return ALLOWED_ORIGINS[0] || "";
};

const getHeaders = (event?: any) => ({
  "Access-Control-Allow-Origin": event ? getCorsOrigin(event) : ALLOWED_ORIGINS[0] || "",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
  "Content-Type": "application/json",
  "Vary": "Origin",
});

// Get database connection
const getDb = () => {
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) {
    throw new Error("DATABASE_URL environment variable is not set");
  }
  return neon(dbUrl);
};

// Verify JWT token
const verifyToken = (token: string): { email: string } | null => {
  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) return null;
    const decoded = jwt.verify(token, secret) as { email: string };
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
  const adminEmail = process.env.ADMIN_EMAIL;
  return decoded !== null && adminEmail !== undefined && decoded.email.toLowerCase() === adminEmail.toLowerCase();
};

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  const headers = getHeaders(event);

  // Handle CORS preflight
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers, body: "" };
  }

  // Check environment variables
  if (!process.env.DATABASE_URL) {
    console.error("Missing DATABASE_URL environment variable");
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "Server configuration error - DATABASE_URL not set" }),
    };
  }

  const path = event.path.replace("/.netlify/functions/analytics-api", "");

  try {
    const sql = getDb();

    // GET /analytics - Get analytics data (admin only)
    if (event.httpMethod === "GET") {
      if (!isAuthenticated(event)) {
        return {
          statusCode: 401,
          headers,
          body: JSON.stringify({ error: "Unauthorized" }),
        };
      }

      // Get query params for date range
      const params = event.queryStringParameters || {};
      const days = parseInt(params.days || "30");
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - days);

      // Total page views
      const totalViews = await sql`
        SELECT COUNT(*) as total FROM page_views
        WHERE created_at >= ${startDate.toISOString()}
      `;

      // Page views by page
      const viewsByPage = await sql`
        SELECT page_path, COUNT(*) as views
        FROM page_views
        WHERE created_at >= ${startDate.toISOString()}
        GROUP BY page_path
        ORDER BY views DESC
        LIMIT 20
      `;

      // Page views by day
      const viewsByDay = await sql`
        SELECT DATE(created_at) as date, COUNT(*) as views
        FROM page_views
        WHERE created_at >= ${startDate.toISOString()}
        GROUP BY DATE(created_at)
        ORDER BY date ASC
      `;

      // Total enquiry clicks
      const totalEnquiryClicks = await sql`
        SELECT COUNT(*) as total FROM enquiry_clicks
        WHERE created_at >= ${startDate.toISOString()}
      `;

      // Enquiry clicks by project
      const enquiryClicksByProject = await sql`
        SELECT project_id, project_name, COUNT(*) as clicks
        FROM enquiry_clicks
        WHERE created_at >= ${startDate.toISOString()}
        GROUP BY project_id, project_name
        ORDER BY clicks DESC
      `;

      // Enquiry clicks by day
      const enquiryClicksByDay = await sql`
        SELECT DATE(created_at) as date, COUNT(*) as clicks
        FROM enquiry_clicks
        WHERE created_at >= ${startDate.toISOString()}
        GROUP BY DATE(created_at)
        ORDER BY date ASC
      `;

      // Total enquiries submitted
      const totalEnquiries = await sql`
        SELECT COUNT(*) as total FROM enquiries
        WHERE created_at >= ${startDate.toISOString()}
      `;

      // Enquiries by project
      const enquiriesByProject = await sql`
        SELECT project, COUNT(*) as count
        FROM enquiries
        WHERE created_at >= ${startDate.toISOString()} AND project IS NOT NULL
        GROUP BY project
        ORDER BY count DESC
      `;

      // Recent enquiries
      const recentEnquiries = await sql`
        SELECT id, name, email, mobile, project, created_at
        FROM enquiries
        ORDER BY created_at DESC
        LIMIT 10
      `;

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          summary: {
            totalPageViews: parseInt(totalViews[0]?.total || "0"),
            totalEnquiryClicks: parseInt(totalEnquiryClicks[0]?.total || "0"),
            totalEnquiries: parseInt(totalEnquiries[0]?.total || "0"),
          },
          pageViews: {
            byPage: viewsByPage,
            byDay: viewsByDay,
          },
          enquiryClicks: {
            byProject: enquiryClicksByProject,
            byDay: enquiryClicksByDay,
          },
          enquiries: {
            byProject: enquiriesByProject,
            recent: recentEnquiries,
          },
        }),
      };
    }

    return {
      statusCode: 404,
      headers,
      body: JSON.stringify({ error: "Not found" }),
    };
  } catch (error) {
    console.error("Analytics API error:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "Internal server error" }),
    };
  }
};

export { handler };
