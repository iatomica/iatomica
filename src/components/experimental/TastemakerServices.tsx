import React from 'react';
import { Lightbulb, Bot, Code2, Cpu, ShieldCheck, Megaphone, ArrowRight } from 'lucide-react';

interface TastemakerServicesProps {
  onOpenBooking: () => void;
}

export const TastemakerServices: React.FC<TastemakerServicesProps> = ({ onOpenBooking }) => {
  const services = [
    {
      id: 'consultoria',
      title: 'Consultoría tecnológica',
      icon: Lightbulb,
      image: '/images/collage/mountain_office.jpg',
      tagColor: 'bg-[#FFE000]',
      desc: 'Estrategia y asesoramiento para que la tecnología se convierta en una ventaja real.',
    },
    {
      id: 'ia',
      title: 'Herramientas de IA',
      icon: Bot,
      image: '/images/collage/entrepreneur_thinking.jpg',
      tagColor: 'bg-[#168CF5]',
      desc: 'Automatizaciones, agentes de IA y soluciones que ahorran tiempo y multiplican resultados.',
    },
    {
      id: 'desarrollo',
      title: '</> Desarrollo a medida',
      icon: Code2,
      image: '/images/portfolio/delpapa.webp',
      tagColor: 'bg-[#FF3D8D]',
      desc: 'Desarrollo de sistemas web y aplicaciones adaptadas a tus procesos.',
    },
    {
      id: 'automatizaciones',
      title: 'Automatizaciones e integraciones',
      icon: Cpu,
      image: '/images/portfolio/nos-arq.webp',
      tagColor: 'bg-[#32C878]',
      desc: 'Conectamos tus herramientas y automatizamos flujos de trabajo.',
    },
    {
      id: 'qa',
      title: 'Mantenimiento y QA',
      icon: ShieldCheck,
      image: '/images/portfolio/inmobify.webp',
      tagColor: 'bg-[#131313]',
      desc: 'Soporte, evolución y testing para que todo funcione siempre.',
    },
    {
      id: 'marketing',
      title: 'Contenido y marketing',
      icon: Megaphone,
      image: '/images/portfolio/baccio.webp',
      tagColor: 'bg-[#F04B36]',
      desc: 'Diseño, contenido y estrategia digital para potenciar tu presencia y ventas.',
    },
  ];

  return (
    <section id="servicios" className="w-full py-16 sm:py-24 px-4 sm:px-6 bg-[#F6F1E6] border-b border-[#131313]/10">
      <div className="max-w-[1240px] mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#131313]/60 block mb-1.5">
              NUESTROS SERVICIOS
            </span>
            <h2 className="font-anton text-4xl sm:text-5xl text-[#131313] uppercase tracking-tight leading-none">
              SOLUCIONES REALES <br />
              <span className="bg-[#FFE000] px-2 py-0.5 inline-block border border-[#131313]/20 mt-1">
                PARA EMPRESAS REALES.
              </span>
            </h2>
          </div>

          <div className="flex flex-col items-start md:items-end space-y-1">
            <p className="font-sans text-sm text-[#131313]/75 max-w-sm font-medium">
              Acompañamos a empresas de diferentes industrias a impulsar su crecimiento con tecnología.
            </p>
            <span className="font-caveat text-base text-[#168CF5] font-bold">
              ✎ TECNOLOGÍA QUE IMPACTA • PERSONAS QUE TRANSFORMAN
            </span>
          </div>
        </div>

        {/* 6-Card Services Grid (matches the 6 cards in reference image) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 sm:gap-5">
          {services.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.id}
                onClick={onOpenBooking}
                className="group bg-white border-2 border-[#131313] shadow-[3px_3px_0px_#131313] hover:shadow-[5px_5px_0px_#131313] hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between overflow-hidden cursor-pointer rounded-lg"
              >
                {/* Image Banner */}
                <div className="relative h-28 w-full bg-[#EAE5D9] overflow-hidden border-b-2 border-[#131313]">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-300"
                  />
                  {/* Category color tag indicator */}
                  <div className={`absolute top-2 left-2 w-3 h-3 rounded-full border border-[#131313] ${item.tagColor}`}></div>
                </div>

                {/* Body */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-center space-x-1.5 text-[#131313] mb-1.5">
                      <Icon size={16} />
                      <h3 className="font-anton text-lg text-[#131313] uppercase leading-tight group-hover:text-[#168CF5] transition-colors">
                        {item.title}
                      </h3>
                    </div>

                    <p className="font-sans text-xs text-[#131313]/70 leading-relaxed font-medium">
                      {item.desc}
                    </p>
                  </div>

                  {/* Circular arrow button in bottom right */}
                  <div className="flex items-center justify-end pt-2 border-t border-[#131313]/10">
                    <div className="w-7 h-7 rounded-full bg-[#131313] text-white flex items-center justify-center group-hover:bg-[#FFE000] group-hover:text-[#131313] transition-colors">
                      <ArrowRight size={13} />
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
