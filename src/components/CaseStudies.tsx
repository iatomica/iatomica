import React from 'react';
import { Award, Building2 } from 'lucide-react';

interface CaseStudy {
  client: string;
  industry: string;
  challenge: string;
  solution: string;
  metrics: { label: string; value: string }[];
  tag: string;
}

const CASES: CaseStudy[] = [
  {
    client: 'Empresa Internacional de Comercio Exterior & Logística',
    industry: 'Import / Export & Trading',
    tag: 'Agentes IA + OCR + ERP',
    challenge: 'Procesamiento manual de más de 1.200 facturas comerciales y packing lists mensuales provenientes de China en RMB/USD.',
    solution: 'Desarrollo de pipeline autónomo con OCR Vision RAG que lee facturas PDF, valida contra Órdenes de Compra e inyecta directamente en el ERP.',
    metrics: [
      { label: 'Tiempo de Carga', value: '-92%' },
      { label: 'Precisión de Datos', value: '99.9%' },
      { label: 'Ahorro Anual', value: '+$45,000 USD' }
    ]
  },
  {
    client: 'Distribuidora Mayorista Multicanal',
    industry: 'Retail & Distribución',
    tag: 'WhatsApp API + RAG Stock',
    challenge: 'Saturación del equipo comercial atendiendo consultas repetitivas de precios, stock y solicitudes de cotizaciones por WhatsApp.',
    solution: 'Despliegue de Agente IA de Ventas 24/7 conectado a la base de datos de depósito que genera cotizaciones PDF en tiempo real.',
    metrics: [
      { label: 'Ventas Automáticas 24/7', value: '+35%' },
      { label: 'Tiempo de Respuesta', value: '<5 seg' },
      { label: 'Atención Simultánea', value: 'Ilimitada' }
    ]
  },
  {
    client: 'Firma de Servicios Financieros & Consultoría',
    industry: 'FinTech & LegalTech',
    tag: 'Copiloto RAG Enterprise',
    challenge: 'Dificultad para auditar y consultar más de 40.000 contratos de proveedores y acuerdos marcos de forma rápida.',
    solution: 'Implementación de buscador semántico vectorial seguro con enrutador de modelos (Claude + GPT) para extraer cláusulas clave al instante.',
    metrics: [
      { label: 'Búsqueda en Contratos', value: '<2 seg' },
      { label: 'Horas Legales Ahorradas', value: '1,400 hs/año' },
      { label: 'Seguridad', value: '100% On-Premise' }
    ]
  }
];

export const CaseStudies: React.FC = () => {
  return (
    <section id="casos" className="py-24 relative bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono mb-4">
            <Award className="w-3.5 h-3.5" />
            <span>Casos de Éxito &amp; Métricas Reales</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Resultados Comprobados en <span className="text-gradient-cyan">Empresas Líderes</span>
          </h2>
          <p className="mt-4 text-slate-400 text-base sm:text-lg">
            Descubra cómo nuestras integraciones de IA han transformado la productividad y rentabilidad de nuestros clientes.
          </p>
        </div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {CASES.map((cs, idx) => (
            <div
              key={idx}
              className="p-8 rounded-2xl glass-card border border-slate-800/80 hover:border-cyan-500/30 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                    {cs.tag}
                  </span>
                  <Building2 className="w-4 h-4 text-slate-500" />
                </div>

                <h3 className="text-lg font-bold text-white mb-1">{cs.client}</h3>
                <span className="text-xs text-slate-400 font-mono block mb-4">{cs.industry}</span>

                <div className="space-y-3 mb-6 text-xs leading-relaxed">
                  <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                    <span className="font-bold text-slate-300 block mb-1">El Desafío:</span>
                    <p className="text-slate-400">{cs.challenge}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-cyan-950/20 border border-cyan-500/10">
                    <span className="font-bold text-cyan-300 block mb-1">Solución iAtomica:</span>
                    <p className="text-slate-300">{cs.solution}</p>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-800/80 grid grid-cols-3 gap-2 text-center">
                {cs.metrics.map((m, mIdx) => (
                  <div key={mIdx} className="p-2 rounded-lg bg-slate-900/90 border border-slate-800">
                    <p className="text-base font-extrabold text-cyan-400 font-mono">{m.value}</p>
                    <span className="text-[9px] text-slate-400 block leading-tight">{m.label}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
