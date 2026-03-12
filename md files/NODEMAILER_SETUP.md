# 📧 Nodemailer Email Setup - Quick Start

Your contact form is now configured to send emails to **krayonova@gmail.com** using Nodemailer with Gmail SMTP.

## ⚡ 3-Step Setup

### 1️⃣ Generate Gmail App Password

1. Go to: https://myaccount.google.com/apppasswords
2. Select **Mail** → **Other (Custom name)**
3. Name it: "KrayoNova Website"
4. Copy the 16-character password

### 2️⃣ Update .env.local

```env
CONTACT_EMAIL=krayonova@gmail.com
EMAIL_USER=krayonova@gmail.com
EMAIL_PASS=your_16_character_password_here
NODE_ENV=development
```

### 3️⃣ Restart Server

```bash
npm run dev
```

## ✅ Done!

Test your contact form - emails will arrive at **krayonova@gmail.com**

---

📖 **Need detailed instructions?** See [EMAIL_SETUP.md](./EMAIL_SETUP.md)

## 📦 What's Included

- ✅ Nodemailer configured
- ✅ Professional HTML email template
- ✅ API route `/api/contact`
- ✅ Form validation & error handling
- ✅ Loading states & success messages
- ✅ Secure environment variables

## 🔧 API Details

**Endpoint:** `POST /api/contact`

**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "description": "Message here",
  "company": "Optional",
  "projectType": "Optional",
  "budget": "Optional",
  "timeline": "Optional"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Email sent successfully"
}
```

## 💡 Quick Troubleshooting

- **"Email service not configured"** → Check `.env.local` exists
- **"Invalid credentials"** → Use App Password, not regular password
- **Email not received** → Check spam folder
- **Variables not loading** → Restart server

---

**All emails go to:** krayonova@gmail.com 📬
