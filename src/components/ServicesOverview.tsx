import React from 'react';
import { ArrowRight, Check } from 'lucide-react';

import iconConsulting from '../assets/icon_consulting.webp';
import iconAiTools from '../assets/icon_ai_tools.webp';
import iconSoftware from '../assets/icon_software.webp';
import iconQaTesting from '../assets/icon_qa_testing.webp';
import iconContent from '../assets/icon_content.webp';

interface Pillar {
  icon3d: string;
  title: string;
  badge: string;
  tagline: string;
  description: string;
  points: string[];
}

const PILLARS: Pillar[] = [
  {
    icon3d: iconConsulting,
    title: 'Consultoría Tecnológica & Estrategia',
    badge: 'Diagnóstico & Acompañamiento',
    tagline: 'Te guiamos paso a paso',
    description: 'Analizamos cómo trabaja tu empresa y te aconsejamos en forma clara sobre qué tecnologías e Inteligencia Artificial te convienen implementar.',
    points: [
      'Diagnóstico sencillo de procesos manuales',
      'Planes de acción claros y a tu medida',
      'Asesoramiento continuo sin modismos técnicos'
    ]
  },
  {
    icon3d: iconAiTools,
    title: 'Desarrollo de Herramientas de IA',
    badge: 'Agentes & Asistentes',
    tagline: 'IA útil para el día a día',
    description: 'Creamos asistentes inteligentes que responden preguntas sobre tus productos, leen documentos automáticamente y ayudan a tus empleados.',
    points: [
      'Asistentes para atención a clientes 24/7',
      'Lectura y organización automática de archivos',
      'Copilotos internos para consultar información'
    ]
  },
  {
    icon3d: iconSoftware,
    title: 'Software Dedicado & Sistemas a Medida',
    badge: 'Desarrollo Web & App',
    tagline: 'Tus ideas hechas realidad',
    description: 'Construimos las herramientas digitales, páginas web, aplicaciones y sistemas internos que tu negocio necesita para funcionar ordenadamente.',
    points: [
      'Páginas y sistemas web modernos y rápidos',
      'Plataformas de gestión adaptadas a tu rutina',
      'Conexión entre tus herramientas actuales'
    ]
  },
  {
    icon3d: iconQaTesting,
    title: 'Mantenimiento & Control de Calidad (QA)',
    badge: 'Soporte & Pruebas',
    tagline: 'Tu tranquilidad garantizada',
    description: 'Nos aseguramos de que tus sistemas funcionen siempre sin fallas. Realizamos pruebas rigurosas de calidad, correcciones y soporte permanente.',
    points: [
      'Pruebas de funcionamiento antes de lanzar',
      'Monitoreo y solución rápida de errores',
      'Mantenimiento preventivo y actualizaciones'
    ]
  },
  {
    icon3d: iconContent,
    title: 'Desarrollo de Contenido & Marketing',
    badge: 'Imagen & Comunicación',
    tagline: 'Hacé brillar a tu marca',
    description: 'Diseñamos y creamos el contenido digital, piezas gráficas y mensajes institucionales para comunicar los valores de tu empresa.',
    points: [
      'Creación de contenido para redes y web',
      'Diseño institucional e imagen de marca',
      'Estrategia de comunicación para clientes'
    ]
  }
];

interface ServicesOverviewProps {
  onOpenBooking: () => void;
  darkMode: boolean;
}

export const ServicesOverview: React.FC<ServicesOverviewProps> = ({ onOpenBooking }) => {
  return (
    <section id="servicios" className="py-24 relative bg-slate-900 text-white overflow-hidden">
      
      {/* Faded Background Grid Texture */}
      <div className="absolute inset-0 bg-grid-faded pointer-events-none opacity-40" />

      {/* Glowing Ambient Glows */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full filter blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-orange-600/20 rounded-full filter blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-orange-400 bg-orange-500/10 px-4 py-1.5 rounded-full border border-orange-500/30 shadow-lg shadow-orange-500/10">
            Nuestros Servicios
          </span>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white mt-4">
            Todo lo que Necesitas para <br />
            <span className="text-gradient-brand">Impulsar Tu Empresa</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300">
            Combinamos consultoría práctica, desarrollo de software, inteligencia artificial y comunicación para ayudarte a crecer.
          </p>
        </div>

        {/* Centered Cards Alignment Grid (3 Cards on Row 1, 2 Centered on Row 2) */}
        <div className="flex flex-wrap justify-center gap-8">
          {PILLARS.map((p, idx) => (
            <div
              key={idx}
              className="w-full md:w-[350px] lg:w-[370px] p-8 rounded-2xl bg-slate-950/80 backdrop-blur-md border border-slate-800 hover:border-orange-500/40 shadow-xl shadow-black/40 flex flex-col justify-between group transition-all duration-300 hover:-translate-y-1.5"
            >
              <div>
                {/* 3D Low-Poly Icon Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 flex items-center justify-center p-1 rounded-2xl bg-gradient-to-br from-orange-500/20 to-purple-500/20 border border-orange-500/30 shadow-inner">
                    <img src={p.icon3d} alt={p.title} className="w-12 h-12 object-contain" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                    {p.badge}
                  </span>
                </div>

                <span className="text-xs font-bold text-orange-400 block mb-1">{p.tagline}</span>
                <h3 className="text-xl font-bold text-white mb-3">
                  {p.title}
                </h3>

                <p className="text-xs leading-relaxed text-slate-300 mb-6">
                  {p.description}
                </p>

                <div className="space-y-2 mb-6">
                  {p.points.map((pt, ptIdx) => (
                    <div key={ptIdx} className="flex items-start space-x-2 text-xs text-slate-300">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-slate-800">
                <button
                  onClick={onOpenBooking}
                  className="w-full py-3 rounded-xl gradient-brand text-white font-bold text-xs shadow-lg shadow-orange-500/20 hover:shadow-orange-500/35 flex items-center justify-center space-x-2 transition-all"
                >
                  <span>Consultar por este servicio</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* SVG Wave Divider Transition to Section 3 (SolutionsShowcase) */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none pointer-events-none">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block w-full h-14 text-amber-50 fill-current"
        >
          <path d="M0,0 C300,90 600,-40 900,40 C1050,80 1150,20 1200,30 L1200,120 L0,120 Z"></path>
        </svg>
      </div>
    </section>
  );
};
