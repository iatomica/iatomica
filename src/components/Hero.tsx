import React from 'react';
import { Sparkles, ArrowRight, Bot, Cpu, ShieldCheck, Zap, Layers } from 'lucide-react';

interface HeroProps {
  onOpenBooking: () => void;
  onOpenAiChat: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking, onOpenAiChat }) => {
  return (
    <section className="relative min-h-screen pt-32 pb-20 flex flex-col justify-center bg-grid-pattern overflow-hidden">
      
      {/* Ambient Glows */}
      <div className="ambient-glow-cyan top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      <div className="ambient-glow-violet top-1/3 left-1/4" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Animated Badge */}
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-emerald-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-8 backdrop-blur-md animate-pulse-glow shadow-lg shadow-cyan-500/10">
          <Zap className="w-3.5 h-3.5 text-cyan-400" />
          <span>IAtomica 2.0 &bull; Agentes Autónomos &amp; Software Enterprise</span>
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-5xl mx-auto leading-[1.1]">
          Transformamos Operaciones con <br className="hidden sm:inline" />
          <span className="text-gradient-cyan">Agentes de Inteligencia Artificial</span> <br className="hidden sm:inline" />
          &amp; Automatización Autónoma.
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-lg sm:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
          Diseñamos, integramos y escalamos arquitecturas de IA a medida, agentes multi-modal RAG, automatizaciones de procesos n8n/Make y plataformas SaaS enterprise que eliminan el trabajo repetitivo.
        </p>

        {/* Call To Actions */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onOpenBooking}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white font-bold text-sm shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.02] transition-all flex items-center justify-center space-x-2 group"
          >
            <Sparkles className="w-4 h-4 text-cyan-200" />
            <span>Agendar Cita de Consultoría</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={onOpenAiChat}
            className="w-full sm:w-auto px-8 py-4 rounded-xl glass-panel hover:bg-slate-800/80 text-slate-200 font-semibold text-sm border border-slate-700/80 hover:border-slate-600 transition-all flex items-center justify-center space-x-2"
          >
            <Bot className="w-4 h-4 text-cyan-400" />
            <span>Hablar con Asistente IA</span>
          </button>
        </div>

        {/* Quick Tech Badges */}
        <div className="mt-14 pt-10 border-t border-slate-800/60 max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-left">
          <div className="p-4 rounded-xl glass-panel border border-slate-800/80">
            <div className="flex items-center space-x-2 text-cyan-400 mb-1">
              <Cpu className="w-4 h-4" />
              <span className="font-mono text-xs uppercase tracking-wider font-bold">Agentes RAG</span>
            </div>
            <p className="text-xl font-extrabold text-white">99.8%</p>
            <p className="text-xs text-slate-400">Precisión en datos corporativos</p>
          </div>

          <div className="p-4 rounded-xl glass-panel border border-slate-800/80">
            <div className="flex items-center space-x-2 text-purple-400 mb-1">
              <Zap className="w-4 h-4" />
              <span className="font-mono text-xs uppercase tracking-wider font-bold">Ahorro de Tiempo</span>
            </div>
            <p className="text-xl font-extrabold text-white">+180K hs</p>
            <p className="text-xs text-slate-400">Automatizadas para clientes</p>
          </div>

          <div className="p-4 rounded-xl glass-panel border border-slate-800/80">
            <div className="flex items-center space-x-2 text-emerald-400 mb-1">
              <ShieldCheck className="w-4 h-4" />
              <span className="font-mono text-xs uppercase tracking-wider font-bold">Integraciones</span>
            </div>
            <p className="text-xl font-extrabold text-white">+50 APIs</p>
            <p className="text-xs text-slate-400">ERP, CRM, WhatsApp &amp; Cloud</p>
          </div>

          <div className="p-4 rounded-xl glass-panel border border-slate-800/80">
            <div className="flex items-center space-x-2 text-blue-400 mb-1">
              <Layers className="w-4 h-4" />
              <span className="font-mono text-xs uppercase tracking-wider font-bold">Latencia IA</span>
            </div>
            <p className="text-xl font-extrabold text-white">&lt;120 ms</p>
            <p className="text-xs text-slate-400">Respuesta multitrayecto 24/7</p>
          </div>
        </div>

      </div>
    </section>
  );
};
