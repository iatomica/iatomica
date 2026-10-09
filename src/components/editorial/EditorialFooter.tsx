import React from 'react';
import { ArrowUp, MapPin } from 'lucide-react';
import { AtomLogo } from './EditorialNavbar';

interface EditorialFooterProps {
  onOpenBooking: () => void;
}

export const EditorialFooter: React.FC<EditorialFooterProps> = ({
  onOpenBooking,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#131313] text-white border-t-4 border-[#131313] select-none">
      
      {/* Top Banner */}
      <div className="max-w-[1320px] mx-auto px-5 sm:px-10 lg:px-14 py-16 sm:py-20 border-b border-white/10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-14">
          
          {/* Brand info (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center space-x-2.5">
              <AtomLogo className="w-9 h-9 text-[#FFE000]" color="#FFE000" />
              <span className="font-sans font-black text-2xl tracking-tight text-white">
                iAtomica
              </span>
            </div>

            <p className="font-sans text-sm text-neutral-400 max-w-sm leading-relaxed">
              Consultoría estratégica, agentes de inteligencia artificial y desarrollo de software moderno. 
              Tecnología para ideas que avanzan.
            </p>

            <div className="flex items-center space-x-2 text-xs font-mono text-[#FFE000] pt-2">
              <MapPin size={15} />
              <span>San Carlos de Bariloche, Patagonia Argentina</span>
            </div>
          </div>

          {/* Navigation Links (3 cols) */}
          <div className="md:col-span-3 space-y-3 font-sans text-sm">
            <span className="font-mono text-xs font-black uppercase text-[#FFE000] block tracking-wider mb-2">
              SECCIONES
            </span>
            <ul className="space-y-2 text-neutral-400 font-medium">
              <li><a href="#servicios" className="hover:text-white transition-colors">Servicios</a></li>
              <li><a href="#proyectos" className="hover:text-white transition-colors">Proyectos</a></li>
              <li><a href="#proceso" className="hover:text-white transition-colors">Cómo trabajamos</a></li>
              <li><a href="#por-que" className="hover:text-white transition-colors">Por qué iAtomica</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">Preguntas frecuentes</a></li>
              <li><a href="#contacto" className="hover:text-white transition-colors">Contacto</a></li>
            </ul>
          </div>

          {/* Social / Contact (4 cols) */}
          <div className="md:col-span-4 space-y-4">
            <span className="font-mono text-xs font-black uppercase text-[#FFE000] block tracking-wider">
              CONECTEMOS
            </span>

            <p className="font-mono text-xs text-neutral-400">
              hola@iatomica.com <br />
              Atención remota para todo el país y el exterior.
            </p>

            <button
              onClick={onOpenBooking}
              className="inline-flex items-center space-x-2 px-5 py-2.5 bg-[#FFE000] text-[#131313] font-sans font-bold text-xs uppercase tracking-wide border border-white hover:bg-yellow-300 transition-colors cursor-pointer"
            >
              <span>Solicitar asesoría</span>
            </button>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-[1320px] mx-auto px-5 sm:px-10 lg:px-14 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-neutral-500">
        <div>
          © {new Date().getFullYear()} iAtomica Studio. Todos los derechos reservados.
        </div>

        <div className="flex items-center space-x-6">
          <span className="text-[#FFE000]">EDITORIAL VOX × POP-ART</span>
          <button
            onClick={scrollToTop}
            className="flex items-center space-x-1 text-white hover:text-[#FFE000] transition-colors cursor-pointer"
          >
            <span>Volver arriba</span>
            <ArrowUp size={14} />
          </button>
        </div>
      </div>

    </footer>
  );
};
