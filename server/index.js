import express from 'express';
import cors from 'cors';
import sqlite3 from 'sqlite3';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { initialValenciaCompanies, initialValenciaIssues, initialValenciaActivities } from './seedData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

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

// Helper for running promises on db
const runQuery = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) reject(err);
      else resolve(this);
    });
  });
};

const allQuery = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

const getQuery = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
};

// Create Database Tables & Initial Migration
db.serialize(async () => {
  // 1. Leads Table (Existing)
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

  // 2. CRM Companies / Directory
  db.run(`
    CREATE TABLE IF NOT EXISTS crm_companies (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      legalName TEXT,
      industry TEXT NOT NULL DEFAULT 'Tecnología & Servicios',
      contactName TEXT NOT NULL,
      contactRole TEXT DEFAULT 'Decisor Principal',
      email TEXT NOT NULL,
      phone TEXT,
      website TEXT,
      status TEXT NOT NULL DEFAULT 'lead',
      estimatedValue REAL DEFAULT 0,
      assignedTo TEXT NOT NULL DEFAULT 'Atención Público',
      techRequirements TEXT,
      notes TEXT,
      createdAt TEXT NOT NULL,
      updatedAt TEXT NOT NULL
    )
  `);

  // 3. CRM Activities / Commercial Log
  db.run(`
    CREATE TABLE IF NOT EXISTS crm_activities (
      id TEXT PRIMARY KEY,
      companyId TEXT NOT NULL,
      type TEXT NOT NULL DEFAULT 'note',
      summary TEXT NOT NULL,
      details TEXT,
      author TEXT NOT NULL,
      nextAction TEXT,
      nextActionDate TEXT,
      createdAt TEXT NOT NULL,
      FOREIGN KEY (companyId) REFERENCES crm_companies(id) ON DELETE CASCADE
    )
  `);

  // 4. Jira Issues (Board & Backlog)
  db.run(`
    CREATE TABLE IF NOT EXISTS jira_issues (
      id TEXT PRIMARY KEY,
      issueKey TEXT UNIQUE NOT NULL,
      title TEXT NOT NULL,
      description TEXT,
      type TEXT NOT NULL DEFAULT 'task',
      status TEXT NOT NULL DEFAULT 'backlog',
      priority TEXT NOT NULL DEFAULT 'medium',
      companyId TEXT,
      assignedTo TEXT NOT NULL DEFAULT 'Sin Asignar',
      storyPoints INTEGER DEFAULT 3,
      value REAL DEFAULT 0,
      dueDate TEXT,
      tags TEXT,
      createdAt TEXT NOT NULL,
      updatedAt TEXT NOT NULL,
      FOREIGN KEY (companyId) REFERENCES crm_companies(id) ON DELETE SET NULL
    )
  `, async (err) => {
    if (!err) {
      await seedInitialDataIfEmpty();
    }
  });
});

