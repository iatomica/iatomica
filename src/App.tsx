import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServicesOverview } from './components/ServicesOverview';
import { SolutionsShowcase } from './components/SolutionsShowcase';
import { Methodology } from './components/Methodology';
import { BookingContact } from './components/BookingContact';
import { Footer } from './components/Footer';
import { AiChatModal } from './components/AiChatModal';
import { AdminPortalPage } from './components/admin/AdminPortalPage';

export function App() {
  const [currentView, setCurrentView] = useState<'site' | 'admin'>('site');
  const [isAiChatOpen, setIsAiChatOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const scrollToContact = () => {
    const el = document.getElementById('contacto');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (currentView === 'admin') {
    return (
      <AdminPortalPage
        onReturnToSite={() => setCurrentView('site')}
        darkMode={darkMode}
      />
    );
  }

  return (
    <div className={`min-h-screen font-sans antialiased transition-colors ${darkMode ? 'dark bg-slate-950 text-slate-100' : 'bg-white text-slate-900'}`}>
      
      {/* Sticky Navbar */}
      <Navbar
        onOpenBooking={scrollToContact}
        onOpenAiChat={() => setIsAiChatOpen(true)}
        onOpenAdmin={() => setCurrentView('admin')}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
      />

      <main>
        {/* Section 1: Hero */}
        <Hero
          onOpenBooking={scrollToContact}
          onOpenAiChat={() => setIsAiChatOpen(true)}
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
        darkMode={darkMode}
      />

      {/* AI Assistant Chat Modal */}
      <AiChatModal
        isOpen={isAiChatOpen}
        onClose={() => setIsAiChatOpen(false)}
        darkMode={darkMode}
      />

    </div>
  );
}

export default App;
