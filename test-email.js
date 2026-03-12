// Test Gmail SMTP connection with Nodemailer
// Run this with: node test-email.js
// Make sure to have .env.local in the same directory

require('dotenv').config({ path: '.env.local' });
const nodemailer = require('nodemailer');

async function testEmailConnection() {
  console.log('🧪 Testing Gmail SMTP Connection...\n');

  // Check environment variables
  console.log('📋 Environment Variables:');
  console.log('EMAIL_USER:', process.env.EMAIL_USER || '❌ Not set');
  console.log('EMAIL_PASS:', process.env.EMAIL_PASS ? '✅ Set (hidden)' : '❌ Not set');
  console.log('CONTACT_EMAIL:', process.env.CONTACT_EMAIL || '❌ Not set');
  console.log('');

  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.error('❌ Missing EMAIL_USER or EMAIL_PASS in .env.local');
    console.log('\nPlease update .env.local with your Gmail credentials:');
    console.log('EMAIL_USER=your-email@gmail.com');
    console.log('EMAIL_PASS=your-16-char-app-password');
    process.exit(1);
  }

  try {
    // Create transporter
    console.log('🔧 Creating SMTP transporter...');
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      },
      debug: true // Enable debug output
    });

    // Test connection
    console.log('🔌 Testing SMTP connection...');
    await transporter.verify();
    console.log('✅ SMTP connection successful!\n');

    // Send test email
    console.log('📧 Sending test email...');
    const info = await transporter.sendMail({
      from: `"Test" <${process.env.EMAIL_USER}>`,
      to: process.env.CONTACT_EMAIL || process.env.EMAIL_USER,
      subject: '✅ Test Email from KrayoNova',
      text: 'This is a test email to verify SMTP configuration.',
      html: '<h2>✅ Success!</h2><p>Your SMTP configuration is working correctly.</p>'
    });

    console.log('✅ Test email sent successfully!');
    console.log('Message ID:', info.messageId);
    console.log('\n🎉 All tests passed! Your email configuration is working.');

  } catch (error) {
    console.error('\n❌ Error occurred:');
    console.error(error.message);
    
    if (error.message.includes('Invalid login')) {
      console.log('\n💡 Troubleshooting:');
      console.log('1. Make sure you\'re using a Gmail App Password, not your regular password');
      console.log('2. Generate one at: https://myaccount.google.com/apppasswords');
      console.log('3. Enable 2-Step Verification first if not already enabled');
      console.log('4. Remove any spaces from the App Password');
    } else if (error.message.includes('ECONNREFUSED') || error.message.includes('ETIMEDOUT')) {
      console.log('\n💡 Troubleshooting:');
      console.log('1. Check your internet connection');
      console.log('2. Check if a firewall is blocking port 587 or 465');
      console.log('3. Try from a different network');
    }
    
    process.exit(1);
  }
}

// Run the test
testEmailConnection();
