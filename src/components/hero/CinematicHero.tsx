import React, { useEffect, useRef, useState, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CinematicHeroVideo } from './CinematicHeroVideo';
import { CinematicHeroOverlay } from './CinematicHeroOverlay';
import { HERO_CONFIG } from './heroConfig';

// Register GSAP plugins safely
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
  // Prevent mobile address bar show/hide from resetting ScrollTrigger pin calculations
  ScrollTrigger.config({
    ignoreMobileResize: true,
  });
}

interface CinematicHeroProps {
  onOpenBooking?: () => void;
  darkMode: boolean;
}

export const CinematicHero: React.FC<CinematicHeroProps> = ({ onOpenBooking, darkMode }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Synchronous initialization to ensure correct media source from frame 0 on mobile devices
  const [isMobile, setIsMobile] = useState<boolean>(() =>
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  );
  const [isTablet, setIsTablet] = useState<boolean>(() =>
    typeof window !== 'undefined' ? window.innerWidth >= 768 && window.innerWidth < 1024 : false
  );
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);

  // Responsive device check and reduced motion detection
  useEffect(() => {
    const checkViewport = () => {
      const w = window.innerWidth;
      setIsMobile(w < 768);
      setIsTablet(w >= 768 && w < 1024);
    };

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };

    window.addEventListener('resize', checkViewport);
    mediaQuery.addEventListener('change', handleMotionChange);

    return () => {
      window.removeEventListener('resize', checkViewport);
      mediaQuery.removeEventListener('change', handleMotionChange);
    };
  }, []);

  // GSAP ScrollTrigger pinning and scrub integration
  useLayoutEffect(() => {
    if (reducedMotion) return;

    const container = containerRef.current;
    if (!container) return;

    // Determine virtual scroll distance in vh
    const scrollVh = isMobile
      ? HERO_CONFIG.scrollLengthMobile
      : isTablet
      ? HERO_CONFIG.scrollLengthTablet
      : HERO_CONFIG.scrollLengthDesktop;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: container,
        pin: true,
        pinSpacing: true,
        start: 'top top',
        end: () => `+=${Math.round(window.innerHeight * (scrollVh / 100))}`,
        scrub: isMobile ? 0.4 : 0.8, // Snappier scrub response on mobile touch
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          setScrollProgress(self.progress);
        },
      });
    }, container);

    return () => {
      ctx.revert();
    };
  }, [isMobile, isTablet, reducedMotion]);

  // If user prefers reduced motion, render clean static hero without scroll trap
  if (reducedMotion) {
    return (
      <section className="relative w-full min-h-screen min-h-[90svh] flex items-center justify-center overflow-hidden bg-white">
        <CinematicHeroVideo progress={0} isMobile={isMobile} />
        <CinematicHeroOverlay
          progress={0}
          scenes={HERO_CONFIG.scenes}
          darkMode={darkMode}
          onOpenBooking={onOpenBooking}
        />
      </section>
    );
  }

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen h-[100svh] overflow-hidden bg-white select-none"
      aria-label="Cinematic Hero Introduction"
    >
      {/* Scrubbed Cinematic MP4 Video Layer */}
      <CinematicHeroVideo
        progress={scrollProgress}
        isMobile={isMobile}
      />

      {/* HTML Typography & Brand Overlays */}
      <CinematicHeroOverlay
        progress={scrollProgress}
        scenes={HERO_CONFIG.scenes}
        darkMode={darkMode}
        onOpenBooking={onOpenBooking}
      />
    </section>
  );
};
