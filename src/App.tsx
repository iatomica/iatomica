import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServicesOverview } from './components/ServicesOverview';
import { SolutionsShowcase } from './components/SolutionsShowcase';
import { Methodology } from './components/Methodology';
import { BookingContact } from './components/BookingContact';
import { Footer } from './components/Footer';
import { AiChatModal } from './components/AiChatModal';

export function App() {
  const [darkMode, setDarkMode] = useState(false); // Native Light Mode Default
  const [isAiChatOpen, setIsAiChatOpen] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const scrollToBooking = () => {
    const el = document.getElementById('contacto');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen transition-colors duration-300">
      
      {/* Header & Sticky Navigation */}
      <Navbar
        onOpenBooking={scrollToBooking}
        onOpenAiChat={() => setIsAiChatOpen(true)}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
      />

      {/* Main Content */}
      <main>
        <Hero
          onOpenBooking={scrollToBooking}
          onOpenAiChat={() => setIsAiChatOpen(true)}
          darkMode={darkMode}
        />

        <ServicesOverview
          onOpenBooking={scrollToBooking}
          darkMode={darkMode}
        />

        <SolutionsShowcase
          onOpenBooking={scrollToBooking}
          darkMode={darkMode}
        />

        <Methodology
          darkMode={darkMode}
        />

        <BookingContact
          darkMode={darkMode}
        />
      </main>

      {/* Footer */}
      <Footer
        darkMode={darkMode}
      />

      {/* Floating AI Chat Assistant Modal */}
      <AiChatModal
        isOpen={isAiChatOpen}
        onClose={() => setIsAiChatOpen(false)}
        onOpenBooking={scrollToBooking}
      />
    </div>
  );
}

export default App;
