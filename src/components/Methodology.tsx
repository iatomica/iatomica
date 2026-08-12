import React from 'react';
import { Compass, Cpu, Code2, Rocket, ArrowRight, Sparkles } from 'lucide-react';

interface Step {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  icon: any;
  color: string;
}

const STEPS: Step[] = [
  {
    number: '01',
    title: 'Auditoría & Discovery',
    subtitle: 'Análisis de Procesos',
    description: 'Auditamos los flujos de trabajo actuales de su empresa, identificamos cuellos de botella manuales y evaluamos el potencial de integración de IA.',
    icon: Compass,
    color: 'text-orange-400 border-orange-500/30 bg-orange-500/10'
  },
  {
    number: '02',
    title: 'Arquitectura de Solución',
    subtitle: 'Diseño de Ingeniería',
    description: 'Diseñamos la hoja de ruta técnica: selección de modelos de IA (RAG/LLMs), estructura de bases de datos, seguridad E2E e integraciones de API.',
    icon: Cpu,
    color: 'text-purple-400 border-purple-500/30 bg-purple-500/10'
  },
  {
    number: '03',
    title: 'Desarrollo & Integración',
    subtitle: 'Construcción Ágil',
    description: 'Desarrollamos el software a medida, configuramos agentes autónomos y los interconectamos con sus sistemas ERP/CRM existentes (Odoo, SAP, etc.).',
    icon: Code2,
    color: 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10'
  },
  {
    number: '04',
    title: 'Despliegue & Escalado',
    subtitle: 'Operación Continua',
    description: 'Puesta en marcha supervisada, capacitación del equipo interno y monitoreo de performance para garantizar escalabilidad operativa.',
    icon: Rocket,
    color: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10'
  }
];

export const Methodology: React.FC = () => {
  return (
    <section id="metodologia" className="py-24 relative bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono mb-4">
            <Sparkles className="w-3.5 h-3.5 text-orange-400" />
            <span>Proceso de Trabajo de Alto Nivel</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Metodología de <span className="text-gradient-brand">Consultoría &amp; Desarrollo</span>
          </h2>
          <p className="mt-4 text-slate-400 text-base sm:text-lg">
            Un marco estructurado y riguroso desde el diagnóstico inicial hasta el despliegue de soluciones en producción.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map((st, idx) => {
            const Icon = st.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl linear-card border border-slate-800 hover:border-orange-500/30 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-2xl font-black text-slate-500 group-hover:text-orange-400 transition-colors">
                      {st.number}
                    </span>
                    <div className={`p-2.5 rounded-xl border ${st.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    {st.subtitle}
                  </span>
                  <h3 className="text-lg font-bold text-white mb-3 group-hover:text-orange-300 transition-colors">
                    {st.title}
                  </h3>

                  <p className="text-xs text-slate-400 leading-relaxed">
                    {st.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-800/80 text-[10px] font-mono text-slate-500 flex items-center justify-between">
                  <span>ETAPA {st.number}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-orange-400 group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
