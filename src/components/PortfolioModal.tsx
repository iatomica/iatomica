import React, { useEffect } from 'react';
import { 
  X, 
  ExternalLink, 
  CheckCircle2, 
  Sparkles, 
  Cpu, 
  Globe 
} from 'lucide-react';
import type { PortfolioProject } from '../data/portfolioData';

interface PortfolioModalProps {
  project: PortfolioProject | null;
  onClose: () => void;
  darkMode: boolean;
}

export const PortfolioModal: React.FC<PortfolioModalProps> = ({ project, onClose, darkMode }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      {/* Modal Dialog Card */}
      <div 
        className={`relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl border shadow-2xl transition-all ${
          darkMode 
            ? 'bg-slate-900 border-slate-700/80 text-white' 
            : 'bg-white border-slate-200 text-slate-900'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button Floating */}
        <button
          onClick={onClose}
          aria-label="Cerrar ventana de detalle"
          className={`absolute top-5 right-5 z-20 p-2.5 rounded-full transition-all cursor-pointer ${
            darkMode 
              ? 'bg-slate-800/90 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700' 
              : 'bg-white/90 hover:bg-slate-100 text-slate-700 hover:text-slate-950 border border-slate-200 shadow-md'
          }`}
        >
          <X size={18} />
        </button>

        {/* Hero Image Showcase */}
        <div className="relative w-full h-64 sm:h-80 md:h-96 overflow-hidden bg-slate-950">
          <img 
            src={project.heroImage} 
            alt={project.title} 
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
          
          {/* Overlay Floating Tags */}
          <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-orange-500 text-white shadow-md">
                  {project.sectorLabel}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/20 backdrop-blur-md text-white border border-white/20">
                  {project.badge}
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight drop-shadow-md">
                {project.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 font-medium mt-1">
                {project.clientName}
              </p>
            </div>

            {/* Live Launch Button Floating */}
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl gradient-brand text-white font-bold text-xs shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 hover:scale-105 transition-all"
            >
              <span>Visitar sitio en vivo</span>
              <ExternalLink size={14} />
            </a>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-8">
          
          {/* Tagline & Overview */}
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-orange-500 block mb-2">
              Propuesta & Solución
            </span>
            <h3 className="text-xl sm:text-2xl font-bold mb-3">
              "{project.tagline}"
            </h3>
            <p className={`text-sm sm:text-base leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
              {project.fullDesc}
            </p>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-3 gap-4">
            {project.metrics.map((m, idx) => (
              <div 
                key={idx}
                className={`p-4 rounded-2xl border text-center ${
                  darkMode 
                    ? 'bg-slate-800/50 border-slate-700/60' 
                    : 'bg-slate-50 border-slate-200/80 shadow-xs'
                }`}
              >
                <span className="text-xl sm:text-2xl font-black text-gradient-brand block">
                  {m.value}
                </span>
                <span className={`text-[11px] font-medium tracking-tight uppercase block mt-1 ${
                  darkMode ? 'text-slate-400' : 'text-slate-500'
                }`}>
                  {m.label}
                </span>
              </div>
            ))}
          </div>

          {/* Key Features Implemented by iAtomica */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-orange-500 mb-4 flex items-center gap-2">
              <Sparkles size={14} />
              <span>Funcionalidades & Soluciones Implementadas</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {project.features.map((feat, idx) => (
                <div 
                  key={idx}
                  className={`p-3.5 rounded-xl border flex items-start gap-3 text-xs leading-relaxed ${
                    darkMode 
                      ? 'bg-slate-800/30 border-slate-800 text-slate-200' 
                      : 'bg-slate-50/80 border-slate-200 text-slate-700'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
              <Cpu size={14} />
              <span>Stack Tecnológico & Despliegue</span>
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech, idx) => (
                <span 
                  key={idx}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold border ${
                    darkMode 
                      ? 'bg-slate-800 text-slate-300 border-slate-700' 
                      : 'bg-slate-100 text-slate-700 border-slate-200'
                  }`}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Footer Navigation Bar */}
          <div className={`pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-4 ${
            darkMode ? 'border-slate-800' : 'border-slate-200'
          }`}>
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
              <Globe size={14} className="text-orange-500" />
              <span>{project.url.replace(/^https?:\/\//, '')}</span>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={onClose}
                className={`flex-1 sm:flex-none px-5 py-2.5 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                  darkMode 
                    ? 'border-slate-700 hover:bg-slate-800 text-slate-300' 
                    : 'border-slate-300 hover:bg-slate-100 text-slate-700'
                }`}
              >
                Cerrar
              </button>

              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl gradient-brand text-white font-bold text-xs shadow-md shadow-orange-500/20 hover:shadow-orange-500/40 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span>Acceder a {project.title}</span>
                <ExternalLink size={14} />
              </a>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
