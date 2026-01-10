import { Client } from '@neondatabase/serverless';

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  try {
    const body = JSON.parse(event.body || '{}');
    const { name, mobile, email, project, message } = body;
    
    if (!name || !mobile || !email || !project) {
      return { 
        statusCode: 400, 
        body: JSON.stringify({ error: 'Missing required fields', required: ['name', 'mobile', 'email', 'project'] })
      };
    }

    // Check if environment variables are set
    if (!process.env.NEON_HOST || !process.env.NEON_DATABASE || !process.env.NEON_USER || !process.env.NEON_PASSWORD) {
      console.error('Missing Neon environment variables');
      return { 
        statusCode: 500, 
        body: JSON.stringify({ error: 'Database configuration missing. Please contact administrator.' })
      };
    }

    const client = new Client({
      host: process.env.NEON_HOST,
      database: process.env.NEON_DATABASE,
      user: process.env.NEON_USER,
      password: process.env.NEON_PASSWORD,
      ssl: { rejectUnauthorized: false },
    });

    await client.connect();
    console.log('Database connected successfully');
    
    await client.query(
      `insert into enquiries (name, mobile, email, project, message)
       values ($1, $2, $3, $4, $5)`,
      [name, mobile, email, project, message || null]
    );
    
    await client.end();
    console.log('Enquiry saved successfully');
    
    return { 
      statusCode: 200, 
      body: JSON.stringify({ success: true, message: 'Enquiry submitted successfully' })
    };
  } catch (err) {
    console.error('Function error:', err);
    return { 
      statusCode: 500, 
      body: JSON.stringify({ 
        error: 'Error saving enquiry', 
        details: err instanceof Error ? err.message : 'Unknown error',
        hint: 'Check Netlify function logs for details'
      })
    };
  }
};