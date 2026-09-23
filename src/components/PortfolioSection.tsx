import React, { useState, useMemo } from 'react';
import { 
  ArrowUpRight, 
  Sparkles, 
  ExternalLink 
} from 'lucide-react';
import { 
  PORTFOLIO_PROJECTS, 
  PORTFOLIO_CATEGORIES 
} from '../data/portfolioData';
import type { PortfolioProject } from '../data/portfolioData';
import { PortfolioModal } from './PortfolioModal';

interface PortfolioSectionProps {
  darkMode: boolean;
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({ darkMode }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [activeProject, setActiveProject] = useState<PortfolioProject | null>(null);

  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'todos') return PORTFOLIO_PROJECTS;
    return PORTFOLIO_PROJECTS.filter(p => p.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <section 
      id="portfolio" 
      className={`py-24 relative overflow-hidden transition-colors ${
        darkMode ? 'bg-slate-950 text-white' : 'bg-slate-50/70 text-slate-900'
      }`}
    >
      {/* Background Lighting Accents */}
      <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-orange-500/10 rounded-full filter blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-[500px] h-[500px] bg-purple-600/10 rounded-full filter blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full text-xs font-bold border mb-4 bg-orange-500/10 border-orange-500/20 text-orange-600 dark:text-orange-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span className="uppercase tracking-wider">Ecosistema & Casos de Éxito</span>
          </div>
          
          <h2 className={`text-3xl sm:text-5xl font-black tracking-tight leading-tight ${
            darkMode ? 'text-white' : 'text-slate-900'
          }`}>
            Soluciones Digitales <br />
            <span className="text-gradient-brand">en Producción Real</span>
          </h2>
          
          <p className={`mt-4 text-base sm:text-lg leading-relaxed ${
            darkMode ? 'text-slate-300' : 'text-slate-600'
          }`}>
            Explorá las plataformas, sistemas de gestión y webs interactivas que construimos para clientes de turismo, salud, legal, arquitectura, gastronomía y logística.
          </p>
        </div>

        {/* Category Pills Filter */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {PORTFOLIO_CATEGORIES.map(cat => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-tight transition-all cursor-pointer ${
                  isActive
                    ? 'gradient-brand text-white shadow-md shadow-orange-500/25 scale-105'
                    : darkMode
                      ? 'bg-slate-900/90 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
                      : 'bg-white text-slate-600 hover:text-slate-950 hover:bg-slate-100 border border-slate-200/90 shadow-xs'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Projects Bento/Card Grid - Full Crop Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => setActiveProject(project)}
              className="group relative h-[420px] sm:h-[460px] rounded-3xl overflow-hidden border border-slate-700/60 shadow-xl hover:shadow-2xl hover:shadow-orange-500/15 hover:border-orange-500/50 hover:-translate-y-2 transition-all duration-500 flex flex-col justify-between p-6 sm:p-7 cursor-pointer"
            >
              {/* Full Crop Background Image */}
              <img
                src={project.heroImage}
                alt={project.title}
                className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
                loading="lazy"
              />

              {/* Gradient overlays for cinematic readability */}
              <div className="absolute inset-0 bg-gradient-to-b from-slate-950/75 via-transparent to-transparent h-32 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent pointer-events-none" />
              <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/10 transition-colors duration-500 pointer-events-none" />

              {/* Top Row: Sector Badge & Quick External Link */}
              <div className="relative z-10 flex items-center justify-between">
                <span className="px-3.5 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-slate-950/75 backdrop-blur-md text-white border border-white/20 shadow-md">
                  {project.sectorLabel}
                </span>

                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  aria-label={`Abrir sitio de ${project.title}`}
                  className="w-10 h-10 rounded-full bg-white/90 hover:bg-white text-slate-900 flex items-center justify-center shadow-xl backdrop-blur-md transition-all duration-200 hover:scale-110 hover:shadow-orange-500/40"
                  title="Visitar sitio directo"
                >
                  <ExternalLink size={16} />
                </a>
              </div>

              {/* Bottom Content Area: Title, Badge, Description & Action */}
              <div className="relative z-10 mt-auto space-y-2.5">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-orange-500 text-white uppercase tracking-wider shadow-sm">
                    {project.badge}
                  </span>
                  <span className="text-xs text-slate-300 font-medium truncate drop-shadow-sm">
                    {project.clientName}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white group-hover:text-orange-400 transition-colors drop-shadow-md">
                  {project.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-200 line-clamp-2 leading-relaxed font-normal drop-shadow-sm">
                  {project.shortDesc}
                </p>

                <div className="pt-2 flex items-center justify-between text-xs font-bold text-orange-400">
                  <span className="text-slate-300/90 text-xs font-medium group-hover:text-white transition-colors">
                    Ver detalles de la plataforma
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white group-hover:bg-orange-500 group-hover:border-orange-500 transition-all shadow-sm">
                    <span>Explorar</span>
                    <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Detail Modal */}
      <PortfolioModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
        darkMode={darkMode}
      />

    </section>
  );
};
