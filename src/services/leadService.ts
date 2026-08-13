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

const STORAGE_KEY = 'iatomica_crm_leads_v5';
const SYNC_CHANNEL_NAME = 'iatomica_crm_live_sync';
const API_BASE_URL = 'http://localhost:3001/api';

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

let cachedLeads: Lead[] = [];

export const fetchLeadsFromDb = async (): Promise<Lead[]> => {
  try {
    const res = await fetch(`${API_BASE_URL}/leads`);
    if (res.ok) {
      const data = await res.json();
      cachedLeads = data;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      return data;
    }
  } catch (err) {
    console.warn('SQLite API server offline, using local cache');
  }

  return getLeads();
};

export const getLeads = (): Lead[] => {
  if (cachedLeads.length > 0) return cachedLeads;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    cachedLeads = JSON.parse(raw);
    return cachedLeads;
  } catch (e) {
    return [];
  }
};

export const subscribeToLeadChanges = (callback: () => void) => {
  if (syncChannel) {
    const handler = (event: MessageEvent) => {
      if (event.data && event.data.type === 'LEADS_UPDATED') {
        fetchLeadsFromDb().then(() => callback());
      }
    };
    syncChannel.addEventListener('message', handler);
    return () => syncChannel?.removeEventListener('message', handler);
  }

  const storageHandler = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) {
      fetchLeadsFromDb().then(() => callback());
    }
  };
  window.addEventListener('storage', storageHandler);
  return () => window.removeEventListener('storage', storageHandler);
};

export const createLead = async (newLeadData: Omit<Lead, 'id' | 'status' | 'assignedTo' | 'createdAt' | 'notes'>): Promise<Lead> => {
  const tempId = 'lead-' + Date.now();
  const tempLead: Lead = {
    ...newLeadData,
    id: tempId,
    status: 'nuevo',
    assignedTo: 'Atención Público',
    createdAt: new Date().toISOString(),
    notes: []
  };

  try {
    const res = await fetch(`${API_BASE_URL}/leads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newLeadData)
    });
    if (res.ok) {
      const created = await res.json();
      await fetchLeadsFromDb();
      notifyLiveSync();
      return created;
    }
  } catch (err) {
    console.warn('SQLite API offline, saving to local cache');
  }

  const leads = getLeads();
  const updated = [tempLead, ...leads];
  cachedLeads = updated;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  notifyLiveSync();
  return tempLead;
};

export const updateLeadStatus = async (id: string, status: LeadStatus): Promise<Lead[]> => {
  try {
    await fetch(`${API_BASE_URL}/leads/${id}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
  } catch (err) {
    console.warn('SQLite API offline');
  }

  const leads = getLeads();
  const updated = leads.map(l => l.id === id ? { ...l, status } : l);
  cachedLeads = updated;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  notifyLiveSync();
  return updated;
};

export const assignLeadRole = async (id: string, assignedTo: LeadRole): Promise<Lead[]> => {
  try {
    await fetch(`${API_BASE_URL}/leads/${id}/assign`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ assignedTo })
    });
  } catch (err) {
    console.warn('SQLite API offline');
  }

  const leads = getLeads();
  const updated = leads.map(l => l.id === id ? { ...l, assignedTo } : l);
  cachedLeads = updated;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  notifyLiveSync();
  return updated;
};

export const addLeadNote = async (id: string, text: string, author: string): Promise<Lead[]> => {
  try {
    await fetch(`${API_BASE_URL}/leads/${id}/notes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, author })
    });
    return await fetchLeadsFromDb();
  } catch (err) {
    console.warn('SQLite API offline');
  }

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
  cachedLeads = updated;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  notifyLiveSync();
  return updated;
};

export const deleteLead = async (id: string): Promise<Lead[]> => {
  try {
    await fetch(`${API_BASE_URL}/leads/${id}`);
    await fetch(`${API_BASE_URL}/leads/${id}`, { method: 'DELETE' });
  } catch (err) {
    console.warn('SQLite API offline');
  }

  const leads = getLeads();
  const updated = leads.filter(l => l.id !== id);
  cachedLeads = updated;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  notifyLiveSync();
  return updated;
};
