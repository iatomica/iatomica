import express from 'express';
import cors from 'cors';
import sqlite3 from 'sqlite3';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { 
  initialValenciaCompanies, 
  initialValenciaIssues, 
  initialValenciaActivities,
  initialWebInquiries 
} from './seedData.js';

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
      territory TEXT DEFAULT 'espana',
      dueDate TEXT,
      tags TEXT,
      createdAt TEXT NOT NULL,
      updatedAt TEXT NOT NULL,
      FOREIGN KEY (companyId) REFERENCES crm_companies(id) ON DELETE SET NULL
    )
  `);

  // 5. Ticket Comments & Notes (E2E Collaborative Timeline)
  db.run(`
    CREATE TABLE IF NOT EXISTS ticket_comments (
      id TEXT PRIMARY KEY,
      ticketId TEXT NOT NULL,
      authorId TEXT NOT NULL,
      authorName TEXT NOT NULL,
      content TEXT NOT NULL,
      type TEXT NOT NULL DEFAULT 'note',
      createdAt TEXT NOT NULL,
      FOREIGN KEY (ticketId) REFERENCES jira_issues(id) ON DELETE CASCADE
    )
  `, async (err) => {
    // Migration: add territory column if it didn't exist
    db.run("ALTER TABLE crm_companies ADD COLUMN territory TEXT DEFAULT 'espana'", () => {});
    db.run("ALTER TABLE jira_issues ADD COLUMN territory TEXT DEFAULT 'espana'", () => {});
    db.run("UPDATE crm_companies SET territory = 'espana' WHERE territory IS NULL OR territory = ''");
    db.run("UPDATE jira_issues SET territory = 'espana' WHERE territory IS NULL OR territory = ''");

    if (!err) {
      await seedInitialDataIfEmpty();
      await applyCrmV2Migration();
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

    // Check leads / web inquiries table
    const leadCount = await getQuery('SELECT COUNT(*) as count FROM leads');
    if (leadCount && leadCount.count === 0 && initialWebInquiries && initialWebInquiries.length > 0) {
      console.log('🌱 Seeding initial inbound web inquiries...');
      for (const lead of initialWebInquiries) {
        await runQuery(`
          INSERT INTO leads (id, name, email, company, phone, service, message, status, assignedTo, createdAt)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `, [lead.id, lead.name, lead.email, lead.company || '', lead.phone || '', lead.service, lead.message || '', lead.status, lead.assignedTo, lead.createdAt]);
      }
      console.log('✅ Initial inbound web inquiries seeded!');
    }
  } catch (err) {
    console.error('Error seeding initial Valencia data:', err);
  }
}

// Migration & Normalization for CRM v2
async function applyCrmV2Migration() {
  try {
    const addCompanyCol = (colDef) => new Promise((resolve) => db.run(`ALTER TABLE crm_companies ADD COLUMN ${colDef}`, () => resolve()));
    const addActCol = (colDef) => new Promise((resolve) => db.run(`ALTER TABLE crm_activities ADD COLUMN ${colDef}`, () => resolve()));

    await addCompanyCol("city TEXT DEFAULT 'Valencia'");
    await addCompanyCol("address TEXT");
    await addCompanyCol("whatsapp TEXT");
    await addCompanyCol("instagram TEXT");
    await addCompanyCol("googleRating REAL DEFAULT 0");
    await addCompanyCol("googleReviewsCount INTEGER DEFAULT 0");
    await addCompanyCol("potentialService TEXT DEFAULT 'Página web'");
    await addCompanyCol("lastContactAt TEXT");
    await addCompanyCol("nextAction TEXT");
    await addCompanyCol("nextFollowupAt TEXT");
    await addCompanyCol("legacyData TEXT");
    await addCompanyCol("isDuplicatePossible INTEGER DEFAULT 0");

    await addActCol("channel TEXT DEFAULT 'WhatsApp'");
    await addActCol("result TEXT");

    await runQuery(`
      CREATE TABLE IF NOT EXISTS crm_comments (
        id TEXT PRIMARY KEY,
        companyId TEXT NOT NULL,
        authorId TEXT,
        authorName TEXT NOT NULL,
        comment TEXT NOT NULL,
        createdAt TEXT NOT NULL,
        updatedAt TEXT NOT NULL,
        FOREIGN KEY (companyId) REFERENCES crm_companies(id) ON DELETE CASCADE
      )
    `);

    // Normalization of legacy pipe-separated notes and standard statuses
    const companies = await allQuery('SELECT * FROM crm_companies');
    for (const comp of companies) {
      let needsUpdate = false;
      let newAddress = comp.address;
      let newCity = comp.city || 'Valencia';
      let newWhatsapp = comp.whatsapp;
      let newInstagram = comp.instagram;
      let newWebsite = comp.website;
      let newStatus = comp.status;
      let newPotentialService = comp.potentialService || 'Página web';
      let newLegacyData = comp.legacyData || comp.notes || '';

      const statusMap = {
        'lead': 'A contactar',
        'nuevo': 'Nuevo',
        'a_contactar': 'A contactar',
        'contactado': 'Contactado',
        'respondió': 'Respondió',
        'respondio': 'Respondió',
        'reunión': 'Reunión',
        'reunion': 'Reunión',
        'propuesta': 'Propuesta',
        'negociación': 'Negociación',
        'negociacion': 'Negociación',
        'ganado': 'Ganado',
        'active_client': 'Ganado',
        'vip': 'Ganado',
        'perdido': 'Perdido',
        'descartado': 'Descartado',
        'churn': 'Perdido'
      };
      if (statusMap[comp.status?.toLowerCase()]) {
        newStatus = statusMap[comp.status.toLowerCase()];
        needsUpdate = true;
      }

      if (comp.notes && comp.notes.includes('|')) {
        const parts = comp.notes.split('|').map(p => p.trim());
        for (const part of parts) {
          if (!newAddress && part.startsWith('Dirección:')) {
            newAddress = part.replace('Dirección:', '').trim();
            needsUpdate = true;
          }
          if (!newWhatsapp && (part.includes('WhatsApp disponible:') || part.includes('WhatsApp:'))) {
            const match = part.match(/\+?[0-9\s]{8,25}/);
            if (match) {
              newWhatsapp = match[0].trim();
              needsUpdate = true;
            }
          }
          if (!newInstagram && part.startsWith('Instagram:')) {
            newInstagram = part.replace('Instagram:', '').trim();
            needsUpdate = true;
          }
          if (!newWebsite && part.startsWith('Sitio web existente:')) {
            newWebsite = part.replace('Sitio web existente:', '').trim();
            needsUpdate = true;
          }
        }
      }

      if (!comp.potentialService || comp.potentialService === 'Página web') {
        const combined = ((comp.techRequirements || '') + ' ' + (comp.notes || '')).toLowerCase();
        if (combined.includes('bot') || combined.includes('whatsapp')) newPotentialService = 'Bot WhatsApp';
        else if (combined.includes('automatiz')) newPotentialService = 'Automatización';
        else if (combined.includes('gestión') || combined.includes('erp') || combined.includes('sistema')) newPotentialService = 'Sistema de gestión';
        else if (combined.includes('diseño') || combined.includes('identidad') || combined.includes('branding')) newPotentialService = 'Diseño gráfico';
        else if (combined.includes('redes') || combined.includes('contenido')) newPotentialService = 'Redes / contenido';
        else if (combined.includes('consultoría') || combined.includes('asesoramiento') || combined.includes('estrategia')) newPotentialService = 'Consultoría';
        else newPotentialService = 'Página web';
        needsUpdate = true;
      }

      if (newAddress && (newAddress.includes('València') || newAddress.includes('Valencia'))) {
        newCity = 'Valencia';
      }

      if (needsUpdate || !comp.legacyData) {
        await runQuery(`
          UPDATE crm_companies SET
            address = COALESCE(?, address),
            city = COALESCE(?, city),
            whatsapp = COALESCE(?, whatsapp),
            instagram = COALESCE(?, instagram),
            website = COALESCE(?, website),
            status = COALESCE(?, status),
            potentialService = COALESCE(?, potentialService),
            legacyData = COALESCE(?, legacyData)
          WHERE id = ?
        `, [newAddress, newCity, newWhatsapp, newInstagram, newWebsite, newStatus, newPotentialService, newLegacyData, comp.id]);
      }
    }

    // Sync lastContactAt from activities
    await runQuery(`
      UPDATE crm_companies 
      SET lastContactAt = (
        SELECT MAX(createdAt) FROM crm_activities WHERE crm_activities.companyId = crm_companies.id
      )
      WHERE lastContactAt IS NULL AND id IN (SELECT DISTINCT companyId FROM crm_activities)
    `);

    // Detect duplicates
    const allComps = await allQuery('SELECT id, name, phone, whatsapp, instagram FROM crm_companies');
    const seenPhone = new Map();
    const seenInsta = new Map();
    const seenName = new Map();
    const duplicateIds = new Set();

    for (const c of allComps) {
      const cleanPhone = (c.whatsapp || c.phone || '').replace(/[^0-9]/g, '');
      const cleanInsta = (c.instagram || '').toLowerCase().replace(/[@\s]/g, '');
      const cleanName = (c.name || '').toLowerCase().trim();

      if (cleanPhone && cleanPhone.length > 7) {
        if (seenPhone.has(cleanPhone)) {
          duplicateIds.add(c.id);
          duplicateIds.add(seenPhone.get(cleanPhone));
        } else {
          seenPhone.set(cleanPhone, c.id);
        }
      }

      if (cleanInsta && cleanInsta.length > 3) {
        if (seenInsta.has(cleanInsta)) {
          duplicateIds.add(c.id);
          duplicateIds.add(seenInsta.get(cleanInsta));
        } else {
          seenInsta.set(cleanInsta, c.id);
        }
      }

      if (cleanName && cleanName.length > 4) {
        if (seenName.has(cleanName)) {
          duplicateIds.add(c.id);
          duplicateIds.add(seenName.get(cleanName));
        } else {
          seenName.set(cleanName, c.id);
        }
      }
    }

    await runQuery('UPDATE crm_companies SET isDuplicatePossible = 0');
    for (const dupId of duplicateIds) {
      await runQuery('UPDATE crm_companies SET isDuplicatePossible = 1 WHERE id = ?', [dupId]);
    }

    console.log('✅ CRM v2 Schema & Data Normalization applied successfully!');
  } catch (err) {
    console.error('Error in applyCrmV2Migration:', err);
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

// GET all companies with activity count, active issues count & comments count
app.get('/api/crm/companies', async (req, res) => {
  try {
    const query = `
      SELECT 
        c.*,
        COUNT(DISTINCT a.id) as activitiesCount,
        COUNT(DISTINCT j.id) as issuesCount,
        COUNT(DISTINCT cm.id) as commentsCount
      FROM crm_companies c
      LEFT JOIN crm_activities a ON c.id = a.companyId
      LEFT JOIN jira_issues j ON c.id = j.companyId
      LEFT JOIN crm_comments cm ON c.id = cm.companyId
      GROUP BY c.id
      ORDER BY c.updatedAt DESC
    `;
    const rows = await allQuery(query);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET single company with its activities, comments & linked Jira issues
app.get('/api/crm/companies/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const company = await getQuery('SELECT * FROM crm_companies WHERE id = ?', [id]);
    if (!company) {
      return res.status(404).json({ error: 'Empresa no encontrada' });
    }

    const activities = await allQuery('SELECT * FROM crm_activities WHERE companyId = ? ORDER BY createdAt DESC', [id]);
    const comments = await allQuery('SELECT * FROM crm_comments WHERE companyId = ? ORDER BY createdAt DESC', [id]);
    const issues = await allQuery('SELECT * FROM jira_issues WHERE companyId = ? ORDER BY createdAt DESC', [id]);

    res.json({
      ...company,
      activities,
      comments,
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
      city,
      address,
      contactName,
      contactRole,
      email,
      phone,
      whatsapp,
      instagram,
      website,
      googleRating,
      googleReviewsCount,
      potentialService,
      status,
      estimatedValue,
      assignedTo,
      nextAction,
      nextFollowupAt,
      techRequirements,
      notes
    } = req.body;

    if (!name || (!phone && !whatsapp && !email)) {
      return res.status(400).json({ error: 'El nombre del negocio y al menos una vía de contacto (teléfono/WhatsApp/email) son obligatorios' });
    }

    const id = 'comp-' + Date.now();
    const now = new Date().toISOString();

    await runQuery(`
      INSERT INTO crm_companies (
        id, name, legalName, industry, city, address, contactName, contactRole, email, phone, whatsapp, instagram, website,
        googleRating, googleReviewsCount, potentialService, status, estimatedValue, assignedTo, nextAction, nextFollowupAt,
        techRequirements, notes, legacyData, createdAt, updatedAt
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      id,
      name.trim(),
      legalName ? legalName.trim() : '',
      industry || 'Tecnología & Servicios',
      city ? city.trim() : 'Valencia',
      address ? address.trim() : '',
      contactName ? contactName.trim() : name.trim(),
      contactRole ? contactRole.trim() : 'Decisor Principal',
      email ? email.trim() : '',
      phone ? phone.trim() : '',
      whatsapp ? whatsapp.trim() : (phone ? phone.trim() : ''),
      instagram ? instagram.trim() : '',
      website ? website.trim() : '',
      Number(googleRating) || 0,
      Number(googleReviewsCount) || 0,
      potentialService || 'Página web',
      status || 'Nuevo',
      Number(estimatedValue) || 0,
      assignedTo || 'Lic. Mateo Rossi',
      nextAction ? nextAction.trim() : '',
      nextFollowupAt || null,
      techRequirements || '',
      notes || '',
      '',
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
      city,
      address,
      contactName,
      contactRole,
      email,
      phone,
      whatsapp,
      instagram,
      website,
      googleRating,
      googleReviewsCount,
      potentialService,
      status,
      estimatedValue,
      assignedTo,
      lastContactAt,
      nextAction,
      nextFollowupAt,
      techRequirements,
      notes,
      legacyData,
      isDuplicatePossible
    } = req.body;

    const now = new Date().toISOString();

    await runQuery(`
      UPDATE crm_companies SET
        name = COALESCE(?, name),
        legalName = COALESCE(?, legalName),
        industry = COALESCE(?, industry),
        city = COALESCE(?, city),
        address = COALESCE(?, address),
        contactName = COALESCE(?, contactName),
        contactRole = COALESCE(?, contactRole),
        email = COALESCE(?, email),
        phone = COALESCE(?, phone),
        whatsapp = COALESCE(?, whatsapp),
        instagram = COALESCE(?, instagram),
        website = COALESCE(?, website),
        googleRating = COALESCE(?, googleRating),
        googleReviewsCount = COALESCE(?, googleReviewsCount),
        potentialService = COALESCE(?, potentialService),
        status = COALESCE(?, status),
        estimatedValue = COALESCE(?, estimatedValue),
        assignedTo = COALESCE(?, assignedTo),
        lastContactAt = COALESCE(?, lastContactAt),
        nextAction = COALESCE(?, nextAction),
        nextFollowupAt = COALESCE(?, nextFollowupAt),
        techRequirements = COALESCE(?, techRequirements),
        notes = COALESCE(?, notes),
        legacyData = COALESCE(?, legacyData),
        isDuplicatePossible = COALESCE(?, isDuplicatePossible),
        updatedAt = ?
      WHERE id = ?
    `, [
      name,
      legalName,
      industry,
      city,
      address,
      contactName,
      contactRole,
      email,
      phone,
      whatsapp,
      instagram,
      website,
      googleRating !== undefined ? Number(googleRating) : null,
      googleReviewsCount !== undefined ? Number(googleReviewsCount) : null,
      potentialService,
      status,
      estimatedValue !== undefined ? Number(estimatedValue) : null,
      assignedTo,
      lastContactAt,
      nextAction,
      nextFollowupAt,
      techRequirements,
      notes,
      legacyData,
      isDuplicatePossible !== undefined ? Number(isDuplicatePossible) : null,
      now,
      id
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
    const { type, channel, result, summary, details, author, nextAction, nextActionDate } = req.body;

    if (!summary || !author) {
      return res.status(400).json({ error: 'Resumen y autor son obligatorios' });
    }

    const id = 'act-' + Date.now();
    const now = new Date().toISOString();

    await runQuery(`
      INSERT INTO crm_activities (id, companyId, type, channel, result, summary, details, author, nextAction, nextActionDate, createdAt)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      id,
      companyId,
      type || 'WhatsApp',
      channel || 'WhatsApp',
      result || '',
      summary.trim(),
      details ? details.trim() : '',
      author.trim(),
      nextAction ? nextAction.trim() : '',
      nextActionDate || null,
      now
    ]);

    // Touch company: update updatedAt, lastContactAt, and if provided, nextAction & nextFollowupAt
    await runQuery(`
      UPDATE crm_companies SET
        lastContactAt = ?,
        nextAction = CASE WHEN ? != '' THEN ? ELSE nextAction END,
        nextFollowupAt = CASE WHEN ? IS NOT NULL THEN ? ELSE nextFollowupAt END,
        updatedAt = ?
      WHERE id = ?
    `, [
      now,
      nextAction ? nextAction.trim() : '',
      nextAction ? nextAction.trim() : '',
      nextActionDate || null,
      nextActionDate || null,
      now,
      companyId
    ]);

    const created = await getQuery('SELECT * FROM crm_activities WHERE id = ?', [id]);
    res.status(201).json(created);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Comments & Internal Notes for a Company
app.get('/api/crm/companies/:id/comments', async (req, res) => {
  try {
    const { id } = req.params;
    const comments = await allQuery('SELECT * FROM crm_comments WHERE companyId = ? ORDER BY createdAt DESC', [id]);
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/crm/companies/:id/comments', async (req, res) => {
  try {
    const { id: companyId } = req.params;
    const { comment, authorName, authorId } = req.body;

    if (!comment || !comment.trim() || !authorName) {
      return res.status(400).json({ error: 'Comentario y autor son obligatorios' });
    }

    const id = 'cmt-' + Date.now();
    const now = new Date().toISOString();

    await runQuery(`
      INSERT INTO crm_comments (id, companyId, authorId, authorName, comment, createdAt, updatedAt)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `, [
      id,
      companyId,
      authorId || 'admin',
      authorName.trim(),
      comment.trim(),
      now,
      now
    ]);

    // Touch company updatedAt
    await runQuery('UPDATE crm_companies SET updatedAt = ? WHERE id = ?', [now, companyId]);

    const created = await getQuery('SELECT * FROM crm_comments WHERE id = ?', [id]);
    res.status(201).json(created);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/crm/comments/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { comment } = req.body;
    if (!comment || !comment.trim()) {
      return res.status(400).json({ error: 'El contenido del comentario es obligatorio' });
    }
    const now = new Date().toISOString();
    await runQuery('UPDATE crm_comments SET comment = ?, updatedAt = ? WHERE id = ?', [comment.trim(), now, id]);
    const updated = await getQuery('SELECT * FROM crm_comments WHERE id = ?', [id]);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/crm/comments/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await runQuery('DELETE FROM crm_comments WHERE id = ?', [id]);
    res.json({ success: true, id });
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

// GET comments for a Jira issue
app.get('/api/jira/issues/:id/comments', async (req, res) => {
  try {
    const { id } = req.params;
    const comments = await allQuery('SELECT * FROM ticket_comments WHERE ticketId = ? ORDER BY createdAt ASC', [id]);
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST new comment / note for a Jira issue
app.post('/api/jira/issues/:id/comments', async (req, res) => {
  try {
    const { id: ticketId } = req.params;
    const { authorId, authorName, content, type } = req.body;

    if (!content || !authorName) {
      return res.status(400).json({ error: 'Contenido y autor son obligatorios' });
    }

    const id = 'com-' + Date.now();
    const now = new Date().toISOString();

    await runQuery(`
      INSERT INTO ticket_comments (id, ticketId, authorId, authorName, content, type, createdAt)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `, [id, ticketId, authorId || 'usr-admin', authorName, content, type || 'note', now]);

    // Touch issue updatedAt
    await runQuery('UPDATE jira_issues SET updatedAt = ? WHERE id = ?', [now, ticketId]);

    // Mirror in crm_activities if issue has companyId
    const issue = await getQuery('SELECT companyId FROM jira_issues WHERE id = ?', [ticketId]);
    if (issue && issue.companyId) {
      const actId = 'act-' + Date.now();
      await runQuery(`
        INSERT INTO crm_activities (id, companyId, type, summary, details, author, createdAt)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `, [actId, issue.companyId, type || 'note', content.length > 80 ? content.substring(0, 80) + '...' : content, content, authorName, now]);
      await runQuery('UPDATE crm_companies SET updatedAt = ? WHERE id = ?', [now, issue.companyId]);
    }

    const created = await getQuery('SELECT * FROM ticket_comments WHERE id = ?', [id]);
    res.status(201).json(created);
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
  const assignedTo = 'Lic. Mateo Rossi';
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
        INSERT INTO crm_companies (id, name, legalName, industry, city, contactName, contactRole, email, phone, whatsapp, website, status, potentialService, estimatedValue, territory, assignedTo, techRequirements, notes, legacyData, createdAt, updatedAt)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `, [
        companyId,
        companyName,
        companyName,
        'Tecnología & Servicios',
        'Buenos Aires',
        name,
        'Interesado Web',
        email,
        phone || '',
        phone || '',
        '',
        'Nuevo',
        service || 'Página web',
        0,
        'general',
        assignedTo,
        `Servicio solicitado: ${service}`,
        `Mensaje inicial: "${message || 'Sin mensaje'}"`,
        '',
        createdAt,
        createdAt
      ]);
    }

    // 3. Automatically generate a Lead Issue in Jira Backlog
    const issueKey = await getNextIssueKey();
    const issueId = 'iss-' + Date.now();
    await runQuery(`
      INSERT INTO jira_issues (id, issueKey, title, description, type, status, priority, companyId, assignedTo, storyPoints, value, territory, dueDate, tags, createdAt, updatedAt)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      issueId,
      issueKey,
      `Consulta Web: ${service} - ${name}`,
      `Mensaje recibido: "${message || 'Sin mensaje adicional'}". Teléfono: ${phone || 'N/A'}, Email: ${email}`,
      'lead',
      'backlog',
      'high',
      companyId,
      assignedTo,
      1,
      0,
      'general',
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
