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

        {/* Projects Bento/Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => setActiveProject(project)}
              className={`group rounded-3xl overflow-hidden border transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between cursor-pointer ${
                darkMode
                  ? 'bg-slate-900/80 border-slate-800 hover:border-orange-500/40 hover:shadow-2xl hover:shadow-orange-500/10'
                  : 'bg-white border-slate-200/90 hover:border-orange-500/40 hover:shadow-xl shadow-sm'
              }`}
            >
              <div>
                
                {/* Card Hero Image */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
                  <img
                    src={project.heroImage}
                    alt={project.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  
                  {/* Subtle Gradient Shadow */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                  {/* Top Left Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-slate-950/80 backdrop-blur-md text-white border border-white/20 shadow-sm">
                      {project.sectorLabel}
                    </span>
                  </div>

                  {/* Top Right Quick Launch Link */}
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    aria-label={`Abrir sitio de ${project.title}`}
                    className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-slate-900 flex items-center justify-center shadow-lg transition-transform duration-200 hover:scale-110"
                    title="Visitar sitio directo"
                  >
                    <ExternalLink size={15} />
                  </a>

                  {/* Bottom Image Brand Tag */}
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white text-xs font-medium">
                    <span className="truncate drop-shadow-md">{project.clientName}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-orange-500 font-bold uppercase">
                      {project.badge}
                    </span>
                  </div>

                </div>

                {/* Card Content Body */}
                <div className="p-6">
                  
                  <h3 className={`text-xl font-bold tracking-tight mb-2 group-hover:text-orange-500 transition-colors ${
                    darkMode ? 'text-white' : 'text-slate-900'
                  }`}>
                    {project.title}
                  </h3>

                  <p className={`text-xs leading-relaxed line-clamp-3 mb-4 ${
                    darkMode ? 'text-slate-300' : 'text-slate-600'
                  }`}>
                    {project.shortDesc}
                  </p>

                  {/* Tech stack mini tags */}
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {project.techStack.slice(0, 3).map((tech, idx) => (
                      <span
                        key={idx}
                        className={`text-[10px] font-mono px-2 py-0.5 rounded-md border ${
                          darkMode
                            ? 'bg-slate-800 text-slate-300 border-slate-700/80'
                            : 'bg-slate-100 text-slate-600 border-slate-200'
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                    {project.techStack.length > 3 && (
                      <span className="text-[10px] font-mono px-1.5 py-0.5 text-slate-400">
                        +{project.techStack.length - 3}
                      </span>
                    )}
                  </div>

                </div>

              </div>

              {/* Card Interactive Footer Action */}
              <div className={`p-6 pt-0 border-t mt-4 flex items-center justify-between text-xs font-bold ${
                darkMode ? 'border-slate-800/80 text-orange-400' : 'border-slate-100 text-orange-600'
              }`}>
                <span>Explorar caso de éxito</span>
                <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Detalles
                  <ArrowUpRight size={14} />
                </span>
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
