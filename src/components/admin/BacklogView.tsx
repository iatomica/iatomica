import React, { useState } from 'react';
import type { User, ProjectScope } from '../../services/authService';
import type { WorkTicket, Sprint, ProjectId } from '../../services/workService';
import { PROJECTS, createSprint, updateTicketSprint, deleteTicket } from '../../services/workService';
import {
  Layers,
  Plus,
  Calendar,
  Trash2,
  Building,
  Target
} from 'lucide-react';

interface BacklogViewProps {
  currentUser: User;
  activeProjectFilter: ProjectScope;
  tickets: WorkTicket[];
  sprints: Sprint[];
  onSelectTicket: (ticket: WorkTicket) => void;
  onRefresh: () => void;
  darkMode: boolean;
}

export const BacklogView: React.FC<BacklogViewProps> = ({
  currentUser,
  activeProjectFilter,
  tickets,
  sprints,
  onSelectTicket,
  onRefresh,
  darkMode
}) => {
  const isAdmin = currentUser.role === 'admin';
  const [showNewSprintModal, setShowNewSprintModal] = useState(false);

  // New Sprint Form State
  const [sprintName, setSprintName] = useState('');
  const [sprintGoal, setSprintGoal] = useState('');
  const [sprintProject, setSprintProject] = useState<ProjectId>(
    isAdmin && activeProjectFilter !== 'all' ? (activeProjectFilter as ProjectId) : 'bariloche'
  );
  const [startDate, setStartDate] = useState(new Date().toISOString().slice(0, 10));
  const [endDate, setEndDate] = useState(
    new Date(Date.now() + 14 * 86400000).toISOString().slice(0, 10)
  );

  const backlogTickets = tickets.filter(t => !t.sprintId);

  const handleCreateSprintSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sprintName.trim()) return;

    createSprint(currentUser, {
      name: sprintName.trim(),
      goal: sprintGoal.trim(),
      projectId: isAdmin ? sprintProject : (currentUser.projectId as ProjectId),
      status: 'planned',
      startDate,
      endDate
    });

    setSprintName('');
    setSprintGoal('');
    setShowNewSprintModal(false);
    onRefresh();
  };

  const handleAssignToSprint = (ticketId: string, targetSprintId: string | null) => {
    updateTicketSprint(currentUser, ticketId, targetSprintId);
    onRefresh();
  };

  return (
    <div className="space-y-8 animate-fade-in text-left">
      {/* Sprints Management Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black flex items-center gap-2">
            <Target className="text-orange-500" size={22} />
            <span>Gestión de Sprints & Épicas</span>
          </h2>
          <p className="text-xs text-slate-400 font-mono mt-0.5">
            Planifica ciclos de entrega y asigna tareas pendientes del Backlog a cada Sprint.
          </p>
        </div>

        <button
          onClick={() => setShowNewSprintModal(true)}
          className="px-4 py-2.5 rounded-xl gradient-brand text-white font-bold text-xs shadow-md hover:opacity-90 flex items-center space-x-1.5 transition-all self-start cursor-pointer"
        >
          <Plus size={15} />
          <span>Definir Nuevo Sprint</span>
        </button>
      </div>

      {/* Sprints Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sprints.map(sp => {
          const spProject = PROJECTS[sp.projectId];
          const sprintTickets = tickets.filter(t => t.sprintId === sp.id);
          const completedCount = sprintTickets.filter(t => t.status === 'done').length;
          const progressPercent = sprintTickets.length
            ? Math.round((completedCount / sprintTickets.length) * 100)
            : 0;

          return (
            <div
              key={sp.id}
              className={`p-5 rounded-2xl border transition-all ${
                darkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-full border ${spProject.badgeBg} ${spProject.badgeText} ${spProject.border}`}
                    >
                      {spProject.name}
                    </span>
                    <span
                      className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-full ${
                        sp.status === 'active'
                          ? 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/30'
                          : 'bg-slate-500/10 text-slate-400 border border-slate-500/20'
                      }`}
                    >
                      {sp.status === 'active' ? '🟢 En Curso' : '⚪ Planificado'}
                    </span>
                  </div>
                  <h3 className="font-bold text-sm text-slate-950 dark:text-white">{sp.name}</h3>
                </div>

                <span className="font-mono text-xs font-black text-slate-500 dark:text-slate-400">
                  {sprintTickets.length} tareas
                </span>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 mb-3">{sp.goal}</p>

              {/* Sprint Progress Bar */}
              <div className="space-y-1.5 mb-3">
                <div className="flex justify-between text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400">
                  <span>Progreso: {progressPercent}%</span>
                  <span>{completedCount}/{sprintTickets.length} completadas</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div
                    className="h-full rounded-full gradient-brand transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Sprint Dates */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800 text-[10px] font-mono text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-1">
                  <Calendar size={12} />
                  <span>{sp.startDate} al {sp.endDate}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Backlog Section */}
      <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-black flex items-center gap-2">
              <Layers className="text-purple-500" size={18} />
              <span>Backlog de Tareas Pendientes ({backlogTickets.length})</span>
            </h3>
            <p className="text-xs text-slate-400 font-mono">
              Elementos aún no comprometidos en ningún sprint activo.
            </p>
          </div>
        </div>

        {backlogTickets.length === 0 ? (
          <div
            className={`py-12 text-center rounded-2xl border border-dashed ${
              darkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-slate-50 border-slate-300'
            }`}
          >
            <p className="text-xs text-slate-400 font-mono">El Backlog está vacío para este filtro.</p>
          </div>
        ) : (
          <div className="space-y-2.5">
            {backlogTickets.map(ticket => {
              const project = PROJECTS[ticket.projectId];
              const projectSprints = sprints.filter(s => s.projectId === ticket.projectId);

              return (
                <div
                  key={ticket.id}
                  onClick={() => onSelectTicket(ticket)}
                  className={`p-4 rounded-2xl border flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-all cursor-pointer hover:shadow-sm ${
                    darkMode
                      ? 'bg-slate-950 border-slate-800 hover:border-slate-700'
                      : 'bg-white border-slate-200 hover:border-orange-300 shadow-xs'
                  }`}
                >
                  <div className="space-y-1.5 flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono text-[11px] font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                        {ticket.code}
                      </span>
                      <span
                        className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-full border ${project.badgeBg} ${project.badgeText} ${project.border}`}
                      >
                        {project.name}
                      </span>
                      <span
                        className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
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

                    <h4 className="font-bold text-sm leading-snug text-slate-950 dark:text-white">{ticket.title}</h4>

                    {ticket.crm && (
                      <p className="text-xs text-slate-600 dark:text-slate-400 flex items-center gap-1.5 font-medium">
                        <Building size={12} className="text-slate-500 dark:text-slate-400" />
                        <span className="text-slate-900 dark:text-slate-200">{ticket.crm.clientName} ({ticket.crm.company})</span>
                      </p>
                    )}
                  </div>

                  {/* Actions: Assign to Sprint */}
                  <div
                    className="flex items-center space-x-2 shrink-0 w-full md:w-auto justify-between md:justify-end"
                    onClick={e => e.stopPropagation()}
                  >
                    <select
                      defaultValue=""
                      onChange={e => {
                        if (e.target.value) {
                          handleAssignToSprint(ticket.id, e.target.value);
                        }
                      }}
                      className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 focus:outline-none cursor-pointer"
                    >
                      <option value="" disabled className="text-slate-500">
                        Mover a Sprint...
                      </option>
                      {projectSprints.map(sp => (
                        <option key={sp.id} value={sp.id}>
                          ⚡ {sp.name}
                        </option>
                      ))}
                    </select>

                    {isAdmin && (
                      <button
                        onClick={() => {
                          if (window.confirm(`¿Eliminar ticket ${ticket.code}?`)) {
                            deleteTicket(currentUser, ticket.id);
                            onRefresh();
                          }
                        }}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                        title="Eliminar (Solo Admin)"
                      >
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* New Sprint Modal */}
      {showNewSprintModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div
            className={`w-full max-w-lg rounded-3xl border shadow-2xl p-6 space-y-4 ${
              darkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
            }`}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-bold text-base text-slate-950 dark:text-white">Crear Ciclo / Sprint</h3>
              <button
                onClick={() => setShowNewSprintModal(false)}
                className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
              >
                <span className="text-xl font-bold">&times;</span>
              </button>
            </div>

            <form onSubmit={handleCreateSprintSubmit} className="space-y-4 text-xs font-bold">
              {isAdmin && (
                <div>
                  <label className="text-slate-600 dark:text-slate-400 block mb-1">Proyecto Asignado</label>
                  <select
                    value={sprintProject}
                    onChange={e => setSprintProject(e.target.value as ProjectId)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none cursor-pointer"
                  >
                    <option value="bariloche">🌲 Proyecto Bariloche</option>
                    <option value="espana">🇪🇸 Proyecto España</option>
                  </select>
                </div>
              )}

              <div>
                <label className="text-slate-600 dark:text-slate-400 block mb-1">Nombre del Sprint *</label>
                <input
                  type="text"
                  required
                  value={sprintName}
                  onChange={e => setSprintName(e.target.value)}
                  placeholder="Ej: Sprint 3 · Onboarding & Pagos"
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-slate-600 dark:text-slate-400 block mb-1">Objetivo del Sprint</label>
                <textarea
                  rows={2}
                  value={sprintGoal}
                  onChange={e => setSprintGoal(e.target.value)}
                  placeholder="Meta central del ciclo..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 font-medium focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-600 dark:text-slate-400 block mb-1">Fecha Inicio</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={e => setStartDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-slate-100 font-mono focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-slate-600 dark:text-slate-400 block mb-1">Fecha Cierre</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={e => setEndDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-slate-100 font-mono focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-3 border-t flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowNewSprintModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 font-bold cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl gradient-brand text-white font-bold cursor-pointer"
                >
                  Crear Sprint
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
