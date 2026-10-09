import React from 'react';
import { 
  Compass, 
  Bot, 
  Code2, 
  ShieldCheck, 
  TrendingUp, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

interface EditorialServicesProps {
  onOpenBooking: () => void;
}

export const EditorialServices: React.FC<EditorialServicesProps> = ({
  onOpenBooking,
}) => {
  const services = [
    {
      id: 'consultoria',
      number: '01',
      title: 'Consultoría tecnológica',
      tag: 'ESTRATEGIA & ARQUITECTURA',
      tagBg: 'bg-[#FFE000]',
      tagText: 'text-[#131313]',
      description: 'Evaluamos tu infraestructura y diseñamos la hoja de ruta técnica para adoptar IA y automatización con ROI medible.',
      icon: Compass,
      image: '/images/collage/mountain_office.jpg',
    },
    {
      id: 'ia',
      number: '02',
      title: 'Herramientas de IA',
      tag: 'AGENTES & CHATBOTS',
      tagBg: 'bg-[#168CF5]',
      tagText: 'text-white',
      description: 'Bots de WhatsApp contextuales, procesamiento inteligente de documentos y flujos autónomos que operan sin interrupciones.',
      icon: Bot,
      image: '/images/collage/entrepreneur_thinking.jpg',
    },
    {
      id: 'desarrollo',
      number: '03',
      title: 'Desarrollo a medida',
      tag: 'SOFTWARE & PLATAFORMAS',
      tagBg: 'bg-[#FF3D8D]',
      tagText: 'text-white',
      description: 'Plataformas web modernas, aplicaciones SaaS y dashboards de control construidos con TypeScript, React y Python.',
      icon: Code2,
      image: '/images/portfolio/delpapa.webp',
    },
    {
      id: 'qa',
      number: '04',
      title: 'Mantenimiento y QA',
      tag: 'ESTABILIDAD & SEGURIDAD',
      tagBg: 'bg-[#32C878]',
      tagText: 'text-[#131313]',
      description: 'Monitoreo preventivo, suites de pruebas automatizadas y soporte técnico continuo para que tu negocio nunca se detenga.',
      icon: ShieldCheck,
      image: '/images/portfolio/inmobify.webp',
    },
    {
      id: 'marketing',
      number: '05',
      title: 'Contenido y Marketing',
      tag: 'CONVERSIÓN & CAPTACIÓN',
      tagBg: 'bg-[#F04B36]',
      tagText: 'text-white',
      description: 'Diseño de interfaces persuasivas, embudos de alta conversión y comunicación explicativa para captar clientes calificados.',
      icon: TrendingUp,
      image: '/images/portfolio/baccio.webp',
    },
  ];

  return (
    <section id="servicios" className="w-full py-20 sm:py-28 px-5 sm:px-10 lg:px-14 border-b border-[#131313]/15 bg-[#F6F1E6]">
      <div className="max-w-[1320px] mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <div className="inline-flex items-center space-x-2 bg-[#131313] text-[#FFE000] px-3 py-1 font-mono text-xs font-black uppercase mb-3">
              <Sparkles size={14} />
              <span>NUESTRAS CAPACIDADES</span>
            </div>
            <h2 className="font-anton text-4xl sm:text-6xl text-[#131313] tracking-tight leading-none uppercase">
              SOLUCIONES REALES <br className="hidden sm:inline" />
              <span className="bg-[#FFE000] px-2 py-0.5 inline-block border-2 border-[#131313] shadow-[2px_2px_0px_#131313] mt-1">
                PARA EMPRESAS REALES.
              </span>
            </h2>
          </div>

          <p className="font-sans text-base text-[#131313]/80 max-w-md font-medium leading-relaxed">
            Eliminamos la complejidad técnica. Creamos soluciones directas que resuelven cuellos de botella y aumentan la rentabilidad.
          </p>
        </div>

        {/* 5-Card Grid: 5 columns on 2xl / 3+2 on lg / 1 col mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {services.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.id}
                className="group bg-white border-2 border-[#131313] shadow-[4px_4px_0px_#131313] hover:shadow-[7px_7px_0px_#131313] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200 flex flex-col justify-between overflow-hidden"
              >
                {/* Top Image Banner */}
                <div className="relative h-36 w-full bg-[#EAE5D9] overflow-hidden border-b-2 border-[#131313]">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-300"
                    loading="lazy"
                  />
                  
                  {/* Service Number Tag */}
                  <div className="absolute top-2.5 left-2.5 bg-[#131313] text-white font-mono text-xs font-black px-2 py-0.5 border border-white">
                    {item.number}
                  </div>

                  {/* Icon floating stamp */}
                  <div className="absolute bottom-2.5 right-2.5 w-9 h-9 bg-white border-2 border-[#131313] flex items-center justify-center text-[#131313] shadow-[2px_2px_0px_#131313]">
                    <Icon size={18} />
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    {/* Category Pill */}
                    <span className={`inline-block font-mono text-[10px] font-black uppercase px-2 py-0.5 border border-[#131313] mb-2.5 ${item.tagBg} ${item.tagText}`}>
                      {item.tag}
                    </span>

                    <h3 className="font-anton text-2xl text-[#131313] tracking-tight leading-tight uppercase group-hover:text-[#168CF5] transition-colors">
                      {item.title}
                    </h3>

                    <p className="font-sans text-xs sm:text-sm text-[#131313]/75 leading-relaxed font-medium mt-2">
                      {item.description}
                    </p>
                  </div>

                  {/* Card Bottom Link */}
                  <div className="pt-3 border-t border-[#131313]/15 flex items-center justify-between">
                    <button
                      onClick={onOpenBooking}
                      className="font-sans text-xs font-bold text-[#131313] group-hover:text-[#168CF5] flex items-center space-x-1.5 transition-colors cursor-pointer"
                    >
                      <span>Consultar</span>
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                    <span className="font-mono text-[10px] text-[#131313]/40">
                      iAtomica // 2026
                    </span>
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
