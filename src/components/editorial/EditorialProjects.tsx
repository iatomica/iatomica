import React, { useState } from 'react';
import { ArrowUpRight, X, Sparkles, CheckCircle2 } from 'lucide-react';

interface ProjectItem {
  id: string;
  name: string;
  sector: string;
  tagBg: string;
  image: string;
  shortDesc: string;
  problem: string;
  solution: string;
  result: string;
  metrics: string[];
}

export const EditorialProjects: React.FC = () => {
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);

  const projects: ProjectItem[] = [
    {
      id: 'grupovision',
      name: 'Grupo Visión',
      sector: 'Salud Visual & Retail',
      tagBg: 'bg-[#FFE000]',
      image: '/images/portfolio/grupovision.webp',
      shortDesc: 'Plataforma omnicanal y catálogo centralizado para red de ópticas líderes de la Patagonia.',
      problem: 'Sucursales con catálogos desconectados y agendamiento manual de turnos de consulta.',
      solution: 'Desarrollo web a medida con sincronización de inventario en tiempo real y turnos online.',
      result: '+45% en captación de citas y atención unificada en todas las ciudades.',
      metrics: ['+45% Citas agendadas', 'Stock en tiempo real', 'Zero duplicados'],
    },
    {
      id: 'lexios',
      name: 'Lexios',
      sector: 'Legaltech & Gestión Jurídica',
      tagBg: 'bg-[#168CF5] text-white',
      image: '/images/portfolio/lexios.jpg',
      shortDesc: 'Plataforma de automatización documental y análisis inteligente de expedientes.',
      problem: 'Cientos de horas perdidas revisando jurisprudencia repetitiva y controlando plazos.',
      solution: 'Asistente de IA contextual que analiza fallos, redacta borradores y alerta vencimientos.',
      result: '-60% de tiempo invertido en la preparación de escritos y escritos sin errores.',
      metrics: ['-60% Tiempo de redacción', 'Extracción semántica', 'Alertas de plazos'],
    },
    {
      id: 'aura',
      name: 'AURA',
      sector: 'Real Estate & Proptech',
      tagBg: 'bg-[#FF3D8D] text-white',
      image: '/images/portfolio/aurasalud.jpg',
      shortDesc: 'Motor de búsqueda contextual y cotización predictiva de propiedades exclusivas.',
      problem: 'Prospectos descalificados saturaban el equipo comercial con consultas repetitivas.',
      solution: 'Agente inteligente que perfila al comprador y empareja inmuebles según perfil de inversión.',
      result: '3.5x tasa de conversión de consultas a visitas efectivas en el desarrollo inmobiliario.',
      metrics: ['3.5x Conversión a visita', 'Scoring automático', 'Sincronizado a CRM'],
    },
    {
      id: 'rentaltrip',
      name: 'RentalTrip',
      sector: 'Turismo & Movilidad',
      tagBg: 'bg-[#32C878]',
      image: '/images/portfolio/rentaltrip.jpg',
      shortDesc: 'Motor de reservas y bot de atención 24/7 en WhatsApp para alquiler de vehículos en Bariloche.',
      problem: 'Pérdida de turistas extranjeros que consultaban de madrugada sin recibir respuesta inmediata.',
      solution: 'Bot de WhatsApp Cloud API que cotiza, verifica disponibilidad y emite el voucher en 1 minuto.',
      result: '+70% de ventas directas automatizadas fuera del horario comercial durante temporada alta.',
      metrics: ['+70% Ventas nocturnas', 'Respuesta < 5 seg', 'Bariloche, Patagonia'],
    },
  ];

  return (
    <section id="proyectos" className="w-full py-20 sm:py-28 px-5 sm:px-10 lg:px-14 border-b border-[#131313]/15 bg-white">
      <div className="max-w-[1320px] mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <div className="inline-flex items-center space-x-2 bg-[#FFE000] border-2 border-[#131313] px-3 py-1 font-mono text-xs font-black uppercase shadow-[2px_2px_0px_#131313] mb-3">
              <Sparkles size={14} />
              <span>CASOS DE ESTUDIO // EVIDENCIA</span>
            </div>
            <h2 className="font-anton text-4xl sm:text-6xl text-[#131313] tracking-tight leading-none uppercase">
              PROYECTOS REALES <br />
              <span className="bg-[#FFE000] px-2 py-0.5 inline-block border-2 border-[#131313] shadow-[2px_2px_0px_#131313] mt-1">
                DE EMPRESAS REALES.
              </span>
            </h2>
          </div>

          <p className="font-sans text-base text-[#131313]/80 max-w-md font-medium leading-relaxed">
            Casos verificables de clientes que transformaron su operación y multiplicaron sus resultados con nuestra tecnología.
          </p>
        </div>

        {/* 4-Column Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {projects.map((proj) => (
            <div
              key={proj.id}
              onClick={() => setActiveProject(proj)}
              className="group bg-[#F6F1E6] border-2 border-[#131313] shadow-[4px_4px_0px_#131313] hover:shadow-[8px_8px_0px_#131313] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200 flex flex-col justify-between overflow-hidden cursor-pointer"
            >
              {/* Image banner */}
              <div className="relative aspect-[16/10] w-full bg-[#E8E2D5] border-b-2 border-[#131313] overflow-hidden">
                <img
                  src={proj.image}
                  alt={proj.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                
                {/* Sector tag */}
                <div className={`absolute top-2.5 left-2.5 font-mono text-[10px] font-black uppercase px-2 py-0.5 border border-[#131313] shadow-[1px_1px_0px_#131313] ${proj.tagBg}`}>
                  {proj.sector}
                </div>
              </div>

              {/* Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-anton text-2xl text-[#131313] tracking-tight leading-none uppercase group-hover:text-[#168CF5] transition-colors">
                    {proj.name}
                  </h3>

                  <p className="font-sans text-xs sm:text-sm text-[#131313]/75 leading-relaxed font-medium mt-2">
                    {proj.shortDesc}
                  </p>
                </div>

                {/* Bottom link */}
                <div className="pt-3 border-t border-[#131313]/15 flex items-center justify-between font-mono text-xs font-bold text-[#131313]">
                  <span className="group-hover:text-[#168CF5] group-hover:underline">
                    Ver caso
                  </span>
                  <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-[#168CF5]" />
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Accessible Case Modal */}
      {activeProject && (
        <div
          className="fixed inset-0 z-50 bg-[#131313]/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
          onClick={() => setActiveProject(null)}
          role="dialog"
          aria-modal="true"
          aria-label={`Detalles del proyecto ${activeProject.name}`}
        >
          <div
            className="bg-[#F6F1E6] border-3 border-[#131313] shadow-[10px_10px_0px_#131313] max-w-2xl w-full p-6 sm:p-8 relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal close button */}
            <button
              onClick={() => setActiveProject(null)}
              className="absolute top-4 right-4 w-9 h-9 bg-white border-2 border-[#131313] flex items-center justify-center text-[#131313] hover:bg-[#FFE000] transition-colors cursor-pointer"
              aria-label="Cerrar modal"
            >
              <X size={20} />
            </button>

            {/* Modal header */}
            <div className="mb-5">
              <span className={`inline-block font-mono text-xs font-black uppercase px-2 py-0.5 border border-[#131313] mb-2 ${activeProject.tagBg}`}>
                {activeProject.sector}
              </span>
              <h3 className="font-anton text-4xl text-[#131313] leading-none uppercase">
                {activeProject.name}
              </h3>
            </div>

            {/* Case Details */}
            <div className="space-y-4 font-sans text-sm text-[#131313]/85">
              <div className="bg-white p-3.5 border-2 border-[#131313] shadow-[2px_2px_0px_#131313]">
                <strong className="font-mono text-xs text-[#F04B36] uppercase block mb-1">
                  El Problema
                </strong>
                <p>{activeProject.problem}</p>
              </div>

              <div className="bg-white p-3.5 border-2 border-[#131313] shadow-[2px_2px_0px_#131313]">
                <strong className="font-mono text-xs text-[#168CF5] uppercase block mb-1">
                  La Solución
                </strong>
                <p>{activeProject.solution}</p>
              </div>

              <div className="bg-white p-3.5 border-2 border-[#131313] shadow-[2px_2px_0px_#131313]">
                <strong className="font-mono text-xs text-[#32C878] uppercase block mb-1">
                  El Resultado
                </strong>
                <p className="font-semibold text-[#131313]">{activeProject.result}</p>
              </div>
            </div>

            {/* Metrics Pills */}
            <div className="mt-5 pt-4 border-t border-[#131313]/20 flex flex-wrap gap-2">
              {activeProject.metrics.map((m, idx) => (
                <div key={idx} className="flex items-center space-x-1.5 bg-[#FFE000] border border-[#131313] px-2.5 py-1 font-mono text-xs font-bold text-[#131313]">
                  <CheckCircle2 size={13} />
                  <span>{m}</span>
                </div>
              ))}
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
