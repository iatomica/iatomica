import type { JiraIssue } from './jiraService';

export type CompanyStatus = 'lead' | 'qualified' | 'negotiation' | 'active_client' | 'vip' | 'churn';

export type ActivityType = 'call' | 'meeting' | 'whatsapp' | 'email' | 'note';

export interface CrmActivity {
  id: string;
  companyId: string;
  type: ActivityType;
  summary: string;
  details?: string;
  author: string;
  nextAction?: string;
  nextActionDate?: string;
  createdAt: string;
}

export interface CrmCompany {
  id: string;
  name: string;
  legalName?: string;
  industry: string;
  contactName: string;
  contactRole?: string;
  email: string;
  phone?: string;
  website?: string;
  status: CompanyStatus;
  estimatedValue: number;
  assignedTo: string;
  techRequirements?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  activitiesCount?: number;
  issuesCount?: number;
  activities?: CrmActivity[];
  issues?: JiraIssue[];
}

const STORAGE_KEY = 'iatomica_crm_companies_cache_v1';
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

const notifyLiveSync = () => {
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

export const createCompany = async (newCompany: Omit<CrmCompany, 'id' | 'createdAt' | 'updatedAt' | 'activitiesCount' | 'issuesCount'>): Promise<CrmCompany | null> => {
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

export const addCompanyActivity = async (companyId: string, activity: Omit<CrmActivity, 'id' | 'companyId' | 'createdAt'>): Promise<CrmActivity | null> => {
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

export const generateWhatsAppLink = (phone: string, contactName: string, companyName: string): string => {
  const cleanPhone = phone.replace(/[^0-9]/g, '');
  const message = `Hola ${contactName}, te contacto desde iAtomica respecto a la cuenta de ${companyName}. ¿Cómo estás? Quería consultar sobre el seguimiento de su proyecto.`;
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
};
