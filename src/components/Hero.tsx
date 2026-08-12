import React from 'react';
import { Sparkles, ArrowRight, Bot, Calendar, CheckCircle2, HeartHandshake, ShieldCheck } from 'lucide-react';
import heroPerson from '../assets/hero_person_transparent.webp';

interface HeroProps {
  onOpenBooking: () => void;
  onOpenAiChat: () => void;
  darkMode: boolean;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking, onOpenAiChat, darkMode }) => {
  return (
    <section className={`relative min-h-[92vh] pt-32 pb-24 flex flex-col justify-center overflow-hidden transition-colors ${
      darkMode 
        ? 'bg-slate-950' 
        : 'bg-gradient-to-br from-orange-100/70 via-slate-50 to-purple-100/70'
    }`}>
      
      {/* Faded Grid Background Texture */}
      <div className="absolute inset-0 bg-grid-faded pointer-events-none opacity-80" />

      {/* Vibrant Background Soft Glows */}
      <div className={`absolute top-12 left-1/2 -translate-x-1/2 w-[650px] h-[650px] rounded-full filter blur-[100px] pointer-events-none ${
        darkMode ? 'bg-purple-900/30 opacity-40' : 'bg-orange-300/40 opacity-60'
      }`} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headline & Messaging */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Badge */}
            <div className={`inline-flex items-center space-x-2 px-4 py-1.5 rounded-full text-xs font-bold border shadow-sm ${
              darkMode 
                ? 'bg-slate-900/90 border-slate-700 text-orange-400' 
                : 'bg-white/90 border-orange-200 text-orange-600 shadow-orange-500/10'
            }`}>
              <HeartHandshake className="w-4 h-4 text-orange-500" />
              <span>Tu Socio Tecnológico de Confianza</span>
            </div>

            {/* Main Headline */}
            <h1 className={`text-4xl sm:text-6xl font-black tracking-tight leading-[1.1] ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              Consultoría &amp; Desarrollo de <br />
              <span className="text-gradient-brand">Soluciones Digitales e IA</span> <br />
              para Tu Empresa.
            </h1>

            {/* Subtitle */}
            <p className={`text-base sm:text-lg max-w-2xl leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-700 font-medium'}`}>
              Ayudamos a pymes, emprendimientos y empresas a modernizarse. Creamos herramientas de Inteligencia Artificial, software a medida, control de calidad y contenidos digitales.
            </p>

            {/* Benefit Pills */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className={`p-3.5 rounded-xl border flex items-center space-x-2.5 shadow-sm ${darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white/90 border-slate-200'}`}>
                <CheckCircle2 className="w-4.5 h-4.5 text-orange-500 shrink-0" />
                <span className="text-xs font-extrabold">Ahorro de Tiempo</span>
              </div>
              <div className={`p-3.5 rounded-xl border flex items-center space-x-2.5 shadow-sm ${darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white/90 border-slate-200'}`}>
                <ShieldCheck className="w-4.5 h-4.5 text-purple-600 shrink-0" />
                <span className="text-xs font-extrabold">Control &amp; Calidad</span>
              </div>
              <div className={`p-3.5 rounded-xl border flex items-center space-x-2.5 shadow-sm ${darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white/90 border-slate-200'}`}>
                <Sparkles className="w-4.5 h-4.5 text-emerald-600 shrink-0" />
                <span className="text-xs font-extrabold">Fácil de Usar</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
              <button
                onClick={onOpenBooking}
                className="w-full sm:w-auto px-8 py-4 rounded-xl gradient-brand text-white font-bold text-xs shadow-xl shadow-orange-500/30 hover:shadow-orange-500/40 hover:scale-[1.02] transition-all flex items-center justify-center space-x-2 group"
              >
                <Calendar className="w-4 h-4" />
                <span>Agendar Cita de Consultoría</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onOpenAiChat}
                className={`w-full sm:w-auto px-7 py-4 rounded-xl border font-bold text-xs transition-all flex items-center justify-center space-x-2 ${
                  darkMode 
                    ? 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700' 
                    : 'bg-white border-slate-300 text-slate-900 hover:bg-slate-100 shadow-md'
                }`}
              >
                <Bot className="w-4 h-4 text-purple-600" />
                <span>Hablar con Asistente IA</span>
              </button>
            </div>

          </div>

          {/* Right Column: Floating 100% Transparent Artwork */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            <div className="relative w-full max-w-md">
              <img
                src={heroPerson}
                alt="iAtomica Team Illustration"
                className="w-full h-auto object-contain artwork-cutout pointer-events-none drop-shadow-xl"
              />
            </div>
          </div>

        </div>
      </div>

      {/* SVG Wave Divider Transition to Dark Section 2 (ServicesOverview) */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none pointer-events-none">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block w-full h-14 text-slate-900 fill-current"
        >
          <path d="M0,0 C150,90 350,-40 500,40 C650,120 900,20 1200,60 L1200,120 L0,120 Z"></path>
        </svg>
      </div>
    </section>
  );
};
