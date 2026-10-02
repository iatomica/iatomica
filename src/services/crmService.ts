import type { JiraIssue } from './jiraService';

export const PROSPECT_STATUSES = [
  'Nuevo',
  'A contactar',
  'Contactado',
  'Respondió',
  'Reunión',
  'Propuesta',
  'Negociación',
  'Ganado',
  'Perdido',
  'Descartado'
] as const;

export type CompanyStatus = typeof PROSPECT_STATUSES[number] | 'lead' | 'qualified' | 'negotiation' | 'active_client' | 'vip' | 'churn' | string;

export const POTENTIAL_SERVICES = [
  'Página web',
  'Automatización',
  'Bot WhatsApp',
  'Sistema de gestión',
  'Diseño gráfico',
  'Redes / contenido',
  'Consultoría',
  'Varios'
] as const;

export type PotentialService = typeof POTENTIAL_SERVICES[number] | string;

export const ACTIVITY_TYPES = [
  'Llamada',
  'WhatsApp',
  'Email',
  'Reunión',
  'Seguimiento',
  'Propuesta enviada',
  'Cambio de estado',
  'Nota interna',
  'Otro'
] as const;

export type ActivityType = typeof ACTIVITY_TYPES[number] | 'call' | 'meeting' | 'whatsapp' | 'email' | 'note' | string;

export const ACTIVITY_CHANNELS = [
  'WhatsApp',
  'Teléfono',
  'Email',
  'Instagram',
  'Reunión presencial',
  'Videollamada',
  'Otro'
] as const;

export type ActivityChannel = typeof ACTIVITY_CHANNELS[number] | string;

export interface CrmActivity {
  id: string;
  companyId: string;
  type: string;
  channel?: string;
  result?: string;
  summary: string;
  details?: string;
  author: string;
  nextAction?: string;
  nextActionDate?: string;
  createdAt: string;
}

export interface CrmComment {
  id: string;
  companyId: string;
  authorId?: string;
  authorName: string;
  comment: string;
  createdAt: string;
  updatedAt: string;
}

export interface CrmCompany {
  id: string;
  name: string; // Negocio / Profesional
  legalName?: string;
  industry: string; // Rubro
  city?: string; // Ciudad
  address?: string; // Dirección
  phone?: string; // Teléfono
  whatsapp?: string; // WhatsApp
  instagram?: string; // Instagram
  website?: string; // Sitio web
  email?: string; // Email de contacto
  googleRating?: number; // Rating de Google
  googleReviewsCount?: number; // Cantidad de reseñas
  contactName: string; // Persona de contacto
  contactRole?: string; // Cargo / rol del contacto
  potentialService?: string; // Servicio potencial
  status: CompanyStatus; // Estado comercial
  estimatedValue: number;
  territory?: string;
  assignedTo: string; // Responsable / vendedor
  lastContactAt?: string; // Último contacto
  nextAction?: string; // Próximo paso
  nextFollowupAt?: string; // Fecha de próximo seguimiento
  techRequirements?: string;
  notes?: string; // Observaciones generales
  legacyData?: string; // Datos originales respaldados
  isDuplicatePossible?: boolean | number;
  createdAt: string;
  updatedAt: string;
  activitiesCount?: number;
  issuesCount?: number;
  commentsCount?: number;
  activities?: CrmActivity[];
  issues?: JiraIssue[];
  comments?: CrmComment[];
}

const STORAGE_KEY = 'iatomica_crm_companies_cache_v4';
const SYNC_CHANNEL_NAME = 'iatomica_crm_companies_live_sync';
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

let syncChannel: BroadcastChannel | null = null;
if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
  try {
    syncChannel = new BroadcastChannel(SYNC_CHANNEL_NAME);
  } catch (e) {
    console.warn('BroadcastChannel not supported for CRM');
  }
}

export const notifyLiveSync = () => {
  if (syncChannel) {
    syncChannel.postMessage({ type: 'CRM_UPDATED', timestamp: Date.now() });
  }
};

let cachedCompanies: CrmCompany[] = [];

