import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import { neon } from "@neondatabase/serverless";
import jwt from "jsonwebtoken";

// CORS headers
const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Content-Type": "application/json",
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

// Check if user is authenticated
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
  // Handle CORS preflight
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers, body: "" };
  }

  // Only allow POST
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  // Check authentication
  if (!isAuthenticated(event)) {
    return {
      statusCode: 401,
      headers,
      body: JSON.stringify({ error: "Unauthorized" }),
    };
  }

  // Check Cloudinary credentials
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    console.error("Missing Cloudinary environment variables");
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "Server configuration error - Cloudinary not configured" }),
    };
  }

  try {
    const { image } = JSON.parse(event.body || "{}");

    if (!image) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: "Image data is required" }),
      };
    }

    // Generate signature for authenticated upload
    const timestamp = Math.round(new Date().getTime() / 1000);
    const folder = "desire-realty-blog";
    
    // Create signature
    const crypto = await import("crypto");
    const signatureString = `folder=${folder}&timestamp=${timestamp}${apiSecret}`;
    const signature = crypto.createHash("sha1").update(signatureString).digest("hex");

    // Upload to Cloudinary
    const formData = new URLSearchParams();
    formData.append("file", image);
    formData.append("api_key", apiKey);
    formData.append("timestamp", timestamp.toString());
    formData.append("signature", signature);
    formData.append("folder", folder);

    const uploadResponse = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!uploadResponse.ok) {
      const errorText = await uploadResponse.text();
      console.error("Cloudinary upload error:", errorText);
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: "Failed to upload image to Cloudinary" }),
      };
    }

    const result = await uploadResponse.json();

    // Save to database if DATABASE_URL is available
    if (process.env.DATABASE_URL) {
      try {
        const sql = neon(process.env.DATABASE_URL);
        await sql`
          INSERT INTO media_uploads (url, public_id, width, height)
          VALUES (${result.secure_url}, ${result.public_id}, ${result.width}, ${result.height})
        `;
      } catch (dbError) {
        console.error("Failed to save to database:", dbError);
        // Don't fail the upload if database save fails
      }
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        url: result.secure_url,
        publicId: result.public_id,
        width: result.width,
        height: result.height,
      }),
    };
  } catch (error) {
    console.error("Upload error:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "Internal server error", details: String(error) }),
    };
  }
};

export { handler };
