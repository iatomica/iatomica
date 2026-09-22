import type { User, ProjectScope } from './authService';

export type ProjectId = 'bariloche' | 'espana';

export interface ProjectInfo {
  id: ProjectId;
  name: string;
  code: string;
  badgeBg: string;
  badgeText: string;
  border: string;
  description: string;
  leadUser: string;
}

export const PROJECTS: Record<ProjectId, ProjectInfo> = {
  bariloche: {
    id: 'bariloche',
    name: 'Proyecto Bariloche',
    code: 'BAR',
    badgeBg: 'bg-emerald-500/10 dark:bg-emerald-500/20',
    badgeText: 'text-emerald-700 dark:text-emerald-300',
    border: 'border-emerald-500/30',
    description: 'Desarrollo de Soluciones & Ecosistema Digital Bariloche',
    leadUser: 'José Anaya'
  },
  espana: {
    id: 'espana',
    name: 'Proyecto España',
    code: 'ESP',
    badgeBg: 'bg-indigo-500/10 dark:bg-indigo-500/20',
    badgeText: 'text-indigo-700 dark:text-indigo-300',
    border: 'border-indigo-500/30',
    description: 'Expansión Internacional & Clientes Corporativos España',
    leadUser: 'Stefi Del Papa'
  }
};

export type TicketStatus = 'todo' | 'in_progress' | 'review' | 'done';
export type TicketPriority = 'urgente' | 'alta' | 'media' | 'baja';

export interface TicketComment {
  id: string;
  authorName: string;
  authorRole: string;
  authorInitials: string;
  text: string;
  timestamp: string;
}

export interface TicketCRM {
  clientName: string;
  company: string;
  email: string;
  phone: string;
  service: string;
  budget?: string;
}

export interface WorkTicket {
  id: string;
  code: string; // e.g. BAR-101, ESP-201
  projectId: ProjectId;
  sprintId: string | null; // null = En Backlog
  title: string;
  description: string;
  status: TicketStatus;
  priority: TicketPriority;
  crm?: TicketCRM;
  comments: TicketComment[];
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface Sprint {
  id: string;
  projectId: ProjectId;
  name: string;
  goal: string;
  status: 'active' | 'planned' | 'completed';
  startDate: string;
  endDate: string;
}

const STORAGE_TICKETS_KEY = 'iatomica_work_tickets_v2';
const STORAGE_SPRINTS_KEY = 'iatomica_work_sprints_v2';
const WORK_SYNC_CHANNEL = 'iatomica_work_live_sync_v2';
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

let syncChannel: BroadcastChannel | null = null;
if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
  try {
    syncChannel = new BroadcastChannel(WORK_SYNC_CHANNEL);
  } catch (e) {
    console.warn('BroadcastChannel not available');
  }
}

const notifySync = () => {
  if (syncChannel) {
    syncChannel.postMessage({ type: 'WORK_UPDATED', timestamp: Date.now() });
  }
};

