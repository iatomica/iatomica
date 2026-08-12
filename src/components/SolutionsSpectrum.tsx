import React, { useState } from 'react';
import { Globe, Building2, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';

interface SolutionItem {
  id: string;
  category: 'comercio' | 'corporativo';
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  techPills: string[];
}

const SOLUTIONS: SolutionItem[] = [
  // Comercio Track
  {
    id: 'com-1',
    category: 'comercio',
    title: 'Extracción OCR & Carga de Documentos de Comercio Exterior',
    subtitle: 'Importaciones / Exportaciones / Trading',
    description: 'Sistema inteligente de lectura y extracción automatizada de Facturas Comerciales, Packing Lists y Despachos en RMB/USD con validación directa contra Órdenes de Compra.',
    features: [
      'Lectura multilingüe (Chino, Inglés, Español)',
      'Validación automática de precios y cantidades',
      'Inyección directa en ERP (Odoo, SAP, Sistemas Custom)'
    ],
    techPills: ['Vision AI', 'OCR RAG', 'Odoo API', 'Custom ERP']
  },
  {
    id: 'com-2',
    category: 'comercio',
    title: 'Cotizador Automático & Atención WhatsApp 24/7',
    subtitle: 'Distribuidoras / Retail / Mayoristas',
    description: 'Agente conversacional conectado en tiempo real al depósito de mercadería. Responde consultas de stock, calcula descuentos por volumen y genera cotizaciones PDF instantáneas.',
    features: [
      'WhatsApp Business API Oficial',
      'Generación dinámica de comprobantes PDF',
      'Integración con CRM y seguimiento comercial'
    ],
    techPills: ['WhatsApp API', 'Dynamic PDF', 'Stock Engine', 'Node.js']
  },
  {
    id: 'com-3',
    category: 'comercio',
    title: 'Conciliación de Cuentas Corrientes & Control de Stock',
    subtitle: 'Comercio & Finanzas',
    description: 'Automatización de la conciliación entre facturación de proveedores locales/internacionales, cobranzas y existencias físicas de mercadería.',
    features: [
      'Detección automática de inconsistencias en precios',
      'Alertas de stock crítico y reposición',
      'Dashboards financieros en tiempo real'
    ],
    techPills: ['Python', 'PostgreSQL', 'Webhooks', 'Analytics']
  },

  // Corporativo Track
  {
    id: 'corp-1',
    category: 'corporativo',
    title: 'Agentes RAG Privados sobre Datos Corporativos',
    subtitle: 'Conocimiento & Auditoría',
    description: 'Copilotos de IA entrenados exclusivamente con sus contratos, políticas internas y manuales operativos, permitiendo consultas instantáneas y precisas.',
    features: [
      'Base vectorial privada cifrada On-Premise o Cloud',
      'Búsqueda semántica en milisegundos sobre +50,000 archivos',
      'Respuestas con cita exacta al documento origen'
    ],
    techPills: ['Pinecone', 'LangChain', 'Claude 3.5', 'Python']
  },
  {
    id: 'corp-2',
    category: 'corporativo',
    title: 'Orquestación de Workflows E2E (n8n / Make / Custom)',
    subtitle: 'Eficiencia Operativa',
    description: 'Eliminación de la carga manual mediante la interconexión de todas las herramientas de software de la empresa sin reemplazar sus sistemas actuales.',
    features: [
      'Flujos de trabajo 100% automatizados sin intervención humana',
      'Tratamiento de excepciones y alertas automáticas',
      'Arquitectura modular y mantenible'
    ],
    techPills: ['n8n', 'Make', 'REST APIs', 'Cloud Triggers']
  },
  {
    id: 'corp-3',
    category: 'corporativo',
    title: 'Desarrollo de Software Custom & Plataformas SaaS',
    subtitle: 'Ingeniería a Medida',
    description: 'Desarrollo web y mobile de alta velocidad para startups y corporaciones que requieren plataformas web complejas, portales de clientes y dashboards.',
    features: [
      'Desarrollo Frontend React / Next.js / TypeScript',
      'Arquitecturas serverless y microservicios escalables',
      'Diseño UX/UI de nivel internacional'
    ],
    techPills: ['React', 'Next.js', 'Node.js', 'Docker', 'AWS']
  }
];

interface SolutionsSpectrumProps {
  onOpenBooking: () => void;
}

export const SolutionsSpectrum: React.FC<SolutionsSpectrumProps> = ({ onOpenBooking }) => {
  const [activeTab, setActiveTab] = useState<'comercio' | 'corporativo'>('comercio');

  const filteredSolutions = SOLUTIONS.filter(s => s.category === activeTab);

  return (
    <section id="soluciones" className="py-24 relative bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-mono mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Soluciones de IA &amp; Desarrollo de Software</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Ingeniería Orientada a <span className="text-gradient-brand">Soluciones Reales</span>
          </h2>
          <p className="mt-4 text-slate-400 text-base sm:text-lg">
            Desarrollamos e integramos tecnología avanzada adaptada a los desafíos de empresas comerciales y corporaciones en crecimiento.
          </p>

          {/* Track Switcher */}
          <div className="mt-8 inline-flex p-1.5 rounded-2xl bg-slate-900 border border-slate-800 space-x-2">
            <button
              onClick={() => setActiveTab('comercio')}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 ${
                activeTab === 'comercio'
                  ? 'gradient-brand text-white shadow-lg shadow-orange-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Globe className="w-4 h-4" />
              <span>Comercio, Trading &amp; Retail</span>
            </button>

            <button
              onClick={() => setActiveTab('corporativo')}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 ${
                activeTab === 'corporativo'
                  ? 'gradient-brand text-white shadow-lg shadow-purple-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>Empresas &amp; Corporativo</span>
            </button>
          </div>
        </div>

        {/* Solutions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredSolutions.map(sol => (
            <div
              key={sol.id}
              className="p-8 rounded-2xl linear-card border border-slate-800 hover:border-orange-500/30 flex flex-col justify-between group"
            >
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-orange-400 block mb-1">
                  {sol.subtitle}
                </span>
                <h3 className="text-xl font-bold text-white group-hover:text-orange-300 transition-colors mb-4 leading-snug">
                  {sol.title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-6">
                  {sol.description}
                </p>

                <div className="space-y-2.5 mb-6">
                  {sol.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start space-x-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-slate-800/80">
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {sol.techPills.map((tech, tIdx) => (
                    <span key={tIdx} className="text-[10px] font-mono px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-400">
                      {tech}
                    </span>
                  ))}
                </div>

                <button
                  onClick={onOpenBooking}
                  className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-orange-500/30 text-xs font-semibold text-slate-200 hover:text-orange-400 flex items-center justify-center space-x-2 transition-all"
                >
                  <span>Consultar Solución</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
