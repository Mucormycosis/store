const { DatabaseSync } = require('node:sqlite');
const path = require('path');
const fs = require('fs');

const dbPath = path.join(__dirname, 'store.db');
const db = new DatabaseSync(dbPath);

db.exec(`
CREATE TABLE IF NOT EXISTS products (
  id INTEGER PRIMARY KEY,
  title TEXT NOT NULL,
  price INTEGER NOT NULL,
  old_price INTEGER,
  cat_slug TEXT,
  category TEXT,
  img TEXT,
  stock INTEGER DEFAULT 0
);
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role TEXT DEFAULT 'user',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
`);

// Seed products if empty
const count = db.prepare('SELECT COUNT(*) AS c FROM products').get().c;
if (count === 0) {
  const sql = fs.readFileSync(path.join(__dirname, '..', 'sql', 'store.sql'), 'utf8');
  // execute only INSERT part by running whole file (CREATE IF NOT EXISTS safe)
  db.exec(sql);
}

module.exports = db;
