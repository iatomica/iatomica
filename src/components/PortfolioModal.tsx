import React, { useEffect } from 'react';
import { 
  X, 
  ExternalLink, 
  CheckCircle2, 
  Sparkles, 
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
      
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity" 
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog Card */}
      <div 
        role="dialog"
        aria-modal="true"
        aria-labelledby="portfolio-modal-title"
        className={`relative w-full max-w-3xl rounded-3xl overflow-hidden border shadow-2xl z-10 my-8 transition-all max-h-[90vh] flex flex-col ${
          darkMode 
            ? 'bg-slate-900 border-slate-800 text-white' 
            : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        {/* Modal Hero Banner */}
        <div className="relative h-60 sm:h-72 w-full overflow-hidden shrink-0 bg-slate-950">
          <img
            src={project.heroImage}
            alt={project.title}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />

          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Cerrar modal"
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white flex items-center justify-center backdrop-blur-md border border-white/20 transition-all hover:scale-105 z-10 cursor-pointer"
          >
            <X size={18} />
          </button>

          {/* Sector & Badge Pills */}
          <div className="absolute top-4 left-4 flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-950/80 backdrop-blur-md text-white border border-white/20">
              {project.sectorLabel}
            </span>
            <span className="px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-orange-500 text-white shadow-sm">
              {project.badge}
            </span>
          </div>

          {/* Hero text overlay inside banner */}
          <div className="absolute bottom-5 left-6 right-6 text-white">
            <span className="text-xs uppercase tracking-widest text-orange-400 font-semibold block mb-1">
              {project.clientName}
            </span>
            <h3 id="portfolio-modal-title" className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
              {project.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 font-medium mt-1 line-clamp-1">
              {project.tagline}
            </p>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          
          {/* Executive Overview */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-2">
              Sobre el Proyecto
            </h4>
            <p className={`text-sm leading-relaxed ${
              darkMode ? 'text-slate-200' : 'text-slate-700'
            }`}>
              {project.fullDesc}
            </p>
          </div>

          {/* Impact Metrics Bento */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {project.metrics.map((m, idx) => (
              <div 
                key={idx}
                className={`p-3.5 rounded-2xl border text-center transition-all ${
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
