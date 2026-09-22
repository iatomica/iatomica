import React, { useState } from 'react';
import type { JiraIssue, JiraIssueType, JiraPriority, JiraStatus } from '../../services/jiraService';
import type { CrmCompany } from '../../services/crmService';
import { 
  Play, 
  Plus, 
  Building, 
  Edit3, 
  Trash2, 
  Search, 
  ChevronDown, 
  ChevronRight
} from 'lucide-react';

interface JiraBacklogProps {
  issues: JiraIssue[];
  companies: CrmCompany[];
  onStatusChange: (id: string, newStatus: JiraStatus) => void;
  onQuickCreate: (title: string, type: JiraIssueType) => Promise<void>;
  onEditIssue: (issue: JiraIssue) => void;
  onDeleteIssue: (id: string) => void;
  onOpenCompany: (companyId: string) => void;
  onOpenCreateModal: () => void;
  darkMode: boolean;
}

export const JiraBacklog: React.FC<JiraBacklogProps> = ({
  issues,
  onStatusChange,
  onQuickCreate,
  onEditIssue,
  onDeleteIssue,
  onOpenCompany,
  onOpenCreateModal,
  darkMode
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newType, setNewType] = useState<JiraIssueType>('task');
  const [isCreating, setIsCreating] = useState(false);
  const [isSprintExpanded, setIsSprintExpanded] = useState(true);
  const [isBacklogExpanded, setIsBacklogExpanded] = useState(true);

  const backlogIssues = issues.filter(i => i.status === 'backlog');
  const activeSprintIssues = issues.filter(i => i.status !== 'backlog' && i.status !== 'done');

  const filteredBacklog = backlogIssues.filter(i => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      i.issueKey.toLowerCase().includes(q) ||
      i.title.toLowerCase().includes(q) ||
      (i.companyName && i.companyName.toLowerCase().includes(q))
    );
  });

  const filteredSprint = activeSprintIssues.filter(i => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      i.issueKey.toLowerCase().includes(q) ||
      i.title.toLowerCase().includes(q) ||
      (i.companyName && i.companyName.toLowerCase().includes(q))
    );
  });

  const handleQuickCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    setIsCreating(true);
    await onQuickCreate(newTitle.trim(), newType);
    setNewTitle('');
    setIsCreating(false);
  };

  const getTypeIcon = (type: JiraIssueType) => {
    switch (type) {
      case 'lead': return '🟢';
      case 'task': return '🔵';
      case 'consulting': return '🟣';
      case 'automation': return '🟠';
      case 'bug': return '🔴';
    }
  };

  const getPriorityIcon = (priority: JiraPriority) => {
    switch (priority) {
      case 'highest': return '⏫';
      case 'high': return '🔼';
      case 'medium': return '🟰';
      case 'low': return '🔽';
    }
  };

  const sprintPoints = activeSprintIssues.reduce((acc, curr) => acc + (curr.storyPoints || 0), 0);
  const backlogPoints = backlogIssues.reduce((acc, curr) => acc + (curr.storyPoints || 0), 0);

  return (
    <div className="space-y-6">
      
      {/* Header Toolbar */}
      <div className={`p-4 rounded-2xl border flex flex-col sm:flex-row items-center justify-between gap-4 ${
        darkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
      }`}>
        <div className="flex items-center space-x-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-80">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Filtrar backlog por clave, título o cliente..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-9 pr-3 py-1.5 rounded-xl text-xs font-medium border focus:outline-none focus:border-orange-500 ${
                darkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
              }`}
            />
          </div>
        </div>

        <div className="flex items-center space-x-3 w-full sm:w-auto justify-between sm:justify-end">
          <span className="text-xs font-mono text-slate-400">
            {backlogIssues.length} en cola ({backlogPoints} pts)
          </span>
          <button
            onClick={onOpenCreateModal}
            className="px-3.5 py-1.5 rounded-xl gradient-brand text-white font-bold text-xs shadow-md hover:opacity-90 flex items-center space-x-1.5 transition-all"
          >
            <Plus size={14} />
            <span>Nueva Incidencia Detallada</span>
          </button>
        </div>
      </div>

      {/* SECTION 1: Active Work (Sprint Activo) */}
      <div className={`rounded-2xl border overflow-hidden ${
        darkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
      }`}>
        
        {/* Sprint Accordion Header */}
        <div 
          onClick={() => setIsSprintExpanded(!isSprintExpanded)}
          className={`p-4 border-b flex items-center justify-between cursor-pointer select-none transition-colors ${
            darkMode ? 'bg-slate-950/60 hover:bg-slate-950' : 'bg-slate-50/80 hover:bg-slate-100'
          }`}
        >
          <div className="flex items-center space-x-3">
            {isSprintExpanded ? <ChevronDown size={18} className="text-slate-400" /> : <ChevronRight size={18} className="text-slate-400" />}
            <div className="flex items-center space-x-2">
              <span className="font-heading font-black text-sm text-slate-900 dark:text-white">
                Tablero Activo (En Curso)
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-blue-500/10 text-blue-600 border border-blue-500/20">
                Sprint Operativo
              </span>
            </div>
            <span className="text-xs text-slate-400 font-mono">
              ({filteredSprint.length} incidencias · {sprintPoints} story points)
            </span>
          </div>

          <div className="flex items-center space-x-2 text-xs font-mono text-slate-400">
            <span className="hidden sm:inline">Trabajándose actualmente</span>
          </div>
        </div>

        {/* Sprint Items List */}
        {isSprintExpanded && (
          <div className="divide-y divide-slate-100 dark:divide-slate-800/80">
            {filteredSprint.length === 0 ? (
              <div className="py-8 text-center text-xs text-slate-400 font-mono italic">
                El tablero activo no tiene incidencias pendientes. Mueve trabajo desde el backlog a continuación.
              </div>
            ) : (
              filteredSprint.map(issue => (
                <div
                  key={issue.id}
                  className="p-3 sm:px-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 hover:bg-purple-500/5 transition-colors group"
                >
                  {/* Left: Type, Key, Title, Company */}
                  <div className="flex items-center space-x-3 min-w-0 flex-1">
                    <span title={issue.type} className="text-sm shrink-0">
                      {getTypeIcon(issue.type)}
                    </span>
                    <span className="font-mono text-xs font-bold text-slate-400 shrink-0">
                      {issue.issueKey}
                    </span>
                    <h5 
                      onClick={() => onEditIssue(issue)}
                      className="font-bold text-xs text-slate-800 dark:text-slate-200 hover:text-orange-500 cursor-pointer truncate"
                    >
                      {issue.title}
                    </h5>

                    {issue.companyName && (
                      <button
                        onClick={() => issue.companyId && onOpenCompany(issue.companyId)}
                        className="hidden md:inline-flex items-center space-x-1 px-2 py-0.5 rounded bg-purple-500/10 text-purple-600 dark:text-purple-400 text-[10px] font-bold border border-purple-500/20 shrink-0"
                        title="Ver en CRM"
                      >
                        <Building size={10} />
                        <span>{issue.companyName}</span>
                      </button>
                    )}
                  </div>

                  {/* Right: Status badge, Priority, Story Points, Assignee & Return to Backlog */}
                  <div className="flex items-center space-x-2.5 self-end sm:self-center shrink-0">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-mono">
                      {issue.status}
                    </span>

                    <span title={`Prioridad: ${issue.priority}`} className="text-xs font-bold">
                      {getPriorityIcon(issue.priority)}
                    </span>

                    <span className="px-1.5 py-0.5 rounded bg-purple-500/10 text-purple-600 font-mono text-[10px] font-bold">
                      {issue.storyPoints}p
                    </span>

                    <span className="text-[11px] text-slate-500 font-medium hidden lg:inline max-w-[100px] truncate">
                      {issue.assignedTo}
                    </span>

                    <button
                      onClick={() => onStatusChange(issue.id, 'backlog')}
                      className="px-2 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 text-[10px] font-bold transition-colors"
                      title="Regresar al Backlog"
                    >
                      Devolver a Backlog
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

      </div>

      {/* SECTION 2: Prioritization Backlog */}
      <div className={`rounded-2xl border overflow-hidden ${
        darkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
      }`}>
        
        {/* Backlog Accordion Header */}
        <div 
          onClick={() => setIsBacklogExpanded(!isBacklogExpanded)}
          className={`p-4 border-b flex items-center justify-between cursor-pointer select-none transition-colors ${
            darkMode ? 'bg-slate-950/60 hover:bg-slate-950' : 'bg-slate-50/80 hover:bg-slate-100'
          }`}
        >
          <div className="flex items-center space-x-3">
            {isBacklogExpanded ? <ChevronDown size={18} className="text-slate-400" /> : <ChevronRight size={18} className="text-slate-400" />}
            <div className="flex items-center space-x-2">
              <span className="font-heading font-black text-sm text-slate-900 dark:text-white">
                Backlog (Cola de Priorización)
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-orange-500/10 text-orange-600 border border-orange-500/20">
                Planificación
              </span>
            </div>
            <span className="text-xs text-slate-400 font-mono">
              ({filteredBacklog.length} incidencias · {backlogPoints} story points)
            </span>
          </div>

          <div className="flex items-center space-x-2 text-xs font-mono text-slate-400">
            <span className="hidden sm:inline">Listo para enviar al Tablero Activo</span>
          </div>
        </div>

        {/* Backlog Items List */}
        {isBacklogExpanded && (
          <div className="divide-y divide-slate-100 dark:divide-slate-800/80">
            {filteredBacklog.length === 0 ? (
              <div className="py-10 text-center text-xs text-slate-400 font-mono italic">
                El backlog está vacío. Utiliza el formulario rápido al pie para agregar nuevas tareas o leads.
              </div>
            ) : (
              filteredBacklog.map(issue => (
                <div
                  key={issue.id}
                  className="p-3 sm:px-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 hover:bg-purple-500/5 transition-colors group"
                >
                  {/* Left: Action to activate, Type, Key, Title, Company */}
                  <div className="flex items-center space-x-3 min-w-0 flex-1">
                    
                    {/* One-Click Action: Send to Active Board */}
                    <button
                      onClick={() => onStatusChange(issue.id, 'todo')}
                      className="px-2.5 py-1 rounded-lg gradient-brand text-white font-bold text-[10px] flex items-center space-x-1 shadow-xs hover:opacity-90 transition-opacity shrink-0"
                      title="Activar en el Tablero de Trabajo"
                    >
                      <Play size={10} />
                      <span>Activar</span>
                    </button>

                    <span title={issue.type} className="text-sm shrink-0">
                      {getTypeIcon(issue.type)}
                    </span>

                    <span className="font-mono text-xs font-bold text-slate-400 shrink-0">
                      {issue.issueKey}
                    </span>

                    <h5 
                      onClick={() => onEditIssue(issue)}
                      className="font-bold text-xs text-slate-800 dark:text-slate-200 hover:text-orange-500 cursor-pointer truncate"
                    >
                      {issue.title}
                    </h5>

                    {issue.companyName && (
                      <button
                        onClick={() => issue.companyId && onOpenCompany(issue.companyId)}
                        className="hidden md:inline-flex items-center space-x-1 px-2 py-0.5 rounded bg-purple-500/10 text-purple-600 dark:text-purple-400 text-[10px] font-bold border border-purple-500/20 shrink-0"
                        title="Ver en Directorio CRM"
                      >
                        <Building size={10} />
                        <span>{issue.companyName}</span>
                      </button>
                    )}
                  </div>

                  {/* Right: Priority, Story Points, Value, Assignee, Actions */}
                  <div className="flex items-center space-x-2.5 self-end sm:self-center shrink-0">
                    <span title={`Prioridad: ${issue.priority}`} className="text-xs font-bold">
                      {getPriorityIcon(issue.priority)}
                    </span>

                    <span className="px-1.5 py-0.5 rounded bg-purple-500/10 text-purple-600 font-mono text-[10px] font-bold">
                      {issue.storyPoints}p
                    </span>

                    {issue.value > 0 && (
                      <span className="font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400">
                        ${issue.value}
                      </span>
                    )}

                    <span className="text-[11px] text-slate-500 font-medium hidden lg:inline max-w-[100px] truncate">
                      {issue.assignedTo}
                    </span>

                    <button
                      onClick={() => onEditIssue(issue)}
                      className="p-1 text-slate-400 hover:text-orange-500 transition-colors"
                      title="Editar"
                    >
                      <Edit3 size={13} />
                    </button>

                    <button
                      onClick={() => onDeleteIssue(issue.id)}
                      className="p-1 text-slate-400 hover:text-rose-500 transition-colors"
                      title="Eliminar"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              ))
            )}

            {/* Inline Quick-Create Bar at the bottom of the Backlog */}
            <form onSubmit={handleQuickCreateSubmit} className={`p-3 sm:px-4 flex items-center space-x-3 ${
              darkMode ? 'bg-slate-950/40' : 'bg-slate-50/50'
            }`}>
              <span className="text-slate-400 text-xs font-mono font-bold">+</span>
              <select
                value={newType}
                onChange={(e) => setNewType(e.target.value as JiraIssueType)}
                className={`px-2.5 py-1.5 rounded-lg border text-xs font-bold focus:outline-none cursor-pointer ${
                  darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-300 text-slate-800'
                }`}
              >
                <option value="task">🔵 Tarea</option>
                <option value="lead">🟢 Lead</option>
                <option value="consulting">🟣 Consultoría</option>
                <option value="automation">🟠 Bot/IA</option>
                <option value="bug">🔴 Bug</option>
              </select>

              <input
                type="text"
                placeholder="Escribe una nueva incidencia para el backlog y presiona Enter..."
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className={`flex-1 px-3 py-1.5 rounded-lg border text-xs font-medium focus:outline-none focus:border-orange-500 ${
                  darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-300 text-slate-900'
                }`}
              />

              <button
                type="submit"
                disabled={isCreating || !newTitle.trim()}
                className="px-3.5 py-1.5 rounded-lg gradient-brand text-white font-bold text-xs shadow-xs hover:opacity-90 disabled:opacity-40 transition-all"
              >
                {isCreating ? 'Creando...' : 'Crear en Backlog'}
              </button>
            </form>

          </div>
        )}

      </div>

    </div>
  );
};
