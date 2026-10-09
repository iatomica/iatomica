import React from 'react';
import { Target, Lock, ShieldCheck, Users, Zap, CheckCircle2 } from 'lucide-react';

export const EditorialWhyUs: React.FC = () => {
  const differentiators = [
    {
      icon: Target,
      tag: '01. IMPACTO MEDIBLE',
      title: 'Enfoque obsesivo en resultados',
      description: 'No medimos el éxito por líneas de código ni complejidad teórica, sino por horas ahorradas y conversión real para tu negocio.',
    },
    {
      icon: Lock,
      tag: '02. PROPIEDAD TOTAL',
      title: 'Código 100% de tu empresa',
      description: 'Sos el dueño exclusivo de la propiedad intelectual y de tus bases de datos. Cero ataduras a suscripciones cerradas o proveedores cautivos.',
    },
    {
      icon: ShieldCheck,
      tag: '03. ROBUSTEZ TÉCNICA',
      title: 'QA continuo y estabilidad',
      description: 'Construimos arquitecturas diseñadas para producción. Monitoreo constante, pruebas de estrés y tolerancia a fallos.',
    },
    {
      icon: Users,
      tag: '04. TRATO DIRECTO',
      title: 'Comunicación sin intermediarios',
      description: 'Hablas directamente con ingenieros de software y líderes técnicos, sin burocracia ni pérdidas de contexto de agencias tradicionales.',
    },
    {
      icon: Zap,
      tag: '05. AUTOMATIZACIÓN REAL',
      title: 'Soluciones pragmáticas, cero humo',
      description: 'Integramos la IA exactamente donde ahorra costos y agiliza respuestas. Tecnología útil que resuelve problemas cotidianos.',
    },
  ];

  return (
    <section id="por-que" className="w-full py-20 sm:py-28 px-5 sm:px-10 lg:px-14 border-b border-[#131313]/15 bg-white">
      <div className="max-w-[1320px] mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center space-x-2 bg-[#FFE000] border-2 border-[#131313] px-3 py-1 font-mono text-xs font-black uppercase shadow-[2px_2px_0px_#131313] mb-3">
              <span>DIFERENCIALES CONCRETOS</span>
            </div>
            <h2 className="font-anton text-4xl sm:text-6xl text-[#131313] tracking-tight leading-none uppercase">
              ¿POR QUÉ ELEGIR <br />
              <span className="bg-[#FFE000] px-2 py-0.5 inline-block border-2 border-[#131313] shadow-[2px_2px_0px_#131313] mt-1">
                IATOMICA?
              </span>
            </h2>
          </div>

          <p className="font-sans text-base text-[#131313]/80 max-w-md font-medium leading-relaxed">
            Combinamos ingeniería rigurosa con agilidad de startup. Hechos verificables y transparencia desde el primer contacto.
          </p>
        </div>

        {/* Differentiators Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {differentiators.map((item, idx) => {
            const Icon = item.icon;

            return (
              <div
                key={idx}
                className="bg-[#F6F1E6] border-2 border-[#131313] shadow-[4px_4px_0px_#131313] p-6 sm:p-7 flex flex-col justify-between hover:shadow-[7px_7px_0px_#131313] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
              >
                <div>
                  <div className="flex items-center justify-between border-b-2 border-[#131313] pb-3 mb-4">
                    <span className="font-mono text-xs font-black text-[#131313] uppercase tracking-wider">
                      {item.tag}
                    </span>
                    <div className="w-9 h-9 bg-white border border-[#131313] flex items-center justify-center text-[#131313] shadow-[1px_1px_0px_#131313]">
                      <Icon size={18} />
                    </div>
                  </div>

                  <h3 className="font-anton text-2xl text-[#131313] uppercase tracking-tight mb-2">
                    {item.title}
                  </h3>

                  <p className="font-sans text-sm text-[#131313]/75 leading-relaxed font-medium">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#131313]/15 mt-5 flex items-center space-x-1.5 font-mono text-[11px] text-[#32C878] font-bold">
                  <CheckCircle2 size={14} />
                  <span>COMPROMISO GARANTIZADO</span>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