// Seed initial Sprints
const INITIAL_SPRINTS: Sprint[] = [
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

// Seed initial Tickets
const INITIAL_TICKETS: WorkTicket[] = [
  // --- PROYECTO BARILOCHE (José Anaya) ---
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
    sprintId: null, // Backlog
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

  // --- PROYECTO ESPAÑA (Stefi Del Papa) ---
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
    sprintId: null, // Backlog
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

// In-memory caches
let cachedTickets: WorkTicket[] | null = null;
let cachedSprints: Sprint[] | null = null;

// Fetch Sprints from SQLite DB
export const fetchSprintsFromDb = async (): Promise<Sprint[]> => {
  try {
    const res = await fetch(`${API_BASE_URL}/work/sprints`);
    if (res.ok) {
      const data: Sprint[] = await res.json();
      const prevJson = JSON.stringify(cachedSprints);
      const newJson = JSON.stringify(data);
      if (prevJson !== newJson) {
        cachedSprints = data;
        localStorage.setItem(STORAGE_SPRINTS_KEY, newJson);
        notifySync();
      }
      return data;
    }
  } catch (err) {
    // Offline or server unavailable: silent fallback
  }
  return cachedSprints || INITIAL_SPRINTS;
};

// Fetch Tickets from SQLite DB
export const fetchTicketsFromDb = async (): Promise<WorkTicket[]> => {
  try {
    const res = await fetch(`${API_BASE_URL}/work/tickets`);
    if (res.ok) {
      const data: WorkTicket[] = await res.json();
      const prevJson = JSON.stringify(cachedTickets);
      const newJson = JSON.stringify(data);
      if (prevJson !== newJson) {
        cachedTickets = data;
        localStorage.setItem(STORAGE_TICKETS_KEY, newJson);
        notifySync();
      }
      return data;
    }
  } catch (err) {
    // Offline or server unavailable: silent fallback
  }
  return cachedTickets || INITIAL_TICKETS;
};

// Auto-trigger background hydration on startup
if (typeof window !== 'undefined') {
  setTimeout(() => {
    fetchSprintsFromDb();
    fetchTicketsFromDb();
  }, 50);
}

// Read Sprints
export const getSprints = (user: User, filterProject?: ProjectScope): Sprint[] => {
  if (!cachedSprints) {
    try {
      const raw = localStorage.getItem(STORAGE_SPRINTS_KEY);
      cachedSprints = raw ? JSON.parse(raw) : INITIAL_SPRINTS;
    } catch {
      cachedSprints = INITIAL_SPRINTS;
    }
  }

  // Security isolation check
  return cachedSprints!.filter(sp => {
    if (user.role !== 'admin') {
      return sp.projectId === user.projectId;
    }
    if (filterProject && filterProject !== 'all') {
      return sp.projectId === filterProject;
    }
    return true;
  });
};

// Create Sprint
export const createSprint = (user: User, sprintData: Omit<Sprint, 'id'>): Sprint => {
  const targetProject = user.role === 'admin' ? sprintData.projectId : (user.projectId as ProjectId);

  const newSprint: Sprint = {
    ...sprintData,
    projectId: targetProject,
    id: `sp-${targetProject}-${Date.now()}`
  };

  const updated = [...(cachedSprints || INITIAL_SPRINTS), newSprint];
  cachedSprints = updated;
  localStorage.setItem(STORAGE_SPRINTS_KEY, JSON.stringify(updated));
  notifySync();

  // Async server persistence
  fetch(`${API_BASE_URL}/work/sprints`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newSprint)
  }).catch(e => console.warn('Offline sprint sync fallback:', e));

  return newSprint;
};

// Read Tickets with sorting by updatedAt DESC
export const getTickets = (
  user: User,
  filterProject?: ProjectScope,
  filterSprintId?: string | null
): WorkTicket[] => {
  if (!cachedTickets) {
    try {
      const raw = localStorage.getItem(STORAGE_TICKETS_KEY);
      cachedTickets = raw ? JSON.parse(raw) : INITIAL_TICKETS;
    } catch {
      cachedTickets = INITIAL_TICKETS;
    }
  }

  const result = cachedTickets!.filter(t => {
    // 1. Strict user-project isolation
    if (user.role !== 'admin') {
      if (t.projectId !== user.projectId) return false;
    } else {
      // Admin filter
      if (filterProject && filterProject !== 'all' && t.projectId !== filterProject) {
        return false;
      }
    }

    // 2. Sprint filter (if specified)
    if (filterSprintId !== undefined) {
      if (t.sprintId !== filterSprintId) return false;
    }

    return true;
  });

  // Sort by updatedAt descending (most recent interactions on top)
  return result.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
};

