import type { LeadRole } from './leadService';

export interface User {
  id: string;
  name: string;
  email: string;
  role: LeadRole | 'Administrador';
  title: string;
  avatar: string;
}

const AUTH_STORAGE_KEY = 'iatomica_auth_user_v2';

export const DEMO_USERS: User[] = [
  {
    id: 'usr-1',
    name: 'Sofía Martínez',
    email: 'atencion@iatomica.com',
    role: 'Atención Público',
    title: 'Coordinadora de Atención & Leads',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'usr-2',
    name: 'Ing. Lucas Varela',
    email: 'tecnico@iatomica.com',
    role: 'Consultoría Técnica',
    title: 'Lead Architect & IA Tech Consultant',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'usr-3',
    name: 'Lic. Mateo Rossi',
    email: 'admin@iatomica.com',
    role: 'Administrador',
    title: 'Director de Operaciones',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
  }
];

export const getCurrentUser = (): User | null => {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (e) {
    return null;
  }
};

export const loginUser = (email: string, pass: string): { success: boolean; user?: User; error?: string } => {
  if (pass !== 'pass123' && pass !== 'admin123') {
    return { success: false, error: 'Contraseña incorrecta (Usa: pass123)' };
  }

  const found = DEMO_USERS.find(u => u.email.toLowerCase() === email.trim().toLowerCase());
  if (!found) {
    return { success: false, error: 'Usuario no encontrado en el sistema' };
  }

  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(found));
  return { success: true, user: found };
};

export const loginAsPreset = (userId: string): User => {
  const found = DEMO_USERS.find(u => u.id === userId) || DEMO_USERS[0];
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(found));
  return found;
};

export const logoutUser = () => {
  localStorage.removeItem(AUTH_STORAGE_KEY);
};
