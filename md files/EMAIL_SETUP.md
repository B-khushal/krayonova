# Email Setup Guide - Nodemailer (Gmail SMTP)

All contact form submissions are configured to be sent to **krayonova@gmail.com** using **Nodemailer** with Gmail SMTP.

## ✅ What's Already Done

- ✅ Nodemailer installed and configured
- ✅ API route `/api/contact` fully implemented
- ✅ Both contact forms connected to the API
- ✅ Professional HTML email templates
- ✅ Error handling and validation
- ✅ Environment variables configured

## 🚀 Quick Setup (5 Minutes)

### Step 1: Generate Gmail App Password

Since you're using Gmail, you need to create an **App Password** (not your regular password):

1. **Go to Google Account Settings:**
   - Visit: https://myaccount.google.com/security

2. **Enable 2-Step Verification** (if not already enabled):
   - Click on "2-Step Verification"
   - Follow the setup process

3. **Generate App Password:**
   - Visit: https://myaccount.google.com/apppasswords
   - Or go to Security → 2-Step Verification → App Passwords
   - Select "Mail" as the app
   - Select "Other (Custom name)" as the device
   - Name it: "KrayoNova Website"
   - Click "Generate"
   - **Copy the 16-character password** (it will look like: `xxxx xxxx xxxx xxxx`)

### Step 2: Update Environment Variables

Open the `.env.local` file in your project root and update it:

```env
CONTACT_EMAIL=krayonova@gmail.com
EMAIL_USER=krayonova@gmail.com
EMAIL_PASS=your_16_character_app_password_here
NODE_ENV=development
```

**Replace:**
- `EMAIL_USER` → Your Gmail address (krayonova@gmail.com)
- `EMAIL_PASS` → The 16-character App Password (remove spaces)

Example:
```env
EMAIL_PASS=abcdwxyzefgh1234
```

### Step 3: Restart Development Server

If your server is running, restart it to load the new environment variables:

```bash
# Stop the server (Ctrl+C) then restart:
npm run dev
```

### Step 4: Test the Contact Form

1. Open your website in a browser
2. Navigate to the contact form
3. Fill out all required fields
4. Click "Submit"
5. Check **krayonova@gmail.com** inbox for the email

## 📧 Email Features

Your contact form now sends professional emails with:

- ✨ Beautiful HTML template with gradient header
- 📋 All form fields nicely formatted
- 💬 Message displayed in a clean box
- 🔄 Reply-to set to customer's email
- 📊 Conditional fields (only shows if provided)
- 🎨 Responsive design
- 📱 Plain text fallback

## 🔧 Technical Details

### API Endpoint

**URL:** `/api/contact`  
**Method:** `POST`  
**Content-Type:** `application/json`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "company": "Acme Inc",
  "projectType": "Website",
  "budget": "₹50,000 – ₹1,00,000",
  "timeline": "1 Month",
  "description": "I need a modern website..."
}
```

**Success Response:**
```json
{
  "success": true,
  "message": "Your message has been sent successfully!"
}
```

**Error Response:**
```json
{
  "success": false,
  "error": "Error message here"
}
```

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `EMAIL_USER` | Gmail address for SMTP | Yes |
| `EMAIL_PASS` | Gmail App Password (16 chars) | Yes |
| `CONTACT_EMAIL` | Where to send form submissions | Yes |
| `NODE_ENV` | Environment (development/production) | No |

### Frontend Integration

Both forms automatically:
- Show loading state while submitting
- Display success message after sending
- Handle errors gracefully
- Reset form after 3 seconds
- Validate required fields

## 🔒 Security

✅ **Secure Setup:**
- Environment variables never exposed to frontend
- Credentials stored in `.env.local` (gitignored)
- SMTP authentication with App Password
- Input validation on backend
- Error messages don't leak sensitive info

## 🐛 Troubleshooting

### "Email service not configured"
**Problem:** Environment variables not set  
**Solution:** Check `.env.local` exists and has `EMAIL_USER` and `EMAIL_PASS`

### "Invalid login credentials"
**Problem:** Wrong password or not using App Password  
**Solution:** 
1. Make sure you're using App Password, not regular password
2. Remove all spaces from the App Password
3. Generate a new App Password if needed

### "Email not received"
**Problem:** Email might be in spam  
**Solution:** 
1. Check spam/junk folder
2. Add krayonova@gmail.com to contacts
3. Mark test email as "Not Spam"

### "Connection refused" or "ETIMEDOUT"
**Problem:** Firewall or network blocking SMTP  
**Solution:**
1. Check your firewall settings
2. Try a different network
3. Contact your hosting provider

### Environment variables not loading
**Problem:** Server not restarted after editing `.env.local`  
**Solution:** Stop server (Ctrl+C) and restart with `npm run dev`

## 📝 Production Deployment

When deploying to production (Vercel, Netlify, etc.):

1. **Add environment variables in your hosting dashboard:**
   - `EMAIL_USER=krayonova@gmail.com`
   - `EMAIL_PASS=your_app_password`
   - `CONTACT_EMAIL=krayonova@gmail.com`
   - `NODE_ENV=production`

2. **Deploy your application**

3. **Test the contact form** on your live site

## 💡 Tips

- **Gmail Daily Limit:** Gmail allows ~500 emails/day with SMTP
- **Reply-To:** Customer emails are set as reply-to for easy responses
- **Logging:** Check server console for email status in development
- **Testing:** Use the form multiple times to ensure reliability

## 📞 Need Help?

If you encounter any issues:
1. Check the server console for error messages
2. Verify all environment variables are set correctly
3. Ensure 2-Step Verification is enabled on Gmail
4. Try generating a new App Password

---

**You're all set!** 🎉 Your contact form is now ready to receive emails at **krayonova@gmail.com**.
