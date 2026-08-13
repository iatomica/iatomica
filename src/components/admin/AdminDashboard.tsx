import React, { useState, useEffect } from 'react';
import { fetchLeadsFromDb, updateLeadStatus, assignLeadRole, deleteLead } from '../../services/leadService';
import type { Lead, LeadStatus, LeadRole } from '../../services/leadService';
import { KanbanBoard } from './KanbanBoard';
import { LayoutGrid, Table, X, ShieldAlert, Database } from 'lucide-react';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  darkMode: boolean;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ isOpen, onClose, darkMode }) => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [viewMode, setViewMode] = useState<'kanban' | 'table'>('kanban');
  const [filterRole, setFilterRole] = useState<string>('todos');

  useEffect(() => {
    if (isOpen) {
      fetchLeadsFromDb().then(setLeads);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleStatusChange = async (id: string, newStatus: LeadStatus) => {
    const updated = await updateLeadStatus(id, newStatus);
    setLeads(updated);
  };

  const handleAssignRole = async (id: string, role: LeadRole) => {
    const updated = await assignLeadRole(id, role);
    setLeads(updated);
  };

  const handleDeleteLead = async (id: string) => {
    const updated = await deleteLead(id);
    setLeads(updated);
  };

  const filteredLeads = leads.filter(l => {
    if (filterRole === 'todos') return true;
    return l.assignedTo === filterRole;
  });

  const totalLeads = leads.length;
  const newLeadsCount = leads.filter(l => l.status === 'nuevo').length;
  const bookedCount = leads.filter(l => l.status === 'cita_agendada').length;
  const clientsCount = leads.filter(l => l.status === 'cliente').length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-md animate-fade-in">
      <div className={`w-full max-w-7xl h-[92vh] rounded-3xl border shadow-2xl flex flex-col overflow-hidden transition-colors ${
        darkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
      }`}>
        
        {/* Header */}
        <div className={`p-6 border-b flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
          darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-slate-50 border-slate-200'
        }`}>
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-2xl gradient-brand text-white shadow-md">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-extrabold flex items-center gap-2">
                <span>Panel de Administración CRM &amp; Leads</span>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-orange-500/10 text-orange-600 border border-orange-500/20">
                  v2.0 LIVE
                </span>
              </h2>
              <p className="text-xs text-slate-500 font-medium flex items-center gap-1.5 mt-0.5">
                <Database size={13} className="text-emerald-500" />
                <span>Base de Datos Local / Lista para Contenedor Docker</span>
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3 w-full sm:w-auto justify-between sm:justify-end">
            {/* View Mode Toggle */}
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
                <span>Kanban</span>
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

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Top Summary Metrics */}
        <div className="p-6 border-b border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/40 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-3.5 rounded-2xl clean-card flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-orange-500/10 text-orange-600 font-bold">
              {totalLeads}
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Total Consultas</span>
              <h4 className="text-base font-black">{totalLeads} Leads</h4>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl clean-card flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-600 font-bold">
              {newLeadsCount}
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Nuevos por Atender</span>
              <h4 className="text-base font-black text-purple-600">{newLeadsCount} Leads</h4>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl clean-card flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-600 font-bold">
              {bookedCount}
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Citas Agendadas</span>
              <h4 className="text-base font-black text-blue-600">{bookedCount} Citas</h4>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl clean-card flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-600 font-bold">
              {clientsCount}
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Clientes Ganados</span>
              <h4 className="text-base font-black text-emerald-600">{clientsCount} Clientes</h4>
            </div>
          </div>
        </div>

        {/* Filters Toolbar */}
        <div className="px-6 py-3 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-mono">
          <div className="flex items-center space-x-2">
            <span className="text-slate-400">Filtrar por Rol:</span>
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-none font-bold focus:outline-none cursor-pointer"
            >
              <option value="todos">Todos los Roles</option>
              <option value="Atención Público">Atención Público</option>
              <option value="Consultoría Técnica">Consultoría Técnica</option>
              <option value="Ventas">Ventas</option>
            </select>
          </div>

          <span className="text-slate-400 hidden sm:block">
            Sincronización en tiempo real activa
          </span>
        </div>

        {/* Dashboard Body View */}
        <div className="flex-1 p-6 overflow-y-auto">
          {viewMode === 'kanban' ? (
            <KanbanBoard
              leads={filteredLeads}
              onStatusChange={handleStatusChange}
              onAssignRole={handleAssignRole}
              onDeleteLead={handleDeleteLead}
              darkMode={darkMode}
            />
          ) : (
            <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
              <table className="w-full text-left text-xs">
                <thead className={`border-b uppercase font-mono text-[10px] tracking-wider ${
                  darkMode ? 'bg-slate-900 border-slate-800 text-slate-400' : 'bg-slate-100 border-slate-200 text-slate-600'
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
                    <tr key={l.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/50 transition-colors">
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
                      <td className="p-3.5 font-bold">
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
                      <td className="p-3.5">
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
                      <td className="p-3.5">
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
        </div>

      </div>
    </div>
  );
};
