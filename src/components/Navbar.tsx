import React, { useState, useEffect } from 'react';
import { Sparkles, Calendar, Menu, X, ArrowRight, Activity, Cpu } from 'lucide-react';

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
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'linear-nav py-3.5' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand Logo: Signature Orange & Violet Badge */}
        <a href="#" className="flex items-center space-x-3 group">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl gradient-brand p-[1.5px] shadow-lg shadow-orange-500/20 group-hover:shadow-orange-500/40 transition-all">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Cpu className="w-5 h-5 text-orange-400 group-hover:rotate-45 transition-transform duration-300" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-heading font-black text-xl tracking-tight text-white flex items-center gap-1.5">
              iAtomica <span className="text-[10px] px-1.5 py-0.5 rounded bg-orange-500/10 text-orange-400 border border-orange-500/30 font-mono font-bold">2.0</span>
            </span>
            <span className="text-[10px] text-slate-400 font-mono tracking-wider uppercase">AI &amp; Software Studio</span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center space-x-8 text-xs font-semibold uppercase tracking-wider text-slate-300 font-mono">
          <a href="#soluciones" className="hover:text-orange-400 transition-colors">Soluciones</a>
          <a href="#comercio" className="hover:text-orange-400 transition-colors">Comercio &amp; Trading</a>
          <a href="#metodologia" className="hover:text-orange-400 transition-colors">Metodología</a>
          <a href="#arquitectura" className="hover:text-orange-400 transition-colors">Arquitectura</a>
          <a href="#contacto" className="hover:text-orange-400 transition-colors">Contacto</a>
        </nav>

        {/* Action Buttons */}
        <div className="hidden lg:flex items-center space-x-4">
          <div className="flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono">
            <Activity className="w-3.5 h-3.5 animate-pulse text-orange-400" />
            <span>Consultoría &amp; Dev</span>
          </div>

          <button
            onClick={onOpenAiChat}
            className="flex items-center space-x-2 px-3.5 py-1.5 rounded-lg bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 text-slate-200 text-xs font-medium transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>Asistente IA</span>
          </button>

          <button
            onClick={onOpenBooking}
            className="relative group overflow-hidden px-4.5 py-2 rounded-xl gradient-brand text-white font-bold text-xs shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 transition-all flex items-center space-x-2"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Agendar Cita</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Mobile Menu Toggle */}
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
        <div className="md:hidden linear-card border-b border-slate-800 p-5 mt-3 space-y-4">
          <a href="#soluciones" onClick={() => setMobileMenuOpen(false)} className="block text-slate-200 hover:text-orange-400 text-sm font-medium">Soluciones</a>
          <a href="#comercio" onClick={() => setMobileMenuOpen(false)} className="block text-slate-200 hover:text-orange-400 text-sm font-medium">Comercio &amp; Trading</a>
          <a href="#metodologia" onClick={() => setMobileMenuOpen(false)} className="block text-slate-200 hover:text-orange-400 text-sm font-medium">Metodología</a>
          <a href="#arquitectura" onClick={() => setMobileMenuOpen(false)} className="block text-slate-200 hover:text-orange-400 text-sm font-medium">Arquitectura</a>
          <a href="#contacto" onClick={() => setMobileMenuOpen(false)} className="block text-slate-200 hover:text-orange-400 text-sm font-medium">Contacto</a>
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
              className="w-full py-2.5 rounded-lg gradient-brand text-white text-xs font-semibold flex items-center justify-center space-x-2 shadow-lg shadow-orange-500/20"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Agendar Cita de Consultoría</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
