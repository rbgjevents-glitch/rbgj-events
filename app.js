require('dotenv').config();
const express = require('express');
const path = require('path');
const fs = require('fs');
const helmet = require('helmet');
const session = require('express-session');
const rateLimit = require('express-rate-limit');
const methodOverride = require('method-override');
const morgan = require('morgan');
const multer = require('multer');
const Joi = require('joi');
const xss = require('xss');
const { createUser, getUserByEmail, getAllUsers, getAllEvents, getEventById, createEvent, updateEvent, deleteEvent, createRegistration, getRegistrations } = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin';
const SESSION_SECRET = process.env.SESSION_SECRET || 'dev-secret';

app.use(helmet());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(morgan('dev'));

app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { httpOnly: true, sameSite: 'lax' }
  })
);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use('/public', express.static(path.join(__dirname, 'public')));

// Serve manifest.json
app.get('/manifest.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.sendFile(path.join(__dirname, 'public', 'manifest.json'));
});

// Serve service worker
app.get('/sw.js', (req, res) => {
  res.setHeader('Content-Type', 'application/javascript');
  res.sendFile(path.join(__dirname, 'public', 'sw.js'));
});

app.get('/public/sw.js', (req, res) => {
  res.setHeader('Content-Type', 'application/javascript');
  res.sendFile(path.join(__dirname, 'public', 'sw.js'));
});

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}
app.use('/uploads', express.static(uploadsDir));

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'event-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    if (extname && mimetype) {
      return cb(null, true);
    }
    cb(new Error('Only image files are allowed (jpeg, jpg, png, gif, webp)'));
  }
});

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 120
});
app.use(limiter);

function requireAdmin(req, res, next) {
  if (req.session && req.session.isAdmin) return next();
  return res.redirect('/admin/login');
}

function requireUser(req, res, next) {
  if (req.session && req.session.userId) return next();
  return res.redirect('/login');
}

function sanitize(str) {
  return xss(str ?? '');
}

const JoiDate = /^\d{4}-\d{2}-\d{2}$/;
const JoiTime = /^\d{2}:\d{2}$/;

const eventSchema = Joi.object({
  name: Joi.string().min(3).max(200).required(),
  date: Joi.string().regex(JoiDate).required(),
  time: Joi.string().regex(JoiTime).required(),
  location: Joi.string().min(2).max(200).required(),
  event_type: Joi.string().min(2).max(100).required(),
  description: Joi.string().min(3).max(2000).required(),
  image: Joi.string().allow('').max(500).optional()
});

const userSchema = Joi.object({
  name: Joi.string().min(2).max(200).required(),
  email: Joi.string().email().max(320).required()
});

app.get('/', (req, res) => {
  if (req.session && req.session.userId) {
    return res.redirect('/events');
  }
  return res.redirect('/login');
});

app.get('/login', (req, res) => {
  if (req.session && req.session.userId) {
    return res.redirect('/events');
  }
  res.render('login', { title: 'Login / Register', error: null });
});

app.post('/register', (req, res) => {
  const payload = {
    name: sanitize(req.body.name),
    email: sanitize(req.body.email)
  };
  const { error } = userSchema.validate(payload);
  if (error) {
    return res.status(400).render('login', { title: 'Login / Register', error: `Invalid data: ${error.message}` });
  }
  
  const result = createUser(payload.name, payload.email);
  if (!result) {
    return res.status(400).render('login', { title: 'Login / Register', error: 'Email already registered. Please login instead.' });
  }
  
  req.session.userId = result.lastInsertRowid;
  req.session.userName = payload.name;
  req.session.userEmail = payload.email;
  res.redirect('/events');
});

app.post('/login', (req, res) => {
  const email = sanitize(req.body.email);
  if (!email) {
    return res.status(400).render('login', { title: 'Login / Register', error: 'Email is required' });
  }
  
  const user = getUserByEmail(email);
  if (!user) {
    return res.status(401).render('login', { title: 'Login / Register', error: 'Email not found. Please register first.' });
  }
  
  req.session.userId = user.id;
  req.session.userName = user.name;
  req.session.userEmail = user.email;
  res.redirect('/events');
});

app.post('/logout', (req, res) => {
  req.session.destroy(() => res.redirect('/login'));
});

