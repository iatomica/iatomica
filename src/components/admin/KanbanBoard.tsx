import React from 'react';
import type { Lead, LeadStatus, LeadRole } from '../../services/leadService';
import { UserCheck, Phone, Mail, Building, ArrowRight, ArrowLeft, Trash2 } from 'lucide-react';

interface KanbanBoardProps {
  leads: Lead[];
  onStatusChange: (id: string, newStatus: LeadStatus) => void;
  onAssignRole: (id: string, role: LeadRole) => void;
  onDeleteLead: (id: string) => void;
  darkMode: boolean;
}

interface ColumnDef {
  status: LeadStatus;
  label: string;
  badgeColor: string;
}

const COLUMNS: ColumnDef[] = [
  { status: 'nuevo', label: '1. Nuevo Lead', badgeColor: 'bg-orange-500 text-white' },
  { status: 'en_contacto', label: '2. En Contacto', badgeColor: 'bg-purple-600 text-white' },
  { status: 'cita_agendada', label: '3. Cita Agendada', badgeColor: 'bg-blue-600 text-white' },
  { status: 'propuesta', label: '4. Propuesta Enviada', badgeColor: 'bg-cyan-600 text-white' },
  { status: 'cliente', label: '5. Cliente Ganado', badgeColor: 'bg-emerald-600 text-white' }
];

const STATUS_ORDER: LeadStatus[] = ['nuevo', 'en_contacto', 'cita_agendada', 'propuesta', 'cliente'];

export const KanbanBoard: React.FC<KanbanBoardProps> = ({
  leads,
  onStatusChange,
  onAssignRole,
  onDeleteLead,
  darkMode
}) => {
  const getPrevStatus = (current: LeadStatus): LeadStatus | null => {
    const idx = STATUS_ORDER.indexOf(current);
    return idx > 0 ? STATUS_ORDER[idx - 1] : null;
  };

  const getNextStatus = (current: LeadStatus): LeadStatus | null => {
    const idx = STATUS_ORDER.indexOf(current);
    return idx < STATUS_ORDER.length - 1 ? STATUS_ORDER[idx + 1] : null;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 overflow-x-auto pb-6">
      {COLUMNS.map(col => {
        const colLeads = leads.filter(l => l.status === col.status);
        return (
          <div
            key={col.status}
            className={`p-3.5 rounded-2xl border flex flex-col h-full min-h-[550px] ${
              darkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}
          >
            {/* Column Header */}
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200 dark:border-slate-800">
              <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${col.badgeColor}`}>
                {col.label}
              </span>
              <span className="font-mono text-xs font-bold text-slate-400">
                {colLeads.length}
              </span>
            </div>

            {/* Column Cards */}
            <div className="space-y-3 flex-1 overflow-y-auto pr-1">
              {colLeads.length === 0 ? (
                <div className="py-8 text-center text-xs text-slate-400 font-mono italic">
                  Sin consultas
                </div>
              ) : (
                colLeads.map(lead => {
                  const prev = getPrevStatus(lead.status);
                  const next = getNextStatus(lead.status);

                  return (
                    <div
                      key={lead.id}
                      className={`p-4 rounded-xl border transition-all text-left shadow-sm ${
                        darkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
                      }`}
                    >
                      {/* Service Tag */}
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-orange-500/10 text-orange-600 border border-orange-500/20 truncate max-w-[140px]">
                          {lead.service}
                        </span>
                        <button
                          onClick={() => onDeleteLead(lead.id)}
                          className="text-slate-400 hover:text-rose-500 transition-colors p-1"
                          title="Eliminar Lead"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>

                      {/* Client Name & Company */}
                      <h4 className="font-bold text-sm leading-snug">{lead.name}</h4>
                      <p className="text-xs text-slate-500 font-medium flex items-center gap-1 mt-0.5">
                        <Building size={12} className="shrink-0 text-slate-400" />
                        <span className="truncate">{lead.company || 'Empresa Privada'}</span>
                      </p>

                      {/* Contact Details */}
                      <div className="mt-2.5 space-y-1 text-[11px] text-slate-600 dark:text-slate-300 font-mono">
                        <div className="flex items-center gap-1.5 truncate">
                          <Mail size={12} className="shrink-0 text-slate-400" />
                          <span className="truncate">{lead.email}</span>
                        </div>
                        {lead.phone && (
                          <div className="flex items-center gap-1.5">
                            <Phone size={12} className="shrink-0 text-slate-400" />
                            <span>{lead.phone}</span>
                          </div>
                        )}
                      </div>

                      {/* Message excerpt */}
                      {lead.message && (
                        <p className="mt-2.5 text-xs text-slate-500 line-clamp-2 bg-slate-50 dark:bg-slate-900 p-2 rounded-lg border border-slate-100 dark:border-slate-800 italic">
                          "{lead.message}"
                        </p>
                      )}

                      {/* Role Assignment Selector */}
                      <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                        <div className="flex items-center space-x-1.5">
                          <UserCheck size={12} className="text-purple-600" />
                          <select
                            value={lead.assignedTo}
                            onChange={(e) => onAssignRole(lead.id, e.target.value as LeadRole)}
                            className="text-[10px] font-bold bg-transparent border-none text-purple-600 focus:outline-none cursor-pointer"
                          >
                            <option value="Atención Público">Atención Público</option>
                            <option value="Consultoría Técnica">Consultoría Técnica</option>
                            <option value="Ventas">Ventas</option>
                            <option value="Sin Asignar">Sin Asignar</option>
                          </select>
                        </div>
                      </div>

                      {/* Transition Action Buttons */}
                      <div className="mt-3 flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
                        {prev ? (
                          <button
                            onClick={() => onStatusChange(lead.id, prev)}
                            className="p-1 rounded bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors"
                            title="Mover a etapa anterior"
                          >
                            <ArrowLeft size={13} />
                          </button>
                        ) : <div />}

                        {next && (
                          <button
                            onClick={() => onStatusChange(lead.id, next)}
                            className="px-2.5 py-1 rounded-lg gradient-brand text-white font-bold text-[10px] flex items-center space-x-1 shadow-sm hover:opacity-90"
                          >
                            <span>Avanzar</span>
                            <ArrowRight size={11} />
                          </button>
                        )}
                      </div>

                    </div>
                  );
                })
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
