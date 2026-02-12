import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Allowed origins for CORS
const ALLOWED_ORIGINS = [
  "https://desirerealty.in",
  "https://www.desirerealty.in",
  process.env.URL, // Netlify deploy URL
].filter(Boolean);

const getCorsOrigin = (event: any) => {
  const origin = event?.headers?.origin || "";
  if (ALLOWED_ORIGINS.includes(origin)) return origin;
  // Allow localhost in dev
  if (origin.startsWith("http://localhost:")) return origin;
  return ALLOWED_ORIGINS[0] || "";
};

// CORS headers factory
const getHeaders = (event?: any) => ({
  "Access-Control-Allow-Origin": event ? getCorsOrigin(event) : ALLOWED_ORIGINS[0] || "",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
  "Content-Type": "application/json",
  "Vary": "Origin",
});

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

// Simple in-memory rate limiting for login attempts
const loginAttempts = new Map<string, { count: number; lastAttempt: number }>();
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
const MAX_ATTEMPTS = 5;

const isRateLimited = (ip: string): boolean => {
  const now = Date.now();
  const attempts = loginAttempts.get(ip);
  if (!attempts || now - attempts.lastAttempt > RATE_LIMIT_WINDOW) {
    loginAttempts.set(ip, { count: 1, lastAttempt: now });
    return false;
  }
  attempts.count++;
  attempts.lastAttempt = now;
  return attempts.count > MAX_ATTEMPTS;
};

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  const headers = getHeaders(event);

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
      // Rate limit check
      const clientIp = event.headers["x-forwarded-for"] || event.headers["client-ip"] || "unknown";
      if (isRateLimited(clientIp)) {
        return {
          statusCode: 429,
          headers,
          body: JSON.stringify({ error: "Too many login attempts. Please try again later." }),
        };
      }

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

      // Generate JWT token (short-lived for security)
      const token = jwt.sign({ email: ADMIN_EMAIL }, JWT_SECRET, { expiresIn: "2h" });

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
      body: JSON.stringify({ error: "Internal server error" }),
    };
  }
};

export { handler };
