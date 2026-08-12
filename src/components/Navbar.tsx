import React, { useState, useEffect } from 'react';
import { Bot, Sparkles, Calendar, Menu, X, ArrowRight, Activity } from 'lucide-react';

interface NavbarProps {
  onOpenBooking: () => void;
  onOpenAiChat: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking, onOpenAiChat }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass-nav py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand Logo */}
        <a href="#" className="flex items-center space-x-3 group">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-600 p-[1px] shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-all">
            <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center">
              <Bot className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-heading font-extrabold text-xl tracking-tight text-white flex items-center gap-1.5">
              iAtomica <span className="text-xs px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-mono">2.0</span>
            </span>
            <span className="text-[10px] text-slate-400 font-mono tracking-wider uppercase">AI & Software Studio</span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-300">
          <a href="#servicios" className="hover:text-cyan-400 transition-colors">Servicios</a>
          <a href="#simulador" className="hover:text-cyan-400 transition-colors">Simulador IA</a>
          <a href="#calculadora" className="hover:text-cyan-400 transition-colors">Calculadora ROI</a>
          <a href="#arquitectura" className="hover:text-cyan-400 transition-colors">Arquitectura</a>
          <a href="#casos" className="hover:text-cyan-400 transition-colors">Casos de Éxito</a>
        </nav>

        {/* Action Buttons & Status */}
        <div className="hidden lg:flex items-center space-x-4">
          <div className="flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
            <Activity className="w-3.5 h-3.5 animate-pulse" />
            <span>Sistemas 100% Operativos</span>
          </div>

          <button
            onClick={onOpenAiChat}
            className="flex items-center space-x-2 px-3.5 py-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-slate-700/60 text-slate-200 text-xs font-medium transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>Asistente IA</span>
          </button>

          <button
            onClick={onOpenBooking}
            className="relative group overflow-hidden px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold text-xs shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all flex items-center space-x-2"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Agendar Cita Demo</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-3">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-400 hover:text-white"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-panel border-b border-slate-800 p-5 mt-3 space-y-4">
          <a 
            href="#servicios" 
            onClick={() => setMobileMenuOpen(false)}
            className="block text-slate-200 hover:text-cyan-400 text-sm font-medium"
          >
            Servicios
          </a>
          <a 
            href="#simulador" 
            onClick={() => setMobileMenuOpen(false)}
            className="block text-slate-200 hover:text-cyan-400 text-sm font-medium"
          >
            Simulador IA
          </a>
          <a 
            href="#calculadora" 
            onClick={() => setMobileMenuOpen(false)}
            className="block text-slate-200 hover:text-cyan-400 text-sm font-medium"
          >
            Calculadora ROI
          </a>
          <a 
            href="#arquitectura" 
            onClick={() => setMobileMenuOpen(false)}
            className="block text-slate-200 hover:text-cyan-400 text-sm font-medium"
          >
            Arquitectura
          </a>
          <a 
            href="#casos" 
            onClick={() => setMobileMenuOpen(false)}
            className="block text-slate-200 hover:text-cyan-400 text-sm font-medium"
          >
            Casos de Éxito
          </a>
          <div className="pt-3 border-t border-slate-800 flex flex-col space-y-2">
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenAiChat(); }}
              className="w-full py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-200 text-xs font-medium flex items-center justify-center space-x-2"
            >
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              <span>Hablar con Asistente IA</span>
            </button>
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenBooking(); }}
              className="w-full py-2.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-semibold flex items-center justify-center space-x-2 shadow-lg shadow-cyan-500/20"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Agendar Cita Demo</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
