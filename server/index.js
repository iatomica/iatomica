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

// Seed data definitions
const INITIAL_SPRINTS = [
  {
    id: 'sp-bar-1',
    projectId: 'bariloche',
    name: 'Sprint 1 · Despliegue Bariloche',
    goal: 'Lanzamiento de plataforma local, integraciones de pago y onboarding de primeros clientes.',
    status: 'active',
    startDate: '2026-09-01',
    endDate: '2026-09-30'
  },
  {
    id: 'sp-bar-2',
    projectId: 'bariloche',
    name: 'Sprint 2 · Automatización & CRM',
    goal: 'Flujos automatizados de WhatsApp y sincronización de leads.',
    status: 'planned',
    startDate: '2026-10-01',
    endDate: '2026-10-31'
  },
  {
    id: 'sp-esp-1',
    projectId: 'espana',
    name: 'Sprint 1 · Expansión Península',
    goal: 'Infraestructura cloud para España, cumplimiento GDPR y prospección B2B.',
    status: 'active',
    startDate: '2026-09-01',
    endDate: '2026-09-30'
  },
  {
    id: 'sp-esp-2',
    projectId: 'espana',
    name: 'Sprint 2 · Escala Corporativa Madrid',
    goal: 'Cierre de contratos corporativos y homologación de servicios enterprise.',
    status: 'planned',
    startDate: '2026-10-01',
    endDate: '2026-10-31'
  }
];

