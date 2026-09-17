import React from 'react';
import { ArrowDown } from 'lucide-react';

interface CinematicHeroOverlayProps {
  progress: number; // 0 to 1
  darkMode: boolean;
}

export const CinematicHeroOverlay: React.FC<CinematicHeroOverlayProps> = ({
  progress,
  darkMode,
}) => {
  // Discreet scroll prompt indicator at the bottom (visible only at beginning: 0% - 8% progress)
  const promptOpacity = Math.max(0, Math.min(1, (0.08 - progress) / 0.06));

  if (promptOpacity <= 0) return null;

  return (
    <div className="absolute inset-0 pointer-events-none z-20 flex flex-col justify-end p-6 select-none">
      {/* Bottom Floating Scroll Cue in Apple Capsule Style */}
      <div
        style={{
          opacity: promptOpacity,
          transform: `translateY(${(1 - promptOpacity) * 12}px)`,
        }}
        className="w-full flex flex-col items-center justify-center transition-opacity duration-300 pointer-events-none pb-6"
      >
        <div
          className={`px-5 py-2.5 rounded-full border backdrop-blur-2xl backdrop-saturate-180 text-xs font-bold tracking-wider uppercase flex items-center space-x-2.5 shadow-lg ${
            darkMode
              ? 'bg-slate-900/80 border-slate-700/60 text-slate-100 shadow-black/30'
              : 'bg-white/90 border-slate-200/90 text-slate-800 shadow-slate-900/10'
          }`}
        >
          <span className="inline-block w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
          <span className="font-bold">Desliza para explorar</span>
          <ArrowDown className="w-3.5 h-3.5 text-orange-500 animate-bounce" />
        </div>
      </div>
    </div>
  );
};
