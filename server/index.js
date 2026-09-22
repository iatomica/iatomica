import express from 'express';
import cors from 'cors';
import sqlite3 from 'sqlite3';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

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

// Seed data generator for Jira & CRM
async function seedInitialDataIfEmpty() {
  try {
    const existingCompanies = await allQuery('SELECT COUNT(*) as count FROM crm_companies');
    if (existingCompanies && existingCompanies[0].count > 0) {
      console.log('CRM Database already has data. Skipping seed.');
      return;
    }

    console.log('🌱 Seeding initial realistic CRM Directory & Jira Suite...');
    const now = new Date().toISOString();

    const initialCompanies = [
      {
        id: 'comp-1',
        name: 'Grupo Visión Bariloche',
        legalName: 'Grupo Visión Turismo S.R.L.',
        industry: 'Turismo & Hospitalidad',
        contactName: 'Thomas Benítez',
        contactRole: 'Director de Operaciones Turísticas',
        email: 'reservas@grupovision.tur.ar',
        phone: '+5492944558899',
        website: 'https://grupovision.tur.ar',
        status: 'active_client',
        estimatedValue: 4800,
        assignedTo: 'Consultoría Técnica',
        techRequirements: 'Plataforma web reactiva con catálogo de expediciones 4x4, panel de autogestión de contenidos (CMS) y bot WhatsApp automatizado.',
        notes: 'Cliente con alta temporada invernal y estival. Requieren soporte 24/7 y pasarela de cobros segura.',
        createdAt: new Date(Date.now() - 30 * 86400000).toISOString(),
        updatedAt: now
      },
      {
        id: 'comp-2',
        name: 'AURA Salud Integral',
        legalName: 'Centro Médico Privado Aura S.A.',
        industry: 'Salud & Clínicas',
        contactName: 'Dra. Valentina Soria',
        contactRole: 'Directora Médica & Coordinación',
        email: 'coordinacion@aurasalud.com.ar',
        phone: '+5491154883322',
        website: 'https://aurasalud.iatomica.com',
        status: 'negotiation',
        estimatedValue: 7500,
        assignedTo: 'Consultoría Técnica',
        techRequirements: 'Portal de autogestión de turnos médicos integrados a Google Calendar y agentes IA para triaje de pacientes en WhatsApp.',
        notes: 'Propuesta enviada la semana pasada. Reunión de cierre de contrato programada con el directorio.',
        createdAt: new Date(Date.now() - 15 * 86400000).toISOString(),
        updatedAt: now
      },
      {
        id: 'comp-3',
        name: 'Chocolates Tronador',
        legalName: 'Chocolatería Patagónica Tronador S.A.',
        industry: 'Retail & Alimentos',
        contactName: 'Martín Lanusse',
        contactRole: 'Gerente Comercial',
        email: 'ventas@chocotronador.com',
        phone: '+5492944331122',
        website: 'https://tronador.iatomica.com',
        status: 'active_client',
        estimatedValue: 3200,
        assignedTo: 'Ventas',
        techRequirements: 'E-commerce omnicanal B2C con gestión de catálogo de productos artesanales y sincronización con punto de venta físico.',
        notes: 'Expansión de ventas hacia Buenos Aires en curso.',
        createdAt: new Date(Date.now() - 25 * 86400000).toISOString(),
        updatedAt: now
      },
      {
        id: 'comp-4',
        name: 'Yiwu Direct Import',
        legalName: 'Logística Transpacífica Yiwu S.R.L.',
        industry: 'Logística & Comercio Exterior',
        contactName: 'Federico Chen',
        contactRole: 'Head of Global Procurement',
        email: 'contact@yiwudirect.com',
        phone: '+5491133224455',
        website: 'https://yiwu.devops.iatomica.com',
        status: 'qualified',
        estimatedValue: 9200,
        assignedTo: 'Consultoría Técnica',
        techRequirements: 'Plataforma web de cotización en tiempo real de contenedores marítimos y tracking automatizado mediante webhook.',
        notes: 'Calificado tras demo de arquitectura de agentes.',
        createdAt: new Date(Date.now() - 8 * 86400000).toISOString(),
        updatedAt: now
      },
      {
        id: 'comp-5',
        name: 'Vetify Veterinaria & Pet Care',
        legalName: 'Red Veterinaria Vetify S.A.',
        industry: 'Salud Animal & Retail',
        contactName: 'Dr. Guillermo Navarro',
        contactRole: 'Socio Fundador',
        email: 'info@vetify.com',
        phone: '+5491166778899',
        website: 'https://vetify.iatomica.com',
        status: 'lead',
        estimatedValue: 2400,
        assignedTo: 'Atención Público',
        techRequirements: 'Sistema de recordatorio de vacunación y turnero online para 4 sucursales.',
        notes: 'Consulta recibida desde formulario web.',
        createdAt: new Date(Date.now() - 2 * 86400000).toISOString(),
        updatedAt: now
      }
    ];

    for (const c of initialCompanies) {
      await runQuery(`
        INSERT INTO crm_companies (id, name, legalName, industry, contactName, contactRole, email, phone, website, status, estimatedValue, assignedTo, techRequirements, notes, createdAt, updatedAt)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `, [c.id, c.name, c.legalName, c.industry, c.contactName, c.contactRole, c.email, c.phone, c.website, c.status, c.estimatedValue, c.assignedTo, c.techRequirements, c.notes, c.createdAt, c.updatedAt]);
    }

    // Seed Activities
    const initialActivities = [
      {
        id: 'act-1',
        companyId: 'comp-1',
        type: 'meeting',
        summary: 'Demo de CMS y Aprobación de Versión 2.0',
        details: 'Se mostró la autogestión de secciones web y biblioteca multimedia WebP. El cliente expresó total conformidad.',
        author: 'Ing. Lucas Varela',
        nextAction: 'Entrega de credenciales de operador',
        nextActionDate: new Date(Date.now() + 2 * 86400000).toISOString(),
        createdAt: new Date(Date.now() - 4 * 86400000).toISOString()
      },
      {
        id: 'act-2',
        companyId: 'comp-2',
        type: 'call',
        summary: 'Llamada de Revisión de Presupuesto',
        details: 'Se afinaron los alcances de la integración con Google Calendar y WhatsApp Bot. Están conformes con el valor propuesto.',
        author: 'Lic. Mateo Rossi',
        nextAction: 'Enviar borrador de contrato de servicios',
        nextActionDate: new Date(Date.now() + 1 * 86400000).toISOString(),
        createdAt: new Date(Date.now() - 2 * 86400000).toISOString()
      },
      {
        id: 'act-3',
        companyId: 'comp-4',
        type: 'whatsapp',
        summary: 'Envío de Ficha Técnica de Integración API',
        details: 'Federico confirmó recepción de documentación OpenAPI y validación de endpoints.',
        author: 'Sofía Martínez',
        nextAction: 'Reunión de kickoff técnico',
        nextActionDate: new Date(Date.now() + 5 * 86400000).toISOString(),
        createdAt: new Date(Date.now() - 1 * 86400000).toISOString()
      }
    ];

    for (const a of initialActivities) {
      await runQuery(`
        INSERT INTO crm_activities (id, companyId, type, summary, details, author, nextAction, nextActionDate, createdAt)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `, [a.id, a.companyId, a.type, a.summary, a.details, a.author, a.nextAction, a.nextActionDate, a.createdAt]);
    }

    // Seed Jira Issues (Board & Backlog)
    const initialIssues = [
      {
        id: 'iss-1',
        issueKey: 'IAT-101',
        title: 'Integración de Pasarela de Pagos & Notificaciones WhatsApp',
        description: 'Conectar checkout con webhooks de WhatsApp para confirmación automática de reservas.',
        type: 'automation',
        status: 'in_progress',
        priority: 'highest',
        companyId: 'comp-1',
        assignedTo: 'Consultoría Técnica',
        storyPoints: 5,
        value: 1200,
        dueDate: new Date(Date.now() + 3 * 86400000).toISOString(),
        tags: JSON.stringify(['WhatsApp Gateway', 'Pagos', 'Q3']),
        createdAt: new Date(Date.now() - 6 * 86400000).toISOString(),
        updatedAt: now
      },
      {
        id: 'iss-2',
        issueKey: 'IAT-102',
        title: 'Arquitectura de Triaje de Pacientes con Agente LLM',
        description: 'Definir flujos conversacionales médicos y salvaguardas éticas para consultas frecuentes.',
        type: 'consulting',
        status: 'review',
        priority: 'high',
        companyId: 'comp-2',
        assignedTo: 'Consultoría Técnica',
        storyPoints: 8,
        value: 2500,
        dueDate: new Date(Date.now() + 4 * 86400000).toISOString(),
        tags: JSON.stringify(['Agentes IA', 'Salud', 'Arquitectura']),
        createdAt: new Date(Date.now() - 5 * 86400000).toISOString(),
        updatedAt: now
      },
      {
        id: 'iss-3',
        issueKey: 'IAT-103',
        title: 'Calificación Comercial y Presentación de Propuesta Final',
        description: 'Coordinar sesión ejecutiva con directores para firma y primer hito de desarrollo.',
        type: 'lead',
        status: 'negotiation',
        priority: 'high',
        companyId: 'comp-2',
        assignedTo: 'Ventas',
        storyPoints: 3,
        value: 5000,
        dueDate: new Date(Date.now() + 2 * 86400000).toISOString(),
        tags: JSON.stringify(['Cierre Comercial', 'Contrato']),
        createdAt: new Date(Date.now() - 4 * 86400000).toISOString(),
        updatedAt: now
      },
      {
        id: 'iss-4',
        issueKey: 'IAT-104',
        title: 'Configuración de Dominio SSL y CDN para Catálogo de Productos',
        description: 'Normalización de caché de imágenes WebP para carga en menos de 0.8s en móviles.',
        type: 'task',
        status: 'done',
        priority: 'medium',
        companyId: 'comp-3',
        assignedTo: 'Atención Público',
        storyPoints: 2,
        value: 800,
        dueDate: new Date(Date.now() - 1 * 86400000).toISOString(),
        tags: JSON.stringify(['DevOps', 'Cloud', 'Performance']),
        createdAt: new Date(Date.now() - 10 * 86400000).toISOString(),
        updatedAt: now
      },
      {
        id: 'iss-5',
        issueKey: 'IAT-105',
        title: 'Diseño de Algoritmo de Cotización de Fletes Marítimos',
        description: 'Mapear tarifas volumétricas desde puerto de Yiwu a Buenos Aires / Valparaíso.',
        type: 'consulting',
        status: 'todo',
        priority: 'high',
        companyId: 'comp-4',
        assignedTo: 'Consultoría Técnica',
        storyPoints: 8,
        value: 3800,
        dueDate: new Date(Date.now() + 7 * 86400000).toISOString(),
        tags: JSON.stringify(['Logística', 'Cotizador']),
        createdAt: new Date(Date.now() - 3 * 86400000).toISOString(),
        updatedAt: now
      },
      {
        id: 'iss-6',
        issueKey: 'IAT-106',
        title: 'Primer Contacto y Diagnóstico Inicial de Requerimientos',
        description: 'Contactar al Dr. Navarro para relevar volumen de turnos mensuales y software actual.',
        type: 'lead',
        status: 'backlog',
        priority: 'medium',
        companyId: 'comp-5',
        assignedTo: 'Atención Público',
        storyPoints: 2,
        value: 1200,
        dueDate: new Date(Date.now() + 5 * 86400000).toISOString(),
        tags: JSON.stringify(['Prospección', 'Salud Animal']),
        createdAt: new Date(Date.now() - 2 * 86400000).toISOString(),
        updatedAt: now
      },
      {
        id: 'iss-7',
        issueKey: 'IAT-107',
        title: 'Implementar Motor de Búsqueda RAG sobre Base de Conocimiento',
        description: 'Indexar políticas de garantía y manuales técnicos para el chatbot interno.',
        type: 'automation',
        status: 'backlog',
        priority: 'high',
        companyId: 'comp-1',
        assignedTo: 'Consultoría Técnica',
        storyPoints: 5,
        value: 1600,
        dueDate: new Date(Date.now() + 10 * 86400000).toISOString(),
        tags: JSON.stringify(['RAG', 'Vector Store', 'IA']),
        createdAt: new Date(Date.now() - 1 * 86400000).toISOString(),
        updatedAt: now
      },
      {
        id: 'iss-8',
        issueKey: 'IAT-108',
        title: 'Auditoría de Seguridad y Resguardo Automático SQLite en Coolify',
        description: 'Automatizar script de backup nocturno hacia bucket S3 offsite.',
        type: 'task',
        status: 'backlog',
        priority: 'medium',
        companyId: null,
        assignedTo: 'Consultoría Técnica',
        storyPoints: 3,
        value: 0,
        dueDate: new Date(Date.now() + 12 * 86400000).toISOString(),
        tags: JSON.stringify(['Infraestructura', 'Seguridad']),
        createdAt: now,
        updatedAt: now
      }
    ];

    for (const iss of initialIssues) {
      await runQuery(`
        INSERT INTO jira_issues (id, issueKey, title, description, type, status, priority, companyId, assignedTo, storyPoints, value, dueDate, tags, createdAt, updatedAt)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `, [iss.id, iss.issueKey, iss.title, iss.description, iss.type, iss.status, iss.priority, iss.companyId, iss.assignedTo, iss.storyPoints, iss.value, iss.dueDate, iss.tags, iss.createdAt, iss.updatedAt]);
    }

    console.log('✅ Initial CRM & Jira Seed complete!');
  } catch (err) {
    console.error('Error seeding initial data:', err);
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