export const fetchCompanies = async (): Promise<CrmCompany[]> => {
  try {
    const res = await fetch(`${API_BASE_URL}/crm/companies`);
    if (res.ok) {
      const data = await res.json();
      cachedCompanies = data;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      return data;
    }
  } catch (err) {
    console.warn('CRM API offline, using cache');
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      cachedCompanies = JSON.parse(raw);
      return cachedCompanies;
    }
  } catch (e) {
    // ignore
  }

  return cachedCompanies;
};

export const fetchCompanyDetail = async (id: string): Promise<CrmCompany | null> => {
  try {
    const res = await fetch(`${API_BASE_URL}/crm/companies/${id}`);
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn('Error fetching company detail:', err);
  }
  return null;
};

export const subscribeToCrmChanges = (callback: () => void) => {
  if (syncChannel) {
    const handler = (event: MessageEvent) => {
      if (event.data && event.data.type === 'CRM_UPDATED') {
        fetchCompanies().then(() => callback());
      }
    };
    syncChannel.addEventListener('message', handler);
    return () => syncChannel?.removeEventListener('message', handler);
  }
  return () => {};
};

export const createCompany = async (newCompany: Partial<CrmCompany>): Promise<CrmCompany | null> => {
  try {
    const res = await fetch(`${API_BASE_URL}/crm/companies`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newCompany)
    });
    if (res.ok) {
      const created = await res.json();
      await fetchCompanies();
      notifyLiveSync();
      return created;
    }
  } catch (err) {
    console.warn('Error creating company:', err);
  }
  return null;
};

export const updateCompany = async (id: string, updates: Partial<CrmCompany>): Promise<CrmCompany | null> => {
  try {
    const res = await fetch(`${API_BASE_URL}/crm/companies/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates)
    });
    if (res.ok) {
      const updated = await res.json();
      await fetchCompanies();
      notifyLiveSync();
      return updated;
    }
  } catch (err) {
    console.warn('Error updating company:', err);
  }
  return null;
};

export const deleteCompany = async (id: string): Promise<boolean> => {
  try {
    const res = await fetch(`${API_BASE_URL}/crm/companies/${id}`, {
      method: 'DELETE'
    });
    if (res.ok) {
      await fetchCompanies();
      notifyLiveSync();
      return true;
    }
  } catch (err) {
    console.warn('Error deleting company:', err);
  }
  return false;
};

export const addCompanyActivity = async (
  companyId: string,
  activity: Omit<CrmActivity, 'id' | 'companyId' | 'createdAt'>
): Promise<CrmActivity | null> => {
  try {
    const res = await fetch(`${API_BASE_URL}/crm/companies/${companyId}/activities`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(activity)
    });
    if (res.ok) {
      const created = await res.json();
      await fetchCompanies();
      notifyLiveSync();
      return created;
    }
  } catch (err) {
    console.warn('Error adding activity:', err);
  }
  return null;
};

export const addCompanyComment = async (
  companyId: string,
  commentData: { comment: string; authorName: string; authorId?: string }
): Promise<CrmComment | null> => {
  try {
    const res = await fetch(`${API_BASE_URL}/crm/companies/${companyId}/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(commentData)
    });
    if (res.ok) {
      const created = await res.json();
      await fetchCompanies();
      notifyLiveSync();
      return created;
    }
  } catch (err) {
    console.warn('Error adding comment:', err);
  }
  return null;
};

