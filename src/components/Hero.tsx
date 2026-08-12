import React from 'react';
import { Sparkles, ArrowRight, Bot, Calendar, CheckCircle2, HeartHandshake, ShieldCheck } from 'lucide-react';
import heroPerson from '../assets/hero_person_transparent.webp';

interface HeroProps {
  onOpenBooking: () => void;
  onOpenAiChat: () => void;
  darkMode: boolean;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking, onOpenAiChat }) => {
  return (
    <section className="relative min-h-[92vh] pt-32 pb-28 flex flex-col justify-center overflow-hidden bg-gradient-to-br from-orange-500 via-purple-600 to-indigo-900 text-white">
      
      {/* Background Faded Grid Texture */}
      <div className="absolute inset-0 bg-grid-faded pointer-events-none opacity-30" />

      {/* Vibrant Ambient Glows */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-amber-400/30 filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[500px] h-[500px] rounded-full bg-fuchsia-500/30 filter blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headline & Messaging */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Friendly Badge */}
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full text-xs font-bold bg-white/15 border border-white/30 text-amber-200 backdrop-blur-md shadow-lg">
              <HeartHandshake className="w-4 h-4 text-amber-300" />
              <span>Tu Socio Tecnológico de Confianza</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-[1.1] text-white">
              Consultoría &amp; Desarrollo de <br />
              <span className="text-amber-300 drop-shadow-md">Soluciones Digitales e IA</span> <br />
              para Tu Empresa.
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg max-w-2xl leading-relaxed text-purple-100 font-medium">
              Ayudamos a pymes, emprendimientos y empresas a modernizarse. Creamos herramientas de Inteligencia Artificial, software a medida, control de calidad y contenidos digitales.
            </p>

            {/* Benefit Pills */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center space-x-2.5 shadow-lg">
                <CheckCircle2 className="w-4.5 h-4.5 text-amber-300 shrink-0" />
                <span className="text-xs font-extrabold text-white">Ahorro de Tiempo</span>
              </div>
              <div className="p-3.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center space-x-2.5 shadow-lg">
                <ShieldCheck className="w-4.5 h-4.5 text-amber-300 shrink-0" />
                <span className="text-xs font-extrabold text-white">Control &amp; Calidad</span>
              </div>
              <div className="p-3.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center space-x-2.5 shadow-lg">
                <Sparkles className="w-4.5 h-4.5 text-amber-300 shrink-0" />
                <span className="text-xs font-extrabold text-white">Fácil de Usar</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
              <button
                onClick={onOpenBooking}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs shadow-xl shadow-amber-400/30 hover:scale-[1.02] transition-all flex items-center justify-center space-x-2 group"
              >
                <Calendar className="w-4 h-4" />
                <span>Agendar Cita de Consultoría</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onOpenAiChat}
                className="w-full sm:w-auto px-7 py-4 rounded-xl bg-white/15 hover:bg-white/25 border border-white/30 text-white font-bold text-xs backdrop-blur-md transition-all flex items-center justify-center space-x-2"
              >
                <Bot className="w-4 h-4 text-amber-300" />
                <span>Hablar con Asistente IA</span>
              </button>
            </div>

          </div>

          {/* Right Column: Floating Artwork */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            <div className="relative w-full max-w-md">
              <img
                src={heroPerson}
                alt="iAtomica Team Illustration"
                className="w-full h-auto object-contain artwork-cutout pointer-events-none drop-shadow-2xl"
              />
            </div>
          </div>

        </div>
      </div>

      {/* Fusion Feather Bottom */}
      <div className="fusion-feather-bottom" />
    </section>
  );
};
