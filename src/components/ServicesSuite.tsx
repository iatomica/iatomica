import React from 'react';
import { Bot, Workflow, MessageSquareCode, Code2, LayoutDashboard, Compass, ArrowRight, Sparkles } from 'lucide-react';

interface Service {
  icon: any;
  title: string;
  badge: string;
  description: string;
  capabilities: string[];
  techStack: string[];
  gradient: string;
}

const SERVICES: Service[] = [
  {
    icon: Bot,
    title: 'Agentes IA Autónomos & RAG Enterprise',
    badge: 'Core IA',
    gradient: 'from-cyan-500 to-blue-600',
    description: 'Desarrollamos agentes inteligentes entrenados con sus propios datos corporativos, capaces de tomar decisiones, redactar reportes y ejecutar acciones complejas.',
    capabilities: [
      'Modelos RAG sobre bases de conocimiento privadas',
      'Integración multi-modelo (GPT-4o, Claude 3.5, Llama 3)',
      'Agentes multitarea con memoria contextual'
    ],
    techStack: ['Python', 'LangChain', 'LlamaIndex', 'Pinecone', 'Claude API']
  },
  {
    icon: Workflow,
    title: 'Automatización de Procesos (RPA & Workflows)',
    badge: 'Automatización',
    gradient: 'from-purple-500 to-indigo-600',
    description: 'Conectamos sus herramientas existentes para eliminar tareas manuales repetitivas mediante flujos de trabajo autónomos y pipelines de datos.',
    capabilities: [
      'Orquestación de flujos en n8n & Make',
      'Extracción automática de datos (OCR/PDF/Excel)',
      'Sincronización bidireccional entre sistemas'
    ],
    techStack: ['n8n', 'Make', 'Zapier', 'Webhooks', 'REST APIs']
  },
  {
    icon: MessageSquareCode,
    title: 'Chatbots IA & Voice Bots Multicanal',
    badge: 'Conversacional',
    gradient: 'from-emerald-500 to-teal-600',
    description: 'Asistentes virtuales 24/7 integrados en WhatsApp, Web y CRM que califican clientes, cotizan en tiempo real y resuelven soporte sin demoras.',
    capabilities: [
      'Integración con WhatsApp Business API Oficial',
      'Respuestas hiper-personalizadas con tono de marca',
      'Derivación inteligente a operadores humanos'
    ],
    techStack: ['WhatsApp API', 'Whisper', 'Twilio', 'Node.js', 'OpenAI']
  },
  {
    icon: Code2,
    title: 'Desarrollo de Software & Plataformas SaaS',
    badge: 'Desarrollo',
    gradient: 'from-blue-500 to-cyan-600',
    description: 'Construimos aplicaciones web y mobile de alta velocidad, arquitecturas cloud escalables y software a medida para startups y corporaciones.',
    capabilities: [
      'Desarrollo Frontend React / Next.js / TypeScript',
      'APIs Backend escalables y microservicios',
      'Diseño UI/UX ultra-moderno y optimizado'
    ],
    techStack: ['React', 'Next.js', 'Node.js', 'PostgreSQL', 'Docker']
  },
  {
    icon: LayoutDashboard,
    title: 'Sistemas CRM / ERP & Dashboards Analytics',
    badge: 'Enterprise Systems',
    gradient: 'from-pink-500 to-rose-600',
    description: 'Centralizamos su gestión comercial y operativa con sistemas a medida o integraciones de Odoo, HubSpot y dashboards analíticos en tiempo real.',
    capabilities: [
      'Visualización de KPIs y métricas financieras',
      'Gestión de cuentas corrientes y facturación',
      'Integración con e-commerce y pasarelas de pago'
    ],
    techStack: ['Odoo', 'HubSpot', 'Grafana', 'PowerBI', 'Tailwind']
  },
  {
    icon: Compass,
    title: 'Consultoría Estratégica & Prototipado IA',
    badge: 'Estrategia',
    gradient: 'from-amber-500 to-orange-600',
    description: 'Auditamos la madurez tecnológica de su empresa, diseñamos la hoja de ruta de adopción de IA y creamos prototipos funcionales en semanas.',
    capabilities: [
      'Auditoría de procesos automatizables',
      'MVP y Prototipado rápido de soluciones IA',
      'Capacitación y gobernanza tecnológica'
    ],
    techStack: ['Low-Code', 'Framer', 'Architectures', 'Cloud Audit']
  }
];

interface ServicesSuiteProps {
  onOpenBooking: () => void;
}

export const ServicesSuite: React.FC<ServicesSuiteProps> = ({ onOpenBooking }) => {
  return (
    <section id="servicios" className="py-24 relative bg-slate-950/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Servicios de Ingeniería de IA &amp; Software</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Soluciones Tecnológicas <span className="text-gradient-cyan">Diseñadas para Escalar</span>
          </h2>
          <p className="mt-4 text-slate-400 text-base sm:text-lg">
            Combinamos inteligencia artificial generativa, metodologías ágiles y código de calidad para transformar el rendimiento de su negocio.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={idx}
                className="p-8 rounded-2xl glass-card border border-slate-800/80 hover:border-slate-700 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className={`p-3.5 rounded-xl bg-gradient-to-br ${s.gradient} text-white shadow-lg shadow-cyan-500/10 group-hover:scale-110 transition-transform`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300">
                      {s.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors mb-3">
                    {s.title}
                  </h3>

                  <p className="text-xs text-slate-400 leading-relaxed mb-6">
                    {s.description}
                  </p>

                  <div className="space-y-2 mb-6">
                    {s.capabilities.map((cap, cIdx) => (
                      <div key={cIdx} className="flex items-start space-x-2 text-xs text-slate-300">
                        <span className="text-cyan-400 font-bold">&bull;</span>
                        <span>{cap}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-800/80">
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {s.techStack.map((tech, tIdx) => (
                      <span key={tIdx} className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={onOpenBooking}
                    className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-cyan-950/40 border border-slate-800 hover:border-cyan-500/30 text-xs font-semibold text-slate-200 hover:text-cyan-300 flex items-center justify-center space-x-2 transition-all"
                  >
                    <span>Consultar por esta Solución</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
