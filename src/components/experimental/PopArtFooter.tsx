import React from 'react';
import { ArrowLeft, MapPin } from 'lucide-react';

interface PopArtFooterProps {
  onReturnToSite: () => void;
}

export const PopArtFooter: React.FC<PopArtFooterProps> = ({
  onReturnToSite,
}) => {
  return (
    <footer className="w-full bg-[#111111] text-white border-t-4 border-black select-none">
      
      {/* Upper Giant Brand Banner */}
      <div className="border-b-2 border-neutral-800 px-4 sm:px-8 py-12 overflow-hidden bg-black">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="font-mono text-xs text-[#FFF000] font-black uppercase tracking-widest block mb-2">
              STUDIO DE INGENIERÍA & IA EDITORIAL
            </span>
            <h2 className="font-bebas text-7xl sm:text-9xl text-white tracking-tight leading-none">
              IATOMICA
            </h2>
          </div>

          <div className="flex flex-col items-start md:items-end space-y-2">
            <div className="flex items-center space-x-2 text-[#00A8F5] font-mono text-xs font-bold">
              <MapPin size={16} />
              <span>SAN CARLOS DE BARILOCHE, PATAGONIA ARGENTINA</span>
            </div>
            <p className="font-mono text-xs text-neutral-400">
              Desarrollando software y sistemas inteligentes para todo el mundo.
            </p>
          </div>
        </div>
      </div>

      {/* Middle Links & Return */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
        <div className="flex flex-wrap items-center gap-4 text-neutral-400">
          <a href="#hero-scroll" className="hover:text-[#FFF000] transition-colors">01. Scroll Hero</a>
          <span>•</span>
          <a href="#posters" className="hover:text-[#00A8F5] transition-colors">02. Galería Posters</a>
          <span>•</span>
          <a href="#servicios" className="hover:text-[#FF165F] transition-colors">03. Soluciones</a>
          <span>•</span>
          <a href="#roi-calc" className="hover:text-[#FFF000] transition-colors">04. Calculadora</a>
          <span>•</span>
          <a href="#casos" className="hover:text-[#034BFF] transition-colors">05. Clientes</a>
        </div>

        <button
          onClick={onReturnToSite}
          className="flex items-center space-x-2 px-3 py-1.5 bg-[#FFF000] text-black font-bold brutalist-border shadow-[2px_2px_0_#FFF] hover:bg-yellow-300 transition-colors cursor-pointer"
        >
          <ArrowLeft size={14} />
          <span>Volver a la versión original de iAtomica (/)</span>
        </button>
      </div>

      {/* Bottom Legal / Copyright Ticker */}
      <div className="bg-[#FFF000] text-black py-2 px-4 border-t-2 border-black font-mono text-[11px] font-black tracking-wider flex items-center justify-between">
        <span>© {new Date().getFullYear()} IATOMICA STUDIO • TODOS LOS DERECHOS RESERVADOS</span>
        <span className="hidden sm:inline">HECHO CON POP-ART NEO-BRUTALISM & REACT</span>
      </div>

    </footer>
  );
};
