import React from 'react';
import { Sparkles, ArrowRight, Bot, Cpu, Zap, Globe, ShoppingBag, Building2 } from 'lucide-react';
import heroImg from '../assets/hero_illustration.webp';

interface HeroProps {
  onOpenBooking: () => void;
  onOpenAiChat: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking, onOpenAiChat }) => {
  return (
    <section className="relative min-h-screen pt-32 pb-20 flex flex-col justify-center bg-grid-line overflow-hidden">
      
      {/* Ambient Auras: Orange & Violet */}
      <div className="aura-orange top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-70" />
      <div className="aura-violet top-1/3 left-1/4 opacity-60" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Editorial Headline & Messaging */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Signature Badge */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-orange-500/30 text-orange-400 text-xs font-mono backdrop-blur-md shadow-lg shadow-orange-500/10">
              <Zap className="w-3.5 h-3.5 text-orange-400" />
              <span>Consultoría Estratégica &amp; Soluciones de IA a Medida</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-6xl font-black tracking-tight text-white leading-[1.08]">
              Diseñamos e Integramos <br />
              <span className="text-gradient-brand">Tecnología de IA Avanzada</span> <br />
              para Escalar Operaciones.
            </h1>

            {/* Editorial Subtitle */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              Desarrollamos soluciones de software custom, agentes inteligentes autónomos y automatizaciones E2E para empresas comerciales, importadores, retail y corporaciones que buscan liderazgo operativo.
            </p>

            {/* Target Markets Pills */}
            <div className="flex flex-wrap gap-3 pt-2">
              <div className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-300 text-xs font-medium">
                <Globe className="w-4 h-4 text-orange-400" />
                <span>Comercio Exterior &amp; Trading</span>
              </div>
              <div className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-300 text-xs font-medium">
                <ShoppingBag className="w-4 h-4 text-purple-400" />
                <span>Retail &amp; E-Commerce</span>
              </div>
              <div className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-300 text-xs font-medium">
                <Building2 className="w-4 h-4 text-cyan-400" />
                <span>Empresas &amp; Corporativo</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
              <button
                onClick={onOpenBooking}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl gradient-brand text-white font-bold text-xs shadow-xl shadow-orange-500/20 hover:shadow-orange-500/40 hover:scale-[1.02] transition-all flex items-center justify-center space-x-2 group"
              >
                <Sparkles className="w-4 h-4 text-orange-200" />
                <span>Agendar Cita de Consultoría</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onOpenAiChat}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl linear-card hover:bg-slate-800/80 text-slate-200 font-semibold text-xs border border-slate-700/80 transition-all flex items-center justify-center space-x-2"
              >
                <Bot className="w-4 h-4 text-purple-400" />
                <span>Conversar con Asistente IA</span>
              </button>
            </div>

          </div>

          {/* Right Column: Custom 3D Low-Poly Artwork */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-lg">
              {/* Subtle Glowing Backdrop */}
              <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/20 to-purple-600/20 rounded-3xl filter blur-3xl opacity-60" />

              {/* Main Artwork Container */}
              <div className="relative p-2 rounded-3xl linear-card border border-orange-500/30 overflow-hidden shadow-2xl shadow-purple-950/50">
                <img
                  src={heroImg}
                  alt="IAtomica 3D Artwork"
                  className="w-full h-auto object-cover rounded-2xl filter drop-shadow-xl"
                />

                {/* Floating Status Badge Overlay */}
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl glass-panel border border-white/10 flex items-center justify-between text-xs backdrop-blur-md">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-orange-500/20 text-orange-400 border border-orange-500/30">
                      <Cpu className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white">Agentes RAG &amp; Software</h4>
                      <p className="text-[10px] text-slate-400">Arquitecturas Enterprise a medida</p>
                    </div>
                  </div>
                  <span className="font-mono text-[10px] px-2 py-1 rounded bg-purple-500/20 text-purple-300 font-bold border border-purple-500/30">
                    E2E READY
                  </span>
                </div>

              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
