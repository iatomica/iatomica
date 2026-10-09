import React, { useState } from 'react';
import { 
  Send, 
  CheckCircle2, 
  MessageSquare, 
  Clock, 
  Zap 
} from 'lucide-react';

export const PopArtBooking: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    process: '',
  });

  const [submitted, setSubmitted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate booking submit
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 800);
  };

  const openWhatsApp = () => {
    const text = encodeURIComponent('¡Hola iAtomica! Quiero agendar una asesoría de automatización con IA.');
    window.open(`https://wa.me/5492944000000?text=${text}`, '_blank');
  };

  return (
    <section id="contacto-popart" className="w-full bg-[#F6F1E7] py-20 px-4 sm:px-8 border-b-4 border-black relative">
      <div className="max-w-5xl mx-auto">
        
        {/* Main Box */}
        <div className="bg-white brutalist-border-lg shadow-[12px_12px_0_#111] overflow-hidden">
          
          {/* Header Banner */}
          <div className="bg-[#FF165F] text-white p-6 sm:p-8 border-b-4 border-black flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center space-x-2 bg-black text-[#FFF000] px-2.5 py-0.5 font-mono text-xs font-black uppercase mb-2">
                <Zap size={14} className="fill-[#FFF000]" />
                <span>ASESORÍA 1-A-1 SIN CARGO</span>
              </div>
              <h2 className="font-bebas text-5xl sm:text-6xl text-white tracking-tight leading-none">
                AGENDÁ TU DIAGNÓSTICO DE IA
              </h2>
            </div>

            <div className="flex sm:flex-col items-end gap-1 font-mono text-xs text-neutral-100">
              <span className="flex items-center space-x-1">
                <Clock size={14} />
                <span>DURACIÓN: 30 MINUTOS</span>
              </span>
              <span>100% ONLINE // VÍA GOOGLE MEET</span>
            </div>
          </div>

          {/* Form Content Grid */}
          <div className="p-6 sm:p-10 grid grid-cols-1 md:grid-cols-12 gap-8">
            
            {/* Left: Quick perks & direct WhatsApp */}
            <div className="md:col-span-5 space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <h3 className="font-bebas text-3xl text-black">
                  ¿QUÉ VAS A OBTENER EN LA LLAMADA?
                </h3>

                <ul className="space-y-3 font-mono text-xs text-neutral-800">
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 size={16} className="text-[#00E575] shrink-0 mt-0.5" />
                    <span>Diagnóstico de 3 procesos automatizables en tu empresa.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 size={16} className="text-[#00E575] shrink-0 mt-0.5" />
                    <span>Cálculo estimado de horas y costos que podés ahorrar.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 size={16} className="text-[#00E575] shrink-0 mt-0.5" />
                    <span>Propuesta técnica clara sin tecnicismos innecesarios.</span>
                  </li>
                </ul>
              </div>

              {/* WhatsApp direct trigger */}
              <div className="bg-[#FFF000] p-4 brutalist-border shadow-[4px_4px_0_#111]">
                <span className="font-mono text-xs font-black uppercase text-black block mb-2">
                  ¿PREFERÍS HABLAR DIRECTO POR WHATSAPP?
                </span>
                <button
                  type="button"
                  onClick={openWhatsApp}
                  className="w-full flex items-center justify-center space-x-2 py-2.5 bg-black text-white font-mono text-xs font-bold uppercase tracking-wider brutalist-border shadow-[2px_2px_0_#FFF000] hover:bg-neutral-800 transition-colors cursor-pointer"
                >
                  <MessageSquare size={16} className="text-[#00E575]" />
                  <span>CHATEAR POR WHATSAPP AHORA</span>
                </button>
              </div>
            </div>

            {/* Right: Booking Form */}
            <div className="md:col-span-7 bg-[#F6F1E7] p-6 brutalist-border">
              {submitted ? (
                <div className="text-center py-10 space-y-4">
                  <div className="w-16 h-16 bg-[#00E575] text-black rounded-full flex items-center justify-center mx-auto brutalist-border shadow-[4px_4px_0_#111]">
                    <CheckCircle2 size={36} />
                  </div>
                  <h3 className="font-bebas text-4xl text-black">
                    ¡SOLICITUD ENVIADA CON ÉXITO!
                  </h3>
                  <p className="font-mono text-xs text-neutral-700 max-w-sm mx-auto">
                    Te contactaremos en menos de 2 horas hábiles con el enlace para seleccionar el día y horario que mejor te convenga.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="font-mono text-xs font-bold underline text-black cursor-pointer"
                  >
                    Enviar otra consulta
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block font-mono text-xs font-bold uppercase text-black mb-1">
                      Nombre y Apellido *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="Ej. Lucas Rossi"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full p-2.5 bg-white brutalist-border-sm font-sans text-sm text-black focus:outline-none focus:bg-[#FFF000]/20"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-mono text-xs font-bold uppercase text-black mb-1">
                        Email Corporativo *
                      </label>
                      <input
                        required
                        type="email"
                        placeholder="tu@empresa.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full p-2.5 bg-white brutalist-border-sm font-sans text-sm text-black focus:outline-none focus:bg-[#FFF000]/20"
                      />
                    </div>
                    <div>
                      <label className="block font-mono text-xs font-bold uppercase text-black mb-1">
                        Empresa o Proyecto *
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="Nombre de la empresa"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full p-2.5 bg-white brutalist-border-sm font-sans text-sm text-black focus:outline-none focus:bg-[#FFF000]/20"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-mono text-xs font-bold uppercase text-black mb-1">
                      Teléfono / WhatsApp (Opcional)
                    </label>
                    <input
                      type="tel"
                      placeholder="+54 9 294 4..."
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full p-2.5 bg-white brutalist-border-sm font-sans text-sm text-black focus:outline-none focus:bg-[#FFF000]/20"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-xs font-bold uppercase text-black mb-1">
                      ¿Qué proceso te gustaría automatizar?
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Ej: Atención de clientes en WhatsApp, carga de facturas en el sistema, reportes semanales..."
                      value={formData.process}
                      onChange={(e) => setFormData({ ...formData, process: e.target.value })}
                      className="w-full p-2.5 bg-white brutalist-border-sm font-sans text-sm text-black focus:outline-none focus:bg-[#FFF000]/20"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center space-x-2 py-3.5 bg-[#FF165F] text-white font-bebas text-2xl tracking-wider brutalist-btn cursor-pointer shadow-[4px_4px_0_#111] hover:bg-[#e00d50]"
                  >
                    {loading ? (
                      <span>ENVIANDO SOLICITUD...</span>
                    ) : (
                      <>
                        <span>SOLICITAR ASESORÍA GRATUITA</span>
                        <Send size={18} />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