// Seed data generator for Jira & CRM - Valencia 2026 dataset
async function seedInitialDataIfEmpty() {
  try {
    const checkMock = await getQuery("SELECT COUNT(*) as count FROM crm_companies WHERE id LIKE 'comp-%'");
    const checkValencia = await getQuery("SELECT COUNT(*) as count FROM crm_companies WHERE id LIKE 'vlc-%'");

    const hasOldMock = checkMock && checkMock.count > 0;
    const missingValencia = !checkValencia || checkValencia.count === 0;

    if (hasOldMock || missingValencia) {
      console.log('🔄 Old mock data detected or missing Valencia dataset. Purging previous records and applying clean Valencia seed...');
      await runQuery('DELETE FROM jira_issues');
      await runQuery('DELETE FROM crm_activities');
      await runQuery('DELETE FROM crm_companies');
      await runQuery('DELETE FROM leads');
      await runQuery('DELETE FROM lead_notes');

      console.log(`🌱 Seeding ${initialValenciaCompanies.length} Valencia companies...`);
      for (const c of initialValenciaCompanies) {
        await runQuery(`
          INSERT INTO crm_companies (id, name, legalName, industry, contactName, contactRole, email, phone, website, status, estimatedValue, assignedTo, techRequirements, notes, createdAt, updatedAt)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `, [c.id, c.name, c.legalName, c.industry, c.contactName, c.contactRole, c.email, c.phone, c.website, c.status, c.estimatedValue, c.assignedTo, c.techRequirements, c.notes, c.createdAt, c.updatedAt]);
      }

      console.log(`🌱 Seeding initial prospecting activities...`);
      for (const a of initialValenciaActivities) {
        await runQuery(`
          INSERT INTO crm_activities (id, companyId, type, summary, details, author, nextAction, nextActionDate, createdAt)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `, [a.id, a.companyId, a.type, a.summary, a.details, a.author, a.nextAction, a.nextActionDate, a.createdAt]);
      }

      console.log(`🌱 Seeding initial Jira issues in backlog/todo...`);
      for (const iss of initialValenciaIssues) {
        await runQuery(`
          INSERT INTO jira_issues (id, issueKey, title, description, type, status, priority, companyId, assignedTo, storyPoints, value, dueDate, tags, createdAt, updatedAt)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `, [iss.id, iss.issueKey, iss.title, iss.description, iss.type, iss.status, iss.priority, iss.companyId, iss.assignedTo, iss.storyPoints, iss.value, iss.dueDate, iss.tags, iss.createdAt, iss.updatedAt]);
      }

      console.log('✅ Clean Valencia CRM Directory & Jira Suite seed complete!');
    } else {
      console.log('CRM Database already populated with Valencia dataset. Skipping seed.');
    }
  } catch (err) {
    console.error('Error seeding initial Valencia data:', err);
  }
}

// ----------------------------------------------------
// REST API Endpoints
// ----------------------------------------------------

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', database: 'sqlite', timestamp: new Date().toISOString() });
});

// ====================================================
// 1. CRM DIRECTORY ENDPOINTS (/api/crm/companies)
// ====================================================

