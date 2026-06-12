import { Client } from '@neondatabase/serverless';
import nodemailer from 'nodemailer';

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  try {
    const body = JSON.parse(event.body || '{}');
    const { name, mobile, email, project, message } = body;

    if (!name || !mobile) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required fields', required: ['name', 'mobile'] })
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
      ssl: true,
    });

    await client.connect();
    console.log('Database connected successfully');

    await client.query(
      `insert into enquiries (name, mobile, email, project, message)
       values ($1, $2, $3, $4, $5)`,
      [
        name,
        mobile,
        email || '', // DB may require NOT NULL; use empty string if missing
        project || 'General Enquiry', // Provide default to satisfy NOT NULL schemas
        message || null,
      ]
    );

    await client.end();
    console.log('Enquiry saved successfully');

    // Send email notification via HostGator SMTP
    console.log('Checking email config:', {
      hasSmtpHost: !!process.env.SMTP_HOST,
      hasSmtpUser: !!process.env.SMTP_USER,
      hasSmtpPass: !!process.env.SMTP_PASS,
      hasNotificationEmail: !!process.env.NOTIFICATION_EMAIL,
      notificationEmail: process.env.NOTIFICATION_EMAIL ? '***configured***' : 'MISSING'
    });

    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS && process.env.NOTIFICATION_EMAIL) {
      try {
        const port = Number(process.env.SMTP_PORT) || 465;
        console.log('Attempting to send email via SMTP...');
        console.log('HOST:', process.env.SMTP_HOST, 'PORT:', port);
        console.log('FROM:', process.env.SMTP_USER);
        console.log('TO:', process.env.NOTIFICATION_EMAIL);

        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port,
          secure: port === 465, // true for 465 (SSL), false for 587 (STARTTLS)
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        });

        const displayProject = project || 'General Enquiry';
        const displayEmail = email || 'Not provided';
        const info = await transporter.sendMail({
          from: `Desire Realty <${process.env.SMTP_USER}>`,
          to: process.env.NOTIFICATION_EMAIL,
          replyTo: email || undefined,
          subject: `New Enquiry: ${displayProject}`,
          html: `
            <h2>New Enquiry Received</h2>
            <p><strong>Project:</strong> ${displayProject}</p>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Mobile:</strong> ${mobile}</p>
            <p><strong>Email:</strong> ${displayEmail}</p>
            ${message ? `<p><strong>Message:</strong> ${message}</p>` : ''}
            <p><em>Submitted on ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</em></p>
          `,
        });

        console.log('Email sent successfully! Message ID:', info.messageId);
      } catch (emailError) {
        console.error('Email error (non-critical):', emailError);
        // Don't fail the request if email fails
      }
    } else {
      console.warn('Email not sent - missing SMTP environment variables');
    }

    // Send SMS notification via Twilio
    console.log('Checking Twilio config:', {
      hasSid: !!process.env.TWILIO_ACCOUNT_SID,
      hasToken: !!process.env.TWILIO_AUTH_TOKEN,
      hasFrom: !!process.env.TWILIO_SMS_FROM,
    });

    if (
      process.env.TWILIO_ACCOUNT_SID &&
      process.env.TWILIO_AUTH_TOKEN &&
      process.env.TWILIO_SMS_FROM
    ) {
      try {
        const sid = process.env.TWILIO_ACCOUNT_SID;
        const token = process.env.TWILIO_AUTH_TOKEN;
        const from = process.env.TWILIO_SMS_FROM;
        // Destination (business owner). Defaults to +917339754521.
        const to = process.env.TWILIO_SMS_TO || '+917339754521';

        const displayProject = project || 'General Enquiry';
        const submittedAt = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

        const smsBody = [
          'New Enquiry - Desire Realty',
          `Name: ${name}`,
          `Mobile: ${mobile}`,
          `Project: ${displayProject}`,
          `Message: ${message || '-'}`,
          submittedAt,
        ].join('\n');

        const twilioUrl = `https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`;
        const auth = Buffer.from(`${sid}:${token}`).toString('base64');

        const smsResp = await fetch(twilioUrl, {
          method: 'POST',
          headers: {
            Authorization: `Basic ${auth}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({ From: from, To: to, Body: smsBody }).toString(),
        });

        const smsJson = await smsResp.json().catch(() => ({}));
        if (!smsResp.ok) {
          console.error('Twilio SMS error:', smsResp.status, smsJson);
        } else {
          console.log('SMS sent! SID:', (smsJson as { sid?: string }).sid);
        }
      } catch (smsError) {
        console.error('SMS error (non-critical):', smsError);
        // Don't fail the request if SMS fails
      }
    } else {
      console.warn('SMS not sent - missing Twilio environment variables');
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
        error: 'Error saving enquiry. Please try again or contact us directly.'
      })
    };
  }
};
