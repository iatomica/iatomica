import React from 'react';
import { Target, Sparkles, Puzzle, Handshake, Zap, MessageSquare } from 'lucide-react';

export const TastemakerBenefits: React.FC = () => {
  const benefits = [
    {
      title: 'Enfoque en resultados reales',
      icon: Target,
      desc: 'Medimos el impacto en tiempo ahorrado, conversión y crecimiento concreto de tu negocio.',
    },
    {
      title: 'Experiencia multidisciplinaria',
      icon: Sparkles,
      desc: 'Combinamos visión de producto, diseño editorial e ingeniería de software de alto nivel.',
    },
    {
      title: 'Soluciones a medida',
      icon: Puzzle,
      desc: 'Construimos sistemas adaptados a tus procesos particulares, sin forzarte a plantillas rígidas.',
    },
    {
      title: 'Acompañamiento continuo',
      icon: Handshake,
      desc: 'Soporte, evolución técnica y capacitación cercana para tu equipo en cada etapa.',
    },
    {
      title: 'Tecnología de vanguardia',
      icon: Zap,
      desc: 'Modelos de IA modernos, arquitecturas cloud robustas y código limpio 100% propietario.',
    },
    {
      title: 'Comunicación clara y transparente',
      icon: MessageSquare,
      desc: 'Trato directo con los desarrolladores, sin intermediarios ni jerga técnica innecesaria.',
    },
  ];

  return (
    <section id="beneficios" className="w-full py-16 sm:py-24 px-4 sm:px-6 bg-[#F6F1E6] border-b border-[#131313]/10">
      <div className="max-w-[1240px] mx-auto">
        
        {/* Header */}
        <div className="mb-12">
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#131313]/60 block mb-1">
            BENEFICIOS
          </span>
          <h2 className="font-anton text-4xl sm:text-5xl text-[#131313] uppercase tracking-tight leading-none">
            ¿POR QUÉ ELEGIR <br className="sm:hidden" />
            <span className="bg-[#FFE000] px-2 py-0.5 inline-block border border-[#131313]/20 mt-1">
              IATOMICA?
            </span>
          </h2>
        </div>

        {/* 6 Boxes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {benefits.map((b, idx) => {
            const Icon = b.icon;

            return (
              <div
                key={idx}
                className="bg-white border-2 border-[#131313] shadow-[3px_3px_0px_#131313] p-5 rounded-lg flex flex-col justify-between hover:shadow-[5px_5px_0px_#131313] hover:-translate-y-0.5 transition-all"
              >
                <div>
                  <div className="w-10 h-10 bg-[#FFE000] border border-[#131313] rounded-md flex items-center justify-center text-[#131313] mb-3.5 shadow-[1px_1px_0px_#131313]">
                    <Icon size={20} />
                  </div>

                  <h3 className="font-anton text-xl text-[#131313] uppercase leading-snug mb-2">
                    {b.title}
                  </h3>

                  <p className="font-sans text-xs sm:text-sm text-[#131313]/75 leading-relaxed font-medium">
                    {b.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
