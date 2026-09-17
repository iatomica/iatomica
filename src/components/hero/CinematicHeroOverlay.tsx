import React from 'react';
import { ArrowDown, ArrowRight, Sparkles } from 'lucide-react';
import type { OverlayScene } from './heroConfig';

interface CinematicHeroOverlayProps {
  progress: number; // 0 to 1
  scenes: OverlayScene[];
  darkMode: boolean;
  onOpenBooking?: () => void;
}

export const CinematicHeroOverlay: React.FC<CinematicHeroOverlayProps> = ({
  progress,
  scenes,
  darkMode,
  onOpenBooking,
}) => {
  // Helper to compute scene opacity & transform based on current progress
  const getSceneStyle = (scene: OverlayScene) => {
    const { startProgress, endProgress } = scene;
    const duration = endProgress - startProgress;
    const fadeRatio = 0.20; // 20% of scene duration spent fading in/out
    const fadeRange = duration * fadeRatio;

    if (progress < startProgress || progress > endProgress) {
      return { opacity: 0, transform: 'translateY(24px)', pointerEvents: 'none' as const, visibility: 'hidden' as const };
    }

    let opacity = 1;
    let translateY = 0;

    // The opening scene is 100% visible from the very beginning (progress = 0)
    if (startProgress === 0 && progress < fadeRange) {
      opacity = 1;
      translateY = 0;
    }
    // Fade in for subsequent scenes
    else if (progress < startProgress + fadeRange) {
      const p = (progress - startProgress) / fadeRange;
      opacity = p;
      translateY = 20 * (1 - p);
    }
    // Fade out
    else if (progress > endProgress - fadeRange) {
      const p = (endProgress - progress) / fadeRange;
      opacity = p;
      translateY = -15 * (1 - p);
    }

    return {
      opacity: Math.max(0, Math.min(1, opacity)),
      transform: `translateY(${translateY}px)`,
      pointerEvents: opacity > 0.4 ? ('auto' as const) : ('none' as const),
      visibility: 'visible' as const,
    };
  };

  // Scroll prompt indicator at the bottom (visible only at 0% - 15% progress)
  const promptOpacity = Math.max(0, Math.min(1, (0.15 - progress) / 0.10));

  return (
    <div className="absolute inset-0 pointer-events-none z-20 flex flex-col justify-between p-6 sm:p-12 lg:p-16 select-none">
      {/* Top spacer */}
      <div className="w-full h-20 pointer-events-none" />

      {/* Center Container for Animated Scenes */}
      <div className="relative w-full max-w-5xl mx-auto my-auto flex items-center justify-center min-h-[300px]">
        {scenes.map((scene) => {
          const style = getSceneStyle(scene);
          const isCenter = scene.align === 'center' || !scene.align;
          const isLeft = scene.align === 'left';

          return (
            <div
              key={scene.id}
              style={{ ...style, touchAction: 'pan-y' }}
              className={`absolute inset-x-0 transition-all duration-150 ease-out flex flex-col ${
                isCenter ? 'items-center text-center' : isLeft ? 'items-start text-left max-w-xl' : 'items-end text-right ml-auto max-w-xl'
              }`}
            >
              {/* Apple-style Glassmorphism Card with Maximum Contrast */}
              <div
                style={{ touchAction: 'pan-y' }}
                className={`p-7 sm:p-10 rounded-[32px] border backdrop-blur-2xl backdrop-saturate-200 transition-all duration-300 ${
                  darkMode
                    ? 'bg-slate-950/85 border-white/20 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.7),0_0_0_1px_rgba(255,255,255,0.1)_inset]'
                    : 'bg-white/94 border-slate-200/90 shadow-[0_24px_60px_-15px_rgba(15,23,42,0.18),0_0_0_1px_rgba(255,255,255,0.9)_inset]'
                }`}
              >
                {scene.badge && (
                  <div
                    className={`inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full text-xs font-black tracking-wider uppercase mb-4 border backdrop-blur-md shadow-sm ${
                      darkMode
                        ? 'bg-orange-500/15 border-orange-500/30 text-orange-400'
                        : 'bg-orange-50 border-orange-200 text-orange-700'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5 text-orange-500" />
                    <span>{scene.badge}</span>
                  </div>
                )}

                <h2
                  className={`text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08] mb-4 ${
                    darkMode ? 'text-white' : 'text-slate-950'
                  }`}
                >
                  {scene.title}
                </h2>

                <p
                  className={`text-base sm:text-lg lg:text-xl max-w-2xl leading-relaxed font-semibold ${
                    darkMode ? 'text-slate-200' : 'text-slate-700'
                  }`}
                >
                  {scene.subtitle}
                </p>

                {scene.actionText && (
                  <div className="mt-6 flex items-center gap-3">
                    <button
                      onClick={() => {
                        if (onOpenBooking) {
                          onOpenBooking();
                        } else {
                          const el = document.querySelector(scene.actionLink || '#servicios');
                          el?.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                      className="px-8 py-3.5 rounded-2xl bg-orange-500 hover:bg-orange-600 active:scale-[0.98] text-white font-bold text-xs shadow-[0_4px_18px_rgba(249,115,22,0.35)] hover:shadow-[0_6px_22px_rgba(249,115,22,0.45)] hover:scale-[1.02] transition-all flex items-center space-x-2.5 group cursor-pointer pointer-events-auto"
                    >
                      <span>{scene.actionText}</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Floating Scroll Cue in Apple Capsule Style */}
      <div
        style={{ opacity: promptOpacity, transform: `translateY(${(1 - promptOpacity) * 12}px)` }}
        className="w-full flex flex-col items-center justify-center transition-opacity duration-300 pointer-events-none pb-5"
      >
        <div
          className={`px-5 py-2.5 rounded-full border backdrop-blur-2xl backdrop-saturate-180 text-xs font-bold tracking-wider uppercase flex items-center space-x-2.5 shadow-lg ${
            darkMode
              ? 'bg-slate-900/90 border-slate-700/80 text-slate-100 shadow-black/30'
              : 'bg-white/95 border-slate-200 text-slate-800 shadow-slate-900/10'
          }`}
        >
          <span className="inline-block w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
          <span className="font-extrabold">Desliza para explorar</span>
          <ArrowDown className="w-3.5 h-3.5 text-orange-500 animate-bounce" />
        </div>
      </div>
    </div>
  );
};
