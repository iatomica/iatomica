import React from 'react';
import { 
  Bot, 
  Workflow, 
  Cpu, 
  Compass, 
  ArrowRight, 
  CheckCircle2, 
  Zap 
} from 'lucide-react';

interface PopArtSolutionsProps {
  onOpenBooking: () => void;
}

export const PopArtSolutions: React.FC<PopArtSolutionsProps> = ({
  onOpenBooking,
}) => {
  const solutions = [
    {
      number: '01',
      title: 'CHATBOTS & ASISTENTES DE IA',
      tag: 'OMNICANAL // 24-7',
      bgHeader: 'bg-[#FFF000]',
      description: 'Atención al cliente y ventas hiper-personalizadas en WhatsApp, Instagram y Web. Califican leads y se conectan directamente con tu CRM.',
      highlights: [
        'WhatsApp Business Cloud API oficial',
        'Respuestas contextuales con la base de datos de tu negocio',
        'Derivación automática a agentes humanos cuando sea necesario',
        'Aumento del 40% en tasa de conversión de prospectos',
      ],
      icon: Bot,
      pill: 'MÁS POPULAR',
    },
    {
      number: '02',
      title: 'AUTOMATIZACIÓN DE PROCESOS',
      tag: 'BACKOFFICE // ZERO ERRORS',
      bgHeader: 'bg-[#00A8F5]',
      description: 'Conectamos tus herramientas (Excel, Notion, ERP, CRM, Facturación) para que la información fluya sin intervención humana.',
      highlights: [
        'Extracción y procesamiento de facturas y recibos con OCR + LLM',
        'Sincronización bidireccional entre sistemas',
        'Alertas tempranas de anomalías y stock',
        'Ahorro promedio de 30 horas semanales por equipo',
      ],
      icon: Workflow,
      pill: 'ALTO ROI',
    },
    {
      number: '03',
      title: 'SOFTWARE Y AGENTES A MEDIDA',
      tag: 'FULL STACK // SCALABLE',
      bgHeader: 'bg-[#FF165F]',
      description: 'Diseñamos dashboards internos, portales de clientes y agentes de razonamiento específicos para la lógica de tu empresa.',
      highlights: [
        'Arquitectura moderna con TypeScript, React y Python',
        'Modelos de IA locales o Cloud (OpenAI, Anthropic, DeepSeek)',
        'Seguridad empresarial y control de accesos por roles',
        'Propiedad 100% del código y propiedad intelectual',
      ],
      icon: Cpu,
      pill: 'CUSTOM DEV',
    },
    {
      number: '04',
      title: 'AUDITORÍA Y ESTRATEGIA DE IA',
      tag: 'CONSULTORÍA // DIAGNÓSTICO',
      bgHeader: 'bg-[#00E575]',
      description: 'Evaluamos tu operación actual, detectamos cuellos de botella y armamos un roadmap de implementación priorizado por retorno.',
      highlights: [
        'Mapeo exhaustivo de procesos redundantes',
        'Cálculo exacto de costos vs beneficio de adopción',
        'Capacitación práctica a directores y colaboradores',
        'Garantía de implementación por hitos claros',
      ],
      icon: Compass,
      pill: 'ESTRATÉGICO',
    },
  ];

  return (
    <section id="servicios" className="w-full bg-[#F6F1E7] py-20 px-4 sm:px-8 border-b-4 border-black relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center space-x-2 bg-[#00A8F5] text-white px-3 py-1 font-mono text-xs font-black uppercase brutalist-border shadow-[3px_3px_0_#111] mb-3">
              <Zap size={14} className="fill-white" />
              <span>SERVICIOS DE ALTO CALIBRE</span>
            </div>
            <h2 className="font-bebas text-5xl sm:text-7xl text-black tracking-tight leading-none">
              NUESTRAS <span className="text-[#034BFF] underline decoration-4 decoration-black">SOLUCIONES</span>
            </h2>
          </div>

          <p className="font-mono text-sm text-neutral-700 max-w-md font-bold">
            No vendemos humo ni experimentos teóricos. Implementamos sistemas funcionales que impactan directamente en tu cuenta de resultados.
          </p>
        </div>

        {/* 2x2 Grid of Big Editorial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {solutions.map((sol, index) => {
            const Icon = sol.icon;

            return (
              <div 
                key={index}
                className="bg-white brutalist-border-lg flex flex-col justify-between shadow-[8px_8px_0_#111] hover:shadow-[12px_12px_0_#111] transition-shadow relative overflow-hidden"
              >
                {/* Header bar */}
                <div className={`${sol.bgHeader} border-b-3 border-black p-4 flex items-center justify-between`}>
                  <div className="flex items-center space-x-3">
                    <span className="font-bebas text-3xl text-black">
                      {sol.number}.
                    </span>
                    <span className="font-mono text-xs font-black uppercase tracking-wider text-black">
                      {sol.tag}
                    </span>
                  </div>

                  <span className="bg-black text-[#FFF000] font-mono text-[10px] font-black px-2 py-0.5 brutalist-border-sm">
                    {sol.pill}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
                  <div>
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-12 h-12 bg-black text-[#FFF000] flex items-center justify-center brutalist-border shadow-[2px_2px_0_#FFF000]">
                        <Icon size={24} />
                      </div>
                      <h3 className="font-bebas text-3xl sm:text-4xl text-black leading-none">
                        {sol.title}
                      </h3>
                    </div>

                    <p className="font-sans text-sm text-neutral-800 leading-relaxed font-medium mb-6">
                      {sol.description}
                    </p>

                    {/* Highlights list */}
                    <div className="space-y-2 border-t-2 border-black pt-4">
                      {sol.highlights.map((item, hIdx) => (
                        <div key={hIdx} className="flex items-start space-x-2 font-mono text-xs text-neutral-800">
                          <CheckCircle2 size={15} className="text-[#00E575] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Card Button */}
                  <div className="pt-4 border-t-2 border-neutral-200">
                    <button
                      onClick={onOpenBooking}
                      className="w-full flex items-center justify-center space-x-2 py-3 bg-[#FFF000] text-black font-bebas text-xl tracking-wider brutalist-btn cursor-pointer hover:bg-yellow-300"
                    >
                      <span>COTIZAR ESTA SOLUCIÓN</span>
                      <ArrowRight size={18} />
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
