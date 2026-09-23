import React from 'react';
import type { User } from '../../services/authService';
import type { WorkTicket, TicketStatus, Sprint } from '../../services/workService';
import { PROJECTS } from '../../services/workService';
import {
  Building,
  ArrowRight,
  ArrowLeft,
  Trash2,
  MessageSquareText,
  Clock
} from 'lucide-react';

interface KanbanBoardProps {
  tickets: WorkTicket[];
  sprints: Sprint[];
  currentUser: User;
  activeSprintFilter: string; // 'all' | 'active' | sprintId
  onSprintFilterChange: (sprintFilter: string) => void;
  onStatusChange: (id: string, newStatus: TicketStatus) => void;
  onDeleteTicket: (id: string) => void;
  onSelectTicket: (ticket: WorkTicket) => void;
  darkMode: boolean;
}

interface ColumnDef {
  status: TicketStatus;
  label: string;
  badgeColor: string;
}

const COLUMNS: ColumnDef[] = [
  {
    status: 'todo',
    label: '1. Por Iniciar',
    badgeColor: 'bg-slate-200 text-slate-800 dark:bg-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700'
  },
  {
    status: 'in_progress',
    label: '2. En Progreso',
    badgeColor: 'bg-purple-100 text-purple-800 dark:bg-purple-950/60 dark:text-purple-300 border border-purple-300 dark:border-purple-800/60'
  },
  {
    status: 'review',
    label: '3. Revisión / QA',
    badgeColor: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-950/60 dark:text-cyan-300 border border-cyan-300 dark:border-cyan-800/60'
  },
  {
    status: 'done',
    label: '4. Completado / Ganado',
    badgeColor: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800/60'
  }
];

const STATUS_ORDER: TicketStatus[] = ['todo', 'in_progress', 'review', 'done'];