app.get('/events', requireUser, (req, res) => {
  const events = getAllEvents();
  res.render('events', { title: 'Upcoming Events', events, userName: req.session.userName });
});

app.get('/admin/login', (req, res) => {
  if (req.session.isAdmin) return res.redirect('/admin/events');
  res.render('admin/login', { title: 'Admin Login', error: null });
});

app.post('/admin/login', (req, res) => {
  const password = req.body.password || '';
  if (password === ADMIN_PASSWORD) {
    req.session.isAdmin = true;
    return res.redirect('/admin/events');
  }
  res.status(401).render('admin/login', { title: 'Admin Login', error: 'Invalid password' });
});

app.post('/admin/logout', requireAdmin, (req, res) => {
  req.session.destroy(() => res.redirect('/admin/login'));
});

app.get('/admin/events', requireAdmin, (req, res) => {
  const events = getAllEvents();
  res.render('admin/events', { title: 'Manage Events', events, editing: null });
});

app.post('/admin/events', requireAdmin, upload.single('image'), (req, res) => {
  const payload = {
    name: sanitize(req.body.name),
    date: sanitize(req.body.date),
    time: sanitize(req.body.time),
    location: sanitize(req.body.location),
    event_type: sanitize(req.body.event_type),
    description: sanitize(req.body.description),
    image: req.file ? `/uploads/${req.file.filename}` : ''
  };
  const { error } = eventSchema.validate(payload);
  if (error) {
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    return res.status(400).send(`Invalid event: ${error.message}`);
  }
  createEvent(payload);
  res.redirect('/admin/events');
});

app.post('/admin/events/:id', requireAdmin, upload.single('image'), (req, res) => {
  const id = Number(req.params.id);
  const existingEvent = getEventById(id);
  
  let imagePath = existingEvent ? (existingEvent.image || '') : '';
  
  // If new file uploaded, use it and delete old file if exists
  if (req.file) {
    // Delete old image if it exists and is a local file
    if (imagePath && imagePath.startsWith('/uploads/')) {
      const oldFilePath = path.join(__dirname, imagePath);
      if (fs.existsSync(oldFilePath)) {
        fs.unlinkSync(oldFilePath);
      }
    }
    imagePath = `/uploads/${req.file.filename}`;
  }
  
  const payload = {
    name: sanitize(req.body.name),
    date: sanitize(req.body.date),
    time: sanitize(req.body.time),
    location: sanitize(req.body.location),
    event_type: sanitize(req.body.event_type),
    description: sanitize(req.body.description),
    image: imagePath
  };
  const { error } = eventSchema.validate(payload);
  if (error) {
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    return res.status(400).send(`Invalid event: ${error.message}`);
  }
  updateEvent(id, payload);
  res.redirect('/admin/events');
});

app.post('/admin/events/:id/delete', requireAdmin, (req, res) => {
  const id = Number(req.params.id);
  const event = getEventById(id);
  
  // Delete associated image file if it exists
  if (event && event.image && event.image.startsWith('/uploads/')) {
    const imagePath = path.join(__dirname, event.image);
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }
  }
  
  deleteEvent(id);
  res.redirect('/admin/events');
});

app.get('/admin/registrations', requireAdmin, (req, res) => {
  const regs = getRegistrations();
  res.render('admin/registrations', { title: 'Registrations', registrations: regs });
});

app.use((req, res) => res.status(404).send('Not found'));

app.listen(PORT, '0.0.0.0', () => {
  const os = require('os');
  const networkInterfaces = os.networkInterfaces();
  let ipAddress = 'localhost';
  
  // Find the first non-internal IPv4 address
  for (const interfaceName in networkInterfaces) {
    const addresses = networkInterfaces[interfaceName];
    for (const address of addresses) {
      if (address.family === 'IPv4' && !address.internal) {
        ipAddress = address.address;
        break;
      }
    }
    if (ipAddress !== 'localhost') break;
  }
  
  console.log(`\n✅ Server running!`);
  console.log(`📱 Local:    http://localhost:${PORT}`);
  console.log(`🌐 Network: http://${ipAddress}:${PORT}`);
  console.log(`\n💡 To access from your phone, use: http://${ipAddress}:${PORT}\n`);
});