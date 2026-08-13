export type LeadStatus = 'nuevo' | 'en_contacto' | 'cita_agendada' | 'propuesta' | 'cliente';

export type LeadRole = 'Atención Público' | 'Consultoría Técnica' | 'Ventas' | 'Sin Asignar';

export interface LeadNote {
  id: string;
  author: string;
  text: string;
  timestamp: string;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  company: string;
  phone: string;
  service: string;
  message: string;
  status: LeadStatus;
  assignedTo: LeadRole;
  createdAt: string;
  notes?: LeadNote[];
}

const STORAGE_KEY = 'iatomica_crm_leads_v3';
const SYNC_CHANNEL_NAME = 'iatomica_crm_live_sync';

// BroadcastChannel for instant live synchronization across browser windows & tabs
let syncChannel: BroadcastChannel | null = null;
if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
  try {
    syncChannel = new BroadcastChannel(SYNC_CHANNEL_NAME);
  } catch (e) {
    console.warn('BroadcastChannel not supported in this environment');
  }
}

const notifyLiveSync = () => {
  if (syncChannel) {
    syncChannel.postMessage({ type: 'LEADS_UPDATED', timestamp: Date.now() });
  }
};

const SEED_LEADS: Lead[] = [
  {
    id: 'lead-101',
    name: 'Carlos Benítez',
    email: 'cbenitez@logistica-sur.com',
    company: 'Logística Sur S.A.',
    phone: '+54 9 11 4455 6677',
    service: 'Desarrollo de Herramientas IA',
    message: 'Necesitamos un asistente inteligente para procesar pedidos de clientes y responder por WhatsApp.',
    status: 'nuevo',
    assignedTo: 'Atención Público',
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
    notes: [
      {
        id: 'n-1',
        author: 'Sofía Martínez (Atención Público)',
        text: 'Consulta recibida por formulario web. Se envió mensaje inicial de saludo por WhatsApp.',
        timestamp: new Date(Date.now() - 3600000 * 3).toISOString()
      }
    ]
  },
  {
    id: 'lead-102',
    name: 'Mariana Rossi',
    email: 'mrossi@distribuidoraglobal.com',
    company: 'Distribuidora Global',
    phone: '+54 9 11 5566 7788',
    service: 'Consultoría & Asesoramiento',
    message: 'Queremos realizar una auditoría técnica de nuestros sistemas actuales para digitalizar la facturación.',
    status: 'en_contacto',
    assignedTo: 'Consultoría Técnica',
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    notes: [
      {
        id: 'n-2',
        author: 'Ing. Lucas Varela',
        text: 'Se revisó la infraestructura actual. Tienen servidor local y quieren migrar a Docker en nube.',
        timestamp: new Date(Date.now() - 3600000 * 18).toISOString()
      }
    ]
  },
  {
    id: 'lead-103',
    name: 'Federico Gómez',
    email: 'fgomez@retail-norte.com',
    company: 'Retail Norte',
    phone: '+54 9 11 6677 8899',
    service: 'Software a Medida & Apps',
    message: 'Buscamos desarrollar un portal de clientes custom conectado con nuestra base de datos.',
    status: 'cita_agendada',
    assignedTo: 'Atención Público',
    createdAt: new Date(Date.now() - 3600000 * 48).toISOString(),
    notes: []
  },
  {
    id: 'lead-104',
    name: 'Lucía Fernández',
    email: 'lfernandez@innovatech.ar',
    company: 'InnovaTech',
    phone: '+54 9 11 7788 9900',
    service: 'Mantenimiento & Control de Calidad (QA)',
    message: 'Requerimos servicios de testing QA y soporte preventivo para nuestra plataforma web.',
    status: 'propuesta',
    assignedTo: 'Consultoría Técnica',
    createdAt: new Date(Date.now() - 3600000 * 72).toISOString(),
    notes: []
  }
];

export const getLeads = (): Lead[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_LEADS));
      return SEED_LEADS;
    }
    return JSON.parse(raw);
  } catch (e) {
    return SEED_LEADS;
  }
};

export const subscribeToLeadChanges = (callback: () => void) => {
  if (syncChannel) {
    const handler = (event: MessageEvent) => {
      if (event.data && event.data.type === 'LEADS_UPDATED') {
        callback();
      }
    };
    syncChannel.addEventListener('message', handler);
    return () => syncChannel?.removeEventListener('message', handler);
  }

  // Fallback to window storage event for cross-tab sync
  const storageHandler = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) {
      callback();
    }
  };
  window.addEventListener('storage', storageHandler);
  return () => window.removeEventListener('storage', storageHandler);
};

export const createLead = (newLeadData: Omit<Lead, 'id' | 'status' | 'assignedTo' | 'createdAt' | 'notes'>): Lead => {
  const leads = getLeads();
  const lead: Lead = {
    ...newLeadData,
    id: 'lead-' + Date.now(),
    status: 'nuevo',
    assignedTo: 'Atención Público',
    createdAt: new Date().toISOString(),
    notes: []
  };
  const updated = [lead, ...leads];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  notifyLiveSync();
  return lead;
};

export const updateLeadStatus = (id: string, status: LeadStatus): Lead[] => {
  const leads = getLeads();
  const updated = leads.map(l => l.id === id ? { ...l, status } : l);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  notifyLiveSync();
  return updated;
};

export const assignLeadRole = (id: string, assignedTo: LeadRole): Lead[] => {
  const leads = getLeads();
  const updated = leads.map(l => l.id === id ? { ...l, assignedTo } : l);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  notifyLiveSync();
  return updated;
};

export const addLeadNote = (id: string, text: string, author: string): Lead[] => {
  const leads = getLeads();
  const note: LeadNote = {
    id: 'note-' + Date.now(),
    author,
    text,
    timestamp: new Date().toISOString()
  };
  const updated = leads.map(l => {
    if (l.id === id) {
      const existing = l.notes || [];
      return { ...l, notes: [...existing, note] };
    }
    return l;
  });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  notifyLiveSync();
  return updated;
};

export const deleteLead = (id: string): Lead[] => {
  const leads = getLeads();
  const updated = leads.filter(l => l.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  notifyLiveSync();
  return updated;
};
