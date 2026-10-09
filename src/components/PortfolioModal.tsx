import React, { useEffect } from 'react';
import { ExternalLink } from 'lucide-react';
import type { PortfolioProject } from '../data/portfolioData';

interface PortfolioModalProps {
  project: PortfolioProject | null;
  onClose: () => void;
  darkMode?: boolean;
}

export const PortfolioModal: React.FC<PortfolioModalProps> = ({ project, onClose }) => {
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
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
      style={{
        backgroundColor: 'rgba(23, 23, 21, 0.75)',
        backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)'
      }}
    >
      {/* Backdrop click handler */}
      <div
        className="fixed inset-0"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Card - Neo-Brutalist Pop-Art Style */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="portfolio-modal-title"
        className="relative w-full max-w-3xl z-10 my-6 flex flex-col max-h-[92vh] overflow-hidden"
        style={{
          backgroundColor: '#f2efe5',
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Cpath fill='%23000' opacity='.06' filter='url(%23n)' d='M0 0h180v180H0z'/%3E%3C/svg%3E")`,
          border: '3px solid #171715',
          boxShadow: '10px 10px 0px #171715',
          borderRadius: '2px',
          color: '#171715',
          fontFamily: 'Arial, Helvetica, sans-serif'
        }}
      >
        {/* MODAL HERO BANNER */}
        <div
          className="relative w-full overflow-hidden shrink-0"
          style={{
            height: '240px',
            borderBottom: '3px solid #171715',
            backgroundColor: '#171715'
          }}
        >
          <img
            src={project.heroImage}
            alt={project.title}
            className="w-full h-full object-cover object-center"
          />

          {/* Grayscale / Dark Gradient for punchy readability */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(180deg, rgba(23,23,21,0.3) 0%, rgba(23,23,21,0.85) 100%)'
            }}
          />

          {/* Close button - Neo-brutalist square */}
          <button
            onClick={onClose}
            aria-label="Cerrar modal"
            className="absolute top-3 right-3 flex items-center justify-center font-black transition-transform cursor-pointer"
            style={{
              width: '38px',
              height: '38px',
              backgroundColor: '#ffe526',
              color: '#171715',
              border: '2px solid #171715',
              boxShadow: '3px 3px 0 #171715',
              fontSize: '22px',
              lineHeight: 1,
              zIndex: 20
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translate(-2px, -2px)';
              e.currentTarget.style.boxShadow = '5px 5px 0 #171715';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'none';
              e.currentTarget.style.boxShadow = '3px 3px 0 #171715';
            }}
          >
            ×
          </button>

          {/* Sector & Badge Pills */}
          <div className="absolute top-4 left-4 flex flex-wrap items-center gap-2 z-10">
            <span
              style={{
                backgroundColor: '#171715',
                color: '#ffffff',
                border: '1.5px solid #171715',
                fontSize: '10px',
                fontWeight: 900,
                letterSpacing: '2px',
                textTransform: 'uppercase',
                padding: '4px 10px',
                borderRadius: '2px'
              }}
            >
              {project.sectorLabel}
            </span>

            <span
              style={{
                backgroundColor: '#ffe526',
                color: '#171715',
                border: '1.5px solid #171715',
                boxShadow: '2px 2px 0 #171715',
                fontSize: '10px',
                fontWeight: 900,
                letterSpacing: '1px',
                textTransform: 'uppercase',
                padding: '4px 10px',
                transform: 'rotate(-2deg)',
                borderRadius: '2px'
              }}
            >
              {project.badge}
            </span>
          </div>

          {/* Title & Client Headline inside Hero */}
          <div className="absolute bottom-4 left-5 right-5 text-white z-10">
            <div
              style={{
                fontSize: '11px',
                fontWeight: 800,
                letterSpacing: '2px',
                textTransform: 'uppercase',
                color: '#ffe526',
                marginBottom: '4px'
              }}
            >
              {project.clientName}
            </div>

            <h3
              id="portfolio-modal-title"
              style={{
                fontFamily: "Impact, 'Arial Narrow', sans-serif",
                fontSize: '34px',
                textTransform: 'uppercase',
                lineHeight: 1.05,
                letterSpacing: '-1px',
                margin: 0,
                textShadow: '2px 2px 0 #171715'
              }}
            >
              {project.title}
            </h3>

            <p
              style={{
                fontSize: '13px',
                color: '#f2efe5',
                fontWeight: 600,
                margin: '4px 0 0',
                opacity: 0.95
              }}
            >
              {project.tagline}
            </p>
          </div>
        </div>

        {/* MODAL SCROLLABLE BODY */}
        <div
          className="p-5 sm:p-7 overflow-y-auto space-y-6"
          style={{
            maxHeight: 'calc(92vh - 240px)'
          }}
        >
          {/* Executive Overview */}
          <div>
            <div
              style={{
                fontSize: '10px',
                fontWeight: 800,
                letterSpacing: '3px',
                textTransform: 'uppercase',
                color: '#171715',
                marginBottom: '8px'
              }}
            >
              Sobre el Proyecto
            </div>
            <p
              style={{
                fontSize: '14px',
                lineHeight: 1.65,
                color: '#222',
                margin: 0
              }}
            >
              {project.fullDesc}
            </p>
          </div>

          {/* Bento Metric Cards (Neo-Brutalist) */}
          <div>
            <div
              style={{
                fontSize: '10px',
                fontWeight: 800,
                letterSpacing: '3px',
                textTransform: 'uppercase',
                color: '#171715',
                marginBottom: '10px'
              }}
            >
              Métricas & Impacto
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {project.metrics.map((m, idx) => (
                <div
                  key={idx}
                  style={{
                    backgroundColor: '#ffffff',
                    border: '2px solid #171715',
                    boxShadow: '4px 4px 0px #171715',
                    padding: '12px 14px',
                    borderRadius: '2px'
                  }}
                >
                  <div
                    style={{
                      fontFamily: "Impact, 'Arial Narrow', sans-serif",
                      fontSize: '26px',
                      lineHeight: 1.1,
                      textTransform: 'uppercase',
                      color: '#171715'
                    }}
                  >
                    <span
                      style={{
                        backgroundColor: '#ffe526',
                        padding: '1px 6px'
                      }}
                    >
                      {m.value}
                    </span>
                  </div>
                  <div
                    style={{
                      fontSize: '10px',
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      letterSpacing: '1px',
                      color: '#555',
                      marginTop: '6px'
                    }}
                  >
                    {m.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Key Features Implemented */}
          <div>
            <div
              style={{
                fontSize: '10px',
                fontWeight: 800,
                letterSpacing: '3px',
                textTransform: 'uppercase',
                color: '#171715',
                marginBottom: '10px'
              }}
            >
              Soluciones & Funcionalidades Implementadas
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {project.features.map((feat, idx) => (
                <div
                  key={idx}
                  style={{
                    backgroundColor: '#ffffff',
                    border: '1.5px solid #171715',
                    boxShadow: '3px 3px 0px #171715',
                    padding: '10px 12px',
                    borderRadius: '2px',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '10px'
                  }}
                >
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '18px',
                      height: '18px',
                      backgroundColor: '#171715',
                      color: '#ffe526',
                      borderRadius: '50%',
                      fontSize: '11px',
                      fontWeight: 900,
                      flexShrink: 0,
                      marginTop: '1px'
                    }}
                  >
                    ✓
                  </span>
                  <span
                    style={{
                      fontSize: '12px',
                      fontWeight: 700,
                      lineHeight: 1.45,
                      color: '#171715'
                    }}
                  >
                    {feat}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack Pills */}
          {project.techStack && project.techStack.length > 0 && (
            <div>
              <div
                style={{
                  fontSize: '10px',
                  fontWeight: 800,
                  letterSpacing: '3px',
                  textTransform: 'uppercase',
                  color: '#171715',
                  marginBottom: '8px'
                }}
              >
                Stack Tecnológico
              </div>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech, idx) => (
                  <span
                    key={idx}
                    style={{
                      backgroundColor: '#ffffff',
                      border: '1.5px solid #171715',
                      boxShadow: '2px 2px 0px #171715',
                      padding: '4px 10px',
                      fontSize: '11px',
                      fontWeight: 800,
                      borderRadius: '2px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* FOOTER ACTIONS */}
          <div
            className="pt-5 flex flex-col sm:flex-row items-center justify-between gap-4"
            style={{
              borderTop: '2px solid #171715'
            }}
          >
            <div
              style={{
                fontSize: '11px',
                fontWeight: 800,
                color: '#555',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <ExternalLink size={13} />
              <span>{project.url.replace(/^https?:\/\//, '')}</span>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={onClose}
                className="flex-1 sm:flex-none cursor-pointer"
                style={{
                  border: '1.5px solid #171715',
                  backgroundColor: 'transparent',
                  padding: '10px 18px',
                  fontSize: '12px',
                  fontWeight: 800,
                  borderRadius: '2px',
                  boxShadow: '3px 3px 0 #171715',
                  transition: 'transform 0.15s, box-shadow 0.15s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translate(-1px, -1px)';
                  e.currentTarget.style.boxShadow = '4px 4px 0 #171715';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'none';
                  e.currentTarget.style.boxShadow = '3px 3px 0 #171715';
                }}
              >
                Cerrar
              </button>

              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none cursor-pointer inline-flex items-center justify-center gap-2"
                style={{
                  backgroundColor: '#ffe526',
                  color: '#171715',
                  border: '1.5px solid #171715',
                  padding: '10px 22px',
                  fontSize: '12px',
                  fontWeight: 900,
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  borderRadius: '2px',
                  boxShadow: '4px 4px 0 #171715',
                  textDecoration: 'none',
                  transition: 'transform 0.15s, box-shadow 0.15s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translate(-2px, -2px)';
                  e.currentTarget.style.boxShadow = '6px 6px 0 #171715';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'none';
                  e.currentTarget.style.boxShadow = '4px 4px 0 #171715';
                }}
              >
                <span>Acceder a {project.title}</span>
                <span style={{ fontSize: '15px', lineHeight: 1 }}>↗</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
