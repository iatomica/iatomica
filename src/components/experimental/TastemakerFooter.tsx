import React from 'react';
import { AtomicMark } from './TastemakerNavbar';

export const TastemakerFooter: React.FC = () => {
  return (
    <footer className="w-full bg-[#131313] text-white border-t-2 border-[#131313] select-none">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 py-12 sm:py-16">
        
        {/* Main Footer Row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-10 border-b border-white/10">
          
          {/* Brand & Tagline */}
          <div className="space-y-1.5">
            <div className="flex items-center space-x-2.5">
              <AtomicMark className="w-8 h-8 text-white" color="#FFFFFF" />
              <span className="font-sans font-black text-2xl tracking-tight text-white">
                iAtomica
              </span>
            </div>
            <p className="font-mono text-xs uppercase tracking-widest text-[#FFE000]">
              TECNOLOGÍA PARA IDEAS QUE AVANZAN
            </p>
          </div>

          {/* Horizontal Links */}
          <nav className="flex flex-wrap items-center gap-6 font-sans text-xs font-semibold text-neutral-400">
            <a href="#servicios" className="hover:text-white transition-colors">Servicios</a>
            <a href="#proyectos" className="hover:text-white transition-colors">Proyectos</a>
            <a href="#proceso" className="hover:text-white transition-colors">Cómo trabajamos</a>
            <a href="#beneficios" className="hover:text-white transition-colors">Nosotros</a>
            <a href="#faq" className="hover:text-white transition-colors">Recursos</a>
            <a href="#contacto" className="hover:text-white transition-colors">Contacto</a>
          </nav>

          {/* Social Icons */}
          <div className="flex items-center space-x-4 font-mono text-xs text-neutral-400">
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
              in
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
              📸
            </a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
              ▶
            </a>
          </div>

        </div>

        {/* Legal Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-neutral-500">
          <div>
            © {new Date().getFullYear()} iAtomica. Todos los derechos reservados.
          </div>

          <div className="flex items-center space-x-6">
            <a href="#" className="hover:text-neutral-300 transition-colors">Términos</a>
            <a href="#" className="hover:text-neutral-300 transition-colors">Privacidad</a>
            <span className="text-[#FFE000]">BARILOCHE, PATAGONIA</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
