import React, { useState } from 'react';
import type { User } from '../../services/authService';
import { PROJECTS, createTicket, getSprints } from '../../services/workService';
import type { ProjectId, TicketPriority, TicketStatus } from '../../services/workService';
import { X, Plus, Sparkles, Building, Mail, Phone, Layers } from 'lucide-react';

interface CreateTicketModalProps {
  currentUser: User;
  onClose: () => void;
  onTicketCreated: () => void;
  darkMode: boolean;
  defaultProjectId?: ProjectId;
}

export const CreateTicketModal: React.FC<CreateTicketModalProps> = ({
  currentUser,
  onClose,
  onTicketCreated,
  darkMode,
  defaultProjectId
}) => {
  const isAdmin = currentUser.role === 'admin';

  // If not admin, strictly lock to user's assigned project
  const [projectId, setProjectId] = useState<ProjectId>(
    isAdmin ? (defaultProjectId || 'bariloche') : (currentUser.projectId as ProjectId)
  );

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<TicketPriority>('media');
  const [status, setStatus] = useState<TicketStatus>('todo');
  const [sprintId, setSprintId] = useState<string>('backlog');

  // CRM fields
  const [hasCrm, setHasCrm] = useState(true);
  const [clientName, setClientName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('Desarrollo a Medida');
  const [budget, setBudget] = useState('');

  const projectSprints = getSprints(currentUser, projectId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    createTicket(currentUser, {
      title: title.trim(),
      description: description.trim(),
      projectId,
      sprintId: sprintId === 'backlog' ? null : sprintId,
      priority,
      status,
      crm: hasCrm && clientName.trim()
        ? {
            clientName: clientName.trim(),
            company: company.trim() || 'Empresa Particular',
            email: email.trim(),
            phone: phone.trim(),
            service,
            budget: budget.trim()
          }
        : undefined
    });

    onTicketCreated();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div
        className={`w-full max-w-2xl max-h-[90vh] rounded-3xl border shadow-2xl flex flex-col overflow-hidden transition-colors ${
          darkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        {/* Header */}
        <div
          className={`px-6 py-4 border-b flex items-center justify-between ${
            darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-slate-50 border-slate-200'
          }`}
        >
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-xl gradient-brand flex items-center justify-center text-white shadow-xs">
              <Plus size={18} />
            </div>
            <div>
              <h3 className="text-base font-black leading-tight">Crear Nueva Tarjeta / Ticket CRM</h3>
              <p className="text-[11px] text-slate-400 font-mono">
                {isAdmin
                  ? 'Como Administrador puedes asociarla a cualquier proyecto.'
                  : `Se vinculará automáticamente al ${PROJECTS[projectId].name}.`}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-5">
          {/* Project & Sprint Selection */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Proyecto / Épica
              </label>
              {isAdmin ? (
                <select
                  value={projectId}
                  onChange={e => setProjectId(e.target.value as ProjectId)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-xs font-bold focus:outline-none focus:border-orange-500 cursor-pointer"
                >
                  <option value="bariloche">🌲 Proyecto Bariloche (José Anaya)</option>
                  <option value="espana">🇪🇸 Proyecto España (Stefi Del Papa)</option>
                </select>
              ) : (
                <div
                  className={`px-3.5 py-2.5 rounded-xl border flex items-center space-x-2 text-xs font-bold ${PROJECTS[projectId].badgeBg} ${PROJECTS[projectId].badgeText} ${PROJECTS[projectId].border}`}
                >
                  <Layers size={14} />
                  <span>{PROJECTS[projectId].name}</span>
                </div>
              )}
            </div>

            <div>
              <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Asignación de Sprint
              </label>
              <select
                value={sprintId}
                onChange={e => setSprintId(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-xs font-bold focus:outline-none focus:border-orange-500 cursor-pointer"
              >
                <option value="backlog">📂 En Backlog (Sin Sprint activo)</option>
                {projectSprints.map(sp => (
                  <option key={sp.id} value={sp.id}>
                    ⚡ {sp.name} {sp.status === 'active' ? '(Activo)' : ''}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Título de la Tarea / Requerimiento *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Ej: Implementación de pasarela de pago o Consulta sobre IA..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-xs font-bold focus:outline-none focus:border-orange-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Descripción & Alcance
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Detalla las especificaciones técnicas, objetivos o notas del cliente..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-xs font-medium focus:outline-none focus:border-orange-500"
            />
          </div>

          {/* Priority & Phase */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Prioridad
              </label>
              <select
                value={priority}
                onChange={e => setPriority(e.target.value as TicketPriority)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-xs font-bold focus:outline-none cursor-pointer"
              >
                <option value="baja">🟢 Baja</option>
                <option value="media">🟡 Media</option>
                <option value="alta">🟠 Alta</option>
                <option value="urgente">🔴 Urgente</option>
              </select>
            </div>

            <div>
              <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Fase Inicial en Tablero
              </label>
              <select
                value={status}
                onChange={e => setStatus(e.target.value as TicketStatus)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-xs font-bold focus:outline-none cursor-pointer"
              >
                <option value="todo">1. Por Iniciar</option>
                <option value="in_progress">2. En Progreso</option>
                <option value="review">3. En Revisión / QA</option>
                <option value="done">4. Completado / Ganado</option>
              </select>
            </div>
          </div>

          {/* CRM Section Toggle */}
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <Sparkles size={14} className="text-orange-500" />
                <span className="text-xs font-bold">Vincular Información de Cliente (CRM)</span>
              </div>
              <label className="flex items-center space-x-2 text-xs text-slate-400 cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasCrm}
                  onChange={e => setHasCrm(e.target.checked)}
                  className="rounded text-orange-500 focus:ring-0"
                />
                <span>Habilitar CRM</span>
              </label>
            </div>

            {hasCrm && (
              <div
                className={`p-4 rounded-2xl border space-y-3 ${
                  darkMode ? 'bg-slate-900/50 border-slate-800' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-mono font-bold text-slate-400 block mb-1">
                      Nombre del Cliente / Contacto
                    </label>
                    <input
                      type="text"
                      value={clientName}
                      onChange={e => setClientName(e.target.value)}
                      placeholder="Ej: Laura Méndez"
                      className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-xs font-medium focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-mono font-bold text-slate-400 block mb-1">
                      Empresa / Organización
                    </label>
                    <div className="relative">
                      <Building size={12} className="absolute left-3 top-2.5 text-slate-400" />
                      <input
                        type="text"
                        value={company}
                        onChange={e => setCompany(e.target.value)}
                        placeholder="Ej: Andes Tech SRL"
                        className="w-full pl-8 pr-3 py-2 rounded-xl bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-xs font-medium focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-[10px] font-mono font-bold text-slate-400 block mb-1">
                      Teléfono / WhatsApp
                    </label>
                    <div className="relative">
                      <Phone size={12} className="absolute left-3 top-2.5 text-slate-400" />
                      <input
                        type="text"
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        placeholder="+54 9 294..."
                        className="w-full pl-8 pr-3 py-2 rounded-xl bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-xs font-mono focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-mono font-bold text-slate-400 block mb-1">
                      Email
                    </label>
                    <div className="relative">
                      <Mail size={12} className="absolute left-3 top-2.5 text-slate-400" />
                      <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="cliente@empresa.com"
                        className="w-full pl-8 pr-3 py-2 rounded-xl bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-xs font-mono focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-mono font-bold text-slate-400 block mb-1">
                      Presupuesto Estimado
                    </label>
                    <input
                      type="text"
                      value={budget}
                      onChange={e => setBudget(e.target.value)}
                      placeholder="$3,500 USD o €"
                      className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-xs font-bold text-emerald-600 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-mono font-bold text-slate-400 block mb-1">
                    Servicio Solicitado
                  </label>
                  <select
                    value={service}
                    onChange={e => setService(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-xs font-bold focus:outline-none cursor-pointer"
                  >
                    <option value="Desarrollo a Medida">Desarrollo a Medida</option>
                    <option value="Herramientas de IA">Herramientas de IA</option>
                    <option value="Consultoría Técnica">Consultoría Técnica</option>
                    <option value="QA & Testing">QA & Testing</option>
                    <option value="Automatización de Flujos">Automatización de Flujos</option>
                  </select>
                </div>
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-bold hover:bg-slate-200 transition-colors cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl gradient-brand text-white font-bold text-xs shadow-md hover:opacity-90 transition-all flex items-center space-x-1.5 cursor-pointer"
            >
              <Plus size={14} />
              <span>Guardar y Crear Tarjeta</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
