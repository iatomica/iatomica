import React from 'react';
import { ArrowLeft, Zap } from 'lucide-react';

interface PopArtNavbarProps {
  onReturnToSite: () => void;
  onOpenBooking: () => void;
}

export const PopArtNavbar: React.FC<PopArtNavbarProps> = ({
  onReturnToSite,
  onOpenBooking,
}) => {
  return (
    <header className="sticky top-0 z-50 w-full select-none">
      {/* Running Marquee / Ticker Tape */}
      <div className="w-full bg-[#FFF000] border-b-2 border-black overflow-hidden py-1 px-2 font-mono text-xs font-black tracking-widest text-black flex items-center">
        <div className="flex items-center space-x-6 whitespace-nowrap animate-marquee">
          <span>⚡ QUE LA IA TRABAJE POR Y PARA TU NEGOCIO</span>
          <span>•</span>
          <span>ASESORÍA GRATUITA DISPONIBLE</span>
          <span>•</span>
          <span>MENOS TAREAS MANUALES, MÁS TIEMPO, MÁS CLIENTES</span>
          <span>•</span>
          <span>DESDE BARILOCHE PARA TODO EL PAÍS</span>
          <span>•</span>
          <span>AUTOMATIZACIÓN • BOTS • SOFTWARE • CONSULTORÍA</span>
          <span>•</span>
          <span>⚡ QUE LA IA TRABAJE POR Y PARA TU NEGOCIO</span>
          <span>•</span>
          <span>ASESORÍA GRATUITA DISPONIBLE</span>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="w-full bg-[#F6F1E7] border-b-4 border-black px-4 sm:px-8 py-3 flex items-center justify-between shadow-[0_4px_0_#111111]">
        {/* Brand Logo & Editorial Stamp */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-black text-[#FFF000] flex items-center justify-center font-black text-xl brutalist-border shadow-[2px_2px_0_#FFF000]">
            ⚡
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-bebas text-3xl tracking-wider text-black leading-none">
                IATOMICA
              </span>
              <span className="bg-[#FF165F] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-none font-mono uppercase tracking-wider border border-black transform -rotate-2">
                POP-ART UI
              </span>
            </div>
            <p className="text-[10px] font-mono text-neutral-600 uppercase tracking-widest">
              Editorial Studio • Bariloche
            </p>
          </div>
        </div>

        {/* Links Desktop */}
        <div className="hidden md:flex items-center space-x-6 font-mono text-xs font-bold uppercase tracking-wider text-black">
          <a
            href="#hero-scroll"
            className="hover:bg-[#FFF000] hover:px-2 py-1 transition-all border-b-2 border-transparent hover:border-black"
          >
            01. Scroll Hero
          </a>
          <a
            href="#posters"
            className="hover:bg-[#00A8F5] hover:text-white hover:px-2 py-1 transition-all border-b-2 border-transparent hover:border-black"
          >
            02. Galería Posters
          </a>
          <a
            href="#servicios"
            className="hover:bg-[#FF165F] hover:text-white hover:px-2 py-1 transition-all border-b-2 border-transparent hover:border-black"
          >
            03. Soluciones
          </a>
          <a
            href="#roi-calc"
            className="hover:bg-[#FFF000] hover:px-2 py-1 transition-all border-b-2 border-transparent hover:border-black"
          >
            04. Calculadora
          </a>
          <a
            href="#casos"
            className="hover:bg-[#034BFF] hover:text-white hover:px-2 py-1 transition-all border-b-2 border-transparent hover:border-black"
          >
            05. Clientes
          </a>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-3">
          <button
            onClick={onReturnToSite}
            className="hidden sm:flex items-center space-x-1 px-3 py-1.5 bg-white text-black font-mono text-xs font-bold brutalist-border shadow-[2px_2px_0_#111] hover:bg-neutral-100 transition-all cursor-pointer"
            title="Volver a la versión original de iAtomica"
          >
            <ArrowLeft size={14} />
            <span>Volver a Home (/)</span>
          </button>

          <button
            onClick={onOpenBooking}
            className="flex items-center space-x-2 px-4 py-2 bg-[#FFF000] text-black font-bebas text-lg tracking-wider brutalist-btn cursor-pointer"
          >
            <Zap size={16} className="fill-black" />
            <span>ASESORÍA GRATUITA</span>
          </button>
        </div>
      </nav>
    </header>
  );
};
