# RBGJ Events - Mobile App

A Progressive Web App (PWA) for managing and viewing college events. Users can install it on their mobile devices and use it like a native app.

## Features

- 📱 **Mobile-First Design** - Optimized for mobile devices
- 🔐 **User Registration & Login** - Simple email-based authentication
- 📅 **Event Management** - View upcoming events with details
- 👨‍💼 **Admin Panel** - Create, edit, and delete events
- 📸 **Image Upload** - Add images to events
- 🚀 **Installable PWA** - Install on mobile devices as a native app
- 📴 **Offline Support** - Basic offline functionality with service workers

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Environment Variables
Create a `.env` file:
```
ADMIN_PASSWORD=your-secure-password
SESSION_SECRET=your-random-secret-key
PORT=3000
```

### 3. Add Your Logo
See [LOGO-SETUP.md](./LOGO-SETUP.md) for instructions on adding your RBGJ Events logo as app icons.

### 4. Run Locally
```bash
npm start
```

The app will be available at `http://localhost:3000`

## Deploy to Get Shareable Link

To share your app with users so they can install it on their phones, deploy it to a cloud platform.

**See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.**

Quick options:
- **Render** (Recommended): Free tier, easy setup
- **Railway**: Fast deployment
- **Vercel**: Great for frontend apps
- **Heroku**: Classic option

After deployment, you'll get a URL like: `https://your-app.onrender.com`

Share this URL with users - they can open it on their mobile browser and install the app!

## How Users Install on Mobile

### Android (Chrome):
1. Open the app URL in Chrome
2. Tap menu (3 dots) → "Install app" or "Add to Home screen"
3. Tap "Install"
4. App icon appears on home screen

### iPhone/iPad (Safari):
1. Open the app URL in Safari
2. Tap Share button (square with arrow)
3. Scroll down → "Add to Home Screen"
4. Tap "Add"
5. App icon appears on home screen

## Project Structure

```
college-events-app/
├── app.js              # Main server file
├── db.js               # Database operations
├── views/              # EJS templates
│   ├── events.ejs
│   ├── login.ejs
│   └── admin/
├── public/             # Static files
│   ├── styles.css
│   ├── manifest.json   # PWA manifest
│   ├── sw.js          # Service worker
│   └── icon-*.png     # App icons (add these)
├── uploads/            # Event images
└── events.db           # SQLite database
```

## Environment Variables

- `ADMIN_PASSWORD` - Password for admin login (required)
- `SESSION_SECRET` - Secret key for sessions (required)
- `PORT` - Server port (default: 3000)

## Technology Stack

- **Backend**: Node.js, Express
- **Database**: SQLite (better-sqlite3)
- **Templates**: EJS
- **PWA**: Service Workers, Web App Manifest
- **Styling**: CSS (mobile-first)

## Security Features

- XSS protection
- Rate limiting
- Helmet.js security headers
- Input validation (Joi)
- File upload restrictions

## License

© 2024 RBGJ Events


