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

export const Methodology: React.FC<MethodologyProps> = ({ darkMode }) => {
  return (
    <section id="metodologia" className={`py-24 relative overflow-hidden transition-colors ${
      darkMode ? 'bg-slate-900/90 border-y border-slate-800 text-white' : 'bg-purple-50/50 border-y border-purple-100/80 text-slate-900'
    }`}>
      
      {/* Subtle Architectural Grid Texture */}
      <div className="absolute inset-0 bg-grid-subtle pointer-events-none opacity-40" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-purple-600 bg-purple-500/10 px-3.5 py-1.5 rounded-full border border-purple-500/20">
            Nuestra Forma de Trabajo
          </span>
          <h2 className={`text-3xl sm:text-5xl font-black tracking-tight mt-4 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            Un Proceso Simple, Claro y <span className="text-gradient-brand">Sin Complicaciones</span>
          </h2>
          <p className={`mt-4 text-base sm:text-lg ${darkMode ? 'text-slate-300' : 'text-slate-600 font-medium'}`}>
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
                className={`p-6 rounded-2xl clean-card flex flex-col justify-between group ${
                  darkMode ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-200/90 shadow-sm hover:shadow-md'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-2xl font-black text-orange-500">
                      {st.number}
                    </span>
                    <div className="p-3 rounded-2xl bg-orange-500/10 text-orange-600 border border-orange-500/20">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <span className="text-xs font-bold text-purple-600 block mb-1">
                    {st.subtitle}
                  </span>
                  <h3 className={`text-lg font-bold mb-3 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                    {st.title}
                  </h3>

                  <p className={`text-xs leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600 font-medium'}`}>
                    {st.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800 text-[11px] font-bold text-slate-400 flex items-center justify-between">
                  <span>PASO {st.number}</span>
                  <ArrowRight className="w-4 h-4 text-orange-500 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
