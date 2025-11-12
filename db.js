const Database = require('better-sqlite3');
const db = new Database('events.db');

function migrate() {
  db.exec(`
    PRAGMA foreign_keys = ON;

    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      date TEXT NOT NULL,
      time TEXT NOT NULL,
      location TEXT NOT NULL,
      event_type TEXT NOT NULL,
      description TEXT NOT NULL,
      image TEXT,
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS registrations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      event_id INTEGER NOT NULL,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      created_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE
    );

    CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
    CREATE INDEX IF NOT EXISTS idx_registrations_event_id ON registrations(event_id);
  `);
}

migrate();

// Add image column to existing events table if it doesn't exist
try {
  const tableInfo = db.prepare(`PRAGMA table_info(events)`).all();
  const hasImageColumn = tableInfo.some(col => col.name === 'image');
  if (!hasImageColumn) {
    db.exec(`ALTER TABLE events ADD COLUMN image TEXT`);
  }
} catch (err) {
  // Table might not exist yet, that's okay
}

module.exports = {
  db,
  createUser: (name, email) => {
    try {
      return db.prepare(`INSERT INTO users (name, email) VALUES (?, ?)`).run(name, email);
    } catch (err) {
      if (err.code === 'SQLITE_CONSTRAINT_UNIQUE') {
        return null; // Email already exists
      }
      throw err;
    }
  },
  getUserByEmail: (email) =>
    db.prepare(`SELECT * FROM users WHERE email = ?`).get(email),
  getAllUsers: () =>
    db.prepare(`SELECT * FROM users ORDER BY created_at DESC`).all(),
  getAllEvents: () =>
    db.prepare(`SELECT * FROM events ORDER BY date ASC, time ASC`).all(),
  getEventById: (id) =>
    db.prepare(`SELECT * FROM events WHERE id = ?`).get(id),
  createEvent: (e) =>
    db
      .prepare(
        `INSERT INTO events (name,date,time,location,event_type,description,image) VALUES (?,?,?,?,?,?,?)`
      )
      .run(e.name, e.date, e.time, e.location, e.event_type, e.description, e.image || null),
  updateEvent: (id, e) =>
    db
      .prepare(
        `UPDATE events SET name=?, date=?, time=?, location=?, event_type=?, description=?, image=?, updated_at=datetime('now') WHERE id=?`
      )
      .run(
        e.name,
        e.date,
        e.time,
        e.location,
        e.event_type,
        e.description,
        e.image || null,
        id
      ),
  deleteEvent: (id) =>
    db.prepare(`DELETE FROM events WHERE id = ?`).run(id),
  createRegistration: (r) =>
    db
      .prepare(
        `INSERT INTO registrations (event_id, name, email) VALUES (?,?,?)`
      )
      .run(r.event_id, r.name, r.email),
  getRegistrations: () =>
    db
      .prepare(
        `SELECT r.*, e.name AS event_name FROM registrations r JOIN events e ON e.id = r.event_id ORDER BY r.created_at DESC`
      )
      .all()
};