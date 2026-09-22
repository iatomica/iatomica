import React, { useState } from 'react';
import type { CrmCompany, CrmActivity, ActivityType, CompanyStatus } from '../../services/crmService';
import type { JiraIssue } from '../../services/jiraService';
import { generateWhatsAppLink } from '../../services/crmService';
import { 
  X, 
  Mail, 
  Phone, 
  Globe, 
  MessageSquare, 
  UserCheck, 
  Plus, 
  PhoneCall, 
  Users, 
  FileText, 
  Send, 
  Sparkles,
  ExternalLink
} from 'lucide-react';

interface CrmCompanyDrawerProps {
  company: CrmCompany | null;
  onClose: () => void;
  onUpdateCompany: (id: string, updates: Partial<CrmCompany>) => Promise<void>;
  onAddActivity: (companyId: string, activity: Omit<CrmActivity, 'id' | 'companyId' | 'createdAt'>) => Promise<void>;
  onCreateIssueForCompany: (companyId: string) => void;
  onOpenIssue?: (issue: JiraIssue) => void;
  darkMode: boolean;
  currentUserName: string;
}

export const CrmCompanyDrawer: React.FC<CrmCompanyDrawerProps> = ({
  company,
  onClose,
  onUpdateCompany,
  onAddActivity,
  onCreateIssueForCompany,
  onOpenIssue,
  darkMode,
  currentUserName
}) => {
  const [activeTab, setActiveTab] = useState<'info' | 'activities' | 'jira'>('info');

  // New Activity State
  const [actType, setActType] = useState<ActivityType>('call');
  const [actSummary, setActSummary] = useState('');
  const [actDetails, setActDetails] = useState('');
  const [actNextAction, setActNextAction] = useState('');
  const [actNextDate, setActNextDate] = useState('');
  const [isSubmittingAct, setIsSubmittingAct] = useState(false);

  // Edit Company State
  const [isEditingInfo, setIsEditingInfo] = useState(false);
  const [editName, setEditName] = useState('');
  const [editContact, setEditContact] = useState('');
  const [editRole, setEditRole] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [editValue, setEditValue] = useState(0);
  const [editTech, setEditTech] = useState('');
  const [editNotes, setEditNotes] = useState('');

  if (!company) return null;

  const handleStartEdit = () => {
    setEditName(company.name);
    setEditContact(company.contactName);
    setEditRole(company.contactRole || '');
    setEditEmail(company.email);
    setEditPhone(company.phone || '');
    setEditValue(company.estimatedValue || 0);
    setEditTech(company.techRequirements || '');
    setEditNotes(company.notes || '');
    setIsEditingInfo(true);
  };

  const handleSaveInfo = async (e: React.FormEvent) => {
    e.preventDefault();
    await onUpdateCompany(company.id, {
      name: editName,
      contactName: editContact,
      contactRole: editRole,
      email: editEmail,
      phone: editPhone,
      estimatedValue: Number(editValue),
      techRequirements: editTech,
      notes: editNotes
    });
    setIsEditingInfo(false);
  };

  const handleAddActivitySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!actSummary.trim()) return;

    setIsSubmittingAct(true);
    await onAddActivity(company.id, {
      type: actType,
      summary: actSummary.trim(),
      details: actDetails.trim() || undefined,
      author: currentUserName,
      nextAction: actNextAction.trim() || undefined,
      nextActionDate: actNextDate ? new Date(actNextDate).toISOString() : undefined
    });

    setActSummary('');
    setActDetails('');
    setActNextAction('');
    setActNextDate('');
    setIsSubmittingAct(false);
  };

  const waLink = company.phone 
    ? generateWhatsAppLink(company.phone, company.contactName, company.name)
    : null;

  const getStatusBadge = (status: CompanyStatus) => {
    switch (status) {
      case 'lead':
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-slate-500/10 text-slate-500 border border-slate-500/20">Prospecto</span>;
      case 'qualified':
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-500/10 text-blue-600 border border-blue-500/20">Calificado (SQL)</span>;
      case 'negotiation':
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-600 border border-amber-500/20">En Negociación</span>;
      case 'active_client':
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">Cliente Activo</span>;
      case 'vip':
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-purple-500/10 text-purple-600 border border-purple-500/20">⭐ Cuenta VIP</span>;
      case 'churn':
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-rose-500/10 text-rose-600 border border-rose-500/20">Pausado / Churn</span>;
    }
  };

  const getActivityIcon = (type: ActivityType) => {
    switch (type) {
      case 'call': return <PhoneCall size={14} className="text-blue-500" />;
      case 'meeting': return <Users size={14} className="text-purple-500" />;
      case 'whatsapp': return <MessageSquare size={14} className="text-emerald-500" />;
      case 'email': return <Mail size={14} className="text-orange-500" />;
      case 'note': return <FileText size={14} className="text-slate-500" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs animate-fade-in">
      <div className={`w-full max-w-2xl h-full border-l shadow-2xl flex flex-col justify-between overflow-hidden transition-colors ${
        darkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
      }`}>
        
        {/* Header */}
        <div className={`p-6 border-b space-y-4 ${
          darkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-slate-50 border-slate-200'
        }`}>
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-orange-500/10 text-orange-600 border border-orange-500/20">
                  {company.industry}
                </span>
                {getStatusBadge(company.status)}
              </div>
              <h3 className="text-xl font-black leading-tight flex items-center gap-2">
                <span>{company.name}</span>
              </h3>
              {company.legalName && (
                <p className="text-xs text-slate-400 font-mono">
                  {company.legalName}
                </p>
              )}
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* Quick Contact & Action Buttons */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            {waLink && (
              <a
                href={waLink}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs shadow-xs flex items-center space-x-1.5 transition-colors"
              >
                <MessageSquare size={14} />
                <span>WhatsApp Directo</span>
              </a>
            )}

            {company.phone && (
              <a
                href={`tel:${company.phone}`}
                className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs flex items-center space-x-1.5 transition-colors"
              >
                <Phone size={13} />
                <span>Llamar</span>
              </a>
            )}

            <a
              href={`mailto:${company.email}?subject=Seguimiento%20iAtomica`}
              className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs flex items-center space-x-1.5 transition-colors"
            >
              <Mail size={13} />
              <span>Email</span>
            </a>

            <div className="ml-auto flex items-center space-x-2 text-xs font-mono">
              <span className="text-slate-400">Deal:</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400">
                ${company.estimatedValue.toLocaleString()} USD
              </span>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center space-x-2 border-b border-slate-200 dark:border-slate-800 pt-2 -mb-2 text-xs font-bold">
            <button
              onClick={() => setActiveTab('info')}
              className={`pb-2 px-2 border-b-2 transition-all ${
                activeTab === 'info'
                  ? 'border-orange-500 text-orange-600 dark:text-orange-400'
                  : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              Ficha &amp; Requerimientos
            </button>

            <button
              onClick={() => setActiveTab('activities')}
              className={`pb-2 px-2 border-b-2 transition-all flex items-center space-x-1 ${
                activeTab === 'activities'
                  ? 'border-orange-500 text-orange-600 dark:text-orange-400'
                  : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <span>Bitácora de Ventas</span>
              <span className="px-1.5 py-0.2 rounded-full bg-slate-200 dark:bg-slate-800 text-[10px]">
                {company.activities?.length || company.activitiesCount || 0}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('jira')}
              className={`pb-2 px-2 border-b-2 transition-all flex items-center space-x-1 ${
                activeTab === 'jira'
                  ? 'border-orange-500 text-orange-600 dark:text-orange-400'
                  : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <span>Tickets Jira</span>
              <span className="px-1.5 py-0.2 rounded-full bg-purple-500/10 text-purple-600 text-[10px]">
                {company.issues?.length || company.issuesCount || 0}
              </span>
            </button>
          </div>

        </div>

        {/* Content Body */}
        <div className="flex-1 p-6 overflow-y-auto space-y-6 text-xs">
          
          {/* TAB 1: Company Info & Tech Diagnostics */}
          {activeTab === 'info' && (
            <div className="space-y-5">
              
              {!isEditingInfo ? (
                <>
                  {/* Key Contact Card */}
                  <div className={`p-4 rounded-2xl border space-y-2 ${
                    darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'
                  }`}>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                        Contacto Principal &amp; Decisor
                      </span>
                      <button
                        onClick={handleStartEdit}
                        className="text-xs font-bold text-orange-600 hover:underline"
                      >
                        Editar Información
                      </button>
                    </div>

                    <div className="font-bold text-sm text-slate-900 dark:text-white">
                      {company.contactName}
                      {company.contactRole && (
                        <span className="text-xs font-normal text-slate-400 ml-2">
                          ({company.contactRole})
                        </span>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] font-mono text-slate-600 dark:text-slate-300 pt-1">
                      <div className="flex items-center gap-1.5">
                        <Mail size={12} className="text-orange-500" />
                        <span>{company.email}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Phone size={12} className="text-purple-500" />
                        <span>{company.phone || 'Sin teléfono registrado'}</span>
                      </div>
                      {company.website && (
                        <div className="flex items-center gap-1.5">
                          <Globe size={12} className="text-blue-500" />
                          <a href={company.website} target="_blank" rel="noreferrer" className="text-blue-500 hover:underline">
                            {company.website}
                          </a>
                        </div>
                      )}
                      <div className="flex items-center gap-1.5">
                        <UserCheck size={12} className="text-emerald-500" />
                        <span>Responsable: {company.assignedTo}</span>
                      </div>
                    </div>
                  </div>

                  {/* Technical Requirements / Architecture Diagnosed */}
                  <div className="space-y-2">
                    <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                      <Sparkles size={13} className="text-orange-500" />
                      <span>Diagnóstico &amp; Requerimientos Técnicos</span>
                    </h4>
                    <div className={`p-4 rounded-2xl border leading-relaxed ${
                      darkMode ? 'bg-slate-900/40 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
                    }`}>
                      {company.techRequirements || 'Sin especificaciones técnicas cargadas por el momento.'}
                    </div>
                  </div>

                  {/* Strategic Commercial Notes */}
                  <div className="space-y-2">
                    <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                      <FileText size={13} className="text-purple-500" />
                      <span>Notas Estratégicas del Cliente</span>
                    </h4>
                    <div className={`p-4 rounded-2xl border leading-relaxed italic ${
                      darkMode ? 'bg-slate-900/40 border-slate-800 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-600'
                    }`}>
                      "{company.notes || 'Sin notas comerciales adicionales.'}"
                    </div>
                  </div>

                  {/* Fast Action to Create Jira Ticket */}
                  <div className={`p-4 rounded-2xl border flex items-center justify-between ${
                    darkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-purple-50/50 border-purple-200'
                  }`}>
                    <div>
                      <h5 className="font-bold text-xs text-purple-700 dark:text-purple-300">
                        ¿Necesitas planificar una tarea para esta cuenta?
                      </h5>
                      <p className="text-[11px] text-slate-500">
                        Crea un ticket en Jira vinculado directamente a {company.name}.
                      </p>
                    </div>

                    <button
                      onClick={() => onCreateIssueForCompany(company.id)}
                      className="px-3.5 py-1.5 rounded-xl gradient-brand text-white font-bold text-xs shadow-md hover:opacity-90 transition-opacity flex items-center space-x-1"
                    >
                      <Plus size={13} />
                      <span>Crear Ticket Jira</span>
                    </button>
                  </div>
                </>
              ) : (
                /* Edit Mode Form */
                <form onSubmit={handleSaveInfo} className="space-y-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 font-mono mb-1">Nombre Comercial</label>
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border text-xs font-bold bg-transparent focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-400 font-mono mb-1">Contacto Principal</label>
                      <input
                        type="text"
                        value={editContact}
                        onChange={(e) => setEditContact(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border text-xs font-bold bg-transparent focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-400 font-mono mb-1">Cargo</label>
                      <input
                        type="text"
                        value={editRole}
                        onChange={(e) => setEditRole(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border text-xs font-bold bg-transparent focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-400 font-mono mb-1">Email</label>
                      <input
                        type="email"
                        value={editEmail}
                        onChange={(e) => setEditEmail(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border text-xs font-bold bg-transparent focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-400 font-mono mb-1">Teléfono</label>
                      <input
                        type="text"
                        value={editPhone}
                        onChange={(e) => setEditPhone(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border text-xs font-bold bg-transparent focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 font-mono mb-1">Valor Estimado ($ USD)</label>
                    <input
                      type="number"
                      value={editValue}
                      onChange={(e) => setEditValue(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-xl border text-xs font-bold bg-transparent focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 font-mono mb-1">Requerimientos Técnicos</label>
                    <textarea
                      rows={3}
                      value={editTech}
                      onChange={(e) => setEditTech(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border text-xs font-medium bg-transparent focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 font-mono mb-1">Notas Comerciales</label>
                    <textarea
                      rows={2}
                      value={editNotes}
                      onChange={(e) => setEditNotes(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border text-xs font-medium bg-transparent focus:outline-none"
                    />
                  </div>

                  <div className="flex items-center justify-end space-x-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsEditingInfo(false)}
                      className="px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1.5 rounded-xl gradient-brand text-white font-bold"
                    >
                      Guardar
                    </button>
                  </div>
                </form>
              )}

            </div>
          )}

          {/* TAB 2: Commercial Activity Log */}
          {activeTab === 'activities' && (
            <div className="space-y-5">
              
              {/* Add Activity Box */}
              <form onSubmit={handleAddActivitySubmit} className={`p-4 rounded-2xl border space-y-3 ${
                darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}>
                <h5 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-400">
                  Registrar Interacción con el Cliente
                </h5>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] font-mono text-slate-400 mb-1">Canal de Contacto</label>
                    <select
                      value={actType}
                      onChange={(e) => setActType(e.target.value as ActivityType)}
                      className="w-full px-2.5 py-1.5 rounded-xl border text-xs font-bold bg-transparent focus:outline-none cursor-pointer"
                    >
                      <option value="call">📞 Llamada Telefónica</option>
                      <option value="meeting">🤝 Reunión / Demo</option>
                      <option value="whatsapp">💬 WhatsApp</option>
                      <option value="email">✉️ Correo Electrónico</option>
                      <option value="note">📝 Nota Interna</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono text-slate-400 mb-1">Próxima Acción (Fecha Límite)</label>
                    <input
                      type="date"
                      value={actNextDate}
                      onChange={(e) => setActNextDate(e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded-xl border text-xs font-bold bg-transparent focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <input
                    type="text"
                    required
                    placeholder="Resumen (ej: Presentación de propuesta técnica, cliente solicitó descuento...)"
                    value={actSummary}
                    onChange={(e) => setActSummary(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border text-xs font-medium bg-transparent focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Siguiente paso acordado (Next Action)..."
                    value={actNextAction}
                    onChange={(e) => setActNextAction(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border text-xs font-medium bg-transparent focus:outline-none"
                  />

                  <textarea
                    rows={1}
                    placeholder="Detalles ampliados o acuerdos..."
                    value={actDetails}
                    onChange={(e) => setActDetails(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border text-xs font-medium bg-transparent focus:outline-none"
                  />
                </div>

                <div className="flex justify-end pt-1">
                  <button
                    type="submit"
                    disabled={isSubmittingAct || !actSummary.trim()}
                    className="px-4 py-1.5 rounded-xl gradient-brand text-white font-bold text-xs shadow-xs hover:opacity-90 disabled:opacity-50 transition-all flex items-center space-x-1"
                  >
                    <Send size={12} />
                    <span>{isSubmittingAct ? 'Guardando...' : 'Guardar Actividad'}</span>
                  </button>
                </div>
              </form>

              {/* Activity Timeline */}
              <div className="space-y-3">
                <h5 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-400">
                  Historial de Interacciones ({company.activities?.length || 0})
                </h5>

                {(!company.activities || company.activities.length === 0) ? (
                  <p className="text-xs text-slate-400 italic font-mono py-4 text-center">
                    No hay actividades comerciales registradas para esta cuenta.
                  </p>
                ) : (
                  company.activities.map(act => (
                    <div
                      key={act.id}
                      className={`p-3.5 rounded-xl border space-y-1.5 ${
                        darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center space-x-2">
                          {getActivityIcon(act.type)}
                          <span className="font-bold text-slate-900 dark:text-white">
                            {act.summary}
                          </span>
                        </div>
                        <span className="text-[10px] font-mono text-slate-400">
                          {new Date(act.createdAt).toLocaleDateString()} {new Date(act.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>

                      {act.details && (
                        <p className="text-[11px] text-slate-600 dark:text-slate-300 font-medium pl-5">
                          {act.details}
                        </p>
                      )}

                      {act.nextAction && (
                        <div className="pl-5 pt-1 flex items-center space-x-2 text-[10px] font-bold text-orange-600 dark:text-orange-400 font-mono">
                          <span>Próximo paso: {act.nextAction}</span>
                          {act.nextActionDate && (
                            <span className="text-slate-400">({new Date(act.nextActionDate).toLocaleDateString()})</span>
                          )}
                        </div>
                      )}

                      <div className="pl-5 text-[9px] font-mono text-slate-400">
                        Registrado por: {act.author}
                      </div>
                    </div>
                  ))
                )}
              </div>

            </div>
          )}

          {/* TAB 3: Linked Jira Tickets */}
          {activeTab === 'jira' && (
            <div className="space-y-4">
              
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-400">
                  Incidencias en Tablero &amp; Backlog ({company.issues?.length || 0})
                </span>

                <button
                  onClick={() => onCreateIssueForCompany(company.id)}
                  className="px-3 py-1.5 rounded-xl gradient-brand text-white font-bold text-xs shadow-xs hover:opacity-90 flex items-center space-x-1"
                >
                  <Plus size={12} />
                  <span>Nuevo Ticket Jira</span>
                </button>
              </div>

              {(!company.issues || company.issues.length === 0) ? (
                <div className={`p-8 rounded-2xl border text-center font-mono text-xs text-slate-400 italic ${
                  darkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-slate-50 border-slate-200'
                }`}>
                  Esta cuenta aún no tiene tickets vinculados en Jira. Haz clic en el botón superior para crear el primero.
                </div>
              ) : (
                <div className="space-y-2.5">
                  {company.issues.map(iss => (
                    <div
                      key={iss.id}
                      onClick={() => onOpenIssue && onOpenIssue(iss)}
                      className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer hover:border-orange-400 transition-all ${
                        darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900 shadow-xs'
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-mono font-bold text-xs text-slate-400">
                            {iss.issueKey}
                          </span>
                          <span className="px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-500 font-mono">
                            {iss.status}
                          </span>
                          <span className="text-xs">
                            {iss.priority === 'highest' ? '⏫' : iss.priority === 'high' ? '🔼' : '🟰'}
                          </span>
                        </div>
                        <h5 className="font-bold text-xs text-slate-800 dark:text-slate-200">
                          {iss.title}
                        </h5>
                      </div>

                      <div className="flex items-center space-x-2 font-mono text-xs">
                        <span className="px-2 py-0.5 rounded bg-purple-500/10 text-purple-600 font-bold">
                          {iss.storyPoints} pts
                        </span>
                        <ExternalLink size={14} className="text-slate-400" />
                      </div>
                    </div>
                  ))}
                </div>
              )}

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
