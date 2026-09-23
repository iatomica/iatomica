import React, { useState, useEffect } from 'react';
import type { JiraIssue, JiraIssueType, JiraPriority, JiraStatus, TicketComment } from '../../services/jiraService';
import { fetchTicketComments, addTicketComment } from '../../services/jiraService';
import type { CrmCompany } from '../../services/crmService';
import { generateWhatsAppLink } from '../../services/crmService';
import { TEAM_MEMBERS } from '../../services/authService';
import type { User } from '../../services/authService';
import { 
  X, 
  CheckSquare, 
  Calendar, 
  Building, 
  MessageSquare, 
  Phone, 
  Send, 
  Clock, 
  User as UserIcon,
  PhoneCall,
  Users,
  FileText
} from 'lucide-react';

interface JiraIssueModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (issueData: any) => Promise<void>;
  editingIssue?: JiraIssue | null;
  companies: CrmCompany[];
  defaultCompanyId?: string | null;
  darkMode: boolean;
  currentUser?: User | null;
}

export const JiraIssueModal: React.FC<JiraIssueModalProps> = ({
  isOpen,
  onClose,
  onSave,
  editingIssue,
  companies,
  defaultCompanyId,
  darkMode,
  currentUser
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState<JiraIssueType>('task');
  const [status, setStatus] = useState<JiraStatus>('backlog');
  const [priority, setPriority] = useState<JiraPriority>('medium');
  const [companyId, setCompanyId] = useState<string>('');
  const [assignedTo, setAssignedTo] = useState<string>('Sin Asignar');
  const [dueDate, setDueDate] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Comments State
  const [comments, setComments] = useState<TicketComment[]>([]);
  const [newCommentText, setNewCommentText] = useState('');
  const [commentType, setCommentType] = useState<'note' | 'whatsapp' | 'call' | 'meeting'>('note');
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);

  useEffect(() => {
    if (editingIssue) {
      setTitle(editingIssue.title);
      setDescription(editingIssue.description || '');
      setType(editingIssue.type);
      setStatus(editingIssue.status);
      setPriority(editingIssue.priority);
      setCompanyId(editingIssue.companyId || '');
      setAssignedTo(editingIssue.assignedTo || 'Sin Asignar');
      setDueDate(editingIssue.dueDate ? editingIssue.dueDate.split('T')[0] : '');

      // Load comments for this ticket
      fetchTicketComments(editingIssue.id).then(setComments);
    } else {
      setTitle('');
      setDescription('');
      setType('task');
      setStatus('backlog');
      setPriority('medium');
      setCompanyId(defaultCompanyId || '');
      setAssignedTo(currentUser?.name || 'Sin Asignar');
      setDueDate('');
      setComments([]);
    }
  }, [editingIssue, defaultCompanyId, isOpen, currentUser]);

  if (!isOpen) return null;

  const linkedCompany = companies.find(c => c.id === companyId);
  const waLink = linkedCompany?.phone 
    ? generateWhatsAppLink(linkedCompany.phone, linkedCompany.contactName, linkedCompany.name)
    : null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setIsSubmitting(true);

    await onSave({
      title: title.trim(),
      description: description.trim(),
      type,
      status,
      priority,
      companyId: companyId || null,
      assignedTo,
      dueDate: dueDate ? new Date(dueDate).toISOString() : null
    });

    setIsSubmitting(false);
    onClose();
  };

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingIssue || !newCommentText.trim()) return;

    setIsSubmittingComment(true);
    const authorName = currentUser?.name || 'Equipo iAtomica';
    const authorId = currentUser?.id || 'usr-admin';

    const created = await addTicketComment(editingIssue.id, {
      authorId,
      authorName,
      content: newCommentText.trim(),
      type: commentType
    });

    if (created) {
      setComments(prev => [...prev, created]);
      setNewCommentText('');
    }
    setIsSubmittingComment(false);
  };

  const getCommentIcon = (type: string) => {
    switch (type) {
      case 'whatsapp':
        return <MessageSquare size={13} className="text-emerald-500" />;
      case 'call':
        return <PhoneCall size={13} className="text-blue-500" />;
      case 'meeting':
        return <Users size={13} className="text-purple-500" />;
      default:
        return <FileText size={13} className="text-amber-500" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div className={`w-full max-w-4xl rounded-3xl border shadow-2xl flex flex-col overflow-hidden transition-colors max-h-[92vh] ${
        darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
      }`}>
        
        {/* Header */}
        <div className={`px-6 py-4 border-b flex items-center justify-between ${
          darkMode ? 'bg-slate-950/80 border-slate-800' : 'bg-slate-50 border-slate-200'
        }`}>
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl gradient-brand text-white shadow-sm">
              <CheckSquare size={16} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-base leading-tight">
                  {editingIssue ? `Ticket: ${editingIssue.issueKey}` : 'Nuevo Ticket de Prospección'}
                </h3>
                {editingIssue && (
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-orange-500/10 text-orange-600 border border-orange-500/20">
                    {editingIssue.status.toUpperCase()}
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400 font-mono">
                {editingIssue ? 'Detalle operativo y bitácora del cliente' : 'Se asignará al pipeline comercial'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content Body: Two Columns */}
        <div className="flex-1 overflow-y-auto grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-200 dark:divide-slate-800">
          
          {/* Left Column: Form & Core Information (7 cols) */}
          <form onSubmit={handleSubmit} className="lg:col-span-7 p-6 space-y-4 text-xs font-sans">
            
            {/* Title */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 font-mono">
                Título del Ticket *
              </label>
              <input
                type="text"
                required
                placeholder="Ej: Prospección & Solución Digital: OSB Arquitectos"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={`w-full px-3.5 py-2.5 rounded-xl border text-xs font-medium focus:outline-none focus:border-orange-500 ${
                  darkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                }`}
              />
            </div>

            {/* Company Link & Direct Contact */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 font-mono flex items-center gap-1">
                <Building size={12} className="text-orange-500" />
                <span>Prospecto / Empresa CRM</span>
              </label>
              <select
                value={companyId}
                onChange={(e) => setCompanyId(e.target.value)}
                className={`w-full px-3 py-2.5 rounded-xl border text-xs font-bold focus:outline-none cursor-pointer ${
                  darkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                }`}
              >
                <option value="">-- Sin Vincular a Empresa --</option>
                {companies.map(c => (
                  <option key={c.id} value={c.id}>
                    🏢 {c.name} ({c.contactName})
                  </option>
                ))}
              </select>

              {/* Quick Communication Actions if Company Linked */}
              {linkedCompany && (
                <div className="mt-2 p-2.5 rounded-xl bg-orange-500/5 border border-orange-500/15 flex flex-wrap items-center justify-between gap-2">
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">
                    <span className="font-bold text-slate-800 dark:text-slate-200">{linkedCompany.contactName}</span>
                    {linkedCompany.phone && <span className="ml-2 font-mono">{linkedCompany.phone}</span>}
                  </div>
                  <div className="flex items-center gap-2">
                    {waLink && (
                      <a
                        href={waLink}
                        target="_blank"
                        rel="noreferrer"
                        className="px-2.5 py-1 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-[10px] flex items-center gap-1 transition-colors"
                      >
                        <MessageSquare size={12} />
                        <span>WhatsApp Directo</span>
                      </a>
                    )}
                    {linkedCompany.phone && (
                      <a
                        href={`tel:${linkedCompany.phone}`}
                        className="px-2.5 py-1 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-[10px] flex items-center gap-1 hover:bg-slate-300 transition-colors"
                      >
                        <Phone size={12} />
                        <span>Llamar</span>
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Status & Priority */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 font-mono">
                  Estado en el Pipeline
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as JiraStatus)}
                  className={`w-full px-3 py-2 rounded-xl border text-xs font-bold focus:outline-none cursor-pointer ${
                    darkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                  }`}
                >
                  <option value="backlog">📋 Backlog (Triaje)</option>
                  <option value="todo">⏳ Por Contactar (To Do)</option>
                  <option value="in_progress">⚙️ Contactado / En Conversación</option>
                  <option value="review">🔍 Reunión / Propuesta</option>
                  <option value="negotiation">🤝 En Negociación</option>
                  <option value="done">✅ Ganado / Cliente Activo</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 font-mono">
                  Prioridad
                </label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as JiraPriority)}
                  className={`w-full px-3 py-2 rounded-xl border text-xs font-bold focus:outline-none cursor-pointer ${
                    darkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                  }`}
                >
                  <option value="highest">⏫ Muy Alta (Urgente)</option>
                  <option value="high">🔼 Alta</option>
                  <option value="medium">➡️ Media (Normal)</option>
                  <option value="low">🔽 Baja</option>
                </select>
              </div>
            </div>

            {/* Assignee & Next Follow-up Date */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 font-mono flex items-center gap-1">
                  <UserIcon size={12} className="text-orange-500" />
                  <span>Responsable Asignado</span>
                </label>
                <select
                  value={assignedTo}
                  onChange={(e) => setAssignedTo(e.target.value)}
                  className={`w-full px-3 py-2 rounded-xl border text-xs font-bold focus:outline-none cursor-pointer ${
                    darkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                  }`}
                >
                  <option value="Sin Asignar">-- Sin Asignar --</option>
                  {TEAM_MEMBERS.map(member => (
                    <option key={member} value={member}>
                      👤 {member}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 font-mono flex items-center gap-1">
                  <Calendar size={12} className="text-cyan-500" />
                  <span>Próximo Contacto (SLA)</span>
                </label>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className={`w-full px-3 py-2 rounded-xl border text-xs font-bold focus:outline-none ${
                    darkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                  }`}
                />
              </div>
            </div>

            {/* Description / Scope */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 font-mono">
                Descripción &amp; Requerimientos Detectados
              </label>
              <textarea
                rows={3}
                placeholder="Detalla necesidades detectadas, puntos de dolor, observaciones..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className={`w-full px-3.5 py-2.5 rounded-xl border text-xs font-medium focus:outline-none focus:border-orange-500 ${
                  darkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                }`}
              />
            </div>

            {/* Save Buttons */}
            <div className="pt-2 flex items-center justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 font-bold text-xs transition-colors"
              >
                Cerrar
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-5 py-2 rounded-xl gradient-brand text-white font-bold text-xs shadow-md hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {isSubmitting ? 'Guardando...' : editingIssue ? 'Guardar Cambios' : 'Crear Ticket'}
              </button>
            </div>

          </form>

          {/* Right Column: Collaborative Notes & Comments Timeline (5 cols) */}
          <div className="lg:col-span-5 p-6 flex flex-col justify-between h-full bg-slate-50/50 dark:bg-slate-950/40">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800 mb-4">
                <div className="flex items-center space-x-2">
                  <MessageSquare size={16} className="text-orange-500" />
                  <h4 className="font-extrabold text-xs uppercase tracking-wider font-mono">
                    Bitácora &amp; Comentarios
                  </h4>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-800 font-bold">
                  {comments.length} notas
                </span>
              </div>

              {/* Comments Feed */}
              <div className="space-y-3 max-h-[360px] overflow-y-auto pr-1">
                {comments.length === 0 ? (
                  <div className="text-center py-10 px-4 text-slate-400">
                    <Clock size={28} className="mx-auto mb-2 opacity-30" />
                    <p className="text-xs font-medium">Aún no hay notas registradas.</p>
                    <p className="text-[10px] text-slate-400 mt-1">
                      Agrega comentarios sobre llamadas, acuerdos o próximos pasos para el equipo.
                    </p>
                  </div>
                ) : (
                  comments.map(c => (
                    <div 
                      key={c.id} 
                      className={`p-3 rounded-2xl border text-xs space-y-1.5 transition-all ${
                        darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-2xs'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[10px] text-slate-400">
                        <div className="flex items-center space-x-1.5 font-bold text-slate-700 dark:text-slate-300">
                          {getCommentIcon(c.type)}
                          <span>{c.authorName}</span>
                        </div>
                        <span className="font-mono">
                          {new Date(c.createdAt).toLocaleDateString('es-ES', { 
                            day: '2-digit', 
                            month: 'short', 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </span>
                      </div>
                      <p className="text-slate-700 dark:text-slate-200 text-xs leading-relaxed whitespace-pre-wrap">
                        {c.content}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Comment Form */}
            {editingIssue ? (
              <form onSubmit={handleAddComment} className="pt-4 mt-4 border-t border-slate-200 dark:border-slate-800 space-y-2">
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setCommentType('note')}
                    className={`px-2 py-0.5 rounded text-[10px] font-bold border transition-colors ${
                      commentType === 'note' 
                        ? 'bg-amber-500/20 text-amber-500 border-amber-500/40' 
                        : 'text-slate-400 border-transparent hover:text-slate-200'
                    }`}
                  >
                    Nota
                  </button>
                  <button
                    type="button"
                    onClick={() => setCommentType('whatsapp')}
                    className={`px-2 py-0.5 rounded text-[10px] font-bold border transition-colors ${
                      commentType === 'whatsapp' 
                        ? 'bg-emerald-500/20 text-emerald-500 border-emerald-500/40' 
                        : 'text-slate-400 border-transparent hover:text-slate-200'
                    }`}
                  >
                    WhatsApp
                  </button>
                  <button
                    type="button"
                    onClick={() => setCommentType('call')}
                    className={`px-2 py-0.5 rounded text-[10px] font-bold border transition-colors ${
                      commentType === 'call' 
                        ? 'bg-blue-500/20 text-blue-500 border-blue-500/40' 
                        : 'text-slate-400 border-transparent hover:text-slate-200'
                    }`}
                  >
                    Llamada
                  </button>
                  <button
                    type="button"
                    onClick={() => setCommentType('meeting')}
                    className={`px-2 py-0.5 rounded text-[10px] font-bold border transition-colors ${
                      commentType === 'meeting' 
                        ? 'bg-purple-500/20 text-purple-500 border-purple-500/40' 
                        : 'text-slate-400 border-transparent hover:text-slate-200'
                    }`}
                  >
                    Reunión
                  </button>
                </div>

                <div className="relative">
                  <textarea
                    rows={2}
                    required
                    placeholder="Escribe una actualización para el equipo..."
                    value={newCommentText}
                    onChange={(e) => setNewCommentText(e.target.value)}
                    className={`w-full pr-10 pl-3 py-2 rounded-xl border text-xs focus:outline-none focus:border-orange-500 ${
                      darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-300 text-slate-900'
                    }`}
                  />
                  <button
                    type="submit"
                    disabled={isSubmittingComment || !newCommentText.trim()}
                    className="absolute right-2 bottom-2.5 p-1.5 rounded-lg gradient-brand text-white hover:opacity-90 disabled:opacity-40 transition-opacity"
                    title="Publicar nota"
                  >
                    <Send size={13} />
                  </button>
                </div>
              </form>
            ) : (
              <p className="text-[10px] text-slate-400 italic text-center pt-2">
                Guarda el ticket para comenzar a registrar notas y comentarios.
              </p>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};