const INITIAL_TICKETS = [
  {
    id: 't-bar-1',
    code: 'BAR-101',
    projectId: 'bariloche',
    sprintId: 'sp-bar-1',
    title: 'Integración Pasarela de Pagos Regional Patagonia',
    description: 'Configuración de checkout optimizado para tarjetas locales y facturación electrónica AFIP.',
    status: 'in_progress',
    priority: 'alta',
    crm: {
      clientName: 'Martín Lanusse',
      company: 'Cervecería & Lodge Nahuel',
      email: 'martin@nahuellodge.com.ar',
      phone: '+5492944556677',
      service: 'Desarrollo a Medida',
      budget: '$4,500 USD'
    },
    comments: [
      {
        id: 'c-1',
        authorName: 'José Anaya',
        authorRole: 'Project Lead',
        authorInitials: 'JA',
        text: 'Revisamos los requerimientos con el cliente. Priorizan la compatibilidad offline.',
        timestamp: '2026-09-15T14:20:00Z'
      }
    ],
    createdBy: 'José Anaya',
    createdAt: '2026-09-10T10:00:00Z',
    updatedAt: '2026-09-16T18:30:00Z'
  },
  {
    id: 't-bar-2',
    code: 'BAR-102',
    projectId: 'bariloche',
    sprintId: 'sp-bar-1',
    title: 'Consultoría e IA de Atención Turística',
    description: 'Entrenamiento de agente RAG para responder consultas frecuentes de huéspedes y reservas directas.',
    status: 'todo',
    priority: 'urgente',
    crm: {
      clientName: 'Valeria Soria',
      company: 'Chocolates & Cabañas Catedral',
      email: 'valeria@catedralturismo.com',
      phone: '+5492944112233',
      service: 'Herramientas de IA',
      budget: '$3,200 USD'
    },
    comments: [
      {
        id: 'c-2',
        authorName: 'Lic. Mateo Rossi',
        authorRole: 'Admin',
        authorInitials: 'MR',
        text: 'Aprobado el presupuesto inicial. Coordinar demo para el lunes.',
        timestamp: '2026-09-16T11:00:00Z'
      }
    ],
    createdBy: 'José Anaya',
    createdAt: '2026-09-12T09:00:00Z',
    updatedAt: '2026-09-16T19:10:00Z'
  },
  {
    id: 't-bar-3',
    code: 'BAR-103',
    projectId: 'bariloche',
    sprintId: null,
    title: 'Migración Cloud & Backup Automático en Frío',
    description: 'Planificación de snapshots diarios y replicación en data center secundario.',
    status: 'todo',
    priority: 'media',
    crm: {
      clientName: 'Esteban Bosch',
      company: 'Bosch Distribuidora Mayorista',
      email: 'esteban@distribuidorabosch.com.ar',
      phone: '+5492944889900',
      service: 'Consultoría Técnica',
      budget: '$2,800 USD'
    },
    comments: [],
    createdBy: 'José Anaya',
    createdAt: '2026-09-14T15:00:00Z',
    updatedAt: '2026-09-14T15:00:00Z'
  },
  {
    id: 't-bar-4',
    code: 'BAR-104',
    projectId: 'bariloche',
    sprintId: 'sp-bar-1',
    title: 'Control de Calidad (QA) de App Móvil de Reservas',
    description: 'Testing de compatibilidad iOS/Android en condiciones de conectividad variable de montaña.',
    status: 'review',
    priority: 'alta',
    crm: {
      clientName: 'Romina Bellagio',
      company: 'Outdoor Adventures Patagonia',
      email: 'romina@outdoorpatagonia.com',
      phone: '+5492944334455',
      service: 'QA & Testing',
      budget: '$1,900 USD'
    },
    comments: [
      {
        id: 'c-3',
        authorName: 'José Anaya',
        authorRole: 'Project Lead',
        authorInitials: 'JA',
        text: 'Se ejecutaron las pruebas automatizadas de Cypress. Quedan 2 tests de regresión.',
        timestamp: '2026-09-16T17:45:00Z'
      }
    ],
    createdBy: 'José Anaya',
    createdAt: '2026-09-11T12:00:00Z',
    updatedAt: '2026-09-17T01:15:00Z'
  },
  {
    id: 't-esp-1',
    code: 'ESP-201',
    projectId: 'espana',
    sprintId: 'sp-esp-1',
    title: 'Auditoría de Cumplimiento GDPR & RGPD en Plataforma SaaS',
    description: 'Adecuación de políticas de consentimiento, cookies de terceros y portabilidad de datos para la UE.',
    status: 'in_progress',
    priority: 'urgente',
    crm: {
      clientName: 'Álvaro Herrero',
      company: 'Iberia Logistic Tech SL',
      email: 'alvaro.herrero@iberialogistic.es',
      phone: '+34612345678',
      service: 'Consultoría Técnica',
      budget: '€6,800 EUR'
    },
    comments: [
      {
        id: 'c-4',
        authorName: 'Stefi Del Papa',
        authorRole: 'Project Lead',
        authorInitials: 'SD',
        text: 'Revisado con el equipo legal de Madrid. Añadimos cláusula de servidores europeos.',
        timestamp: '2026-09-16T16:00:00Z'
      }
    ],
    createdBy: 'Stefi Del Papa',
    createdAt: '2026-09-08T10:00:00Z',
    updatedAt: '2026-09-16T19:40:00Z'
  },
  {
    id: 't-esp-2',
    code: 'ESP-202',
    projectId: 'espana',
    sprintId: 'sp-esp-1',
    title: 'Pipeline de IA para Scoring Automático de Clientes B2B',
    description: 'Integración de modelo predictivo para evaluar intención de compra de empresas inmobiliarias en Valencia.',
    status: 'todo',
    priority: 'alta',
    crm: {
      clientName: 'Beatriz Casado',
      company: 'Mediterráneo Proptech SL',
      email: 'b.casado@mediterraneoprop.com',
      phone: '+34698765432',
      service: 'Herramientas de IA',
      budget: '€8,500 EUR'
    },
    comments: [
      {
        id: 'c-5',
        authorName: 'Stefi Del Papa',
        authorRole: 'Project Lead',
        authorInitials: 'SD',
        text: 'Recibimos los primeros datasets de prueba anonimizados.',
        timestamp: '2026-09-15T18:15:00Z'
      }
    ],
    createdBy: 'Stefi Del Papa',
    createdAt: '2026-09-09T11:00:00Z',
    updatedAt: '2026-09-15T18:15:00Z'
  },
  {
    id: 't-esp-3',
    code: 'ESP-203',
    projectId: 'espana',
    sprintId: null,
    title: 'Desarrollo de Portal de Proveedores en Barcelona',
    description: 'Arquitectura frontend en React + Tailwind con autenticación SSO.',
    status: 'todo',
    priority: 'media',
    crm: {
      clientName: 'Jordi Vila',
      company: 'Catalunya Retail Connect',
      email: 'jvila@retailconnect.cat',
      phone: '+34655443322',
      service: 'Desarrollo a Medida',
      budget: '€5,200 EUR'
    },
    comments: [],
    createdBy: 'Stefi Del Papa',
    createdAt: '2026-09-13T14:00:00Z',
    updatedAt: '2026-09-13T14:00:00Z'
  },
  {
    id: 't-esp-4',
    code: 'ESP-204',
    projectId: 'espana',
    sprintId: 'sp-esp-1',
    title: 'Despliegue y Pruebas de Carga en Coolify Frankfurt',
    description: 'Configuración de cluster con balanceo Traefik y benchmarks de 5,000 req/s.',
    status: 'done',
    priority: 'alta',
    crm: {
      clientName: 'Fernando Morales',
      company: 'Fintech Iberia Group',
      email: 'f.morales@fintechiberia.com',
      phone: '+34677889900',
      service: 'Consultoría Técnica',
      budget: '€7,400 EUR'
    },
    comments: [
      {
        id: 'c-6',
        authorName: 'Lic. Mateo Rossi',
        authorRole: 'Admin',
        authorInitials: 'MR',
        text: 'Excelente resultado de latencia (menos de 28ms en media peninsular).',
        timestamp: '2026-09-16T12:30:00Z'
      }
    ],
    createdBy: 'Stefi Del Papa',
    createdAt: '2026-09-07T08:00:00Z',
    updatedAt: '2026-09-16T12:30:00Z'
  }
];

