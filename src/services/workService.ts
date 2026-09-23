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

const STORAGE_TICKETS_KEY = 'iatomica_work_tickets_v3';
const STORAGE_SPRINTS_KEY = 'iatomica_work_sprints_v3';
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
    id: 'sp-esp-1',
    projectId: 'espana',
    name: 'Sprint 1 · Prospección & Diagnóstico Valencia',
    goal: 'Relevamiento y diagnóstico inicial de 31 empresas y profesionales en Cabanyal, Marítim y Valencia capital.',
    status: 'active',
    startDate: '2026-09-01',
    endDate: '2026-09-30'
  },
  {
    id: 'sp-esp-2',
    projectId: 'espana',
    name: 'Sprint 2 · Propuestas Comerciales & Onboarding Península',
    goal: 'Presentación de soluciones de turnero WhatsApp, modernización web y portales seguros a prospectos calificados.',
    status: 'planned',
    startDate: '2026-10-01',
    endDate: '2026-10-31'
  }
];

// Seed initial Tickets (All in initial 'todo' phase, based on Valencia prospects)
const INITIAL_TICKETS: WorkTicket[] = [
  {
    id: 't-esp-101',
    code: 'ESP-101',
    projectId: 'espana',
    sprintId: 'sp-esp-1',
    title: 'Auditoría inicial de presencia digital y ficha Google Maps en sector dental Valencia',
    description: 'Relevamiento de fichas y posicionamiento local para Lainez Dental y clínicas de Serrería / Cabanyal.',
    status: 'todo',
    priority: 'alta',
    crm: {
      clientName: 'Dra. María Láinez',
      company: 'Lainez Dental',
      email: 'contacto@lainezdental.com',
      phone: '+34 963 22 75 14',
      service: 'Herramientas de IA & Citas',
      budget: '€3,200 EUR'
    },
    comments: [
      {
        id: 'c-101',
        authorName: 'Stefi Del Papa',
        authorRole: 'Project Lead · España',
        authorInitials: 'SD',
        text: 'Prospecto recopilado en relevamiento territorial. Dispone de web pero sin agenda automatizada de turnos.',
        timestamp: '2026-09-20T10:00:00Z'
      }
    ],
    createdBy: 'Stefi Del Papa',
    createdAt: '2026-09-20T09:30:00Z',
    updatedAt: '2026-09-20T09:30:00Z'
  },
  {
    id: 't-esp-102',
    code: 'ESP-102',
    projectId: 'espana',
    sprintId: 'sp-esp-1',
    title: 'Diseño de flujo de turnero WhatsApp y recordatorios automáticos en Centro AIRE',
    description: 'Estructurar canal conversacional para reservas de consultas de fisioterapia y podología.',
    status: 'todo',
    priority: 'urgente',
    crm: {
      clientName: 'Dirección Médica AIRE',
      company: 'Centro AIRE (Fisioterapia y Podología)',
      email: 'contacto@airevalencia.es',
      phone: '+34 962 49 04 00',
      service: 'Automatización & WhatsApp',
      budget: '€3,200 EUR'
    },
    comments: [
      {
        id: 'c-102',
        authorName: 'Lic. Mateo Rossi',
        authorRole: 'Admin',
        authorInitials: 'MR',
        text: 'Coordinar con Stefi la maqueta inicial del flujo de reservas por WhatsApp.',
        timestamp: '2026-09-21T11:00:00Z'
      }
    ],
    createdBy: 'Lic. Mateo Rossi',
    createdAt: '2026-09-21T10:00:00Z',
    updatedAt: '2026-09-21T10:00:00Z'
  },
  {
    id: 't-esp-103',
    code: 'ESP-103',
    projectId: 'espana',
    sprintId: 'sp-esp-1',
    title: 'Propuesta de modernización web y portfolio para OSB Arquitectos y Fandiño',
    description: 'Diseño de portfolio visual en alta resolución con optimización WebP y cotizador de reformas/obra.',
    status: 'todo',
    priority: 'alta',
    crm: {
      clientName: 'Dirección de Estudio OSB',
      company: 'OSB Arquitectos',
      email: 'contacto@osbarquitectos.com',
      phone: '+34 963 20 40 85',
      service: 'Desarrollo a Medida',
      budget: '€2,800 EUR'
    },
    comments: [],
    createdBy: 'Stefi Del Papa',
    createdAt: '2026-09-21T15:00:00Z',
    updatedAt: '2026-09-21T15:00:00Z'
  },
  {
    id: 't-esp-104',
    code: 'ESP-104',
    projectId: 'espana',
    sprintId: null, // Backlog
    title: 'Dossier de portal seguro de clientes para Gestoría Cabanyal SLP y Canyamelar Assessors',
    description: 'Relevar requerimientos para recepción automatizada de facturas y consultas fiscales recurrentes.',
    status: 'todo',
    priority: 'media',
    crm: {
      clientName: 'Socio Gestor Cabanyal',
      company: 'Gestoría Cabanyal SLP',
      email: 'contacto@gestoriacabanyalslp.es',
      phone: '+34 963 71 14 50',
      service: 'Consultoría Técnica',
      budget: '€2,600 EUR'
    },
    comments: [],
    createdBy: 'Stefi Del Papa',
    createdAt: '2026-09-22T08:00:00Z',
    updatedAt: '2026-09-22T08:00:00Z'
  },
  {
    id: 't-esp-105',
    code: 'ESP-105',
    projectId: 'espana',
    sprintId: null, // Backlog
    title: 'Estandarización de dossier de servicios legales digitales para Ángel Toledo Algarra',
    description: 'Análisis de captación online y reserva de primera consulta jurídica en despacho de Carrer Reina.',
    status: 'todo',
    priority: 'media',
    crm: {
      clientName: 'Lic. Ángel Toledo Algarra',
      company: 'Ángel Toledo Algarra Abogados',
      email: 'contacto@angeltoledo.com',
      phone: '+34 637 73 65 33',
      service: 'Consultoría Técnica',
      budget: '€2,200 EUR'
    },
    comments: [],
    createdBy: 'Stefi Del Papa',
    createdAt: '2026-09-22T09:30:00Z',
    updatedAt: '2026-09-22T09:30:00Z'
  },
  {
    id: 't-esp-106',
    code: 'ESP-106',
    projectId: 'espana',
    sprintId: null, // Backlog
    title: 'Plan de desarrollo web para comercios y profesionales sin sitio web en Valencia',
    description: 'Estructuración de paquetes llave en mano para 18 prospectos identificados sin presencia online propia.',
    status: 'todo',
    priority: 'alta',
    crm: {
      clientName: 'Stefi Del Papa & Mateo Rossi',
      company: 'Comercios Sin Web Valencia',
      email: 'stefi.delpapa@iatomica.com',
      phone: '+34 685 41 27 63',
      service: 'Desarrollo Web Llave en Mano',
      budget: '€1,950 EUR'
    },
    comments: [],
    createdBy: 'Lic. Mateo Rossi',
    createdAt: '2026-09-22T14:00:00Z',
    updatedAt: '2026-09-22T14:00:00Z'
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
