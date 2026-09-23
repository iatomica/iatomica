import React, { useState } from 'react';
import type { Lead, LeadStatus, LeadRole } from '../../services/leadService';
import {
  MessageSquare,
  Clock,
  Mail,
  Phone,
  Building,
  CheckCircle2,
  Trash2,
  Search,
  ExternalLink,
  Send,
  MessageCircle,
  Copy,
  Check,
  Sparkles,
  Inbox,
  AlertCircle,
  ShieldCheck,
} from 'lucide-react';

interface WebInquiriesViewProps {
  inquiries: Lead[];
  onStatusChange: (id: string, status: LeadStatus) => Promise<void>;
  onAssignChange: (id: string, assignedTo: LeadRole) => Promise<void>;
  onAddNote: (id: string, text: string) => Promise<void>;
  onDeleteInquiry: (id: string) => Promise<void>;
  darkMode: boolean;
  isAdmin: boolean;
  currentUserName: string;
}

const STATUS_LABELS: Record<LeadStatus, { label: string; color: string; bg: string; border: string }> = {
  nuevo: {
    label: 'Nueva Consulta',
    color: 'text-rose-500 dark:text-rose-400',
    bg: 'bg-rose-500/10',
    border: 'border-rose-500/30',
  },
  en_contacto: {
    label: 'En Contacto',
    color: 'text-blue-500 dark:text-blue-400',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/30',
  },
  cita_agendada: {
    label: 'Cita Agendada',
    color: 'text-purple-500 dark:text-purple-400',
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/30',
  },
  propuesta: {
    label: 'Propuesta Enviada',
    color: 'text-amber-500 dark:text-amber-400',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/30',
  },
  cliente: {
    label: 'Convertido a Cliente',
    color: 'text-emerald-500 dark:text-emerald-400',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/30',
  },
  descartado: {
    label: 'Descartado / Spam',
    color: 'text-slate-400',
    bg: 'bg-slate-500/10',
    border: 'border-slate-500/30',
  },
};

const TEAM_MEMBERS: LeadRole[] = [
  'Lic. Mateo Rossi',
  'Stefi Del Papa',
  'José Anaya',
  'Sin Asignar',
];

