import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

interface EditorialHeroProps {
  onOpenBooking: () => void;
  onExploreProjects: () => void;
}

export const EditorialHero: React.FC<EditorialHeroProps> = ({
  onOpenBooking,
  onExploreProjects,
}) => {
  return (
    <section className="relative w-full pt-28 sm:pt-36 pb-16 sm:pb-24 px-5 sm:px-10 lg:px-14 overflow-hidden border-b border-[#131313]/15">
      
      {/* Subtle halftone background grid */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: 'radial-gradient(#131313 1.5px, transparent 1.5px)',
          backgroundSize: '16px 16px',
        }}
      ></div>

      <div className="max-w-[1320px] mx-auto relative z-10">
        
        {/* Main 2-Column Grid 47/53 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Editorial Content (47%) */}
          <div className="lg:col-span-6 xl:col-span-6 flex flex-col space-y-6">
            
            {/* Eyebrow Label */}
            <div className="self-start inline-flex items-center space-x-2 bg-[#FFE000] border-2 border-[#131313] px-3 py-1 shadow-[2px_2px_0px_#131313] -rotate-1">
              <span className="font-mono text-xs font-black uppercase tracking-wider text-[#131313]">
                ⚡ INTELIGENCIA ARTIFICIAL &amp; SOFTWARE A MEDIDA
              </span>
            </div>

            {/* Giant Display Headline */}
            <h1 className="font-anton text-5xl sm:text-7xl xl:text-[84px] leading-[0.92] tracking-tight text-[#131313] uppercase">
              QUE LA IA <br />
              <span className="bg-[#FFE000] px-2 py-0.5 inline-block border-2 border-[#131313] shadow-[3px_3px_0px_#131313] rotate-1 my-1">
                TRABAJE POR
              </span> <br />
              TU NEGOCIO.
            </h1>

            {/* Explanatory Editorial Deck / Subtitle */}
            <p className="font-sans text-base sm:text-lg text-[#131313]/85 leading-relaxed font-medium max-w-xl">
              Consultoría estratégica, agentes autónomos y desarrollo de software moderno. 
              Transformamos procesos manuales en sistemas automatizados para que tu equipo opere con ventaja.
            </p>

            {/* CTA Group */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onOpenBooking}
                className="flex items-center space-x-2 px-6 py-3.5 bg-[#FFE000] text-[#131313] font-sans font-bold text-base border-2 border-[#131313] shadow-[4px_4px_0px_#131313] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#131313] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_#131313] transition-all cursor-pointer"
              >
                <span>Solicitar asesoría</span>
                <ArrowRight size={18} />
              </button>

              <button
                onClick={onExploreProjects}
                className="flex items-center space-x-2 px-6 py-3.5 bg-white text-[#131313] font-sans font-bold text-base border-2 border-[#131313] shadow-[3px_3px_0px_#131313] hover:bg-[#F6F1E6] transition-colors cursor-pointer"
              >
                <span>Ver proyectos</span>
                <span className="text-[#131313]/60">→</span>
              </button>
            </div>

            {/* Micro Pillars / Trust Badges */}
            <div className="pt-3 border-t border-[#131313]/15 flex flex-wrap gap-y-2 gap-x-5 font-mono text-xs text-[#131313]/75 font-semibold">
              <div className="flex items-center space-x-1.5">
                <CheckCircle2 size={14} className="text-[#32C878]" />
                <span>Casos verificables</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <CheckCircle2 size={14} className="text-[#32C878]" />
                <span>Propiedad del código</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <CheckCircle2 size={14} className="text-[#32C878]" />
                <span>San Carlos de Bariloche</span>
              </div>
            </div>

          </div>

          {/* Right Collage Composition (53%) */}
          <div className="lg:col-span-6 xl:col-span-6 relative mt-4 lg:mt-0">
            
            {/* Background Graphic Accents */}
            <div className="absolute -top-6 -right-6 w-32 h-32 rounded-full bg-[#168CF5]/20 -z-10 blur-xl"></div>
            <div className="absolute -bottom-8 -left-8 w-40 h-40 rounded-full bg-[#FFE000]/30 -z-10 blur-xl"></div>

            {/* Collage Canvas Frame */}
            <div className="relative bg-white border-3 border-[#131313] shadow-[8px_8px_0px_#131313] p-4 sm:p-6 overflow-hidden">
              
              {/* Top editorial tape header */}
              <div className="flex items-center justify-between border-b-2 border-[#131313] pb-3 mb-4 font-mono text-xs font-bold">
                <span className="bg-[#131313] text-[#FFE000] px-2 py-0.5 uppercase tracking-wider">
                  FIG. 01 — IATOMICA LAB
                </span>
                <span className="text-[#131313]/60">
                  REF: PATAGONIA // 2026
                </span>
              </div>

              {/* Main Visual Composition: Person + Bariloche Lake + Stickers */}
              <div className="relative w-full h-[320px] sm:h-[400px] bg-[#E8E2D5] border-2 border-[#131313] overflow-hidden flex items-end justify-center">
                
                {/* Background Landscape: Bariloche Lake */}
                <img
                  src="/images/collage/lake_bariloche.jpg"
                  alt="Paisaje de San Carlos de Bariloche"
                  className="absolute inset-0 w-full h-full object-cover grayscale opacity-45 mix-blend-multiply"
                />

                {/* Halftone texture overlay on background */}
                <div 
                  className="absolute inset-0 pointer-events-none opacity-20"
                  style={{
                    backgroundImage: 'radial-gradient(#131313 1px, transparent 1px)',
                    backgroundSize: '8px 8px',
                  }}
                ></div>

                {/* Foreground Cutout: Real Person Working */}
                <img
                  src="/images/collage/entrepreneur_thinking.jpg"
                  alt="Profesional pensando soluciones de software"
                  className="relative z-10 max-h-[92%] object-contain drop-shadow-xl"
                />

                {/* Sticker 1: Top-Left Rotuladora Tape */}
                <div className="absolute top-4 left-4 z-20 bg-[#FFE000] border-2 border-[#131313] px-3 py-1 font-mono text-xs font-black uppercase text-[#131313] shadow-[2px_2px_0px_#131313] -rotate-3">
                  MENOS TAREAS REPETITIVAS
                </div>

                {/* Sticker 2: Top-Right Neon Pink Badge */}
                <div className="absolute top-4 right-4 z-20 bg-[#FF3D8D] text-white border-2 border-[#131313] px-2.5 py-1 font-mono text-[11px] font-black uppercase shadow-[2px_2px_0px_#131313] rotate-2">
                  24/7 BOTS ACTIVOS
                </div>

                {/* Bottom Metric Pill */}
                <div className="absolute bottom-4 left-4 z-20 bg-white/95 backdrop-blur-sm border-2 border-[#131313] p-2.5 shadow-[3px_3px_0px_#131313] flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-[#32C878] text-white flex items-center justify-center font-bold text-sm">
                    ✓
                  </div>
                  <div>
                    <span className="font-anton text-lg text-[#131313] block leading-none">+65% TIEMPO LIBRE</span>
                    <span className="font-mono text-[10px] text-[#131313]/60 uppercase font-semibold">En tareas operativas</span>
                  </div>
                </div>

              </div>

              {/* Handwritten Note Accent */}
              <div className="mt-3 flex items-center justify-between">
                <span className="font-caveat text-lg font-bold text-[#168CF5] -rotate-1">
                  ✎ Tecnología explicada con personas y resultados reales
                </span>
                <span className="font-mono text-[10px] text-[#131313]/40 tracking-widest uppercase">
                  SISTEMA VOX × POP-ART
                </span>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
