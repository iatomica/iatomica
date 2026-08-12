import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Smile } from 'lucide-react';
import solPerson from '../assets/solutions_person.webp';

interface SolutionsShowcaseProps {
  onOpenBooking: () => void;
  darkMode: boolean;
}

export const SolutionsShowcase: React.FC<SolutionsShowcaseProps> = ({ onOpenBooking, darkMode }) => {
  return (
    <section id="soluciones" className={`py-24 relative overflow-hidden transition-colors ${darkMode ? 'bg-slate-950' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Floating 3D Low-Poly Team Artwork (Cutout Style) */}
          <div className="lg:col-span-5 relative flex justify-center order-2 lg:order-1">
            <div className="relative w-full max-w-md">
              <img
                src={solPerson}
                alt="iAtomica Collaborative Team"
                className="w-full h-auto object-contain artwork-cutout"
              />
            </div>
          </div>

          {/* Right Column: Clear Solutions Breakdown */}
          <div className="lg:col-span-7 space-y-6 text-left order-1 lg:order-2">
            
            <div className={`inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full text-xs font-bold border ${
              darkMode 
                ? 'bg-purple-950/40 border-purple-800 text-purple-300' 
                : 'bg-purple-50 border-purple-200 text-purple-700'
            }`}>
              <Sparkles className="w-4 h-4 text-orange-500" />
              <span>Soluciones Orientadas a Resultados</span>
            </div>

            <h2 className={`text-3xl sm:text-5xl font-black tracking-tight leading-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              Diseñamos las Herramientas que <br />
              <span className="text-gradient-brand">Tu Equipo Necesita</span>.
            </h2>

            <p className={`text-base leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
              No vendemos fórmulas complejas. Estudiamos tus necesidades reales y desarrollamos soluciones digitales sencillas de usar que resuelven los problemas diarios de tu empresa.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className={`p-4 rounded-xl border ${darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                <h4 className="text-sm font-bold flex items-center gap-2 mb-1">
                  <Smile className="w-4 h-4 text-orange-500" />
                  <span>Fácil Adaptación</span>
                </h4>
                <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  Creamos interfaces simples para que tu equipo aprenda a usarlas desde el primer día.
                </p>
              </div>

              <div className={`p-4 rounded-xl border ${darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                <h4 className="text-sm font-bold flex items-center gap-2 mb-1">
                  <ShieldCheck className="w-4 h-4 text-purple-500" />
                  <span>Control de Calidad</span>
                </h4>
                <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  Probamos minuciosamente cada herramienta para que funcione de forma segura y sin interrupciones.
                </p>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={onOpenBooking}
                className="px-8 py-4 rounded-xl gradient-brand text-white font-bold text-xs shadow-lg shadow-orange-500/20 hover:shadow-orange-500/30 transition-all flex items-center space-x-2 group"
              >
                <span>Plantear una Consulta</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
