import React from 'react';
import { ArrowRight } from 'lucide-react';

interface TastemakerHeroProps {
  onOpenBooking: () => void;
  onExploreProjects: () => void;
}

export const TastemakerHero: React.FC<TastemakerHeroProps> = ({
  onOpenBooking,
  onExploreProjects,
}) => {
  return (
    <section className="relative w-full pt-10 sm:pt-16 pb-16 sm:pb-24 px-4 sm:px-6 bg-[#F6F1E6] overflow-hidden border-b border-[#131313]/10">
      
      {/* Background Halftone Texture */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: 'radial-gradient(#131313 1.5px, transparent 1.5px)',
          backgroundSize: '18px 18px',
        }}
      ></div>

      <div className="max-w-[1240px] mx-auto relative z-10">
        
        {/* 2-Column Split: Text Left (50%) / Collage Right (50%) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column */}
          <div className="lg:col-span-6 flex flex-col space-y-5">
            
            {/* Top Micro-Eyebrow */}
            <div className="font-mono text-[11px] sm:text-xs font-bold tracking-widest text-[#131313]/70 uppercase">
              IDEAS • TECNOLOGÍA • ESTRATEGIA • RESULTADOS REALES
            </div>

            {/* Huge Headline matching Reference Image */}
            <h1 className="font-anton text-6xl sm:text-7xl xl:text-[88px] leading-[0.9] tracking-tight text-[#131313] uppercase">
              QUE LA IA <br />
              <span className="relative inline-block pr-2">
                TRABAJE POR
                {/* Yellow highlighter brush stroke behind */}
                <span className="absolute bottom-1 left-0 right-0 h-4 bg-[#FFE000] -z-10 -rotate-1"></span>
              </span> <br />
              <span className="bg-[#131313] text-white px-3 py-1 inline-block mt-1 shadow-[3px_3px_0px_#FFE000]">
                TU NEGOCIO.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="font-sans text-base sm:text-lg text-[#131313]/80 leading-relaxed font-medium max-w-lg">
              Consultoría, desarrollo de software, automatizaciones e inteligencia artificial para empresas que quieren crecer de verdad.
            </p>

            {/* Two Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <button
                onClick={onOpenBooking}
                className="flex items-center space-x-2 px-6 py-3.5 bg-[#FFE000] text-[#131313] font-sans font-bold text-sm uppercase tracking-wide rounded-full border border-[#131313]/30 shadow-sm hover:bg-[#edd000] transition-all cursor-pointer"
              >
                <span>Solicitar asesoría</span>
                <ArrowRight size={16} />
              </button>

              <button
                onClick={onExploreProjects}
                className="flex items-center space-x-2 px-6 py-3.5 bg-white text-[#131313] font-sans font-bold text-sm tracking-wide rounded-full border border-[#131313]/30 shadow-sm hover:bg-[#F6F1E6] transition-all cursor-pointer"
              >
                <span>Ver proyectos</span>
                <ArrowRight size={16} className="text-[#131313]/60" />
              </button>
            </div>

          </div>

          {/* Right Collage Art Composition (Faithful to Reference Image) */}
          <div className="lg:col-span-6 relative flex items-center justify-center min-h-[420px] sm:min-h-[480px]">
            
            {/* Layer 1: Mountain landscape with blue brush stroke */}
            <div className="absolute top-2 right-2 w-[85%] h-[280px] sm:h-[320px] rounded-2xl overflow-hidden border-2 border-[#131313] shadow-[5px_5px_0px_#131313] rotate-2">
              <img
                src="/images/collage/lake_bariloche.jpg"
                alt="Montañas y lago de Bariloche"
                className="w-full h-full object-cover grayscale contrast-125"
              />
              {/* Blue paint overlay */}
              <div className="absolute inset-0 bg-[#168CF5]/30 mix-blend-color"></div>
            </div>

            {/* Layer 2: Big Yellow Sun Graphic Circle */}
            <div className="absolute top-10 left-6 sm:left-12 w-48 sm:w-64 h-48 sm:h-64 rounded-full bg-[#FFE000] border-2 border-[#131313] shadow-[4px_4px_0px_#131313] -rotate-3 z-10 flex items-center justify-center">
              {/* Halftone dots inside circle */}
              <div 
                className="absolute inset-0 rounded-full opacity-25"
                style={{
                  backgroundImage: 'radial-gradient(#131313 1.5px, transparent 1.5px)',
                  backgroundSize: '10px 10px',
                }}
              ></div>
            </div>

            {/* Layer 3: Cutout of the young woman with laptop */}
            <div className="relative z-20 w-[80%] max-w-[360px] sm:max-w-[420px] pt-8">
              <img
                src="/images/collage/hero_woman_laptop.jpg"
                alt="Profesional con laptop iAtomica"
                className="w-full object-contain drop-shadow-2xl rounded-xl"
              />
            </div>

            {/* Layer 4: Red Marker Hand-Drawn Doodle Arrow */}
            <div className="absolute top-6 left-2 sm:left-4 z-30 transform -rotate-12 bg-white/95 border-2 border-[#F04B36] p-2 shadow-[2px_2px_0px_#F04B36] rounded-md">
              <span className="font-caveat text-sm sm:text-base font-bold text-[#F04B36] block leading-tight">
                IDEAS<br />
                ESTRATEGIA<br />
                AUTOMATIZACIÓN<br />
                CRECIMIENTO ➔
              </span>
            </div>

            {/* Layer 5: Yellow Sticker Tag on Right */}
            <div className="absolute bottom-6 right-2 sm:right-6 z-30 bg-[#FFE000] border-2 border-[#131313] px-3.5 py-1.5 shadow-[3px_3px_0px_#131313] rotate-2">
              <span className="font-mono text-xs font-black uppercase text-[#131313]">
                MENOS TAREAS REPETITIVAS.<br />
                MÁS RESULTADOS.
              </span>
            </div>

            {/* Decorative Hand-drawn Doodles */}
            <div className="absolute -top-3 right-12 z-30 text-[#131313] font-caveat text-2xl font-bold">
              ✦ ✦
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
