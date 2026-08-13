import express from 'express';
import cors from 'cors';
import sqlite3 from 'sqlite3';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Database Directory Setup
const dbDir = path.join(__dirname, 'data');
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const dbPath = path.join(dbDir, 'iatomica.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening SQLite database:', err.message);
  } else {
    console.log('Connected to SQLite database at:', dbPath);
  }
});

// Create Database Tables
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS leads (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      company TEXT,
      phone TEXT,
      service TEXT NOT NULL,
      message TEXT,
      status TEXT NOT NULL DEFAULT 'nuevo',
      assignedTo TEXT NOT NULL DEFAULT 'Atención Público',
      createdAt TEXT NOT NULL
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS lead_notes (
      id TEXT PRIMARY KEY,
      lead_id TEXT NOT NULL,
      author TEXT NOT NULL,
      text TEXT NOT NULL,
      timestamp TEXT NOT NULL,
      FOREIGN KEY (lead_id) REFERENCES leads(id) ON DELETE CASCADE
    )
  `);
});

// REST API Endpoints

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', database: 'sqlite', timestamp: new Date().toISOString() });
});

// GET all leads with their notes
app.get('/api/leads', (req, res) => {
  const query = `
    SELECT 
      l.id, l.name, l.email, l.company, l.phone, l.service, l.message, l.status, l.assignedTo, l.createdAt,
      n.id as note_id, n.author as note_author, n.text as note_text, n.timestamp as note_timestamp
    FROM leads l
    LEFT JOIN lead_notes n ON l.id = n.lead_id
    ORDER BY l.createdAt DESC, n.timestamp ASC
  `;

  db.all(query, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    const leadsMap = new Map();

    rows.forEach(r => {
      if (!leadsMap.has(r.id)) {
        leadsMap.set(r.id, {
          id: r.id,
          name: r.name,
          email: r.email,
          company: r.company || '',
          phone: r.phone || '',
          service: r.service,
          message: r.message || '',
          status: r.status,
          assignedTo: r.assignedTo,
          createdAt: r.createdAt,
          notes: []
        });
      }

      if (r.note_id) {
        const lead = leadsMap.get(r.id);
        lead.notes.push({
          id: r.note_id,
          author: r.note_author,
          text: r.note_text,
          timestamp: r.note_timestamp
        });
      }
    });

    res.json(Array.from(leadsMap.values()));
  });
});

// POST create lead
app.post('/api/leads', (req, res) => {
  const { name, email, company, phone, service, message } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and Email are required' });
  }

  const id = 'lead-' + Date.now();
  const status = 'nuevo';
  const assignedTo = 'Atención Público';
  const createdAt = new Date().toISOString();

  const stmt = db.prepare(`
    INSERT INTO leads (id, name, email, company, phone, service, message, status, assignedTo, createdAt)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  stmt.run([id, name, email, company || '', phone || '', service, message || '', status, assignedTo, createdAt], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    const newLead = {
      id,
      name,
      email,
      company: company || '',
      phone: phone || '',
      service,
      message: message || '',
      status,
      assignedTo,
      createdAt,
      notes: []
    };

    res.status(201).json(newLead);
  });
  stmt.finalize();
});

// PUT update lead status
app.put('/api/leads/:id/status', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  db.run(`UPDATE leads SET status = ? WHERE id = ?`, [status, id], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ success: true, id, status });
  });
});

// PUT assign lead role
app.put('/api/leads/:id/assign', (req, res) => {
  const { id } = req.params;
  const { assignedTo } = req.body;

  db.run(`UPDATE leads SET assignedTo = ? WHERE id = ?`, [assignedTo, id], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ success: true, id, assignedTo });
  });
});

// POST add lead note
app.post('/api/leads/:id/notes', (req, res) => {
  const { id: lead_id } = req.params;
  const { text, author } = req.body;

  if (!text || !author) {
    return res.status(400).json({ error: 'Text and Author are required' });
  }

  const note_id = 'note-' + Date.now();
  const timestamp = new Date().toISOString();

  const stmt = db.prepare(`
    INSERT INTO lead_notes (id, lead_id, author, text, timestamp)
    VALUES (?, ?, ?, ?, ?)
  `);

  stmt.run([note_id, lead_id, author, text, timestamp], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: note_id, lead_id, author, text, timestamp });
  });
  stmt.finalize();
});

// DELETE lead
app.delete('/api/leads/:id', (req, res) => {
  const { id } = req.params;

  db.run(`DELETE FROM leads WHERE id = ?`, [id], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ success: true, id });
  });
});

app.listen(PORT, () => {
  console.log(`iAtomica Database API server running at http://localhost:${PORT}`);
});
