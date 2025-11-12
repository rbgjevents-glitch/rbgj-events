# Deploy RBGJ Events App - Get Your Shareable Link

This guide will help you deploy your app so you can share a link with users who can install it on their mobile devices.

## Quick Deploy Options

### Option 1: Render (Recommended - Free Tier Available)

1. **Sign up/Login:**
   - Go to: https://render.com
   - Sign up with GitHub (recommended) or email

2. **Create New Web Service:**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository (or use "Public Git repository")
   - Or use "Deploy an existing image" if you have Docker

3. **Configure:**
   - **Name:** `rbgj-events` (or any name you like)
   - **Region:** Choose closest to your users
   - **Branch:** `main` or `master`
   - **Root Directory:** Leave empty (or `.` if needed)
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`

4. **Environment Variables:**
   - Add these in the "Environment" section:
     - `NODE_ENV` = `production`
     - `PORT` = `10000` (Render sets this automatically, but good to have)
     - `SESSION_SECRET` = (generate a random string, e.g., use: `openssl rand -hex 32`)
     - `ADMIN_PASSWORD` = (set your admin password)

5. **Deploy:**
   - Click "Create Web Service"
   - Wait for deployment (5-10 minutes)
   - Your app will be live at: `https://rbgj-events.onrender.com` (or your custom domain)

6. **Share the Link:**
   - Share: `https://your-app-name.onrender.com`
   - Users can open this link on their mobile browser
   - They'll see an "Install" or "Add to Home Screen" option

---

### Option 2: Railway (Easy & Fast)

1. **Sign up:**
   - Go to: https://railway.app
   - Sign up with GitHub

2. **New Project:**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository

3. **Configure:**
   - Railway auto-detects Node.js
   - Add environment variables:
     - `ADMIN_PASSWORD` = (your admin password)
     - `SESSION_SECRET` = (random string)
   - Click "Deploy"

4. **Get Your Link:**
   - Railway provides a URL like: `https://your-app.up.railway.app`
   - Share this link with users

---

### Option 3: Vercel (For Frontend + API)

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Deploy:**
   ```bash
   vercel
   ```
   - Follow the prompts
   - Add environment variables when asked

3. **Get Your Link:**
   - Vercel provides: `https://your-app.vercel.app`

---

### Option 4: Heroku (Classic Option)

1. **Install Heroku CLI:**
   - Download from: https://devcenter.heroku.com/articles/heroku-cli

2. **Login & Create App:**
   ```bash
   heroku login
   heroku create rbgj-events
   ```

3. **Set Environment Variables:**
   ```bash
   heroku config:set ADMIN_PASSWORD=your-password
   heroku config:set SESSION_SECRET=$(openssl rand -hex 32)
   ```

4. **Deploy:**
   ```bash
   git push heroku main
   ```

5. **Get Your Link:**
   - Your app: `https://rbgj-events.herokuapp.com`

---

## After Deployment

### 1. Test Your App
- Open the deployed URL on your mobile phone
- Test login/registration
- Test event viewing

### 2. Install as App (For You)
- **Android:** Chrome menu → "Install app" or "Add to Home screen"
- **iPhone:** Safari Share button → "Add to Home Screen"

### 3. Share with Users
Share the deployment URL. Users can:
1. Open the link on their mobile browser
2. See the "Install" prompt (Android) or use Share → "Add to Home Screen" (iPhone)
3. Install the app on their device

### 4. Custom Domain (Optional)
- Most platforms allow custom domains
- Add your domain in platform settings
- Update DNS records as instructed

---

## Important Notes

### Before Deploying:
- ✅ Add your logo icons (`icon-192.png` and `icon-512.png` in `public` folder)
- ✅ Set a strong `ADMIN_PASSWORD` in environment variables
- ✅ Set a secure `SESSION_SECRET` (random string)
- ✅ Test locally first: `npm start`

### Security:
- Never commit `.env` file to Git
- Use strong passwords
- Enable HTTPS (all platforms provide this automatically)

### Database:
- The app uses SQLite (local file database)
- For production, consider migrating to PostgreSQL (Render/Railway provide free PostgreSQL)
- Current setup works but SQLite file may reset on redeploy

---

## Troubleshooting

### App not installing?
- Check that `manifest.json` is accessible: `https://your-app.com/manifest.json`
- Check browser console for errors
- Ensure icons exist and are accessible

### Database issues?
- SQLite file may reset on redeploy
- Consider using a persistent database (PostgreSQL) for production

### Need help?
- Check platform-specific documentation
- Most platforms have support forums

---

## Quick Start Commands

```bash
# Test locally first
npm start

# Then deploy using your chosen platform
# Follow the platform-specific instructions above
```

**Your shareable link will be ready in 5-10 minutes!** 🚀


