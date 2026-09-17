import React, { useEffect, useRef, useState, useCallback } from 'react';
import { HERO_CONFIG } from './heroConfig';

interface CinematicHeroVideoProps {
  progress: number; // 0.0 to 1.0
  isMobile: boolean;
  onVideoReady?: () => void;
  onError?: (err: Error) => void;
}

export const CinematicHeroVideo: React.FC<CinematicHeroVideoProps> = ({
  progress,
  isMobile,
  onVideoReady,
  onError,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const targetTimeRef = useRef<number>(0);
  const isSeekingRef = useRef<boolean>(false);
  const rafIdRef = useRef<number | null>(null);

  const [isVideoLoaded, setIsVideoLoaded] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);

  const videoSrc = isMobile ? HERO_CONFIG.mobileVideoSrc : HERO_CONFIG.desktopVideoSrc;
  const posterSrc = isMobile ? HERO_CONFIG.mobilePosterSrc : HERO_CONFIG.desktopPosterSrc;
  const objectPosition = isMobile ? HERO_CONFIG.objectPositionMobile : HERO_CONFIG.objectPositionDesktop;

  // Execute seek to the latest requested target time with coalescing
  const attemptSeek = useCallback(() => {
    const video = videoRef.current;
    if (!video || !video.duration || Number.isNaN(video.duration)) return;

    if (isSeekingRef.current) return;

    const targetTime = targetTimeRef.current;
    const diff = Math.abs(video.currentTime - targetTime);

    // Responsive seek threshold (~1/2 frame at 24fps = 0.02s)
    if (diff > 0.02) {
      isSeekingRef.current = true;
      try {
        video.currentTime = Math.max(0, Math.min(video.duration - 0.01, targetTime));
      } catch (err) {
        isSeekingRef.current = false;
      }
    }
  }, []);

  // Update target time whenever progress prop changes
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !video.duration || Number.isNaN(video.duration)) return;

    const clampedProgress = Math.max(0, Math.min(1, progress));
    targetTimeRef.current = clampedProgress * video.duration;

    if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    rafIdRef.current = requestAnimationFrame(attemptSeek);

    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [progress, attemptSeek]);

  // Video event listeners
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedData = () => {
      setIsVideoLoaded(true);
      onVideoReady?.();
      if (video.duration) {
        video.currentTime = targetTimeRef.current || 0;
      }
    };

    const handleSeeked = () => {
      isSeekingRef.current = false;
      attemptSeek();
    };

    const handleError = () => {
      setHasError(true);
      onError?.(new Error('Video failed to load'));
    };

    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('seeked', handleSeeked);
    video.addEventListener('error', handleError);

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('seeked', handleSeeked);
      video.removeEventListener('error', handleError);
    };
  }, [attemptSeek, onVideoReady, onError]);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden select-none pointer-events-none bg-white">
      {/* High-fidelity Poster Image: guarantees 0 black frames and serves as rock-solid fallback */}
      <img
        src={posterSrc}
        alt="iAtomica Hero Visual Intro"
        style={{ objectPosition, transform: 'translateZ(0)', willChange: 'opacity' }}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-out z-0 ${
          isVideoLoaded && !hasError ? 'opacity-0' : 'opacity-100'
        }`}
        loading="eager"
        fetchPriority="high"
      />

      {/* Scrubbed Cinematic Video (Native 2560x1440 QHD on desktop, 1080p on mobile) */}
      {!hasError && (
        <video
          ref={videoRef}
          src={videoSrc}
          poster={posterSrc}
          muted
          playsInline
          preload="auto"
          style={{ objectPosition, transform: 'translateZ(0)' }}
          className={`absolute inset-0 w-full h-full object-cover z-10 transition-opacity duration-300 ${
            isVideoLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}

      {/* Clean Bottom White Fade to transition smoothly into the following section */}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white via-white/30 to-transparent z-15 pointer-events-none" />
    </div>
  );
};
