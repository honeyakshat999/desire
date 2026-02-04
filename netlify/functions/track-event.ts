import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

// CORS headers
const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Content-Type": "application/json",
};

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
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
      const { page_path, referrer } = data || {};
      
      await sql`
        INSERT INTO page_views (page_path, referrer)
        VALUES (${page_path || "/"}, ${referrer || null})
      `;

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ success: true }),
      };
    }

    // Track enquiry click
    if (type === "enquiry_click") {
      const { project_id, project_name, source } = data || {};
      
      await sql`
        INSERT INTO enquiry_clicks (project_id, project_name, source)
        VALUES (${project_id || null}, ${project_name || null}, ${source || "unknown"})
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