// GET all companies with activity count & active issues count
app.get('/api/crm/companies', async (req, res) => {
  try {
    const query = `
      SELECT 
        c.*,
        COUNT(DISTINCT a.id) as activitiesCount,
        COUNT(DISTINCT j.id) as issuesCount
      FROM crm_companies c
      LEFT JOIN crm_activities a ON c.id = a.companyId
      LEFT JOIN jira_issues j ON c.id = j.companyId
      GROUP BY c.id
      ORDER BY c.updatedAt DESC
    `;
    const rows = await allQuery(query);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET single company with its activities & linked Jira issues
app.get('/api/crm/companies/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const company = await getQuery('SELECT * FROM crm_companies WHERE id = ?', [id]);
    if (!company) {
      return res.status(404).json({ error: 'Empresa no encontrada' });
    }

    const activities = await allQuery('SELECT * FROM crm_activities WHERE companyId = ? ORDER BY createdAt DESC', [id]);
    const issues = await allQuery('SELECT * FROM jira_issues WHERE companyId = ? ORDER BY createdAt DESC', [id]);

    res.json({
      ...company,
      activities,
      issues: issues.map(iss => ({ ...iss, tags: iss.tags ? JSON.parse(iss.tags) : [] }))
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create new company in CRM
app.post('/api/crm/companies', async (req, res) => {
  try {
    const {
      name,
      legalName,
      industry,
      contactName,
      contactRole,
      email,
      phone,
      website,
      status,
      estimatedValue,
      assignedTo,
      techRequirements,
      notes
    } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: 'Nombre de empresa y correo son obligatorios' });
    }

    const id = 'comp-' + Date.now();
    const now = new Date().toISOString();

    await runQuery(`
      INSERT INTO crm_companies (id, name, legalName, industry, contactName, contactRole, email, phone, website, status, estimatedValue, assignedTo, techRequirements, notes, createdAt, updatedAt)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      id,
      name,
      legalName || '',
      industry || 'Tecnología & Servicios',
      contactName || name,
      contactRole || 'Contacto Comercial',
      email,
      phone || '',
      website || '',
      status || 'lead',
      Number(estimatedValue) || 0,
      assignedTo || 'Atención Público',
      techRequirements || '',
      notes || '',
      now,
      now
    ]);

    const created = await getQuery('SELECT * FROM crm_companies WHERE id = ?', [id]);
    res.status(201).json(created);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT update company in CRM
app.put('/api/crm/companies/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      legalName,
      industry,
      contactName,
      contactRole,
      email,
      phone,
      website,
      status,
      estimatedValue,
      assignedTo,
      techRequirements,
      notes
    } = req.body;

    const now = new Date().toISOString();

    await runQuery(`
      UPDATE crm_companies SET
        name = COALESCE(?, name),
        legalName = COALESCE(?, legalName),
        industry = COALESCE(?, industry),
        contactName = COALESCE(?, contactName),
        contactRole = COALESCE(?, contactRole),
        email = COALESCE(?, email),
        phone = COALESCE(?, phone),
        website = COALESCE(?, website),
        status = COALESCE(?, status),
        estimatedValue = COALESCE(?, estimatedValue),
        assignedTo = COALESCE(?, assignedTo),
        techRequirements = COALESCE(?, techRequirements),
        notes = COALESCE(?, notes),
        updatedAt = ?
      WHERE id = ?
    `, [
      name, legalName, industry, contactName, contactRole, email, phone, website,
      status, estimatedValue !== undefined ? Number(estimatedValue) : null, assignedTo, techRequirements, notes,
      now, id
    ]);

    const updated = await getQuery('SELECT * FROM crm_companies WHERE id = ?', [id]);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE company
app.delete('/api/crm/companies/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await runQuery('DELETE FROM crm_companies WHERE id = ?', [id]);
    res.json({ success: true, id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Activities for a Company
app.get('/api/crm/companies/:id/activities', async (req, res) => {
  try {
    const { id } = req.params;
    const activities = await allQuery('SELECT * FROM crm_activities WHERE companyId = ? ORDER BY createdAt DESC', [id]);
    res.json(activities);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/crm/companies/:id/activities', async (req, res) => {
  try {
    const { id: companyId } = req.params;
    const { type, summary, details, author, nextAction, nextActionDate } = req.body;

    if (!summary || !author) {
      return res.status(400).json({ error: 'Resumen y autor son obligatorios' });
    }

    const id = 'act-' + Date.now();
    const now = new Date().toISOString();

    await runQuery(`
      INSERT INTO crm_activities (id, companyId, type, summary, details, author, nextAction, nextActionDate, createdAt)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [id, companyId, type || 'note', summary, details || '', author, nextAction || '', nextActionDate || null, now]);

    // Touch company updatedAt
    await runQuery('UPDATE crm_companies SET updatedAt = ? WHERE id = ?', [now, companyId]);

    const created = await getQuery('SELECT * FROM crm_activities WHERE id = ?', [id]);
    res.status(201).json(created);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ====================================================
// 2. JIRA ISSUES ENDPOINTS (/api/jira/issues)
// ====================================================

// GET all Jira issues (Tablero y Backlog) with company info
app.get('/api/jira/issues', async (req, res) => {
  try {
    const query = `
      SELECT 
        j.*,
        c.name as companyName,
        c.contactName as companyContactName,
        c.phone as companyPhone,
        c.email as companyEmail
      FROM jira_issues j
      LEFT JOIN crm_companies c ON j.companyId = c.id
      ORDER BY 
        CASE j.priority
          WHEN 'highest' THEN 1
          WHEN 'high' THEN 2
          WHEN 'medium' THEN 3
          WHEN 'low' THEN 4
          ELSE 5
        END,
        j.updatedAt DESC
    `;
    const rows = await allQuery(query);
    const parsed = rows.map(r => ({
      ...r,
      tags: r.tags ? JSON.parse(r.tags) : []
    }));
    res.json(parsed);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Helper to generate next Issue Key like IAT-109
async function getNextIssueKey() {
  const last = await getQuery('SELECT issueKey FROM jira_issues ORDER BY ROWID DESC LIMIT 1');
  if (!last || !last.issueKey) return 'IAT-101';
  const match = last.issueKey.match(/IAT-(\d+)/);
  if (!match) return 'IAT-101';
  const nextNum = parseInt(match[1], 10) + 1;
  return `IAT-${nextNum}`;
}

// POST create new Jira issue
app.post('/api/jira/issues', async (req, res) => {
  try {
    const {
      title,
      description,
      type,
      status,
      priority,
      companyId,
      assignedTo,
      storyPoints,
      value,
      dueDate,
      tags
    } = req.body;

    if (!title) {
      return res.status(400).json({ error: 'El título de la incidencia es obligatorio' });
    }

    const id = 'iss-' + Date.now();
    const issueKey = await getNextIssueKey();
    const now = new Date().toISOString();

    await runQuery(`
      INSERT INTO jira_issues (id, issueKey, title, description, type, status, priority, companyId, assignedTo, storyPoints, value, dueDate, tags, createdAt, updatedAt)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      id,
      issueKey,
      title,
      description || '',
      type || 'task',
      status || 'backlog',
      priority || 'medium',
      companyId || null,
      assignedTo || 'Sin Asignar',
      storyPoints !== undefined ? Number(storyPoints) : 3,
      value !== undefined ? Number(value) : 0,
      dueDate || null,
      JSON.stringify(Array.isArray(tags) ? tags : []),
      now,
      now
    ]);

    const created = await getQuery(`
      SELECT j.*, c.name as companyName 
      FROM jira_issues j 
      LEFT JOIN crm_companies c ON j.companyId = c.id 
      WHERE j.id = ?
    `, [id]);

    res.status(201).json({ ...created, tags: created.tags ? JSON.parse(created.tags) : [] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT update issue
app.put('/api/jira/issues/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      type,
      status,
      priority,
      companyId,
      assignedTo,
      storyPoints,
      value,
      dueDate,
      tags
    } = req.body;

    const now = new Date().toISOString();

    await runQuery(`
      UPDATE jira_issues SET
        title = COALESCE(?, title),
        description = COALESCE(?, description),
        type = COALESCE(?, type),
        status = COALESCE(?, status),
        priority = COALESCE(?, priority),
        companyId = COALESCE(?, companyId),
        assignedTo = COALESCE(?, assignedTo),
        storyPoints = COALESCE(?, storyPoints),
        value = COALESCE(?, value),
        dueDate = COALESCE(?, dueDate),
        tags = COALESCE(?, tags),
        updatedAt = ?
      WHERE id = ?
    `, [
      title,
      description,
      type,
      status,
      priority,
      companyId,
      assignedTo,
      storyPoints !== undefined ? Number(storyPoints) : null,
      value !== undefined ? Number(value) : null,
      dueDate,
      tags ? JSON.stringify(tags) : null,
      now,
      id
    ]);

    const updated = await getQuery(`
      SELECT j.*, c.name as companyName 
      FROM jira_issues j 
      LEFT JOIN crm_companies c ON j.companyId = c.id 
      WHERE j.id = ?
    `, [id]);

    res.json({ ...updated, tags: updated.tags ? JSON.parse(updated.tags) : [] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PATCH change status (mover entre columnas o al backlog)
app.patch('/api/jira/issues/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const now = new Date().toISOString();

    await runQuery('UPDATE jira_issues SET status = ?, updatedAt = ? WHERE id = ?', [status, now, id]);
    res.json({ success: true, id, status });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PATCH change assignee
app.patch('/api/jira/issues/:id/assign', async (req, res) => {
  try {
    const { id } = req.params;
    const { assignedTo } = req.body;
    const now = new Date().toISOString();

    await runQuery('UPDATE jira_issues SET assignedTo = ?, updatedAt = ? WHERE id = ?', [assignedTo, now, id]);
    res.json({ success: true, id, assignedTo });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE Jira issue
app.delete('/api/jira/issues/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await runQuery('DELETE FROM jira_issues WHERE id = ?', [id]);
    res.json({ success: true, id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ====================================================
// 3. LEGACY LEADS ENDPOINTS (With Auto-Sync to CRM & Jira)
// ====================================================

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

// POST create lead (from public contact form -> also feeds CRM & Backlog)
app.post('/api/leads', async (req, res) => {
  const { name, email, company, phone, service, message } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and Email are required' });
  }

  const id = 'lead-' + Date.now();
  const status = 'nuevo';
  const assignedTo = 'Atención Público';
  const createdAt = new Date().toISOString();

  try {
    // 1. Insert in legacy leads table
    await runQuery(`
      INSERT INTO leads (id, name, email, company, phone, service, message, status, assignedTo, createdAt)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [id, name, email, company || '', phone || '', service, message || '', status, assignedTo, createdAt]);

    // 2. Automatically feed/update CRM Directory
    const companyName = (company && company.trim()) ? company.trim() : `Particular - ${name}`;
    let crmComp = await getQuery('SELECT id FROM crm_companies WHERE email = ? OR name = ?', [email, companyName]);
    let companyId = crmComp ? crmComp.id : null;

    if (!companyId) {
      companyId = 'comp-' + Date.now();
      await runQuery(`
        INSERT INTO crm_companies (id, name, legalName, industry, contactName, contactRole, email, phone, website, status, estimatedValue, assignedTo, techRequirements, notes, createdAt, updatedAt)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `, [
        companyId,
        companyName,
        companyName,
        'Tecnología & Servicios',
        name,
        'Interesado Web',
        email,
        phone || '',
        '',
        'lead',
        1500,
        assignedTo,
        `Servicio solicitado: ${service}`,
        `Mensaje inicial: "${message || 'Sin mensaje'}"`,
        createdAt,
        createdAt
      ]);
    }

    // 3. Automatically generate a Lead Issue in Jira Backlog
    const issueKey = await getNextIssueKey();
    const issueId = 'iss-' + Date.now();
    await runQuery(`
      INSERT INTO jira_issues (id, issueKey, title, description, type, status, priority, companyId, assignedTo, storyPoints, value, dueDate, tags, createdAt, updatedAt)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      issueId,
      issueKey,
      `Consulta Web: ${service} - ${name}`,
      `Mensaje recibido: "${message || 'Sin mensaje adicional'}". Teléfono: ${phone || 'N/A'}, Email: ${email}`,
      'lead',
      'backlog', // Entra al Backlog para triaje
      'high',
      companyId,
      assignedTo,
      2,
      1500,
      new Date(Date.now() + 2 * 86400000).toISOString(),
      JSON.stringify(['Web Lead', service]),
      createdAt,
      createdAt
    ]);

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
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
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

// Serve Static Production Assets in Container
const distDir = path.join(__dirname, '../dist');
if (fs.existsSync(distDir)) {
  console.log('Serving production static frontend from:', distDir);
  app.use(express.static(distDir));
  app.use((req, res) => {
    if (!req.path.startsWith('/api')) {
      res.sendFile(path.join(distDir, 'index.html'));
    } else {
      res.status(404).json({ error: 'Endpoint not found' });
    }
  });
}

app.listen(PORT, () => {
  console.log(`iAtomica Database API server running at http://localhost:${PORT}`);
});