// Create Database Tables and Seed
db.serialize(() => {
  // Leads & Notes
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

  // Sprints Table
  db.run(`
    CREATE TABLE IF NOT EXISTS sprints (
      id TEXT PRIMARY KEY,
      projectId TEXT NOT NULL,
      name TEXT NOT NULL,
      goal TEXT,
      status TEXT NOT NULL DEFAULT 'planned',
      startDate TEXT,
      endDate TEXT,
      createdAt TEXT NOT NULL
    )
  `);

  // Work Tickets Table
  db.run(`
    CREATE TABLE IF NOT EXISTS work_tickets (
      id TEXT PRIMARY KEY,
      code TEXT NOT NULL,
      projectId TEXT NOT NULL,
      sprintId TEXT,
      title TEXT NOT NULL,
      description TEXT,
      status TEXT NOT NULL DEFAULT 'todo',
      priority TEXT NOT NULL DEFAULT 'media',
      crm_clientName TEXT,
      crm_company TEXT,
      crm_email TEXT,
      crm_phone TEXT,
      crm_service TEXT,
      crm_budget TEXT,
      createdBy TEXT NOT NULL,
      createdAt TEXT NOT NULL,
      updatedAt TEXT NOT NULL
    )
  `);

  // Ticket Comments Table
  db.run(`
    CREATE TABLE IF NOT EXISTS ticket_comments (
      id TEXT PRIMARY KEY,
      ticket_id TEXT NOT NULL,
      authorName TEXT NOT NULL,
      authorRole TEXT NOT NULL,
      authorInitials TEXT NOT NULL,
      text TEXT NOT NULL,
      timestamp TEXT NOT NULL,
      FOREIGN KEY (ticket_id) REFERENCES work_tickets(id) ON DELETE CASCADE
    )
  `);

  // Seed Sprints if empty
  db.get('SELECT COUNT(*) as count FROM sprints', [], (err, row) => {
    if (!err && row && row.count === 0) {
      console.log('Seeding initial sprints...');
      const stmt = db.prepare(`
        INSERT INTO sprints (id, projectId, name, goal, status, startDate, endDate, createdAt)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `);
      const now = new Date().toISOString();
      for (const sp of INITIAL_SPRINTS) {
        stmt.run([sp.id, sp.projectId, sp.name, sp.goal, sp.status, sp.startDate, sp.endDate, now]);
      }
      stmt.finalize();
    }
  });

  // Seed Tickets if empty
  db.get('SELECT COUNT(*) as count FROM work_tickets', [], (err, row) => {
    if (!err && row && row.count === 0) {
      console.log('Seeding initial work tickets and comments...');
      const tStmt = db.prepare(`
        INSERT INTO work_tickets (
          id, code, projectId, sprintId, title, description, status, priority,
          crm_clientName, crm_company, crm_email, crm_phone, crm_service, crm_budget,
          createdBy, createdAt, updatedAt
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);

      const cStmt = db.prepare(`
        INSERT INTO ticket_comments (id, ticket_id, authorName, authorRole, authorInitials, text, timestamp)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `);

      for (const t of INITIAL_TICKETS) {
        tStmt.run([
          t.id,
          t.code,
          t.projectId,
          t.sprintId,
          t.title,
          t.description,
          t.status,
          t.priority,
          t.crm?.clientName || null,
          t.crm?.company || null,
          t.crm?.email || null,
          t.crm?.phone || null,
          t.crm?.service || null,
          t.crm?.budget || null,
          t.createdBy,
          t.createdAt,
          t.updatedAt
        ]);

        for (const c of t.comments) {
          cStmt.run([c.id, t.id, c.authorName, c.authorRole, c.authorInitials, c.text, c.timestamp]);
        }
      }
      tStmt.finalize();
      cStmt.finalize();
    }
  });
});

// REST API Endpoints

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', database: 'sqlite', timestamp: new Date().toISOString() });
});

// --- LEADS CRM API ---
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

    res.status(201).json({
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
    });
  });
  stmt.finalize();
});

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

app.delete('/api/leads/:id', (req, res) => {
  const { id } = req.params;
  db.run(`DELETE FROM leads WHERE id = ?`, [id], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ success: true, id });
  });
});

// --- WORK PLATFORM: SPRINTS API ---

// GET Sprints
app.get('/api/work/sprints', (req, res) => {
  const { projectId } = req.query;
  let query = `SELECT * FROM sprints`;
  const params = [];

  if (projectId && projectId !== 'all') {
    query += ` WHERE projectId = ?`;
    params.push(projectId);
  }
  query += ` ORDER BY startDate ASC`;

  db.all(query, params, (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// POST Create Sprint
app.post('/api/work/sprints', (req, res) => {
  const { name, goal, projectId, status, startDate, endDate } = req.body;
  if (!name || !projectId) {
    return res.status(400).json({ error: 'Name and projectId are required' });
  }

  const id = 'sp-' + Date.now();
  const createdAt = new Date().toISOString();

  const stmt = db.prepare(`
    INSERT INTO sprints (id, projectId, name, goal, status, startDate, endDate, createdAt)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);

  stmt.run([id, projectId, name, goal || '', status || 'planned', startDate, endDate, createdAt], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({
      id,
      projectId,
      name,
      goal: goal || '',
      status: status || 'planned',
      startDate,
      endDate,
      createdAt
    });
  });
  stmt.finalize();
});

// PUT Update Sprint
app.put('/api/work/sprints/:id', (req, res) => {
  const { id } = req.params;
  const { name, goal, status, startDate, endDate } = req.body;

  db.run(
    `UPDATE sprints SET name = COALESCE(?, name), goal = COALESCE(?, goal), status = COALESCE(?, status), startDate = COALESCE(?, startDate), endDate = COALESCE(?, endDate) WHERE id = ?`,
    [name, goal, status, startDate, endDate, id],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ success: true, id });
    }
  );
});