export const updateCompanyComment = async (
  commentId: string,
  commentText: string
): Promise<CrmComment | null> => {
  try {
    const res = await fetch(`${API_BASE_URL}/crm/comments/${commentId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ comment: commentText })
    });
    if (res.ok) {
      const updated = await res.json();
      notifyLiveSync();
      return updated;
    }
  } catch (err) {
    console.warn('Error updating comment:', err);
  }
  return null;
};

export const deleteCompanyComment = async (commentId: string): Promise<boolean> => {
  try {
    const res = await fetch(`${API_BASE_URL}/crm/comments/${commentId}`, {
      method: 'DELETE'
    });
    if (res.ok) {
      notifyLiveSync();
      return true;
    }
  } catch (err) {
    console.warn('Error deleting comment:', err);
  }
  return false;
};

export const generateWhatsAppLink = (phone: string, contactName: string, companyName: string): string => {
  const cleanPhone = phone.replace(/[^0-9]/g, '');
  const message = `Hola ${contactName || ''}, te contacto desde iAtomica respecto a ${companyName}. ¿Cómo estás? Quería consultar sobre el seguimiento de su proyecto digital.`;
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
};

export const generateInstagramLink = (handle: string): string => {
  const cleanHandle = handle.replace(/[@\s]/g, '');
  return `https://instagram.com/${cleanHandle}`;
};

// CSV Export Utility for Prospects
export const exportCompaniesToCsv = (companies: CrmCompany[], filename: string = 'prospectos-iatomica.csv') => {
  const headers = [
    'ID',
    'Negocio / Profesional',
    'Rubro',
    'Ciudad',
    'Direccion',
    'Telefono',
    'WhatsApp',
    'Instagram',
    'Sitio Web',
    'Rating Google',
    'Resenas Google',
    'Persona de Contacto',
    'Cargo Contacto',
    'Servicio Potencial',
    'Estado Comercial',
    'Responsable',
    'Ultimo Contacto',
    'Proximo Paso',
    'Fecha Proximo Seguimiento',
    'Observaciones',
    'Fecha Creacion'
  ];

  const escapeCsv = (val: any): string => {
    if (val === null || val === undefined) return '""';
    const str = String(val).replace(/"/g, '""');
    return `"${str}"`;
  };

  const rows = companies.map(c => [
    escapeCsv(c.id),
    escapeCsv(c.name),
    escapeCsv(c.industry),
    escapeCsv(c.city || 'Valencia'),
    escapeCsv(c.address || ''),
    escapeCsv(c.phone || ''),
    escapeCsv(c.whatsapp || c.phone || ''),
    escapeCsv(c.instagram || ''),
    escapeCsv(c.website || ''),
    escapeCsv(c.googleRating || 0),
    escapeCsv(c.googleReviewsCount || 0),
    escapeCsv(c.contactName || ''),
    escapeCsv(c.contactRole || ''),
    escapeCsv(c.potentialService || 'Página web'),
    escapeCsv(c.status || 'Nuevo'),
    escapeCsv(c.assignedTo || ''),
    escapeCsv(c.lastContactAt ? new Date(c.lastContactAt).toLocaleDateString() : ''),
    escapeCsv(c.nextAction || ''),
    escapeCsv(c.nextFollowupAt ? new Date(c.nextFollowupAt).toLocaleDateString() : ''),
    escapeCsv(c.notes || ''),
    escapeCsv(c.createdAt ? new Date(c.createdAt).toLocaleDateString() : '')
  ]);

  const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\r\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

// CSV Export Utility for Activity History
export const exportActivitiesToCsv = (activities: CrmActivity[], companyName: string = 'Historial') => {
  const headers = ['ID', 'Fecha', 'Asesor', 'Canal', 'Tipo', 'Resultado', 'Resumen', 'Detalle', 'Proximo Paso', 'Fecha Proximo'];
  const escapeCsv = (val: any): string => {
    if (val === null || val === undefined) return '""';
    const str = String(val).replace(/"/g, '""');
    return `"${str}"`;
  };

  const rows = activities.map(a => [
    escapeCsv(a.id),
    escapeCsv(a.createdAt ? new Date(a.createdAt).toLocaleString() : ''),
    escapeCsv(a.author),
    escapeCsv(a.channel || 'WhatsApp'),
    escapeCsv(a.type),
    escapeCsv(a.result || ''),
    escapeCsv(a.summary),
    escapeCsv(a.details || ''),
    escapeCsv(a.nextAction || ''),
    escapeCsv(a.nextActionDate ? new Date(a.nextActionDate).toLocaleDateString() : '')
  ]);

  const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\r\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `historial-${companyName.toLowerCase().replace(/[^a-z0-9]/g, '-')}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
