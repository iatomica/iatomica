import React, { useState } from 'react';
import { Menu, X, ArrowRight, Sun, Moon, Cpu, ShieldAlert, LayoutDashboard } from 'lucide-react';

interface NavbarProps {
  onOpenBooking?: () => void;
  onOpenAdmin: () => void;
  isLoggedIn: boolean;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAdmin, isLoggedIn, darkMode, onToggleDarkMode }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 py-3.5 border-b shadow-sm ${
      darkMode 
        ? 'bg-slate-900/85 backdrop-blur-xl border-slate-800/80 shadow-black/20' 
        : 'bg-white/88 backdrop-blur-xl border-slate-200/80 shadow-slate-900/5'
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
          <a href="#portfolio" className="hover:text-orange-500 transition-colors">Portfolio</a>
          <a href="#soluciones" className="hover:text-orange-500 transition-colors">Soluciones</a>
          <a href="#metodologia" className="hover:text-orange-500 transition-colors">Cómo Trabajamos</a>
          <a href="#contacto" className="hover:text-orange-500 transition-colors">Contacto</a>
        </nav>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center space-x-3">
          
          {/* Light/Dark Toggle */}
          <button
            onClick={onToggleDarkMode}
            className={`p-2 rounded-xl border transition-colors cursor-pointer ${
              darkMode ? 'bg-slate-800 border-slate-700 text-amber-400' : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
            }`}
            title="Cambiar Modo Claro / Oscuro"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Primary Action: Acceso al Sistema / Login */}
          <button
            onClick={onOpenAdmin}
            className="relative group overflow-hidden px-5 py-2.5 rounded-xl gradient-brand text-white font-bold text-xs shadow-md shadow-orange-500/20 hover:shadow-orange-500/30 transition-all flex items-center space-x-2 cursor-pointer"
            title={isLoggedIn ? "Ir al Panel de Gestión" : "Acceso a la Plataforma / Iniciar Sesión"}
          >
            {isLoggedIn ? <LayoutDashboard className="w-3.5 h-3.5" /> : <ShieldAlert className="w-3.5 h-3.5" />}
            <span>{isLoggedIn ? 'Panel de Gestión' : 'Acceso'}</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center space-x-2">
          <button
            onClick={onOpenAdmin}
            className="px-3 py-1.5 rounded-xl gradient-brand text-white text-xs font-bold flex items-center gap-1.5 shadow-sm"
            title={isLoggedIn ? "Panel" : "Acceso"}
          >
            {isLoggedIn ? <LayoutDashboard size={14} /> : <ShieldAlert size={14} />}
            <span>{isLoggedIn ? 'Panel' : 'Acceso'}</span>
          </button>
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
          <a href="#portfolio" onClick={() => setMobileMenuOpen(false)} className="block font-semibold text-sm">Portfolio</a>
          <a href="#soluciones" onClick={() => setMobileMenuOpen(false)} className="block font-semibold text-sm">Soluciones</a>
          <a href="#metodologia" onClick={() => setMobileMenuOpen(false)} className="block font-semibold text-sm">Cómo Trabajamos</a>
          <a href="#contacto" onClick={() => setMobileMenuOpen(false)} className="block font-semibold text-sm">Contacto</a>
          <div className="pt-3 border-t flex flex-col space-y-2">
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenAdmin(); }}
              className="w-full py-2.5 rounded-xl gradient-brand text-white text-xs font-bold flex items-center justify-center space-x-2 shadow-md shadow-orange-500/20 cursor-pointer"
            >
              {isLoggedIn ? <LayoutDashboard size={14} /> : <ShieldAlert size={14} />}
              <span>{isLoggedIn ? 'Panel de Gestión' : 'Acceso a la Plataforma'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
