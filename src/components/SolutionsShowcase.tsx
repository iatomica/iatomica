import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Smile } from 'lucide-react';
import solPerson from '../assets/solutions_person_transparent.webp';

interface SolutionsShowcaseProps {
  onOpenBooking: () => void;
  darkMode: boolean;
}

export const SolutionsShowcase: React.FC<SolutionsShowcaseProps> = ({ onOpenBooking }) => {
  return (
    <section id="soluciones" className="py-24 relative overflow-hidden bg-gradient-to-br from-orange-500 via-rose-600 to-purple-700 text-white">
      
      {/* Background Faded Grid Texture */}
      <div className="absolute inset-0 bg-grid-faded pointer-events-none opacity-30" />

      {/* Ambient Glowing Spotlights */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-amber-300/30 filter blur-[110px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Floating Artwork */}
          <div className="lg:col-span-5 relative flex justify-center order-2 lg:order-1">
            <div className="relative w-full max-w-md">
              <img
                src={solPerson}
                alt="iAtomica Collaborative Team"
                className="w-full h-auto object-contain artwork-cutout pointer-events-none drop-shadow-2xl"
              />
            </div>
          </div>

          {/* Right Column: Solutions Breakdown */}
          <div className="lg:col-span-7 space-y-6 text-left order-1 lg:order-2">
            
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full text-xs font-bold bg-white/15 border border-white/30 text-amber-200 backdrop-blur-md shadow-lg">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Soluciones Orientadas a Resultados</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight text-white">
              Diseñamos las Herramientas que <br />
              <span className="text-amber-300 drop-shadow-md">Tu Equipo Necesita</span>.
            </h2>

            <p className="text-base sm:text-lg leading-relaxed text-purple-100 font-medium">
              No vendemos fórmulas complejas. Estudiamos tus necesidades reales y desarrollamos soluciones digitales sencillas de usar que resuelven los problemas diarios de tu empresa.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg">
                <h4 className="text-sm font-bold flex items-center gap-2 mb-1 text-white">
                  <Smile className="w-4 h-4 text-amber-300" />
                  <span>Fácil Adaptación</span>
                </h4>
                <p className="text-xs text-purple-100 font-medium">
                  Creamos interfaces simples para que tu equipo aprenda a usarlas desde el primer día.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg">
                <h4 className="text-sm font-bold flex items-center gap-2 mb-1 text-white">
                  <ShieldCheck className="w-4 h-4 text-amber-300" />
                  <span>Control de Calidad</span>
                </h4>
                <p className="text-xs text-purple-100 font-medium">
                  Probamos minuciosamente cada herramienta para que funcione de forma segura y sin interrupciones.
                </p>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={onOpenBooking}
                className="px-8 py-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs shadow-xl shadow-amber-400/30 transition-all flex items-center space-x-2 group"
              >
                <span>Plantear una Consulta</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

          </div>

        </div>
      </div>

      {/* Fusion Feathers Top & Bottom */}
      <div className="fusion-feather-top" />
      <div className="fusion-feather-bottom" />
    </section>
  );
};
