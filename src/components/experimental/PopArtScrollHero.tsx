import React, { useEffect, useRef, useState } from 'react';
import { ExperimentalHeroCanvas } from './ExperimentalHeroCanvas';
import { 
  ArrowRight, 
  Sparkles, 
  Zap, 
  Cpu, 
  ArrowDown, 
  Layers 
} from 'lucide-react';

interface PopArtScrollHeroProps {
  onOpenBooking: () => void;
}

export const PopArtScrollHero: React.FC<PopArtScrollHeroProps> = ({
  onOpenBooking,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [canvasReady, setCanvasReady] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalScrollable = rect.height - window.innerHeight;
      if (totalScrollable <= 0) return;

      const progress = Math.min(
        Math.max(-rect.top / totalScrollable, 0),
        1
      );
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const progressPercentage = Math.round(scrollProgress * 100);

  return (
    <section 
      id="hero-scroll" 
      ref={containerRef} 
      className="relative w-full h-[280vh] bg-[#F6F1E7]"
    >
      {/* Sticky Viewport Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between p-3 sm:p-6 select-none">
        
        {/* TOP STATUS BAR & BADGES */}
        <div className="z-20 w-full flex flex-wrap items-center justify-between gap-2 border-b-2 border-black pb-2 bg-[#F6F1E7]/90 backdrop-blur-sm">
          <div className="flex items-center space-x-2">
            <span className="bg-[#111111] text-[#FFF000] font-mono text-xs font-bold px-2 py-0.5 border border-black uppercase tracking-widest">
              VOL. 2026 // ISSUE #01
            </span>
            <span className="hidden sm:inline-block bg-[#00A8F5] text-white font-mono text-xs font-bold px-2 py-0.5 border border-black uppercase tracking-widest">
              POP-ART NEO-BRUTALISM
            </span>
          </div>

          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1.5 font-mono text-xs font-bold bg-white px-2 py-0.5 brutalist-border shadow-[2px_2px_0_#111]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00E575] animate-pulse"></span>
              <span>SCRUB PROGRESS:</span>
              <span className="font-bebas text-base text-[#FF165F]">{progressPercentage}%</span>
            </div>
            <div className="hidden md:flex items-center space-x-1 font-mono text-xs text-neutral-600">
              <Layers size={14} />
              <span>180 FRAMES 3D SCROLL</span>
            </div>
          </div>
        </div>

        {/* MAIN HERO STAGE */}
        <div className="relative z-10 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-4 items-center my-auto py-2">
          
          {/* LEFT EDITORIAL COLUMN */}
          <div className="lg:col-span-5 flex flex-col space-y-4">
            
            {/* Collage Badge */}
            <div className="inline-flex items-center space-x-2 self-start bg-[#FFF000] px-3 py-1 brutalist-border shadow-[3px_3px_0_#111] transform -rotate-1">
              <Zap size={16} className="text-black fill-black" />
              <span className="font-mono text-xs font-black uppercase tracking-wider text-black">
                POTENCIA TU NEGOCIO CON IA REAL
              </span>
            </div>

            {/* Giant Headline */}
            <div className="relative">
              <h1 className="font-bebas text-5xl sm:text-7xl xl:text-8xl leading-[0.88] tracking-tight text-black">
                AUTOMATIZÁ.<br />
                <span className="text-[#FF165F] underline decoration-4 decoration-black underline-offset-4">ESCALÁ.</span><br />
                <span className="bg-[#FFF000] px-2 inline-block border-2 border-black transform rotate-1 mt-1">
                  DOMINÁ.
                </span>
              </h1>
              
              {/* Halftone stamp overlay */}
              <div className="hidden sm:block absolute -top-4 right-0 font-marker text-sm text-[#034BFF] transform rotate-12 bg-white px-2 py-1 border border-black shadow-[2px_2px_0_#034BFF]">
                ¡Cero humo, puro ROI! 🚀
              </div>
            </div>

            {/* Editorial Paragraph */}
            <p className="font-sans text-sm sm:text-base text-neutral-800 font-medium leading-relaxed max-w-lg bg-white/80 p-3 brutalist-border-sm shadow-[3px_3px_0_rgba(0,0,0,0.15)]">
              Transformamos empresas con agentes de inteligencia artificial, chatbots omnicanal y flujos automatizados de backoffice. 
              <strong className="text-black font-bold"> Menos tareas repetitivas, más tiempo para lo que importa.</strong>
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                onClick={onOpenBooking}
                className="flex items-center space-x-2 px-6 py-3 bg-[#FF165F] text-white font-bebas text-xl sm:text-2xl tracking-wider brutalist-btn cursor-pointer shadow-[5px_5px_0_#111] hover:bg-[#e00d50]"
              >
                <span>AGENDAR ASESORÍA GRATUITA</span>
                <ArrowRight size={20} />
              </button>
              
              <a
                href="#posters"
                className="flex items-center space-x-1.5 px-4 py-3 bg-white text-black font-mono text-xs font-bold uppercase tracking-wider brutalist-border shadow-[3px_3px_0_#111] hover:bg-[#FFF000] transition-colors"
              >
                <span>VER POSTERS</span>
                <ArrowDown size={14} />
              </a>
            </div>

            {/* Micro stats banner */}
            <div className="grid grid-cols-3 gap-2 pt-2">
              <div className="bg-[#FFF000]/60 p-2 brutalist-border-sm text-center">
                <span className="font-bebas text-2xl text-black block leading-none">+300%</span>
                <span className="font-mono text-[10px] text-black font-bold uppercase">Productividad</span>
              </div>
              <div className="bg-[#00A8F5]/30 p-2 brutalist-border-sm text-center">
                <span className="font-bebas text-2xl text-black block leading-none">24/7</span>
                <span className="font-mono text-[10px] text-black font-bold uppercase">Atención Bots</span>
              </div>
              <div className="bg-[#00E575]/40 p-2 brutalist-border-sm text-center">
                <span className="font-bebas text-2xl text-black block leading-none">-60%</span>
                <span className="font-mono text-[10px] text-black font-bold uppercase">Costos Operat.</span>
              </div>
            </div>

          </div>

          {/* RIGHT CANVAS STAGE WITH POP-ART POSTER FRAME */}
          <div className="lg:col-span-7 relative flex items-center justify-center">
            
            {/* Pop-art background accent shapes */}
            <div className="absolute -inset-2 bg-[#FFF000] brutalist-border transform rotate-1 -z-10 shadow-[8px_8px_0_#111]"></div>
            <div className="absolute -inset-4 bg-[#00A8F5]/30 transform -rotate-2 -z-20"></div>

            {/* Poster Frame */}
            <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] max-h-[56vh] bg-black brutalist-border-lg overflow-hidden shadow-[6px_6px_0_#111] flex items-center justify-center">
              
              {/* Halftone texture overlay inside canvas container */}
              <div className="absolute inset-0 pointer-events-none z-10 opacity-15 bg-halftone"></div>

              {/* The 3D Scroll Canvas */}
              <div className="w-full h-full relative">
                <ExperimentalHeroCanvas
                  progress={scrollProgress}
                  onLoaded={() => setCanvasReady(true)}
                />
              </div>

              {/* Floating Neo-Brutalist Frame Labels */}
              <div className="absolute top-3 left-3 z-20 bg-black text-[#FFF000] px-2.5 py-1 font-mono text-[11px] font-bold brutalist-border-sm flex items-center space-x-1.5 shadow-[2px_2px_0_#FFF000]">
                <Cpu size={12} />
                <span>CANVAS 3D RENDER ENGINE</span>
              </div>

              <div className="absolute top-3 right-3 z-20 bg-[#FF165F] text-white px-2 py-0.5 font-mono text-[10px] font-black uppercase tracking-wider brutalist-border-sm">
                SCROLL TO SCRUB ↕
              </div>

              <div className="absolute bottom-3 left-3 z-20 bg-white text-black px-2 py-1 font-mono text-[10px] font-bold brutalist-border-sm flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-[#00E575] inline-block"></span>
                <span>DESKTOP OPTIMIZED</span>
              </div>

              <div className="absolute bottom-3 right-3 z-20 bg-[#FFF000] text-black px-3 py-1 font-bebas text-lg tracking-wider brutalist-border-sm">
                FRAME: {Math.min(Math.round(scrollProgress * 180) + 1, 181)} / 181
              </div>

              {/* Loading hint */}
              {!canvasReady && (
                <div className="absolute inset-0 bg-[#F6F1E7] z-30 flex flex-col items-center justify-center space-y-2">
                  <div className="w-8 h-8 border-4 border-black border-t-[#FF165F] rounded-full animate-spin"></div>
                  <span className="font-mono text-xs font-bold text-black uppercase tracking-wider">
                    Cargando secuencias de animación 3D...
                  </span>
                </div>
              )}
            </div>

            {/* Sticker Note pinned below frame */}
            <div className="hidden sm:flex absolute -bottom-5 right-6 z-20 bg-white px-3 py-1.5 brutalist-border shadow-[3px_3px_0_#111] transform rotate-3 items-center space-x-2">
              <Sparkles size={14} className="text-[#FF165F]" />
              <span className="font-caveat text-base text-black font-bold">
                ¡Scrolleá hacia abajo para controlar la animación 3D!
              </span>
            </div>

          </div>

        </div>

        {/* BOTTOM SCROLL PROGRESS TICKER BAR */}
        <div className="z-20 w-full flex items-center justify-between border-t-2 border-black pt-2 bg-[#F6F1E7]/90 font-mono text-xs">
          <div className="flex items-center space-x-2">
            <span className="font-bold">CONTROL DE NAVEGACIÓN:</span>
            <div className="w-32 sm:w-64 h-3 bg-white border border-black overflow-hidden relative">
              <div 
                className="h-full bg-[#FF165F] transition-all duration-75"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
          <div className="flex items-center space-x-2 text-black font-bold">
            <ArrowDown size={14} className="animate-bounce" />
            <span className="uppercase tracking-widest text-[11px]">SCROLL PARA CONTINUAR</span>
          </div>
        </div>

      </div>
    </section>
  );
};
