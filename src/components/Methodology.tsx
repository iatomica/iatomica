import React from 'react';
import { MessageCircle, Compass, Code2, HeartHandshake, ArrowRight } from 'lucide-react';

interface Step {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  icon: any;
}

const STEPS: Step[] = [
  {
    number: '01',
    title: 'Conversación & Diagnóstico',
    subtitle: 'Escuchamos tus necesidades',
    description: 'Nos reunimos para entender la rutina de tu empresa, los problemas a resolver y las áreas donde la tecnología te dará mejores resultados.',
    icon: MessageCircle,
  },
  {
    number: '02',
    title: 'Diseño de la Solución',
    subtitle: 'Plan transparente',
    description: 'Diseñamos la estrategia y el prototipo de la herramienta o contenido. Te explicamos de forma sencilla qué haremos y cuánto tiempo tomará.',
    icon: Compass,
  },
  {
    number: '03',
    title: 'Desarrollo & Pruebas de Calidad',
    subtitle: 'Construcción profesional',
    description: 'Creamos el software, configuramos las herramientas de IA y realizamos controles de calidad (QA) estrictos para garantizar que funcione perfecto.',
    icon: Code2,
  },
  {
    number: '04',
    title: 'Puesta en Marcha & Soporte',
    subtitle: 'Acompañamiento continuo',
    description: 'Implementamos la solución con tu equipo, los capacitamos en su uso y nos quedamos a tu lado ofreciendo mantenimiento y mejoras constantes.',
    icon: HeartHandshake,
  }
];

interface MethodologyProps {
  darkMode: boolean;
}

export const Methodology: React.FC<MethodologyProps> = () => {
  return (
    <section id="metodologia" className="py-24 relative bg-slate-950 text-white overflow-hidden">
      
      {/* Faded Background Grid Texture */}
      <div className="absolute inset-0 bg-grid-faded pointer-events-none opacity-40" />

      {/* Ambient Glows */}
      <div className="absolute top-1/2 left-1/3 w-96 h-96 bg-purple-600/20 rounded-full filter blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-purple-400 bg-purple-500/10 px-4 py-1.5 rounded-full border border-purple-500/30 shadow-lg shadow-purple-500/10">
            Nuestra Forma de Trabajo
          </span>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white mt-4">
            Un Proceso Simple, Claro y <span className="text-gradient-brand">Sin Complicaciones</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300">
            Te acompañamos paso a paso para que la transformación tecnológica de tu empresa sea ágil y segura.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map((st, idx) => {
            const Icon = st.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-900/90 backdrop-blur-md border border-slate-800 hover:border-orange-500/40 shadow-xl flex flex-col justify-between group transition-all duration-300 hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-3xl font-black text-orange-500">
                      {st.number}
                    </span>
                    <div className="p-3 rounded-2xl bg-orange-500/10 text-orange-400 border border-orange-500/20">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <span className="text-xs font-bold text-purple-400 block mb-1">
                    {st.subtitle}
                  </span>
                  <h3 className="text-lg font-bold text-white mb-3">
                    {st.title}
                  </h3>

                  <p className="text-xs leading-relaxed text-slate-300">
                    {st.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-800 text-[11px] font-bold text-slate-400 flex items-center justify-between">
                  <span>PASO {st.number}</span>
                  <ArrowRight className="w-4 h-4 text-orange-400 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* SVG Wave Divider Transition to Section 5 (BookingContact) */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none pointer-events-none">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block w-full h-14 text-purple-100/60 fill-current"
        >
          <path d="M0,0 C300,90 600,-40 900,40 C1050,80 1150,20 1200,30 L1200,120 L0,120 Z"></path>
        </svg>
      </div>
    </section>
  );
};