// DELETE Sprint
app.delete('/api/work/sprints/:id', (req, res) => {
  const { id } = req.params;

  db.serialize(() => {
    // Unassign tickets from this sprint first (move to backlog)
    db.run(`UPDATE work_tickets SET sprintId = NULL WHERE sprintId = ?`, [id]);
    db.run(`DELETE FROM sprints WHERE id = ?`, [id], function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ success: true, id });
    });
  });
});

// --- WORK PLATFORM: TICKETS API ---

// Helper to construct ticket with comments
function fetchAllTickets(filterProjectId, callback) {
  let query = `
    SELECT 
      t.id, t.code, t.projectId, t.sprintId, t.title, t.description, t.status, t.priority,
      t.crm_clientName, t.crm_company, t.crm_email, t.crm_phone, t.crm_service, t.crm_budget,
      t.createdBy, t.createdAt, t.updatedAt,
      c.id as comment_id, c.authorName as comment_authorName, c.authorRole as comment_authorRole,
      c.authorInitials as comment_authorInitials, c.text as comment_text, c.timestamp as comment_timestamp
    FROM work_tickets t
    LEFT JOIN ticket_comments c ON t.id = c.ticket_id
  `;
  const params = [];

  if (filterProjectId && filterProjectId !== 'all') {
    query += ` WHERE t.projectId = ?`;
    params.push(filterProjectId);
  }

  query += ` ORDER BY t.updatedAt DESC, c.timestamp ASC`;

  db.all(query, params, (err, rows) => {
    if (err) return callback(err);

    const ticketsMap = new Map();
    rows.forEach(r => {
      if (!ticketsMap.has(r.id)) {
        let crm = undefined;
        if (r.crm_clientName) {
          crm = {
            clientName: r.crm_clientName,
            company: r.crm_company || '',
            email: r.crm_email || '',
            phone: r.crm_phone || '',
            service: r.crm_service || '',
            budget: r.crm_budget || undefined
          };
        }

        ticketsMap.set(r.id, {
          id: r.id,
          code: r.code,
          projectId: r.projectId,
          sprintId: r.sprintId,
          title: r.title,
          description: r.description || '',
          status: r.status,
          priority: r.priority,
          crm,
          comments: [],
          createdBy: r.createdBy,
          createdAt: r.createdAt,
          updatedAt: r.updatedAt
        });
      }

      if (r.comment_id) {
        const ticket = ticketsMap.get(r.id);
        ticket.comments.push({
          id: r.comment_id,
          authorName: r.comment_authorName,
          authorRole: r.comment_authorRole,
          authorInitials: r.comment_authorInitials,
          text: r.comment_text,
          timestamp: r.comment_timestamp
        });
      }
    });

    callback(null, Array.from(ticketsMap.values()));
  });
}

