import React, { useState } from 'react';
import type { CrmCompany, CrmActivity } from '../../services/crmService';
import type { JiraIssue } from '../../services/jiraService';
import { 
  PROSPECT_STATUSES, 
  POTENTIAL_SERVICES,
  ACTIVITY_TYPES,
  ACTIVITY_CHANNELS,
  generateWhatsAppLink,
  generateInstagramLink,
  exportActivitiesToCsv
} from '../../services/crmService';
import { TEAM_MEMBERS } from '../../services/authService';
import { 
  X, 
  Phone, 
  MessageSquare, 
  Plus, 
  FileText, 
  Send, 
  Sparkles,
  ExternalLink,
  CheckSquare,
  Clock,
  AlertTriangle,
  Download,
  Edit2,
  Trash2,
  Building,
  Star,
  Info,
  History,
  PhoneCall
} from 'lucide-react';

interface CrmCompanyDrawerProps {
  company: CrmCompany | null;
  onClose: () => void;
  onUpdateCompany: (id: string, updates: Partial<CrmCompany>) => Promise<CrmCompany | null | void>;
  onAddActivity: (companyId: string, activity: Omit<CrmActivity, 'id' | 'companyId' | 'createdAt'>) => Promise<CrmActivity | null | void>;
  onAddComment?: (companyId: string, commentText: string) => Promise<void>;
  onDeleteComment?: (commentId: string, companyId: string) => Promise<void>;
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
  onAddComment,
  onDeleteComment,
  onCreateIssueForCompany,
  onOpenIssue,
  darkMode,
  currentUserName
}) => {
  const [activeTab, setActiveTab] = useState<'ficha' | 'historial' | 'comentarios' | 'jira'>('ficha');

  // Edit Ficha State
  const [isEditingFicha, setIsEditingFicha] = useState(false);
  const [editName, setEditName] = useState('');
  const [editIndustry, setEditIndustry] = useState('');
  const [editCity, setEditCity] = useState('');
  const [editAddress, setEditAddress] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [editWhatsapp, setEditWhatsapp] = useState('');
  const [editInstagram, setEditInstagram] = useState('');
  const [editWebsite, setEditWebsite] = useState('');
  const [editContact, setEditContact] = useState('');
  const [editRole, setEditRole] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editService, setEditService] = useState('');
  const [editStatus, setEditStatus] = useState('');
  const [editAssignedTo, setEditAssignedTo] = useState('');
  const [editRating, setEditRating] = useState('5.0');
  const [editReviews, setEditReviews] = useState('0');
  const [editNextAction, setEditNextAction] = useState('');
  const [editNextFollowup, setEditNextFollowup] = useState('');
  const [editNotes, setEditNotes] = useState('');

  // New Activity State
  const [actType, setActType] = useState<string>('WhatsApp');
  const [actChannel, setActChannel] = useState<string>('WhatsApp');
  const [actResult, setActResult] = useState<string>('Respondió interesado');
  const [actSummary, setActSummary] = useState('');
  const [actDetails, setActDetails] = useState('');
  const [actNextAction, setActNextAction] = useState('');
  const [actNextDate, setActNextDate] = useState('');
  const [isSubmittingAct, setIsSubmittingAct] = useState(false);

  // New Comment State
  const [newCommentText, setNewCommentText] = useState('');
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);

  if (!company) return null;

  const handleStartEdit = () => {
    setEditName(company.name || '');
    setEditIndustry(company.industry || '');
    setEditCity(company.city || 'Valencia');
    setEditAddress(company.address || '');
    setEditPhone(company.phone || '');
    setEditWhatsapp(company.whatsapp || company.phone || '');
    setEditInstagram(company.instagram || '');
    setEditWebsite(company.website || '');
    setEditContact(company.contactName || '');
    setEditRole(company.contactRole || '');
    setEditEmail(company.email || '');
    setEditService(company.potentialService || 'Página web');
    setEditStatus(company.status || 'Nuevo');
    setEditAssignedTo(company.assignedTo || TEAM_MEMBERS[0]);
    setEditRating(String(company.googleRating || '5.0'));
    setEditReviews(String(company.googleReviewsCount || '0'));
    setEditNextAction(company.nextAction || '');
    setEditNextFollowup(company.nextFollowupAt ? company.nextFollowupAt.split('T')[0] : '');
    setEditNotes(company.notes || '');
    setIsEditingFicha(true);
  };

  const handleSaveFicha = async (e: React.FormEvent) => {
    e.preventDefault();
    await onUpdateCompany(company.id, {
      name: editName.trim(),
      industry: editIndustry.trim(),
      city: editCity.trim(),
      address: editAddress.trim() || undefined,
      phone: editPhone.trim() || undefined,
      whatsapp: editWhatsapp.trim() || editPhone.trim() || undefined,
      instagram: editInstagram.trim() || undefined,
      website: editWebsite.trim() || undefined,
      contactName: editContact.trim() || editName.trim(),
      contactRole: editRole.trim() || undefined,
      email: editEmail.trim() || undefined,
      potentialService: editService,
      status: editStatus,
      assignedTo: editAssignedTo,
      googleRating: Number(editRating) || 5.0,
      googleReviewsCount: Number(editReviews) || 0,
      nextAction: editNextAction.trim() || undefined,
      nextFollowupAt: editNextFollowup ? new Date(editNextFollowup).toISOString() : undefined,
      notes: editNotes.trim() || undefined
    });
    setIsEditingFicha(false);
  };

  const handleAddActivitySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!actSummary.trim()) return;

    setIsSubmittingAct(true);
    await onAddActivity(company.id, {
      type: actType,
      channel: actChannel,
      result: actResult,
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

  const handleAddCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim() || !onAddComment) return;

    setIsSubmittingComment(true);
    await onAddComment(company.id, newCommentText.trim());
    setNewCommentText('');
    setIsSubmittingComment(false);
  };

  const waNumber = company.whatsapp || company.phone;
  const waLink = waNumber ? generateWhatsAppLink(waNumber, company.contactName || company.name, company.name) : null;
  const instaLink = company.instagram ? generateInstagramLink(company.instagram) : null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className={`w-full max-w-2xl h-full shadow-2xl flex flex-col border-l transition-all ${
          darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        {/* Drawer Top Header */}
        <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-start justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="font-mono text-[10px] text-slate-400 font-bold uppercase">{company.id}</span>
              {company.isDuplicatePossible ? (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-600 border border-amber-500/20 flex items-center space-x-1">
                  <AlertTriangle size={11} />
                  <span>Posible Duplicado</span>
                </span>
              ) : null}
            </div>
            <h2 className="text-xl font-black text-slate-900 dark:text-white leading-tight">
              {company.name}
            </h2>
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 font-medium">
                {company.industry}
              </span>
              <span>•</span>
              <span>{company.city || 'Valencia'}</span>
              <span>•</span>
              <span className="font-bold text-orange-600 dark:text-orange-400">
                {company.potentialService || 'Página web'}
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {!isEditingFicha && (
              <button
                onClick={handleStartEdit}
                className="px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center space-x-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
              >
                <Edit2 size={13} />
                <span>Editar Ficha</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Quick Contact & Action Ribbon */}
        <div className="px-5 py-2.5 bg-slate-50 dark:bg-slate-950/50 border-b border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center space-x-3">
            {waLink && (
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold hover:bg-emerald-500 hover:text-white transition-all flex items-center space-x-1.5"
              >
                <Phone size={13} />
                <span>Abrir WhatsApp ({waNumber})</span>
              </a>
            )}

            {company.phone && (
              <a
                href={`tel:${company.phone}`}
                className="px-3 py-1.5 rounded-xl border text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 font-medium flex items-center space-x-1.5"
              >
                <PhoneCall size={13} />
                <span>Llamar</span>
              </a>
            )}

            {instaLink && (
              <a
                href={instaLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-600 dark:text-purple-400 font-bold hover:underline flex items-center space-x-1"
              >
                <span>{company.instagram}</span>
                <ExternalLink size={11} />
              </a>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-[11px] text-slate-400">Responsable:</span>
            <span className="font-bold text-slate-700 dark:text-slate-200">{company.assignedTo}</span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center px-5 border-b border-slate-100 dark:border-slate-800 text-xs font-bold">
          <button
            onClick={() => setActiveTab('ficha')}
            className={`py-3 px-3 border-b-2 transition-all flex items-center space-x-1.5 ${
              activeTab === 'ficha'
                ? 'border-orange-500 text-orange-600 dark:text-orange-400'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Info size={14} />
            <span>Ficha Detallada</span>
          </button>

          <button
            onClick={() => setActiveTab('historial')}
            className={`py-3 px-3 border-b-2 transition-all flex items-center space-x-1.5 ${
              activeTab === 'historial'
                ? 'border-orange-500 text-orange-600 dark:text-orange-400'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <History size={14} />
            <span>Historial de Acciones</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-slate-200 dark:bg-slate-800 font-mono">
              {company.activities?.length || 0}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('comentarios')}
            className={`py-3 px-3 border-b-2 transition-all flex items-center space-x-1.5 ${
              activeTab === 'comentarios'
                ? 'border-orange-500 text-orange-600 dark:text-orange-400'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <MessageSquare size={14} />
            <span>Notas & Comentarios</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-slate-200 dark:bg-slate-800 font-mono">
              {company.comments?.length || 0}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('jira')}
            className={`py-3 px-3 border-b-2 transition-all flex items-center space-x-1.5 ${
              activeTab === 'jira'
                ? 'border-orange-500 text-orange-600 dark:text-orange-400'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <CheckSquare size={14} />
            <span>Incidencias Jira</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-slate-200 dark:bg-slate-800 font-mono">
              {company.issues?.length || 0}
            </span>
          </button>
        </div>

        {/* Drawer Body Scroll Area */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">

          {/* ----------------------------------------------------------------- */}
          {/* TAB 1: FICHA ESTRUCTURADA ORDENADA POR SECCIONES (A, B, C, D, E)  */}
          {/* ----------------------------------------------------------------- */}
          {activeTab === 'ficha' && (
            isEditingFicha ? (
              <form onSubmit={handleSaveFicha} className="space-y-5">
                <h4 className="text-xs font-black text-orange-600 uppercase tracking-wider">Modificando Ficha de Prospecto</h4>

                {/* Sec A: Info General */}
                <div className="p-4 rounded-2xl border space-y-3 bg-slate-50/50 dark:bg-slate-800/20 dark:border-slate-800">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">A. Información General</span>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-bold block mb-1">Negocio / Profesional</label>
                      <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-xl border dark:bg-slate-800 dark:border-slate-700"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold block mb-1">Rubro</label>
                      <input
                        type="text"
                        value={editIndustry}
                        onChange={(e) => setEditIndustry(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-xl border dark:bg-slate-800 dark:border-slate-700"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-bold block mb-1">Ciudad</label>
                      <input
                        type="text"
                        value={editCity}
                        onChange={(e) => setEditCity(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-xl border dark:bg-slate-800 dark:border-slate-700"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold block mb-1">Dirección</label>
                      <input
                        type="text"
                        value={editAddress}
                        onChange={(e) => setEditAddress(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-xl border dark:bg-slate-800 dark:border-slate-700"
                      />
                    </div>
                  </div>
                </div>

                {/* Sec B: Contacto */}
                <div className="p-4 rounded-2xl border space-y-3 bg-slate-50/50 dark:bg-slate-800/20 dark:border-slate-800">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">B. Canales de Contacto</span>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-bold block mb-1">Teléfono</label>
                      <input
                        type="text"
                        value={editPhone}
                        onChange={(e) => setEditPhone(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-xl border dark:bg-slate-800 dark:border-slate-700"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold block mb-1">WhatsApp</label>
                      <input
                        type="text"
                        value={editWhatsapp}
                        onChange={(e) => setEditWhatsapp(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-xl border dark:bg-slate-800 dark:border-slate-700"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-bold block mb-1">Instagram (@)</label>
                      <input
                        type="text"
                        value={editInstagram}
                        onChange={(e) => setEditInstagram(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-xl border dark:bg-slate-800 dark:border-slate-700"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold block mb-1">Sitio Web</label>
                      <input
                        type="text"
                        value={editWebsite}
                        onChange={(e) => setEditWebsite(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-xl border dark:bg-slate-800 dark:border-slate-700"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-bold block mb-1">Persona de Contacto</label>
                      <input
                        type="text"
                        value={editContact}
                        onChange={(e) => setEditContact(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-xl border dark:bg-slate-800 dark:border-slate-700"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold block mb-1">Cargo / Rol</label>
                      <input
                        type="text"
                        value={editRole}
                        onChange={(e) => setEditRole(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-xl border dark:bg-slate-800 dark:border-slate-700"
                      />
                    </div>
                  </div>
                </div>

                {/* Sec C: Comercial */}
                <div className="p-4 rounded-2xl border space-y-3 bg-slate-50/50 dark:bg-slate-800/20 dark:border-slate-800">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">C. Información Comercial</span>
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="text-xs font-bold block mb-1">Servicio Potencial</label>
                      <select
                        value={editService}
                        onChange={(e) => setEditService(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-xl border dark:bg-slate-800 dark:border-slate-700"
                      >
                        {POTENTIAL_SERVICES.map(srv => (
                          <option key={srv} value={srv}>{srv}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-bold block mb-1">Estado</label>
                      <select
                        value={editStatus}
                        onChange={(e) => setEditStatus(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-xl border dark:bg-slate-800 dark:border-slate-700"
                      >
                        {PROSPECT_STATUSES.map(st => (
                          <option key={st} value={st}>{st}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-bold block mb-1">Vendedor / Asesor</label>
                      <select
                        value={editAssignedTo}
                        onChange={(e) => setEditAssignedTo(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-xl border dark:bg-slate-800 dark:border-slate-700"
                      >
                        {TEAM_MEMBERS.map(rep => (
                          <option key={rep} value={rep}>{rep}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Sec D: Seguimiento */}
                <div className="p-4 rounded-2xl border space-y-3 bg-slate-50/50 dark:bg-slate-800/20 dark:border-slate-800">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">D. Próximo Paso y Seguimiento</span>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-bold block mb-1">Próxima Acción</label>
                      <input
                        type="text"
                        value={editNextAction}
                        onChange={(e) => setEditNextAction(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-xl border dark:bg-slate-800 dark:border-slate-700"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold block mb-1">Fecha de Seguimiento</label>
                      <input
                        type="date"
                        value={editNextFollowup}
                        onChange={(e) => setEditNextFollowup(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-xl border dark:bg-slate-800 dark:border-slate-700"
                      />
                    </div>
                  </div>
                </div>

                {/* Sec E: Observaciones */}
                <div className="p-4 rounded-2xl border space-y-2 bg-slate-50/50 dark:bg-slate-800/20 dark:border-slate-800">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">E. Observaciones</span>
                  <textarea
                    rows={3}
                    value={editNotes}
                    onChange={(e) => setEditNotes(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border dark:bg-slate-800 dark:border-slate-700"
                  />
                </div>

                <div className="flex items-center justify-end space-x-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsEditingFicha(false)}
                    className="px-4 py-2 text-xs font-bold rounded-xl text-slate-500 hover:text-slate-800 dark:hover:text-white"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 text-xs font-bold rounded-xl gradient-brand text-white shadow-xs"
                  >
                    Guardar Cambios
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-4">
                
                {/* SECCIÓN A: INFORMACIÓN GENERAL */}
                <div className={`p-4 rounded-2xl border space-y-2.5 ${
                  darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                }`}>
                  <div className="flex items-center space-x-2 text-orange-600 font-bold text-xs">
                    <Building size={15} />
                    <span>A. Información General</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">Nombre Comercial</span>
                      <strong className="text-slate-900 dark:text-white">{company.name}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">Rubro / Actividad</span>
                      <span className="text-slate-700 dark:text-slate-200">{company.industry}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">Ciudad</span>
                      <span className="text-slate-700 dark:text-slate-200">{company.city || 'Valencia'}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">Dirección Física</span>
                      <span className="text-slate-700 dark:text-slate-200">{company.address || 'No informada públicamente'}</span>
                    </div>
                  </div>
                </div>

                {/* SECCIÓN B: CONTACTO */}
                <div className={`p-4 rounded-2xl border space-y-2.5 ${
                  darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                }`}>
                  <div className="flex items-center space-x-2 text-blue-600 font-bold text-xs">
                    <Phone size={15} />
                    <span>B. Canales de Contacto</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">Teléfono Principal</span>
                      <span className="font-mono text-slate-700 dark:text-slate-200">{company.phone || '—'}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">WhatsApp Directo</span>
                      <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">{company.whatsapp || company.phone || '—'}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">Instagram</span>
                      {instaLink ? (
                        <a href={instaLink} target="_blank" rel="noopener noreferrer" className="text-purple-600 dark:text-purple-400 font-bold hover:underline flex items-center space-x-1">
                          <span>{company.instagram}</span>
                          <ExternalLink size={10} />
                        </a>
                      ) : <span className="text-slate-400">—</span>}
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">Sitio Web</span>
                      {company.website ? (
                        <a href={company.website.startsWith('http') ? company.website : `https://${company.website}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 font-bold hover:underline flex items-center space-x-1">
                          <span>{company.website.replace(/^https?:\/\//, '')}</span>
                          <ExternalLink size={10} />
                        </a>
                      ) : <span className="text-slate-400">—</span>}
                    </div>
                    <div className="col-span-2">
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">Persona de Contacto / Decisor</span>
                      <span className="text-slate-700 dark:text-slate-200">{company.contactName} {company.contactRole ? `(${company.contactRole})` : ''}</span>
                    </div>
                  </div>
                </div>

                {/* SECCIÓN C: INFORMACIÓN COMERCIAL */}
                <div className={`p-4 rounded-2xl border space-y-2.5 ${
                  darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                }`}>
                  <div className="flex items-center space-x-2 text-amber-600 font-bold text-xs">
                    <Sparkles size={15} />
                    <span>C. Información Comercial & Estado</span>
                  </div>
                  <div className="grid grid-cols-3 gap-3 text-xs">
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">Servicio Potencial</span>
                      <strong className="text-orange-600 dark:text-orange-400">{company.potentialService || 'Página web'}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">Estado Actual</span>
                      <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 inline-block">
                        {company.status}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">Vendedor Asignado</span>
                      <span className="text-slate-700 dark:text-slate-200 font-bold">{company.assignedTo}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">Rating Google</span>
                      <span className="flex items-center space-x-1 text-amber-500 font-bold">
                        <Star size={12} fill="currentColor" />
                        <span>{company.googleRating || 5.0}★</span>
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">Reseñas Google</span>
                      <span className="text-slate-700 dark:text-slate-200">{company.googleReviewsCount || 0} reseñas</span>
                    </div>
                  </div>
                </div>

                {/* SECCIÓN D: SEGUIMIENTO */}
                <div className={`p-4 rounded-2xl border space-y-2.5 ${
                  darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                }`}>
                  <div className="flex items-center space-x-2 text-indigo-600 font-bold text-xs">
                    <Clock size={15} />
                    <span>D. Próximo Paso y Seguimiento</span>
                  </div>
                  <div className="grid grid-cols-3 gap-3 text-xs">
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">Último Contacto</span>
                      <span className="text-slate-700 dark:text-slate-200">
                        {company.lastContactAt ? new Date(company.lastContactAt).toLocaleDateString() : 'Sin contacto previo'}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">Próximo Paso</span>
                      <span className="text-slate-900 dark:text-white font-bold">{company.nextAction || 'Pendiente de definir'}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">Fecha Programada</span>
                      <span className="font-bold text-slate-700 dark:text-slate-200">
                        {company.nextFollowupAt ? new Date(company.nextFollowupAt).toLocaleDateString() : 'Sin fecha'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* SECCIÓN E: OBSERVACIONES & DATOS HISTÓRICOS */}
                <div className={`p-4 rounded-2xl border space-y-2.5 ${
                  darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                }`}>
                  <div className="flex items-center space-x-2 text-slate-500 font-bold text-xs">
                    <FileText size={15} />
                    <span>E. Observaciones & Contexto Original</span>
                  </div>
                  {company.notes && (
                    <p className="text-xs text-slate-600 dark:text-slate-300 whitespace-pre-wrap">
                      {company.notes}
                    </p>
                  )}
                  {company.legacyData && company.legacyData !== company.notes && (
                    <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800/60 text-[11px] text-slate-500 font-mono">
                      <strong className="text-slate-400 block uppercase text-[9px] mb-1">Registro Original Sin Alterar (Legacy)</strong>
                      {company.legacyData}
                    </div>
                  )}
                </div>

              </div>
            )
          )}

          {/* ----------------------------------------------------------------- */}
          {/* TAB 2: HISTORIAL CRONOLÓGICO DE ACCIONES (F)                      */}
          {/* ----------------------------------------------------------------- */}
          {activeTab === 'historial' && (
            <div className="space-y-5">
              
              {/* Formulario para registrar nueva acción */}
              <form onSubmit={handleAddActivitySubmit} className={`p-4 rounded-2xl border space-y-3.5 ${
                darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
              }`}>
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider flex items-center space-x-1.5">
                    <Plus size={14} className="text-orange-500" />
                    <span>Registrar Acción Comercial</span>
                  </h4>
                  {company.activities && company.activities.length > 0 && (
                    <button
                      type="button"
                      onClick={() => exportActivitiesToCsv(company.activities || [], company.name)}
                      className="text-[11px] text-orange-600 hover:underline flex items-center space-x-1"
                    >
                      <Download size={12} />
                      <span>Exportar Historial</span>
                    </button>
                  )}
                </div>

                {/* Canal & Tipo */}
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 block mb-1">Canal de Contacto</label>
                    <select
                      value={actChannel}
                      onChange={(e) => setActChannel(e.target.value)}
                      className={`w-full px-2.5 py-1.5 text-xs rounded-xl border ${
                        darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200'
                      }`}
                    >
                      {ACTIVITY_CHANNELS.map(ch => (
                        <option key={ch} value={ch}>{ch}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-slate-400 block mb-1">Tipo de Acción</label>
                    <select
                      value={actType}
                      onChange={(e) => setActType(e.target.value)}
                      className={`w-full px-2.5 py-1.5 text-xs rounded-xl border ${
                        darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200'
                      }`}
                    >
                      {ACTIVITY_TYPES.map(tp => (
                        <option key={tp} value={tp}>{tp}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-slate-400 block mb-1">Resultado</label>
                    <input
                      type="text"
                      placeholder="Ej: Interesado, Sin respuesta..."
                      value={actResult}
                      onChange={(e) => setActResult(e.target.value)}
                      className={`w-full px-2.5 py-1.5 text-xs rounded-xl border ${
                        darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200'
                      }`}
                    />
                  </div>
                </div>

                {/* Resumen & Detalle */}
                <div>
                  <input
                    type="text"
                    placeholder="Resumen breve de la interacción *"
                    value={actSummary}
                    onChange={(e) => setActSummary(e.target.value)}
                    className={`w-full px-3 py-2 text-xs rounded-xl border ${
                      darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200'
                    }`}
                    required
                  />
                </div>

                <div>
                  <textarea
                    rows={2}
                    placeholder="Comentarios adicionales o transcripción..."
                    value={actDetails}
                    onChange={(e) => setActDetails(e.target.value)}
                    className={`w-full px-3 py-2 text-xs rounded-xl border ${
                      darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200'
                    }`}
                  />
                </div>

                {/* Próximo paso opcional */}
                <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-100 dark:border-slate-800">
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 block mb-1">Próximo Paso</label>
                    <input
                      type="text"
                      placeholder="Ej: Coordinar videollamada..."
                      value={actNextAction}
                      onChange={(e) => setActNextAction(e.target.value)}
                      className={`w-full px-2.5 py-1.5 text-xs rounded-xl border ${
                        darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200'
                      }`}
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 block mb-1">Fecha Próximo Seguimiento</label>
                    <input
                      type="date"
                      value={actNextDate}
                      onChange={(e) => setActNextDate(e.target.value)}
                      className={`w-full px-2.5 py-1.5 text-xs rounded-xl border ${
                        darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200'
                      }`}
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={isSubmittingAct}
                    className="px-4 py-2 text-xs font-bold rounded-xl gradient-brand text-white shadow-xs flex items-center space-x-1.5"
                  >
                    <Send size={13} />
                    <span>{isSubmittingAct ? 'Guardando...' : 'Registrar Acción en Timeline'}</span>
                  </button>
                </div>
              </form>

              {/* Timeline Cronológico */}
              <div className="space-y-4">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Timeline de Acciones</span>

                {!company.activities || company.activities.length === 0 ? (
                  <div className="py-8 text-center text-xs text-slate-400">
                    No hay acciones registradas aún para este prospecto.
                  </div>
                ) : (
                  <div className="relative border-l-2 border-slate-200 dark:border-slate-800 ml-3 space-y-5">
                    {company.activities.map((act) => (
                      <div key={act.id} className="relative pl-6">
                        <div className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full bg-orange-500 border-2 border-white dark:border-slate-900" />
                        
                        <div className={`p-3.5 rounded-2xl border space-y-1.5 ${
                          darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
                        }`}>
                          <div className="flex items-center justify-between text-[11px]">
                            <div className="flex items-center space-x-2">
                              <span className="font-bold text-slate-900 dark:text-white">{act.author}</span>
                              <span className="px-2 py-0.2 rounded-md bg-orange-500/10 text-orange-600 font-bold text-[10px]">
                                {act.channel || act.type}
                              </span>
                              {act.result && (
                                <span className="px-2 py-0.2 rounded-md bg-blue-500/10 text-blue-600 font-bold text-[10px]">
                                  {act.result}
                                </span>
                              )}
                            </div>
                            <span className="text-slate-400 font-mono text-[10px]">
                              {new Date(act.createdAt).toLocaleString()}
                            </span>
                          </div>

                          <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                            {act.summary}
                          </p>

                          {act.details && (
                            <p className="text-xs text-slate-600 dark:text-slate-400 whitespace-pre-wrap">
                              {act.details}
                            </p>
                          )}

                          {act.nextAction && (
                            <div className="pt-1.5 border-t border-slate-100 dark:border-slate-800/80 text-[11px] text-slate-500 flex items-center justify-between">
                              <span><strong>Próximo:</strong> {act.nextAction}</span>
                              {act.nextActionDate && (
                                <span className="font-mono text-orange-600 dark:text-orange-400 font-bold">
                                  {new Date(act.nextActionDate).toLocaleDateString()}
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>
          )}

          {/* ----------------------------------------------------------------- */}
          {/* TAB 3: COMENTARIOS Y NOTAS INTERNAS INDEPENDIENTES (G)            */}
          {/* ----------------------------------------------------------------- */}
          {activeTab === 'comentarios' && (
            <div className="space-y-5">
              
              {/* Caja para añadir nota interna */}
              <form onSubmit={handleAddCommentSubmit} className={`p-4 rounded-2xl border space-y-3 ${
                darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
              }`}>
                <h4 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider flex items-center space-x-1.5">
                  <MessageSquare size={14} className="text-orange-500" />
                  <span>Añadir Nota Interna</span>
                </h4>
                <p className="text-xs text-slate-400">
                  Notas de trabajo que no sobreescriben el historial (ej: "Decisor atiende después de las 16hs", "Pedir presupuesto de bots").
                </p>

                <textarea
                  rows={3}
                  placeholder="Escribe un comentario o nota interna..."
                  value={newCommentText}
                  onChange={(e) => setNewCommentText(e.target.value)}
                  className={`w-full px-3 py-2 text-xs rounded-xl border focus:outline-none focus:ring-2 focus:ring-orange-500/20 ${
                    darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200'
                  }`}
                  required
                />

                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={isSubmittingComment}
                    className="px-4 py-2 text-xs font-bold rounded-xl gradient-brand text-white shadow-xs"
                  >
                    {isSubmittingComment ? 'Publicando...' : 'Publicar Nota'}
                  </button>
                </div>
              </form>

              {/* Lista de Comentarios */}
              <div className="space-y-3">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Notas Guardadas</span>

                {!company.comments || company.comments.length === 0 ? (
                  <div className="py-8 text-center text-xs text-slate-400">
                    No hay comentarios internos aún para este prospecto.
                  </div>
                ) : (
                  company.comments.map((cm) => (
                    <div 
                      key={cm.id} 
                      className={`p-3.5 rounded-2xl border space-y-1.5 ${
                        darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-bold text-slate-900 dark:text-white">{cm.authorName}</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-slate-400 font-mono text-[10px]">{new Date(cm.createdAt).toLocaleString()}</span>
                          {onDeleteComment && (
                            <button
                              onClick={() => onDeleteComment(cm.id, company.id)}
                              className="text-slate-400 hover:text-rose-500 transition-colors"
                              title="Eliminar nota"
                            >
                              <Trash2 size={12} />
                            </button>
                          )}
                        </div>
                      </div>
                      <p className="text-xs text-slate-700 dark:text-slate-300 whitespace-pre-wrap">
                        {cm.comment}
                      </p>
                    </div>
                  ))
                )}
              </div>

            </div>
          )}

          {/* ----------------------------------------------------------------- */}
          {/* TAB 4: INCIDENCIAS JIRA VINCULADAS                                */}
          {/* ----------------------------------------------------------------- */}
          {activeTab === 'jira' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-black uppercase tracking-wider">Tickets de Jira</h4>
                  <p className="text-xs text-slate-400">Incidencias y entregables asociados a este cliente.</p>
                </div>
                <button
                  onClick={() => onCreateIssueForCompany(company.id)}
                  className="px-3 py-1.5 rounded-xl gradient-brand text-white text-xs font-bold flex items-center space-x-1"
                >
                  <Plus size={13} />
                  <span>Nuevo Ticket</span>
                </button>
              </div>

              {!company.issues || company.issues.length === 0 ? (
                <div className="py-12 text-center text-xs text-slate-400 border border-dashed rounded-2xl p-6 dark:border-slate-800">
                  No hay incidencias vinculadas en Jira para este prospecto.
                </div>
              ) : (
                company.issues.map((iss) => (
                  <div
                    key={iss.id}
                    onClick={() => onOpenIssue && onOpenIssue(iss)}
                    className={`p-3.5 rounded-2xl border transition-all hover:border-orange-500/50 cursor-pointer flex items-center justify-between ${
                      darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                    }`}
                  >
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-mono text-xs font-bold text-orange-600">{iss.issueKey}</span>
                        <h5 className="font-bold text-xs text-slate-900 dark:text-white">{iss.title}</h5>
                      </div>
                      <div className="flex items-center space-x-2 text-[11px] text-slate-400 mt-1">
                        <span className="capitalize">{iss.type}</span>
                        <span>•</span>
                        <span>{iss.assignedTo}</span>
                      </div>
                    </div>

                    <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                      {iss.status}
                    </span>
                  </div>
                ))
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
