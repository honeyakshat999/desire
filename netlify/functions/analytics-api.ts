import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-in-production";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL!;

// CORS headers
const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
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

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  // Handle CORS preflight
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers, body: "" };
  }

  const path = event.path.replace("/.netlify/functions/analytics-api", "");

  try {
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
      body: JSON.stringify({ error: "Internal server error", details: String(error) }),
    };
  }
};

export { handler };
