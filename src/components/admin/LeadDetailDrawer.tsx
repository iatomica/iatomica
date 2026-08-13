import React, { useState } from 'react';
import type { Lead, LeadStatus, LeadRole } from '../../services/leadService';
import { X, Building, Mail, Phone, Calendar, MessageSquare, Send } from 'lucide-react';

interface LeadDetailDrawerProps {
  lead: Lead | null;
  onClose: () => void;
  onStatusChange: (id: string, status: LeadStatus) => void;
  onAssignRole: (id: string, role: LeadRole) => void;
  onAddNote: (id: string, text: string) => void;
  darkMode: boolean;
}

export const LeadDetailDrawer: React.FC<LeadDetailDrawerProps> = ({
  lead,
  onClose,
  onStatusChange,
  onAssignRole,
  onAddNote,
  darkMode
}) => {
  const [newNote, setNewNote] = useState('');

  if (!lead) return null;

  const handleAddNoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim()) return;
    onAddNote(lead.id, newNote.trim());
    setNewNote('');
  };

  const whatsappUrl = `https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}?text=Hola%20${encodeURIComponent(lead.name)},%20te%20contactamos%20desde%20iAtomica%20respecto%20a%20su%20consulta%20de%20${encodeURIComponent(lead.service)}.`;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs animate-fade-in">
      <div className={`w-full max-w-xl h-full border-l shadow-2xl flex flex-col justify-between overflow-hidden transition-colors ${
        darkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
      }`}>
        
        {/* Header */}
        <div className={`p-6 border-b flex items-center justify-between ${
          darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-slate-50 border-slate-200'
        }`}>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-orange-500/10 text-orange-600 border border-orange-500/20">
              {lead.service}
            </span>
            <h3 className="text-xl font-black mt-2 leading-tight">{lead.name}</h3>
            <p className="text-xs text-slate-500 font-medium flex items-center gap-1 mt-0.5">
              <Building size={13} className="text-slate-400" />
              <span>{lead.company || 'Empresa Privada'}</span>
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 p-6 overflow-y-auto space-y-6">
          
          {/* Quick Actions & Status Control */}
          <div className={`p-4 rounded-2xl border space-y-3 ${
            darkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-slate-50 border-slate-200'
          }`}>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Etapa del Pipeline
                </label>
                <select
                  value={lead.status}
                  onChange={(e) => onStatusChange(lead.id, e.target.value as LeadStatus)}
                  className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-xs font-bold focus:outline-none cursor-pointer"
                >
                  <option value="nuevo">1. Nuevo Lead</option>
                  <option value="en_contacto">2. En Contacto</option>
                  <option value="cita_agendada">3. Cita Agendada</option>
                  <option value="propuesta">4. Propuesta Enviada</option>
                  <option value="cliente">5. Cliente Ganado</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Rol Asignado
                </label>
                <select
                  value={lead.assignedTo}
                  onChange={(e) => onAssignRole(lead.id, e.target.value as LeadRole)}
                  className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-xs font-bold text-purple-600 focus:outline-none cursor-pointer"
                >
                  <option value="Atención Público">Atención Público</option>
                  <option value="Consultoría Técnica">Consultoría Técnica</option>
                  <option value="Ventas">Ventas</option>
                  <option value="Sin Asignar">Sin Asignar</option>
                </select>
              </div>
            </div>

            {/* Direct WhatsApp Action Button */}
            {lead.phone && (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md flex items-center justify-center space-x-2 transition-all mt-2"
              >
                <MessageSquare size={14} />
                <span>Contactar por WhatsApp Directo</span>
              </a>
            )}
          </div>

          {/* Contact Details */}
          <div className="space-y-2">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">Datos de Contacto</h4>
            <div className={`p-4 rounded-2xl border space-y-2 font-mono text-xs ${
              darkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-slate-50/60 border-slate-200'
            }`}>
              <div className="flex items-center gap-2">
                <Mail size={14} className="text-orange-500 shrink-0" />
                <span className="font-bold">{lead.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={14} className="text-purple-600 shrink-0" />
                <span>{lead.phone || 'Sin número registrado'}</span>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-slate-500">
                <Calendar size={14} className="shrink-0" />
                <span>Registrado: {new Date(lead.createdAt).toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Client Initial Message */}
          <div className="space-y-2">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">Mensaje de la Consulta</h4>
            <div className={`p-4 rounded-2xl border text-xs leading-relaxed italic ${
              darkMode ? 'bg-slate-900/60 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
            }`}>
              "{lead.message || 'Sin mensaje adicional.'}"
            </div>
          </div>

          {/* Internal Team Notes & Activity Log */}
          <div className="space-y-3 pt-2">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
              <span>Bitácora de Trabajo &amp; Notas Internas</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-500/10 text-purple-600">
                {lead.notes?.length || 0} notas
              </span>
            </h4>

            {/* Existing Notes List */}
            <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
              {(!lead.notes || lead.notes.length === 0) ? (
                <p className="text-xs text-slate-400 italic font-mono py-2">No hay notas registradas para esta consulta.</p>
              ) : (
                lead.notes.map(n => (
                  <div key={n.id} className={`p-3 rounded-xl border text-xs ${
                    darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
                  }`}>
                    <div className="flex items-center justify-between mb-1 text-[11px] font-bold text-purple-600">
                      <span>{n.author}</span>
                      <span className="text-[9px] font-mono text-slate-400">{new Date(n.timestamp).toLocaleTimeString()}</span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-300 font-medium">{n.text}</p>
                  </div>
                ))
              )}
            </div>

            {/* Add Note Form */}
            <form onSubmit={handleAddNoteSubmit} className="pt-2 flex items-center space-x-2">
              <input
                type="text"
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Escribe una nota interna para el equipo..."
                className={`flex-1 px-3.5 py-2.5 rounded-xl border text-xs focus:outline-none focus:border-orange-500 ${
                  darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-slate-900 font-medium'
                }`}
              />
              <button
                type="submit"
                className="px-4 py-2.5 rounded-xl gradient-brand text-white font-bold text-xs shadow-md flex items-center space-x-1 hover:opacity-90"
              >
                <Send size={13} />
              </button>
            </form>
          </div>

        </div>

      </div>
    </div>
  );
};