export const KanbanBoard: React.FC<KanbanBoardProps> = ({
  tickets,
  sprints,
  currentUser,
  activeSprintFilter,
  onSprintFilterChange,
  onStatusChange,
  onDeleteTicket,
  onSelectTicket,
  darkMode
}) => {
  const isAdmin = currentUser.role === 'admin';

  const getPrevStatus = (current: TicketStatus): TicketStatus | null => {
    const idx = STATUS_ORDER.indexOf(current);
    return idx > 0 ? STATUS_ORDER[idx - 1] : null;
  };

  const getNextStatus = (current: TicketStatus): TicketStatus | null => {
    const idx = STATUS_ORDER.indexOf(current);
    return idx < STATUS_ORDER.length - 1 ? STATUS_ORDER[idx + 1] : null;
  };

  // Filter tickets by sprint selection
  const filteredTickets = tickets.filter(t => {
    if (activeSprintFilter === 'all') return true;
    if (activeSprintFilter === 'active') {
      const activeSprintIds = sprints.filter(s => s.status === 'active').map(s => s.id);
      return t.sprintId && activeSprintIds.includes(t.sprintId);
    }
    if (activeSprintFilter === 'backlog') {
      return !t.sprintId;
    }
    return t.sprintId === activeSprintFilter;
  });

  return (
    <div className="space-y-4 text-left">
      {/* Sprint Filter Bar */}
      <div
        className={`p-3.5 px-4 rounded-2xl border flex flex-col sm:flex-row items-center justify-between gap-3 ${
          darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}
      >
        <div className="flex items-center space-x-2.5 w-full sm:w-auto">
          <span className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400">Filtrar Ciclo:</span>
          <select
            value={activeSprintFilter}
            onChange={e => onSprintFilterChange(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-slate-700 focus:outline-none cursor-pointer"
          >
            <option value="all">⚡ Todos los Sprints y Tareas</option>
            <option value="active">🟢 Sprint Activo (En Curso)</option>
            <option value="backlog">📂 Solo Backlog</option>
            {sprints.map(sp => (
              <option key={sp.id} value={sp.id}>
                {sp.name}
              </option>
            ))}
          </select>
        </div>

        <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
          Mostrando <span className="font-bold text-orange-600 dark:text-orange-400">{filteredTickets.length}</span> tarjetas
          activas
        </div>
      </div>

      {/* Kanban Columns Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 overflow-x-auto pb-6">
        {COLUMNS.map(col => {
          const colTickets = filteredTickets.filter(t => t.status === col.status);

          return (
            <div
              key={col.status}
              className={`p-3.5 rounded-2xl border flex flex-col h-full min-h-[580px] ${
                darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-slate-100/75 border-slate-200/90'
              }`}
            >
              {/* Column Header */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200 dark:border-slate-800">
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${col.badgeColor}`}>
                  {col.label}
                </span>
                <span className="font-mono text-xs font-bold text-slate-500 dark:text-slate-400">
                  {colTickets.length}
                </span>
              </div>

              {/* Column Cards Container */}
              <div className="space-y-3 flex-1 overflow-y-auto pr-1">
                {colTickets.length === 0 ? (
                  <div className="py-12 text-center text-xs text-slate-400 font-mono italic">
                    Sin tareas en esta fase
                  </div>
                ) : (
                  colTickets.map(ticket => {
                    const prev = getPrevStatus(ticket.status);
                    const next = getNextStatus(ticket.status);
                    const project = PROJECTS[ticket.projectId];

                    return (
                      <div
                        key={ticket.id}
                        onClick={() => onSelectTicket(ticket)}
                        className={`p-4 rounded-2xl border transition-all text-left shadow-xs hover:shadow-md cursor-pointer group ${
                          darkMode
                            ? 'bg-slate-950 border-slate-800 text-white hover:border-purple-500/50'
                            : 'bg-white border-slate-200 text-slate-900 hover:border-orange-400/50'
                        }`}
                      >
                        {/* Tags: Code, Project & Priority */}
                        <div className="flex items-center justify-between gap-1 mb-2">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="font-mono text-[10px] font-black px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                              {ticket.code}
                            </span>
                            <span
                              className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-full border ${project.badgeBg} ${project.badgeText} ${project.border}`}
                            >
                              {project.name}
                            </span>
                            <span
                              className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${
                                ticket.priority === 'urgente'
                                  ? 'bg-rose-500/10 text-rose-600 border border-rose-500/20'
                                  : ticket.priority === 'alta'
                                  ? 'bg-orange-500/10 text-orange-600 border border-orange-500/20'
                                  : 'bg-slate-500/10 text-slate-500 border border-slate-500/20'
                              }`}
                            >
                              {ticket.priority}
                            </span>
                          </div>

                          {/* Delete Button: ONLY allowed and rendered for Admin */}
                          {isAdmin && (
                            <button
                              onClick={e => {
                                e.stopPropagation();
                                if (window.confirm(`¿Eliminar la tarjeta ${ticket.code}?`)) {
                                  onDeleteTicket(ticket.id);
                                }
                              }}
                              className="text-slate-400 hover:text-rose-500 transition-colors p-1 cursor-pointer"
                              title="Eliminar Tarjeta (Solo Administrador)"
                            >
                              <Trash2 size={13} />
                            </button>
                          )}
                        </div>

                        {/* Title */}
                        <h4 className="font-bold text-sm leading-snug text-slate-950 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                          {ticket.title}
                        </h4>

                        {/* CRM Client Tag (if bound) */}
                        {ticket.crm && (
                          <div className="mt-2.5 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 space-y-1">
                            <div className="flex items-center justify-between text-[11px] font-bold">
                              <span className="truncate text-slate-950 dark:text-slate-100">{ticket.crm.clientName}</span>
                            </div>
                            <p className="text-[10px] text-slate-600 dark:text-slate-400 flex items-center gap-1 font-medium truncate">
                              <Building size={10} className="shrink-0 text-slate-400" />
                              <span className="truncate">{ticket.crm.company}</span>
                            </p>
                          </div>
                        )}

                        {/* Bottom Metadata: Comments & Activity Time */}
                        <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[10px] font-mono text-slate-500 dark:text-slate-400">
                          <div className="flex items-center gap-1">
                            <MessageSquareText size={11} className="text-purple-600 dark:text-purple-400" />
                            <span>{ticket.comments.length} notas</span>
                          </div>

                          <div className="flex items-center gap-1">
                            <Clock size={11} />
                            <span>
                              {new Date(ticket.updatedAt).toLocaleTimeString(undefined, {
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </span>
                          </div>
                        </div>

                        {/* Transition Action Buttons */}
                        <div
                          className="mt-3 flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800"
                          onClick={e => e.stopPropagation()}
                        >
                          {prev ? (
                            <button
                              onClick={() => onStatusChange(ticket.id, prev)}
                              className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer"
                              title="Mover a fase anterior"
                            >
                              <ArrowLeft size={13} />
                            </button>
                          ) : (
                            <div />
                          )}

                          {next && (
                            <button
                              onClick={() => onStatusChange(ticket.id, next)}
                              className="px-2.5 py-1 rounded-lg gradient-brand text-white font-bold text-[10px] flex items-center space-x-1 shadow-xs hover:opacity-90 transition-all cursor-pointer"
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
    </div>
  );
};