// Create Ticket (auto-assigned to user's project if project_user)
export const createTicket = (
  user: User,
  data: {
    title: string;
    description: string;
    projectId?: ProjectId;
    sprintId?: string | null;
    priority?: TicketPriority;
    status?: TicketStatus;
    crm?: TicketCRM;
  }
): WorkTicket => {
  // Enforce project binding
  const effectiveProject: ProjectId =
    user.role === 'admin' && data.projectId
      ? data.projectId
      : (user.projectId as ProjectId);

  const allTickets = cachedTickets || INITIAL_TICKETS;
  const projectCode = PROJECTS[effectiveProject].code;
  const count = allTickets.filter(t => t.projectId === effectiveProject).length + 101;
  const code = `${projectCode}-${count}`;

  const now = new Date().toISOString();
  const newTicket: WorkTicket = {
    id: `t-${effectiveProject}-${Date.now()}`,
    code,
    projectId: effectiveProject,
    sprintId: data.sprintId ?? null,
    title: data.title.trim(),
    description: data.description.trim(),
    status: data.status || 'todo',
    priority: data.priority || 'media',
    crm: data.crm,
    comments: [],
    createdBy: user.name,
    createdAt: now,
    updatedAt: now
  };

  const updated = [newTicket, ...allTickets];
  cachedTickets = updated;
  localStorage.setItem(STORAGE_TICKETS_KEY, JSON.stringify(updated));
  notifySync();

  // Async server persistence
  fetch(`${API_BASE_URL}/work/tickets`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newTicket)
  }).catch(e => console.warn('Offline ticket create sync fallback:', e));

  return newTicket;
};

// Update Ticket Status / Phase (auto-sorts by updatedAt)
export const updateTicketStatus = (
  user: User,
  ticketId: string,
  newStatus: TicketStatus
): WorkTicket[] => {
  const allTickets = cachedTickets || INITIAL_TICKETS;
  const now = new Date().toISOString();
  const updated = allTickets.map(t => {
    if (t.id === ticketId) {
      // Verify isolation permission
      if (user.role !== 'admin' && t.projectId !== user.projectId) {
        return t;
      }
      return {
        ...t,
        status: newStatus,
        updatedAt: now
      };
    }
    return t;
  });

  cachedTickets = updated;
  localStorage.setItem(STORAGE_TICKETS_KEY, JSON.stringify(updated));
  notifySync();

  // Async server persistence
  fetch(`${API_BASE_URL}/work/tickets/${ticketId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status: newStatus })
  }).catch(e => console.warn('Offline status sync fallback:', e));

  return getTickets(user);
};

// Update Ticket Sprint (Move to sprint or backlog)
export const updateTicketSprint = (
  user: User,
  ticketId: string,
  sprintId: string | null
): WorkTicket[] => {
  const allTickets = cachedTickets || INITIAL_TICKETS;
  const now = new Date().toISOString();
  const updated = allTickets.map(t => {
    if (t.id === ticketId) {
      if (user.role !== 'admin' && t.projectId !== user.projectId) {
        return t;
      }
      return {
        ...t,
        sprintId,
        updatedAt: now
      };
    }
    return t;
  });

  cachedTickets = updated;
  localStorage.setItem(STORAGE_TICKETS_KEY, JSON.stringify(updated));
  notifySync();

  // Async server persistence
  fetch(`${API_BASE_URL}/work/tickets/${ticketId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ sprintId })
  }).catch(e => console.warn('Offline sprint sync fallback:', e));

  return getTickets(user);
};

