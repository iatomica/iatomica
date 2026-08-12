import React, { useState } from 'react';
import { Calendar, MessageSquare, CheckCircle2, Sparkles, Clock } from 'lucide-react';

interface BookingContactProps {
  onClose?: () => void;
}

export const BookingContact: React.FC<BookingContactProps> = () => {
  const [submitted, setSubmitted] = useState(false);
  const [selectedService, setSelectedService] = useState('Agentes IA Autónomos');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setSubmitted(true);
  };

  return (
    <section id="contacto" className="py-24 relative bg-slate-950/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Value Prop & Contact Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Agenda una Sesión Técnica de 15 Minutos</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              ¿Listo para <span className="text-gradient-cyan">Automatizar su Empresa</span>?
            </h2>

            <p className="text-slate-400 text-base leading-relaxed">
              Analizamos sus procesos actuales, diseñamos la hoja de ruta técnica y le mostramos cómo implementar Inteligencia Artificial en semanas.
            </p>

            <div className="space-y-4 pt-4">
              <div className="flex items-center space-x-3 p-3.5 rounded-xl glass-panel border border-slate-800">
                <div className="p-2.5 rounded-lg bg-cyan-500/10 text-cyan-400">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Respuesta en &lt; 2 Horas</h4>
                  <p className="text-xs text-slate-400">Un ingeniero técnico evaluará su solicitud.</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-3.5 rounded-xl glass-panel border border-slate-800">
                <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Canal Directo WhatsApp</h4>
                  <a
                    href="https://wa.me/5491100000000?text=Hola%20iAtomica,%20quiero%20consultar%20por%20servicios%20de%20IA"
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-emerald-400 hover:underline font-mono"
                  >
                    +54 9 11 ---- ---- (Click para chatear) &rarr;
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Booking Form */}
          <div className="lg:col-span-7 p-8 rounded-2xl glass-card border border-slate-800/80 bg-slate-950">
            {submitted ? (
              <div className="py-12 text-center space-y-4 animate-fade-in">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
                  <CheckCircle2 size={36} />
                </div>
                <h3 className="text-2xl font-bold text-white">¡Solicitud Recibida!</h3>
                <p className="text-sm text-slate-400 max-w-md mx-auto">
                  Gracias por contactarnos. Un especialista en arquitectura de IA de **iAtomica 2.0** se comunicará a la brevedad para coordinar la reunión demo.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300 hover:text-white"
                >
                  Enviar otra solicitud
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h3 className="text-xl font-bold text-white mb-2">Solicitar Demostración &amp; Auditoría IA</h3>
                
                {/* Service Selector Tags */}
                <div>
                  <label className="text-xs font-mono uppercase text-slate-400 block mb-2">Servicio de Interés:</label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      'Agentes IA Autónomos',
                      'Automatización n8n/Make',
                      'WhatsApp API Bots',
                      'Desarrollo Web/App',
                      'CRM / ERP Custom'
                    ].map(tag => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => setSelectedService(tag)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                          selectedService === tag
                            ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-bold'
                            : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-mono text-slate-400 block mb-1">Nombre Completo *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Ej. Martín González"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono text-slate-400 block mb-1">Email Corporativo *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      placeholder="mgonzalez@empresa.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-mono text-slate-400 block mb-1">Empresa / Organización</label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={e => setFormData({ ...formData, company: e.target.value })}
                      placeholder="Nombre de la empresa"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono text-slate-400 block mb-1">Teléfono / WhatsApp</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+54 9 11 ..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-mono text-slate-400 block mb-1">Detalles del Proyecto o Proceso a Automatizar</label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describa brevemente las tareas manuales o sistemas que le gustaría integrar..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-bold text-xs shadow-xl shadow-cyan-500/25 transition-all flex items-center justify-center space-x-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Confirmar Solicitud de Cita Demo</span>
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
