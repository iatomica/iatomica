import React, { useState } from 'react';
import { Calendar, MessageSquare, CheckCircle2, Sparkles, Clock, ArrowRight } from 'lucide-react';
import { createLead } from '../services/leadService';

interface BookingContactProps {
  darkMode: boolean;
}

export const BookingContact: React.FC<BookingContactProps> = ({ darkMode }) => {
  const [submitted, setSubmitted] = useState(false);
  const [selectedService, setSelectedService] = useState('Consultoría & Asesoramiento');
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

    // Save lead to CRM Database
    createLead({
      name: formData.name,
      email: formData.email,
      company: formData.company,
      phone: formData.phone,
      service: selectedService,
      message: formData.message
    });

    setSubmitted(true);
  };

  const whatsappUrl = "https://wa.me/5491170142641?text=Hola%20iAtomica,%20quiero%20solicitar%20una%20demo%20de%20sus%20servicios%20de%20consultor%C3%ADa%20y%20desarrollo%20de%20IA.";

  return (
    <section id="contacto" className={`py-24 relative overflow-hidden transition-colors ${
      darkMode ? 'bg-slate-950 text-white' : 'bg-white text-slate-900'
    }`}>
      
      {/* Subtle Faded Grid Background Texture */}
      <div className="absolute inset-0 bg-grid-faded pointer-events-none opacity-30" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Human Messaging */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <div className={`inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full text-xs font-bold border ${
              darkMode 
                ? 'bg-orange-950/40 border-orange-800 text-orange-400' 
                : 'bg-orange-50 border-orange-200 text-orange-600'
            }`}>
              <Sparkles className="w-4 h-4 text-orange-500" />
              <span>Charlemos sobre tu Proyecto</span>
            </div>

            <h2 className={`text-3xl sm:text-5xl font-black tracking-tight leading-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              ¿Cómo Podemos <span className="text-gradient-brand">Ayudar a Tu Empresa</span>?
            </h2>

            <p className={`text-base leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-600 font-medium'}`}>
              Escríbenos o agenda una demo personalizada. Nos encantará conocer a tu equipo y proponerte una solución a medida.
            </p>

            <div className="space-y-4 pt-2">
              <div className={`p-4 rounded-xl border flex items-center space-x-3.5 ${
                darkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200/80 shadow-xs'
              }`}>
                <div className="p-2.5 rounded-lg bg-orange-500/10 text-orange-600 border border-orange-500/20">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold">Respuesta Rápida</h4>
                  <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-600 font-medium'}`}>Te respondemos en menos de 2 horas en horario laboral.</p>
                </div>
              </div>

              {/* Direct WhatsApp Action */}
              <div className={`p-4 rounded-xl border flex items-center space-x-3.5 ${
                darkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200/80 shadow-xs'
              }`}>
                <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold">WhatsApp Directo: +54 9 11 7014-2641</h4>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-orange-600 font-bold hover:underline flex items-center gap-1 mt-0.5"
                  >
                    <span>Iniciar Chat en WhatsApp ahora</span>
                    <ArrowRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className={`lg:col-span-7 p-8 rounded-2xl border ${
            darkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200/90 shadow-sm'
          }`}>
            {submitted ? (
              <div className="py-12 text-center space-y-4 animate-fade-in">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-600 border border-emerald-500/30 flex items-center justify-center mx-auto">
                  <CheckCircle2 size={36} />
                </div>
                <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>¡Solicitud de Demo Registrada!</h3>
                <p className={`text-sm max-w-md mx-auto ${darkMode ? 'text-slate-300' : 'text-slate-600 font-medium'}`}>
                  Muchas gracias por contactarnos. Un especialista de **iAtomica** se comunicará contigo muy pronto para coordinar la presentación.
                </p>
                
                <div className="pt-2 flex justify-center">
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-3 rounded-xl border font-bold text-xs bg-slate-100 hover:bg-slate-200 text-slate-800"
                  >
                    Enviar otra solicitud
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 text-left">
                <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>Agendar Demo / Solicitar Información</h3>
                
                {/* Service Pills */}
                <div>
                  <label className={`text-xs font-bold block mb-2 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>¿En qué podemos ayudarte?</label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      'Consultoría & Asesoramiento',
                      'Desarrollo de Herramientas IA',
                      'Software a Medida & Apps',
                      'Mantenimiento & Control de Calidad (QA)',
                      'Contenido & Comunicación Institucional'
                    ].map(tag => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => setSelectedService(tag)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                          selectedService === tag
                            ? 'gradient-brand text-white border-orange-500 shadow-sm'
                            : darkMode ? 'bg-slate-800 text-slate-300 border-slate-700' : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={`text-xs font-bold block mb-1 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>Nombre Completo *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Ej. María Pérez"
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-xs focus:outline-none focus:border-orange-500 ${
                        darkMode ? 'bg-slate-950 border-slate-800 text-white placeholder-slate-500' : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 font-medium'
                      }`}
                    />
                  </div>

                  <div>
                    <label className={`text-xs font-bold block mb-1 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>Email *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      placeholder="mperez@empresa.com"
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-xs focus:outline-none focus:border-orange-500 ${
                        darkMode ? 'bg-slate-950 border-slate-800 text-white placeholder-slate-500' : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 font-medium'
                      }`}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={`text-xs font-bold block mb-1 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>Empresa u Organización</label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={e => setFormData({ ...formData, company: e.target.value })}
                      placeholder="Nombre de tu empresa"
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-xs focus:outline-none focus:border-orange-500 ${
                        darkMode ? 'bg-slate-950 border-slate-800 text-white placeholder-slate-500' : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 font-medium'
                      }`}
                    />
                  </div>

                  <div>
                    <label className={`text-xs font-bold block mb-1 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>Teléfono / WhatsApp</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+54 9 11 7014 2641"
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-xs focus:outline-none focus:border-orange-500 ${
                        darkMode ? 'bg-slate-950 border-slate-800 text-white placeholder-slate-500' : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 font-medium'
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <label className={`text-xs font-bold block mb-1 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>¿En qué consiste tu idea o necesidad?</label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Cuéntanos brevemente qué te gustaría mejorar o qué sistema necesitas construir..."
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-xs focus:outline-none focus:border-orange-500 ${
                      darkMode ? 'bg-slate-950 border-slate-800 text-white placeholder-slate-500' : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 font-medium'
                    }`}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl gradient-brand text-white font-bold text-xs shadow-lg shadow-orange-500/20 hover:shadow-orange-500/30 transition-all flex items-center justify-center space-x-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Agendar Demo</span>
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};
