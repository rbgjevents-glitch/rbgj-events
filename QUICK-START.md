# Quick Start Guide - RBGJ Events Mobile App

## 🎯 Goal
Get your app deployed so users can install it on their mobile phones via a shareable link.

## ✅ What's Already Done
- ✅ App renamed to "RBGJ Events"
- ✅ Mobile-optimized design
- ✅ PWA (Progressive Web App) configured
- ✅ All views updated with mobile meta tags
- ✅ Service worker for offline support
- ✅ Deployment configurations ready

## 📋 What You Need to Do

### Step 1: Add Your Logo (5 minutes)

1. **Get your RBGJ Events logo file** (PNG, JPG, or SVG)

2. **Convert to required sizes:**
   - **Option A (Easiest):** Go to https://realfavicongenerator.net/
     - Upload your logo
     - Download the generated icons
     - Copy `android-chrome-192x192.png` → save as `public/icon-192.png`
     - Copy `android-chrome-512x512.png` → save as `public/icon-512.png`
   
   - **Option B:** Use any image editor
     - Resize logo to 192x192 → save as `public/icon-192.png`
     - Resize logo to 512x512 → save as `public/icon-512.png`

3. **Place both files in the `public` folder**

### Step 2: Deploy Your App (10-15 minutes)

**Recommended: Render (Free & Easy)**

1. Go to https://render.com and sign up (use GitHub for easiest setup)

2. Click "New +" → "Web Service"

3. Connect your repository:
   - If using GitHub: Connect your repo
   - Or: Use "Public Git repository" and paste your repo URL

4. Configure:
   - **Name:** `rbgj-events` (or any name)
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`

5. Add Environment Variables:
   - `ADMIN_PASSWORD` = (set your admin password)
   - `SESSION_SECRET` = (generate random string - use: `openssl rand -hex 32`)
   - `NODE_ENV` = `production`

6. Click "Create Web Service"

7. Wait 5-10 minutes for deployment

8. **Your app URL will be:** `https://rbgj-events.onrender.com` (or your custom name)

### Step 3: Share the Link! 🎉

Share your deployment URL with users. They can:
1. Open the link on their mobile browser
2. See "Install" prompt (Android) or use Share → "Add to Home Screen" (iPhone)
3. Install the app on their device

## 🧪 Test Locally First

Before deploying, test locally:

```bash
# 1. Install dependencies
npm install

# 2. Create .env file
echo ADMIN_PASSWORD=your-password > .env
echo SESSION_SECRET=$(openssl rand -hex 32) >> .env

# 3. Add your logo icons (see Step 1)

# 4. Start server
npm start

# 5. Open http://localhost:3000 on your phone (same Wi-Fi)
# 6. Test install functionality
```

## 📱 How Users Install

### Android:
- Open link in Chrome
- Menu (3 dots) → "Install app" or "Add to Home screen"
- Tap "Install"

### iPhone:
- Open link in Safari
- Share button → "Add to Home Screen"
- Tap "Add"

## 🆘 Need Help?

- **Logo setup:** See [LOGO-SETUP.md](./LOGO-SETUP.md)
- **Deployment details:** See [DEPLOYMENT.md](./DEPLOYMENT.md)
- **Full documentation:** See [README.md](./README.md)

## ✨ That's It!

Once deployed, you'll have a shareable link that works on all mobile devices. Users can install your app just like a native mobile app!

---

**Next Steps:**
1. ✅ Add logo icons
2. ✅ Deploy to Render (or another platform)
3. ✅ Share the link with users
4. 🎉 Done!


