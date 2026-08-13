import React, { useState, useEffect } from 'react';
import { getCurrentUser, logoutUser } from '../../services/authService';
import type { User } from '../../services/authService';
import { fetchLeadsFromDb, updateLeadStatus, assignLeadRole, addLeadNote, deleteLead, subscribeToLeadChanges } from '../../services/leadService';
import type { Lead, LeadStatus, LeadRole } from '../../services/leadService';
import { AdminLoginPage } from './AdminLoginPage';
import { KanbanBoard } from './KanbanBoard';
import { LeadDetailDrawer } from './LeadDetailDrawer';
import { Cpu, LayoutGrid, Table, LogOut, Database, ArrowLeft } from 'lucide-react';

interface AdminPortalPageProps {
  onReturnToSite: () => void;
  darkMode: boolean;
}

export const AdminPortalPage: React.FC<AdminPortalPageProps> = ({ onReturnToSite, darkMode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(getCurrentUser());
  const [leads, setLeads] = useState<Lead[]>([]);
  const [viewMode, setViewMode] = useState<'kanban' | 'table'>('kanban');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [roleFilter, setRoleFilter] = useState<string>('todos');

  const fetchLatestLeads = async () => {
    const data = await fetchLeadsFromDb();
    setLeads(data);
    if (selectedLead) {
      const refreshed = data.find(l => l.id === selectedLead.id) || null;
      setSelectedLead(refreshed);
    }
  };

  useEffect(() => {
    fetchLatestLeads();
    // Subscribe to BroadcastChannel real-time live updates
    const unsubscribe = subscribeToLeadChanges(() => {
      fetchLatestLeads();
    });
    return () => unsubscribe();
  }, []);

  const handleLoginSuccess = (user: User) => {
    setCurrentUser(user);
    // If logging in as specific role, set filter accordingly
    if (user.role === 'Atención Público' || user.role === 'Consultoría Técnica') {
      setRoleFilter(user.role);
    } else {
      setRoleFilter('todos');
    }
    fetchLatestLeads();
  };

  const handleLogout = () => {
    logoutUser();
    setCurrentUser(null);
  };

  const handleStatusChange = async (id: string, newStatus: LeadStatus) => {
    const updated = await updateLeadStatus(id, newStatus);
    setLeads(updated);
    if (selectedLead && selectedLead.id === id) {
      setSelectedLead(updated.find(l => l.id === id) || null);
    }
  };

  const handleAssignRole = async (id: string, role: LeadRole) => {
    const updated = await assignLeadRole(id, role);
    setLeads(updated);
    if (selectedLead && selectedLead.id === id) {
      setSelectedLead(updated.find(l => l.id === id) || null);
    }
  };

  const handleAddNote = async (id: string, text: string) => {
    if (!currentUser) return;
    const authorName = `${currentUser.name} (${currentUser.role})`;
    const updated = await addLeadNote(id, text, authorName);
    setLeads(updated);
    if (selectedLead && selectedLead.id === id) {
      setSelectedLead(updated.find(l => l.id === id) || null);
    }
  };

  const handleDeleteLead = async (id: string) => {
    const updated = await deleteLead(id);
    setLeads(updated);
    if (selectedLead?.id === id) {
      setSelectedLead(null);
    }
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

  const filteredLeads = leads.filter(l => {
    if (roleFilter === 'todos') return true;
    return l.assignedTo === roleFilter;
  });

  const totalCount = leads.length;
  const newCount = leads.filter(l => l.status === 'nuevo').length;
  const contactCount = leads.filter(l => l.status === 'en_contacto').length;
  const bookedCount = leads.filter(l => l.status === 'cita_agendada').length;
  const clientCount = leads.filter(l => l.status === 'cliente').length;

  return (
    <div className={`min-h-screen flex flex-col transition-colors ${
      darkMode ? 'bg-slate-950 text-white' : 'bg-slate-100 text-slate-900'
    }`}>
      
      {/* Top Work Management Header */}
      <header className={`px-6 py-4 border-b flex flex-col md:flex-row items-center justify-between gap-4 sticky top-0 z-40 backdrop-blur-md ${
        darkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white/90 border-slate-200 shadow-xs'
      }`}>
        
        {/* Brand & Workspace Title */}
        <div className="flex items-center space-x-4">
          <button
            onClick={onReturnToSite}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
            title="Volver al Sitio Web Público"
          >
            <ArrowLeft size={18} />
          </button>

          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl gradient-brand flex items-center justify-center text-white shadow-md">
              <Cpu size={20} />
            </div>
            <div>
              <h1 className="font-heading font-black text-lg leading-none flex items-center gap-2">
                <span>Herramienta de Gestión de Trabajo</span>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
                  🟢 Sincronizado en Vivo
                </span>
              </h1>
              <span className="text-xs text-slate-400 font-medium">iAtomica 2.0 Work Platform</span>
            </div>
          </div>
        </div>

        {/* User Identity & Actions */}
        <div className="flex items-center space-x-4 w-full md:w-auto justify-between md:justify-end">
          
          {/* View Switcher */}
          <div className="flex items-center p-1 rounded-xl bg-slate-200 dark:bg-slate-800">
            <button
              onClick={() => setViewMode('kanban')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
                viewMode === 'kanban'
                  ? 'gradient-brand text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              <LayoutGrid size={14} />
              <span>Tablero Kanban</span>
            </button>

            <button
              onClick={() => setViewMode('table')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
                viewMode === 'table'
                  ? 'gradient-brand text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              <Table size={14} />
              <span>Tabla CRM</span>
            </button>
          </div>

          {/* User Badge Profile */}
          <div className="flex items-center space-x-3 pl-3 border-l border-slate-200 dark:border-slate-800">
            <img src={currentUser.avatar} alt={currentUser.name} className="w-9 h-9 rounded-full object-cover border border-purple-500" />
            <div className="hidden sm:block text-left">
              <h4 className="text-xs font-bold leading-tight">{currentUser.name}</h4>
              <span className="text-[10px] text-purple-600 dark:text-purple-400 font-mono font-bold block">
                {currentUser.role}
              </span>
            </div>

            <button
              onClick={handleLogout}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-500 hover:text-rose-600 transition-colors"
              title="Cerrar Sesión"
            >
              <LogOut size={16} />
            </button>
          </div>

        </div>
      </header>

      {/* Main Workspace Body */}
      <main className="flex-1 p-6 max-w-7xl mx-auto w-full space-y-6">
        
        {/* KPI Header Bar */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className={`p-4 rounded-2xl border flex items-center space-x-3 ${
            darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
          }`}>
            <div className="p-2.5 rounded-xl bg-orange-500/10 text-orange-600 font-bold">
              {totalCount}
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Total Trabajo</span>
              <h4 className="text-sm font-black">{totalCount} Tarjetas</h4>
            </div>
          </div>

          <div className={`p-4 rounded-2xl border flex items-center space-x-3 ${
            darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
          }`}>
            <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-600 font-bold">
              {newCount}
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Nuevos Leads</span>
              <h4 className="text-sm font-black text-purple-600">{newCount} Nuevos</h4>
            </div>
          </div>

          <div className={`p-4 rounded-2xl border flex items-center space-x-3 ${
            darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
          }`}>
            <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-600 font-bold">
              {contactCount}
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">En Contacto</span>
              <h4 className="text-sm font-black text-indigo-600">{contactCount} Activos</h4>
            </div>
          </div>

          <div className={`p-4 rounded-2xl border flex items-center space-x-3 ${
            darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
          }`}>
            <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-600 font-bold">
              {bookedCount}
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Citas Agendadas</span>
              <h4 className="text-sm font-black text-blue-600">{bookedCount} Citas</h4>
            </div>
          </div>

          <div className={`p-4 rounded-2xl border flex items-center space-x-3 ${
            darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
          }`}>
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-600 font-bold">
              {clientCount}
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Clientes Ganados</span>
              <h4 className="text-sm font-black text-emerald-600">{clientCount} Ganados</h4>
            </div>
          </div>
        </div>

        {/* Toolbar Filters */}
        <div className={`p-4 rounded-2xl border flex flex-col sm:flex-row items-center justify-between gap-4 ${
          darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}>
          <div className="flex items-center space-x-3 w-full sm:w-auto">
            <span className="text-xs font-bold text-slate-500 font-mono">Filtro por Rol:</span>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-800 dark:text-slate-200 border-none focus:outline-none cursor-pointer"
            >
              <option value="todos">Todos los Equipos</option>
              <option value="Atención Público">Atención Público</option>
              <option value="Consultoría Técnica">Consultoría Técnica</option>
              <option value="Ventas">Ventas</option>
            </select>
          </div>

          <div className="flex items-center space-x-2 text-xs font-mono text-slate-500">
            <Database size={14} className="text-emerald-500" />
            <span>Sincronización en vivo activa vía BroadcastChannel</span>
          </div>
        </div>

        {/* Active View: Kanban vs Table */}
        {viewMode === 'kanban' ? (
          <KanbanBoard
            leads={filteredLeads}
            onStatusChange={handleStatusChange}
            onAssignRole={handleAssignRole}
            onDeleteLead={handleDeleteLead}
            onSelectLead={setSelectedLead}
            darkMode={darkMode}
          />
        ) : (
          <div className={`rounded-2xl border overflow-hidden ${
            darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
          }`}>
            <table className="w-full text-left text-xs">
              <thead className={`border-b uppercase font-mono text-[10px] tracking-wider ${
                darkMode ? 'bg-slate-950 border-slate-800 text-slate-400' : 'bg-slate-100 border-slate-200 text-slate-600'
              }`}>
                <tr>
                  <th className="p-3.5">Cliente / Empresa</th>
                  <th className="p-3.5">Contacto</th>
                  <th className="p-3.5">Servicio Requerido</th>
                  <th className="p-3.5">Estado CRM</th>
                  <th className="p-3.5">Rol Asignado</th>
                  <th className="p-3.5">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-sans">
                {filteredLeads.map(l => (
                  <tr
                    key={l.id}
                    onClick={() => setSelectedLead(l)}
                    className="hover:bg-purple-500/5 transition-colors cursor-pointer"
                  >
                    <td className="p-3.5 font-bold">
                      <div>{l.name}</div>
                      <div className="text-[11px] text-slate-400 font-normal">{l.company || 'Particular'}</div>
                    </td>
                    <td className="p-3.5 font-mono text-[11px]">
                      <div>{l.email}</div>
                      <div className="text-slate-400">{l.phone}</div>
                    </td>
                    <td className="p-3.5">
                      <span className="px-2.5 py-1 rounded-full bg-orange-500/10 text-orange-600 border border-orange-500/20 font-bold text-[10px]">
                        {l.service}
                      </span>
                    </td>
                    <td className="p-3.5 font-bold" onClick={e => e.stopPropagation()}>
                      <select
                        value={l.status}
                        onChange={(e) => handleStatusChange(l.id, e.target.value as LeadStatus)}
                        className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-none text-[11px] font-bold focus:outline-none cursor-pointer"
                      >
                        <option value="nuevo">1. Nuevo Lead</option>
                        <option value="en_contacto">2. En Contacto</option>
                        <option value="cita_agendada">3. Cita Agendada</option>
                        <option value="propuesta">4. Propuesta Enviada</option>
                        <option value="cliente">5. Cliente Ganado</option>
                      </select>
                    </td>
                    <td className="p-3.5" onClick={e => e.stopPropagation()}>
                      <select
                        value={l.assignedTo}
                        onChange={(e) => handleAssignRole(l.id, e.target.value as LeadRole)}
                        className="px-2 py-1 rounded bg-purple-500/10 text-purple-600 border border-purple-500/20 text-[11px] font-bold focus:outline-none cursor-pointer"
                      >
                        <option value="Atención Público">Atención Público</option>
                        <option value="Consultoría Técnica">Consultoría Técnica</option>
                        <option value="Ventas">Ventas</option>
                        <option value="Sin Asignar">Sin Asignar</option>
                      </select>
                    </td>
                    <td className="p-3.5" onClick={e => e.stopPropagation()}>
                      <button
                        onClick={() => handleDeleteLead(l.id)}
                        className="text-slate-400 hover:text-rose-600 text-xs font-semibold"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </main>

      {/* Side Drawer for Lead Inspection & Internal Notes */}
      <LeadDetailDrawer
        lead={selectedLead}
        onClose={() => setSelectedLead(null)}
        onStatusChange={handleStatusChange}
        onAssignRole={handleAssignRole}
        onAddNote={handleAddNote}
        darkMode={darkMode}
      />

    </div>
  );
};
