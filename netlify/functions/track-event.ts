import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import { neon } from "@neondatabase/serverless";

// Lazy DB initialization (avoid crash if env var missing at module load)
const getDb = () => {
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) throw new Error("DATABASE_URL not set");
  return neon(dbUrl);
};

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
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Content-Type": "application/json",
  "Vary": "Origin",
});

// Sanitize input strings to prevent injection
const sanitize = (input: any, maxLength = 500): string | null => {
  if (input == null) return null;
  return String(input).slice(0, maxLength).replace(/[<>]/g, "");
};

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  const headers = getHeaders(event);

  // Handle CORS preflight
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers, body: "" };
  }

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  try {
    const { type, data } = JSON.parse(event.body || "{}");

    if (!type) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: "Event type is required" }),
      };
    }

    // Track page view
    if (type === "page_view") {
      const page_path = sanitize(data?.page_path, 2000) || "/";
      const referrer = sanitize(data?.referrer, 2000);
      
      const sql = getDb();
      await sql`
        INSERT INTO page_views (page_path, referrer)
        VALUES (${page_path}, ${referrer})
      `;

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ success: true }),
      };
    }

    // Track enquiry click
    if (type === "enquiry_click") {
      const project_id = sanitize(data?.project_id, 100);
      const project_name = sanitize(data?.project_name, 200);
      const source = sanitize(data?.source, 100) || "unknown";
      
      const sql = getDb();
      await sql`
        INSERT INTO enquiry_clicks (project_id, project_name, source)
        VALUES (${project_id}, ${project_name}, ${source})
      `;

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ success: true }),
      };
    }

    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: "Unknown event type" }),
    };
  } catch (error) {
    console.error("Track event error:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "Internal server error" }),
    };
  }
};

export { handler };
