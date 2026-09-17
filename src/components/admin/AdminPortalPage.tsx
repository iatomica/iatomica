import React, { useState, useEffect, useCallback } from 'react';
import { getCurrentUser, logoutUser } from '../../services/authService';
import type { User, ProjectScope } from '../../services/authService';
import {
  getTickets,
  getSprints,
  updateTicketStatus,
  updateTicketSprint,
  addTicketComment,
  deleteTicket,
  subscribeToWorkChanges,
  PROJECTS
} from '../../services/workService';
import type { WorkTicket, Sprint, TicketStatus, ProjectId } from '../../services/workService';
import { AdminLoginPage } from './AdminLoginPage';
import { KanbanBoard } from './KanbanBoard';
import { BacklogView } from './BacklogView';
import { TicketDetailDrawer } from './TicketDetailDrawer';
import { CreateTicketModal } from './CreateTicketModal';
import {
  Cpu,
  LayoutGrid,
  Layers,
  Table,
  LogOut,
  ArrowLeft,
  Plus,
  Building,
  MessageSquare,
  ShieldCheck,
  Briefcase
} from 'lucide-react';

interface AdminPortalPageProps {
  onReturnToSite: () => void;
  darkMode: boolean;
}

export const AdminPortalPage: React.FC<AdminPortalPageProps> = ({ onReturnToSite, darkMode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(getCurrentUser());

  // Determine initial project scope based on user role
  const getInitialProjectScope = (user: User | null): ProjectScope => {
    if (!user) return 'all';
    if (user.role === 'admin') return 'all';
    return user.projectId;
  };

  const [activeProjectFilter, setActiveProjectFilter] = useState<ProjectScope>(() =>
    getInitialProjectScope(currentUser)
  );
  const [viewMode, setViewMode] = useState<'kanban' | 'backlog' | 'crm_table'>('kanban');
  const [activeSprintFilter, setActiveSprintFilter] = useState<string>('all');
  const [tickets, setTickets] = useState<WorkTicket[]>([]);
  const [sprints, setSprints] = useState<Sprint[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<WorkTicket | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const loadData = useCallback(() => {
    if (!currentUser) return;
    const currentTickets = getTickets(currentUser, activeProjectFilter);
    const currentSprints = getSprints(currentUser, activeProjectFilter);
    setTickets(currentTickets);
    setSprints(currentSprints);

    if (selectedTicket) {
      const refreshed = currentTickets.find(t => t.id === selectedTicket.id) || null;
      setSelectedTicket(refreshed);
    }
  }, [currentUser, activeProjectFilter, selectedTicket]);

  useEffect(() => {
    loadData();
    const unsubscribe = subscribeToWorkChanges(() => {
      loadData();
    });
    return () => unsubscribe();
  }, [loadData]);

  const handleLoginSuccess = (user: User) => {
    setCurrentUser(user);
    setActiveProjectFilter(user.role === 'admin' ? 'all' : user.projectId);
    loadData();
  };

  const handleLogout = () => {
    logoutUser();
    setCurrentUser(null);
  };

  const handleStatusChange = (id: string, newStatus: TicketStatus) => {
    if (!currentUser) return;
    updateTicketStatus(currentUser, id, newStatus);
    loadData();
  };

  const handleSprintChange = (id: string, sprintId: string | null) => {
    if (!currentUser) return;
    updateTicketSprint(currentUser, id, sprintId);
    loadData();
  };

  const handleAddComment = (id: string, text: string) => {
    if (!currentUser) return;
    addTicketComment(currentUser, id, text);
    loadData();
  };

  const handleDeleteTicket = (id: string) => {
    if (!currentUser) return;
    deleteTicket(currentUser, id);
    if (selectedTicket?.id === id) {
      setSelectedTicket(null);
    }
    loadData();
  };

  if (!currentUser) {
    return (
      <AdminLoginPage
        onLoginSuccess={handleLoginSuccess}
        onReturnToSite={onReturnToSite}
        darkMode={darkMode}
      />
    );
  }

  const isAdmin = currentUser.role === 'admin';

  // Metrics
  const totalTickets = tickets.length;
  const todoCount = tickets.filter(t => t.status === 'todo').length;
  const inProgressCount = tickets.filter(t => t.status === 'in_progress').length;
  const reviewCount = tickets.filter(t => t.status === 'review').length;
  const doneCount = tickets.filter(t => t.status === 'done').length;
  const crmCount = tickets.filter(t => t.crm).length;

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors ${
        darkMode ? 'bg-slate-950 text-white' : 'bg-slate-100 text-slate-900'
      }`}
    >
      {/* Top Header */}
      <header
        className={`px-6 py-4 border-b flex flex-col lg:flex-row items-center justify-between gap-4 sticky top-0 z-40 backdrop-blur-md ${
          darkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white/90 border-slate-200 shadow-xs'
        }`}
      >
        {/* Brand, Return, and Project Scope */}
        <div className="flex items-center space-x-4 w-full lg:w-auto justify-between lg:justify-start">
          <button
            onClick={onReturnToSite}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
            title="Volver al Sitio Web Público"
          >
            <ArrowLeft size={18} />
          </button>

          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl gradient-brand flex items-center justify-center text-white shadow-md">
              <Cpu size={20} />
            </div>
            <div>
              <h1 className="font-heading font-black text-base leading-none flex items-center gap-2">
                <span>Gestión de Trabajo & CRM</span>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
                  🟢 En Vivo
                </span>
              </h1>
              <span className="text-[11px] text-slate-400 font-medium">iAtomica 2.0 Work Platform</span>
            </div>
          </div>

          {/* Project Switcher for Admin OR Fixed Badge for Project Users */}
          <div className="pl-3 border-l border-slate-200 dark:border-slate-800 hidden sm:block">
            {isAdmin ? (
              <div className="flex items-center space-x-2">
                <Briefcase size={14} className="text-orange-500" />
                <select
                  value={activeProjectFilter}
                  onChange={e => setActiveProjectFilter(e.target.value as ProjectScope)}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-800 dark:text-slate-200 border-none focus:outline-none cursor-pointer"
                >
                  <option value="all">🌐 Todos los Proyectos (Vista Global)</option>
                  <option value="bariloche">🌲 Proyecto Bariloche (José Anaya)</option>
                  <option value="espana">🇪🇸 Proyecto España (Stefi Del Papa)</option>
                </select>
              </div>
            ) : (
              <div
                className={`px-3 py-1.5 rounded-xl border flex items-center space-x-2 text-xs font-bold ${
                  PROJECTS[currentUser.projectId as ProjectId].badgeBg
                } ${PROJECTS[currentUser.projectId as ProjectId].badgeText} ${
                  PROJECTS[currentUser.projectId as ProjectId].border
                }`}
              >
                <ShieldCheck size={14} />
                <span>{PROJECTS[currentUser.projectId as ProjectId].name}</span>
              </div>
            )}
          </div>
        </div>

        {/* View Switchers, New Ticket, and User Profile */}
        <div className="flex items-center space-x-3 w-full lg:w-auto justify-between lg:justify-end flex-wrap gap-2">
          {/* New Ticket Button: Accessible to ALL users */}
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="px-3.5 py-2 rounded-xl gradient-brand text-white font-bold text-xs shadow-md hover:opacity-90 transition-all flex items-center space-x-1.5 cursor-pointer"
          >
            <Plus size={15} />
            <span>+ Nueva Tarjeta</span>
          </button>

          {/* View Mode Switcher */}
          <div className="flex items-center p-1 rounded-xl bg-slate-200 dark:bg-slate-800">
            <button
              onClick={() => setViewMode('kanban')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer ${
                viewMode === 'kanban'
                  ? 'gradient-brand text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              <LayoutGrid size={14} />
              <span>Tablero</span>
            </button>

            <button
              onClick={() => setViewMode('backlog')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer ${
                viewMode === 'backlog'
                  ? 'gradient-brand text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              <Layers size={14} />
              <span>Backlog & Sprints</span>
            </button>

            <button
              onClick={() => setViewMode('crm_table')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer ${
                viewMode === 'crm_table'
                  ? 'gradient-brand text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              <Table size={14} />
              <span>Directorio CRM</span>
            </button>
          </div>

          {/* User Profile Badge (NO AVATAR PHOTO - Clean Typographic Monogram) */}
          <div className="flex items-center space-x-2.5 pl-3 border-l border-slate-200 dark:border-slate-800">
            <div
              className={`w-8 h-8 rounded-xl border flex items-center justify-center font-mono font-black text-xs shrink-0 ${
                isAdmin
                  ? 'bg-orange-500/10 text-orange-600 border-orange-500/30'
                  : currentUser.projectId === 'bariloche'
                  ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/30'
                  : 'bg-indigo-500/10 text-indigo-600 border-indigo-500/30'
              }`}
            >
              {currentUser.initials}
            </div>

            <div className="hidden sm:block text-left">
              <h4 className="text-xs font-bold leading-tight">{currentUser.name}</h4>
              <span className="text-[10px] text-slate-400 font-mono block">
                {isAdmin ? 'Super Admin' : currentUser.projectLabel}
              </span>
            </div>

            <button
              onClick={handleLogout}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-500 hover:text-rose-600 transition-colors cursor-pointer"
              title="Cerrar Sesión"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 p-6 max-w-7xl mx-auto w-full space-y-6">
        {/* KPI Metrics Summary */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
          <div
            className={`p-3.5 rounded-2xl border flex items-center space-x-3 ${
              darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
            }`}
          >
            <div className="p-2 rounded-xl bg-orange-500/10 text-orange-600 font-black text-sm">
              {totalTickets}
            </div>
            <div>
              <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 block">Total</span>
              <h4 className="text-xs font-black">{totalTickets} Tarjetas</h4>
            </div>
          </div>

          <div
            className={`p-3.5 rounded-2xl border flex items-center space-x-3 ${
              darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
            }`}
          >
            <div className="p-2 rounded-xl bg-slate-500/10 text-slate-400 font-black text-sm">
              {todoCount}
            </div>
            <div>
              <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 block">Por Iniciar</span>
              <h4 className="text-xs font-black text-slate-400">{todoCount} Pendientes</h4>
            </div>
          </div>

          <div
            className={`p-3.5 rounded-2xl border flex items-center space-x-3 ${
              darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
            }`}
          >
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-600 font-black text-sm">
              {inProgressCount}
            </div>
            <div>
              <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 block">En Curso</span>
              <h4 className="text-xs font-black text-purple-600">{inProgressCount} Activas</h4>
            </div>
          </div>

          <div
            className={`p-3.5 rounded-2xl border flex items-center space-x-3 ${
              darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
            }`}
          >
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-600 font-black text-sm">
              {reviewCount}
            </div>
            <div>
              <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 block">Revisión QA</span>
              <h4 className="text-xs font-black text-cyan-600">{reviewCount} en QA</h4>
            </div>
          </div>

          <div
            className={`p-3.5 rounded-2xl border flex items-center space-x-3 ${
              darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
            }`}
          >
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 font-black text-sm">
              {doneCount}
            </div>
            <div>
              <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 block">Completado</span>
              <h4 className="text-xs font-black text-emerald-600">{doneCount} Hechas</h4>
            </div>
          </div>

          <div
            className={`p-3.5 rounded-2xl border flex items-center space-x-3 ${
              darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
            }`}
          >
            <div className="p-2 rounded-xl bg-orange-500/10 text-orange-600 font-black text-sm">
              {crmCount}
            </div>
            <div>
              <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 block">Clientes CRM</span>
              <h4 className="text-xs font-black text-orange-600">{crmCount} Leads</h4>
            </div>
          </div>
        </div>

        {/* View Routing */}
        {viewMode === 'kanban' && (
          <KanbanBoard
            tickets={tickets}
            sprints={sprints}
            currentUser={currentUser}
            activeSprintFilter={activeSprintFilter}
            onSprintFilterChange={setActiveSprintFilter}
            onStatusChange={handleStatusChange}
            onDeleteTicket={handleDeleteTicket}
            onSelectTicket={setSelectedTicket}
            darkMode={darkMode}
          />
        )}

        {viewMode === 'backlog' && (
          <BacklogView
            currentUser={currentUser}
            activeProjectFilter={activeProjectFilter}
            tickets={tickets}
            sprints={sprints}
            onSelectTicket={setSelectedTicket}
            onRefresh={loadData}
            darkMode={darkMode}
          />
        )}

        {viewMode === 'crm_table' && (
          <div
            className={`rounded-2xl border overflow-hidden text-left ${
              darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
            }`}
          >
            <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-sm">Directorio de Clientes & Requerimientos CRM</h3>
                <p className="text-xs text-slate-400 font-mono">
                  Todos los contactos comerciales vinculados a tarjetas de trabajo.
                </p>
              </div>
              <span className="text-xs font-mono font-bold text-orange-500">
                {tickets.filter(t => t.crm).length} clientes registrados
              </span>
            </div>

            <table className="w-full text-left text-xs">
              <thead
                className={`border-b uppercase font-mono text-[10px] tracking-wider ${
                  darkMode
                    ? 'bg-slate-950 border-slate-800 text-slate-400'
                    : 'bg-slate-100 border-slate-200 text-slate-600'
                }`}
              >
                <tr>
                  <th className="p-3.5">Código / Proyecto</th>
                  <th className="p-3.5">Cliente & Empresa</th>
                  <th className="p-3.5">Contacto</th>
                  <th className="p-3.5">Servicio & Presupuesto</th>
                  <th className="p-3.5">Fase de Trabajo</th>
                  <th className="p-3.5">WhatsApp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-sans">
                {tickets
                  .filter(t => t.crm)
                  .map(t => {
                    const project = PROJECTS[t.projectId];
                    const whatsappNumber = t.crm?.phone ? t.crm.phone.replace(/[^0-9]/g, '') : null;
                    const whatsappUrl = whatsappNumber
                      ? `https://wa.me/${whatsappNumber}?text=Hola%20${encodeURIComponent(
                          t.crm?.clientName || ''
                        )},%20te%20escribo%20desde%20iAtomica.`
                      : null;

                    return (
                      <tr
                        key={t.id}
                        onClick={() => setSelectedTicket(t)}
                        className="hover:bg-orange-500/5 transition-colors cursor-pointer"
                      >
                        <td className="p-3.5 font-mono">
                          <div className="font-bold">{t.code}</div>
                          <span
                            className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-full border inline-block mt-0.5 ${project.badgeBg} ${project.badgeText} ${project.border}`}
                          >
                            {project.code}
                          </span>
                        </td>
                        <td className="p-3.5 font-bold">
                          <div>{t.crm?.clientName}</div>
                          <div className="text-[11px] text-slate-400 font-normal flex items-center gap-1">
                            <Building size={11} className="text-slate-400" />
                            <span>{t.crm?.company}</span>
                          </div>
                        </td>
                        <td className="p-3.5 font-mono text-[11px]">
                          <div>{t.crm?.email || '—'}</div>
                          <div className="text-slate-400">{t.crm?.phone || '—'}</div>
                        </td>
                        <td className="p-3.5">
                          <span className="px-2 py-0.5 rounded bg-orange-500/10 text-orange-600 border border-orange-500/20 font-bold text-[10px] inline-block">
                            {t.crm?.service}
                          </span>
                          {t.crm?.budget && (
                            <div className="text-[10px] font-mono font-bold text-emerald-600 mt-0.5">
                              {t.crm.budget}
                            </div>
                          )}
                        </td>
                        <td className="p-3.5" onClick={e => e.stopPropagation()}>
                          <select
                            value={t.status}
                            onChange={e => handleStatusChange(t.id, e.target.value as TicketStatus)}
                            className="px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs font-bold border-none focus:outline-none cursor-pointer"
                          >
                            <option value="todo">1. Por Iniciar</option>
                            <option value="in_progress">2. En Progreso</option>
                            <option value="review">3. En Revisión / QA</option>
                            <option value="done">4. Completado / Ganado</option>
                          </select>
                        </td>
                        <td className="p-3.5" onClick={e => e.stopPropagation()}>
                          {whatsappUrl ? (
                            <a
                              href={whatsappUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="px-2.5 py-1 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 border border-emerald-500/30 text-xs font-bold inline-flex items-center space-x-1 transition-colors"
                            >
                              <MessageSquare size={12} />
                              <span>WhatsApp</span>
                            </a>
                          ) : (
                            <span className="text-slate-400 text-[10px] font-mono">—</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        )}
      </main>

      {/* Ticket / CRM Detail Drawer */}
      <TicketDetailDrawer
        ticket={selectedTicket}
        currentUser={currentUser}
        onClose={() => setSelectedTicket(null)}
        onStatusChange={handleStatusChange}
        onSprintChange={handleSprintChange}
        onAddComment={handleAddComment}
        onDeleteTicket={handleDeleteTicket}
        darkMode={darkMode}
      />

      {/* Create Ticket Modal */}
      {isCreateModalOpen && (
        <CreateTicketModal
          currentUser={currentUser}
          onClose={() => setIsCreateModalOpen(false)}
          onTicketCreated={loadData}
          darkMode={darkMode}
          defaultProjectId={activeProjectFilter !== 'all' ? (activeProjectFilter as ProjectId) : undefined}
        />
      )}
    </div>
  );
};
