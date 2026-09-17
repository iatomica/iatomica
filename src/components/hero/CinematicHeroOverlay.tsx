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
      {/* Top spacer / subtle ambient header gradient for contrast */}
      <div className="w-full h-28 bg-gradient-to-b from-white/80 via-white/30 to-transparent pointer-events-none -mx-6 sm:-mx-12 lg:-mx-16 -mt-6 sm:-mt-12 lg:-mt-16 px-6 sm:px-12 lg:px-16" />

      {/* Center Container for Animated Scenes */}
      <div className="relative w-full max-w-5xl mx-auto my-auto flex items-center justify-center min-h-[280px]">
        {scenes.map((scene) => {
          const style = getSceneStyle(scene);
          const isCenter = scene.align === 'center' || !scene.align;
          const isLeft = scene.align === 'left';

          return (
            <div
              key={scene.id}
              style={style}
              className={`absolute inset-x-0 transition-all duration-150 ease-out flex flex-col ${
                isCenter ? 'items-center text-center' : isLeft ? 'items-start text-left max-w-xl' : 'items-end text-right ml-auto max-w-xl'
              }`}
            >
              {/* Glassmorphic backdrop pill to guarantee perfect legibility over video frames */}
              <div
                className={`p-6 sm:p-8 rounded-3xl backdrop-blur-xl border shadow-2xl transition-colors ${
                  darkMode
                    ? 'bg-slate-950/85 border-slate-800/90 shadow-black/60 text-white'
                    : 'bg-white/92 border-white/80 shadow-slate-900/10 text-slate-900'
                }`}
              >
                {scene.badge && (
                  <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase mb-3.5 bg-orange-500/10 border border-orange-500/20 text-orange-600 dark:text-orange-400">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{scene.badge}</span>
                  </div>
                )}

                <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] mb-3">
                  {scene.title}
                </h2>

                <p className="text-sm sm:text-base lg:text-lg max-w-2xl leading-relaxed text-slate-600 dark:text-slate-300 font-medium">
                  {scene.subtitle}
                </p>

                {scene.actionText && (
                  <div className="mt-5 flex items-center gap-3">
                    <button
                      onClick={() => {
                        if (onOpenBooking) {
                          onOpenBooking();
                        } else {
                          const el = document.querySelector(scene.actionLink || '#servicios');
                          el?.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                      className="px-7 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 hover:scale-[1.02] transition-all flex items-center space-x-2 group cursor-pointer pointer-events-auto"
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

      {/* Bottom Floating Scroll Cue */}
      <div
        style={{ opacity: promptOpacity, transform: `translateY(${(1 - promptOpacity) * 12}px)` }}
        className="w-full flex flex-col items-center justify-center transition-opacity duration-300 pointer-events-none pb-4"
      >
        <div
          className={`px-4 py-2 rounded-full border backdrop-blur-md text-xs font-semibold tracking-wider uppercase flex items-center space-x-2 ${
            darkMode
              ? 'bg-slate-900/80 border-slate-800 text-slate-300'
              : 'bg-white/80 border-slate-200 text-slate-600 shadow-sm'
          }`}
        >
          <span className="inline-block w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
          <span>Desliza para explorar</span>
          <ArrowDown className="w-3.5 h-3.5 text-orange-500 animate-bounce" />
        </div>
      </div>
    </div>
  );
};
