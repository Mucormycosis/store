require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Products API
app.get('/api/products', (req, res) => {
  const { cat, q } = req.query;
  let sql = 'SELECT * FROM products';
  const params = [];
  const conds = [];
  if (cat && cat !== 'all') { conds.push('cat_slug = ?'); params.push(cat); }
  if (q) { conds.push('title LIKE ?'); params.push('%' + q + '%'); }
  if (conds.length) sql += ' WHERE ' + conds.join(' AND ');
  const rows = db.prepare(sql).all(...params);
  res.json(rows);
});

app.get('/api/products/:id', (req, res) => {
  const row = db.prepare('SELECT * FROM products WHERE id = ?').get(req.params.id);
  if (!row) return res.status(404).json({ error: 'Not found' });
  res.json(row);
});

const authRoutes = require('./routes/auth');
const { authenticate, requireAdmin } = require('./middleware/auth');

app.use('/api/auth', authRoutes);

app.get('/api/health', (req, res) => res.json({ ok: true }));

app.listen(PORT, () => console.log('Server running on http://localhost:' + PORT));
