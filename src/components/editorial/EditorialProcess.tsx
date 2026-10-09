import React from 'react';
import { Search, PenTool, Code, Rocket } from 'lucide-react';

export const EditorialProcess: React.FC = () => {
  const steps = [
    {
      number: '01',
      title: 'Diagnóstico',
      colorBg: 'bg-[#FFE000]',
      textColor: 'text-[#131313]',
      icon: Search,
      description: 'Mapeamos tus procesos operativos, cuellos de botella y evaluamos dónde la automatización genera mayor impacto financiero.',
    },
    {
      number: '02',
      title: 'Diseño',
      colorBg: 'bg-[#168CF5]',
      textColor: 'text-white',
      icon: PenTool,
      description: 'Definimos la arquitectura del sistema, flujos de datos y construimos el prototipo interactivo para validar la experiencia.',
    },
    {
      number: '03',
      title: 'Desarrollo y QA',
      colorBg: 'bg-[#FF3D8D]',
      textColor: 'text-white',
      icon: Code,
      description: 'Implementamos el software con código limpio, realizamos pruebas de estrés y conectamos las APIs y modelos necesarios.',
    },
    {
      number: '04',
      title: 'Lanzamiento',
      colorBg: 'bg-[#32C878]',
      textColor: 'text-[#131313]',
      icon: Rocket,
      description: 'Desplegamos en producción segura, entrenamos a tu equipo y monitoreamos las métricas en tiempo real para asegurar el éxito.',
    },
  ];

  return (
    <section id="proceso" className="w-full py-20 sm:py-28 px-5 sm:px-10 lg:px-14 border-b border-[#131313]/15 bg-[#F6F1E6]">
      <div className="max-w-[1320px] mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 bg-[#131313] text-[#FFE000] px-3 py-1 font-mono text-xs font-black uppercase mb-3">
            <span>METODOLOGÍA TRANSPARENTE</span>
          </div>

          <h2 className="font-anton text-4xl sm:text-6xl text-[#131313] tracking-tight leading-none uppercase">
            CÓMO TRABAJAMOS: <br />
            <span className="bg-[#FFE000] px-2 py-0.5 inline-block border-2 border-[#131313] shadow-[2px_2px_0px_#131313] mt-1">
              DE LA IDEA A RESULTADOS REALES.
            </span>
          </h2>

          <p className="font-sans text-base text-[#131313]/80 font-medium leading-relaxed mt-4">
            Sin rodeos ni promesas vacías. Un proceso estructurado en 4 etapas claras con entregables verificables en cada fase.
          </p>
        </div>

        {/* 4-Step Process Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;

            return (
              <div
                key={step.number}
                className="bg-white border-2 border-[#131313] shadow-[4px_4px_0px_#131313] p-6 flex flex-col justify-between relative group hover:shadow-[7px_7px_0px_#131313] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
              >
                {/* Step Top Bar */}
                <div>
                  <div className="flex items-center justify-between border-b-2 border-[#131313] pb-4 mb-5">
                    <span className={`w-12 h-12 rounded-full border-2 border-[#131313] flex items-center justify-center font-anton text-xl shadow-[2px_2px_0px_#131313] ${step.colorBg} ${step.textColor}`}>
                      {step.number}
                    </span>

                    <div className="w-10 h-10 bg-[#F6F1E6] border border-[#131313] flex items-center justify-center text-[#131313]">
                      <Icon size={20} />
                    </div>
                  </div>

                  <h3 className="font-anton text-2xl text-[#131313] tracking-tight leading-tight uppercase mb-2">
                    {step.title}
                  </h3>

                  <p className="font-sans text-sm text-[#131313]/75 leading-relaxed font-medium">
                    {step.description}
                  </p>
                </div>

                {/* Step Bottom Indicator */}
                <div className="pt-4 border-t border-[#131313]/15 mt-5 flex items-center justify-between font-mono text-xs text-[#131313]/50">
                  <span>ETAPA {idx + 1} DE 4</span>
                  {idx < steps.length - 1 && (
                    <span className="hidden lg:inline text-lg text-[#131313]/40">➔</span>
                  )}
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
