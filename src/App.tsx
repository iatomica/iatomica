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
import { PruebaPage } from './components/experimental/PruebaPage';
import { LinktreePage } from './components/LinktreePage';
import { getCurrentUser } from './services/authService';

export function App() {
  const [currentView, setCurrentView] = useState<'site' | 'admin' | 'prueba' | 'linktree'>(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      if (path.startsWith('/prueba')) return 'prueba';
      if (path.startsWith('/linktree') || hash === '#linktree' || hash === '#/linktree') return 'linktree';
    }
    return 'site';
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
      if (path.startsWith('/prueba')) {
        setCurrentView('prueba');
      } else if (path.startsWith('/linktree') || hash === '#linktree' || hash === '#/linktree') {
        setCurrentView('linktree');
      } else {
        setCurrentView('site');
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const refreshUser = () => {
    setCurrentUser(getCurrentUser());
  };

  const navigateTo = (view: 'site' | 'admin' | 'prueba' | 'linktree') => {
    setCurrentView(view);
    if (view === 'prueba') {
      window.history.pushState({}, '', '/prueba');
    } else if (view === 'linktree') {
      window.history.pushState({}, '', '/linktree');
    } else if (view === 'site') {
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
          navigateTo('site');
        }}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
      />
    );
  }

  if (currentView === 'prueba') {
    return (
      <PruebaPage
        onOpenAdmin={() => setCurrentView('admin')}
        onReturnToSite={() => navigateTo('site')}
        isLoggedIn={!!currentUser}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
      />
    );
  }

  if (currentView === 'linktree') {
    return (
      <LinktreePage
        onReturnToSite={() => navigateTo('site')}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
      />
    );
  }

  return (
    <div className={`min-h-screen font-sans antialiased transition-colors ${darkMode ? 'dark bg-slate-950 text-slate-100' : 'bg-white text-slate-900'}`}>
      
      {/* Sticky Navbar */}
      <Navbar
        onOpenBooking={scrollToContact}
        onOpenAdmin={() => setCurrentView('admin')}
        isLoggedIn={!!currentUser}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
      />

      <main>
        {isDesktop ? (
          /* Desktop Split-Layout Scroll-Driven Hero with Synchronized Beats & LED Ambilight Canvas */
          <ExperimentalHero
            onOpenBooking={scrollToContact}
            darkMode={darkMode}
          />
        ) : (
          /* Mobile: Classic Fullscreen Cinematic Hero & Intro */
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

        {/* Section 2: Services Overview */}
        <ServicesOverview
          onOpenBooking={scrollToContact}
          darkMode={darkMode}
        />

        {/* Section 3: Portfolio & Client Ecosystem */}
        <PortfolioSection
          darkMode={darkMode}
        />

        {/* Section 4: Solutions Showcase */}
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
        onOpenAdmin={() => setCurrentView('admin')}
        onOpenLinktree={() => navigateTo('linktree')}
        isLoggedIn={!!currentUser}
        darkMode={darkMode}
      />

    </div>
  );
}

export default App;