// GET All Tickets
app.get('/api/work/tickets', (req, res) => {
  const { projectId } = req.query;
  fetchAllTickets(projectId, (err, tickets) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(tickets);
  });
});

// POST Create Ticket
app.post('/api/work/tickets', (req, res) => {
  const { code, projectId, sprintId, title, description, status, priority, crm, createdBy } = req.body;
  if (!title || !projectId || !code) {
    return res.status(400).json({ error: 'code, projectId and title are required' });
  }

  const id = 't-' + Date.now();
  const now = new Date().toISOString();

  const stmt = db.prepare(`
    INSERT INTO work_tickets (
      id, code, projectId, sprintId, title, description, status, priority,
      crm_clientName, crm_company, crm_email, crm_phone, crm_service, crm_budget,
      createdBy, createdAt, updatedAt
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  stmt.run(
    [
      id,
      code,
      projectId,
      sprintId || null,
      title,
      description || '',
      status || 'todo',
      priority || 'media',
      crm?.clientName || null,
      crm?.company || null,
      crm?.email || null,
      crm?.phone || null,
      crm?.service || null,
      crm?.budget || null,
      createdBy || 'Usuario',
      now,
      now
    ],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      res.status(201).json({
        id,
        code,
        projectId,
        sprintId: sprintId || null,
        title,
        description: description || '',
        status: status || 'todo',
        priority: priority || 'media',
        crm: crm || undefined,
        comments: [],
        createdBy: createdBy || 'Usuario',
        createdAt: now,
        updatedAt: now
      });
    }
  );
  stmt.finalize();
});

// PUT Update Ticket (Status, Sprint, Title, Priority, Description, etc.)
app.put('/api/work/tickets/:id', (req, res) => {
  const { id } = req.params;
  const { status, sprintId, title, description, priority, crm } = req.body;
  const now = new Date().toISOString();

  // Handle optional sprintId specifically (can be null for Backlog)
  let sprintClause = '';
  const params = [];

  const updates = [];
  if (status !== undefined) {
    updates.push('status = ?');
    params.push(status);
  }
  if (sprintId !== undefined) {
    updates.push('sprintId = ?');
    params.push(sprintId);
  }
  if (title !== undefined) {
    updates.push('title = ?');
    params.push(title);
  }
  if (description !== undefined) {
    updates.push('description = ?');
    params.push(description);
  }
  if (priority !== undefined) {
    updates.push('priority = ?');
    params.push(priority);
  }
  if (crm !== undefined) {
    updates.push('crm_clientName = ?');
    params.push(crm ? crm.clientName : null);
    updates.push('crm_company = ?');
    params.push(crm ? crm.company : null);
    updates.push('crm_email = ?');
    params.push(crm ? crm.email : null);
    updates.push('crm_phone = ?');
    params.push(crm ? crm.phone : null);
    updates.push('crm_service = ?');
    params.push(crm ? crm.service : null);
    updates.push('crm_budget = ?');
    params.push(crm ? crm.budget : null);
  }

  updates.push('updatedAt = ?');
  params.push(now);

  params.push(id);

  const sql = `UPDATE work_tickets SET ${updates.join(', ')} WHERE id = ?`;

  db.run(sql, params, function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ success: true, id, updatedAt: now });
  });
});

// POST Add Comment to Ticket
app.post('/api/work/tickets/:id/comments', (req, res) => {
  const { id: ticket_id } = req.params;
  const { authorName, authorRole, authorInitials, text } = req.body;

  if (!text || !authorName) {
    return res.status(400).json({ error: 'Text and authorName are required' });
  }

  const comment_id = 'c-' + Date.now();
  const timestamp = new Date().toISOString();

  const stmt = db.prepare(`
    INSERT INTO ticket_comments (id, ticket_id, authorName, authorRole, authorInitials, text, timestamp)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  stmt.run([comment_id, ticket_id, authorName, authorRole, authorInitials, text, timestamp], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    // Automatically elevate ticket updatedAt to current time
    db.run(`UPDATE work_tickets SET updatedAt = ? WHERE id = ?`, [timestamp, ticket_id], (updateErr) => {
      if (updateErr) {
        console.warn('Failed to update ticket updatedAt on comment:', updateErr);
      }
      res.status(201).json({
        id: comment_id,
        authorName,
        authorRole,
        authorInitials,
        text,
        timestamp
      });
    });
  });
  stmt.finalize();
});

// DELETE Ticket
app.delete('/api/work/tickets/:id', (req, res) => {
  const { id } = req.params;

  db.run(`DELETE FROM work_tickets WHERE id = ?`, [id], function (err) {
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
