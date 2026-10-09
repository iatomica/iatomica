import React from 'react';
import { Search, PenTool, Terminal, Rocket } from 'lucide-react';

export const TastemakerProcess: React.FC = () => {
  const steps = [
    {
      number: '01',
      title: 'Diagnóstico',
      desc: 'Entendemos tu negocio, objetivos y oportunidades.',
      circleBg: 'bg-[#FFE000]',
      textColor: 'text-[#131313]',
      icon: Search,
    },
    {
      number: '02',
      title: 'Diseño',
      desc: 'Proponemos la mejor solución, con un plan claro.',
      circleBg: 'bg-[#168CF5]',
      textColor: 'text-white',
      icon: PenTool,
    },
    {
      number: '03',
      title: 'Desarrollo y QA',
      desc: 'Construimos, iteramos y aseguramos la calidad.',
      circleBg: 'bg-[#FF3D8D]',
      textColor: 'text-white',
      icon: Terminal,
    },
    {
      number: '04',
      title: 'Lanzamiento',
      desc: 'Implementamos, medimos y te acompañamos en la evolución.',
      circleBg: 'bg-[#32C878]',
      textColor: 'text-[#131313]',
      icon: Rocket,
    },
  ];

  return (
    <section id="proceso" className="w-full py-16 sm:py-24 px-4 sm:px-6 bg-[#F6F1E6] border-b border-[#131313]/10">
      <div className="max-w-[1240px] mx-auto">
        
        {/* Header */}
        <div className="mb-14">
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#131313]/60 block mb-1">
            CÓMO TRABAJAMOS
          </span>
          <h2 className="font-anton text-4xl sm:text-5xl text-[#131313] uppercase tracking-tight leading-none">
            DE LA IDEA A <br className="sm:hidden" />
            <span className="bg-[#FFE000] px-2 py-0.5 inline-block border border-[#131313]/20 mt-1">
              RESULTADOS REALES.
            </span>
          </h2>
          <p className="font-sans text-sm text-[#131313]/70 font-medium mt-2 max-w-xl">
            Un proceso simple, claro y colaborativo para transformar tus ideas en soluciones que generan impacto.
          </p>
        </div>

        {/* 4 Steps Timeline Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;

            return (
              <div
                key={step.number}
                className="bg-white border-2 border-[#131313] shadow-[3px_3px_0px_#131313] p-5 rounded-lg flex flex-col justify-between hover:shadow-[5px_5px_0px_#131313] hover:-translate-y-0.5 transition-all"
              >
                <div>
                  {/* Step Top Bar: Number Pill + Icon */}
                  <div className="flex items-center justify-between border-b-2 border-[#131313] pb-3 mb-4">
                    <span className={`w-10 h-10 rounded-full border-2 border-[#131313] flex items-center justify-center font-anton text-lg shadow-[1px_1px_0px_#131313] ${step.circleBg} ${step.textColor}`}>
                      {step.number}
                    </span>
                    <div className="w-9 h-9 bg-[#F6F1E6] border border-[#131313] rounded-md flex items-center justify-center text-[#131313]">
                      <Icon size={18} />
                    </div>
                  </div>

                  <h3 className="font-anton text-2xl text-[#131313] uppercase mb-2">
                    {step.title}
                  </h3>

                  <p className="font-sans text-xs sm:text-sm text-[#131313]/75 leading-relaxed font-medium">
                    {step.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#131313]/10 mt-4 font-mono text-[11px] text-[#131313]/50">
                  PASO {idx + 1} DE 4
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
