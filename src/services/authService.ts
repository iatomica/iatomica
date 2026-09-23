export type UserRole = 'admin' | 'project_user';
export type ProjectScope = 'all' | 'bariloche' | 'espana';

export interface User {
  id: string;
  name: string;
  email: string;
  username: string;
  role: UserRole;
  projectId: ProjectScope;
  title: string;
  initials: string;
  projectLabel: string;
}

const AUTH_STORAGE_KEY = 'iatomica_auth_user_v3';

export const TEAM_MEMBERS = [
  'Lic. Mateo Rossi',
  'Stefi Del Papa',
  'José Anaya'
] as const;

export type TeamMember = typeof TEAM_MEMBERS[number];

export const DEMO_USERS: User[] = [
  {
    id: 'usr-admin',
    name: 'Lic. Mateo Rossi',
    email: 'admin@iatomica.com',
    username: 'admin',
    role: 'admin',
    projectId: 'all',
    title: 'Director de Operaciones & Sistemas',
    initials: 'MR',
    projectLabel: 'Super Admin (Todos los Proyectos)'
  },
  {
    id: 'usr-jose',
    name: 'José Anaya',
    email: 'jose.anaya@iatomica.com',
    username: 'jose.anaya',
    role: 'project_user',
    projectId: 'bariloche',
    title: 'Project Lead · Bariloche',
    initials: 'JA',
    projectLabel: 'Proyecto Bariloche'
  },
  {
    id: 'usr-stefi',
    name: 'Stefi Del Papa',
    email: 'stefi.delpapa@iatomica.com',
    username: 'stefi.delpapa',
    role: 'project_user',
    projectId: 'espana',
    title: 'Project Lead · España',
    initials: 'SD',
    projectLabel: 'Proyecto España'
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

export const loginUser = (identifier: string, pass: string): { success: boolean; user?: User; error?: string } => {
  const cleanId = identifier.trim().toLowerCase();
  const cleanPass = pass.trim();

  // Accept pass123 or standard credentials
  if (cleanPass !== 'pass123' && cleanPass !== 'admin') {
    return { success: false, error: 'Contraseña incorrecta (usa "pass123")' };
  }

  const found = DEMO_USERS.find(
    u => u.email.toLowerCase() === cleanId || u.username.toLowerCase() === cleanId
  );

  if (!found) {
    return {
      success: false,
      error: `Usuario no reconocido. Opciones: admin, jose.anaya, stefi.delpapa`
    };
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
