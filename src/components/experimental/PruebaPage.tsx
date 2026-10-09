import React, { useState } from 'react';
import { LandingMaqueta } from '../landing/LandingMaqueta';
import { TastemakerNavbar } from './TastemakerNavbar';
import { TastemakerHero } from './TastemakerHero';
import { TastemakerServices } from './TastemakerServices';
import { TastemakerProjects } from './TastemakerProjects';
import { TastemakerProcess } from './TastemakerProcess';
import { TastemakerBenefits } from './TastemakerBenefits';
import { TastemakerTestimonials } from './TastemakerTestimonials';
import { TastemakerFAQ } from './TastemakerFAQ';
import { TastemakerContact } from './TastemakerContact';
import { TastemakerFooter } from './TastemakerFooter';
import { TastemakerMobileBoard } from './TastemakerMobileBoard';
import { Monitor, Smartphone, LayoutGrid, Sparkles } from 'lucide-react';

interface PruebaPageProps {
  onOpenAdmin?: () => void;
  onReturnToSite?: () => void;
  isLoggedIn?: boolean;
  darkMode?: boolean;
  onToggleDarkMode?: () => void;
}

export const PruebaPage: React.FC<PruebaPageProps> = ({ onOpenAdmin, darkMode = false }) => {
  const [formatMode, setFormatMode] = useState<'maqueta' | 'board' | 'mobile-preview' | 'tastemaker'>('maqueta');

  const scrollToContact = () => {
    const el = document.getElementById('contacto');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToProjects = () => {
    const el = document.getElementById('proyectos');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#F6F1E6] text-[#131313] font-sans antialiased selection:bg-[#FFE000] selection:text-[#131313]">
      
      {/* Top Format Selector Switcher Bar */}
      <div className="sticky top-0 z-50 w-full bg-[#131313] text-white px-4 py-2 border-b border-[#FFE000]/40 flex flex-wrap items-center justify-between gap-3 shadow-lg select-none">
        <div className="flex items-center space-x-2 font-mono text-xs">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FFE000] animate-pulse"></span>
          <span className="font-bold text-[#FFE000]">IATOMICA REDESIGN</span>
          <span className="text-neutral-400 hidden sm:inline">• MAQUETA ADAPTADA AL SISTEMA</span>
        </div>

        {/* Format Toggle Buttons */}
        <div className="flex items-center space-x-1 bg-neutral-900 p-1 rounded-full border border-neutral-700 flex-wrap">
          <button
            onClick={() => setFormatMode('maqueta')}
            className={`flex items-center space-x-1.5 px-3 py-1 rounded-full font-mono text-xs font-bold transition-all cursor-pointer ${
              formatMode === 'maqueta'
                ? 'bg-[#FFE000] text-[#131313] shadow-sm'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Sparkles size={13} />
            <span>Maqueta iAtomica (UI Exacta)</span>
          </button>

          <button
            onClick={() => setFormatMode('board')}
            className={`flex items-center space-x-1.5 px-3 py-1 rounded-full font-mono text-xs font-bold transition-all cursor-pointer ${
              formatMode === 'board'
                ? 'bg-[#FFE000] text-[#131313] shadow-sm'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <LayoutGrid size={13} />
            <span>6 Estados Mobile (Póster)</span>
          </button>

          <button
            onClick={() => setFormatMode('mobile-preview')}
            className={`flex items-center space-x-1.5 px-3 py-1 rounded-full font-mono text-xs font-bold transition-all cursor-pointer ${
              formatMode === 'mobile-preview'
                ? 'bg-[#FFE000] text-[#131313] shadow-sm'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Smartphone size={13} />
            <span>Simulador Celular 390px</span>
          </button>

          <button
            onClick={() => setFormatMode('tastemaker')}
            className={`flex items-center space-x-1.5 px-3 py-1 rounded-full font-mono text-xs font-bold transition-all cursor-pointer ${
              formatMode === 'tastemaker'
                ? 'bg-[#FFE000] text-[#131313] shadow-sm'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Monitor size={13} />
            <span>Versión Alternativa</span>
          </button>
        </div>
      </div>

      {/* VIEW MODE 1: MAQUETA ADAPTADA AL SISTEMA */}
      {formatMode === 'maqueta' && (
        <LandingMaqueta onOpenAdmin={onOpenAdmin} darkMode={darkMode} />
      )}

      {/* VIEW MODE 2: THE 6 MOBILE DEVICES POSTER BOARD */}
      {formatMode === 'board' && (
        <TastemakerMobileBoard />
      )}

      {/* VIEW MODE 3: INTERACTIVE 390PX MOBILE SIMULATOR CON LA MAQUETA */}
      {formatMode === 'mobile-preview' && (
        <div className="py-10 px-4 flex flex-col items-center justify-center bg-[#E8E2D5] min-h-screen">
          <div className="w-[390px] h-[844px] bg-black rounded-[52px] p-3 shadow-2xl border-4 border-neutral-800 relative flex flex-col overflow-hidden">
            <div className="w-28 h-5 bg-black rounded-full mx-auto mb-2 shrink-0 z-30"></div>
            
            <div className="w-full flex-1 bg-[#F2EFE5] rounded-[40px] overflow-y-auto overflow-x-hidden">
              <LandingMaqueta onOpenAdmin={onOpenAdmin} darkMode={darkMode} />
            </div>
          </div>
          <span className="font-mono text-xs font-bold text-[#131313]/70 mt-4">
            Simulador interactivo iPhone (390 × 844 px) de la Maqueta iAtomica
          </span>
        </div>
      )}

      {/* VIEW MODE 4: TASTEMAKER DESKTOP ALTERNATIVO */}
      {formatMode === 'tastemaker' && (
        <div className="w-full">
          <TastemakerNavbar onOpenBooking={scrollToContact} />
          <main>
            <TastemakerHero
              onOpenBooking={scrollToContact}
              onExploreProjects={scrollToProjects}
            />
            <TastemakerServices onOpenBooking={scrollToContact} />
            <TastemakerProjects />
            <TastemakerProcess />
            <TastemakerBenefits />
            <TastemakerTestimonials />
            <TastemakerFAQ />
            <TastemakerContact onOpenBookingModal={scrollToContact} />
          </main>
          <TastemakerFooter />
        </div>
      )}

    </div>
  );
};
