import React, { useState, useEffect } from 'react';
import '../../styles/landing-maqueta.css';
import { PORTFOLIO_PROJECTS, PORTFOLIO_CATEGORIES, type PortfolioProject } from '../../data/portfolioData';
import { PortfolioModal } from '../PortfolioModal';
import { createLead } from '../../services/leadService';

interface LandingMaquetaProps {
  onOpenAdmin?: () => void;
  onOpenPrueba?: () => void;
  darkMode?: boolean;
}

export const LandingMaqueta: React.FC<LandingMaquetaProps> = ({ onOpenAdmin, onOpenPrueba, darkMode = false }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [activeProject, setActiveProject] = useState<PortfolioProject | null>(null);

  // Form State
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [empresa, setEmpresa] = useState('');
  const [telefono, setTelefono] = useState('');
  const [idea, setIdea] = useState('');
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formFeedback, setFormFeedback] = useState<string | null>(null);
  const [preparedText, setPreparedText] = useState<string | null>(null);

  // Close mobile menu on ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const closeMenu = () => setMobileMenuOpen(false);

  // Contact Form Submission
  const handleSubmitContact = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre || !email || !idea) return;

    setFormSubmitting(true);
    const message = `Hola IAtomica, soy ${nombre}${empresa ? ` de ${empresa}` : ''}.\nMi correo: ${email}${telefono ? `\nTeléfono: ${telefono}` : ''}\n\nMe gustaría consultar por:\n${idea}`;

    try {
      await createLead({
        name: nombre,
        email: email,
        company: empresa || 'Empresa no especificada',
        phone: telefono || '',
        service: 'Consultoría y Desarrollo Integral',
        message: idea
      });

      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(message);
        setFormFeedback('¡Consulta enviada al CRM y copiada al portapapeles!');
      } else {
        setPreparedText(message);
        setFormFeedback('¡Consulta registrada con éxito en nuestro sistema!');
      }

      setNombre('');
      setEmail('');
      setEmpresa('');
      setTelefono('');
      setIdea('');
    } catch (err) {
      console.error('Error submitting inquiry:', err);
      try {
        await navigator.clipboard.writeText(message);
        setFormFeedback('Consulta copiada al portapapeles.');
      } catch {
        setPreparedText(message);
        setFormFeedback('Tu consulta está lista para ser copiada.');
      }
    } finally {
      setFormSubmitting(false);
    }
  };

  // Filtrado por categoría entre todos los proyectos del sistema
  const filteredProjects = PORTFOLIO_PROJECTS.filter(p => {
    if (selectedCategory === 'todos') return true;
    return p.category === selectedCategory;
  });

  // Mostramos 6 por defecto en "todos", o todos si pulsa el botón o si filtra por sector específico
  const displayedProjects = (showAllProjects || selectedCategory !== 'todos')
    ? filteredProjects
    : filteredProjects.slice(0, 6);

  return (
    <div className="iatomica-landing">
      {/* SVG Icons Defs */}
      <svg style={{ position: 'absolute', width: 0, height: 0 }} aria-hidden="true">
        <defs>
          <symbol id="atom" viewBox="0 0 60 60">
            <g fill="none" stroke="currentColor" strokeWidth="5">
              <ellipse cx="30" cy="30" rx="26" ry="10" transform="rotate(45 30 30)" />
              <ellipse cx="30" cy="30" rx="26" ry="10" transform="rotate(-45 30 30)" />
              <ellipse cx="30" cy="30" rx="26" ry="10" transform="rotate(90 30 30)" />
            </g>
            <circle cx="30" cy="30" r="4" fill="currentColor" />
          </symbol>
          <symbol id="bulb" viewBox="0 0 140 120">
            <g stroke="#171715" strokeWidth="4" fill="#f2efe5">
              <path d="M47 74C16 33 52 5 76 13c35 11 32 38 13 60l-5 16H52z" />
              <path d="M52 89h32v12H52zM56 107h24" />
              <path d="m60 74-7-26 16 10 15-10-7 26" fill="none" />
              <path d="M68 0v8M15 20l11 8M8 53h14M112 25l12-8M112 53h18" />
            </g>
          </symbol>
          <symbol id="code" viewBox="0 0 140 120">
            <rect x="8" y="13" width="122" height="83" rx="4" fill="#171715" stroke="#f2efe5" strokeWidth="3" />
            <path d="m48 37-18 17 18 17m44-34 18 17-18 17M79 32 62 76" fill="none" stroke="#ffe526" strokeWidth="5" />
            <path d="M0 99h140l-12 13H12z" fill="#f2efe5" stroke="#171715" strokeWidth="3" />
          </symbol>
          <symbol id="bot" viewBox="0 0 140 120">
            <g fill="#f2efe5" stroke="#171715" strokeWidth="4">
              <rect x="25" y="27" width="90" height="69" rx="20" />
              <path d="M70 27V12" />
              <circle cx="70" cy="9" r="6" fill="#ffe526" />
              <rect x="10" y="46" width="15" height="30" rx="5" />
              <rect x="115" y="46" width="15" height="30" rx="5" />
              <circle cx="49" cy="55" r="9" fill="#171715" />
              <circle cx="91" cy="55" r="9" fill="#171715" />
              <path d="M48 78h44" />
            </g>
          </symbol>
          <symbol id="link" viewBox="0 0 140 120">
            <g fill="none" stroke="#171715" strokeWidth="15">
              <rect x="14" y="41" width="67" height="35" rx="17" transform="rotate(-40 48 58)" />
              <rect x="58" y="40" width="67" height="35" rx="17" transform="rotate(-40 92 58)" />
            </g>
            <path d="m48 77 45-38" stroke="#f2efe5" strokeWidth="6" />
          </symbol>
          <symbol id="check" viewBox="0 0 140 120">
            <path d="M70 7 118 26v36c0 25-28 44-48 53-20-9-48-28-48-53V26z" fill="#f2efe5" stroke="#171715" strokeWidth="4" />
            <path d="m44 60 18 18 35-36" fill="none" stroke="#171715" strokeWidth="8" />
          </symbol>
          <symbol id="megaphone" viewBox="0 0 140 120">
            <g fill="#f2efe5" stroke="#171715" strokeWidth="4">
              <path d="m16 47 75-28v68L16 69z" />
              <ellipse cx="95" cy="53" rx="16" ry="35" fill="#171715" />
              <path d="m40 77 4 28h16l-5-33" />
              <path d="m115 19 13-8m-8 41h18m-20 28 14 10" />
            </g>
          </symbol>
        </defs>
      </svg>

      {/* 01 HEADER & NAVEGACIÓN */}
      <header className="header">
        <nav className="wrap nav" aria-label="Navegación principal">
          <a className="brand" href="#inicio" aria-label="IAtomica — Inicio">
            <img
              className="brand-logo"
              src="/landing-assets/iatomica-logo-original.png"
              alt="iAtomica Logo"
              width={53}
              height={46}
            />
            iAtomica
          </a>
          <div className="navlinks">
            <a href="#servicios">Servicios</a>
            <a href="#proyectos">Proyectos</a>
            <a href="#proceso">Cómo trabajamos</a>
            <a href="#nosotros">Nosotros</a>
            <a href="#contacto" className="btn yellow">
              Asesoría gratuita <span className="arrow">→</span>
            </a>
          </div>
          <button
            className="menu-btn"
            aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? '×' : '☰'}
          </button>
        </nav>
      </header>

      {/* MOBILE PANEL MENU */}
      <div className={`mobile-panel ${mobileMenuOpen ? 'open' : ''}`} id="mobile-menu">
        <a href="#servicios" onClick={closeMenu}>Servicios</a>
        <a href="#proyectos" onClick={closeMenu}>Proyectos</a>
        <a href="#proceso" onClick={closeMenu}>Cómo trabajamos</a>
        <a href="#nosotros" onClick={closeMenu}>Nosotros</a>
        <a href="#faq" onClick={closeMenu}>Preguntas frecuentes</a>
        <a href="#contacto" className="btn yellow" onClick={closeMenu}>
          Asesoría gratuita →
        </a>
        <p className="eyebrow">
          Tecnología para<br /><br />ideas que avanzan.
        </p>
      </div>

      <main>
        {/* 02 HERO PRINCIPAL */}
        <section className="wrap hero reveal" id="inicio">
          <div>
            <p className="eyebrow">Ideas · Tecnología · Estrategia · Resultados</p>
            <h1 className="display">
              Que la IA<br />
              trabaje por<br />
              <span className="highlight">tu negocio.</span>
            </h1>
            <p className="desc">
              Consultoría, diseño, desarrollo y automatizaciones para empresas que quieren crecer de verdad.
            </p>
            <div className="actions">
              <a className="btn yellow" href="#contacto">
                Solicitar asesoría <span className="arrow">→</span>
              </a>
              <a className="btn" href="#proyectos">
                Ver proyectos <span className="arrow">→</span>
              </a>
            </div>
          </div>

          <div className="hero-art">
            <p className="collage-caption">
              Ideas que se convierten en resultados <span aria-hidden="true">↘</span>
            </p>
            <div className="hero-collage">
              <span className="collage-layer paper-back" aria-hidden="true"></span>
              <span className="collage-layer ink-blue" aria-hidden="true"></span>
              <span className="collage-layer ink-pink" aria-hidden="true"></span>
              <span className="collage-layer halftone" aria-hidden="true"></span>
              <img
                src="/landing-assets/hero-collage-v4.png"
                width={1536}
                height={1024}
                fetchPriority="high"
                decoding="async"
                alt="Collage editorial de una mujer con lentes y notebook con el logo de IAtomica, montañas y lago de Bariloche; recortes de papel, texturas y acentos azules, amarillos y rosas."
              />
              <span className="collage-layer paper-edge" aria-hidden="true"></span>
              <span className="collage-layer ink-front" aria-hidden="true"></span>
              <span className="collage-layer tape" aria-hidden="true"></span>
            </div>
            <p className="collage-tagline">
              Menos tareas repetitivas.<br />
              Más posibilidades.
            </p>
          </div>
        </section>

        {/* TICKER */}
        <div className="ticker">
          <div className="wrap ticker-inner">
            <span>ESTRATEGIA</span>
            <span>✳</span>
            <span>DISEÑO</span>
            <span>✳</span>
            <span>INTELIGENCIA ARTIFICIAL</span>
            <span>✳</span>
            <span>AUTOMATIZACIÓN</span>
            <span>✳</span>
            <span>RESULTADOS REALES</span>
          </div>
        </div>

        {/* 03 NUESTROS SERVICIOS */}
        <section className="wrap section" id="servicios">
          <p className="eyebrow">Nuestros servicios</p>
          <div className="section-head">
            <h2 className="display">
              Soluciones reales<br />
              para <span className="highlight">empresas reales.</span>
            </h2>
            <p>
              Conectamos estrategia, creatividad y tecnología para hacer más simple el trabajo de todos los días.
            </p>
          </div>

          <div className="service-grid">
            <a href="#contacto" className="service">
              <div className="service-art" style={{ '--accent': '#ffe526' } as React.CSSProperties}>
                <svg><use href="#bulb" /></svg>
              </div>
              <h3>Consultoría tecnológica</h3>
              <p>Relevamiento, diagnóstico y una hoja de ruta clara para tomar mejores decisiones.</p>
              <span className="round">↗</span>
            </a>

            <a href="#contacto" className="service">
              <div className="service-art" style={{ '--accent': '#ff5685' } as React.CSSProperties}>
                <svg><use href="#bot" /></svg>
              </div>
              <h3>Herramientas de IA</h3>
              <p>Asistentes y flujos inteligentes aplicados a las necesidades reales de tu negocio.</p>
              <span className="round">↗</span>
            </a>

            <a href="#contacto" className="service">
              <div className="service-art" style={{ '--accent': '#008ded' } as React.CSSProperties}>
                <svg><use href="#code" /></svg>
              </div>
              <h3>Desarrollo a medida</h3>
              <p>Sitios web, paneles de gestión y aplicaciones diseñados para tus procesos operativos.</p>
              <span className="round">↗</span>
            </a>

            <a href="#contacto" className="service">
              <div className="service-art" style={{ '--accent': '#57d897' } as React.CSSProperties}>
                <svg><use href="#link" /></svg>
              </div>
              <h3>Automatizaciones e integraciones</h3>
              <p>Conectamos herramientas y proveedores para reducir tiempos y tareas manuales.</p>
              <span className="round">↗</span>
            </a>

            <a href="#contacto" className="service">
              <div className="service-art" style={{ '--accent': '#d5d6cd' } as React.CSSProperties}>
                <svg><use href="#check" /></svg>
              </div>
              <h3>Mantenimiento y QA</h3>
              <p>Pruebas, soporte y seguimiento continuo para acompañar la evolución de tus sistemas.</p>
              <span className="round">↗</span>
            </a>

            <a href="#contacto" className="service">
              <div className="service-art" style={{ '--accent': '#ff9351' } as React.CSSProperties}>
                <svg><use href="#megaphone" /></svg>
              </div>
              <h3>Diseño y capacitación</h3>
              <p>Experiencias visuales, manuales y formación técnica para que tu equipo opere con autonomía.</p>
              <span className="round">↗</span>
            </a>
          </div>
        </section>

        {/* 04 PROYECTOS / CLIENTES REALES (PORTFOLIO COMPLETO) */}
        <section className="wrap section" id="proyectos">
          <p className="eyebrow">Tecnología aplicada</p>
          <div className="section-head">
            <div>
              <h2 className="display">
                Ideas que se convierten<br />
                en <span className="highlight">proyectos.</span>
              </h2>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ marginBottom: 12 }}>
                Distintos negocios. Un mismo objetivo: crear herramientas útiles, escalables y con impacto real.
              </p>
              {selectedCategory === 'todos' && (
                <button
                  onClick={() => setShowAllProjects(!showAllProjects)}
                  className="btn"
                  style={{ padding: '8px 14px', fontSize: 11 }}
                >
                  {showAllProjects
                    ? `Ver destacados (${6})`
                    : `Ver todos los proyectos (${PORTFOLIO_PROJECTS.length})`} <span className="arrow" style={{ fontSize: 16 }}>→</span>
                </button>
              )}
            </div>
          </div>

          {/* Filtros de Categorías */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 26 }}>
            {PORTFOLIO_CATEGORIES.map(cat => {
              const count = cat.id === 'todos'
                ? PORTFOLIO_PROJECTS.length
                : PORTFOLIO_PROJECTS.filter(p => p.category === cat.id).length;

              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    setShowAllProjects(true);
                  }}
                  style={{
                    padding: '6px 14px',
                    fontSize: 11,
                    fontWeight: 800,
                    border: '1.5px solid var(--ink)',
                    background: selectedCategory === cat.id ? 'var(--yellow)' : 'transparent',
                    cursor: 'pointer',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {cat.label} ({count})
                </button>
              );
            })}
          </div>

          {/* Grid de Proyectos con el Hero Image de cada uno */}
          <div className="projects">
            {displayedProjects.map((p) => {
              return (
                <article
                  key={p.id}
                  className="project"
                  onClick={() => setActiveProject(p)}
                  title={`Ver ficha técnica de ${p.title}`}
                >
                  <div className="project-image" role="img" aria-label={p.title}>
                    <img
                      src={p.heroImage}
                      alt={p.title}
                      loading="lazy"
                    />
                    <span className="project-badge">{p.badge}</span>
                  </div>

                  <div className="project-body">
                    <span className="tag">{p.sectorLabel}</span>
                    <h3>{p.title}</h3>
                    <p>{p.shortDesc}</p>

                    {/* Métricas destacadas en estilo neo-brutalista */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, margin: '14px 0 4px' }}>
                      {p.metrics.map((m, idx) => (
                        <span key={idx} className="project-metric-pill">
                          <strong>{m.value}</strong> {m.label}
                        </span>
                      ))}
                    </div>

                    <div className="project-meta">
                      <span style={{ color: '#444' }}>{p.clientName}</span>
                      <span style={{ textDecoration: 'underline', color: 'var(--ink)' }}>
                        Ficha técnica ↗
                      </span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* 05 CÓMO TRABAJAMOS / PROCESO */}
        <section className="wrap section" id="proceso">
          <p className="eyebrow">Cómo trabajamos</p>
          <div className="section-head">
            <h2 className="display">
              De la idea a<br />
              <span className="highlight">resultados reales.</span>
            </h2>
            <p>
              Un proceso simple, claro y colaborativo. Vas a saber qué estamos haciendo y cuál es el próximo paso.
            </p>
          </div>

          <div className="process">
            <article className="step">
              <div className="step-top">
                <span className="number">01</span>
                <span className="step-icon">⌕</span>
              </div>
              <h3>Diagnóstico</h3>
              <p>Entendemos tu negocio, tus objetivos y las oportunidades de mejora.</p>
            </article>

            <article className="step">
              <div className="step-top">
                <span className="number">02</span>
                <span className="step-icon">✎</span>
              </div>
              <h3>Diseño y estrategia</h3>
              <p>Definimos prioridades, proponemos la solución técnica y acordamos un plan por etapas.</p>
            </article>

            <article className="step">
              <div className="step-top">
                <span className="number">03</span>
                <span className="step-icon">⌘</span>
              </div>
              <h3>Desarrollo y QA</h3>
              <p>Construimos, integramos y testeamos con entregas continuas que podés revisar.</p>
            </article>

            <article className="step">
              <div className="step-top">
                <span className="number">04</span>
                <span className="step-icon">↗</span>
              </div>
              <h3>Lanzamiento</h3>
              <p>Capacitamos a tu equipo, realizamos el deploy y acompañamos los siguientes pasos.</p>
            </article>
          </div>

          {/* BENEFICIOS */}
          <div className="benefits">
            <div className="benefit">
              <b>✳ Soluciones a medida</b>
              <p>La tecnología se adapta a tu operación y a tus prioridades, no al revés.</p>
            </div>
            <div className="benefit">
              <b>↗ Acompañamiento continuo</b>
              <p>Seguimiento, métricas de rendimiento y propuestas de evolución permanente.</p>
            </div>
            <div className="benefit">
              <b>✓ Calidad desde el inicio</b>
              <p>Validaciones técnicas y funcionales durante cada iteración del desarrollo.</p>
            </div>
            <div className="benefit">
              <b>↔ Comunicación clara</b>
              <p>Alcance, avances y próximos pasos sin rodeos ni tecnicismos innecesarios.</p>
            </div>
          </div>
        </section>

        {/* 06 POR QUÉ IATOMICA / ABOUT */}
        <section className="wrap section about" id="nosotros">
          <div>
            <p className="eyebrow">Por qué IAtomica</p>
            <h2 className="display">
              Tecnología para<br />
              <span className="highlight">ideas que avanzan.</span>
            </h2>
          </div>
          <div className="about-copy">
            <p>
              Acompañamos a empresas que necesitan ordenar sus procesos, renovar su presencia digital e incorporar nuevas herramientas de software e inteligencia artificial.
            </p>
            <p>
              Integramos consultoría, diseño y ejecución. Desde el relevamiento inicial hasta las capacitaciones, la gestión de integraciones de terceros y los reportes de seguimiento.
            </p>
            <a className="btn" href="#contacto">
              Contanos tu idea <span className="arrow">→</span>
            </a>
          </div>
        </section>

        {/* 07 PREGUNTAS FRECUENTES */}
        <section className="wrap section" id="faq">
          <p className="eyebrow">Antes de empezar</p>
          <h2 className="display">Preguntas frecuentes</h2>
          <div className="faq-grid" style={{ marginTop: 28 }}>
            <details>
              <summary>¿Con qué tipo de empresas trabajan?</summary>
              <p>
                Con negocios y equipos que buscan mejorar su operación con tecnología. En la primera conversación revisamos tu actividad y necesidades para evaluar cómo podemos acompañarte.
              </p>
            </details>

            <details>
              <summary>¿Cuánto dura un proyecto?</summary>
              <p>
                Depende del alcance, las integraciones y las prioridades. Después del relevamiento inicial proponemos etapas, entregables y plazos acordados.
              </p>
            </details>

            <details>
              <summary>¿Ofrecen soporte después del lanzamiento?</summary>
              <p>
                Sí. Podemos incluir mantenimiento, pruebas y mejoras dentro de un plan de acompañamiento mensual. Su alcance se define claramente en la propuesta.
              </p>
            </details>

            <details>
              <summary>¿Necesito tener conocimientos técnicos?</summary>
              <p>
                No. Te explicamos las opciones de forma clara e incluimos documentación, manuales y capacitaciones según las herramientas que implementemos.
              </p>
            </details>

            <details>
              <summary>¿Pueden conectar los sistemas que ya utilizamos?</summary>
              <p>
                Analizamos tus herramientas actuales y la disponibilidad de sus APIs o mecanismos de integración. Te mostramos las posibilidades y los requisitos antes de avanzar.
              </p>
            </details>

            <details>
              <summary>¿Qué incluye la asesoría gratuita?</summary>
              <p>
                Una primera conversación para conocer tu necesidad, detectar oportunidades y evaluar próximos pasos. El desarrollo o la implementación se cotizan luego según el alcance acordado.
              </p>
            </details>
          </div>
        </section>

        {/* 08 CONTACTO / HABLEMOS DE TU PRÓXIMO PROYECTO */}
        <div className="wrap">
          <section className="contact" id="contacto">
            <div>
              <p className="eyebrow">Tu próximo paso</p>
              <h2 className="display">
                Hablemos de<br />
                tu próximo<br />
                proyecto.
              </h2>
              <p>
                Contanos tu idea. Pensemos juntos cómo convertirla en una solución real, escalable y rentable.
              </p>
              <div style={{ marginTop: 24, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <a
                  className="btn"
                  href="https://wa.me/5491100000000?text=Hola%20iAtomica,%20quisiera%20consultar%20por%20un%20proyecto"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ background: '#171715', color: '#fff' }}
                >
                  WhatsApp directo <span className="arrow">↗</span>
                </a>
              </div>
            </div>

            <form className="contact-form" onSubmit={handleSubmitContact}>
              <label>
                Tu nombre
                <input
                  name="nombre"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  autoComplete="name"
                  required
                  placeholder="¿Cómo te llamás?"
                />
              </label>

              <label>
                Correo electrónico
                <input
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                  placeholder="vos@tuempresa.com"
                />
              </label>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <label>
                  Empresa / Negocio (opcional)
                  <input
                    name="empresa"
                    value={empresa}
                    onChange={(e) => setEmpresa(e.target.value)}
                    placeholder="Tu empresa o marca"
                  />
                </label>
                <label>
                  Teléfono (opcional)
                  <input
                    name="telefono"
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                    placeholder="+54 9 11 ..."
                  />
                </label>
              </div>

              <label>
                Tu idea o desafío
                <textarea
                  name="idea"
                  value={idea}
                  onChange={(e) => setIdea(e.target.value)}
                  required
                  placeholder="¿Qué te gustaría mejorar o automatizar en tu negocio?"
                />
              </label>

              <button className="btn" type="submit" disabled={formSubmitting}>
                {formSubmitting ? 'Enviando consulta...' : (
                  <>
                    Preparar y enviar consulta <span className="arrow">→</span>
                  </>
                )}
              </button>

              {formFeedback && (
                <div
                  style={{
                    background: '#171715',
                    color: '#ffe526',
                    padding: '8px 12px',
                    fontSize: 12,
                    fontWeight: 800,
                    borderRadius: 2
                  }}
                >
                  {formFeedback}
                </div>
              )}

              {preparedText && (
                <textarea
                  readOnly
                  value={preparedText}
                  style={{
                    fontSize: 11,
                    height: 70,
                    background: '#fff',
                    marginTop: 8
                  }}
                  aria-label="Consulta preparada para copiar"
                />
              )}

              <p className="form-note" aria-live="polite">
                Tu consulta se registra directamente en el sistema de IAtomica y se copia al portapapeles.
              </p>
            </form>
          </section>
        </div>
      </main>

      {/* 09 FOOTER */}
      <footer className="footer">
        <div className="wrap">
          <div className="footer-top">
            <a href="#inicio" className="brand" style={{ color: 'var(--paper)' }}>
              <svg className="atom"><use href="#atom" /></svg>
              iAtomica
            </a>
            <div className="footer-links">
              <a href="#servicios">Servicios</a>
              <a href="#proyectos">Proyectos</a>
              <a href="#proceso">Cómo trabajamos</a>
              <a href="#contacto">Contacto</a>
              {onOpenPrueba && (
                <button
                  onClick={onOpenPrueba}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#ffe526',
                    cursor: 'pointer',
                    fontSize: 12,
                    fontWeight: 700,
                    padding: 0
                  }}
                  title="Explorar el diseño anterior"
                >
                  Versión anterior (/prueba)
                </button>
              )}
              {onOpenAdmin && (
                <button
                  onClick={onOpenAdmin}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#888',
                    cursor: 'pointer',
                    fontSize: 12,
                    fontWeight: 700,
                    padding: 0
                  }}
                >
                  Portal Admin
                </button>
              )}
            </div>
          </div>

          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} IAtomica · Ideas que avanzan.</span>
            <span>CONSULTORÍA · DISEÑO · TECNOLOGÍA</span>
          </div>
        </div>
      </footer>

      {/* MODAL DETALLE DE PROYECTO (FUNCIONALIDAD DEL SISTEMA) */}
      <PortfolioModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
        darkMode={darkMode}
      />
    </div>
  );
};
