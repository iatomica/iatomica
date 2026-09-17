import React, { useEffect, useRef, useState, useCallback } from 'react';

interface ExperimentalHeroCanvasProps {
  progress: number; // 0.0 to 1.0
  darkMode?: boolean;
  onLoaded?: () => void;
}

const TOTAL_FRAMES = 181;
const BASE_PATH = '/media/frames/desktop';

export const ExperimentalHeroCanvas: React.FC<ExperimentalHeroCanvasProps> = ({
  progress,
  darkMode = false,
  onLoaded,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL_FRAMES).fill(null));
  const latestTargetFrameRef = useRef<number>(0);
  const currentFrameDrawnRef = useRef<number>(-1);
  const [initialFrameLoaded, setInitialFrameLoaded] = useState<boolean>(false);

  const getFrameUrl = useCallback((index: number) => {
    const padded = String(index).padStart(3, '0');
    return `${BASE_PATH}/frame_${padded}.webp`;
  }, []);

  // Draw frame with cover/contain fitting
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

  // Sync canvas dimensions
  const syncCanvasSize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    const w = rect.width || 480;
    const h = rect.height || 480;

    const targetW = Math.round(w * dpr);
    const targetH = Math.round(h * dpr);

    if (canvas.width !== targetW || canvas.height !== targetH) {
      canvas.width = targetW;
      canvas.height = targetH;
      currentFrameDrawnRef.current = -1;
      renderCurrent();
    }
  }, [renderCurrent]);

  // Initial load
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

  // Progressive background preloader
  useEffect(() => {
    if (!initialFrameLoaded) return;

    let isCancelled = false;

    // Load first 30 frames
    for (let i = 1; i < Math.min(30, TOTAL_FRAMES); i++) {
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

    const timer = setTimeout(() => loadBatch(30), 150);

    return () => {
      isCancelled = true;
      clearTimeout(timer);
    };
  }, [initialFrameLoaded, getFrameUrl]);

  // Seek on progress change
  useEffect(() => {
    const targetIdx = Math.max(0, Math.min(TOTAL_FRAMES - 1, Math.round(progress * (TOTAL_FRAMES - 1))));
    latestTargetFrameRef.current = targetIdx;
    renderCurrent();
  }, [progress, renderCurrent]);

  return (
    <div className={`relative w-full aspect-[16/9] max-w-[560px] mx-auto rounded-3xl overflow-hidden select-none pointer-events-none transition-all duration-300 ${
      darkMode
        ? 'bg-slate-950 border border-slate-800 shadow-2xl shadow-black/50'
        : 'bg-white border border-slate-200/80 shadow-2xl shadow-slate-900/10'
    }`}>
      {/* Fallback image */}
      <img
        src={`${BASE_PATH}/frame_000.webp`}
        alt="iAtomica 3D Animation Model"
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 z-0 ${
          initialFrameLoaded ? 'opacity-0' : 'opacity-100'
        }`}
        loading="eager"
      />

      {/* Canvas */}
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
  );
};
