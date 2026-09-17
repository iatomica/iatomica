import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { CinematicHero } from './components/hero/CinematicHero';
import { Hero } from './components/Hero';
import { ServicesOverview } from './components/ServicesOverview';
import { SolutionsShowcase } from './components/SolutionsShowcase';
import { Methodology } from './components/Methodology';
import { BookingContact } from './components/BookingContact';
import { Footer } from './components/Footer';
import { AdminPortalPage } from './components/admin/AdminPortalPage';
import { PruebaPage } from './components/experimental/PruebaPage';
import { getCurrentUser } from './services/authService';

export function App() {
  const [currentView, setCurrentView] = useState<'site' | 'admin' | 'prueba'>(() => {
    if (typeof window !== 'undefined' && window.location.pathname.startsWith('/prueba')) {
      return 'prueba';
    }
    return 'site';
  });
  const [darkMode, setDarkMode] = useState(false);
  const [currentUser, setCurrentUser] = useState(getCurrentUser());

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
      if (window.location.pathname.startsWith('/prueba')) {
        setCurrentView('prueba');
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

  const navigateTo = (view: 'site' | 'admin' | 'prueba') => {
    setCurrentView(view);
    if (view === 'prueba') {
      window.history.pushState({}, '', '/prueba');
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
        {/* Cinematic Scroll-Driven Hero */}
        <CinematicHero
          onOpenBooking={scrollToContact}
          darkMode={darkMode}
        />

        {/* Section 1: Hero */}
        <Hero
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
        onOpenAdmin={() => setCurrentView('admin')}
        isLoggedIn={!!currentUser}
        darkMode={darkMode}
      />

    </div>
  );
}

export default App;
