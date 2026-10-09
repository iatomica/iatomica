import React from 'react';
import { Star, Quote } from 'lucide-react';

export const TastemakerTestimonials: React.FC = () => {
  const testimonials = [
    {
      name: 'María González',
      role: 'CEO, Grupo Visión',
      quote: 'iAtomica transformó nuestra operación. Automatizamos procesos y ahora podemos enfocarnos en crecer.',
      avatar: '/images/collage/vox_hero_person.jpg',
    },
    {
      name: 'Juan Pérez',
      role: 'CTO, Lexios',
      quote: 'Su enfoque estratégico y técnico marcó la diferencia. Un equipo confiable y comprometido.',
      avatar: '/images/collage/entrepreneur_thinking.jpg',
    },
    {
      name: 'Carla Torres',
      role: 'Directora, RentalTrip',
      quote: 'Profesionales, cercanos y con soluciones realmente útiles. Totalmente recomendados.',
      avatar: '/images/collage/hero_woman_laptop.jpg',
    },
  ];

  return (
    <section className="w-full py-16 sm:py-24 px-4 sm:px-6 bg-[#F6F1E6] border-b border-[#131313]/10">
      <div className="max-w-[1240px] mx-auto">
        
        {/* Header */}
        <div className="mb-12">
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#131313]/60 block mb-1">
            TESTIMONIOS
          </span>
          <h2 className="font-anton text-4xl sm:text-5xl text-[#131313] uppercase tracking-tight leading-none">
            LO QUE DICEN <br className="sm:hidden" />
            <span className="bg-[#FFE000] px-2 py-0.5 inline-block border border-[#131313]/20 mt-1">
              NUESTROS CLIENTES
            </span>
          </h2>
        </div>

        {/* 3 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-white border-2 border-[#131313] shadow-[3px_3px_0px_#131313] p-6 rounded-lg flex flex-col justify-between hover:shadow-[5px_5px_0px_#131313] hover:-translate-y-0.5 transition-all"
            >
              <div>
                <Quote size={24} className="text-[#131313]/20 mb-3" />
                <p className="font-sans text-sm text-[#131313]/85 leading-relaxed font-medium italic mb-6">
                  "{t.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-[#131313]/10 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-10 h-10 rounded-full object-cover border border-[#131313]"
                  />
                  <div>
                    <h4 className="font-sans font-bold text-sm text-[#131313] leading-tight">
                      {t.name}
                    </h4>
                    <span className="font-mono text-[11px] text-[#131313]/60">
                      {t.role}
                    </span>
                  </div>
                </div>

                {/* 5 Stars */}
                <div className="flex text-[#FFE000]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className="fill-[#FFE000] text-[#131313]" />
                  ))}
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
