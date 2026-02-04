import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// CORS headers
const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
  "Content-Type": "application/json",
};

// Get environment variables inside handler to ensure they're loaded
const getEnvVars = () => {
  const JWT_SECRET = process.env.JWT_SECRET;
  const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
  const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH;
  
  return { JWT_SECRET, ADMIN_EMAIL, ADMIN_PASSWORD_HASH };
};

// Verify JWT token
const verifyToken = (token: string, secret: string): { email: string } | null => {
  try {
    const decoded = jwt.verify(token, secret) as { email: string };
    return decoded;
  } catch {
    return null;
  }
};

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  // Handle CORS preflight
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers, body: "" };
  }

  const { JWT_SECRET, ADMIN_EMAIL, ADMIN_PASSWORD_HASH } = getEnvVars();

  // Check if environment variables are set
  if (!JWT_SECRET || !ADMIN_EMAIL || !ADMIN_PASSWORD_HASH) {
    console.error("Missing environment variables:", {
      hasJWT: !!JWT_SECRET,
      hasEmail: !!ADMIN_EMAIL,
      hasHash: !!ADMIN_PASSWORD_HASH,
    });
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: "Server configuration error - missing environment variables" 
      }),
    };
  }

  const path = event.path.replace("/.netlify/functions/admin-auth", "");

  try {
    // Login endpoint
    if (event.httpMethod === "POST" && (path === "/login" || path === "")) {
      const { email, password } = JSON.parse(event.body || "{}");

      if (!email || !password) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: "Email and password are required" }),
        };
      }

      // Check credentials against environment variables (case-insensitive email)
      if (email.toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
        return {
          statusCode: 401,
          headers,
          body: JSON.stringify({ error: "Invalid credentials" }),
        };
      }

      // Verify password
      const isValidPassword = await bcrypt.compare(password, ADMIN_PASSWORD_HASH);
      if (!isValidPassword) {
        return {
          statusCode: 401,
          headers,
          body: JSON.stringify({ error: "Invalid credentials" }),
        };
      }

      // Generate JWT token
      const token = jwt.sign({ email: ADMIN_EMAIL }, JWT_SECRET, { expiresIn: "7d" });

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          token,
          user: { email: ADMIN_EMAIL },
        }),
      };
    }

    // Verify token endpoint
    if (event.httpMethod === "GET" && path === "/verify") {
      const authHeader = event.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return {
          statusCode: 401,
          headers,
          body: JSON.stringify({ error: "No token provided" }),
        };
      }

      const token = authHeader.split(" ")[1];
      const decoded = verifyToken(token, JWT_SECRET);

      if (!decoded || decoded.email.toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
        return {
          statusCode: 401,
          headers,
          body: JSON.stringify({ error: "Invalid token" }),
        };
      }

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ valid: true, user: { email: decoded.email } }),
      };
    }

    return {
      statusCode: 404,
      headers,
      body: JSON.stringify({ error: "Not found" }),
    };
  } catch (error) {
    console.error("Auth error:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "Internal server error", details: String(error) }),
    };
  }
};

export { handler };
