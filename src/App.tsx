import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AiAgentSimulator } from './components/AiAgentSimulator';
import { RoiCalculator } from './components/RoiCalculator';
import { ServicesSuite } from './components/ServicesSuite';
import { ArchitectureDiagram } from './components/ArchitectureDiagram';
import { CaseStudies } from './components/CaseStudies';
import { BookingContact } from './components/BookingContact';
import { Footer } from './components/Footer';
import { AiChatModal } from './components/AiChatModal';

export function App() {
  const [isAiChatOpen, setIsAiChatOpen] = useState(false);

  const scrollToBooking = () => {
    const el = document.getElementById('contacto');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-cyan-500 selection:text-slate-950">
      
      {/* Navigation Header */}
      <Navbar
        onOpenBooking={scrollToBooking}
        onOpenAiChat={() => setIsAiChatOpen(true)}
      />

      {/* Main Sections */}
      <main>
        <Hero
          onOpenBooking={scrollToBooking}
          onOpenAiChat={() => setIsAiChatOpen(true)}
        />

        <AiAgentSimulator />

        <RoiCalculator
          onOpenBooking={scrollToBooking}
        />

        <ServicesSuite
          onOpenBooking={scrollToBooking}
        />

        <ArchitectureDiagram />

        <CaseStudies />

        <BookingContact />
      </main>

      {/* Footer */}
      <Footer />

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
