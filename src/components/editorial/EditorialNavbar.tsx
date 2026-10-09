import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';

interface EditorialNavbarProps {
  onOpenBooking: () => void;
  onOpenAdmin?: () => void;
  onToggleView?: () => void;
}

export const AtomLogo: React.FC<{ className?: string; color?: string }> = ({
  className = "w-9 h-9",
  color = "#131313",
}) => (
  <svg
    viewBox="0 0 48 46"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-label="Isotipo iAtomica"
  >
    <path
      fill={color}
      d="M25.946 44.938c-.664.845-2.021.375-2.021-.698V33.937a2.26 2.26 0 0 0-2.262-2.262H10.287c-.92 0-1.456-1.04-.92-1.788l7.48-10.471c1.07-1.497 0-3.578-1.842-3.578H1.237c-.92 0-1.456-1.04-.92-1.788L10.013.474c.214-.297.556-.474.92-.474h28.894c.92 0 1.456 1.04.92 1.788l-7.48 10.471c-1.07 1.498 0 3.579 1.842 3.579h11.377c.943 0 1.473 1.088.89 1.83L25.947 44.94z"
    />
  </svg>
);

export const EditorialNavbar: React.FC<EditorialNavbarProps> = ({
  onOpenBooking,
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Trap Escape key for accessibility
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileOpen) {
        setMobileOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileOpen]);

  const navLinks = [
    { label: 'Servicios', href: '#servicios' },
    { label: 'Proyectos', href: '#proyectos' },
    { label: 'Cómo trabajamos', href: '#proceso' },
    { label: 'Por qué iAtomica', href: '#por-que' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Contacto', href: '#contacto' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 border-b border-[#131313]/15 select-none ${
        scrolled
          ? 'h-[68px] sm:h-[72px] bg-[#F6F1E6]/95 backdrop-blur-md shadow-sm'
          : 'h-[76px] sm:h-[84px] bg-[#F6F1E6]/90 backdrop-blur-md'
      }`}
    >
      <div className="max-w-[1320px] mx-auto h-full px-5 sm:px-10 lg:px-14 flex items-center justify-between">
        
        {/* Brand: Isotipo atómico original + Wordmark */}
        <a
          href="#"
          className="flex items-center space-x-2.5 group cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#FFE000]"
        >
          <AtomLogo className="w-8 h-8 sm:w-9 sm:h-9 text-[#131313] transition-transform duration-200 group-hover:scale-105" />
          <div className="flex items-baseline space-x-1.5">
            <span className="font-sans font-black text-2xl tracking-tight text-[#131313]">
              iAtomica
            </span>
            <span className="hidden sm:inline-block font-mono text-[10px] uppercase font-bold tracking-widest text-[#131313]/60 bg-[#131313]/5 px-1.5 py-0.5 rounded border border-[#131313]/10">
              EDITORIAL
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav
          className="hidden md:flex items-center space-x-7 lg:space-x-9 font-sans text-sm font-semibold text-[#131313]/85"
          aria-label="Navegación principal"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-[#131313] hover:underline decoration-2 underline-offset-8 decoration-[#FFE000] transition-colors focus:outline-none focus:ring-2 focus:ring-[#FFE000] rounded-sm px-1 py-0.5"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop CTA Button */}
        <div className="hidden md:flex items-center space-x-4">
          <button
            onClick={onOpenBooking}
            className="flex items-center space-x-2 px-5 py-2.5 bg-[#FFE000] text-[#131313] font-sans font-bold text-sm tracking-wide border-2 border-[#131313] shadow-[3px_3px_0px_#131313] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[5px_5px_0px_#131313] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_#131313] transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#168CF5]"
          >
            <span>Solicitar asesoría</span>
            <ArrowRight size={16} />
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center md:hidden">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="w-11 h-11 flex items-center justify-center bg-white border-2 border-[#131313] shadow-[2px_2px_0px_#131313] text-[#131313] cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#FFE000]"
            aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 top-[68px] z-40 bg-[#131313]/60 backdrop-blur-sm md:hidden"
          onClick={() => setMobileOpen(false)}
        >
          <div
            className="w-full bg-[#F6F1E6] border-b-4 border-[#131313] p-6 space-y-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Menú de navegación móvil"
          >
            <div className="flex flex-col space-y-3 font-sans text-lg font-bold text-[#131313]">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="py-2 px-3 border-b border-[#131313]/10 hover:bg-[#FFE000] transition-colors rounded-none"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="pt-2">
              <button
                onClick={() => {
                  setMobileOpen(false);
                  onOpenBooking();
                }}
                className="w-full flex items-center justify-center space-x-2 py-3.5 bg-[#FFE000] text-[#131313] font-sans font-bold text-base border-2 border-[#131313] shadow-[4px_4px_0px_#131313] active:translate-x-[2px] active:translate-y-[2px]"
              >
                <span>Solicitar asesoría</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
