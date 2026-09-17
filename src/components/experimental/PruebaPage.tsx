import React from 'react';
import { Navbar } from '../Navbar';
import { ExperimentalHero } from './ExperimentalHero';
import { ServicesOverview } from '../ServicesOverview';
import { SolutionsShowcase } from '../SolutionsShowcase';
import { Methodology } from '../Methodology';
import { BookingContact } from '../BookingContact';
import { Footer } from '../Footer';
import { ArrowLeft, Sparkles } from 'lucide-react';

interface PruebaPageProps {
  onOpenAdmin: () => void;
  onReturnToSite: () => void;
  isLoggedIn: boolean;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

export const PruebaPage: React.FC<PruebaPageProps> = ({
  onOpenAdmin,
  onReturnToSite,
  isLoggedIn,
  darkMode,
  onToggleDarkMode,
}) => {
  const scrollToContact = () => {
    const el = document.getElementById('contacto');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={`min-h-screen font-sans antialiased transition-colors ${
      darkMode ? 'dark bg-slate-950 text-slate-100' : 'bg-white text-slate-900'
    }`}>
      {/* Test Mode Top Bar Alert */}
      <div className={`w-full py-2 px-4 border-b text-xs flex items-center justify-between sticky top-0 z-60 backdrop-blur-md ${
        darkMode
          ? 'bg-orange-950/80 border-orange-800/60 text-orange-200'
          : 'bg-orange-50 border-orange-200 text-orange-800'
      }`}>
        <div className="flex items-center space-x-2 font-mono">
          <Sparkles size={14} className="text-orange-500 animate-spin" />
          <span className="font-bold">🧪 Modo de Prueba (/prueba):</span>
          <span className="hidden sm:inline">Animación 3D integrada en el Hero (solo Desktop)</span>
        </div>
        <button
          onClick={onReturnToSite}
          className="flex items-center space-x-1.5 font-bold underline hover:opacity-80 cursor-pointer"
        >
          <ArrowLeft size={12} />
          <span>Volver al Inicio Principal (/)</span>
        </button>
      </div>

      {/* Main Navbar */}
      <Navbar
        onOpenBooking={scrollToContact}
        onOpenAdmin={onOpenAdmin}
        isLoggedIn={isLoggedIn}
        darkMode={darkMode}
        onToggleDarkMode={onToggleDarkMode}
      />

      <main>
        {/* Experimental Hero Section: Right Column Animation & Left Column Storytelling */}
        <ExperimentalHero
          onOpenBooking={scrollToContact}
          darkMode={darkMode}
        />

        {/* Section 2: Services Overview */}
        <ServicesOverview
          onOpenBooking={scrollToContact}
          darkMode={darkMode}
        />

        {/* Section 3: Solutions Showcase */}
        <SolutionsShowcase
          onOpenBooking={scrollToContact}
          darkMode={darkMode}
        />

        {/* Section 4: Methodology */}
        <Methodology
          darkMode={darkMode}
        />

        {/* Section 5: Booking & Contact Form */}
        <BookingContact
          darkMode={darkMode}
        />
      </main>

      {/* Footer */}
      <Footer
        onOpenAdmin={onOpenAdmin}
        isLoggedIn={isLoggedIn}
        darkMode={darkMode}
      />
    </div>
  );
};
