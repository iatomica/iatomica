import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

export const TastemakerFAQ: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: '¿Con qué tipo de empresas trabajan?',
      a: 'Trabajamos con pymes, startups y empresas en crecimiento de diversas industrias: turismo, salud, legaltech, comercio y servicios profesionales. Adaptamos la escala técnica al tamaño de tu operación.',
    },
    {
      q: '¿Cuánto dura un proyecto?',
      a: 'Una automatización puntual o chatbot de WhatsApp suele tomar de 2 a 3 semanas. Una plataforma web a medida o sistema integrado completo toma entre 6 y 8 semanas con entregas quincenales.',
    },
    {
      q: '¿También ofrecen soporte después del lanzamiento?',
      a: 'Sí. Brindamos planes de mantenimiento continuo, soporte técnico con SLA garantizado, monitoreo y horas de evolución mensual para sumar mejoras.',
    },
    {
      q: '¿Necesito tener conocimientos técnicos?',
      a: 'Para nada. Nosotros nos encargamos de toda la arquitectura, código e integraciones. Te explicamos cada decisión en lenguaje de negocio claro y capacitamos a tu equipo para operar las herramientas con facilidad.',
    },
  ];

  return (
    <section id="faq" className="w-full py-16 sm:py-24 px-4 sm:px-6 bg-[#F6F1E6] border-b border-[#131313]/10">
      <div className="max-w-[960px] mx-auto">
        
        {/* Header */}
        <div className="mb-12">
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#131313]/60 block mb-1">
            FAQ
          </span>
          <h2 className="font-anton text-4xl sm:text-5xl text-[#131313] uppercase tracking-tight leading-none">
            PREGUNTAS <br className="sm:hidden" />
            <span className="bg-[#FFE000] px-2 py-0.5 inline-block border border-[#131313]/20 mt-1">
              FRECUENTES
            </span>
          </h2>
        </div>

        {/* 4 Accordions */}
        <div className="space-y-3.5">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;

            return (
              <div
                key={idx}
                className="bg-white border-2 border-[#131313] shadow-[2px_2px_0px_#131313] rounded-lg overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full min-h-[56px] px-5 py-4 flex items-center justify-between text-left cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="font-sans font-bold text-base sm:text-lg text-[#131313] pr-4">
                    {faq.q}
                  </span>
                  
                  <div className="w-7 h-7 rounded-full bg-[#F6F1E6] border border-[#131313] flex items-center justify-center shrink-0 text-[#131313]">
                    {isOpen ? <Minus size={15} /> : <Plus size={15} />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 border-t border-[#131313]/10 font-sans text-sm text-[#131313]/75 leading-relaxed font-medium">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
