import React, { useState, useMemo } from 'react';
import type { CrmCompany } from '../../services/crmService';
import { 
  PROSPECT_STATUSES, 
  POTENTIAL_SERVICES,
  generateWhatsAppLink,
  generateInstagramLink,
  exportCompaniesToCsv
} from '../../services/crmService';
import type { JiraIssue } from '../../services/jiraService';
import { 
  Building, 
  Search, 
  Plus, 
  Phone, 
  MessageSquare, 
  Users, 
  ExternalLink, 
  LayoutGrid, 
  Table as TableIcon,
  Trash2,
  X,
  Download,
  ArrowUp,
  ArrowDown,
  CheckCircle2,
  AlertTriangle,
  Eye,
  Calendar,
  CheckSquare,
  Clock,
  Sparkles,
  ChevronDown,
  Columns
} from 'lucide-react';
import { TEAM_MEMBERS } from '../../services/authService';

interface CrmDirectoryProps {
  companies: CrmCompany[];
  onSelectCompany: (company: CrmCompany) => void;
  onCreateCompany: (companyData: any) => Promise<CrmCompany | null | void>;
  onUpdateCompany?: (id: string, updates: Partial<CrmCompany>) => Promise<CrmCompany | null | void>;
  onDeleteCompany: (id: string) => Promise<void>;
  darkMode: boolean;
  issues?: JiraIssue[];
  onOpenIssue?: (issue: JiraIssue) => void;
  isAdmin?: boolean;
}

type SortField = 'id' | 'name' | 'industry' | 'city' | 'potentialService' | 'status' | 'assignedTo' | 'lastContactAt' | 'nextFollowupAt';
type SortDirection = 'asc' | 'desc';

