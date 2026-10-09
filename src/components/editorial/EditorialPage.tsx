import React from 'react';
import { EditorialNavbar } from './EditorialNavbar';
import { EditorialHero } from './EditorialHero';
import { EditorialServices } from './EditorialServices';
import { EditorialProjects } from './EditorialProjects';
import { EditorialProcess } from './EditorialProcess';
import { EditorialWhyUs } from './EditorialWhyUs';
import { EditorialTestimonials } from './EditorialTestimonials';
import { EditorialFAQ } from './EditorialFAQ';
import { EditorialContact } from './EditorialContact';
import { EditorialFooter } from './EditorialFooter';

interface EditorialPageProps {
  onOpenAdmin?: () => void;
  onReturnToLegacy?: () => void;
}

export const EditorialPage: React.FC<EditorialPageProps> = ({
  onOpenAdmin,
  onReturnToLegacy,
}) => {
  const scrollToContact = () => {
    const el = document.getElementById('contacto');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToProjects = () => {
    const el = document.getElementById('proyectos');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F6F1E6] text-[#131313] font-sans antialiased selection:bg-[#FFE000] selection:text-[#131313]">
      
      {/* 01. Header + Navegación */}
      <EditorialNavbar
        onOpenBooking={scrollToContact}
        onOpenAdmin={onOpenAdmin}
        onToggleView={onReturnToLegacy}
      />

      {/* Main Content */}
      <main id="main-content">
        {/* 02. Hero Principal Editorial */}
        <EditorialHero
          onOpenBooking={scrollToContact}
          onExploreProjects={scrollToProjects}
        />

        {/* 03. Servicios (5 Tarjetas) */}
        <EditorialServices
          onOpenBooking={scrollToContact}
        />

        {/* 04. Proyectos / Casos Reales (4 Columnas) */}
        <EditorialProjects />

        {/* 05. Cómo Trabajamos (Timeline 4 Pasos) */}
        <EditorialProcess />

        {/* 06. Por Qué iAtomica (Diferenciales) */}
        <EditorialWhyUs />

        {/* 07. Testimonios / Evidencia Verificada */}
        <EditorialTestimonials />

        {/* 08. Preguntas Frecuentes (FAQ Accordion) */}
        <EditorialFAQ />

        {/* 09. Contacto / Conversión */}
        <EditorialContact />
      </main>

      {/* 10. Footer */}
      <EditorialFooter
        onOpenBooking={scrollToContact}
      />

    </div>
  );
};
