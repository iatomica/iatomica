import React, { useEffect, useRef, useState, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Calendar,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  HeartHandshake,
  Cpu,
  Layers,
  Rocket
} from 'lucide-react';
import heroPerson from '../../assets/hero_person_transparent.webp';
import { ExperimentalHeroCanvas } from './ExperimentalHeroCanvas';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.config({ ignoreMobileResize: true });
}

interface ExperimentalHeroProps {
  onOpenBooking: () => void;
  darkMode: boolean;
}

interface StoryBeat {
  id: string;
  badge: string;
  badgeIcon: React.ReactNode;
  title: string;
  titleGradient: string;
  subtitle: string;
  pills: { icon: React.ReactNode; text: string }[];
  accentColor: string;
}

const STORY_BEATS: StoryBeat[] = [
  {
    id: 'consulting',
    badge: 'Diagnóstico & Estrategia',
    badgeIcon: <HeartHandshake className="w-4 h-4 text-orange-500" />,
    title: 'Consultoría Estratégica &',
    titleGradient: 'Arquitectura Digital',
    subtitle: 'Analizamos cómo trabaja tu empresa y trazamos una hoja de ruta tecnológica clara, sin modismos complejos y con impacto real.',
    pills: [
      { icon: <CheckCircle2 className="w-4 h-4 text-orange-500 shrink-0" />, text: 'Diagnóstico Claro' },
      { icon: <ShieldCheck className="w-4 h-4 text-purple-600 shrink-0" />, text: 'Estrategia a Medida' },
      { icon: <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />, text: 'Sin Tecnicismos' },
    ],
    accentColor: 'text-orange-500',
  },
  {
    id: 'ai-tools',
    badge: 'Inteligencia Artificial',
    badgeIcon: <Cpu className="w-4 h-4 text-cyan-500" />,
    title: 'Automatización & Herramientas de',
    titleGradient: 'Inteligencia Artificial',
    subtitle: 'Creamos asistentes inteligentes, automatizaciones de WhatsApp y sistemas que leen documentos para acelerar tus operaciones.',
    pills: [
      { icon: <CheckCircle2 className="w-4 h-4 text-cyan-500 shrink-0" />, text: 'Atención 24/7' },
      { icon: <ShieldCheck className="w-4 h-4 text-purple-600 shrink-0" />, text: 'Ahorro de Horas' },
      { icon: <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />, text: 'Copilotos de Trabajo' },
    ],
    accentColor: 'text-cyan-500',
  },
  {
    id: 'software-qa',
    badge: 'Software & Calidad',
    badgeIcon: <Layers className="w-4 h-4 text-indigo-500" />,
    title: 'Software Dedicado &',
    titleGradient: 'Control de Calidad (QA)',
    subtitle: 'Construimos plataformas estables, aplicaciones a medida y pruebas rigurosas para que tus sistemas nunca fallen.',
    pills: [
      { icon: <CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0" />, text: 'Cero Errores' },
      { icon: <ShieldCheck className="w-4 h-4 text-purple-600 shrink-0" />, text: 'Sistemas Confiables' },
      { icon: <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />, text: 'Soporte Continuo' },
    ],
    accentColor: 'text-indigo-500',
  },
  {
    id: 'scale',
    badge: 'Escala & Expansión',
    badgeIcon: <Rocket className="w-4 h-4 text-rose-500" />,
    title: 'Contenido, Diseño &',
    titleGradient: 'Escalamiento Empresarial',
    subtitle: 'Acompañamos tu evolución con identidad digital de alto nivel, desarrollo de marca y tecnología pensada para perdurar.',
    pills: [
      { icon: <CheckCircle2 className="w-4 h-4 text-rose-500 shrink-0" />, text: 'Diseño Premium' },
      { icon: <ShieldCheck className="w-4 h-4 text-purple-600 shrink-0" />, text: 'Escalabilidad Total' },
      { icon: <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />, text: 'Socio de Confianza' },
    ],
    accentColor: 'text-rose-500',
  },
];

export const ExperimentalHero: React.FC<ExperimentalHeroProps> = ({ onOpenBooking, darkMode }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [isDesktop, setIsDesktop] = useState<boolean>(() =>
    typeof window !== 'undefined' ? window.innerWidth >= 1024 : true
  );

  // Check viewport
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // GSAP ScrollTrigger for desktop pinning
  useLayoutEffect(() => {
    if (!isDesktop) return;

    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: container,
        pin: true,
        pinSpacing: true,
        start: 'top top',
        end: () => `+=${Math.round(window.innerHeight * 3.2)}`,
        scrub: 0.5,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self: any) => {
          setScrollProgress(self.progress);
        },
      });
    }, container);

    return () => {
      ctx.revert();
    };
  }, [isDesktop]);

  // Determine current active beat (0, 1, 2, 3)
  const currentBeatIdx = Math.min(
    STORY_BEATS.length - 1,
    Math.floor(scrollProgress * STORY_BEATS.length)
  );

  // Mobile layout: classic static presentation
  if (!isDesktop) {
    return (
      <section className={`relative min-h-[90vh] pt-28 pb-20 flex flex-col justify-center overflow-hidden transition-colors ${
        darkMode ? 'bg-slate-950 text-white' : 'bg-white text-slate-900'
      }`}>
        <div className="absolute inset-0 bg-grid-subtle pointer-events-none opacity-60" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 gap-10 items-center">
            <div className="space-y-6 text-left">
              <div className={`inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full text-xs font-bold border ${
                darkMode ? 'bg-slate-900 border-slate-800 text-orange-400' : 'bg-orange-50 border-orange-200 text-orange-600'
              }`}>
                <HeartHandshake className="w-4 h-4 text-orange-500" />
                <span>Tu Socio Tecnológico de Confianza</span>
              </div>
              <h1 className={`text-4xl sm:text-5xl font-black tracking-tight leading-[1.1] ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                Consultoría &amp; Desarrollo <br />
                <span className="text-gradient-brand">Soluciones Digitales e IA</span>
              </h1>
              <p className={`text-base leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-600 font-medium'}`}>
                Ayudamos a pymes, emprendimientos y empresas a modernizarse. Creamos herramientas de Inteligencia Artificial, software a medida, control de calidad y contenidos digitales.
              </p>
              <div className="pt-2">
                <button
                  onClick={onOpenBooking}
                  className="w-full py-4 rounded-xl gradient-brand text-white font-bold text-xs shadow-lg shadow-orange-500/20 flex items-center justify-center space-x-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Agendar Demo</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="relative flex justify-center items-center">
              <img
                src={heroPerson}
                alt="iAtomica Team Illustration"
                className="w-full max-w-sm h-auto object-contain artwork-cutout pointer-events-none"
              />
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Desktop layout: pinned scroll-driven split view
  // Interpolation helper for scroll-driven text entrance and exit transitions
  const getBeatStyle = (idx: number, progress: number) => {
    const ranges = [
      { enterStart: -0.05, enterEnd: 0.0, exitStart: 0.20, exitEnd: 0.27 },
      { enterStart: 0.20, enterEnd: 0.27, exitStart: 0.45, exitEnd: 0.52 },
      { enterStart: 0.45, enterEnd: 0.52, exitStart: 0.70, exitEnd: 0.77 },
      { enterStart: 0.70, enterEnd: 0.77, exitStart: 1.05, exitEnd: 1.10 },
    ];

    const r = ranges[idx];
    let opacity = 0;
    let translateY = 24;

    if (progress < r.enterStart) {
      opacity = 0;
      translateY = 24;
    } else if (progress < r.enterEnd) {
      const t = (progress - r.enterStart) / (r.enterEnd - r.enterStart);
      opacity = Math.max(0, Math.min(1, t));
      translateY = (1 - opacity) * 24;
    } else if (progress <= r.exitStart) {
      opacity = 1;
      translateY = 0;
    } else if (progress <= r.exitEnd) {
      const t = (progress - r.exitStart) / (r.exitEnd - r.exitStart);
      opacity = Math.max(0, Math.min(1, 1 - t));
      translateY = -t * 24;
    } else {
      opacity = 0;
      translateY = -24;
    }

    return {
      opacity,
      transform: `translate3d(0, ${translateY.toFixed(2)}px, 0)`,
      pointerEvents: opacity > 0.5 ? ('auto' as const) : ('none' as const),
      visibility: opacity > 0.01 ? ('visible' as const) : ('hidden' as const),
    };
  };

  return (
    <section
      ref={containerRef}
      className={`relative w-full h-screen h-[100svh] overflow-hidden select-none transition-colors flex items-center justify-center ${
        darkMode ? 'bg-slate-950 text-white' : 'bg-white text-slate-900'
      }`}
      aria-label="Experimental Scroll Driven Hero"
    >
      {/* Background Architectural Grid Texture */}
      <div className="absolute inset-0 bg-grid-subtle pointer-events-none opacity-50" />

      {/* Ambient Glow */}
      <div
        className={`absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full filter blur-[140px] pointer-events-none transition-colors duration-700 ${
          currentBeatIdx === 0
            ? darkMode ? 'bg-orange-900/15' : 'bg-orange-100/40'
            : currentBeatIdx === 1
            ? darkMode ? 'bg-cyan-900/15' : 'bg-cyan-100/40'
            : currentBeatIdx === 2
            ? darkMode ? 'bg-indigo-900/15' : 'bg-indigo-100/40'
            : darkMode ? 'bg-rose-900/15' : 'bg-rose-100/40'
        }`}
      />

      <div className="max-w-7xl w-full mx-auto px-6 lg:px-8 relative z-10 pt-16">
        <div className="grid grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Dynamic Storytelling Beat Stage */}
          <div className="col-span-7 space-y-6 text-left">
            
            {/* Step Indicators Bar */}
            <div className="flex items-center space-x-2 pb-1">
              {STORY_BEATS.map((beat, idx) => (
                <div
                  key={beat.id}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    idx === currentBeatIdx
                      ? 'w-10 bg-orange-500'
                      : idx < currentBeatIdx
                      ? 'w-4 bg-orange-300 dark:bg-orange-800'
                      : 'w-4 bg-slate-200 dark:bg-slate-800'
                  }`}
                  title={beat.badge}
                />
              ))}
              <span className="text-[10px] font-mono font-bold tracking-wider uppercase text-slate-400 pl-2">
                0{currentBeatIdx + 1} / 0{STORY_BEATS.length}
              </span>
            </div>

            {/* Stacked Story Beats with Scroll-Driven Entrance & Exit */}
            <div className="relative w-full min-h-[350px]">
              {STORY_BEATS.map((beat, idx) => {
                const style = getBeatStyle(idx, scrollProgress);
                return (
                  <div
                    key={beat.id}
                    style={style}
                    className="absolute inset-x-0 top-0 space-y-5 will-change-transform"
                  >
                    {/* Pill Badge */}
                    <div className={`inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full text-xs font-bold border ${
                      darkMode
                        ? 'bg-slate-900/90 border-slate-800 text-orange-400 shadow-sm'
                        : 'bg-orange-50/90 border-orange-200 text-orange-700 shadow-sm'
                    }`}>
                      {beat.badgeIcon}
                      <span>{beat.badge}</span>
                    </div>

                    {/* Main Headline */}
                    <h1 className="text-4xl lg:text-5xl font-black tracking-tight leading-[1.12]">
                      {beat.title} <br />
                      <span className="text-gradient-brand">{beat.titleGradient}</span>
                    </h1>

                    {/* Subtitle */}
                    <p className={`text-base lg:text-lg max-w-xl leading-relaxed font-medium ${
                      darkMode ? 'text-slate-300' : 'text-slate-600'
                    }`}>
                      {beat.subtitle}
                    </p>

                    {/* Dynamic Benefit Pills */}
                    <div className="grid grid-cols-3 gap-3 pt-1">
                      {beat.pills.map((pill, pIdx) => (
                        <div
                          key={pIdx}
                          className={`p-3 rounded-xl border flex items-center space-x-2 ${
                            darkMode
                              ? 'bg-slate-900/80 border-slate-800/90'
                              : 'bg-slate-50/90 border-slate-200/80'
                          }`}
                        >
                          {pill.icon}
                          <span className="text-xs font-bold truncate">{pill.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Call to Action Bar */}
            <div className="pt-2 flex items-center space-x-4">
              <button
                onClick={onOpenBooking}
                className="px-8 py-3.5 rounded-xl gradient-brand text-white font-bold text-xs shadow-lg shadow-orange-500/25 hover:shadow-orange-500/35 hover:scale-[1.02] transition-all flex items-center space-x-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Agendar Demo</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>

              <div className="text-[11px] font-mono font-medium text-slate-400 flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Desplaza para explorar soluciones</span>
              </div>
            </div>

          </div>

          {/* Right Column: Replaces static illustration with interactive 3D WebP sequence canvas */}
          <div className="col-span-5 relative flex justify-center items-center">
            <ExperimentalHeroCanvas
              progress={scrollProgress}
              darkMode={darkMode}
            />
          </div>

        </div>
      </div>
    </section>
  );
};
