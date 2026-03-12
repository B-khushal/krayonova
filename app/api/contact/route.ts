import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, company, projectType, budget, timeline, description } = body;

    // Validate required fields
    if (!name || !email || !description) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate environment variables
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error('❌ Email configuration missing: EMAIL_USER or EMAIL_PASS not set');
      console.error('EMAIL_USER:', process.env.EMAIL_USER ? 'Set' : 'Not set');
      console.error('EMAIL_PASS:', process.env.EMAIL_PASS ? 'Set (hidden)' : 'Not set');
      return NextResponse.json(
        { success: false, error: 'Email service not configured' },
        { status: 500 }
      );
    }

    console.log('📧 Attempting to send email...');
    console.log('Using Gmail account:', process.env.EMAIL_USER);

    // Create Nodemailer transporter with Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      },
      // Add debug options
      debug: process.env.NODE_ENV === 'development',
      logger: process.env.NODE_ENV === 'development'
    });

    // Verify SMTP connection
    try {
      await transporter.verify();
      console.log('✅ SMTP connection verified successfully');
    } catch (verifyError) {
      console.error('❌ SMTP verification failed:', verifyError);
      const errorMessage = verifyError instanceof Error ? verifyError.message : 'Unknown error';
      return NextResponse.json(
        { 
          success: false, 
          error: 'Email service connection failed. Please check SMTP credentials.',
          details: process.env.NODE_ENV === 'development' ? errorMessage : undefined
        },
        { status: 500 }
      );
    }

    // Email HTML template
    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .info-row { background: white; padding: 15px; margin-bottom: 10px; border-left: 4px solid #667eea; border-radius: 4px; }
          .label { font-weight: bold; color: #667eea; margin-bottom: 5px; }
          .value { color: #333; }
          .message-box { background: white; padding: 20px; margin-top: 20px; border-radius: 4px; border: 1px solid #e0e0e0; }
          .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin: 0;">📧 New Contact Form Submission</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">KrayoNova Website</p>
          </div>
          <div class="content">
            <div class="info-row">
              <div class="label">👤 Full Name</div>
              <div class="value">${name}</div>
            </div>
            <div class="info-row">
              <div class="label">📧 Email Address</div>
              <div class="value"><a href="mailto:${email}">${email}</a></div>
            </div>
            ${company ? `
            <div class="info-row">
              <div class="label">🏢 Company</div>
              <div class="value">${company}</div>
            </div>
            ` : ''}
            ${projectType ? `
            <div class="info-row">
              <div class="label">📋 Project Type</div>
              <div class="value">${projectType}</div>
            </div>
            ` : ''}
            ${budget ? `
            <div class="info-row">
              <div class="label">💰 Budget</div>
              <div class="value">${budget}</div>
            </div>
            ` : ''}
            ${timeline ? `
            <div class="info-row">
              <div class="label">⏱️ Timeline</div>
              <div class="value">${timeline}</div>
            </div>
            ` : ''}
            <div class="message-box">
              <div class="label" style="margin-bottom: 10px;">💬 Message</div>
              <div class="value" style="white-space: pre-wrap;">${description}</div>
            </div>
            <div class="footer">
              <p>This email was sent from the KrayoNova contact form</p>
              <p>Reply directly to <a href="mailto:${email}">${email}</a> to respond to ${name}</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;

    // Plain text version
    const emailText = `
New Contact Form Submission - KrayoNova

Name: ${name}
Email: ${email}
${company ? `Company: ${company}` : ''}
${projectType ? `Project Type: ${projectType}` : ''}
${budget ? `Budget: ${budget}` : ''}
${timeline ? `Timeline: ${timeline}` : ''}

Message:
${description}

---
Reply to: ${email}
    `;

    // Email configuration
    const mailOptions = {
      from: `"KrayoNova Contact Form" <${process.env.EMAIL_USER}>`,
      to: process.env.CONTACT_EMAIL || 'krayonova@gmail.com',
      replyTo: email,
      subject: `🔔 New Contact: ${name} - ${projectType || 'General Inquiry'}`,
      text: emailText,
      html: emailHtml
    };

    // Send email
    try {
      const info = await transporter.sendMail(mailOptions);
      console.log(`✅ Email sent successfully to ${mailOptions.to} from ${name} (${email})`);
      console.log('Message ID:', info.messageId);
    } catch (sendError) {
      console.error('❌ Failed to send email:', sendError);
      const errorMessage = sendError instanceof Error ? sendError.message : 'Unknown error';
      throw new Error(`Email sending failed: ${errorMessage}`);
    }

    return NextResponse.json(
      { 
        success: true, 
        message: 'Your message has been sent successfully! We will get back to you within 24 hours.' 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('❌ Error in contact form submission:', error);
    
    // More detailed error for debugging
    let errorMessage = 'Unknown error occurred';
    let errorType = 'unknown';
    
    if (error instanceof Error) {
      errorMessage = error.message;
      
      // Identify common error types
      if (errorMessage.includes('Invalid login')) {
        errorType = 'authentication';
        errorMessage = 'Gmail authentication failed. Please check your App Password.';
      } else if (errorMessage.includes('ECONNREFUSED') || errorMessage.includes('ETIMEDOUT')) {
        errorType = 'connection';
        errorMessage = 'Cannot connect to Gmail SMTP server. Check your network/firewall.';
      } else if (errorMessage.includes('EAUTH')) {
        errorType = 'authentication';
        errorMessage = 'Gmail authentication error. Make sure you\'re using an App Password.';
      }
    }
    
    console.error(`Error type: ${errorType}`);
    console.error(`Error message: ${errorMessage}`);
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to send email. Please try again later or contact us directly.',
        details: process.env.NODE_ENV === 'development' ? errorMessage : undefined,
        errorType: process.env.NODE_ENV === 'development' ? errorType : undefined
      },
      { status: 500 }
    );
  }
}
