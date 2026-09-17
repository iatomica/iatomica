export interface OverlayScene {
  id: string;
  startProgress: number; // 0.0 - 1.0
  endProgress: number;   // 0.0 - 1.0
  badge?: string;
  title: string;
  subtitle: string;
  actionText?: string;
  actionLink?: string;
  align?: 'center' | 'left' | 'right';
}

export interface CinematicHeroConfig {
  desktopVideoSrc: string;
  mobileVideoSrc: string;
  desktopPosterSrc: string;
  mobilePosterSrc: string;
  scrollLengthDesktop: number; // in vh units, e.g. 350
  scrollLengthTablet: number;  // in vh units, e.g. 280
  scrollLengthMobile: number;  // in vh units, e.g. 200
  objectPositionDesktop: string;
  objectPositionTablet: string;
  objectPositionMobile: string;
  scenes: OverlayScene[];
}

export const HERO_CONFIG: CinematicHeroConfig = {
  desktopVideoSrc: '/media/hero-desktop.mp4',
  mobileVideoSrc: '/media/hero-mobile.mp4',
  desktopPosterSrc: '/media/frames/desktop/frame_000.webp',
  mobilePosterSrc: '/media/frames/mobile/frame_000.webp',
  scrollLengthDesktop: 300, // 3x screen height for responsive, agile scrubbing without text bubbles
  scrollLengthTablet: 260,
  scrollLengthMobile: 220,
  objectPositionDesktop: 'center center',
  objectPositionTablet: 'center center',
  objectPositionMobile: 'center center',
  scenes: [
    {
      id: 'intro',
      startProgress: 0.0,
      endProgress: 0.25,
      badge: 'iAtomica Tech Studio',
      title: 'Soluciones Digitales & IA',
      subtitle: 'Transformamos ideas complejas en arquitecturas escalables de alto impacto.',
      align: 'center',
    },
    {
      id: 'development',
      startProgress: 0.32,
      endProgress: 0.65,
      badge: 'Desarrollo & Automatización',
      title: 'Software a Medida & Control de Calidad',
      subtitle: 'Herramientas inteligentes, flujos automatizados y plataformas diseñadas para perdurar.',
      align: 'left',
    },
    {
      id: 'scale',
      startProgress: 0.72,
      endProgress: 0.96,
      badge: 'Tu Socio Tecnológico',
      title: 'Impulsamos Tu Próximo Nivel',
      subtitle: 'Acompañamos a pymes y empresas en su evolución tecnológica integral.',
      actionText: 'Descubrir Servicios',
      actionLink: '#servicios',
      align: 'center',
    },
  ],
};
