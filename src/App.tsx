import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { CinematicHero } from './components/hero/CinematicHero';
import { Hero } from './components/Hero';
import { ExperimentalHero } from './components/experimental/ExperimentalHero';
import { ServicesOverview } from './components/ServicesOverview';
import { PortfolioSection } from './components/PortfolioSection';
import { SolutionsShowcase } from './components/SolutionsShowcase';
import { Methodology } from './components/Methodology';
import { BookingContact } from './components/BookingContact';
import { Footer } from './components/Footer';
import { AdminPortalPage } from './components/admin/AdminPortalPage';
import { LinktreePage } from './components/LinktreePage';
import { LandingMaqueta } from './components/landing/LandingMaqueta';
import { getCurrentUser } from './services/authService';

export function App() {
  const [currentView, setCurrentView] = useState<'main' | 'prueba' | 'admin' | 'linktree'>(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      if (path.startsWith('/admin') || hash === '#admin') return 'admin';
      if (path.startsWith('/linktree') || hash === '#linktree' || hash === '#/linktree') return 'linktree';
      if (path.startsWith('/prueba') || hash === '#prueba' || path.startsWith('/legacy') || hash === '#legacy') return 'prueba';
    }
    // Main (Home) es ahora la nueva Landing Maqueta
    return 'main';
  });

  const [isDesktop, setIsDesktop] = useState<boolean>(() =>
    typeof window !== 'undefined' ? window.innerWidth >= 1024 : true
  );
  const [darkMode, setDarkMode] = useState(false);
  const [currentUser, setCurrentUser] = useState(getCurrentUser());

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      if (path.startsWith('/admin') || hash === '#admin') {
        setCurrentView('admin');
      } else if (path.startsWith('/linktree') || hash === '#linktree' || hash === '#/linktree') {
        setCurrentView('linktree');
      } else if (path.startsWith('/prueba') || hash === '#prueba' || path.startsWith('/legacy') || hash === '#legacy') {
        setCurrentView('prueba');
      } else {
        setCurrentView('main');
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const refreshUser = () => {
    setCurrentUser(getCurrentUser());
  };

  const navigateTo = (view: 'main' | 'prueba' | 'admin' | 'linktree') => {
    setCurrentView(view);
    if (view === 'admin') {
      window.history.pushState({}, '', '/admin');
    } else if (view === 'linktree') {
      window.history.pushState({}, '', '/linktree');
    } else if (view === 'prueba') {
      window.history.pushState({}, '', '/prueba');
    } else {
      window.history.pushState({}, '', '/');
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const scrollToContact = () => {
    const el = document.getElementById('contacto');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (currentView === 'admin') {
    return (
      <AdminPortalPage
        onReturnToSite={() => {
          refreshUser();
          navigateTo('main');
        }}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
      />
    );
  }

  if (currentView === 'linktree') {
    return (
      <LinktreePage
        onReturnToSite={() => navigateTo('main')}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
      />
    );
  }

  // 1. MAIN / HOME: Ahora es la nueva Landing Maqueta (Enroque)
  if (currentView === 'main') {
    return (
      <LandingMaqueta
        onOpenAdmin={() => navigateTo('admin')}
        onOpenPrueba={() => navigateTo('prueba')}
        darkMode={darkMode}
      />
    );
  }

  // 2. /PRUEBA: Ahora aloja el Home anterior (Enroque)
  return (
    <div className={`min-h-screen font-sans antialiased transition-colors ${darkMode ? 'dark bg-slate-950 text-slate-100' : 'bg-white text-slate-900'}`}>
      
      {/* Top Banner de Enroque en /prueba */}
      <div className="bg-[#171715] text-[#FFE526] px-4 py-2 text-xs font-mono flex items-center justify-between sticky top-0 z-50 border-b border-[#FFE526]/30 select-none shadow-md">
        <div className="flex items-center space-x-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FFE526] animate-pulse"></span>
          <span className="font-bold">RUTA /PRUEBA — VERSIÓN ANTERIOR DEL SITIO</span>
          <span className="text-neutral-400 hidden sm:inline">• Home previo de iAtomica</span>
        </div>
        <button
          onClick={() => navigateTo('main')}
          className="bg-[#FFE526] hover:bg-yellow-400 text-[#171715] font-bold px-3 py-1 rounded text-xs transition-all cursor-pointer shadow-sm hover:scale-105"
        >
          ← Volver al Sitio Principal (Nuevo Diseño)
        </button>
      </div>

      {/* Sticky Navbar de la versión anterior */}
      <Navbar
        onOpenBooking={scrollToContact}
        onOpenAdmin={() => navigateTo('admin')}
        isLoggedIn={!!currentUser}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
      />

      <main>
        {isDesktop ? (
          <ExperimentalHero
            onOpenBooking={scrollToContact}
            darkMode={darkMode}
          />
        ) : (
          <>
            <CinematicHero
              onOpenBooking={scrollToContact}
              darkMode={darkMode}
            />
            <Hero
              onOpenBooking={scrollToContact}
              darkMode={darkMode}
            />
          </>
        )}

        <ServicesOverview
          onOpenBooking={scrollToContact}
          darkMode={darkMode}
        />

        <PortfolioSection
          darkMode={darkMode}
        />

        <SolutionsShowcase
          onOpenBooking={scrollToContact}
          darkMode={darkMode}
        />

        <Methodology
          darkMode={darkMode}
        />

        <BookingContact
          darkMode={darkMode}
        />
      </main>

      <Footer
        onOpenAdmin={() => navigateTo('admin')}
        onOpenLinktree={() => navigateTo('linktree')}
        isLoggedIn={!!currentUser}
        darkMode={darkMode}
      />

    </div>
  );
}

export default App;
