import React, { useState } from 'react';
import { ArrowRight, X } from 'lucide-react';

export const TastemakerProjects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<any | null>(null);

  const projects = [
    {
      id: 'grupovision',
      name: 'Grupo Visión',
      tag: 'TURISMO',
      tagColor: 'bg-[#FFE000]',
      image: '/images/portfolio/grupovision.webp',
      desc: 'Sitio web y panel de gestión para paquetes turísticos, integración de pagos y automatizaciones.',
      details: 'Desarrollamos una plataforma integral con integración a pasarelas de pago locales, gestión de inventario de excursiones y flujos automáticos de confirmación para viajeros.',
    },
    {
      id: 'lexios',
      name: 'Lexios',
      tag: 'LEGAL',
      tagColor: 'bg-[#168CF5] text-white',
      image: '/images/portfolio/lexios.jpg',
      desc: 'Plataforma SaaS para gestión legal con IA, automatización de procesos y colaboración.',
      details: 'Sistema de búsqueda semántica de causas, asistente de redacción jurídica y calendario automatizado de vencimientos procesales para estudios legales.',
    },
    {
      id: 'aura',
      name: 'AURA',
      tag: 'SALUD',
      tagColor: 'bg-[#FF3D8D] text-white',
      image: '/images/portfolio/aurasalud.jpg',
      desc: 'Sistema de gestión para centros de salud: turnos, pacientes y comunicaciones automatizadas.',
      details: 'Portal omnicanal para recepción de turnos con recordatorios vía WhatsApp, ficha médica digital segura y reportería de ocupación de consultorios.',
    },
    {
      id: 'rentaltrip',
      name: 'RentalTrip',
      tag: 'ALQUILERES',
      tagColor: 'bg-[#32C878]',
      image: '/images/portfolio/rentaltrip.jpg',
      desc: 'Plataforma de alquileres turísticos con reservas, pagos y sincronización de calendarios.',
      details: 'Motor de cotización instantánea y gestión de flota en Bariloche, con validación de licencias de conducir y emisión digital de contratos en minutos.',
    },
  ];

  return (
    <section id="proyectos" className="w-full py-16 sm:py-24 px-4 sm:px-6 bg-[#F6F1E6] border-b border-[#131313]/10">
      <div className="max-w-[1240px] mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="font-anton text-4xl sm:text-5xl text-[#131313] uppercase tracking-tight leading-none">
              PROYECTOS REALES <br />
              <span className="bg-[#FFE000] px-2 py-0.5 inline-block border border-[#131313]/20 mt-1">
                DE EMPRESAS REALES.
              </span>
            </h2>
            <p className="font-sans text-sm text-[#131313]/70 font-medium mt-2 max-w-lg">
              Conoce algunos de los proyectos en los que acompañamos a empresas de distintas industrias.
            </p>
          </div>

          <a
            href="#contacto"
            className="flex items-center space-x-1.5 font-sans text-sm font-bold text-[#131313] hover:text-[#168CF5] transition-colors"
          >
            <span>Ver todos los proyectos</span>
            <ArrowRight size={16} />
          </a>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {projects.map((proj) => (
            <div
              key={proj.id}
              onClick={() => setSelectedProject(proj)}
              className="group bg-white border-2 border-[#131313] shadow-[3px_3px_0px_#131313] hover:shadow-[6px_6px_0px_#131313] hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between overflow-hidden cursor-pointer rounded-lg"
            >
              {/* Image banner */}
              <div className="relative aspect-[16/10] w-full bg-[#E8E2D5] border-b-2 border-[#131313] overflow-hidden">
                <img
                  src={proj.image}
                  alt={proj.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* Sector tag */}
                <div className={`absolute top-2.5 left-2.5 font-mono text-[10px] font-black uppercase px-2 py-0.5 border border-[#131313] shadow-[1px_1px_0px_#131313] ${proj.tagColor}`}>
                  {proj.tag}
                </div>
              </div>

              {/* Body */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h3 className="font-anton text-2xl text-[#131313] uppercase leading-none group-hover:text-[#168CF5] transition-colors">
                    {proj.name}
                  </h3>

                  <p className="font-sans text-xs text-[#131313]/75 leading-relaxed font-medium mt-2">
                    {proj.desc}
                  </p>
                </div>

                {/* Bottom circular arrow */}
                <div className="flex items-center justify-end pt-2 border-t border-[#131313]/10">
                  <div className="w-7 h-7 rounded-full bg-[#131313] text-white flex items-center justify-center group-hover:bg-[#FFE000] group-hover:text-[#131313] transition-colors">
                    <ArrowRight size={13} />
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Detail Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 bg-[#131313]/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="bg-[#F6F1E6] border-3 border-[#131313] shadow-[8px_8px_0px_#131313] max-w-lg w-full p-6 relative rounded-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 w-8 h-8 bg-white border border-[#131313] flex items-center justify-center text-[#131313] hover:bg-[#FFE000] transition-colors"
            >
              <X size={18} />
            </button>

            <span className={`inline-block font-mono text-xs font-black uppercase px-2 py-0.5 border border-[#131313] mb-2 ${selectedProject.tagColor}`}>
              {selectedProject.tag}
            </span>

            <h3 className="font-anton text-3xl text-[#131313] uppercase mb-3">
              {selectedProject.name}
            </h3>

            <p className="font-sans text-sm text-[#131313]/85 leading-relaxed font-medium mb-4">
              {selectedProject.details}
            </p>

            <button
              onClick={() => setSelectedProject(null)}
              className="w-full py-2.5 bg-[#FFE000] text-[#131313] font-sans font-bold text-xs uppercase border border-[#131313] shadow-[2px_2px_0px_#131313]"
            >
              Cerrar caso
            </button>
          </div>
        </div>
      )}

    </section>
  );
};
