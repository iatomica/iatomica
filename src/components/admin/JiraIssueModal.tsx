import React, { useState, useEffect } from 'react';
import type { JiraIssue, JiraIssueType, JiraPriority, JiraStatus } from '../../services/jiraService';
import type { CrmCompany } from '../../services/crmService';
import { X, CheckSquare, Layers, Calendar, Tag, Building } from 'lucide-react';

interface JiraIssueModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (issueData: any) => Promise<void>;
  editingIssue?: JiraIssue | null;
  companies: CrmCompany[];
  defaultCompanyId?: string | null;
  darkMode: boolean;
}

export const JiraIssueModal: React.FC<JiraIssueModalProps> = ({
  isOpen,
  onClose,
  onSave,
  editingIssue,
  companies,
  defaultCompanyId,
  darkMode
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState<JiraIssueType>('task');
  const [status, setStatus] = useState<JiraStatus>('backlog');
  const [priority, setPriority] = useState<JiraPriority>('medium');
  const [companyId, setCompanyId] = useState<string>('');
  const [assignedTo, setAssignedTo] = useState<string>('Sin Asignar');
  const [storyPoints, setStoryPoints] = useState<number>(3);
  const [value, setValue] = useState<number>(0);
  const [dueDate, setDueDate] = useState<string>('');
  const [tagsInput, setTagsInput] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (editingIssue) {
      setTitle(editingIssue.title);
      setDescription(editingIssue.description || '');
      setType(editingIssue.type);
      setStatus(editingIssue.status);
      setPriority(editingIssue.priority);
      setCompanyId(editingIssue.companyId || '');
      setAssignedTo(editingIssue.assignedTo || 'Sin Asignar');
      setStoryPoints(editingIssue.storyPoints || 3);
      setValue(editingIssue.value || 0);
      setDueDate(editingIssue.dueDate ? editingIssue.dueDate.split('T')[0] : '');
      setTagsInput(editingIssue.tags ? editingIssue.tags.join(', ') : '');
    } else {
      setTitle('');
      setDescription('');
      setType('task');
      setStatus('backlog');
      setPriority('medium');
      setCompanyId(defaultCompanyId || '');
      setAssignedTo('Sin Asignar');
      setStoryPoints(3);
      setValue(0);
      setDueDate('');
      setTagsInput('');
    }
  }, [editingIssue, defaultCompanyId, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setIsSubmitting(true);
    const tags = tagsInput
      .split(',')
      .map(t => t.trim())
      .filter(Boolean);

    await onSave({
      title: title.trim(),
      description: description.trim(),
      type,
      status,
      priority,
      companyId: companyId || null,
      assignedTo,
      storyPoints: Number(storyPoints),
      value: Number(value),
      dueDate: dueDate ? new Date(dueDate).toISOString() : null,
      tags
    });

    setIsSubmitting(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div className={`w-full max-w-2xl rounded-3xl border shadow-2xl flex flex-col overflow-hidden transition-colors max-h-[90vh] ${
        darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
      }`}>
        
        {/* Header */}
        <div className={`px-6 py-4 border-b flex items-center justify-between ${
          darkMode ? 'bg-slate-950/80 border-slate-800' : 'bg-slate-50 border-slate-200'
        }`}>
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-xl gradient-brand text-white shadow-sm">
              <CheckSquare size={16} />
            </div>
            <div>
              <h3 className="font-extrabold text-base leading-tight">
                {editingIssue ? `Editar Incidencia: ${editingIssue.issueKey}` : 'Crear Nueva Incidencia en Jira'}
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                {editingIssue ? 'Actualizar detalles de flujo' : 'Se creará en el Backlog o Tablero Activo'}
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

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 text-xs font-sans">
          
          {/* Title */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 font-mono">
              Título de la Incidencia *
            </label>
            <input
              type="text"
              required
              placeholder="Ej: Integración de pasarela de pagos con webhook de WhatsApp"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`w-full px-3.5 py-2.5 rounded-xl border text-xs font-medium focus:outline-none focus:border-orange-500 ${
                darkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
              }`}
            />
          </div>

          {/* Type & Priority Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 font-mono">
                Tipo de Incidencia
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as JiraIssueType)}
                className={`w-full px-3 py-2 rounded-xl border text-xs font-bold focus:outline-none cursor-pointer ${
                  darkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                }`}
              >
                <option value="lead">🟢 Lead / Oportunidad</option>
                <option value="task">🔵 Tarea Operativa</option>
                <option value="consulting">🟣 Consultoría / IA</option>
                <option value="automation">🟠 Automatización / Bot</option>
                <option value="bug">🔴 Incidente Crítico</option>
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
                <option value="highest">⏫ Muy Alta (Highest)</option>
                <option value="high">🔼 Alta (High)</option>
                <option value="medium">🟰 Media (Medium)</option>
                <option value="low">🔽 Baja (Low)</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 font-mono">
                Estado Inicial
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as JiraStatus)}
                className={`w-full px-3 py-2 rounded-xl border text-xs font-bold focus:outline-none cursor-pointer ${
                  darkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                }`}
              >
                <option value="backlog">📥 Backlog (Planificación)</option>
                <option value="todo">📋 Por Hacer (Tablero)</option>
                <option value="in_progress">⚙️ En Progreso</option>
                <option value="review">🔍 Revisión / Demo</option>
                <option value="negotiation">🤝 En Negociación</option>
                <option value="done">✅ Completado</option>
              </select>
            </div>
          </div>

          {/* Company Association & Assignee */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 font-mono flex items-center gap-1">
                <Building size={12} className="text-orange-500" />
                <span>Empresa / Cliente CRM</span>
              </label>
              <select
                value={companyId}
                onChange={(e) => setCompanyId(e.target.value)}
                className={`w-full px-3 py-2 rounded-xl border text-xs font-bold focus:outline-none cursor-pointer ${
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
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 font-mono">
                Responsable Asignado
              </label>
              <select
                value={assignedTo}
                onChange={(e) => setAssignedTo(e.target.value)}
                className={`w-full px-3 py-2 rounded-xl border text-xs font-bold focus:outline-none cursor-pointer ${
                  darkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                }`}
              >
                <option value="Atención Público">Atención Público (Sofía)</option>
                <option value="Consultoría Técnica">Consultoría Técnica (Lucas)</option>
                <option value="Ventas">Ventas (Mateo)</option>
                <option value="Sin Asignar">Sin Asignar</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 font-mono">
              Descripción &amp; Alcance
            </label>
            <textarea
              rows={3}
              placeholder="Detalla los requerimientos técnicos, criterios de aceptación o notas de la llamada..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={`w-full px-3.5 py-2.5 rounded-xl border text-xs font-medium focus:outline-none focus:border-orange-500 ${
                darkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
              }`}
            />
          </div>

          {/* Estimation, Value, Due Date */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 font-mono flex items-center gap-1">
                <Layers size={12} className="text-purple-500" />
                <span>Story Points (Esfuerzo)</span>
              </label>
              <input
                type="number"
                min="0"
                max="100"
                value={storyPoints}
                onChange={(e) => setStoryPoints(Number(e.target.value))}
                className={`w-full px-3 py-2 rounded-xl border text-xs font-bold focus:outline-none ${
                  darkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                }`}
              />
            </div>


            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 font-mono flex items-center gap-1">
                <Calendar size={12} className="text-cyan-500" />
                <span>Fecha Límite / SLA</span>
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

          {/* Tags */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 font-mono flex items-center gap-1">
              <Tag size={12} className="text-orange-500" />
              <span>Etiquetas / Tags (separadas por comas)</span>
            </label>
            <input
              type="text"
              placeholder="Agentes IA, WhatsApp, Enterprise, Q3"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              className={`w-full px-3.5 py-2 rounded-xl border text-xs font-medium focus:outline-none focus:border-orange-500 ${
                darkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
              }`}
            />
          </div>

          {/* Footer Actions */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 font-bold text-xs transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2 rounded-xl gradient-brand text-white font-bold text-xs shadow-md hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {isSubmitting ? 'Guardando...' : editingIssue ? 'Guardar Cambios' : 'Crear Incidencia'}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
