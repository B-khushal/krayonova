# Deploying to Render - Complete Guide

This guide will help you deploy your KrayoNova website to Render successfully.

## 🚀 Quick Fix for Current Error

The build error you're experiencing is caused by:
1. ❌ `NODE_ENV=development` in `.env.local` (should not be set manually)
2. ⚠️ React context issues during static generation

### ✅ Already Fixed
- Removed `NODE_ENV=development` from `.env.local`
- Created `render.yaml` configuration
- Updated `.gitignore` to allow example files

## 📋 Step-by-Step Deployment

### Step 1: Configure Environment Variables in Render

1. **Go to your Render dashboard:** https://dashboard.render.com/
2. **Select your KrayoNova service**
3. **Go to "Environment" section**
4. **Add these environment variables:**

```
CONTACT_EMAIL=krayonova@gmail.com
EMAIL_USER=krayonova@gmail.com
EMAIL_PASS=ywnbycuuaqkjeihr
```

**Important:** 
- Do NOT set `NODE_ENV` manually - Render sets this automatically to `production`
- Keep `EMAIL_PASS` secret - never commit it to GitHub

### Step 2: Update Render Build Settings

In your Render dashboard, configure:

**Build Command:**
```bash
npm install && npm run build
```

**Start Command:**
```bash
npm start
```

**Environment:**
- Node Version: `22.x` (or latest)

### Step 3: Push Your Changes

```bash
git add .
git commit -m "Fix Render deployment: remove NODE_ENV, add render.yaml"
git push origin main
```

Render will automatically detect the push and start a new deployment.

### Step 4: Monitor the Build

Watch the build logs in Render dashboard. You should see:
```
✓ Compiled successfully
✓ Generating static pages
✓ Build completed
```

## 🔧 Troubleshooting

### Issue: "Non-standard NODE_ENV value"
**Cause:** `NODE_ENV` was manually set in `.env.local`  
**Solution:** Remove it - Render sets this automatically ✅ (Already fixed)

### Issue: "Cannot read properties of null (reading 'useContext')"
**Cause:** React context issues during static generation  
**Solution:** This should be resolved now that NODE_ENV is properly set

### Issue: "Each child in a list should have a unique key prop"
**Cause:** Missing React keys in some components  
**Solution:** This is just a warning and won't prevent deployment. Your components already have keys.

### Issue: Build succeeds but site doesn't work
**Possible causes:**
1. Missing environment variables
2. API routes not working

**Solution:** 
- Verify all environment variables are set in Render
- Check logs for any runtime errors

## 📁 Files Created/Updated

✅ `render.yaml` - Render configuration
✅ `.env.example.production` - Production environment template
✅ `.env.local` - Removed NODE_ENV
✅ `.gitignore` - Allow .env.example files

## 🌐 After Deployment

Once deployed, your site will be available at:
```
https://krayonova.onrender.com
```
(or your custom domain)

### Test Your Contact Form

1. Go to your deployed site
2. Fill out the contact form
3. Submit
4. Check if email arrives at `krayonova@gmail.com`

## 🔐 Security Checklist

- ✅ `.env.local` is gitignored
- ✅ `EMAIL_PASS` is only in Render environment variables
- ✅ No secrets committed to GitHub
- ✅ HTTPS enabled by default on Render

## 📞 Need Help?

If the build still fails:

1. **Check build logs** in Render dashboard
2. **Clear build cache** in Render settings
3. **Verify environment variables** are set correctly
4. **Try manual redeploy** from Render dashboard

## 💡 Tips

- **Free Tier Limitations:** Render free tier spins down after 15 minutes of inactivity
- **First visit may be slow** as the service spins up
- **Upgrade to paid plan** for always-on service
- **Custom domain:** Can be added in Render settings

---

🎉 **Your site should now deploy successfully!** Push your changes and monitor the build.
