import React, { useState, useEffect } from 'react';
import { Sparkles, Calendar, Menu, X, ArrowRight, Sun, Moon, Cpu } from 'lucide-react';

interface NavbarProps {
  onOpenBooking: () => void;
  onOpenAiChat: () => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking, onOpenAiChat, darkMode, onToggleDarkMode }) => {
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
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? darkMode ? 'bg-slate-900/90 backdrop-blur-md border-b border-slate-800 py-3.5 shadow-sm' : 'bg-white/90 backdrop-blur-md border-b border-slate-200 py-3.5 shadow-sm'
        : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand Logo */}
        <a href="#" className="flex items-center space-x-3 group">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl gradient-brand p-[1.5px] shadow-md shadow-orange-500/20 group-hover:scale-105 transition-all">
            <div className={`w-full h-full rounded-[10px] flex items-center justify-center ${darkMode ? 'bg-slate-950' : 'bg-white'}`}>
              <Cpu className="w-5 h-5 text-orange-500" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className={`font-heading font-black text-xl tracking-tight flex items-center gap-1.5 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              iAtomica <span className="text-[10px] px-2 py-0.5 rounded-full bg-orange-500/10 text-orange-600 font-bold border border-orange-500/20 font-mono">2.0</span>
            </span>
            <span className={`text-[10px] font-medium ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Consultoría &amp; Software</span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className={`hidden md:flex items-center space-x-8 text-xs font-bold uppercase tracking-wider ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
          <a href="#servicios" className="hover:text-orange-500 transition-colors">Servicios</a>
          <a href="#soluciones" className="hover:text-orange-500 transition-colors">Soluciones</a>
          <a href="#metodologia" className="hover:text-orange-500 transition-colors">Cómo Trabajamos</a>
          <a href="#contacto" className="hover:text-orange-500 transition-colors">Contacto</a>
        </nav>

        {/* Action Buttons */}
        <div className="hidden lg:flex items-center space-x-3">
          
          {/* Light/Dark Toggle */}
          <button
            onClick={onToggleDarkMode}
            className={`p-2 rounded-xl border transition-colors ${
              darkMode ? 'bg-slate-800 border-slate-700 text-amber-400' : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
            }`}
            title="Cambiar Modo Claro / Oscuro"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <button
            onClick={onOpenAiChat}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl border text-xs font-bold transition-colors ${
              darkMode ? 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700' : 'bg-slate-100 border-slate-200 text-slate-800 hover:bg-slate-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-600" />
            <span>Asistente IA</span>
          </button>

          <button
            onClick={onOpenBooking}
            className="relative group overflow-hidden px-4.5 py-2.5 rounded-xl gradient-brand text-white font-bold text-xs shadow-md shadow-orange-500/20 hover:shadow-orange-500/30 transition-all flex items-center space-x-2"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Agendar Cita</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-2">
          <button
            onClick={onToggleDarkMode}
            className={`p-2 rounded-xl border ${darkMode ? 'bg-slate-800 text-amber-400' : 'bg-slate-100 text-slate-700'}`}
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-2 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className={`md:hidden p-5 mt-3 border-b space-y-4 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
          <a href="#servicios" onClick={() => setMobileMenuOpen(false)} className="block font-semibold text-sm">Servicios</a>
          <a href="#soluciones" onClick={() => setMobileMenuOpen(false)} className="block font-semibold text-sm">Soluciones</a>
          <a href="#metodologia" onClick={() => setMobileMenuOpen(false)} className="block font-semibold text-sm">Cómo Trabajamos</a>
          <a href="#contacto" onClick={() => setMobileMenuOpen(false)} className="block font-semibold text-sm">Contacto</a>
          <div className="pt-3 border-t flex flex-col space-y-2">
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenBooking(); }}
              className="w-full py-2.5 rounded-xl gradient-brand text-white text-xs font-bold flex items-center justify-center space-x-2"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Agendar Cita</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
