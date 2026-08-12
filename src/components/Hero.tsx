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
    <section className="relative min-h-[90vh] pt-32 pb-24 flex flex-col justify-center overflow-hidden">
      
      {/* Subtle Faded Grid Background Texture */}
      <div className="absolute inset-0 bg-grid-faded pointer-events-none opacity-70" />

      {/* Background Soft Glows */}
      <div className={`absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full filter blur-[110px] pointer-events-none opacity-40 ${
        darkMode ? 'bg-purple-900/30' : 'bg-orange-200/60'
      }`} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Human Headline & Messaging */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Friendly Badge */}
            <div className={`inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full text-xs font-bold border ${
              darkMode 
                ? 'bg-slate-800/80 border-slate-700 text-orange-400' 
                : 'bg-orange-50 border-orange-200 text-orange-600'
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
            <p className={`text-base sm:text-lg max-w-2xl leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
              Ayudamos a pymes, emprendimientos y empresas a modernizarse. Creamos herramientas de Inteligencia Artificial, software a medida, control de calidad y contenidos digitales.
            </p>

            {/* Human Benefit Pills */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className={`p-3 rounded-xl border flex items-center space-x-2.5 ${darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                <CheckCircle2 className="w-4 h-4 text-orange-500 shrink-0" />
                <span className="text-xs font-bold">Ahorro de Tiempo</span>
              </div>
              <div className={`p-3 rounded-xl border flex items-center space-x-2.5 ${darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                <ShieldCheck className="w-4 h-4 text-purple-500 shrink-0" />
                <span className="text-xs font-bold">Control &amp; Calidad</span>
              </div>
              <div className={`p-3 rounded-xl border flex items-center space-x-2.5 ${darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                <Sparkles className="w-4 h-4 text-emerald-500 shrink-0" />
                <span className="text-xs font-bold">Fácil de Usar</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
              <button
                onClick={onOpenBooking}
                className="w-full sm:w-auto px-8 py-4 rounded-xl gradient-brand text-white font-bold text-xs shadow-lg shadow-orange-500/25 hover:shadow-orange-500/35 hover:scale-[1.02] transition-all flex items-center justify-center space-x-2 group"
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
                    : 'bg-white border-slate-300 text-slate-800 hover:bg-slate-100 shadow-sm'
                }`}
              >
                <Bot className="w-4 h-4 text-purple-600" />
                <span>Hablar con Asistente IA</span>
              </button>
            </div>

          </div>

          {/* Right Column: Floating 100% Transparent Artwork (No Box Shadow, No Frame) */}
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

      {/* SVG Wave Divider Transition to Next Section */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none pointer-events-none">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className={`relative block w-full h-12 ${darkMode ? 'text-slate-900 fill-current' : 'text-purple-50/70 fill-current'}`}
        >
          <path d="M0,0 C150,90 350,-40 500,40 C650,120 900,20 1200,60 L1200,120 L0,120 Z"></path>
        </svg>
      </div>
    </section>
  );
};
