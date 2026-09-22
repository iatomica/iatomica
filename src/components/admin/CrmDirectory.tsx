import React, { useState } from 'react';
import type { CrmCompany, CompanyStatus } from '../../services/crmService';
import { generateWhatsAppLink } from '../../services/crmService';
import { 
  Building, 
  Search, 
  Plus, 
  Phone, 
  Mail, 
  MessageSquare, 
  DollarSign, 
  Users, 
  TrendingUp, 
  ExternalLink, 
  LayoutGrid, 
  Table as TableIcon,
  Trash2,
  X
} from 'lucide-react';

interface CrmDirectoryProps {
  companies: CrmCompany[];
  onSelectCompany: (company: CrmCompany) => void;
  onCreateCompany: (companyData: any) => Promise<void>;
  onDeleteCompany: (id: string) => Promise<void>;
  darkMode: boolean;
}

export const CrmDirectory: React.FC<CrmDirectoryProps> = ({
  companies,
  onSelectCompany,
  onCreateCompany,
  onDeleteCompany,
  darkMode
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [repFilter, setRepFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // New Company Modal Form state
  const [newName, setNewName] = useState('');
  const [newLegalName, setNewLegalName] = useState('');
  const [newIndustry, setNewIndustry] = useState('Tecnología & Servicios');
  const [newContactName, setNewContactName] = useState('');
  const [newContactRole, setNewContactRole] = useState('Decisor Principal');
  const [newEmail, setNewEmail] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newWebsite, setNewWebsite] = useState('');
  const [newStatus, setNewStatus] = useState<CompanyStatus>('lead');
  const [newValue, setNewValue] = useState<number>(3000);
  const [newAssignedTo, setNewAssignedTo] = useState('Atención Público');
  const [newTech, setNewTech] = useState('');
  const [newNotes, setNewNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Filtered List
  const filteredCompanies = companies.filter(c => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match = 
        c.name.toLowerCase().includes(q) ||
        (c.legalName && c.legalName.toLowerCase().includes(q)) ||
        c.contactName.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        (c.phone && c.phone.includes(q)) ||
        c.industry.toLowerCase().includes(q);
      if (!match) return false;
    }

    if (statusFilter !== 'all' && c.status !== statusFilter) return false;
    if (repFilter !== 'all' && c.assignedTo !== repFilter) return false;

    return true;
  });

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newEmail.trim()) return;

    setIsSubmitting(true);
    await onCreateCompany({
      name: newName.trim(),
      legalName: newLegalName.trim() || undefined,
      industry: newIndustry,
      contactName: newContactName.trim() || newName.trim(),
      contactRole: newContactRole.trim() || undefined,
      email: newEmail.trim(),
      phone: newPhone.trim() || undefined,
      website: newWebsite.trim() || undefined,
      status: newStatus,
      estimatedValue: Number(newValue),
      assignedTo: newAssignedTo,
      techRequirements: newTech.trim() || undefined,
      notes: newNotes.trim() || undefined
    });

    setIsSubmitting(false);
    setIsCreateModalOpen(false);
    // Reset Form
    setNewName('');
    setNewLegalName('');
    setNewContactName('');
    setNewEmail('');
    setNewPhone('');
    setNewWebsite('');
    setNewTech('');
    setNewNotes('');
  };

  // KPIs
  const totalCompanies = companies.length;
  const activeClients = companies.filter(c => c.status === 'active_client' || c.status === 'vip').length;
  const inNegotiation = companies.filter(c => c.status === 'negotiation').length;
  const totalPipelineValue = companies.reduce((acc, curr) => acc + (curr.estimatedValue || 0), 0);

  const getStatusBadge = (status: CompanyStatus) => {
    switch (status) {
      case 'lead':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-500/10 text-slate-500 border border-slate-500/20">Prospecto</span>;
      case 'qualified':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/10 text-blue-600 border border-blue-500/20">Calificado</span>;
      case 'negotiation':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-600 border border-amber-500/20">Negociación</span>;
      case 'active_client':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">Cliente Activo</span>;
      case 'vip':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-500/10 text-purple-600 border border-purple-500/20">⭐ Cuenta VIP</span>;
      case 'churn':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/10 text-rose-600 border border-rose-500/20">Pausado</span>;
    }
  };

  return (
    <div className="space-y-6">
      
      {/* KPI Overview Bar */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className={`p-4 rounded-2xl border flex items-center space-x-3.5 ${
          darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}>
          <div className="p-3 rounded-xl bg-orange-500/10 text-orange-600 font-bold">
            <Building size={20} />
          </div>
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block">
              Total Cuentas B2B
            </span>
            <h4 className="text-base font-black text-slate-900 dark:text-white">
              {totalCompanies} Empresas
            </h4>
          </div>
        </div>

        <div className={`p-4 rounded-2xl border flex items-center space-x-3.5 ${
          darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}>
          <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-600 font-bold">
            <Users size={20} />
          </div>
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block">
              Clientes Activos &amp; VIP
            </span>
            <h4 className="text-base font-black text-emerald-600">
              {activeClients} Clientes
            </h4>
          </div>
        </div>

        <div className={`p-4 rounded-2xl border flex items-center space-x-3.5 ${
          darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}>
          <div className="p-3 rounded-xl bg-amber-500/10 text-amber-600 font-bold">
            <TrendingUp size={20} />
          </div>
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block">
              En Negociación
            </span>
            <h4 className="text-base font-black text-amber-600">
              {inNegotiation} Cuentas
            </h4>
          </div>
        </div>

        <div className={`p-4 rounded-2xl border flex items-center space-x-3.5 ${
          darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}>
          <div className="p-3 rounded-xl bg-purple-500/10 text-purple-600 font-bold">
            <DollarSign size={20} />
          </div>
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block">
              Pipeline Estimado
            </span>
            <h4 className="text-base font-black text-purple-600 font-mono">
              ${totalPipelineValue.toLocaleString()} USD
            </h4>
          </div>
        </div>
      </div>

      {/* Toolbar & Filters */}
      <div className={`p-4 rounded-2xl border flex flex-col md:flex-row items-center justify-between gap-4 ${
        darkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
      }`}>
        
        {/* Search & Selectors */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto flex-1">
          <div className="relative flex-1 sm:w-72">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar por empresa, contacto, teléfono, email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-9 pr-3 py-1.5 rounded-xl text-xs font-medium border focus:outline-none focus:border-orange-500 ${
                darkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
              }`}
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className={`px-3 py-1.5 rounded-xl border text-xs font-bold focus:outline-none cursor-pointer ${
              darkMode ? 'bg-slate-950 border-slate-800 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'
            }`}
          >
            <option value="all">Todos los Estados</option>
            <option value="lead">Prospecto</option>
            <option value="qualified">Calificado</option>
            <option value="negotiation">En Negociación</option>
            <option value="active_client">Cliente Activo</option>
            <option value="vip">Cuenta VIP</option>
            <option value="churn">Pausado</option>
          </select>

          <select
            value={repFilter}
            onChange={(e) => setRepFilter(e.target.value)}
            className={`px-3 py-1.5 rounded-xl border text-xs font-bold focus:outline-none cursor-pointer ${
              darkMode ? 'bg-slate-950 border-slate-800 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'
            }`}
          >
            <option value="all">Cualquier Vendedor</option>
            <option value="Atención Público">Atención Público (Sofía)</option>
            <option value="Consultoría Técnica">Consultoría Técnica (Lucas)</option>
            <option value="Ventas">Ventas (Mateo)</option>
          </select>
        </div>

        {/* View Switcher & Create Button */}
        <div className="flex items-center space-x-3 w-full md:w-auto justify-between md:justify-end">
          <div className="flex items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs">
            <button
              onClick={() => setViewMode('cards')}
              className={`p-1.5 rounded-lg transition-all ${
                viewMode === 'cards' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs' : 'text-slate-500'
              }`}
              title="Vista de Tarjetas B2B"
            >
              <LayoutGrid size={15} />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg transition-all ${
                viewMode === 'table' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs' : 'text-slate-500'
              }`}
              title="Vista de Tabla Densa"
            >
              <TableIcon size={15} />
            </button>
          </div>

          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="px-3.5 py-1.5 rounded-xl gradient-brand text-white font-bold text-xs shadow-md hover:opacity-90 flex items-center space-x-1.5 transition-all"
          >
            <Plus size={14} />
            <span>Nueva Cuenta B2B</span>
          </button>
        </div>

      </div>

      {/* Directory Content: Cards vs Table */}
      {viewMode === 'cards' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCompanies.length === 0 ? (
            <div className="col-span-full py-16 text-center text-xs text-slate-400 font-mono italic">
              No se encontraron empresas con los filtros aplicados.
            </div>
          ) : (
            filteredCompanies.map(c => {
              const waLink = c.phone ? generateWhatsAppLink(c.phone, c.contactName, c.name) : null;

              return (
                <div
                  key={c.id}
                  onClick={() => onSelectCompany(c)}
                  className={`p-5 rounded-2xl border transition-all text-left shadow-xs hover:shadow-lg cursor-pointer group flex flex-col justify-between space-y-4 ${
                    darkMode ? 'bg-slate-900/90 border-slate-800 text-white hover:border-purple-500/50' : 'bg-white border-slate-200 text-slate-900 hover:border-orange-400/50'
                  }`}
                >
                  {/* Top: Industry & Status */}
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-orange-500/10 text-orange-600 border border-orange-500/20 truncate max-w-[160px]">
                      {c.industry}
                    </span>
                    {getStatusBadge(c.status)}
                  </div>

                  {/* Company Name & Legal */}
                  <div>
                    <h4 className="font-heading font-black text-base leading-snug group-hover:text-orange-500 transition-colors">
                      {c.name}
                    </h4>
                    {c.legalName && (
                      <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                        {c.legalName}
                      </p>
                    )}
                  </div>

                  {/* Contact Person */}
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-100 dark:border-slate-800 space-y-1">
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span className="text-slate-800 dark:text-slate-200">{c.contactName}</span>
                      <span className="text-[10px] font-normal text-slate-400">{c.contactRole || 'Decisor'}</span>
                    </div>

                    <div className="text-[11px] font-mono text-slate-500 space-y-0.5">
                      <div className="flex items-center gap-1.5 truncate">
                        <Mail size={11} className="text-orange-500 shrink-0" />
                        <span className="truncate">{c.email}</span>
                      </div>
                      {c.phone && (
                        <div className="flex items-center gap-1.5">
                          <Phone size={11} className="text-purple-500 shrink-0" />
                          <span>{c.phone}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Metrics Footer: Value, Activities, Jira Tickets */}
                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px] font-mono">
                    <div className="text-emerald-600 dark:text-emerald-400 font-bold">
                      ${c.estimatedValue.toLocaleString()} USD
                    </div>

                    <div className="flex items-center space-x-2 text-slate-400 text-[10px]">
                      <span>{c.activitiesCount || 0} act</span>
                      <span>·</span>
                      <span className="text-purple-500 font-bold">{c.issuesCount || 0} tickets</span>
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="pt-2 flex items-center justify-between" onClick={e => e.stopPropagation()}>
                    {waLink ? (
                      <a
                        href={waLink}
                        target="_blank"
                        rel="noreferrer"
                        className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500 hover:text-white transition-all text-[11px] font-bold flex items-center space-x-1"
                      >
                        <MessageSquare size={12} />
                        <span>WhatsApp</span>
                      </a>
                    ) : <div />}

                    <button
                      onClick={() => onSelectCompany(c)}
                      className="px-3 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-[11px] font-bold flex items-center space-x-1 transition-colors"
                    >
                      <span>Ficha 360°</span>
                      <ExternalLink size={11} />
                    </button>
                  </div>

                </div>
              );
            })
          )}
        </div>
      ) : (
        /* Table View */
        <div className={`rounded-2xl border overflow-hidden ${
          darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className={`border-b uppercase font-mono text-[10px] tracking-wider ${
                darkMode ? 'bg-slate-950 border-slate-800 text-slate-400' : 'bg-slate-100 border-slate-200 text-slate-600'
              }`}>
                <tr>
                  <th className="p-3.5">Empresa / Cuenta</th>
                  <th className="p-3.5">Contacto Principal</th>
                  <th className="p-3.5">Rubro / Industria</th>
                  <th className="p-3.5">Estado CRM</th>
                  <th className="p-3.5">Valor Estimado</th>
                  <th className="p-3.5">Vendedor</th>
                  <th className="p-3.5">Historial / Jira</th>
                  <th className="p-3.5">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-sans">
                {filteredCompanies.map(c => {
                  const waLink = c.phone ? generateWhatsAppLink(c.phone, c.contactName, c.name) : null;

                  return (
                    <tr
                      key={c.id}
                      onClick={() => onSelectCompany(c)}
                      className="hover:bg-purple-500/5 transition-colors cursor-pointer"
                    >
                      <td className="p-3.5 font-bold">
                        <div>{c.name}</div>
                        {c.legalName && <div className="text-[11px] text-slate-400 font-normal">{c.legalName}</div>}
                      </td>
                      <td className="p-3.5">
                        <div className="font-bold">{c.contactName}</div>
                        <div className="text-[11px] text-slate-400 font-mono">{c.email}</div>
                      </td>
                      <td className="p-3.5">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                          {c.industry}
                        </span>
                      </td>
                      <td className="p-3.5">
                        {getStatusBadge(c.status)}
                      </td>
                      <td className="p-3.5 font-mono font-bold text-emerald-600 dark:text-emerald-400">
                        ${c.estimatedValue.toLocaleString()} USD
                      </td>
                      <td className="p-3.5 text-slate-500">
                        {c.assignedTo}
                      </td>
                      <td className="p-3.5 font-mono text-[11px] text-slate-400">
                        {c.activitiesCount || 0} act · <span className="text-purple-600 font-bold">{c.issuesCount || 0} tickets</span>
                      </td>
                      <td className="p-3.5" onClick={e => e.stopPropagation()}>
                        <div className="flex items-center space-x-2">
                          {waLink && (
                            <a
                              href={waLink}
                              target="_blank"
                              rel="noreferrer"
                              className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500 hover:text-white transition-colors"
                              title="WhatsApp"
                            >
                              <MessageSquare size={13} />
                            </a>
                          )}
                          <button
                            onClick={() => onSelectCompany(c)}
                            className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-200"
                            title="Ver Ficha 360°"
                          >
                            <ExternalLink size={13} />
                          </button>
                          <button
                            onClick={() => onDeleteCompany(c.id)}
                            className="p-1.5 rounded-lg bg-slate-100 hover:bg-rose-100 dark:bg-slate-800 dark:hover:bg-rose-900/40 text-slate-400 hover:text-rose-600 transition-colors"
                            title="Eliminar Cuenta"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal: New Company */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className={`w-full max-w-2xl rounded-3xl border shadow-2xl flex flex-col overflow-hidden transition-colors max-h-[90vh] ${
            darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
          }`}>
            <div className={`px-6 py-4 border-b flex items-center justify-between ${
              darkMode ? 'bg-slate-950/80 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}>
              <div className="flex items-center space-x-2">
                <div className="p-2 rounded-xl gradient-brand text-white shadow-sm">
                  <Building size={16} />
                </div>
                <div>
                  <h3 className="font-extrabold text-base leading-tight">
                    Registrar Nueva Cuenta / Empresa B2B
                  </h3>
                  <p className="text-xs text-slate-400 font-mono">
                    Base de Información para Administradores y Vendedores
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="p-6 overflow-y-auto space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 font-mono mb-1">Nombre Comercial de la Empresa *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej: Inversiones Patagónicas"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border text-xs font-medium bg-transparent focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-400 font-mono mb-1">Razón Social</label>
                  <input
                    type="text"
                    placeholder="Ej: InvPat S.A."
                    value={newLegalName}
                    onChange={(e) => setNewLegalName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border text-xs font-medium bg-transparent focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 font-mono mb-1">Rubro / Industria</label>
                  <select
                    value={newIndustry}
                    onChange={(e) => setNewIndustry(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border text-xs font-bold bg-transparent focus:outline-none cursor-pointer"
                  >
                    <option value="Turismo & Hospitalidad">Turismo &amp; Hospitalidad</option>
                    <option value="Salud & Clínicas">Salud &amp; Clínicas</option>
                    <option value="Retail & Alimentos">Retail &amp; Alimentos</option>
                    <option value="Software & B2B">Software &amp; B2B</option>
                    <option value="Logística & Comercio Exterior">Logística &amp; Comercio</option>
                    <option value="Tecnología & Servicios">Tecnología &amp; Servicios</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-400 font-mono mb-1">Estado Comercial</label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value as CompanyStatus)}
                    className="w-full px-3 py-2 rounded-xl border text-xs font-bold bg-transparent focus:outline-none cursor-pointer"
                  >
                    <option value="lead">Prospecto</option>
                    <option value="qualified">Calificado (SQL)</option>
                    <option value="negotiation">En Negociación</option>
                    <option value="active_client">Cliente Activo</option>
                    <option value="vip">Cuenta VIP</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-400 font-mono mb-1">Valor Estimado ($ USD)</label>
                  <input
                    type="number"
                    value={newValue}
                    onChange={(e) => setNewValue(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border text-xs font-bold bg-transparent focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 font-mono mb-1">Contacto Principal *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej: Lic. Hernán Rivas"
                    value={newContactName}
                    onChange={(e) => setNewContactName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border text-xs font-medium bg-transparent focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-400 font-mono mb-1">Cargo / Posición</label>
                  <input
                    type="text"
                    placeholder="Ej: Gerente de Operaciones"
                    value={newContactRole}
                    onChange={(e) => setNewContactRole(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border text-xs font-medium bg-transparent focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 font-mono mb-1">Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="contacto@empresa.com"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border text-xs font-medium bg-transparent focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-400 font-mono mb-1">Teléfono / WhatsApp</label>
                  <input
                    type="text"
                    placeholder="+5491122334455"
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border text-xs font-medium bg-transparent focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-400 font-mono mb-1">Vendedor Asignado</label>
                  <select
                    value={newAssignedTo}
                    onChange={(e) => setNewAssignedTo(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border text-xs font-bold bg-transparent focus:outline-none cursor-pointer"
                  >
                    <option value="Atención Público">Atención Público (Sofía)</option>
                    <option value="Consultoría Técnica">Consultoría Técnica (Lucas)</option>
                    <option value="Ventas">Ventas (Mateo)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-400 font-mono mb-1">Requerimientos Técnicos Diagnosticados</label>
                <textarea
                  rows={2}
                  placeholder="Detalla qué solución tecnológica o de IA requiere el cliente..."
                  value={newTech}
                  onChange={(e) => setNewTech(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border text-xs font-medium bg-transparent focus:outline-none focus:border-orange-500"
                />
              </div>

              <div className="flex items-center justify-end space-x-3 pt-3 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 font-bold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 rounded-xl gradient-brand text-white font-bold shadow-md hover:opacity-90 disabled:opacity-50"
                >
                  {isSubmitting ? 'Registrando...' : 'Registrar Empresa'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
