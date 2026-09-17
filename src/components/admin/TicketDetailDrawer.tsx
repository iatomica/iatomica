import React, { useState } from 'react';
import type { User } from '../../services/authService';
import type { WorkTicket, TicketStatus } from '../../services/workService';
import { PROJECTS, getSprints } from '../../services/workService';
import {
  X,
  Building,
  Mail,
  Phone,
  MessageSquare,
  Send,
  Trash2,
  DollarSign
} from 'lucide-react';

interface TicketDetailDrawerProps {
  ticket: WorkTicket | null;
  currentUser: User;
  onClose: () => void;
  onStatusChange: (id: string, newStatus: TicketStatus) => void;
  onSprintChange: (id: string, sprintId: string | null) => void;
  onAddComment: (id: string, text: string) => void;
  onDeleteTicket: (id: string) => void;
  darkMode: boolean;
}

export const TicketDetailDrawer: React.FC<TicketDetailDrawerProps> = ({
  ticket,
  currentUser,
  onClose,
  onStatusChange,
  onSprintChange,
  onAddComment,
  onDeleteTicket,
  darkMode
}) => {
  const [newComment, setNewComment] = useState('');
  const isAdmin = currentUser.role === 'admin';

  if (!ticket) return null;

  const project = PROJECTS[ticket.projectId];
  const sprints = getSprints(currentUser, ticket.projectId);

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    onAddComment(ticket.id, newComment.trim());
    setNewComment('');
  };

  const whatsappPhone = ticket.crm?.phone ? ticket.crm.phone.replace(/[^0-9]/g, '') : '';
  const whatsappUrl = whatsappPhone
    ? `https://wa.me/${whatsappPhone}?text=Hola%20${encodeURIComponent(
        ticket.crm?.clientName || ''
      )},%20te%20escribo%20desde%20iAtomica%20en%20relación%20al%20ticket%20${ticket.code}:%20${encodeURIComponent(
        ticket.title
      )}.`
    : null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs animate-fade-in">
      <div
        className={`w-full max-w-xl h-full border-l shadow-2xl flex flex-col justify-between overflow-hidden transition-colors ${
          darkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        {/* Drawer Header */}
        <div
          className={`p-6 border-b flex items-start justify-between ${
            darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-slate-50 border-slate-200'
          }`}
        >
          <div className="space-y-2 pr-4">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-mono text-xs font-black px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                {ticket.code}
              </span>
              <span
                className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${project.badgeBg} ${project.badgeText} ${project.border}`}
              >
                {project.name}
              </span>
              <span
                className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
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

            <h3 className="text-lg font-black leading-snug">{ticket.title}</h3>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Drawer Scrollable Content */}
        <div className="flex-1 p-6 overflow-y-auto space-y-6">
          {/* Phase & Sprint Controls */}
          <div
            className={`p-4 rounded-2xl border space-y-3 ${
              darkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Fase en Tablero
                </label>
                <select
                  value={ticket.status}
                  onChange={e => onStatusChange(ticket.id, e.target.value as TicketStatus)}
                  className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-xs font-bold text-slate-900 dark:text-slate-100 focus:outline-none cursor-pointer"
                >
                  <option value="todo">1. Por Iniciar</option>
                  <option value="in_progress">2. En Progreso</option>
                  <option value="review">3. En Revisión / QA</option>
                  <option value="done">4. Completado / Ganado</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1">
                  Sprint Asignado
                </label>
                <select
                  value={ticket.sprintId || 'backlog'}
                  onChange={e => onSprintChange(ticket.id, e.target.value === 'backlog' ? null : e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-xs font-bold text-slate-900 dark:text-slate-100 focus:outline-none cursor-pointer"
                >
                  <option value="backlog">📂 En Backlog</option>
                  {sprints.map(sp => (
                    <option key={sp.id} value={sp.id}>
                      ⚡ {sp.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <h4 className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Descripción & Alcance
            </h4>
            <div
              className={`p-4 rounded-2xl border text-xs leading-relaxed whitespace-pre-wrap ${
                darkMode ? 'bg-slate-900/60 border-slate-800 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-900 font-medium'
              }`}
            >
              {ticket.description || 'Sin descripción detallada.'}
            </div>
          </div>

          {/* Embedded CRM Module */}
          {ticket.crm ? (
            <div className="space-y-2">
              <h4 className="text-[10px] font-mono font-bold uppercase tracking-wider text-orange-500 flex items-center justify-between">
                <span>Módulo de Cliente CRM</span>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-orange-500/10 border border-orange-500/20">
                  {ticket.crm.service}
                </span>
              </h4>

              <div
                className={`p-4 rounded-2xl border space-y-3 ${
                  darkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h5 className="text-sm font-bold text-slate-950 dark:text-white">{ticket.crm.clientName}</h5>
                    <p className="text-xs text-slate-600 dark:text-slate-400 flex items-center gap-1 mt-0.5 font-medium">
                      <Building size={12} className="text-slate-500 dark:text-slate-400" />
                      <span>{ticket.crm.company}</span>
                    </p>
                  </div>

                  {ticket.crm.budget && (
                    <div className="flex items-center space-x-1 font-mono text-xs font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
                      <DollarSign size={12} />
                      <span>{ticket.crm.budget}</span>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono text-slate-700 dark:text-slate-200">
                  {ticket.crm.email && (
                    <div className="flex items-center gap-1.5 truncate">
                      <Mail size={12} className="text-orange-500 shrink-0" />
                      <span className="truncate font-semibold">{ticket.crm.email}</span>
                    </div>
                  )}
                  {ticket.crm.phone && (
                    <div className="flex items-center gap-1.5">
                      <Phone size={12} className="text-purple-600 shrink-0" />
                      <span className="font-semibold">{ticket.crm.phone}</span>
                    </div>
                  )}
                </div>

                {/* Direct WhatsApp Action */}
                {whatsappUrl && (
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-sm flex items-center justify-center space-x-2 transition-all"
                  >
                    <MessageSquare size={14} />
                    <span>Contactar por WhatsApp Directo</span>
                  </a>
                )}
              </div>
            </div>
          ) : (
            <div className="p-3 rounded-xl border border-dashed border-slate-300 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 font-mono text-center">
              Tarea interna (Sin vinculación CRM activa)
            </div>
          )}

          {/* Comments & Activity Feed */}
          <div className="space-y-3 pt-2">
            <h4 className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center justify-between">
              <span>Hilo de Comentarios & Bitácora</span>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-purple-500/10 text-purple-600">
                {ticket.comments.length} notas
              </span>
            </h4>

            {/* List of comments */}
            <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
              {ticket.comments.length === 0 ? (
                <p className="text-xs text-slate-500 dark:text-slate-400 italic font-mono py-2">
                  No hay comentarios registrados. Escribe uno abajo para actualizar la tarjeta.
                </p>
              ) : (
                ticket.comments.map(c => (
                  <div
                    key={c.id}
                    className={`p-3 rounded-2xl border text-xs space-y-1.5 ${
                      darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[11px]">
                      <div className="flex items-center space-x-2">
                        {/* Typographic Monogram */}
                        <div className="w-5 h-5 rounded-md bg-slate-200 dark:bg-slate-800 flex items-center justify-center font-mono font-bold text-[9px] text-slate-800 dark:text-slate-200">
                          {c.authorInitials}
                        </div>
                        <span className="font-bold text-slate-950 dark:text-white">{c.authorName}</span>
                        <span className="text-[9px] font-mono text-slate-500 dark:text-slate-400">({c.authorRole})</span>
                      </div>
                      <span className="text-[9px] font-mono text-slate-500 dark:text-slate-400">
                        {new Date(c.timestamp).toLocaleString(undefined, {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>
                    <p className="text-slate-800 dark:text-slate-200 font-medium pl-7 leading-relaxed">{c.text}</p>
                  </div>
                ))
              )}
            </div>

            {/* Add Comment Input */}
            <form onSubmit={handleCommentSubmit} className="pt-2 flex items-center space-x-2">
              <input
                type="text"
                value={newComment}
                onChange={e => setNewComment(e.target.value)}
                placeholder="Escribe un comentario o actualización..."
                className={`flex-1 px-3.5 py-2.5 rounded-xl border text-xs focus:outline-none focus:border-orange-500 ${
                  darkMode
                    ? 'bg-slate-900 border-slate-800 text-white placeholder:text-slate-500'
                    : 'bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-500 font-medium'
                }`}
              />
              <button
                type="submit"
                className="px-4 py-2.5 rounded-xl gradient-brand text-white font-bold text-xs shadow-md flex items-center space-x-1 hover:opacity-90 cursor-pointer"
              >
                <Send size={13} />
              </button>
            </form>
          </div>
        </div>

        {/* Drawer Footer: Metadata & Admin Delete Restriction */}
        <div
          className={`p-4 px-6 border-t flex items-center justify-between ${
            darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'
          }`}
        >
          <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400 space-y-0.5">
            <div>Creado por: <span className="font-bold text-slate-800 dark:text-slate-200">{ticket.createdBy}</span></div>
            <div>Última actividad: {new Date(ticket.updatedAt).toLocaleTimeString()}</div>
          </div>

          {/* Delete Action: strictly restricted to Admin */}
          {isAdmin ? (
            <button
              onClick={() => {
                if (window.confirm(`¿Estás seguro de eliminar el ticket ${ticket.code}? Esta acción es permanente.`)) {
                  onDeleteTicket(ticket.id);
                  onClose();
                }
              }}
              className="px-3 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 font-bold text-xs flex items-center space-x-1.5 transition-colors cursor-pointer"
              title="Eliminar Ticket (Solo Admin)"
            >
              <Trash2 size={13} />
              <span>Eliminar Tarjeta</span>
            </button>
          ) : (
            <span className="text-[10px] font-mono text-slate-400 italic">
              🔒 Borrado restringido a Administración
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
