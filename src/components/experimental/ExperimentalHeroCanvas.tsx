import React, { useEffect, useRef, useState, useCallback } from 'react';

interface ExperimentalHeroCanvasProps {
  progress: number; // 0.0 to 1.0
  darkMode?: boolean;
  onLoaded?: () => void;
}

const START_FRAME = 2;
const TOTAL_FRAMES = 181;
const BASE_PATH = '/media/frames/desktop';

export const ExperimentalHeroCanvas: React.FC<ExperimentalHeroCanvasProps> = ({
  progress,
  darkMode = false,
  onLoaded,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL_FRAMES).fill(null));
  const latestTargetFrameRef = useRef<number>(START_FRAME);
  const currentFrameDrawnRef = useRef<number>(-1);
  const [initialFrameLoaded, setInitialFrameLoaded] = useState<boolean>(false);

  const getFrameUrl = useCallback((index: number) => {
    const padded = String(index).padStart(3, '0');
    return `${BASE_PATH}/frame_${padded}.webp`;
  }, []);

  // Draw frame with cover fitting
  const drawImageToCanvas = useCallback((img: HTMLImageElement, frameIdx: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.naturalWidth || img.width;
    const ih = img.naturalHeight || img.height;

    if (!iw || !ih || cw === 0 || ch === 0) return;

    const scale = Math.max(cw / iw, ch / ih);
    const nw = iw * scale;
    const nh = ih * scale;
    const dx = (cw - nw) / 2;
    const dy = (ch - nh) / 2;

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, dx, dy, nw, nh);
    currentFrameDrawnRef.current = frameIdx;
  }, []);

  // Attempt to draw target frame or nearest available fallback
  const renderCurrent = useCallback(() => {
    const targetIdx = latestTargetFrameRef.current;
    const targetImg = imagesRef.current[targetIdx];

    if (targetImg && targetImg.complete && targetImg.naturalWidth > 0) {
      drawImageToCanvas(targetImg, targetIdx);
      return;
    }

    // Find nearest already loaded frame
    let closestIdx = -1;
    let minDiff = Infinity;
    for (let i = START_FRAME; i < TOTAL_FRAMES; i++) {
      const img = imagesRef.current[i];
      if (img && img.complete && img.naturalWidth > 0) {
        const diff = Math.abs(i - targetIdx);
        if (diff < minDiff) {
          minDiff = diff;
          closestIdx = i;
        }
      }
    }

    if (closestIdx !== -1) {
      const fallbackImg = imagesRef.current[closestIdx];
      if (fallbackImg) {
        drawImageToCanvas(fallbackImg, closestIdx);
      }
    }

    // Ensure target frame is fetching
    if (!targetImg) {
      const img = new Image();
      img.src = getFrameUrl(targetIdx);
      img.onload = () => {
        imagesRef.current[targetIdx] = img;
        if (latestTargetFrameRef.current === targetIdx) {
          drawImageToCanvas(img, targetIdx);
        }
      };
      imagesRef.current[targetIdx] = img;
    }
  }, [drawImageToCanvas, getFrameUrl]);

  // Sync canvas dimensions
  const syncCanvasSize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    const w = rect.width || 480;
    const h = rect.height || 270;

    const targetW = Math.round(w * dpr);
    const targetH = Math.round(h * dpr);

    if (canvas.width !== targetW || canvas.height !== targetH) {
      canvas.width = targetW;
      canvas.height = targetH;
      currentFrameDrawnRef.current = -1;
      renderCurrent();
    }
  }, [renderCurrent]);

  // Initial load starting from START_FRAME (frame 2)
  useEffect(() => {
    syncCanvasSize();
    window.addEventListener('resize', syncCanvasSize);

    const firstImg = new Image();
    firstImg.src = getFrameUrl(START_FRAME);
    firstImg.onload = () => {
      imagesRef.current[START_FRAME] = firstImg;
      setInitialFrameLoaded(true);
      drawImageToCanvas(firstImg, START_FRAME);
      onLoaded?.();
    };
    imagesRef.current[START_FRAME] = firstImg;

    return () => {
      window.removeEventListener('resize', syncCanvasSize);
    };
  }, [getFrameUrl, syncCanvasSize, drawImageToCanvas, onLoaded]);

  // Progressive background preloader starting from START_FRAME
  useEffect(() => {
    if (!initialFrameLoaded) return;

    let isCancelled = false;

    // Load first 35 frames starting from START_FRAME
    for (let i = START_FRAME; i < Math.min(35, TOTAL_FRAMES); i++) {
      if (!imagesRef.current[i]) {
        const img = new Image();
        img.src = getFrameUrl(i);
        img.onload = () => {
          if (!isCancelled) imagesRef.current[i] = img;
        };
        imagesRef.current[i] = img;
      }
    }

    // Staggered load of remaining frames
    const loadBatch = (start: number) => {
      if (isCancelled || start >= TOTAL_FRAMES) return;
      const end = Math.min(start + 12, TOTAL_FRAMES);
      for (let i = start; i < end; i++) {
        if (!imagesRef.current[i]) {
          const img = new Image();
          img.src = getFrameUrl(i);
          img.onload = () => {
            if (!isCancelled) imagesRef.current[i] = img;
          };
          imagesRef.current[i] = img;
        }
      }
      setTimeout(() => loadBatch(end), 100);
    };

    const timer = setTimeout(() => loadBatch(35), 150);

    return () => {
      isCancelled = true;
      clearTimeout(timer);
    };
  }, [initialFrameLoaded, getFrameUrl]);

  // Seek on progress change mapped from START_FRAME to TOTAL_FRAMES - 1
  useEffect(() => {
    const clampedProgress = Math.max(0, Math.min(1, progress));
    const targetIdx = Math.round(START_FRAME + clampedProgress * (TOTAL_FRAMES - 1 - START_FRAME));
    latestTargetFrameRef.current = targetIdx;
    renderCurrent();
  }, [progress, renderCurrent]);

  // Dynamic LED Backlight color gradients based on scroll progress (Ambilight TV Effect)
  const getLedConic = (p: number) => {
    if (p < 0.25) {
      // Stage 0: Brand Orange, Amber & Fuchsia (Crystal & Strategy)
      return 'conic-gradient(from 45deg at 50% 50%, #ff6b00, #f59e0b, #ec4899, #d946ef, #ff6b00)';
    } else if (p < 0.50) {
      // Stage 1: AI Cyan, Electric Blue & Violet (AI Tools & Automation)
      return 'conic-gradient(from 45deg at 50% 50%, #06b6d4, #3b82f6, #6366f1, #0ea5e9, #06b6d4)';
    } else if (p < 0.75) {
      // Stage 2: QA Indigo, Violet & Emerald (Quality & Stability)
      return 'conic-gradient(from 45deg at 50% 50%, #6366f1, #8b5cf6, #3b82f6, #10b981, #6366f1)';
    } else {
      // Stage 3: Scale Fuchsia, Brand Orange & Rose (Scale & Content)
      return 'conic-gradient(from 45deg at 50% 50%, #d946ef, #ff6b00, #f43f5e, #a855f7, #d946ef)';
    }
  };

  const getLedRadial = (p: number) => {
    if (p < 0.25) {
      return 'radial-gradient(ellipse at center, rgba(255, 107, 0, 0.85) 0%, rgba(245, 158, 11, 0.6) 45%, rgba(217, 70, 239, 0.35) 75%, transparent 100%)';
    } else if (p < 0.50) {
      return 'radial-gradient(ellipse at center, rgba(6, 182, 212, 0.85) 0%, rgba(59, 130, 246, 0.6) 45%, rgba(124, 58, 237, 0.35) 75%, transparent 100%)';
    } else if (p < 0.75) {
      return 'radial-gradient(ellipse at center, rgba(99, 102, 241, 0.85) 0%, rgba(139, 92, 246, 0.6) 45%, rgba(56, 189, 248, 0.35) 75%, transparent 100%)';
    } else {
      return 'radial-gradient(ellipse at center, rgba(217, 70, 239, 0.85) 0%, rgba(255, 107, 0, 0.6) 45%, rgba(244, 63, 94, 0.35) 75%, transparent 100%)';
    }
  };

  return (
    <div className="relative w-full max-w-[560px] mx-auto select-none pointer-events-none">
      {/* TV Ambilight LED Glow Behind Screen - Layer 1: Wide Rotating Ambient Halo */}
      <div
        className="absolute -inset-5 sm:-inset-7 rounded-[40px] filter blur-2xl sm:blur-3xl animate-led-drift transition-all duration-700 pointer-events-none -z-10"
        style={{
          background: getLedConic(progress),
          opacity: darkMode ? 0.75 : 0.5,
        }}
      />

      {/* TV Ambilight LED Glow Behind Screen - Layer 2: Breathing Radial Core */}
      <div
        className="absolute -inset-2.5 sm:-inset-3.5 rounded-[32px] filter blur-xl sm:blur-2xl animate-led-breathe transition-all duration-500 pointer-events-none -z-10"
        style={{
          background: getLedRadial(progress),
          opacity: darkMode ? 0.85 : 0.6,
        }}
      />

      {/* The 16:9 Screen / TV Display Itself */}
      <div className={`relative w-full aspect-[16/9] rounded-3xl overflow-hidden select-none pointer-events-none transition-all duration-300 z-10 ${
        darkMode
          ? 'bg-slate-950 border border-slate-700/70 shadow-2xl shadow-black/80'
          : 'bg-white border border-slate-200/90 shadow-2xl shadow-slate-900/15'
      }`}>
        {/* Fallback image starting at frame 002 */}
        <img
          src={`${BASE_PATH}/frame_002.webp`}
          alt="iAtomica 3D Animation Model"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 z-0 ${
            initialFrameLoaded ? 'opacity-0' : 'opacity-100'
          }`}
          loading="eager"
        />

        {/* Hardware-Accelerated Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full z-10"
          style={{
            width: '100%',
            height: '100%',
            transform: 'translateZ(0)',
          }}
        />
      </div>
    </div>
  );
};
