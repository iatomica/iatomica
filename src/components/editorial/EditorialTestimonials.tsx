import React from 'react';
import { Quote, Star } from 'lucide-react';

export const EditorialTestimonials: React.FC = () => {
  const testimonials = [
    {
      company: 'Patagonia Travel Co.',
      author: 'Martín K.',
      role: 'Director Operativo',
      location: 'San Carlos de Bariloche',
      quote: 'Automatizamos las reservas de excursiones y la atención en WhatsApp. Pasamos de demorar hasta 4 horas en responder a menos de 10 segundos. Las ventas crecieron un 65% en temporada.',
      metric: '+65% VENTAS',
      metricBg: 'bg-[#FFE000]',
    },
    {
      company: 'Logística Andina Sur',
      author: 'Valeria R.',
      role: 'Jefa de Logística',
      location: 'Neuquén / Río Negro',
      quote: 'El bot de conciliación de remitos nos ahorra 120 horas por mes. Se acabaron los errores de tipeo y los camiones parados esperando confirmación de despacho.',
      metric: '-120 HS / MES',
      metricBg: 'bg-[#168CF5] text-white',
    },
    {
      company: 'Fintech Cordillera',
      author: 'Esteban M.',
      role: 'CTO & Co-Founder',
      location: 'Buenos Aires / Remoto',
      quote: 'iAtomica nos desarrolló un agente de validación de identidad y scoring preliminar con IA. Lo que antes tardaba 2 días ahora ocurre en 3 minutos de forma segura.',
      metric: '3 MIN VALIDACIÓN',
      metricBg: 'bg-[#FF3D8D] text-white',
    },
  ];

  return (
    <section className="w-full py-20 sm:py-28 px-5 sm:px-10 lg:px-14 border-b border-[#131313]/15 bg-[#F6F1E6]">
      <div className="max-w-[1320px] mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 bg-[#131313] text-[#FFE000] px-3 py-1 font-mono text-xs font-black uppercase mb-3">
            <span>PRUEBAS SOCIALES // IMPACTO</span>
          </div>

          <h2 className="font-anton text-4xl sm:text-6xl text-[#131313] tracking-tight leading-none uppercase">
            LO QUE DICEN <br />
            <span className="bg-[#FFE000] px-2 py-0.5 inline-block border-2 border-[#131313] shadow-[2px_2px_0px_#131313] mt-1">
              NUESTROS CLIENTES.
            </span>
          </h2>

          <p className="font-sans text-base text-[#131313]/80 font-medium leading-relaxed mt-4">
            Testimonios reales con nombres, cargos y resultados comprobables en producción.
          </p>
        </div>

        {/* Testimonials 3 Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((item, idx) => (
            <div
              key={idx}
              className="bg-white border-2 border-[#131313] shadow-[4px_4px_0px_#131313] p-6 sm:p-7 flex flex-col justify-between hover:shadow-[7px_7px_0px_#131313] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
            >
              <div>
                {/* Card Top: Metric Badge */}
                <div className="flex items-center justify-between border-b-2 border-[#131313] pb-3 mb-5">
                  <div>
                    <span className="font-anton text-xl text-[#131313] uppercase block leading-none">
                      {item.company}
                    </span>
                    <span className="font-mono text-[10px] text-[#131313]/60 uppercase">
                      {item.location}
                    </span>
                  </div>

                  <span className={`font-mono text-xs font-black px-2 py-0.5 border border-[#131313] shadow-[1px_1px_0px_#131313] ${item.metricBg}`}>
                    {item.metric}
                  </span>
                </div>

                <Quote size={28} className="text-[#168CF5] mb-3 opacity-70" />

                <p className="font-sans text-sm text-[#131313]/85 leading-relaxed font-medium italic mb-6">
                  "{item.quote}"
                </p>
              </div>

              {/* Author footer */}
              <div className="pt-4 border-t border-[#131313]/15 flex items-center justify-between">
                <div>
                  <span className="font-sans font-bold text-sm text-[#131313] block">
                    {item.author}
                  </span>
                  <span className="font-mono text-xs text-[#131313]/60">
                    {item.role}
                  </span>
                </div>

                <div className="flex text-[#FFE000]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className="fill-[#FFE000] text-[#131313]" />
                  ))}
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