// Add Comment (chronological thread & updates lastActivity/updatedAt)
export const addTicketComment = (
  user: User,
  ticketId: string,
  text: string
): WorkTicket | null => {
  if (!text.trim()) return null;
  const allTickets = cachedTickets || INITIAL_TICKETS;

  let modifiedTicket: WorkTicket | null = null;
  const now = new Date().toISOString();
  const comment: TicketComment = {
    id: `c-${Date.now()}`,
    authorName: user.name,
    authorRole: user.role === 'admin' ? 'Administrador' : 'Project Lead',
    authorInitials: user.initials,
    text: text.trim(),
    timestamp: now
  };

  const updated = allTickets.map(t => {
    if (t.id === ticketId) {
      if (user.role !== 'admin' && t.projectId !== user.projectId) {
        return t;
      }
      modifiedTicket = {
        ...t,
        comments: [...t.comments, comment],
        updatedAt: now
      };
      return modifiedTicket;
    }
    return t;
  });

  cachedTickets = updated;
  localStorage.setItem(STORAGE_TICKETS_KEY, JSON.stringify(updated));
  notifySync();

  // Async server persistence
  fetch(`${API_BASE_URL}/work/tickets/${ticketId}/comments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(comment)
  }).catch(e => console.warn('Offline comment sync fallback:', e));

  return modifiedTicket;
};

// Update CRM Data
export const updateTicketCRM = (
  user: User,
  ticketId: string,
  crmData: Partial<TicketCRM>
): WorkTicket | null => {
  const allTickets = cachedTickets || INITIAL_TICKETS;
  let modifiedTicket: WorkTicket | null = null;
  const now = new Date().toISOString();
  let mergedCrm: TicketCRM | undefined = undefined;

  const updated = allTickets.map(t => {
    if (t.id === ticketId) {
      if (user.role !== 'admin' && t.projectId !== user.projectId) {
        return t;
      }
      const existingCRM = t.crm || {
        clientName: '',
        company: '',
        email: '',
        phone: '',
        service: ''
      };
      mergedCrm = { ...existingCRM, ...crmData };
      modifiedTicket = {
        ...t,
        crm: mergedCrm,
        updatedAt: now
      };
      return modifiedTicket;
    }
    return t;
  });

  cachedTickets = updated;
  localStorage.setItem(STORAGE_TICKETS_KEY, JSON.stringify(updated));
  notifySync();

  // Async server persistence
  if (mergedCrm) {
    fetch(`${API_BASE_URL}/work/tickets/${ticketId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ crm: mergedCrm })
    }).catch(e => console.warn('Offline crm sync fallback:', e));
  }

  return modifiedTicket;
};

// Delete Ticket (ONLY allowed by Admin)
export const deleteTicket = (user: User, ticketId: string): boolean => {
  if (user.role !== 'admin') {
    console.warn('Acceso denegado: Solo el Administrador puede eliminar tickets.');
    return false;
  }

  const allTickets = cachedTickets || INITIAL_TICKETS;
  const updated = allTickets.filter(t => t.id !== ticketId);
  cachedTickets = updated;
  localStorage.setItem(STORAGE_TICKETS_KEY, JSON.stringify(updated));
  notifySync();

  // Async server persistence
  fetch(`${API_BASE_URL}/work/tickets/${ticketId}`, {
    method: 'DELETE'
  }).catch(e => console.warn('Offline delete sync fallback:', e));

  return true;
};

// Subscribe to real-time live sync (Cross-tab + Multi-user DB polling + Window focus)
export const subscribeToWorkChanges = (callback: () => void) => {
  let channelHandler: ((event: MessageEvent) => void) | null = null;
  if (syncChannel) {
    channelHandler = (event: MessageEvent) => {
      if (event.data && event.data.type === 'WORK_UPDATED') {
        callback();
      }
    };
    syncChannel.addEventListener('message', channelHandler);
  }

  const storageHandler = (e: StorageEvent) => {
    if (e.key === STORAGE_TICKETS_KEY || e.key === STORAGE_SPRINTS_KEY) {
      callback();
    }
  };
  window.addEventListener('storage', storageHandler);

  // Background multi-user polling: sync with SQLite server every 4 seconds
  const pollInterval = setInterval(() => {
    fetchTicketsFromDb().then(() => {
      fetchSprintsFromDb().then(() => {
        callback();
      });
    });
  }, 4000);

  // Instant re-sync on tab/window focus
  const focusHandler = () => {
    fetchTicketsFromDb().then(() => {
      fetchSprintsFromDb().then(() => {
        callback();
      });
    });
  };
  window.addEventListener('focus', focusHandler);

  return () => {
    if (syncChannel && channelHandler) {
      syncChannel.removeEventListener('message', channelHandler);
    }
    window.removeEventListener('storage', storageHandler);
    clearInterval(pollInterval);
    window.removeEventListener('focus', focusHandler);
  };
};
