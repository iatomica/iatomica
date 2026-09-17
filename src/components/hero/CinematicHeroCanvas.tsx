import React, { useEffect, useRef, useState, useCallback } from 'react';
import { HERO_CONFIG } from './heroConfig';

interface CinematicHeroCanvasProps {
  progress: number; // 0.0 to 1.0
  isMobile: boolean;
  onLoaded?: () => void;
}

const TOTAL_FRAMES = 151;

export const CinematicHeroCanvas: React.FC<CinematicHeroCanvasProps> = ({
  progress,
  isMobile,
  onLoaded,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL_FRAMES).fill(null));
  const latestTargetFrameRef = useRef<number>(0);
  const currentFrameDrawnRef = useRef<number>(-1);
  const [initialFrameLoaded, setInitialFrameLoaded] = useState<boolean>(false);

  const basePath = isMobile ? '/media/frames/mobile' : '/media/frames/desktop';

  const getFrameUrl = useCallback(
    (index: number) => {
      const padded = String(index).padStart(3, '0');
      return `${basePath}/frame_${padded}.webp`;
    },
    [basePath]
  );

  // Draw a specific frame image with cover fitting
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
    for (let i = 0; i < TOTAL_FRAMES; i++) {
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

  // Canvas size setup (Retina support up to 2x dpr)
  const syncCanvasSize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = canvas.clientWidth || window.innerWidth;
    const h = canvas.clientHeight || window.innerHeight;

    const targetW = Math.round(w * dpr);
    const targetH = Math.round(h * dpr);

    if (canvas.width !== targetW || canvas.height !== targetH) {
      canvas.width = targetW;
      canvas.height = targetH;
      currentFrameDrawnRef.current = -1;
      renderCurrent();
    }
  }, [renderCurrent]);

  // Load frame 0 immediately on mount and establish canvas size
  useEffect(() => {
    syncCanvasSize();
    window.addEventListener('resize', syncCanvasSize);

    const firstImg = new Image();
    firstImg.src = getFrameUrl(0);
    firstImg.onload = () => {
      imagesRef.current[0] = firstImg;
      setInitialFrameLoaded(true);
      drawImageToCanvas(firstImg, 0);
      onLoaded?.();
    };
    imagesRef.current[0] = firstImg;

    return () => {
      window.removeEventListener('resize', syncCanvasSize);
    };
  }, [getFrameUrl, syncCanvasSize, drawImageToCanvas, onLoaded]);

  // Background frame preloader
  useEffect(() => {
    if (!initialFrameLoaded) return;

    let isCancelled = false;

    // Phase 1: High priority frames (first 30 frames for immediate initial scrubbing)
    for (let i = 1; i < Math.min(35, TOTAL_FRAMES); i++) {
      if (!imagesRef.current[i]) {
        const img = new Image();
        img.src = getFrameUrl(i);
        img.onload = () => {
          if (!isCancelled) imagesRef.current[i] = img;
        };
        imagesRef.current[i] = img;
      }
    }

    // Phase 2: Staggered preload of remaining frames in small batches
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

      setTimeout(() => {
        loadBatch(end);
      }, 100);
    };

    const timer = setTimeout(() => {
      loadBatch(35);
    }, 150);

    return () => {
      isCancelled = true;
      clearTimeout(timer);
    };
  }, [initialFrameLoaded, getFrameUrl]);

  // Update target frame when progress changes
  useEffect(() => {
    const targetIdx = Math.max(0, Math.min(TOTAL_FRAMES - 1, Math.round(progress * (TOTAL_FRAMES - 1))));
    latestTargetFrameRef.current = targetIdx;
    renderCurrent();
  }, [progress, renderCurrent]);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden select-none pointer-events-none bg-white">
      {/* High-fidelity Fallback Poster Image */}
      <img
        src={isMobile ? HERO_CONFIG.mobilePosterSrc : HERO_CONFIG.desktopPosterSrc}
        alt="iAtomica Hero Visual Intro"
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 z-0 ${
          initialFrameLoaded ? 'opacity-0' : 'opacity-100'
        }`}
        loading="eager"
        fetchPriority="high"
      />

      {/* Hardware-Accelerated HTML5 Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full z-10"
        style={{
          width: '100%',
          height: '100%',
          transform: 'translateZ(0)',
          imageRendering: 'auto',
        }}
      />

      {/* Clean Bottom White Fade to transition smoothly into the following section */}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white via-white/30 to-transparent z-15 pointer-events-none" />
    </div>
  );
};