export const CrmDirectory: React.FC<CrmDirectoryProps> = ({
  companies,
  onSelectCompany,
  onCreateCompany,
  onUpdateCompany,
  onDeleteCompany,
  darkMode,
  isAdmin = false
}) => {
  // Navigation & View Mode
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [repFilter, setRepFilter] = useState<string>('all');
  const [cityFilter, setCityFilter] = useState<string>('all');
  const [industryFilter, setIndustryFilter] = useState<string>('all');
  const [serviceFilter, setServiceFilter] = useState<string>('all');
  const [followupFilter, setFollowupFilter] = useState<string>('all');

  // Sorting
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  // Selection
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  // Visible Columns
  const [showColumnMenu, setShowColumnMenu] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState<Record<string, boolean>>({
    id: false,
    name: true,
    industry: true,
    city: true,
    contact: true,
    instagram: true,
    website: true,
    service: true,
    status: true,
    assignedTo: true,
    lastContact: true,
    nextAction: true,
    nextFollowup: true,
    actions: true
  });

  // Modal State for New Prospect
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [createMode, setCreateMode] = useState<'basic' | 'full'>('basic');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [newName, setNewName] = useState('');
  const [newIndustry, setNewIndustry] = useState('Arquitectura & Diseño');
  const [newCity, setNewCity] = useState('Valencia');
  const [newPhone, setNewPhone] = useState('');
  const [newWhatsapp, setNewWhatsapp] = useState('');
  const [newService, setNewService] = useState<string>('Página web');
  const [newStatus, setNewStatus] = useState<string>('Nuevo');
  const [newAssignedTo, setNewAssignedTo] = useState<string>(TEAM_MEMBERS[0]);
  
  // Extended Form Fields
  const [newAddress, setNewAddress] = useState('');
  const [newInstagram, setNewInstagram] = useState('');
  const [newWebsite, setNewWebsite] = useState('');
  const [newContactName, setNewContactName] = useState('');
  const [newContactRole, setNewContactRole] = useState('Decisor');
  const [newEmail, setNewEmail] = useState('');
  const [newRating, setNewRating] = useState<string>('5.0');
  const [newReviews, setNewReviews] = useState<string>('0');
  const [newNextAction, setNewNextAction] = useState('');
  const [newNextDate, setNewNextDate] = useState('');
  const [newNotes, setNewNotes] = useState('');

  // Distinct Lists for Dynamic Filters
  const distinctCities = useMemo(() => {
    const set = new Set<string>();
    companies.forEach(c => { if (c.city) set.add(c.city.trim()); });
    return Array.from(set).sort();
  }, [companies]);

  const distinctIndustries = useMemo(() => {
    const set = new Set<string>();
    companies.forEach(c => { if (c.industry) set.add(c.industry.trim()); });
    return Array.from(set).sort();
  }, [companies]);

  // Filtering Logic
  const filteredCompanies = useMemo(() => {
    const now = new Date();
    const todayStr = now.toISOString().split('T')[0];

    return companies.filter(c => {
      // Omnibox search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const match = 
          c.name.toLowerCase().includes(q) ||
          (c.contactName && c.contactName.toLowerCase().includes(q)) ||
          (c.city && c.city.toLowerCase().includes(q)) ||
          (c.industry && c.industry.toLowerCase().includes(q)) ||
          (c.phone && c.phone.includes(q)) ||
          (c.whatsapp && c.whatsapp.includes(q)) ||
          (c.instagram && c.instagram.toLowerCase().includes(q)) ||
          (c.website && c.website.toLowerCase().includes(q)) ||
          (c.potentialService && c.potentialService.toLowerCase().includes(q));
        if (!match) return false;
      }

      // Status Filter
      if (statusFilter !== 'all' && c.status !== statusFilter) return false;

      // Advisor / Rep Filter
      if (repFilter !== 'all' && c.assignedTo !== repFilter) return false;

      // City Filter
      if (cityFilter !== 'all' && c.city !== cityFilter) return false;

      // Industry Filter
      if (industryFilter !== 'all' && c.industry !== industryFilter) return false;

      // Potential Service Filter
      if (serviceFilter !== 'all' && c.potentialService !== serviceFilter) return false;

      // Followup Date Filter
      if (followupFilter !== 'all') {
        if (followupFilter === 'sin_fecha') {
          if (c.nextFollowupAt) return false;
        } else if (followupFilter === 'vencidos') {
          if (!c.nextFollowupAt) return false;
          if (c.nextFollowupAt.split('T')[0] >= todayStr) return false;
        } else if (followupFilter === 'hoy') {
          if (!c.nextFollowupAt) return false;
          if (c.nextFollowupAt.split('T')[0] !== todayStr) return false;
        } else if (followupFilter === 'esta_semana') {
          if (!c.nextFollowupAt) return false;
          const target = new Date(c.nextFollowupAt);
          const diffDays = (target.getTime() - now.getTime()) / (1000 * 3600 * 24);
          if (diffDays < 0 || diffDays > 7) return false;
        }
      }

      return true;
    });
  }, [companies, searchQuery, statusFilter, repFilter, cityFilter, industryFilter, serviceFilter, followupFilter]);

  // Sorting Logic
  const sortedCompanies = useMemo(() => {
    return [...filteredCompanies].sort((a, b) => {
      let valA: any = a[sortField];
      let valB: any = b[sortField];

      if (valA === undefined || valA === null) valA = '';
      if (valB === undefined || valB === null) valB = '';

      if (typeof valA === 'string') valA = valA.toLowerCase();
      if (typeof valB === 'string') valB = valB.toLowerCase();

      if (valA < valB) return sortDirection === 'asc' ? -1 : 1;
      if (valA > valB) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredCompanies, sortField, sortDirection]);

  const handleToggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Selection Logic
  const isAllSelected = sortedCompanies.length > 0 && sortedCompanies.every(c => selectedIds.has(c.id));
  const isSomeSelected = selectedIds.size > 0 && !isAllSelected;

  const handleSelectAllToggle = () => {
    if (isAllSelected) {
      setSelectedIds(new Set());
    } else {
      const next = new Set<string>();
      sortedCompanies.forEach(c => next.add(c.id));
      setSelectedIds(next);
    }
  };

  const handleSelectRow = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // Export handlers
  const handleExportSelected = () => {
    const list = companies.filter(c => selectedIds.has(c.id));
    if (list.length === 0) return;
    exportCompaniesToCsv(list, `prospectos-seleccionados-${list.length}.csv`);
  };

  const handleExportFiltered = () => {
    exportCompaniesToCsv(sortedCompanies, `prospectos-filtrados-${sortedCompanies.length}.csv`);
  };

  // Inline Quick Updates
  const handleQuickUpdateStatus = async (id: string, newStatusVal: string, e: React.ChangeEvent<HTMLSelectElement>) => {
    e.stopPropagation();
    if (onUpdateCompany) {
      await onUpdateCompany(id, { status: newStatusVal });
    }
  };

  const handleQuickUpdateRep = async (id: string, newRepVal: string, e: React.ChangeEvent<HTMLSelectElement>) => {
    e.stopPropagation();
    if (onUpdateCompany) {
      await onUpdateCompany(id, { assignedTo: newRepVal });
    }
  };

  const handleQuickUpdateService = async (id: string, newServiceVal: string, e: React.ChangeEvent<HTMLSelectElement>) => {
    e.stopPropagation();
    if (onUpdateCompany) {
      await onUpdateCompany(id, { potentialService: newServiceVal });
    }
  };

  // Create Form Submit Handlers (3 modes: close, add-another, open-drawer)
  const resetForm = () => {
    setNewName('');
    setNewCity('Valencia');
    setNewPhone('');
    setNewWhatsapp('');
    setNewAddress('');
    setNewInstagram('');
    setNewWebsite('');
    setNewContactName('');
    setNewEmail('');
    setNewNextAction('');
    setNewNextDate('');
    setNewNotes('');
  };

  const handleSaveProspect = async (targetMode: 'close' | 'another' | 'open') => {
    if (!newName.trim()) {
      alert('Por favor indica el nombre del negocio o profesional');
      return;
    }
    if (!newPhone.trim() && !newWhatsapp.trim() && !newEmail.trim()) {
      alert('Ingresa al menos un medio de contacto (teléfono, WhatsApp o email)');
      return;
    }

    setIsSubmitting(true);
    const payload = {
      name: newName.trim(),
      industry: newIndustry,
      city: newCity.trim() || 'Valencia',
      phone: newPhone.trim(),
      whatsapp: newWhatsapp.trim() || newPhone.trim(),
      address: newAddress.trim() || undefined,
      instagram: newInstagram.trim() || undefined,
      website: newWebsite.trim() || undefined,
      contactName: newContactName.trim() || newName.trim(),
      contactRole: newContactRole.trim() || 'Decisor',
      email: newEmail.trim() || undefined,
      googleRating: Number(newRating) || 5.0,
      googleReviewsCount: Number(newReviews) || 0,
      potentialService: newService,
      status: newStatus,
      assignedTo: newAssignedTo,
      nextAction: newNextAction.trim() || undefined,
      nextFollowupAt: newNextDate ? new Date(newNextDate).toISOString() : undefined,
      notes: newNotes.trim() || undefined,
      estimatedValue: 0
    };

    const created = await onCreateCompany(payload);
    setIsSubmitting(false);

    if (targetMode === 'close') {
      setIsCreateModalOpen(false);
      resetForm();
    } else if (targetMode === 'another') {
      resetForm();
    } else if (targetMode === 'open') {
      setIsCreateModalOpen(false);
      resetForm();
      if (created && typeof created === 'object' && 'id' in created) {
        onSelectCompany(created as CrmCompany);
      }
    }
  };

  // Status Badge Helper
  const getStatusBadge = (status: string) => {
    const s = status.toLowerCase();
    if (s.includes('nuevo')) {
      return <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-500/10 text-slate-700 dark:text-slate-300 border border-slate-500/20">Nuevo</span>;
    }
    if (s.includes('a contactar')) {
      return <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20">A contactar</span>;
    }
    if (s.includes('contactado')) {
      return <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">Contactado</span>;
    }
    if (s.includes('respondi')) {
      return <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">Respondió</span>;
    }
    if (s.includes('reuni')) {
      return <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">Reunión</span>;
    }
    if (s.includes('propuesta')) {
      return <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">Propuesta</span>;
    }
    if (s.includes('negocia')) {
      return <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20">Negociación</span>;
    }
    if (s.includes('ganado') || s.includes('active') || s.includes('vip')) {
      return <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">Ganado</span>;
    }
    if (s.includes('perdido') || s.includes('descartado') || s.includes('churn')) {
      return <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">Perdido</span>;
    }
    return <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-500/10 text-slate-500 border border-slate-500/20">{status}</span>;
  };

  // KPIs
  const totalCount = companies.length;
  const contactedCount = companies.filter(c => c.status !== 'Nuevo' && c.status !== 'A contactar').length;
  const inPipelineCount = companies.filter(c => ['Respondió', 'Reunión', 'Propuesta', 'Negociación'].includes(c.status)).length;
  const wonCount = companies.filter(c => c.status === 'Ganado' || c.status === 'active_client' || c.status === 'vip').length;

  return (
    <div className="space-y-5">

      {/* KPI Overview Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        <div className={`p-3.5 rounded-2xl border flex items-center space-x-3 ${
          darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}>
          <div className="p-2.5 rounded-xl bg-orange-500/10 text-orange-600 font-bold">
            <Building size={18} />
          </div>
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block">Total Base</span>
            <h4 className="text-base font-black text-slate-900 dark:text-white">{totalCount} Prospectos</h4>
          </div>
        </div>

        <div className={`p-3.5 rounded-2xl border flex items-center space-x-3 ${
          darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}>
          <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-600 font-bold">
            <MessageSquare size={18} />
          </div>
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block">Contactados</span>
            <h4 className="text-base font-black text-blue-600 dark:text-blue-400">{contactedCount}</h4>
          </div>
        </div>

        <div className={`p-3.5 rounded-2xl border flex items-center space-x-3 ${
          darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}>
          <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-600 font-bold">
            <Sparkles size={18} />
          </div>
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block">En Conversación</span>
            <h4 className="text-base font-black text-amber-600 dark:text-amber-400">{inPipelineCount}</h4>
          </div>
        </div>

        <div className={`p-3.5 rounded-2xl border flex items-center space-x-3 ${
          darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}>
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-600 font-bold">
            <CheckCircle2 size={18} />
          </div>
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block">Cierres Ganados</span>
            <h4 className="text-base font-black text-emerald-600 dark:text-emerald-400">{wonCount}</h4>
          </div>
        </div>
      </div>

      {/* Control Header: Search, Filters & Action Buttons */}
      <div className={`p-4 rounded-2xl border space-y-3.5 ${
        darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
      }`}>
        
        {/* Top Control Bar: Omnibox, View Switcher & Actions */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          
          {/* Omnibox Search */}
          <div className="relative flex-1 max-w-xl">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={17} />
            <input
              type="text"
              placeholder="Buscar por negocio, contacto, teléfono, WhatsApp, Instagram o ciudad..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-10 pr-4 py-2 text-xs rounded-xl border focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all ${
                darkMode ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500' : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'
              }`}
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Action buttons & View Switcher */}
          <div className="flex items-center flex-wrap gap-2">
            
            {/* View Switcher Toggle */}
            <div className={`flex items-center p-1 rounded-xl border ${
              darkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-100 border-slate-200'
            }`}>
              <button
                onClick={() => setViewMode('table')}
                className={`p-1.5 rounded-lg text-xs font-bold flex items-center space-x-1.5 transition-all ${
                  viewMode === 'table'
                    ? 'bg-white dark:bg-slate-700 shadow-xs text-orange-600 dark:text-orange-400'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'
                }`}
                title="Vista Tabla Dinámica"
              >
                <TableIcon size={15} />
                <span className="hidden sm:inline">Tabla</span>
              </button>
              <button
                onClick={() => setViewMode('cards')}
                className={`p-1.5 rounded-lg text-xs font-bold flex items-center space-x-1.5 transition-all ${
                  viewMode === 'cards'
                    ? 'bg-white dark:bg-slate-700 shadow-xs text-orange-600 dark:text-orange-400'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'
                }`}
                title="Vista Tarjetas Resumidas"
              >
                <LayoutGrid size={15} />
                <span className="hidden sm:inline">Tarjetas</span>
              </button>
            </div>

            {/* Column Visibility Selector (only table mode) */}
            {viewMode === 'table' && (
              <div className="relative">
                <button
                  onClick={() => setShowColumnMenu(!showColumnMenu)}
                  className={`px-3 py-2 text-xs font-bold rounded-xl border flex items-center space-x-1.5 transition-all ${
                    darkMode ? 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700' : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <Columns size={14} />
                  <span>Columnas</span>
                  <ChevronDown size={13} />
                </button>

                {showColumnMenu && (
                  <div className={`absolute right-0 mt-2 w-56 p-3 rounded-2xl border shadow-xl z-30 space-y-2 ${
                    darkMode ? 'bg-slate-900 border-slate-800 text-slate-200' : 'bg-white border-slate-200 text-slate-800'
                  }`}>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Columnas Visibles</span>
                    <div className="space-y-1.5 max-h-60 overflow-y-auto pr-1 text-xs">
                      {Object.keys(visibleColumns).map(key => (
                        <label key={key} className="flex items-center space-x-2 cursor-pointer hover:bg-slate-500/10 p-1 rounded-md">
                          <input
                            type="checkbox"
                            checked={visibleColumns[key]}
                            onChange={(e) => setVisibleColumns(prev => ({ ...prev, [key]: e.target.checked }))}
                            className="rounded text-orange-600 focus:ring-orange-500"
                          />
                          <span className="capitalize">{key === 'name' ? 'Negocio' : key === 'industry' ? 'Rubro' : key === 'assignedTo' ? 'Responsable' : key === 'service' ? 'Servicio' : key === 'lastContact' ? 'Último Contacto' : key === 'nextFollowup' ? 'Fecha Seguimiento' : key}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Export Dropdown */}
            <div className="flex items-center space-x-1">
              <button
                onClick={handleExportFiltered}
                className={`px-3 py-2 text-xs font-bold rounded-xl border flex items-center space-x-1.5 transition-all cursor-pointer ${
                  darkMode ? 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700' : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
                title="Exportar todos los prospectos filtrados a CSV"
              >
                <Download size={14} />
                <span>Exportar ({sortedCompanies.length})</span>
              </button>

              {selectedIds.size > 0 && (
                <button
                  onClick={handleExportSelected}
                  className="px-3 py-2 text-xs font-bold rounded-xl gradient-brand text-white shadow-xs flex items-center space-x-1.5 cursor-pointer animate-pulse"
                >
                  <Download size={14} />
                  <span>Exportar Selección ({selectedIds.size})</span>
                </button>
              )}
            </div>

            {/* Nuevo Prospecto CTA */}
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="px-3.5 py-2 text-xs font-bold rounded-xl gradient-brand text-white shadow-sm flex items-center space-x-1.5 hover:opacity-95 transition-all cursor-pointer"
            >
              <Plus size={15} />
              <span>Nuevo Prospecto</span>
            </button>
          </div>
        </div>

        {/* Filter Dropdowns Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 pt-2 border-t border-slate-100 dark:border-slate-800/80">
          
          {/* Estado */}
          <div>
            <label className="text-[10px] font-bold text-slate-400 block mb-1">Estado</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className={`w-full px-2.5 py-1.5 text-xs rounded-lg border focus:outline-none ${
                darkMode ? 'bg-slate-800 border-slate-700 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'
              }`}
            >
              <option value="all">Todos los estados</option>
              {PROSPECT_STATUSES.map(st => (
                <option key={st} value={st}>{st}</option>
              ))}
            </select>
          </div>

          {/* Vendedor */}
          <div>
            <label className="text-[10px] font-bold text-slate-400 block mb-1">Responsable</label>
            <select
              value={repFilter}
              onChange={(e) => setRepFilter(e.target.value)}
              className={`w-full px-2.5 py-1.5 text-xs rounded-lg border focus:outline-none ${
                darkMode ? 'bg-slate-800 border-slate-700 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'
              }`}
            >
              <option value="all">Todos los asesores</option>
              {TEAM_MEMBERS.map(rep => (
                <option key={rep} value={rep}>{rep}</option>
              ))}
            </select>
          </div>

          {/* Ciudad */}
          <div>
            <label className="text-[10px] font-bold text-slate-400 block mb-1">Ciudad</label>
            <select
              value={cityFilter}
              onChange={(e) => setCityFilter(e.target.value)}
              className={`w-full px-2.5 py-1.5 text-xs rounded-lg border focus:outline-none ${
                darkMode ? 'bg-slate-800 border-slate-700 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'
              }`}
            >
              <option value="all">Todas las ciudades</option>
              {distinctCities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>

          {/* Rubro */}
          <div>
            <label className="text-[10px] font-bold text-slate-400 block mb-1">Rubro</label>
            <select
              value={industryFilter}
              onChange={(e) => setIndustryFilter(e.target.value)}
              className={`w-full px-2.5 py-1.5 text-xs rounded-lg border focus:outline-none ${
                darkMode ? 'bg-slate-800 border-slate-700 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'
              }`}
            >
              <option value="all">Todos los rubros</option>
              {distinctIndustries.map(ind => (
                <option key={ind} value={ind}>{ind}</option>
              ))}
            </select>
          </div>

          {/* Servicio Potencial */}
          <div>
            <label className="text-[10px] font-bold text-slate-400 block mb-1">Servicio Potencial</label>
            <select
              value={serviceFilter}
              onChange={(e) => setServiceFilter(e.target.value)}
              className={`w-full px-2.5 py-1.5 text-xs rounded-lg border focus:outline-none ${
                darkMode ? 'bg-slate-800 border-slate-700 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'
              }`}
            >
              <option value="all">Todos los servicios</option>
              {POTENTIAL_SERVICES.map(srv => (
                <option key={srv} value={srv}>{srv}</option>
              ))}
            </select>
          </div>

          {/* Seguimiento */}
          <div>
            <label className="text-[10px] font-bold text-slate-400 block mb-1">Próx. Seguimiento</label>
            <select
              value={followupFilter}
              onChange={(e) => setFollowupFilter(e.target.value)}
              className={`w-full px-2.5 py-1.5 text-xs rounded-lg border focus:outline-none ${
                darkMode ? 'bg-slate-800 border-slate-700 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'
              }`}
            >
              <option value="all">Todos</option>
              <option value="hoy">Para hoy</option>
              <option value="esta_semana">Esta semana</option>
              <option value="vencidos">Atrasados / Vencidos</option>
              <option value="sin_fecha">Sin programar</option>
            </select>
          </div>

        </div>

      </div>

      {/* Bulk Selection Notification Bar */}
      {selectedIds.size > 0 && (
        <div className="p-3 rounded-xl bg-orange-500/10 border border-orange-500/20 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center space-x-2 text-orange-700 dark:text-orange-400 font-bold">
            <CheckSquare size={16} />
            <span>{selectedIds.size} prospecto(s) seleccionado(s) de {sortedCompanies.length} filtrados</span>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setSelectedIds(new Set())}
              className="px-2.5 py-1 rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            >
              Desmarcar todos
            </button>
            <button
              onClick={handleExportSelected}
              className="px-3 py-1 rounded-lg gradient-brand text-white font-bold flex items-center space-x-1"
            >
              <Download size={13} />
              <span>Exportar Selección (CSV)</span>
            </button>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* VISTA 1: TABLA DINÁMICA DE PROSPECTOS */}
      {/* ------------------------------------------------------------- */}
      {viewMode === 'table' && (
        <div className={`rounded-2xl border overflow-hidden ${
          darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className={`border-b text-[11px] font-bold text-slate-400 uppercase tracking-wider ${
                  darkMode ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
                }`}>
                  
                  {/* Select All Checkbox */}
                  <th className="py-3 px-3 w-10 text-center">
                    <input
                      type="checkbox"
                      checked={isAllSelected}
                      ref={input => { if (input) input.indeterminate = isSomeSelected; }}
                      onChange={handleSelectAllToggle}
                      className="rounded text-orange-600 focus:ring-orange-500 cursor-pointer"
                    />
                  </th>

                  {/* ID */}
                  {visibleColumns.id && (
                    <th 
                      onClick={() => handleToggleSort('id')}
                      className="py-3 px-3 cursor-pointer hover:text-slate-900 dark:hover:text-white transition-colors"
                    >
                      <div className="flex items-center space-x-1">
                        <span>ID</span>
                        {sortField === 'id' && (sortDirection === 'asc' ? <ArrowUp size={12} /> : <ArrowDown size={12} />)}
                      </div>
                    </th>
                  )}

                  {/* Negocio / Profesional */}
                  {visibleColumns.name && (
                    <th 
                      onClick={() => handleToggleSort('name')}
                      className="py-3 px-3 cursor-pointer hover:text-slate-900 dark:hover:text-white transition-colors min-w-[200px]"
                    >
                      <div className="flex items-center space-x-1">
                        <span>Negocio / Profesional</span>
                        {sortField === 'name' && (sortDirection === 'asc' ? <ArrowUp size={12} /> : <ArrowDown size={12} />)}
                      </div>
                    </th>
                  )}

                  {/* Rubro */}
                  {visibleColumns.industry && (
                    <th 
                      onClick={() => handleToggleSort('industry')}
                      className="py-3 px-3 cursor-pointer hover:text-slate-900 dark:hover:text-white transition-colors"
                    >
                      <div className="flex items-center space-x-1">
                        <span>Rubro</span>
                        {sortField === 'industry' && (sortDirection === 'asc' ? <ArrowUp size={12} /> : <ArrowDown size={12} />)}
                      </div>
                    </th>
                  )}

                  {/* Ciudad */}
                  {visibleColumns.city && (
                    <th 
                      onClick={() => handleToggleSort('city')}
                      className="py-3 px-3 cursor-pointer hover:text-slate-900 dark:hover:text-white transition-colors"
                    >
                      <div className="flex items-center space-x-1">
                        <span>Ciudad</span>
                        {sortField === 'city' && (sortDirection === 'asc' ? <ArrowUp size={12} /> : <ArrowDown size={12} />)}
                      </div>
                    </th>
                  )}

                  {/* Contacto / WhatsApp */}
                  {visibleColumns.contact && (
                    <th className="py-3 px-3 min-w-[140px]">
                      <span>Contacto / WA</span>
                    </th>
                  )}

                  {/* Instagram */}
                  {visibleColumns.instagram && (
                    <th className="py-3 px-3">
                      <span>Instagram</span>
                    </th>
                  )}

                  {/* Web */}
                  {visibleColumns.website && (
                    <th className="py-3 px-3">
                      <span>Sitio Web</span>
                    </th>
                  )}

                  {/* Servicio Potencial */}
                  {visibleColumns.service && (
                    <th 
                      onClick={() => handleToggleSort('potentialService')}
                      className="py-3 px-3 cursor-pointer hover:text-slate-900 dark:hover:text-white transition-colors min-w-[150px]"
                    >
                      <div className="flex items-center space-x-1">
                        <span>Servicio</span>
                        {sortField === 'potentialService' && (sortDirection === 'asc' ? <ArrowUp size={12} /> : <ArrowDown size={12} />)}
                      </div>
                    </th>
                  )}

                  {/* Estado (Inline Fast Edit) */}
                  {visibleColumns.status && (
                    <th 
                      onClick={() => handleToggleSort('status')}
                      className="py-3 px-3 cursor-pointer hover:text-slate-900 dark:hover:text-white transition-colors min-w-[130px]"
                    >
                      <div className="flex items-center space-x-1">
                        <span>Estado</span>
                        {sortField === 'status' && (sortDirection === 'asc' ? <ArrowUp size={12} /> : <ArrowDown size={12} />)}
                      </div>
                    </th>
                  )}

                  {/* Responsable */}
                  {visibleColumns.assignedTo && (
                    <th 
                      onClick={() => handleToggleSort('assignedTo')}
                      className="py-3 px-3 cursor-pointer hover:text-slate-900 dark:hover:text-white transition-colors min-w-[140px]"
                    >
                      <div className="flex items-center space-x-1">
                        <span>Responsable</span>
                        {sortField === 'assignedTo' && (sortDirection === 'asc' ? <ArrowUp size={12} /> : <ArrowDown size={12} />)}
                      </div>
                    </th>
                  )}

                  {/* Último Contacto */}
                  {visibleColumns.lastContact && (
                    <th 
                      onClick={() => handleToggleSort('lastContactAt')}
                      className="py-3 px-3 cursor-pointer hover:text-slate-900 dark:hover:text-white transition-colors"
                    >
                      <div className="flex items-center space-x-1">
                        <span>Último</span>
                        {sortField === 'lastContactAt' && (sortDirection === 'asc' ? <ArrowUp size={12} /> : <ArrowDown size={12} />)}
                      </div>
                    </th>
                  )}

                  {/* Próximo Paso */}
                  {visibleColumns.nextAction && (
                    <th className="py-3 px-3 min-w-[150px]">
                      <span>Próximo Paso</span>
                    </th>
                  )}

                  {/* Fecha de Seguimiento */}
                  {visibleColumns.nextFollowup && (
                    <th 
                      onClick={() => handleToggleSort('nextFollowupAt')}
                      className="py-3 px-3 cursor-pointer hover:text-slate-900 dark:hover:text-white transition-colors"
                    >
                      <div className="flex items-center space-x-1">
                        <span>Seguimiento</span>
                        {sortField === 'nextFollowupAt' && (sortDirection === 'asc' ? <ArrowUp size={12} /> : <ArrowDown size={12} />)}
                      </div>
                    </th>
                  )}

                  {/* Acciones */}
                  {visibleColumns.actions && (
                    <th className="py-3 px-3 text-right">
                      <span>Acciones</span>
                    </th>
                  )}

                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {sortedCompanies.length === 0 ? (
                  <tr>
                    <td colSpan={15} className="py-12 text-center text-slate-400">
                      No se encontraron prospectos que coincidan con la búsqueda o filtros aplicados.
                    </td>
                  </tr>
                ) : (
                  sortedCompanies.map((c) => {
                    const isSelected = selectedIds.has(c.id);
                    const waNumber = c.whatsapp || c.phone;
                    const waLink = waNumber ? generateWhatsAppLink(waNumber, c.contactName || c.name, c.name) : null;
                    const instaLink = c.instagram ? generateInstagramLink(c.instagram) : null;
                    const isOverdue = c.nextFollowupAt && new Date(c.nextFollowupAt) < new Date();

                    return (
                      <tr 
                        key={c.id}
                        onClick={() => onSelectCompany(c)}
                        className={`group hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors ${
                          isSelected ? 'bg-orange-50/50 dark:bg-orange-950/20' : ''
                        }`}
                      >
                        {/* Checkbox */}
                        <td className="py-2.5 px-3 text-center" onClick={(e) => handleSelectRow(c.id, e)}>
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => {}}
                            className="rounded text-orange-600 focus:ring-orange-500 cursor-pointer"
                          />
                        </td>

                        {/* ID */}
                        {visibleColumns.id && (
                          <td className="py-2.5 px-3 font-mono text-[10px] text-slate-400">
                            {c.id}
                          </td>
                        )}

                        {/* Negocio / Profesional */}
                        {visibleColumns.name && (
                          <td className="py-2.5 px-3">
                            <div className="flex flex-col">
                              <div className="flex items-center space-x-1.5">
                                <span className="font-bold text-slate-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                                  {c.name}
                                </span>
                                {c.isDuplicatePossible ? (
                                  <span title="Posible duplicado detectado" className="text-amber-500">
                                    <AlertTriangle size={13} />
                                  </span>
                                ) : null}
                              </div>
                              {c.contactName && c.contactName !== c.name && (
                                <span className="text-[11px] text-slate-400">
                                  {c.contactName} {c.contactRole ? `(${c.contactRole})` : ''}
                                </span>
                              )}
                            </div>
                          </td>
                        )}

                        {/* Rubro */}
                        {visibleColumns.industry && (
                          <td className="py-2.5 px-3">
                            <span className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                              {c.industry}
                            </span>
                          </td>
                        )}

                        {/* Ciudad */}
                        {visibleColumns.city && (
                          <td className="py-2.5 px-3 text-slate-600 dark:text-slate-300">
                            {c.city || 'Valencia'}
                          </td>
                        )}

                        {/* Contacto / WA */}
                        {visibleColumns.contact && (
                          <td className="py-2.5 px-3" onClick={(e) => e.stopPropagation()}>
                            <div className="flex items-center space-x-1.5">
                              {waLink ? (
                                <a
                                  href={waLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500 hover:text-white transition-all"
                                  title={`Enviar WhatsApp a ${waNumber}`}
                                >
                                  <Phone size={13} />
                                </a>
                              ) : null}
                              <span className="font-mono text-[11px] text-slate-600 dark:text-slate-300">
                                {c.whatsapp || c.phone || '—'}
                              </span>
                            </div>
                          </td>
                        )}

                        {/* Instagram */}
                        {visibleColumns.instagram && (
                          <td className="py-2.5 px-3" onClick={(e) => e.stopPropagation()}>
                            {instaLink ? (
                              <a
                                href={instaLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[11px] text-purple-600 dark:text-purple-400 hover:underline flex items-center space-x-1"
                              >
                                <span>{c.instagram}</span>
                                <ExternalLink size={10} />
                              </a>
                            ) : (
                              <span className="text-slate-300 dark:text-slate-600">—</span>
                            )}
                          </td>
                        )}

                        {/* Web */}
                        {visibleColumns.website && (
                          <td className="py-2.5 px-3" onClick={(e) => e.stopPropagation()}>
                            {c.website ? (
                              <a
                                href={c.website.startsWith('http') ? c.website : `https://${c.website}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[11px] text-blue-600 dark:text-blue-400 hover:underline flex items-center space-x-1"
                              >
                                <span className="truncate max-w-[120px]">{c.website.replace(/^https?:\/\//, '')}</span>
                                <ExternalLink size={10} />
                              </a>
                            ) : (
                              <span className="text-slate-300 dark:text-slate-600">—</span>
                            )}
                          </td>
                        )}

                        {/* Servicio Potencial */}
                        {visibleColumns.service && (
                          <td className="py-2.5 px-3" onClick={(e) => e.stopPropagation()}>
                            <select
                              value={c.potentialService || 'Página web'}
                              onChange={(e) => handleQuickUpdateService(c.id, e.target.value, e)}
                              className={`text-[11px] font-medium px-2 py-1 rounded-lg border focus:outline-none cursor-pointer ${
                                darkMode ? 'bg-slate-800 border-slate-700 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'
                              }`}
                            >
                              {POTENTIAL_SERVICES.map(srv => (
                                <option key={srv} value={srv}>{srv}</option>
                              ))}
                            </select>
                          </td>
                        )}

                        {/* Estado (Inline Fast Edit) */}
                        {visibleColumns.status && (
                          <td className="py-2.5 px-3" onClick={(e) => e.stopPropagation()}>
                            <select
                              value={c.status}
                              onChange={(e) => handleQuickUpdateStatus(c.id, e.target.value, e)}
                              className={`text-[11px] font-bold px-2 py-1 rounded-lg border focus:outline-none cursor-pointer ${
                                darkMode ? 'bg-slate-800 border-slate-700 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'
                              }`}
                            >
                              {PROSPECT_STATUSES.map(st => (
                                <option key={st} value={st}>{st}</option>
                              ))}
                            </select>
                          </td>
                        )}

                        {/* Responsable */}
                        {visibleColumns.assignedTo && (
                          <td className="py-2.5 px-3" onClick={(e) => e.stopPropagation()}>
                            <select
                              value={c.assignedTo}
                              onChange={(e) => handleQuickUpdateRep(c.id, e.target.value, e)}
                              className={`text-[11px] px-2 py-1 rounded-lg border focus:outline-none cursor-pointer ${
                                darkMode ? 'bg-slate-800 border-slate-700 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
                              }`}
                            >
                              {TEAM_MEMBERS.map(rep => (
                                <option key={rep} value={rep}>{rep}</option>
                              ))}
                            </select>
                          </td>
                        )}

                        {/* Último Contacto */}
                        {visibleColumns.lastContact && (
                          <td className="py-2.5 px-3 text-[11px] text-slate-400 whitespace-nowrap">
                            {c.lastContactAt ? new Date(c.lastContactAt).toLocaleDateString() : '—'}
                          </td>
                        )}

                        {/* Próximo Paso */}
                        {visibleColumns.nextAction && (
                          <td className="py-2.5 px-3 text-[11px] text-slate-600 dark:text-slate-300 truncate max-w-[160px]" title={c.nextAction || ''}>
                            {c.nextAction || '—'}
                          </td>
                        )}

                        {/* Fecha Seguimiento */}
                        {visibleColumns.nextFollowup && (
                          <td className="py-2.5 px-3 whitespace-nowrap">
                            {c.nextFollowupAt ? (
                              <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold flex items-center space-x-1 ${
                                isOverdue 
                                  ? 'bg-rose-500/10 text-rose-600 border border-rose-500/20' 
                                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                              }`}>
                                <Clock size={10} />
                                <span>{new Date(c.nextFollowupAt).toLocaleDateString()}</span>
                              </span>
                            ) : (
                              <span className="text-slate-300 dark:text-slate-600">—</span>
                            )}
                          </td>
                        )}

                        {/* Acciones */}
                        {visibleColumns.actions && (
                          <td className="py-2.5 px-3 text-right" onClick={(e) => e.stopPropagation()}>
                            <div className="flex items-center justify-end space-x-1">
                              <button
                                onClick={() => onSelectCompany(c)}
                                className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-all"
                                title="Abrir Ficha Detalle"
                              >
                                <Eye size={14} />
                              </button>
                              {isAdmin && (
                                <button
                                  onClick={() => onDeleteCompany(c.id)}
                                  className="p-1.5 rounded-lg hover:bg-rose-500/10 text-slate-400 hover:text-rose-600 transition-all"
                                  title="Eliminar Prospecto"
                                >
                                  <Trash2 size={14} />
                                </button>
                              )}
                            </div>
                          </td>
                        )}

                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* VISTA 2: TARJETAS COMPACTAS DE PROSPECTOS */}
      {/* ------------------------------------------------------------- */}
      {viewMode === 'cards' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sortedCompanies.length === 0 ? (
            <div className="col-span-full py-16 text-center text-slate-400">
              No se encontraron prospectos que coincidan con la búsqueda.
            </div>
          ) : (
            sortedCompanies.map((c) => {
              const waNumber = c.whatsapp || c.phone;
              const waLink = waNumber ? generateWhatsAppLink(waNumber, c.contactName || c.name, c.name) : null;
              const isOverdue = c.nextFollowupAt && new Date(c.nextFollowupAt) < new Date();

              return (
                <div
                  key={c.id}
                  onClick={() => onSelectCompany(c)}
                  className={`p-4 rounded-2xl border transition-all hover:shadow-md cursor-pointer flex flex-col justify-between space-y-3.5 ${
                    darkMode ? 'bg-slate-900/90 border-slate-800 hover:border-slate-700' : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {/* Card Header: Name, Duplicate badge & Status */}
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <div className="flex items-center space-x-1.5">
                        <h4 className="font-bold text-sm text-slate-900 dark:text-white line-clamp-1">
                          {c.name}
                        </h4>
                        {c.isDuplicatePossible ? (
                          <span title="Posible duplicado detectado" className="text-amber-500 shrink-0">
                            <AlertTriangle size={13} />
                          </span>
                        ) : null}
                      </div>
                      {getStatusBadge(c.status)}
                    </div>

                    <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 font-medium">
                        {c.industry}
                      </span>
                      <span>•</span>
                      <span>{c.city || 'Valencia'}</span>
                      {c.potentialService && (
                        <>
                          <span>•</span>
                          <span className="font-bold text-orange-600 dark:text-orange-400">
                            {c.potentialService}
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Contact preview */}
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 space-y-1.5 text-xs">
                    <div className="flex items-center justify-between text-slate-600 dark:text-slate-300">
                      <span className="font-mono text-[11px]">{c.whatsapp || c.phone || 'Sin teléfono'}</span>
                      {waLink && (
                        <a
                          href={waLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 font-bold hover:bg-emerald-500 hover:text-white transition-all text-[11px]"
                        >
                          WhatsApp
                        </a>
                      )}
                    </div>
                    {c.nextAction && (
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2">
                        <strong className="text-slate-700 dark:text-slate-200">Próximo:</strong> {c.nextAction}
                      </p>
                    )}
                  </div>

                  {/* Card Footer: Rep & Followup */}
                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px]">
                    <div className="flex items-center space-x-1.5 text-slate-500">
                      <Users size={12} />
                      <span className="font-medium text-slate-700 dark:text-slate-300">{c.assignedTo}</span>
                    </div>

                    {c.nextFollowupAt ? (
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold flex items-center space-x-1 ${
                        isOverdue 
                          ? 'bg-rose-500/10 text-rose-600 border border-rose-500/20' 
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                      }`}>
                        <Calendar size={10} />
                        <span>{new Date(c.nextFollowupAt).toLocaleDateString()}</span>
                      </span>
                    ) : (
                      <span className="text-slate-400 text-[10px]">Sin fecha</span>
                    )}
                  </div>

                </div>
              );
            })
          )}
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* MODAL: ALTA RÁPIDA DE NUEVO PROSPECTO */}
      {/* ------------------------------------------------------------- */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className={`w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl border shadow-2xl p-6 space-y-5 ${
            darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
          }`}>
            
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h3 className="text-base font-black">Nuevo Prospecto Comercial</h3>
                <p className="text-xs text-slate-400">Completa los datos esenciales para ingresar al pipeline comercial.</p>
              </div>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600"
              >
                <X size={18} />
              </button>
            </div>

            {/* SECCIÓN 1: DATOS OBLIGATORIOS / RÁPIDOS */}
            <div className="space-y-3.5">
              <span className="text-[11px] font-bold text-orange-600 uppercase tracking-wider block">
                1. Datos Esenciales de Contacto
              </span>

              {/* Nombre Negocio */}
              <div>
                <label className="text-xs font-bold block mb-1">Negocio / Profesional <span className="text-rose-500">*</span></label>
                <input
                  type="text"
                  placeholder="Ej: Clínica Dental Serrería, OSB Arquitectos..."
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className={`w-full px-3 py-2 text-xs rounded-xl border focus:outline-none focus:ring-2 focus:ring-orange-500/20 ${
                    darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200'
                  }`}
                  required
                />
              </div>

              {/* Rubro & Ciudad */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold block mb-1">Rubro</label>
                  <input
                    type="text"
                    placeholder="Ej: Odontología, Arquitectura, Turismo..."
                    value={newIndustry}
                    onChange={(e) => setNewIndustry(e.target.value)}
                    className={`w-full px-3 py-2 text-xs rounded-xl border focus:outline-none ${
                      darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200'
                    }`}
                  />
                </div>
                <div>
                  <label className="text-xs font-bold block mb-1">Ciudad</label>
                  <input
                    type="text"
                    placeholder="Ej: Valencia, Bariloche, CABA..."
                    value={newCity}
                    onChange={(e) => setNewCity(e.target.value)}
                    className={`w-full px-3 py-2 text-xs rounded-xl border focus:outline-none ${
                      darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200'
                    }`}
                  />
                </div>
              </div>

              {/* Teléfono / WhatsApp */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold block mb-1">Teléfono Principal <span className="text-rose-500">*</span></label>
                  <input
                    type="text"
                    placeholder="Ej: +34 963 20 40 85"
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                    className={`w-full px-3 py-2 text-xs rounded-xl border focus:outline-none ${
                      darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200'
                    }`}
                  />
                </div>
                <div>
                  <label className="text-xs font-bold block mb-1">WhatsApp Directo</label>
                  <input
                    type="text"
                    placeholder="Ej: +34 685 41 27 63"
                    value={newWhatsapp}
                    onChange={(e) => setNewWhatsapp(e.target.value)}
                    className={`w-full px-3 py-2 text-xs rounded-xl border focus:outline-none ${
                      darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200'
                    }`}
                  />
                </div>
              </div>

              {/* Servicio Potencial, Estado & Responsable */}
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-bold block mb-1">Servicio Potencial</label>
                  <select
                    value={newService}
                    onChange={(e) => setNewService(e.target.value)}
                    className={`w-full px-3 py-2 text-xs rounded-xl border focus:outline-none ${
                      darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    {POTENTIAL_SERVICES.map(srv => (
                      <option key={srv} value={srv}>{srv}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold block mb-1">Estado Inicial</label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                    className={`w-full px-3 py-2 text-xs rounded-xl border focus:outline-none ${
                      darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    {PROSPECT_STATUSES.map(st => (
                      <option key={st} value={st}>{st}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold block mb-1">Responsable</label>
                  <select
                    value={newAssignedTo}
                    onChange={(e) => setNewAssignedTo(e.target.value)}
                    className={`w-full px-3 py-2 text-xs rounded-xl border focus:outline-none ${
                      darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    {TEAM_MEMBERS.map(rep => (
                      <option key={rep} value={rep}>{rep}</option>
                    ))}
                  </select>
                </div>
              </div>

            </div>

            {/* SECCIÓN 2: DATOS ADICIONALES (TOGGLE) */}
            <div className="border-t border-slate-100 dark:border-slate-800 pt-3">
              <button
                type="button"
                onClick={() => setCreateMode(createMode === 'basic' ? 'full' : 'basic')}
                className="text-xs font-bold text-orange-600 hover:underline flex items-center space-x-1"
              >
                <span>{createMode === 'basic' ? '+ Añadir información adicional (dirección, web, Instagram, contacto...)' : '- Ocultar información adicional'}</span>
              </button>

              {createMode === 'full' && (
                <div className="mt-3 space-y-3 pt-2">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-bold block mb-1">Dirección Física</label>
                      <input
                        type="text"
                        placeholder="Ej: Carrer d'Escalante, 160"
                        value={newAddress}
                        onChange={(e) => setNewAddress(e.target.value)}
                        className={`w-full px-3 py-2 text-xs rounded-xl border focus:outline-none ${
                          darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200'
                        }`}
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold block mb-1">Instagram (@)</label>
                      <input
                        type="text"
                        placeholder="Ej: @clinicaserreria"
                        value={newInstagram}
                        onChange={(e) => setNewInstagram(e.target.value)}
                        className={`w-full px-3 py-2 text-xs rounded-xl border focus:outline-none ${
                          darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200'
                        }`}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-bold block mb-1">Sitio Web</label>
                      <input
                        type="text"
                        placeholder="Ej: https://clinica.com"
                        value={newWebsite}
                        onChange={(e) => setNewWebsite(e.target.value)}
                        className={`w-full px-3 py-2 text-xs rounded-xl border focus:outline-none ${
                          darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200'
                        }`}
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold block mb-1">Email</label>
                      <input
                        type="email"
                        placeholder="contacto@empresa.com"
                        value={newEmail}
                        onChange={(e) => setNewEmail(e.target.value)}
                        className={`w-full px-3 py-2 text-xs rounded-xl border focus:outline-none ${
                          darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200'
                        }`}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-bold block mb-1">Persona de Contacto</label>
                      <input
                        type="text"
                        placeholder="Ej: Dra. María Soler"
                        value={newContactName}
                        onChange={(e) => setNewContactName(e.target.value)}
                        className={`w-full px-3 py-2 text-xs rounded-xl border focus:outline-none ${
                          darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200'
                        }`}
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold block mb-1">Cargo</label>
                      <input
                        type="text"
                        placeholder="Ej: Directora Médica, Titular..."
                        value={newContactRole}
                        onChange={(e) => setNewContactRole(e.target.value)}
                        className={`w-full px-3 py-2 text-xs rounded-xl border focus:outline-none ${
                          darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200'
                        }`}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-bold block mb-1">Próximo Paso / Acción</label>
                      <input
                        type="text"
                        placeholder="Ej: Enviar propuesta WhatsApp..."
                        value={newNextAction}
                        onChange={(e) => setNewNextAction(e.target.value)}
                        className={`w-full px-3 py-2 text-xs rounded-xl border focus:outline-none ${
                          darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200'
                        }`}
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold block mb-1">Fecha de Seguimiento</label>
                      <input
                        type="date"
                        value={newNextDate}
                        onChange={(e) => setNewNextDate(e.target.value)}
                        className={`w-full px-3 py-2 text-xs rounded-xl border focus:outline-none ${
                          darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200'
                        }`}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-bold block mb-1">Rating Google (1.0 - 5.0)</label>
                      <input
                        type="number"
                        step="0.1"
                        min="1.0"
                        max="5.0"
                        value={newRating}
                        onChange={(e) => setNewRating(e.target.value)}
                        className={`w-full px-3 py-2 text-xs rounded-xl border focus:outline-none ${
                          darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200'
                        }`}
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold block mb-1">Cantidad de Reseñas Google</label>
                      <input
                        type="number"
                        min="0"
                        value={newReviews}
                        onChange={(e) => setNewReviews(e.target.value)}
                        className={`w-full px-3 py-2 text-xs rounded-xl border focus:outline-none ${
                          darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200'
                        }`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold block mb-1">Observaciones Iniciales</label>
                    <textarea
                      rows={2}
                      placeholder="Comentarios de contexto, notas de relevamiento..."
                      value={newNotes}
                      onChange={(e) => setNewNotes(e.target.value)}
                      className={`w-full px-3 py-2 text-xs rounded-xl border focus:outline-none ${
                        darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200'
                      }`}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* BOTONES DE ALTA (3 Modos solicitados) */}
            <div className="flex flex-col sm:flex-row items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setIsCreateModalOpen(false)}
                className="w-full sm:w-auto px-4 py-2 text-xs font-bold rounded-xl text-slate-500 hover:text-slate-800 dark:hover:text-white"
              >
                Cancelar
              </button>

              <button
                type="button"
                disabled={isSubmitting}
                onClick={() => handleSaveProspect('another')}
                className={`w-full sm:w-auto px-4 py-2 text-xs font-bold rounded-xl border transition-all ${
                  darkMode ? 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700' : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Guardar y agregar otro
              </button>

              <button
                type="button"
                disabled={isSubmitting}
                onClick={() => handleSaveProspect('open')}
                className={`w-full sm:w-auto px-4 py-2 text-xs font-bold rounded-xl border transition-all ${
                  darkMode ? 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700' : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Guardar y abrir ficha
              </button>

              <button
                type="button"
                disabled={isSubmitting}
                onClick={() => handleSaveProspect('close')}
                className="w-full sm:w-auto px-5 py-2 text-xs font-bold rounded-xl gradient-brand text-white shadow-xs hover:opacity-95 transition-all"
              >
                {isSubmitting ? 'Guardando...' : 'Guardar y cerrar'}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