export const WebInquiriesView: React.FC<WebInquiriesViewProps> = ({
  inquiries,
  onStatusChange,
  onAssignChange,
  onAddNote,
  onDeleteInquiry,
  darkMode,
  isAdmin,
  currentUserName,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedService, setSelectedService] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [expandedNotesId, setExpandedNotesId] = useState<string | null>(null);
  const [newNoteText, setNewNoteText] = useState('');
  const [submittingNoteId, setSubmittingNoteId] = useState<string | null>(null);

  // Copy to clipboard helper
  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Submit note handler
  const handleSaveNote = async (leadId: string) => {
    if (!newNoteText.trim()) return;
    setSubmittingNoteId(leadId);
    try {
      await onAddNote(leadId, newNoteText.trim());
      setNewNoteText('');
    } finally {
      setSubmittingNoteId(null);
    }
  };

  // Format relative time helper
  const formatTimeAgo = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      const diffMs = Date.now() - date.getTime();
      const diffMin = Math.floor(diffMs / 60000);
      const diffHours = Math.floor(diffMin / 60);
      const diffDays = Math.floor(diffHours / 24);

      if (diffMin < 2) return 'Recién ahora';
      if (diffMin < 60) return `Hace ${diffMin} min`;
      if (diffHours < 24) return `Hace ${diffHours} h`;
      if (diffDays === 1) return 'Ayer';
      if (diffDays < 7) return `Hace ${diffDays} días`;
      return date.toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' });
    } catch {
      return dateStr;
    }
  };

  // Clean phone number for WhatsApp link
  const getWhatsAppLink = (phone: string, name: string, service: string) => {
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    const message = `Hola ${name}, te escribo desde iAtomica en respuesta a tu consulta sobre "${service}". ¿Cómo estás?`;
    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
  };

  // Metrics
  const totalCount = inquiries.length;
  const newCount = inquiries.filter((i) => i.status === 'nuevo').length;
  const inContactCount = inquiries.filter((i) => i.status === 'en_contacto').length;
  const convertedCount = inquiries.filter((i) => i.status === 'cliente' || i.status === 'cita_agendada').length;

  // Filtered inquiries
  const filteredInquiries = inquiries.filter((item) => {
    // Search filter
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      const matchName = item.name.toLowerCase().includes(q);
      const matchEmail = item.email.toLowerCase().includes(q);
      const matchCompany = (item.company || '').toLowerCase().includes(q);
      const matchPhone = (item.phone || '').includes(q);
      const matchMessage = (item.message || '').toLowerCase().includes(q);
      const matchService = (item.service || '').toLowerCase().includes(q);
      if (!matchName && !matchEmail && !matchCompany && !matchPhone && !matchMessage && !matchService) {
        return false;
      }
    }

    // Status filter
    if (selectedStatus !== 'all' && item.status !== selectedStatus) {
      return false;
    }

    // Service filter
    if (selectedService !== 'all' && item.service !== selectedService) {
      return false;
    }

    return true;
  });

  return (
    <div className="space-y-6">
      {/* Top Notification Banner if there are new unread inquiries */}
      {newCount > 0 && (
        <div
          className={`p-4 rounded-2xl border flex items-center justify-between gap-4 transition-all shadow-md animate-fade-in ${
            darkMode
              ? 'bg-gradient-to-r from-rose-950/60 via-slate-900 to-slate-900 border-rose-500/40 text-slate-100'
              : 'bg-gradient-to-r from-rose-50 via-white to-white border-rose-200 text-slate-900'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-500 flex items-center justify-center shrink-0 border border-rose-500/30">
              <AlertCircle size={22} className="animate-pulse" />
            </div>
            <div>
              <h3 className="text-sm font-bold flex items-center gap-2">
                <span>
                  {newCount === 1 ? '1 Consulta Nueva Pendiente' : `${newCount} Consultas Nuevas Pendientes`}
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-rose-500 text-white">
                  URGENTE
                </span>
              </h3>
              <p className={`text-xs mt-0.5 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                Clientes potenciales han enviado solicitudes desde el formulario web o Linktree y esperan respuesta.
              </p>
            </div>
          </div>

          <button
            onClick={() => setSelectedStatus('nuevo')}
            className="px-3.5 py-1.5 rounded-xl text-xs font-bold font-mono gradient-brand text-white shadow-sm shrink-0 cursor-pointer hover:opacity-90"
          >
            Ver Nuevas ({newCount})
          </button>
        </div>
      )}

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div
          className={`p-4 rounded-2xl border ${
            darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-2xs'
          }`}
        >
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider font-mono">Total Consultas</span>
            <Inbox size={16} />
          </div>
          <span className="text-2xl font-black font-heading">{totalCount}</span>
          <span className="text-[11px] block text-slate-400 mt-0.5">Recibidas por web</span>
        </div>

        <div
          className={`p-4 rounded-2xl border ${
            newCount > 0
              ? darkMode
                ? 'bg-rose-950/20 border-rose-500/40 text-rose-400'
                : 'bg-rose-50 border-rose-200 text-rose-700'
              : darkMode
              ? 'bg-slate-900/80 border-slate-800'
              : 'bg-white border-slate-200 shadow-2xs'
          }`}
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-bold uppercase tracking-wider font-mono">Sin Responder</span>
            <div className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
          </div>
          <span className="text-2xl font-black font-heading">{newCount}</span>
          <span className="text-[11px] block opacity-80 mt-0.5">Esperando primer contacto</span>
        </div>

        <div
          className={`p-4 rounded-2xl border ${
            darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-2xs'
          }`}
        >
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider font-mono">En Gestión</span>
            <MessageSquare size={16} className="text-blue-500" />
          </div>
          <span className="text-2xl font-black font-heading">{inContactCount}</span>
          <span className="text-[11px] block text-slate-400 mt-0.5">En conversación activa</span>
        </div>

        <div
          className={`p-4 rounded-2xl border ${
            darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-2xs'
          }`}
        >
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider font-mono">Concretadas</span>
            <CheckCircle2 size={16} className="text-emerald-500" />
          </div>
          <span className="text-2xl font-black font-heading">{convertedCount}</span>
          <span className="text-[11px] block text-slate-400 mt-0.5">Cita o cliente activo</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div
        className={`p-4 rounded-2xl border flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between ${
          darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-2xs'
        }`}
      >
        {/* Search Input */}
        <div className="relative flex-1">
          <Search
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
          />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por cliente, empresa, mensaje, teléfono o email..."
            className={`w-full pl-10 pr-4 py-2 rounded-xl text-xs font-medium border focus:outline-none focus:border-orange-500 transition-colors ${
              darkMode
                ? 'bg-slate-950 border-slate-800 text-white placeholder-slate-500'
                : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'
            }`}
          />
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          {[
            { id: 'all', label: 'Todas' },
            { id: 'nuevo', label: 'Nuevas' },
            { id: 'en_contacto', label: 'En Contacto' },
            { id: 'cita_agendada', label: 'Citas' },
            { id: 'cliente', label: 'Clientes' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedStatus(tab.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                selectedStatus === tab.id
                  ? 'gradient-brand text-white shadow-xs'
                  : darkMode
                  ? 'bg-slate-800 text-slate-400 hover:text-white'
                  : 'bg-slate-100 text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}

          {/* Service Filter Dropdown */}
          <select
            value={selectedService}
            onChange={(e) => setSelectedService(e.target.value)}
            className={`px-2.5 py-1.5 rounded-xl text-xs font-bold font-mono border focus:outline-none focus:border-orange-500 cursor-pointer shrink-0 ${
              darkMode ? 'bg-slate-950 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
            }`}
          >
            <option value="all">Todos los Servicios</option>
            <option value="Consultoría & Asesoramiento">Consultoría</option>
            <option value="Desarrollo de Herramientas IA">Herramientas IA</option>
            <option value="Software a Medida & Apps">Software a Medida</option>
            <option value="Mantenimiento & Control de Calidad (QA)">Mantenimiento & QA</option>
            <option value="Contenido & Comunicación Institucional">Contenido & Marca</option>
          </select>

          {isAdmin && (
            <span
              title="Acceso de Administrador Completo"
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-[10px] font-mono font-bold bg-purple-500/10 text-purple-400 border border-purple-500/20 shrink-0"
            >
              <ShieldCheck size={12} />
              <span>Admin Total</span>
            </span>
          )}
        </div>
      </div>

      {/* Inquiry List */}
      {filteredInquiries.length === 0 ? (
        <div
          className={`py-16 text-center rounded-2xl border ${
            darkMode ? 'bg-slate-900/40 border-slate-800 text-slate-400' : 'bg-white border-slate-200 text-slate-500'
          }`}
        >
          <Inbox size={48} className="mx-auto mb-3 opacity-30" />
          <h4 className="text-base font-bold">No se encontraron consultas</h4>
          <p className="text-xs max-w-sm mx-auto mt-1 opacity-75">
            {searchTerm || selectedStatus !== 'all'
              ? 'Prueba modificando los filtros o el texto de búsqueda.'
              : 'Cuando un visitante complete el formulario de contacto o solicite una demo, aparecerá aquí automáticamente.'}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredInquiries.map((inquiry) => {
            const isNuevo = inquiry.status === 'nuevo';
            const statusConfig = STATUS_LABELS[inquiry.status] || STATUS_LABELS.nuevo;
            const isNotesOpen = expandedNotesId === inquiry.id;

            return (
              <div
                key={inquiry.id}
                className={`p-5 rounded-2xl border transition-all duration-200 ${
                  isNuevo
                    ? darkMode
                      ? 'bg-slate-900/90 border-rose-500/40 shadow-lg shadow-rose-950/20 ring-1 ring-rose-500/20'
                      : 'bg-white border-rose-300 shadow-md ring-1 ring-rose-400/20'
                    : darkMode
                    ? 'bg-slate-900/75 border-slate-800 hover:border-slate-700'
                    : 'bg-white border-slate-200 hover:border-slate-300 shadow-2xs'
                }`}
              >
                {/* Header: Date, Status, Service Tag */}
                <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2">
                    {/* Status Badge */}
                    <div
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold font-mono border ${statusConfig.bg} ${statusConfig.color} ${statusConfig.border}`}
                    >
                      {isNuevo && <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />}
                      <span>{statusConfig.label}</span>
                    </div>

                    {/* Service Tag */}
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-medium font-mono border ${
                        darkMode
                          ? 'bg-slate-800 text-slate-300 border-slate-700'
                          : 'bg-slate-100 text-slate-700 border-slate-200'
                      }`}
                    >
                      {inquiry.service}
                    </span>
                  </div>

                  {/* Relative Time and Timestamp */}
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
                    <Clock size={13} />
                    <span>{formatTimeAgo(inquiry.createdAt)}</span>
                    <span className="hidden sm:inline">
                      ({new Date(inquiry.createdAt).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })})
                    </span>
                  </div>
                </div>

                {/* Main Client Info & Message Block */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
                  
                  {/* Left (8 cols): Client Details & Message */}
                  <div className="lg:col-span-8 space-y-3">
                    
                    {/* Client Name & Company */}
                    <div>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full gradient-brand flex items-center justify-center text-white font-bold text-xs shrink-0 shadow-xs">
                          {inquiry.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <h3 className="font-bold text-base leading-tight font-heading">
                            {inquiry.name}
                          </h3>
                          {inquiry.company ? (
                            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium flex items-center gap-1 mt-0.5">
                              <Building size={12} />
                              <span>{inquiry.company}</span>
                            </span>
                          ) : (
                            <span className="text-xs text-slate-400 italic">Particular / Sin empresa informada</span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Inbound Message Box */}
                    <div
                      className={`p-3.5 rounded-xl border text-xs sm:text-sm leading-relaxed ${
                        darkMode
                          ? 'bg-slate-950/70 border-slate-800/80 text-slate-200'
                          : 'bg-slate-50 border-slate-200/90 text-slate-800'
                      }`}
                    >
                      <p className="font-medium whitespace-pre-wrap">
                        {inquiry.message || 'Sin mensaje adicional (solicitud directa de contacto).'}
                      </p>
                    </div>

                    {/* Contact Badges (Phone / Email) */}
                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      {inquiry.phone && (
                        <div
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-medium border ${
                            darkMode
                              ? 'bg-slate-800/80 border-slate-700 text-slate-200'
                              : 'bg-slate-100 border-slate-200 text-slate-800'
                          }`}
                        >
                          <Phone size={13} className="text-emerald-500" />
                          <span>{inquiry.phone}</span>
                          <button
                            onClick={() => handleCopy(inquiry.phone, `${inquiry.id}-phone`)}
                            title="Copiar teléfono"
                            className="p-1 hover:text-emerald-400 transition-colors cursor-pointer"
                          >
                            {copiedId === `${inquiry.id}-phone` ? (
                              <Check size={13} className="text-emerald-500" />
                            ) : (
                              <Copy size={13} />
                            )}
                          </button>
                        </div>
                      )}

                      {inquiry.email && (
                        <div
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-medium border ${
                            darkMode
                              ? 'bg-slate-800/80 border-slate-700 text-slate-200'
                              : 'bg-slate-100 border-slate-200 text-slate-800'
                          }`}
                        >
                          <Mail size={13} className="text-orange-500" />
                          <span>{inquiry.email}</span>
                          <button
                            onClick={() => handleCopy(inquiry.email, `${inquiry.id}-email`)}
                            title="Copiar email"
                            className="p-1 hover:text-orange-400 transition-colors cursor-pointer"
                          >
                            {copiedId === `${inquiry.id}-email` ? (
                              <Check size={13} className="text-emerald-500" />
                            ) : (
                              <Copy size={13} />
                            )}
                          </button>
                        </div>
                      )}
                    </div>

                  </div>

                  {/* Right (4 cols): Direct Actions & Management Controls */}
                  <div className="lg:col-span-4 space-y-3 pt-2 lg:pt-0 lg:border-l lg:pl-4 border-slate-200 dark:border-slate-800">
                    
                    {/* Primary Action: Direct WhatsApp Chat */}
                    {inquiry.phone && (
                      <a
                        href={getWhatsAppLink(inquiry.phone, inquiry.name, inquiry.service)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                      >
                        <MessageCircle size={15} />
                        <span>Abrir WhatsApp Directo</span>
                        <ExternalLink size={13} className="opacity-75" />
                      </a>
                    )}

                    {/* Secondary Action: Email */}
                    {inquiry.email && (
                      <a
                        href={`mailto:${inquiry.email}?subject=${encodeURIComponent(
                          `Consulta sobre ${inquiry.service} - iAtomica`
                        )}&body=${encodeURIComponent(
                          `Hola ${inquiry.name},\n\nGracias por comunicarte con iAtomica. Recibimos tu consulta sobre "${inquiry.service}".\n\nSaludos cordiales,\n${currentUserName}\niAtomica Tech Studio`
                        )}`}
                        className={`w-full py-2 px-3 rounded-xl font-bold text-xs border flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                          darkMode
                            ? 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700'
                            : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        <Mail size={14} />
                        <span>Enviar Correo</span>
                      </a>
                    )}

                    {/* Workflow Controls: Status & Assignee Dropdowns */}
                    <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-800">
                      <div>
                        <label className="text-[10px] font-bold uppercase tracking-wider font-mono text-slate-400 block mb-1">
                          Estado de Gestión
                        </label>
                        <select
                          value={inquiry.status}
                          onChange={(e) => onStatusChange(inquiry.id, e.target.value as LeadStatus)}
                          className={`w-full px-2.5 py-1.5 rounded-xl text-xs font-bold font-mono border focus:outline-none focus:border-orange-500 cursor-pointer ${
                            darkMode
                              ? 'bg-slate-950 border-slate-800 text-slate-200'
                              : 'bg-white border-slate-200 text-slate-800'
                          }`}
                        >
                          <option value="nuevo">🔴 Nueva Consulta</option>
                          <option value="en_contacto">🔵 En Contacto</option>
                          <option value="cita_agendada">🟣 Cita Agendada</option>
                          <option value="propuesta">🟡 Propuesta Enviada</option>
                          <option value="cliente">🟢 Cliente Concretado</option>
                          <option value="descartado">⚪ Descartado</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-[10px] font-bold uppercase tracking-wider font-mono text-slate-400 block mb-1">
                          Responsable Asignado
                        </label>
                        <select
                          value={inquiry.assignedTo}
                          onChange={(e) => onAssignChange(inquiry.id, e.target.value as LeadRole)}
                          className={`w-full px-2.5 py-1.5 rounded-xl text-xs font-medium font-mono border focus:outline-none focus:border-orange-500 cursor-pointer ${
                            darkMode
                              ? 'bg-slate-950 border-slate-800 text-slate-200'
                              : 'bg-white border-slate-200 text-slate-800'
                          }`}
                        >
                          {TEAM_MEMBERS.map((member) => (
                            <option key={member} value={member}>
                              {member}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Footer Row: Notes Toggle & Delete */}
                    <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-slate-800 text-xs">
                      <button
                        onClick={() => setExpandedNotesId(isNotesOpen ? null : inquiry.id)}
                        className={`font-mono font-bold flex items-center gap-1 transition-colors cursor-pointer ${
                          isNotesOpen
                            ? 'text-orange-500'
                            : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
                        }`}
                      >
                        <MessageSquare size={13} />
                        <span>Notas ({(inquiry.notes || []).length})</span>
                      </button>

                      <button
                        onClick={() => {
                          if (window.confirm(`¿Deseas eliminar la consulta de "${inquiry.name}"?`)) {
                            onDeleteInquiry(inquiry.id);
                          }
                        }}
                        title="Eliminar consulta"
                        className="text-slate-400 hover:text-rose-500 transition-colors p-1 cursor-pointer"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>

                  </div>

                </div>

                {/* Expandable Notes / Follow-Up Bitácora */}
                {isNotesOpen && (
                  <div
                    className={`mt-4 pt-4 border-t space-y-3 ${
                      darkMode ? 'border-slate-800' : 'border-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold uppercase tracking-wider font-mono text-slate-400 flex items-center gap-1.5">
                        <Sparkles size={13} className="text-orange-500" />
                        <span>Bitácora de Seguimiento Comercial</span>
                      </h4>
                    </div>

                    {/* Previous Notes */}
                    <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                      {(inquiry.notes || []).length === 0 ? (
                        <p className="text-xs text-slate-400 italic">No hay notas de seguimiento registradas aún.</p>
                      ) : (
                        inquiry.notes!.map((note) => (
                          <div
                            key={note.id}
                            className={`p-2.5 rounded-xl border text-xs ${
                              darkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
                            }`}
                          >
                            <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono mb-1">
                              <span className="font-bold text-slate-300 dark:text-slate-300">{note.author}</span>
                              <span>{formatTimeAgo(note.timestamp)}</span>
                            </div>
                            <p className="text-slate-200 dark:text-slate-200 whitespace-pre-wrap">{note.text}</p>
                          </div>
                        ))
                      )}
                    </div>

                    {/* Add New Note */}
                    <div className="flex items-center gap-2 pt-1">
                      <input
                        type="text"
                        value={newNoteText}
                        onChange={(e) => setNewNoteText(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleSaveNote(inquiry.id);
                        }}
                        placeholder="Escribe una nota sobre esta consulta (ej: Se llamó el 23/09, demo agendada para el viernes)..."
                        className={`flex-1 px-3 py-2 rounded-xl text-xs border focus:outline-none focus:border-orange-500 ${
                          darkMode
                            ? 'bg-slate-950 border-slate-800 text-white placeholder-slate-500'
                            : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400'
                        }`}
                      />
                      <button
                        onClick={() => handleSaveNote(inquiry.id)}
                        disabled={!newNoteText.trim() || submittingNoteId === inquiry.id}
                        className={`px-3.5 py-2 rounded-xl gradient-brand text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed`}
                      >
                        <Send size={13} />
                        <span>Guardar</span>
                      </button>
                    </div>
                  </div>
                )}

              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
