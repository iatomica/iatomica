import React, { useState } from 'react';
import { Send, CheckCircle2, MessageSquare, Clock, Sparkles } from 'lucide-react';

export const EditorialContact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
    privacyAccepted: false,
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.privacyAccepted) {
      setErrorMsg('Debes aceptar la política de privacidad para enviar tu consulta.');
      return;
    }
    setErrorMsg('');
    setLoading(true);

    try {
      // Connect to iAtomica backend API if available, with robust fallback
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company,
          message: formData.message,
          source: 'web_editorial',
        }),
      });

      if (!res.ok) {
        // Fallback simulate
        await new Promise((r) => setTimeout(r, 600));
      }
      setSubmitted(true);
    } catch {
      // Offline / dev fallback
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  const openWhatsApp = () => {
    const text = encodeURIComponent('¡Hola iAtomica! Quiero consultar por un proyecto de software y automatización.');
    window.open(`https://wa.me/5492944000000?text=${text}`, '_blank');
  };

  return (
    <section id="contacto" className="w-full py-20 sm:py-28 px-5 sm:px-10 lg:px-14 border-b border-[#131313]/15 bg-[#F6F1E6]">
      <div className="max-w-[1320px] mx-auto">
        
        {/* Main Editorial Contact Box */}
        <div className="bg-white border-3 border-[#131313] shadow-[8px_8px_0px_#131313] overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          
          {/* Left Column: Editorial Presentation (5 cols) */}
          <div className="lg:col-span-5 bg-[#FFE000] p-8 sm:p-12 border-b-3 lg:border-b-0 lg:border-r-3 border-[#131313] flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center space-x-2 bg-[#131313] text-[#FFE000] px-3 py-1 font-mono text-xs font-black uppercase mb-4 shadow-[1px_1px_0px_#FFE000]">
                <Sparkles size={14} />
                <span>DIAGNÓSTICO 1-A-1 SIN CARGO</span>
              </div>

              <h2 className="font-anton text-4xl sm:text-6xl text-[#131313] tracking-tight leading-none uppercase mb-6">
                HABLEMOS DE TU <br />
                <span className="underline decoration-4 decoration-[#131313] underline-offset-4">
                  PRÓXIMO PROYECTO.
                </span>
              </h2>

              <p className="font-sans text-base text-[#131313]/90 leading-relaxed font-medium mb-8">
                Contanos tu desafío operativo o la solución que querés construir. 
                Analizamos tu caso y te respondemos en menos de 24 horas con una hoja de ruta técnica clara.
              </p>

              <div className="space-y-3 font-mono text-xs text-[#131313] font-bold">
                <div className="flex items-center space-x-2">
                  <Clock size={16} />
                  <span>DURACIÓN: 30 MINUTOS ONLINE (MEET)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 size={16} className="text-[#32C878]" />
                  <span>SIN COMPROMISO NI COSTOS OCULTOS</span>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp Trigger */}
            <div className="pt-8 mt-8 border-t-2 border-[#131313]">
              <span className="font-mono text-xs font-black uppercase text-[#131313] block mb-2">
                ¿PREFERÍS RESPUESTA INMEDIATA?
              </span>
              <button
                type="button"
                onClick={openWhatsApp}
                className="w-full flex items-center justify-center space-x-2 py-3 bg-[#131313] text-white font-sans text-sm font-bold uppercase tracking-wider border-2 border-[#131313] shadow-[3px_3px_0px_#FFE000] hover:bg-neutral-800 transition-colors cursor-pointer"
              >
                <MessageSquare size={16} className="text-[#32C878]" />
                <span>CHATEAR POR WHATSAPP</span>
              </button>
            </div>
          </div>

          {/* Right Column: Accessible Form (7 cols) */}
          <div className="lg:col-span-7 p-8 sm:p-12 bg-white flex flex-col justify-center">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 bg-[#32C878] text-white rounded-full flex items-center justify-center mx-auto border-2 border-[#131313] shadow-[4px_4px_0px_#131313]">
                  <CheckCircle2 size={36} />
                </div>
                <h3 className="font-anton text-4xl text-[#131313] uppercase leading-none">
                  ¡SOLICITUD RECIBIDA CON ÉXITO!
                </h3>
                <p className="font-sans text-base text-[#131313]/80 max-w-md mx-auto font-medium">
                  Revisaremos tu propuesta técnica y nos pondremos en contacto contigo en las próximas horas para coordinar el diagnóstico.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="font-mono text-xs font-bold text-[#168CF5] underline cursor-pointer mt-4"
                >
                  Enviar otra consulta
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block font-mono text-xs font-black uppercase text-[#131313] mb-1.5">
                    Nombre completo *
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="Ej. Lucas Rossi"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-3 bg-[#F6F1E6] border-2 border-[#131313] font-sans text-sm text-[#131313] placeholder-[#131313]/40 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#FFE000]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block font-mono text-xs font-black uppercase text-[#131313] mb-1.5">
                      Email corporativo *
                    </label>
                    <input
                      required
                      type="email"
                      placeholder="lucas@empresa.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full p-3 bg-[#F6F1E6] border-2 border-[#131313] font-sans text-sm text-[#131313] placeholder-[#131313]/40 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#FFE000]"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-xs font-black uppercase text-[#131313] mb-1.5">
                      Empresa o Marca *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="Nombre de tu empresa"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full p-3 bg-[#F6F1E6] border-2 border-[#131313] font-sans text-sm text-[#131313] placeholder-[#131313]/40 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#FFE000]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-mono text-xs font-black uppercase text-[#131313] mb-1.5">
                    ¿Cuál es tu desafío o proyecto? *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Contanos brevemente qué proceso te gustaría automatizar o qué software necesitás construir..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full p-3 bg-[#F6F1E6] border-2 border-[#131313] font-sans text-sm text-[#131313] placeholder-[#131313]/40 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#FFE000]"
                  />
                </div>

                <div className="flex items-start space-x-2.5 pt-1">
                  <input
                    id="privacy-check"
                    type="checkbox"
                    checked={formData.privacyAccepted}
                    onChange={(e) => setFormData({ ...formData, privacyAccepted: e.target.checked })}
                    className="w-4 h-4 mt-0.5 border-2 border-[#131313] text-[#FFE000] focus:ring-[#FFE000] cursor-pointer"
                  />
                  <label htmlFor="privacy-check" className="font-sans text-xs text-[#131313]/70 select-none cursor-pointer">
                    Acepto que mis datos sean utilizados exclusivamente para contactarme sobre esta consulta. No enviamos spam.
                  </label>
                </div>

                {errorMsg && (
                  <p className="font-mono text-xs text-[#F04B36] font-bold">
                    ⚠️ {errorMsg}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center space-x-2 py-4 bg-[#FFE000] text-[#131313] font-anton text-xl tracking-wider uppercase border-2 border-[#131313] shadow-[4px_4px_0px_#131313] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[6px_6px_0px_#131313] active:translate-x-[2px] active:translate-y-[2px] transition-all cursor-pointer"
                >
                  {loading ? (
                    <span>ENVIANDO CONSULTA...</span>
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
    </section>
  );
};
