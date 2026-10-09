import React, { useState } from 'react';
import { ArrowRight, Menu, X } from 'lucide-react';

interface TastemakerNavbarProps {
  onOpenBooking: () => void;
}

export const AtomicMark: React.FC<{ className?: string; color?: string }> = ({
  className = "w-8 h-8",
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

export const TastemakerNavbar: React.FC<TastemakerNavbarProps> = ({ onOpenBooking }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const links = [
    { label: 'Servicios', href: '#servicios' },
    { label: 'Proyectos', href: '#proyectos' },
    { label: 'Cómo trabajamos', href: '#proceso' },
    { label: 'Nosotros', href: '#beneficios' },
    { label: 'Recursos', href: '#faq' },
    { label: 'Contacto', href: '#contacto' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-[#F6F1E6]/95 backdrop-blur-md border-b border-[#131313]/10">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 h-[72px] flex items-center justify-between">
        
        {/* Brand: Logo ⚛ iAtomica */}
        <a href="#" className="flex items-center space-x-2.5 group">
          <AtomicMark className="w-8 h-8 text-[#131313] group-hover:scale-105 transition-transform" />
          <span className="font-sans font-black text-2xl tracking-tight text-[#131313]">
            iAtomica
          </span>
        </a>

        {/* Center Nav Links */}
        <nav className="hidden lg:flex items-center space-x-7 font-sans text-xs font-semibold text-[#131313]/80">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:text-[#131313] transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA Button: Yellow pill "Asesoría gratuita ➔" */}
        <div className="hidden sm:flex items-center">
          <button
            onClick={onOpenBooking}
            className="flex items-center space-x-2 px-5 py-2.5 bg-[#FFE000] text-[#131313] font-sans font-bold text-xs uppercase tracking-wide rounded-full border border-[#131313]/30 shadow-sm hover:bg-[#edd000] transition-colors cursor-pointer"
          >
            <span>Asesoría gratuita</span>
            <ArrowRight size={14} />
          </button>
        </div>

        {/* Mobile Hamburger */}
        <div className="flex items-center sm:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-10 h-10 flex items-center justify-center text-[#131313] border border-[#131313]/20 rounded-md bg-white"
            aria-label="Abrir menú"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-[#F6F1E6] border-b border-[#131313]/20 px-6 py-5 space-y-4">
          <div className="flex flex-col space-y-3 font-sans text-sm font-bold text-[#131313]">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 border-b border-[#131313]/10"
              >
                {link.label}
              </a>
            ))}
          </div>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenBooking();
            }}
            className="w-full flex items-center justify-center space-x-2 py-3 bg-[#FFE000] text-[#131313] font-sans font-bold text-xs uppercase tracking-wide rounded-full border border-[#131313]/30"
          >
            <span>Asesoría gratuita</span>
            <ArrowRight size={14} />
          </button>
        </div>
      )}
    </header>
  );
};
