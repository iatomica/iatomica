import React from 'react';
import { Star, Award, Quote } from 'lucide-react';

export const PopArtClients: React.FC = () => {
  const testimonials = [
    {
      company: 'PATAGONIA TRAVEL CO.',
      sector: 'Turismo receptivo • Bariloche',
      quote: 'Automatizamos las reservas de excursiones y la atención en WhatsApp. Pasamos de demorar 4 horas en responder a menos de 10 segundos. Las ventas crecieron un 65% en temporada.',
      metric: '+65% VENTAS',
      metricBg: 'bg-[#FFF000]',
      author: 'Martín K. — Director Operativo',
      rotate: '-rotate-1',
    },
    {
      company: 'LOGÍSTICA ANDINA SUR',
      sector: 'Distribución & Supply Chain',
      quote: 'El bot de conciliación de remitos nos ahorra 120 horas por mes. Se acabaron los errores de tipeo y los camiones parados esperando confirmación.',
      metric: '-120 HS/MES',
      metricBg: 'bg-[#00A8F5]',
      author: 'Valeria R. — Jefa de Logística',
      rotate: 'rotate-1',
    },
    {
      company: 'FINTECH CORDILLERA',
      sector: 'Servicios Financieros',
      quote: 'iAtomica nos desarrolló un agente de validación de identidad y scoring preliminar con IA. Lo que antes tardaba 2 días ahora ocurre en 3 minutos.',
      metric: '3 MIN VAL.',
      metricBg: 'bg-[#FF165F]',
      author: 'Esteban M. — CTO',
      rotate: '-rotate-2',
    },
  ];

  const clientLogos = [
    'HOTEL LLAO LLAO',
    'INVAP SUPPLIERS',
    'CERVECERÍA PATAGONIA',
    'CHOCOLATES DEL SUR',
    'ANDES SOFTWARE',
    'GRUPO SAN MARTÍN',
  ];

  return (
    <section id="casos" className="w-full bg-[#F6F1E7] py-20 px-4 sm:px-8 border-b-4 border-black relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center space-x-2 bg-[#00E575] text-black px-3 py-1 font-mono text-xs font-black uppercase brutalist-border shadow-[3px_3px_0_#111] mb-3">
            <Award size={14} />
            <span>CASOS REALES // RESULTADOS MEDIBLES</span>
          </div>

          <h2 className="font-bebas text-5xl sm:text-7xl lg:text-8xl text-black tracking-tight leading-none">
            EMPRESAS QUE YA <span className="text-[#00A8F5] underline decoration-4 decoration-black">ESCALARON</span>
          </h2>
          
          <p className="font-mono text-sm text-neutral-700 max-w-xl mx-auto mt-3 font-bold">
            No promesas. Métricas concretas de organizaciones que confiaron en la ingeniería de iAtomica.
          </p>
        </div>

        {/* Testimonials 3 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {testimonials.map((item, idx) => (
            <div 
              key={idx}
              className={`bg-white brutalist-border-lg p-6 flex flex-col justify-between shadow-[8px_8px_0_#111] transform ${item.rotate} hover:rotate-0 transition-transform`}
            >
              <div>
                <div className="flex items-center justify-between border-b-2 border-black pb-3 mb-4">
                  <div>
                    <h3 className="font-bebas text-2xl text-black leading-none">
                      {item.company}
                    </h3>
                    <span className="font-mono text-[10px] text-neutral-500 uppercase tracking-wider font-bold">
                      {item.sector}
                    </span>
                  </div>
                  <span className={`${item.metricBg} text-black font-mono text-xs font-black px-2 py-0.5 brutalist-border-sm`}>
                    {item.metric}
                  </span>
                </div>

                <Quote size={28} className="text-[#FF165F] mb-2 opacity-60" />

                <p className="font-sans text-sm text-neutral-800 leading-relaxed font-medium italic mb-6">
                  "{item.quote}"
                </p>
              </div>

              <div className="border-t-2 border-neutral-200 pt-3 flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-black">
                  {item.author}
                </span>
                <div className="flex text-[#FF165F]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={12} className="fill-[#FF165F]" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Client Logos / Ticker Banner */}
        <div className="bg-black text-white p-4 brutalist-border shadow-[6px_6px_0_#FFF000]">
          <div className="text-center font-mono text-xs text-[#FFF000] font-black uppercase tracking-widest mb-3">
            // CLIENTES Y MARCAS QUE CONFÍAN EN NUESTRO ECOSISTEMA
          </div>
          <div className="flex flex-wrap items-center justify-around gap-4 font-bebas text-2xl tracking-wider text-neutral-300">
            {clientLogos.map((logo, lIdx) => (
              <span key={lIdx} className="hover:text-[#FFF000] transition-colors cursor-default">
                ★ {logo}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
