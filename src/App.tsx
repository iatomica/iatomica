import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServicesOverview } from './components/ServicesOverview';
import { SolutionsShowcase } from './components/SolutionsShowcase';
import { Methodology } from './components/Methodology';
import { BookingContact } from './components/BookingContact';
import { Footer } from './components/Footer';
import { AdminPortalPage } from './components/admin/AdminPortalPage';
import { getCurrentUser } from './services/authService';

export function App() {
  const [currentView, setCurrentView] = useState<'site' | 'admin'>('site');
  const [darkMode, setDarkMode] = useState(false);
  const [currentUser, setCurrentUser] = useState(getCurrentUser());

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const refreshUser = () => {
    setCurrentUser(getCurrentUser());
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
          setCurrentView('site');
        }}
        darkMode={darkMode}
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
