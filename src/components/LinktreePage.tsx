import React, { useState } from 'react';
import {
  Globe,
  ExternalLink,
  Copy,
  Check,
  Share2,
  ArrowLeft,
  Sun,
  Moon,
  Sparkles,
  Calendar,
  Mail,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';

interface LinktreePageProps {
  onReturnToSite: () => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

export interface LinktreeItem {
  id: string;
  title: string;
  subtitle?: string;
  url?: string;
  onClick?: () => void;
  icon: React.ReactNode;
  badge?: string;
  highlight?: boolean;
  isExternal?: boolean;
  copyValue?: string;
}

// YouTube icon SVG
const YouTubeIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

// WhatsApp icon SVG
const WhatsAppIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M12.031 2C6.516 2 2.029 6.486 2.029 12c0 1.954.563 3.778 1.536 5.32L2 22l4.825-1.52A9.92 9.92 0 0 0 12.031 22C17.546 22 22.03 17.514 22.03 12S17.546 2 12.031 2zm0 18.232c-1.688 0-3.267-.47-4.622-1.284l-.331-.197-2.868.903.924-2.793-.217-.344a8.17 8.17 0 0 1-1.258-4.517c0-4.542 3.697-8.232 8.372-8.232 4.674 0 8.372 3.69 8.372 8.232 0 4.542-3.698 8.232-8.372 8.232zm4.588-6.177c-.251-.126-1.488-.734-1.719-.818-.231-.084-.399-.126-.566.126-.168.251-.649.818-.796.985-.147.168-.293.189-.544.063-.251-.126-1.06-.391-2.02-1.246-.747-.666-1.252-1.488-1.399-1.74-.147-.251-.016-.387.11-.512.113-.113.251-.293.377-.44.126-.147.168-.251.251-.419.084-.168.042-.314-.021-.44-.063-.126-.566-1.362-.776-1.865-.204-.49-.412-.423-.566-.431l-.482-.008c-.168 0-.44.063-.67.314-.231.251-.88 0.86-0.88 2.097 0 1.237.901 2.432 1.027 2.6.126.168 1.772 2.706 4.293 3.794.6.259 1.069.414 1.435.53.603.192 1.152.165 1.586.101.484-.072 1.488-.608 1.698-1.195.21-.587.21-1.09.147-1.195-.063-.105-.231-.168-.482-.294z" />
  </svg>
);

export const LinktreePage: React.FC<LinktreePageProps> = ({
  onReturnToSite,
  darkMode,
  onToggleDarkMode,
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // WhatsApp configuration
  const whatsappNumber = '+5491170142641';
  const whatsappDisplayNumber = '+54 9 11 7014-2641';
  const whatsappUrl = `https://wa.me/5491170142641?text=${encodeURIComponent(
    'Hola iAtomica, me gustaría consultar por sus servicios y soluciones.'
  )}`;

  // Show a momentary toast notification
  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  // Copy to clipboard helper
  const handleCopy = (text: string, id: string, message: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    showToast(message);
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  // Share profile
  const handleShare = async () => {
    const shareData = {
      title: 'iAtomica | Tech Studio & IA',
      text: 'Conecta con iAtomica: Soluciones digitales, software a medida e Inteligencia Artificial.',
      url: window.location.href,
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // Ignored if cancelled
      }
    } else {
      handleCopy(window.location.href, 'share', '¡Enlace copiado al portapapeles!');
    }
  };

  /**
   * Configurable array of links.
   * To add more links in the future, simply push a new object into this list.
   */
  const links: LinktreeItem[] = [
    {
      id: 'whatsapp',
      title: 'Contactar por WhatsApp',
      subtitle: `${whatsappDisplayNumber} • Respuesta directa inmediata`,
      url: whatsappUrl,
      icon: <WhatsAppIcon className="w-6 h-6 text-white" />,
      badge: 'Prioritario',
      highlight: true,
      isExternal: true,
      copyValue: whatsappNumber,
    },
    {
      id: 'website',
      title: 'Sitio Web Oficial',
      subtitle: 'iatomica.com • Servicios, Ecosistema & Soluciones',
      onClick: onReturnToSite,
      icon: <Globe className="w-5 h-5 text-orange-500" />,
      badge: 'Home',
      highlight: false,
      isExternal: false,
    },
    {
      id: 'services-video',
      title: 'Video Explicativo de Servicios',
      subtitle: 'Conoce en 2 minutos cómo transformamos tu negocio',
      url: 'https://youtu.be/Va4-8lEYB3s',
      icon: <YouTubeIcon className="w-5 h-5 text-red-500" />,
      badge: 'Video',
      highlight: false,
      isExternal: true,
    },
    {
      id: 'consulting',
      title: 'Agendar Consulta Estratégica',
      subtitle: 'Evaluación técnica y diagnóstico para tu empresa',
      onClick: () => {
        onReturnToSite();
        setTimeout(() => {
          const el = document.getElementById('contacto');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      },
      icon: <Calendar className="w-5 h-5 text-purple-500" />,
      badge: 'Sin Cargo',
      highlight: false,
      isExternal: false,
    },
  ];

  return (
    <div
      className={`min-h-screen relative flex flex-col items-center justify-between px-4 py-8 sm:py-12 transition-colors selection:bg-orange-500 selection:text-white ${
        darkMode ? 'dark bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
      }`}
    >
      {/* Background Ambient Lighting Glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div
          className={`absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full blur-[140px] opacity-25 ${
            darkMode ? 'bg-orange-600/30' : 'bg-orange-400/20'
          }`}
        />
        <div
          className={`absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full blur-[160px] opacity-20 ${
            darkMode ? 'bg-purple-600/30' : 'bg-purple-400/20'
          }`}
        />
      </div>

      {/* Top Floating Control Bar */}
      <header className="relative z-10 w-full max-w-lg flex items-center justify-between mb-6">
        <button
          onClick={onReturnToSite}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all backdrop-blur-md border cursor-pointer ${
            darkMode
              ? 'bg-slate-900/80 text-slate-300 border-slate-800 hover:bg-slate-800 hover:text-white'
              : 'bg-white/80 text-slate-600 border-slate-200 hover:bg-white hover:text-slate-900 shadow-xs'
          }`}
        >
          <ArrowLeft size={14} />
          <span>Volver al sitio</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShare}
            title="Compartir enlace"
            aria-label="Compartir perfil"
            className={`p-2 rounded-full transition-all backdrop-blur-md border cursor-pointer ${
              darkMode
                ? 'bg-slate-900/80 text-slate-300 border-slate-800 hover:bg-slate-800 hover:text-white'
                : 'bg-white/80 text-slate-600 border-slate-200 hover:bg-white hover:text-slate-900 shadow-xs'
            }`}
          >
            <Share2 size={15} />
          </button>

          <button
            onClick={onToggleDarkMode}
            title={darkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
            aria-label="Alternar tema"
            className={`p-2 rounded-full transition-all backdrop-blur-md border cursor-pointer ${
              darkMode
                ? 'bg-slate-900/80 text-amber-400 border-slate-800 hover:bg-slate-800'
                : 'bg-white/80 text-slate-600 border-slate-200 hover:bg-white hover:text-slate-900 shadow-xs'
            }`}
          >
            {darkMode ? <Sun size={15} /> : <Moon size={15} />}
          </button>
        </div>
      </header>

      {/* Central Profile Card */}
      <main className="relative z-10 w-full max-w-lg flex flex-col items-center">
        
        {/* Avatar Container with the Last Frame of Home Scroll Animation (frame_180.webp) */}
        <div className="relative mb-5 group">
          {/* Subtle Outer Glowing Ring */}
          <div className="absolute -inset-1.5 rounded-full bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 opacity-60 blur-md group-hover:opacity-90 transition-opacity duration-500" />
          
          <div
            className={`relative w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border-2 p-1 backdrop-blur-xl ${
              darkMode ? 'bg-slate-900/90 border-slate-700/80' : 'bg-white/90 border-slate-200 shadow-lg'
            }`}
          >
            {/* The 3D Atomic Orb (Last Frame of Scroll Animation) */}
            <picture>
              <source srcSet="/media/frames/mobile/frame_180.webp" media="(max-width: 640px)" />
              <img
                src="/media/frames/desktop/frame_180.webp"
                alt="iAtomica - Soluciones Digitales & IA"
                className="w-full h-full object-cover rounded-full select-none transform transition-transform duration-700 group-hover:scale-105"
                loading="eager"
              />
            </picture>
          </div>

          {/* Active status indicator badge */}
          <div
            className="absolute bottom-1 right-1 w-6 h-6 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-950 flex items-center justify-center shadow-md"
            title="Disponible"
          >
            <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
          </div>
        </div>

        {/* Brand Name & Verified Tag */}
        <div className="flex items-center gap-1.5 mb-1.5">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-heading">
            iAtomica
          </h1>
          <span
            className="inline-flex items-center text-orange-500"
            title="Cuenta Oficial Verificada"
          >
            <ShieldCheck size={20} className="fill-orange-500/20" />
          </span>
        </div>

        {/* Bio / Value Proposition */}
        <p
          className={`text-center text-sm sm:text-base font-medium max-w-sm mb-3 ${
            darkMode ? 'text-slate-300' : 'text-slate-600'
          }`}
        >
          Soluciones Digitales, Software a Medida &amp; Arquitectura de IA
        </p>

        {/* Availability Badge */}
        <div
          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium mb-8 border backdrop-blur-sm ${
            darkMode
              ? 'bg-slate-900/60 text-slate-300 border-slate-800'
              : 'bg-white/80 text-slate-700 border-slate-200/80 shadow-xs'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>Proyectos &amp; Consultoría Disponibles</span>
        </div>

        {/* Links Stack */}
        <div className="w-full space-y-3.5">
          {links.map((item) => {
            const isWhatsApp = item.id === 'whatsapp';

            return (
              <div
                key={item.id}
                className="group relative transform transition-all duration-300 hover:-translate-y-0.5"
              >
                {/* Highlight Glow Effect for primary links */}
                {item.highlight && (
                  <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 opacity-30 blur-sm group-hover:opacity-75 transition-opacity duration-300" />
                )}

                <div
                  className={`relative flex items-center justify-between p-3.5 sm:p-4 rounded-2xl border transition-all duration-200 ${
                    isWhatsApp
                      ? darkMode
                        ? 'bg-emerald-950/40 border-emerald-500/40 hover:border-emerald-400 hover:bg-emerald-900/30'
                        : 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white border-transparent hover:from-emerald-500 hover:to-teal-500 shadow-md hover:shadow-emerald-500/20'
                      : darkMode
                      ? 'bg-slate-900/85 border-slate-800 hover:border-slate-700 hover:bg-slate-800/80 shadow-sm'
                      : 'bg-white/95 border-slate-200/90 hover:border-slate-300 hover:bg-white shadow-xs hover:shadow-md'
                  }`}
                >
                  {/* Left Clickable Area (URL or Action) */}
                  {item.url ? (
                    <a
                      href={item.url}
                      target={item.isExternal ? '_blank' : '_self'}
                      rel={item.isExternal ? 'noopener noreferrer' : undefined}
                      className="flex-1 flex items-center gap-3.5 min-w-0 pr-2"
                    >
                      {/* Icon */}
                      <div
                        className={`w-11 h-11 shrink-0 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105 ${
                          isWhatsApp
                            ? darkMode
                              ? 'bg-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.4)]'
                              : 'bg-white/20 text-white'
                            : darkMode
                            ? 'bg-slate-800/90 border border-slate-700/60 text-slate-200'
                            : 'bg-slate-100 border border-slate-200/80 text-slate-700'
                        }`}
                      >
                        {item.icon}
                      </div>

                      {/* Text info */}
                      <div className="flex-1 min-w-0 text-left">
                        <div className="flex items-center gap-2">
                          <span
                            className={`font-semibold text-sm sm:text-base truncate ${
                              isWhatsApp
                                ? darkMode
                                  ? 'text-emerald-100'
                                  : 'text-white'
                                : darkMode
                                ? 'text-slate-100 group-hover:text-orange-400'
                                : 'text-slate-900 group-hover:text-orange-600'
                            }`}
                          >
                            {item.title}
                          </span>
                          {item.badge && (
                            <span
                              className={`text-[10px] uppercase font-mono font-bold px-1.5 py-0.5 rounded-md shrink-0 ${
                                isWhatsApp
                                  ? darkMode
                                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                                    : 'bg-white/20 text-white'
                                  : darkMode
                                  ? 'bg-slate-800 text-slate-300 border border-slate-700'
                                  : 'bg-slate-100 text-slate-600 border border-slate-200'
                              }`}
                            >
                              {item.badge}
                            </span>
                          )}
                        </div>
                        {item.subtitle && (
                          <p
                            className={`text-xs truncate font-medium mt-0.5 ${
                              isWhatsApp
                                ? darkMode
                                  ? 'text-emerald-200/80'
                                  : 'text-white/80'
                                : darkMode
                                ? 'text-slate-400'
                                : 'text-slate-500'
                            }`}
                          >
                            {item.subtitle}
                          </p>
                        )}
                      </div>
                    </a>
                  ) : (
                    <button
                      type="button"
                      onClick={item.onClick}
                      className="flex-1 flex items-center gap-3.5 min-w-0 pr-2 text-left cursor-pointer"
                    >
                      {/* Icon */}
                      <div
                        className={`w-11 h-11 shrink-0 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105 ${
                          darkMode
                            ? 'bg-slate-800/90 border border-slate-700/60 text-slate-200'
                            : 'bg-slate-100 border border-slate-200/80 text-slate-700'
                        }`}
                      >
                        {item.icon}
                      </div>

                      {/* Text info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span
                            className={`font-semibold text-sm sm:text-base truncate ${
                              darkMode
                                ? 'text-slate-100 group-hover:text-orange-400'
                                : 'text-slate-900 group-hover:text-orange-600'
                            }`}
                          >
                            {item.title}
                          </span>
                          {item.badge && (
                            <span
                              className={`text-[10px] uppercase font-mono font-bold px-1.5 py-0.5 rounded-md shrink-0 ${
                                darkMode
                                  ? 'bg-slate-800 text-slate-300 border border-slate-700'
                                  : 'bg-slate-100 text-slate-600 border border-slate-200'
                              }`}
                            >
                              {item.badge}
                            </span>
                          )}
                        </div>
                        {item.subtitle && (
                          <p
                            className={`text-xs truncate font-medium mt-0.5 ${
                              darkMode ? 'text-slate-400' : 'text-slate-500'
                            }`}
                          >
                            {item.subtitle}
                          </p>
                        )}
                      </div>
                    </button>
                  )}

                  {/* Right Actions: Copy button if available, or chevron */}
                  <div className="flex items-center gap-1 shrink-0 pl-1">
                    {item.copyValue && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          handleCopy(
                            item.copyValue!,
                            item.id,
                            `Número ${item.copyValue} copiado al portapapeles`
                          );
                        }}
                        title="Copiar número"
                        className={`p-2 rounded-xl transition-colors cursor-pointer ${
                          isWhatsApp
                            ? darkMode
                              ? 'text-emerald-300 hover:bg-emerald-800/40'
                              : 'text-white/90 hover:bg-white/20'
                            : darkMode
                            ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                            : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        {copiedId === item.id ? (
                          <Check size={16} className="text-white" />
                        ) : (
                          <Copy size={16} />
                        )}
                      </button>
                    )}

                    {item.isExternal ? (
                      <div
                        className={`p-1.5 opacity-60 group-hover:opacity-100 transition-opacity ${
                          isWhatsApp ? 'text-white' : ''
                        }`}
                      >
                        <ExternalLink size={16} />
                      </div>
                    ) : (
                      <div
                        className={`p-1.5 opacity-60 group-hover:opacity-100 transition-opacity group-hover:translate-x-0.5 transform duration-200 ${
                          isWhatsApp ? 'text-white' : ''
                        }`}
                      >
                        <ChevronRight size={18} />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Contact & Info Card */}
        <div
          className={`w-full mt-8 p-4 rounded-2xl border text-center transition-colors ${
            darkMode
              ? 'bg-slate-900/40 border-slate-800/80 text-slate-400'
              : 'bg-white/60 border-slate-200/70 text-slate-500 shadow-2xs'
          }`}
        >
          <div className="flex items-center justify-center gap-1.5 text-xs font-mono font-medium mb-1">
            <Sparkles size={13} className="text-orange-500" />
            <span>Tech Studio • Automatización &amp; Software</span>
          </div>
          <p className="text-xs max-w-xs mx-auto leading-relaxed">
            Impulsamos la transformación de empresas con tecnología a medida, agentes inteligentes e integraciones de alta velocidad.
          </p>

          <div className="flex items-center justify-center gap-4 mt-4 pt-3 border-t border-slate-200/50 dark:border-slate-800/50">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs hover:text-emerald-500 transition-colors flex items-center gap-1 font-medium"
            >
              <WhatsAppIcon className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <a
              href="mailto:tech.iatomica@gmail.com"
              className="text-xs hover:text-orange-500 transition-colors flex items-center gap-1 font-medium"
            >
              <Mail size={13} />
              <span>Email</span>
            </a>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <a
              href="https://youtu.be/Va4-8lEYB3s"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs hover:text-red-500 transition-colors flex items-center gap-1 font-medium"
            >
              <YouTubeIcon className="w-3.5 h-3.5" />
              <span>YouTube</span>
            </a>
          </div>
        </div>

      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full max-w-lg mt-8 text-center text-xs font-mono text-slate-400 dark:text-slate-600">
        <p>&copy; {new Date().getFullYear()} iAtomica. Todos los derechos reservados.</p>
        <p className="mt-1 text-[11px] opacity-75">
          Infraestructura de alto rendimiento &bull; iAtomica Studio
        </p>
      </footer>

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-medium shadow-2xl border border-slate-700/80 flex items-center gap-2 animate-fade-in">
          <Check size={14} className="text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};
