import React, { useState } from 'react';
import { 
  Bot, 
  Workflow, 
  Database, 
  TrendingUp, 
  ShieldCheck, 
  Sparkles, 
  Zap, 
  Cpu, 
  Compass, 
  ArrowUpRight 
} from 'lucide-react';

interface PosterItem {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  tag: string;
  themeColor: string;
  accentColor: string;
  rotation: string;
  description: string;
  stamp: string;
  icon: React.FC<{ size?: number; className?: string }>;
  features: string[];
}

const postersData: PosterItem[] = [
  {
    id: 'p1',
    number: '01',
    title: 'AUTOMATIZACIÓN TOTAL',
    subtitle: 'ELIMINÁ EL TRABAJO REPETITIVO',
    tag: 'CORE ENGINE',
    themeColor: '#FFF000',
    accentColor: '#111111',
    rotation: '-rotate-1',
    description: 'Conectamos tus sistemas existentes para que las tareas manuales se ejecuten en milisegundos sin errores.',
    stamp: '100% OPERATIVO',
    icon: Zap,
    features: ['Sincronización en tiempo real', 'Zero errores manuales', 'Alertas inteligentes'],
  },
  {
    id: 'p2',
    number: '02',
    title: 'AGENTES AUTÓNOMOS',
    subtitle: 'TRABAJAN MIENTRAS DORMÍS',
    tag: 'AI AGENTS',
    themeColor: '#00A8F5',
    accentColor: '#FFFFFF',
    rotation: 'rotate-1',
    description: 'Sistemas con razonamiento que ejecutan flujos complejos, responden consultas y toman decisiones parametrizadas.',
    stamp: '24/7 ACTIVE',
    icon: Bot,
    features: ['Multi-modelo LLM', 'Capacidad de razonamiento', 'Integración API'],
  },
  {
    id: 'p3',
    number: '03',
    title: 'INTEGRACIONES CRM',
    subtitle: 'DATOS EN UN SOLO LUGAR',
    tag: 'WORKFLOWS',
    themeColor: '#FF165F',
    accentColor: '#FFFFFF',
    rotation: '-rotate-2',
    description: 'WhatsApp, Gmail, HubSpot, Sheets, Stripe, Notion sincronizados en un ecosistema cohesivo.',
    stamp: 'VERIFICADO',
    icon: Workflow,
    features: ['HubSpot & Salesforce', 'Notion & Google Sheets', 'Webhooks & Zapier/Make'],
  },
  {
    id: 'p4',
    number: '04',
    title: 'BUSINESS INTELLIGENCE',
    subtitle: 'DASHBOARDS CONTEXTUALES',
    tag: 'ANALYTICS',
    themeColor: '#034BFF',
    accentColor: '#FFFFFF',
    rotation: 'rotate-2',
    description: 'Reportes generados automáticamente con IA que resumen lo crítico de tu negocio cada mañana.',
    stamp: 'DATA FIRST',
    icon: Database,
    features: ['Reportes ejecutivos diarios', 'Detección de anomalías', 'Métricas de conversión'],
  },
  {
    id: 'p5',
    number: '05',
    title: 'ROBOTS DE WHATSAPP',
    subtitle: 'ATENCIÓN Y CALIFICACIÓN ULTRA-RÁPIDA',
    tag: 'CONVERSACIONAL',
    themeColor: '#00E575',
    accentColor: '#111111',
    rotation: '-rotate-1',
    description: 'Chatbots con lenguaje natural que califican leads, agendan reuniones y responden como tu mejor vendedor.',
    stamp: 'CONVIERTE +40%',
    icon: Sparkles,
    features: ['WhatsApp Cloud API oficial', 'Memoria de conversación', 'Traspaso a humano'],
  },
  {
    id: 'p6',
    number: '06',
    title: 'SOFTWARE A MEDIDA',
    subtitle: 'ARQUITECTURA DE ALTO IMPACTO',
    tag: 'ENGINEERING',
    themeColor: '#F6F1E7',
    accentColor: '#111111',
    rotation: 'rotate-1',
    description: 'Plataformas web, dashboards privados y backends escalables diseñados para tu modelo específico.',
    stamp: 'SCALABLE',
    icon: Cpu,
    features: ['React & Node.js / Python', 'Bases de datos optimizadas', 'Infraestructura cloud'],
  },
  {
    id: 'p7',
    number: '07',
    title: 'MÁXIMO RETORNO (ROI)',
    subtitle: 'RESULTADOS MEDIBLES EN DÍAS',
    tag: 'FINANCIAL',
    themeColor: '#FFF000',
    accentColor: '#111111',
    rotation: '-rotate-2',
    description: 'Cada hora automatizada se traduce directamente en ahorro de costos y capacidad de atención multiplicada.',
    stamp: 'ALTO RENDIMIENTO',
    icon: TrendingUp,
    features: ['Ahorro de +120hs al mes', 'Recuperación de inversión rápida', 'Reportes de impacto'],
  },
  {
    id: 'p8',
    number: '08',
    title: 'SEGURIDAD & PRIVACIDAD',
    subtitle: 'DATOS CORPORATIVOS PROTEGIDOS',
    tag: 'SECURITY',
    themeColor: '#111111',
    accentColor: '#FFF000',
    rotation: 'rotate-2',
    description: 'Tus datos no entrenan modelos públicos. Arquitecturas aisladas con encriptación y control de accesos.',
    stamp: 'ENCRYPTED',
    icon: ShieldCheck,
    features: ['Instancias privadas', 'No entrena modelos públicos', 'Roles y permisos'],
  },
  {
    id: 'p9',
    number: '09',
    title: 'CONSULTORÍA PATAGÓNICA',
    subtitle: 'DESDE BARILOCHE AL MUNDO',
    tag: 'STRATEGY',
    themeColor: '#FF165F',
    accentColor: '#FFFFFF',
    rotation: '-rotate-1',
    description: 'Acompañamiento 1-a-1 por ingenieros. Analizamos tus cuellos de botella y diseñamos la hoja de ruta óptima.',
    stamp: 'BARILOCHE LAB',
    icon: Compass,
    features: ['Diagnóstico inicial gratuito', 'Soporte y evolución continua', 'Entrenamiento para tu equipo'],
  },
];

