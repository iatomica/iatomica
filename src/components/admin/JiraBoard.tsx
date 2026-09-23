import React, { useState } from 'react';
import type { JiraIssue, JiraStatus, JiraIssueType, JiraPriority } from '../../services/jiraService';
import { 
  ArrowRight, 
  ArrowLeft, 
  Inbox, 
  Trash2, 
  Search, 
  Building, 
  Plus, 
  Edit3, 
  Flame
} from 'lucide-react';

import { TEAM_MEMBERS } from '../../services/authService';

interface JiraBoardProps {
  issues: JiraIssue[];
  onStatusChange: (id: string, newStatus: JiraStatus) => void;
  onDeleteIssue: (id: string) => void;
  onEditIssue: (issue: JiraIssue) => void;
  onCreateIssue: () => void;
  onOpenCompany: (companyId: string) => void;
  darkMode: boolean;
  currentUserName?: string;
  isAdmin?: boolean;
}

interface ColumnDef {
  status: JiraStatus;
  label: string;
  badgeClass: string;
  borderClass: string;
}

const BOARD_COLUMNS: ColumnDef[] = [
  { status: 'todo', label: 'Por Hacer', badgeClass: 'bg-slate-500/10 text-slate-500 border-slate-500/20', borderClass: 'border-t-slate-400' },
  { status: 'in_progress', label: 'En Progreso', badgeClass: 'bg-blue-500/10 text-blue-600 border-blue-500/20', borderClass: 'border-t-blue-500' },
  { status: 'review', label: 'Revisión / Demo', badgeClass: 'bg-purple-500/10 text-purple-600 border-purple-500/20', borderClass: 'border-t-purple-500' },
  { status: 'negotiation', label: 'Negociación', badgeClass: 'bg-amber-500/10 text-amber-600 border-amber-500/20', borderClass: 'border-t-amber-500' },
  { status: 'done', label: 'Completado', badgeClass: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20', borderClass: 'border-t-emerald-500' }
];

const STATUS_FLOW: JiraStatus[] = ['todo', 'in_progress', 'review', 'negotiation', 'done'];

export const JiraBoard: React.FC<JiraBoardProps> = ({
  issues,
  onStatusChange,
  onDeleteIssue,
  onEditIssue,
  onCreateIssue,
  onOpenCompany,
  darkMode,
  currentUserName,
  isAdmin = false
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [quickFilter, setQuickFilter] = useState<'all' | 'my' | 'leads' | 'high_priority'>('all');
  const [assigneeFilter, setAssigneeFilter] = useState('all');

  // Filter issues for active board (excluding backlog)
  const activeIssues = issues.filter(i => i.status !== 'backlog');

  const filteredIssues = activeIssues.filter(issue => {
    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matches = 
        issue.issueKey.toLowerCase().includes(q) ||
        issue.title.toLowerCase().includes(q) ||
        (issue.companyName && issue.companyName.toLowerCase().includes(q)) ||
        (issue.tags && issue.tags.some(t => t.toLowerCase().includes(q)));
      if (!matches) return false;
    }

    // Quick filters
    if (quickFilter === 'leads' && issue.type !== 'lead') return false;
    if (quickFilter === 'high_priority' && issue.priority !== 'highest' && issue.priority !== 'high') return false;
    if (quickFilter === 'my' && currentUserName && !issue.assignedTo.toLowerCase().includes(currentUserName.toLowerCase())) return false;

    // Assignee filter
    if (assigneeFilter !== 'all' && issue.assignedTo !== assigneeFilter) return false;

    return true;
  });

  const getPrevStatus = (current: JiraStatus): JiraStatus | null => {
    const idx = STATUS_FLOW.indexOf(current);
    return idx > 0 ? STATUS_FLOW[idx - 1] : null;
  };

  const getNextStatus = (current: JiraStatus): JiraStatus | null => {
    const idx = STATUS_FLOW.indexOf(current);
    return idx < STATUS_FLOW.length - 1 ? STATUS_FLOW[idx + 1] : null;
  };

  const getTypeBadge = (type: JiraIssueType) => {
    switch (type) {
      case 'lead':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">🟢 Lead</span>;
      case 'task':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-500/10 text-blue-600 border border-blue-500/20">🔵 Tarea</span>;
      case 'consulting':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-500/10 text-purple-600 border border-purple-500/20">🟣 Consultoría</span>;
      case 'automation':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-orange-500/10 text-orange-600 border border-orange-500/20">🟠 Automatización</span>;
      case 'bug':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500/10 text-rose-600 border border-rose-500/20">🔴 Incidente</span>;
    }
  };

  const getPriorityIcon = (priority: JiraPriority) => {
    switch (priority) {
      case 'highest':
        return <span title="Prioridad Muy Alta" className="text-rose-600 font-bold text-xs">⏫</span>;
      case 'high':
        return <span title="Prioridad Alta" className="text-orange-500 font-bold text-xs">🔼</span>;
      case 'medium':
        return <span title="Prioridad Media" className="text-blue-500 font-bold text-xs">🟰</span>;
      case 'low':
        return <span title="Prioridad Baja" className="text-slate-400 font-bold text-xs">🔽</span>;
    }
  };

  return (
    <div className="space-y-4">
      
      {/* Top Filter & Toolbar Bar */}
      <div className={`p-4 rounded-2xl border flex flex-col lg:flex-row items-center justify-between gap-4 ${
        darkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
      }`}>
        
        {/* Left: Search & Quick Filters */}
        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          
          {/* Search Box */}
          <div className="relative flex-1 sm:w-64">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar por IAT-X, título o empresa..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-9 pr-3 py-1.5 rounded-xl text-xs font-medium border focus:outline-none focus:border-orange-500 ${
                darkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
              }`}
            />
          </div>

          {/* Quick Filter Buttons */}
          <div className="flex items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-[11px] font-bold">
            <button
              onClick={() => setQuickFilter('all')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                quickFilter === 'all' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs' : 'text-slate-500'
              }`}
            >
              Todos ({activeIssues.length})
            </button>
            <button
              onClick={() => setQuickFilter('my')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                quickFilter === 'my' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs' : 'text-slate-500'
              }`}
            >
              Mis Tareas
            </button>
            <button
              onClick={() => setQuickFilter('leads')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                quickFilter === 'leads' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs' : 'text-slate-500'
              }`}
            >
              Solo Leads
            </button>
            <button
              onClick={() => setQuickFilter('high_priority')}
              className={`px-2.5 py-1 rounded-lg transition-all flex items-center space-x-1 ${
                quickFilter === 'high_priority' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs' : 'text-slate-500'
              }`}
            >
              <Flame size={12} className="text-rose-500" />
              <span>Alta Prioridad</span>
            </button>
          </div>

          {/* Assignee Filter */}
          <select
            value={assigneeFilter}
            onChange={(e) => setAssigneeFilter(e.target.value)}
            className={`px-3 py-1.5 rounded-xl border text-xs font-bold focus:outline-none cursor-pointer ${
              darkMode ? 'bg-slate-950 border-slate-800 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'
            }`}
          >
            <option value="all">Cualquier Responsable</option>
            {TEAM_MEMBERS.map(member => (
              <option key={member} value={member}>👤 {member}</option>
            ))}
            <option value="Sin Asignar">Sin Asignar</option>
          </select>

        </div>

        {/* Right: Metrics & Create Button */}
        <div className="flex items-center space-x-4 w-full lg:w-auto justify-between lg:justify-end">
          <div className="flex items-center space-x-2 text-xs font-mono">
            <span className="text-slate-500 font-bold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800">
              {filteredIssues.length} Incidencias en Flujo
            </span>
          </div>

          <button
            onClick={onCreateIssue}
            className="px-3.5 py-1.5 rounded-xl gradient-brand text-white font-bold text-xs shadow-md hover:opacity-90 flex items-center space-x-1.5 transition-all"
          >
            <Plus size={14} />
            <span>Crear Incidencia</span>
          </button>
        </div>

      </div>

      {/* Kanban Board Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3.5 overflow-x-auto pb-4">
        {BOARD_COLUMNS.map(col => {
          const colIssues = filteredIssues.filter(i => i.status === col.status);
          const colPoints = colIssues.reduce((acc, curr) => acc + (curr.storyPoints || 0), 0);

          return (
            <div
              key={col.status}
              className={`p-3 rounded-2xl border border-t-4 flex flex-col h-full min-h-[580px] ${col.borderClass} ${
                darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-slate-100/70 border-slate-200'
              }`}
            >
              
              {/* Column Header */}
              <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center space-x-2">
                  <span className="font-heading font-black text-xs text-slate-800 dark:text-slate-200">
                    {col.label}
                  </span>
                  <span className="font-mono text-[11px] font-bold px-1.5 py-0.5 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-500">
                    {colIssues.length}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-slate-400">
                  {colPoints} pts
                </span>
              </div>

              {/* Column Cards Container */}
              <div className="space-y-2.5 flex-1 overflow-y-auto pr-1">
                {colIssues.length === 0 ? (
                  <div className="py-12 text-center text-xs text-slate-400 font-mono italic">
                    Sin incidencias
                  </div>
                ) : (
                  colIssues.map(issue => {
                    const prev = getPrevStatus(issue.status);
                    const next = getNextStatus(issue.status);

                    return (
                      <div
                        key={issue.id}
                        className={`p-3.5 rounded-xl border transition-all text-left shadow-xs hover:shadow-md group relative ${
                          darkMode ? 'bg-slate-950 border-slate-800 text-white hover:border-slate-700' : 'bg-white border-slate-200 text-slate-900 hover:border-orange-300'
                        }`}
                      >
                        
                        {/* Card Header: Type Badge, Key & Priority */}
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-1.5">
                            {getTypeBadge(issue.type)}
                            <span className="font-mono text-[11px] font-bold text-slate-400">
                              {issue.issueKey}
                            </span>
                          </div>

                          <div className="flex items-center space-x-1">
                            {getPriorityIcon(issue.priority)}
                            <button
                              onClick={() => onEditIssue(issue)}
                              className="p-1 rounded text-slate-400 hover:text-orange-500 transition-colors opacity-0 group-hover:opacity-100"
                              title="Editar Incidencia"
                            >
                              <Edit3 size={12} />
                            </button>
                            {isAdmin && (
                              <button
                                onClick={() => onDeleteIssue(issue.id)}
                                className="p-1 rounded text-slate-400 hover:text-rose-500 transition-colors opacity-0 group-hover:opacity-100"
                                title="Eliminar Incidencia (Solo Admin)"
                              >
                                <Trash2 size={12} />
                              </button>
                            )}
                          </div>
                        </div>

                        {/* Issue Title */}
                        <h4 
                          onClick={() => onEditIssue(issue)}
                          className="font-bold text-xs leading-snug cursor-pointer group-hover:text-orange-500 transition-colors mb-2"
                        >
                          {issue.title}
                        </h4>

                        {/* Linked Company (Direct Connection to CRM) */}
                        {issue.companyName ? (
                          <div className="mb-2.5">
                            <button
                              onClick={() => issue.companyId && onOpenCompany(issue.companyId)}
                              className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-md bg-purple-500/10 text-purple-600 dark:text-purple-400 text-[10px] font-bold border border-purple-500/20 hover:bg-purple-500/20 transition-colors max-w-full truncate"
                              title="Ver ficha 360° en Directorio CRM"
                            >
                              <Building size={11} className="shrink-0" />
                              <span className="truncate">{issue.companyName}</span>
                            </button>
                          </div>
                        ) : null}

                        {/* Tags */}
                        {issue.tags && issue.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mb-2.5">
                            {issue.tags.slice(0, 2).map((t, idx) => (
                              <span key={idx} className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500">
                                #{t}
                              </span>
                            ))}
                            {issue.tags.length > 2 && (
                              <span className="text-[9px] font-mono px-1 py-0.5 text-slate-400">
                                +{issue.tags.length - 2}
                              </span>
                            )}
                          </div>
                        )}

                        {/* Assignee & Story Points & Value Footer */}
                        <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[10px]">
                          <div className="flex items-center space-x-1 text-slate-500 font-medium">
                            <div className="w-4 h-4 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center font-bold text-[8px] text-slate-700 dark:text-slate-200">
                              {issue.assignedTo.charAt(0)}
                            </div>
                            <span className="truncate max-w-[90px]">{issue.assignedTo}</span>
                          </div>

                          <div className="flex items-center space-x-1.5 font-mono">
                            <span className="px-1.5 py-0.5 rounded bg-purple-500/10 text-purple-600 font-bold">
                              {issue.storyPoints}p
                            </span>
                          </div>
                        </div>

                        {/* Transitions Bar: Move Prev, Next, or Send to Backlog */}
                        <div className="mt-2.5 pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                          <div className="flex items-center space-x-1">
                            {prev ? (
                              <button
                                onClick={() => onStatusChange(issue.id, prev)}
                                className="p-1 rounded bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors"
                                title="Mover a etapa anterior"
                              >
                                <ArrowLeft size={12} />
                              </button>
                            ) : null}

                            <button
                              onClick={() => onStatusChange(issue.id, 'backlog')}
                              className="px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-500 hover:text-slate-800 dark:hover:text-white transition-colors text-[9px] font-bold flex items-center space-x-1"
                              title="Despriorizar y enviar al Backlog"
                            >
                              <Inbox size={10} />
                              <span>Al Backlog</span>
                            </button>
                          </div>

                          {next && (
                            <button
                              onClick={() => onStatusChange(issue.id, next)}
                              className="px-2 py-1 rounded gradient-brand text-white font-bold text-[10px] flex items-center space-x-1 shadow-xs hover:opacity-90 transition-opacity"
                              title="Avanzar etapa"
                            >
                              <span>Avanzar</span>
                              <ArrowRight size={10} />
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
