import React, { useState } from 'react';
import { Calendar, MessageSquare, CheckCircle2, Sparkles, Clock, ArrowRight } from 'lucide-react';

export const BookingContact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [selectedService, setSelectedService] = useState('Comercio Exterior & OCR');
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
    <section id="contacto" className="py-24 relative bg-slate-950/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Messaging & Info */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-mono">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Sesión Inicial de Consultoría Técnica</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              Hablemos de las <span className="text-gradient-brand">Soluciones de su Empresa</span>.
            </h2>

            <p className="text-slate-300 text-base leading-relaxed">
              Analizamos sus flujos de trabajo actuales, evaluamos las áreas de mayor impacto y le mostramos cómo integrar Inteligencia Artificial y software custom.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-center space-x-3 p-4 rounded-xl linear-card border border-slate-800">
                <div className="p-2.5 rounded-lg bg-orange-500/10 text-orange-400 border border-orange-500/20">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Respuesta Técnica en &lt; 2 Horas</h4>
                  <p className="text-xs text-slate-400">Evaluación inicial por parte de nuestros ingenieros.</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-4 rounded-xl linear-card border border-slate-800">
                <div className="p-2.5 rounded-lg bg-purple-500/10 text-purple-300 border border-purple-500/20">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Contacto Directo por WhatsApp</h4>
                  <a
                    href="https://wa.me/5491100000000?text=Hola%20iAtomica,%20quiero%20consultar%20por%20servicios%20de%20IA%20y%20desarrollo"
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-orange-400 hover:underline font-mono flex items-center gap-1 mt-0.5"
                  >
                    <span>Iniciar Chat por WhatsApp</span>
                    <ArrowRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="lg:col-span-7 p-8 rounded-2xl linear-card border border-slate-800 bg-slate-950">
            {submitted ? (
              <div className="py-12 text-center space-y-4 animate-fade-in">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
                  <CheckCircle2 size={36} />
                </div>
                <h3 className="text-2xl font-bold text-white">¡Solicitud Recibida!</h3>
                <p className="text-sm text-slate-300 max-w-md mx-auto">
                  Gracias por escribirnos. Un consultor técnico de **iAtomica 2.0** se comunicará a la brevedad para coordinar la reunión.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300 hover:text-white"
                >
                  Enviar otra consulta
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 text-left">
                <h3 className="text-xl font-bold text-white mb-2">Solicitar Consultoría &amp; Demostración</h3>
                
                {/* Service Pills */}
                <div>
                  <label className="text-xs font-mono uppercase text-slate-400 block mb-2">Área de Interés:</label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      'Comercio Exterior & OCR',
                      'Atención WhatsApp & Stock',
                      'Agentes RAG Privados',
                      'Automatización n8n/Make',
                      'Desarrollo Web / SaaS'
                    ].map(tag => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => setSelectedService(tag)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                          selectedService === tag
                            ? 'gradient-brand text-white border-orange-400 font-bold shadow-lg shadow-orange-500/20'
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
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-orange-500"
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
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-orange-500"
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
                      placeholder="Nombre de su empresa"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-orange-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono text-slate-400 block mb-1">Teléfono / WhatsApp</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+54 9 11 ..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-orange-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-mono text-slate-400 block mb-1">Detalles de su Proyecto o Desafío Operativo</label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describa brevemente qué procesos busca automatizar o qué software necesita desarrollar..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-orange-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl gradient-brand hover:opacity-95 text-white font-bold text-xs shadow-xl shadow-orange-500/20 transition-all flex items-center justify-center space-x-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Enviar Solicitud de Cita</span>
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
