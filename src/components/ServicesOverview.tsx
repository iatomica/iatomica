import React from 'react';
import { Lightbulb, Bot, Code2, ShieldCheck, Palette, ArrowRight, Check } from 'lucide-react';

interface Pillar {
  icon: any;
  title: string;
  badge: string;
  tagline: string;
  description: string;
  points: string[];
  color: string;
}

const PILLARS: Pillar[] = [
  {
    icon: Lightbulb,
    title: 'Consultoría Tecnológica & Estrategia',
    badge: 'Diagnóstico & Acompañamiento',
    tagline: 'Te guiamos paso a paso',
    description: 'Analizamos cómo trabaja tu empresa y te aconsejamos en forma clara sobre qué tecnologías e Inteligencia Artificial te convienen implementar para ahorrar tiempo y costos.',
    points: [
      'Diagnóstico sencillo de procesos manuales',
      'Planes de acción claros y a tu medida',
      'Asesoramiento continuo sin modismos técnicos'
    ],
    color: 'bg-amber-500/10 text-amber-600 border-amber-500/20'
  },
  {
    icon: Bot,
    title: 'Desarrollo de Herramientas de Inteligencia Artificial',
    badge: 'Agentes & Asistentes',
    tagline: 'IA útil para el día a día',
    description: 'Creamos asistentes inteligentes que responden preguntas sobre tus productos, leen documentos automáticamente y ayudan a tus empleados a trabajar más rápido.',
    points: [
      'Asistentes para atención a clientes 24/7',
      'Lectura y organización automática de documentos',
      'Copilotos internos para consultar información'
    ],
    color: 'bg-purple-500/10 text-purple-600 border-purple-500/20'
  },
  {
    icon: Code2,
    title: 'Software Dedicado & Sistemas a Medida',
    badge: 'Desarrollo Web & App',
    tagline: 'Tus ideas hechas realidad',
    description: 'Construimos las herramientas digitales, páginas web, aplicaciones y sistemas internos que tu negocio necesita para funcionar ordenadamente.',
    points: [
      'Páginas y sistemas web modernos y rápidos',
      'Plataformas de gestión adaptadas a tu rutina',
      'Conexión entre tus herramientas actuales'
    ],
    color: 'bg-blue-500/10 text-blue-600 border-blue-500/20'
  },
  {
    icon: ShieldCheck,
    title: 'Mantenimiento & Control de Calidad (QA)',
    badge: 'Soporte & Pruebas',
    tagline: 'Tu tranquilidad garantizada',
    description: 'Nos aseguramos de que tus sistemas funcionen siempre sin fallas. Realizamos pruebas rigurosas de calidad, correcciones y soporte técnico permanente.',
    points: [
      'Pruebas de funcionamiento antes de lanzar',
      'Monitoreo y solución rápida de errores',
      'Mantenimiento preventivo y actualizaciones'
    ],
    color: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20'
  },
  {
    icon: Palette,
    title: 'Desarrollo de Contenido & Marketing Institucional',
    badge: 'Imagen & Comunicación',
    tagline: 'Hacé brillar a tu marca',
    description: 'Diseñamos y creamos el contenido digital, piezas gráficas y mensajes institucionales para comunicar los valores de tu empresa con profesionalismo.',
    points: [
      'Creación de contenido para redes y web',
      'Diseño institucional e imagen de marca',
      'Estrategia de comunicación para clientes'
    ],
    color: 'bg-rose-500/10 text-rose-600 border-rose-500/20'
  }
];

interface ServicesOverviewProps {
  onOpenBooking: () => void;
  darkMode: boolean;
}

export const ServicesOverview: React.FC<ServicesOverviewProps> = ({ onOpenBooking, darkMode }) => {
  return (
    <section id="servicios" className={`py-24 transition-colors ${darkMode ? 'bg-slate-900/60' : 'bg-slate-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-orange-500 bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/20">
            Nuestros Servicios
          </span>
          <h2 className={`text-3xl sm:text-5xl font-black tracking-tight mt-4 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            Todo lo que Necesitas para <br />
            <span className="text-gradient-brand">Impulsar Tu Empresa</span>
          </h2>
          <p className={`mt-4 text-base sm:text-lg ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            Combinamos consultoría práctica, desarrollo de software, inteligencia artificial y comunicación para ayudarte a crecer.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PILLARS.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={idx}
                className={`p-8 rounded-2xl clean-card flex flex-col justify-between group ${
                  darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className={`p-3.5 rounded-2xl border ${p.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${
                      darkMode ? 'bg-slate-800 text-slate-300 border-slate-700' : 'bg-slate-100 text-slate-600 border-slate-200'
                    }`}>
                      {p.badge}
                    </span>
                  </div>

                  <span className="text-xs font-bold text-orange-500 block mb-1">{p.tagline}</span>
                  <h3 className={`text-xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                    {p.title}
                  </h3>

                  <p className={`text-xs leading-relaxed mb-6 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    {p.description}
                  </p>

                  <div className="space-y-2 mb-6">
                    {p.points.map((pt, ptIdx) => (
                      <div key={ptIdx} className="flex items-start space-x-2 text-xs">
                        <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span className={darkMode ? 'text-slate-300' : 'text-slate-700'}>{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
                  <button
                    onClick={onOpenBooking}
                    className="w-full py-3 rounded-xl gradient-brand text-white font-bold text-xs shadow-md shadow-orange-500/20 hover:shadow-orange-500/30 flex items-center justify-center space-x-2 transition-all"
                  >
                    <span>Consultar por este servicio</span>
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
