import React from 'react';
import { Sparkles, ArrowRight, Calendar, CheckCircle2, HeartHandshake, ShieldCheck } from 'lucide-react';
import heroPerson from '../assets/hero_person_transparent.webp';

interface HeroProps {
  onOpenBooking: () => void;
  darkMode: boolean;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking, darkMode }) => {
  return (
    <section className={`relative min-h-[90vh] pt-32 pb-20 flex flex-col justify-center overflow-hidden transition-colors ${
      darkMode ? 'bg-slate-950 text-white' : 'bg-white text-slate-900'
    }`}>
      
      {/* Subtle Architectural Grid Texture */}
      <div className="absolute inset-0 bg-grid-subtle pointer-events-none opacity-60" />

      {/* Subtle Ambient Glow */}
      <div className={`absolute top-12 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full filter blur-[120px] pointer-events-none ${
        darkMode ? 'bg-purple-900/20 opacity-30' : 'bg-orange-100/50 opacity-60'
      }`} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headline & Messaging */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Badge */}
            <div className={`inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full text-xs font-bold border ${
              darkMode 
                ? 'bg-slate-900 border-slate-800 text-orange-400' 
                : 'bg-orange-50 border-orange-200 text-orange-600'
            }`}>
              <HeartHandshake className="w-4 h-4 text-orange-500" />
              <span>Tu Socio Tecnológico de Confianza</span>
            </div>

            {/* Main Headline */}
            <h1 className={`text-4xl sm:text-6xl font-black tracking-tight leading-[1.1] ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              Consultoría &amp; Desarrollo <br />
              <span className="text-gradient-brand">Soluciones Digitales e IA</span>
            </h1>

            {/* Subtitle */}
            <p className={`text-base sm:text-lg max-w-2xl leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-600 font-medium'}`}>
              Ayudamos a pymes, emprendimientos y empresas a modernizarse. Creamos herramientas de Inteligencia Artificial, software a medida, control de calidad y contenidos digitales.
            </p>

            {/* Benefit Pills */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className={`p-3 rounded-xl border flex items-center space-x-2.5 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200/80'}`}>
                <CheckCircle2 className="w-4 h-4 text-orange-500 shrink-0" />
                <span className="text-xs font-bold">Ahorro de Tiempo</span>
              </div>
              <div className={`p-3 rounded-xl border flex items-center space-x-2.5 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200/80'}`}>
                <ShieldCheck className="w-4 h-4 text-purple-600 shrink-0" />
                <span className="text-xs font-bold">Control &amp; Calidad</span>
              </div>
              <div className={`p-3 rounded-xl border flex items-center space-x-2.5 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200/80'}`}>
                <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="text-xs font-bold">Fácil de Usar</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
              <button
                onClick={onOpenBooking}
                className="w-full sm:w-auto px-9 py-4 rounded-xl gradient-brand text-white font-bold text-xs shadow-lg shadow-orange-500/20 hover:shadow-orange-500/30 hover:scale-[1.01] transition-all flex items-center justify-center space-x-2 group"
              >
                <Calendar className="w-4 h-4" />
                <span>Agendar Demo</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

          </div>

          {/* Right Column: Floating Artwork */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            <div className="relative w-full max-w-md">
              <img
                src={heroPerson}
                alt="iAtomica Team Illustration"
                className="w-full h-auto object-contain artwork-cutout pointer-events-none"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
