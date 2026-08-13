export type LeadStatus = 'nuevo' | 'en_contacto' | 'cita_agendada' | 'propuesta' | 'cliente';

export type LeadRole = 'Atención Público' | 'Consultoría Técnica' | 'Ventas' | 'Sin Asignar';

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
  notes?: string[];
}

const STORAGE_KEY = 'iatomica_crm_leads_v2';

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
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString()
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
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString()
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
    createdAt: new Date(Date.now() - 3600000 * 48).toISOString()
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
    createdAt: new Date(Date.now() - 3600000 * 72).toISOString()
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

export const createLead = (newLeadData: Omit<Lead, 'id' | 'status' | 'assignedTo' | 'createdAt'>): Lead => {
  const leads = getLeads();
  const lead: Lead = {
    ...newLeadData,
    id: 'lead-' + Date.now(),
    status: 'nuevo',
    assignedTo: 'Atención Público',
    createdAt: new Date().toISOString()
  };
  const updated = [lead, ...leads];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return lead;
};

export const updateLeadStatus = (id: string, status: LeadStatus): Lead[] => {
  const leads = getLeads();
  const updated = leads.map(l => l.id === id ? { ...l, status } : l);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
};

export const assignLeadRole = (id: string, assignedTo: LeadRole): Lead[] => {
  const leads = getLeads();
  const updated = leads.map(l => l.id === id ? { ...l, assignedTo } : l);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
};

export const deleteLead = (id: string): Lead[] => {
  const leads = getLeads();
  const updated = leads.filter(l => l.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
};
