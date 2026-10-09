import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, MessageSquare } from 'lucide-react';

interface TastemakerContactProps {
  onOpenBookingModal?: () => void;
}

export const TastemakerContact: React.FC<TastemakerContactProps> = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  const openWhatsApp = () => {
    const text = encodeURIComponent('¡Hola iAtomica! Quiero consultar por un proyecto de software y automatización.');
    window.open(`https://wa.me/5492944000000?text=${text}`, '_blank');
  };

  return (
    <section id="contacto" className="w-full py-16 sm:py-24 px-4 sm:px-6 bg-[#F6F1E6] border-b border-[#131313]/10">
      <div className="max-w-[1240px] mx-auto">
        
        {/* Yellow Banner Card matching Reference Image */}
        <div className="relative bg-[#FFE000] border-3 border-[#131313] shadow-[8px_8px_0px_#131313] rounded-2xl overflow-hidden min-h-[380px] sm:min-h-[440px] flex flex-col justify-between p-6 sm:p-12">
          
          {/* Background Right: Hiker overlooking Bariloche alpine lake */}
          <div className="absolute top-0 right-0 w-full sm:w-[58%] h-full pointer-events-none opacity-85 sm:opacity-95">
            <img
              src="/images/collage/bariloche_hiker_contact.jpg"
              alt="Viajero contemplando el lago y montañas de Bariloche"
              className="w-full h-full object-cover object-center"
            />
            {/* Gradient mask to blend smoothly into the yellow background */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#FFE000] via-[#FFE000]/70 to-transparent sm:via-[#FFE000]/40"></div>
          </div>

          {/* Left Content */}
          <div className="relative z-10 max-w-xl space-y-4">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#131313]/80 block">
              CONTACTO
            </span>

            <h2 className="font-anton text-4xl sm:text-6xl text-[#131313] uppercase tracking-tight leading-[0.95]">
              HABLEMOS DE TU <br />
              <span className="underline decoration-4 decoration-[#131313] underline-offset-4">
                PRÓXIMO PROYECTO.
              </span>
            </h2>

            <p className="font-sans text-base sm:text-lg text-[#131313]/90 leading-relaxed font-semibold max-w-md">
              Cuéntanos tu idea y te ayudamos a convertirla en una solución real.
            </p>

            {/* Email Quick Action / Form */}
            {submitted ? (
              <div className="bg-white border-2 border-[#131313] p-4 rounded-xl shadow-[3px_3px_0px_#131313] flex items-center space-x-3 max-w-md">
                <CheckCircle2 size={24} className="text-[#32C878] shrink-0" />
                <span className="font-sans font-bold text-sm text-[#131313]">
                  ¡Gracias! Te contactaremos a la brevedad.
                </span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2.5 max-w-md pt-2">
                <input
                  required
                  type="email"
                  placeholder="tu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-4 py-3 bg-white border-2 border-[#131313] rounded-full font-sans text-sm text-[#131313] placeholder-[#131313]/50 focus:outline-none shadow-sm"
                />
                <button
                  type="submit"
                  className="flex items-center justify-center space-x-2 px-6 py-3 bg-[#131313] text-white font-sans font-bold text-xs uppercase tracking-wide rounded-full border-2 border-[#131313] shadow-[2px_2px_0px_#131313] hover:bg-neutral-800 transition-colors cursor-pointer"
                >
                  <span>Solicitar asesoría gratuita</span>
                  <ArrowRight size={14} />
                </button>
              </form>
            )}

            <div className="pt-2">
              <button
                type="button"
                onClick={openWhatsApp}
                className="inline-flex items-center space-x-1.5 font-sans text-xs font-bold text-[#131313] underline hover:text-neutral-800 cursor-pointer"
              >
                <MessageSquare size={14} />
                <span>¿Preferís WhatsApp? Escribinos directamente aquí</span>
              </button>
            </div>
          </div>

          {/* Bottom Annotation Note */}
          <div className="relative z-10 pt-6">
            <span className="font-caveat text-xl sm:text-2xl font-bold text-[#131313] -rotate-1 inline-block">
              ✎ IDEAS QUE SE CONVIERTEN EN SOLUCIONES REALES ➔
            </span>
          </div>

        </div>

      </div>
    </section>
  );
};
