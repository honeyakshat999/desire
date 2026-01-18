import { Client } from '@neondatabase/serverless';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

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
    
    // Send email notification
    console.log('Checking email config:', {
      hasApiKey: !!process.env.RESEND_API_KEY,
      hasNotificationEmail: !!process.env.NOTIFICATION_EMAIL,
      notificationEmail: process.env.NOTIFICATION_EMAIL ? '***configured***' : 'MISSING'
    });
    
    if (process.env.RESEND_API_KEY && process.env.NOTIFICATION_EMAIL) {
      try {
        console.log('Attempting to send email...');
        await resend.emails.send({
          from: 'Desire Realty <onboarding@resend.dev>', // Change after domain verification
          to: process.env.NOTIFICATION_EMAIL,
          subject: `New Enquiry: ${project}`,
          html: `
            <h2>New Enquiry Received</h2>
            <p><strong>Project:</strong> ${project}</p>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Mobile:</strong> ${mobile}</p>
            <p><strong>Email:</strong> ${email}</p>
            ${message ? `<p><strong>Message:</strong> ${message}</p>` : ''}
            <p><em>Submitted on ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</em></p>
          `,
        });
        console.log('Email notification sent');
      } catch (emailError) {
        console.error('Email error (non-critical):', emailError);
        // Don't fail the request if email fails
      }
    } else {
      console.warn('Email not sent - missing environment variables');
    }
    
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