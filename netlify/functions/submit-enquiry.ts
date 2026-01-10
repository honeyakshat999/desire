import { Client } from '@neondatabase/serverless';

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method not allowed' };

  const body = JSON.parse(event.body || '{}');
  const { name, mobile, email, project, message } = body;
  if (!name || !mobile || !email || !project) {
    return { statusCode: 400, body: 'Missing required fields' };
  }

  const client = new Client({
    host: process.env.NEON_HOST,
    database: process.env.NEON_DATABASE,
    user: process.env.NEON_USER,
    password: process.env.NEON_PASSWORD,
    ssl: { rejectUnauthorized: false },
  });

  try {
    await client.connect();
    await client.query(
      `insert into enquiries (name, mobile, email, project, message)
       values ($1, $2, $3, $4, $5)`,
      [name, mobile, email, project, message || null]
    );
    return { statusCode: 200, body: JSON.stringify({ ok: true }) };
  } catch (err) {
    console.error(err);
    return { statusCode: 500, body: 'Error saving enquiry' };
  } finally {
    await client.end();
  }
};