export const PopArtPosterGallery: React.FC = () => {
  const [selectedPoster, setSelectedPoster] = useState<string | null>(null);

  return (
    <section id="posters" className="w-full bg-[#F6F1E7] py-20 px-4 sm:px-8 border-b-4 border-black relative">
      
      {/* Halftone texture background */}
      <div className="absolute inset-0 bg-halftone opacity-20 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center space-x-2 bg-[#FFF000] px-4 py-1.5 brutalist-border shadow-[4px_4px_0_#111] transform -rotate-1 mb-4">
            <Sparkles size={16} className="text-black" />
            <span className="font-mono text-xs sm:text-sm font-black uppercase tracking-widest text-black">
              COLECCIÓN DE POSTERS EDITORIALES // 9 PILARES
            </span>
          </div>

          <h2 className="font-bebas text-5xl sm:text-7xl lg:text-8xl text-black tracking-tight leading-none">
            CATÁLOGO DE <span className="text-[#FF165F] underline decoration-4 decoration-black">SOLUCIONES</span>
          </h2>
          
          <p className="font-mono text-sm sm:text-base text-neutral-700 max-w-2xl mx-auto mt-4 font-bold">
            Inspirado en cartelería neo-brutalista, pop-art zines y composición suiza. 
            Hacé click en cada póster para descubrir sus especificaciones técnicas.
          </p>
        </div>

        {/* 3x3 POSTER GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {postersData.map((poster) => {
            const Icon = poster.icon;
            const isSelected = selectedPoster === poster.id;

            return (
              <div
                key={poster.id}
                onClick={() => setSelectedPoster(isSelected ? null : poster.id)}
                className={`group relative cursor-pointer transform ${poster.rotation} hover:rotate-0 hover:scale-[1.02] transition-all duration-200`}
              >
                {/* Poster Card Container */}
                <div 
                  className="w-full bg-white brutalist-border-lg p-5 flex flex-col justify-between shadow-[8px_8px_0_#111] hover:shadow-[12px_12px_0_#111] transition-shadow min-h-[480px]"
                >
                  
                  {/* Poster Header */}
                  <div>
                    <div className="flex items-center justify-between border-b-3 border-black pb-3 mb-4">
                      <div className="flex items-center space-x-2">
                        <span 
                          className="font-bebas text-3xl px-2 py-0.5 brutalist-border-sm"
                          style={{
                            backgroundColor: poster.themeColor,
                            color: poster.accentColor === '#FFFFFF' && poster.themeColor !== '#111111' ? '#FFFFFF' : '#111111',
                          }}
                        >
                          {poster.number}
                        </span>
                        <span className="font-mono text-xs font-black uppercase tracking-wider text-black">
                          {poster.tag}
                        </span>
                      </div>

                      {/* Barcode & Stamp */}
                      <div className="flex flex-col items-end">
                        <span className="bg-[#111111] text-[#FFF000] font-mono text-[9px] font-black px-1.5 py-0.5">
                          {poster.stamp}
                        </span>
                        <span className="font-mono text-[8px] text-neutral-400 tracking-tighter">
                          |||| ||| |||||||
                        </span>
                      </div>
                    </div>

                    {/* Graphic Box inside Poster */}
                    <div 
                      className="w-full h-36 brutalist-border flex flex-col items-center justify-center p-4 relative overflow-hidden mb-5 shadow-[4px_4px_0_#111]"
                      style={{ backgroundColor: poster.themeColor }}
                    >
                      {/* Halftone inside box */}
                      <div className="absolute inset-0 bg-halftone opacity-25"></div>
                      
                      <Icon size={54} className="relative z-10 text-black group-hover:scale-110 transition-transform duration-200" />
                      
                      <span className="relative z-10 font-mono text-[10px] font-black uppercase tracking-widest text-black mt-2 bg-white/90 px-2 py-0.5 brutalist-border-sm">
                        IATOMICA SPEC #{poster.number}
                      </span>
                    </div>

                    {/* Poster Titles */}
                    <h3 className="font-bebas text-3xl sm:text-4xl text-black leading-none tracking-wide group-hover:text-[#FF165F] transition-colors">
                      {poster.title}
                    </h3>
                    
                    <p className="font-mono text-xs font-bold text-neutral-500 uppercase tracking-wider mt-1 mb-3">
                      {poster.subtitle}
                    </p>

                    <p className="font-sans text-xs text-neutral-800 leading-relaxed font-medium">
                      {poster.description}
                    </p>
                  </div>

                  {/* Poster Bottom Features & Action */}
                  <div className="pt-4 border-t-2 border-black mt-4">
                    <ul className="space-y-1.5 mb-3">
                      {poster.features.map((feat, idx) => (
                        <li key={idx} className="font-mono text-[11px] text-neutral-700 flex items-center space-x-1.5">
                          <span className="text-[#FF165F] font-black">▶</span>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex items-center justify-between pt-2 border-t border-neutral-300 font-mono text-xs font-bold">
                      <span className="text-neutral-500">IATOMICA STUDIO</span>
                      <div className="flex items-center space-x-1 text-black group-hover:text-[#FF165F]">
                        <span>DETALLES</span>
                        <ArrowUpRight size={14} />
                      </div>
                    </div>
                  </div>

                </div>

                {/* Pop-art tape effect on top-center of poster */}
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-16 h-6 bg-[#FFF000]/80 border border-black/30 shadow-sm rotate-2 pointer-events-none"></div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
