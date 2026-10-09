import React from 'react';
import { AtomicMark } from './TastemakerNavbar';
import { Menu, ArrowRight, X, Lightbulb, Bot, Code2 } from 'lucide-react';

export const TastemakerMobileBoard: React.FC = () => {
  return (
    <div className="w-full py-12 px-4 sm:px-6 bg-[#E8E2D5] border-b border-[#131313]/10">
      <div className="max-w-[1360px] mx-auto">
        
        {/* Presentation Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 pb-6 border-b-2 border-[#131313]">
          <div>
            <div className="flex items-center space-x-2">
              <AtomicMark className="w-9 h-9 text-[#131313]" />
              <span className="font-sans font-black text-3xl tracking-tight text-[#131313]">
                iAtomica
              </span>
            </div>
            <h3 className="font-anton text-2xl sm:text-3xl text-[#131313] uppercase tracking-wide mt-1">
              PROPUESTA DE REDISEÑO WEB // VERSIÓN MOBILE (6 ESTADOS)
            </h3>
          </div>

          <div className="mt-4 md:mt-0 font-caveat text-xl font-bold text-[#F04B36]">
            ✎ MISMA EXPERIENCIA, MÁS POSIBILIDADES EN TODOS LOS DISPOSITIVOS ➔
          </div>
        </div>

        {/* 6 Mobile Devices Grid (2 rows of 3) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          
          {/* MOCKUP 01: HERO PRINCIPAL */}
          <div className="flex flex-col items-center">
            {/* Phone Chassis */}
            <div className="w-[300px] h-[610px] bg-[#131313] rounded-[44px] p-3 shadow-2xl border-4 border-neutral-800 relative flex flex-col overflow-hidden">
              {/* Dynamic Island / Notch */}
              <div className="w-24 h-4 bg-black rounded-full mx-auto mb-1.5 shrink-0 z-30"></div>
              
              {/* Screen Content */}
              <div className="w-full flex-1 bg-[#F6F1E6] rounded-[32px] overflow-y-auto overflow-x-hidden p-4 relative flex flex-col justify-between select-none">
                {/* Header */}
                <div className="flex items-center justify-between pb-3 border-b border-[#131313]/10">
                  <div className="flex items-center space-x-1.5">
                    <AtomicMark className="w-6 h-6 text-[#131313]" />
                    <span className="font-sans font-black text-lg text-[#131313]">iAtomica</span>
                  </div>
                  <Menu size={18} className="text-[#131313]" />
                </div>

                {/* Hero Body */}
                <div className="space-y-3 pt-3">
                  <span className="font-mono text-[9px] font-bold uppercase text-[#131313]/60">
                    IDEAS • TECNOLOGÍA • RESULTADOS
                  </span>

                  <h1 className="font-anton text-3xl leading-[0.92] text-[#131313] uppercase">
                    QUE LA IA <br />
                    TRABAJE POR <br />
                    <span className="bg-[#131313] text-white px-2 py-0.5 inline-block mt-0.5">
                      TU NEGOCIO.
                    </span>
                  </h1>

                  <p className="font-sans text-[11px] text-[#131313]/75 leading-relaxed font-medium">
                    Consultoría, software, automatizaciones e IA para empresas que crecen de verdad.
                  </p>

                  <div className="space-y-1.5 pt-1">
                    <div className="w-full py-2 bg-[#FFE000] text-[#131313] text-center font-bold text-xs rounded-full border border-[#131313]/20 shadow-sm">
                      Solicitar asesoría ➔
                    </div>
                    <div className="w-full py-1.5 bg-white text-[#131313] text-center font-bold text-xs rounded-full border border-[#131313]/20">
                      Ver proyectos ➔
                    </div>
                  </div>
                </div>

                {/* Mobile Hero Collage */}
                <div className="relative mt-3 pt-2 flex items-center justify-center">
                  <div className="w-24 h-24 rounded-full bg-[#FFE000] absolute -top-1 -left-2 z-0"></div>
                  <img
                    src="/images/collage/hero_woman_laptop.jpg"
                    alt="Mujer con laptop"
                    className="w-40 object-contain relative z-10 drop-shadow-md rounded-lg"
                  />
                  <div className="absolute bottom-1 right-0 z-20 bg-[#FFE000] border border-[#131313] px-1.5 py-0.5 font-mono text-[8px] font-black uppercase rotate-2">
                    AUTOMATIZACIÓN = CRECIMIENTO
                  </div>
                </div>
              </div>
            </div>
            <span className="font-mono text-xs font-black uppercase tracking-widest text-[#131313] mt-3">
              MOBILE 01 — HERO PRINCIPAL
            </span>
          </div>

          {/* MOCKUP 02: SERVICIOS */}
          <div className="flex flex-col items-center">
            <div className="w-[300px] h-[610px] bg-[#131313] rounded-[44px] p-3 shadow-2xl border-4 border-neutral-800 relative flex flex-col overflow-hidden">
              <div className="w-24 h-4 bg-black rounded-full mx-auto mb-1.5 shrink-0 z-30"></div>
              
              <div className="w-full flex-1 bg-[#F6F1E6] rounded-[32px] overflow-y-auto p-4 space-y-3.5 select-none">
                <div className="flex items-center justify-between pb-2 border-b border-[#131313]/10">
                  <div className="flex items-center space-x-1.5">
                    <AtomicMark className="w-6 h-6 text-[#131313]" />
                    <span className="font-sans font-black text-lg text-[#131313]">iAtomica</span>
                  </div>
                  <Menu size={18} className="text-[#131313]" />
                </div>

                <div>
                  <span className="font-mono text-[9px] font-bold uppercase text-[#131313]/60">
                    NUESTROS SERVICIOS
                  </span>
                  <h2 className="font-anton text-2xl text-[#131313] uppercase leading-none">
                    SOLUCIONES REALES <br />
                    <span className="bg-[#FFE000] px-1.5 py-0.5 inline-block mt-0.5">
                      PARA EMPRESAS REALES.
                    </span>
                  </h2>
                </div>

                {/* Stack of Cards */}
                <div className="space-y-2.5">
                  <div className="bg-white border border-[#131313] p-3 rounded-lg shadow-sm flex items-center justify-between">
                    <div className="flex items-center space-x-2.5">
                      <div className="w-8 h-8 rounded bg-[#FFE000] flex items-center justify-center text-[#131313]">
                        <Lightbulb size={16} />
                      </div>
                      <span className="font-anton text-sm text-[#131313] uppercase">
                        Consultoría tecnológica
                      </span>
                    </div>
                    <ArrowRight size={14} className="text-[#131313]/60" />
                  </div>

                  <div className="bg-white border border-[#131313] p-3 rounded-lg shadow-sm flex items-center justify-between">
                    <div className="flex items-center space-x-2.5">
                      <div className="w-8 h-8 rounded bg-[#168CF5] flex items-center justify-center text-white">
                        <Bot size={16} />
                      </div>
                      <span className="font-anton text-sm text-[#131313] uppercase">
                        Herramientas de IA
                      </span>
                    </div>
                    <ArrowRight size={14} className="text-[#131313]/60" />
                  </div>

                  <div className="bg-white border border-[#131313] p-3 rounded-lg shadow-sm flex items-center justify-between">
                    <div className="flex items-center space-x-2.5">
                      <div className="w-8 h-8 rounded bg-[#FF3D8D] flex items-center justify-center text-white">
                        <Code2 size={16} />
                      </div>
                      <span className="font-anton text-sm text-[#131313] uppercase">
                        Desarrollo a medida
                      </span>
                    </div>
                    <ArrowRight size={14} className="text-[#131313]/60" />
                  </div>
                </div>
              </div>
            </div>
            <span className="font-mono text-xs font-black uppercase tracking-widest text-[#131313] mt-3">
              MOBILE 02 — SERVICIOS
            </span>
          </div>

          {/* MOCKUP 03: PROYECTOS */}
          <div className="flex flex-col items-center">
            <div className="w-[300px] h-[610px] bg-[#131313] rounded-[44px] p-3 shadow-2xl border-4 border-neutral-800 relative flex flex-col overflow-hidden">
              <div className="w-24 h-4 bg-black rounded-full mx-auto mb-1.5 shrink-0 z-30"></div>
              
              <div className="w-full flex-1 bg-[#F6F1E6] rounded-[32px] overflow-y-auto p-4 space-y-3.5 select-none">
                <div className="flex items-center justify-between pb-2 border-b border-[#131313]/10">
                  <div className="flex items-center space-x-1.5">
                    <AtomicMark className="w-6 h-6 text-[#131313]" />
                    <span className="font-sans font-black text-lg text-[#131313]">iAtomica</span>
                  </div>
                  <Menu size={18} className="text-[#131313]" />
                </div>

                <h2 className="font-anton text-2xl text-[#131313] uppercase leading-none">
                  PROYECTOS REALES <br />
                  <span className="bg-[#FFE000] px-1.5 py-0.5 inline-block mt-0.5">
                    DE EMPRESAS REALES.
                  </span>
                </h2>

                {/* Mobile Cards Stack */}
                <div className="space-y-3">
                  <div className="bg-white border border-[#131313] rounded-lg overflow-hidden shadow-sm">
                    <img
                      src="/images/portfolio/grupovision.webp"
                      alt="Grupo Visión"
                      className="w-full h-24 object-cover"
                    />
                    <div className="p-2.5">
                      <span className="font-mono text-[9px] font-black uppercase bg-[#FFE000] px-1.5 py-0.5 border border-[#131313]">
                        TURISMO
                      </span>
                      <h3 className="font-anton text-base text-[#131313] uppercase mt-1">
                        Grupo Visión
                      </h3>
                      <p className="font-sans text-[10px] text-[#131313]/70">
                        Sitio web y panel de gestión para paquetes turísticos e integraciones.
                      </p>
                    </div>
                  </div>

                  <div className="bg-white border border-[#131313] rounded-lg overflow-hidden shadow-sm">
                    <img
                      src="/images/portfolio/aurasalud.jpg"
                      alt="AURA"
                      className="w-full h-24 object-cover"
                    />
                    <div className="p-2.5">
                      <span className="font-mono text-[9px] font-black uppercase bg-[#FF3D8D] text-white px-1.5 py-0.5 border border-[#131313]">
                        SALUD
                      </span>
                      <h3 className="font-anton text-base text-[#131313] uppercase mt-1">
                        AURA
                      </h3>
                      <p className="font-sans text-[10px] text-[#131313]/70">
                        Sistema de gestión para centros de salud y turnos automáticos.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <span className="font-mono text-xs font-black uppercase tracking-widest text-[#131313] mt-3">
              MOBILE 03 — PROYECTOS
            </span>
          </div>

          {/* MOCKUP 04: PROCESO */}
          <div className="flex flex-col items-center">
            <div className="w-[300px] h-[610px] bg-[#131313] rounded-[44px] p-3 shadow-2xl border-4 border-neutral-800 relative flex flex-col overflow-hidden">
              <div className="w-24 h-4 bg-black rounded-full mx-auto mb-1.5 shrink-0 z-30"></div>
              
              <div className="w-full flex-1 bg-[#F6F1E6] rounded-[32px] overflow-y-auto p-4 space-y-3.5 select-none">
                <div className="flex items-center justify-between pb-2 border-b border-[#131313]/10">
                  <div className="flex items-center space-x-1.5">
                    <AtomicMark className="w-6 h-6 text-[#131313]" />
                    <span className="font-sans font-black text-lg text-[#131313]">iAtomica</span>
                  </div>
                  <Menu size={18} className="text-[#131313]" />
                </div>

                <div>
                  <span className="font-mono text-[9px] font-bold uppercase text-[#131313]/60">
                    CÓMO TRABAJAMOS
                  </span>
                  <h2 className="font-anton text-2xl text-[#131313] uppercase leading-none">
                    DE LA IDEA A <br />
                    <span className="bg-[#FFE000] px-1.5 py-0.5 inline-block mt-0.5">
                      RESULTADOS REALES.
                    </span>
                  </h2>
                </div>

                {/* Vertical Steps */}
                <div className="space-y-2">
                  <div className="bg-white border border-[#131313] p-2.5 rounded-lg flex items-center space-x-3">
                    <span className="w-7 h-7 rounded-full bg-[#FFE000] border border-[#131313] flex items-center justify-center font-anton text-xs text-[#131313]">
                      01
                    </span>
                    <div>
                      <span className="font-anton text-xs text-[#131313] uppercase block leading-none">Diagnóstico</span>
                      <span className="font-sans text-[10px] text-[#131313]/70">Entendemos tu negocio y metas.</span>
                    </div>
                  </div>

                  <div className="bg-white border border-[#131313] p-2.5 rounded-lg flex items-center space-x-3">
                    <span className="w-7 h-7 rounded-full bg-[#168CF5] text-white border border-[#131313] flex items-center justify-center font-anton text-xs">
                      02
                    </span>
                    <div>
                      <span className="font-anton text-xs text-[#131313] uppercase block leading-none">Diseño</span>
                      <span className="font-sans text-[10px] text-[#131313]/70">Proponemos la mejor solución.</span>
                    </div>
                  </div>

                  <div className="bg-white border border-[#131313] p-2.5 rounded-lg flex items-center space-x-3">
                    <span className="w-7 h-7 rounded-full bg-[#FF3D8D] text-white border border-[#131313] flex items-center justify-center font-anton text-xs">
                      03
                    </span>
                    <div>
                      <span className="font-anton text-xs text-[#131313] uppercase block leading-none">Desarrollo y QA</span>
                      <span className="font-sans text-[10px] text-[#131313]/70">Construimos e iteramos.</span>
                    </div>
                  </div>

                  <div className="bg-white border border-[#131313] p-2.5 rounded-lg flex items-center space-x-3">
                    <span className="w-7 h-7 rounded-full bg-[#32C878] text-[#131313] border border-[#131313] flex items-center justify-center font-anton text-xs">
                      04
                    </span>
                    <div>
                      <span className="font-anton text-xs text-[#131313] uppercase block leading-none">Lanzamiento</span>
                      <span className="font-sans text-[10px] text-[#131313]/70">Implementamos y medimos.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <span className="font-mono text-xs font-black uppercase tracking-widest text-[#131313] mt-3">
              MOBILE 04 — PROCESO
            </span>
          </div>

          {/* MOCKUP 05: FAQ Y CONTACTO */}
          <div className="flex flex-col items-center">
            <div className="w-[300px] h-[610px] bg-[#131313] rounded-[44px] p-3 shadow-2xl border-4 border-neutral-800 relative flex flex-col overflow-hidden">
              <div className="w-24 h-4 bg-black rounded-full mx-auto mb-1.5 shrink-0 z-30"></div>
              
              <div className="w-full flex-1 bg-[#F6F1E6] rounded-[32px] overflow-y-auto p-4 space-y-3.5 select-none">
                <div className="flex items-center justify-between pb-2 border-b border-[#131313]/10">
                  <div className="flex items-center space-x-1.5">
                    <AtomicMark className="w-6 h-6 text-[#131313]" />
                    <span className="font-sans font-black text-lg text-[#131313]">iAtomica</span>
                  </div>
                  <Menu size={18} className="text-[#131313]" />
                </div>

                <h2 className="font-anton text-2xl text-[#131313] uppercase leading-none">
                  PREGUNTAS FRECUENTES
                </h2>

                <div className="space-y-1.5 font-sans text-[10px] text-[#131313]">
                  <div className="bg-white border border-[#131313] p-2 rounded flex justify-between">
                    <span>¿Con qué tipo de empresas trabajan?</span>
                    <span>+</span>
                  </div>
                  <div className="bg-white border border-[#131313] p-2 rounded flex justify-between">
                    <span>¿Cuánto dura un proyecto?</span>
                    <span>+</span>
                  </div>
                </div>

                {/* Mobile Contact Yellow Card with Mountain Photo */}
                <div className="relative bg-[#FFE000] border-2 border-[#131313] rounded-xl p-3 overflow-hidden shadow-sm mt-3">
                  <img
                    src="/images/collage/bariloche_hiker_contact.jpg"
                    alt="Bariloche lago"
                    className="absolute inset-0 w-full h-full object-cover opacity-20"
                  />
                  <div className="relative z-10 space-y-1.5">
                    <h3 className="font-anton text-lg text-[#131313] uppercase leading-tight">
                      HABLEMOS DE TU PRÓXIMO PROYECTO.
                    </h3>
                    <p className="font-sans text-[9px] text-[#131313]/80">
                      Cuéntanos tu idea y te ayudamos a convertirla en realidad.
                    </p>
                    <div className="w-full py-1.5 bg-[#131313] text-white text-center font-bold text-[10px] rounded-full mt-2">
                      Solicitar asesoría gratuita ➔
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <span className="font-mono text-xs font-black uppercase tracking-widest text-[#131313] mt-3">
              MOBILE 05 — FAQ Y CONTACTO
            </span>
          </div>

          {/* MOCKUP 06: FOOTER / MENÚ OVERLAY */}
          <div className="flex flex-col items-center">
            <div className="w-[300px] h-[610px] bg-[#131313] rounded-[44px] p-3 shadow-2xl border-4 border-neutral-800 relative flex flex-col overflow-hidden">
              <div className="w-24 h-4 bg-black rounded-full mx-auto mb-1.5 shrink-0 z-30"></div>
              
              {/* Dark Full Screen Menu */}
              <div className="w-full flex-1 bg-[#131313] text-white rounded-[32px] overflow-hidden p-5 flex flex-col justify-between relative select-none">
                {/* Header with X */}
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div className="flex items-center space-x-1.5">
                    <AtomicMark className="w-6 h-6 text-white" color="#FFFFFF" />
                    <span className="font-sans font-black text-lg text-white">iAtomica</span>
                  </div>
                  <X size={18} className="text-white" />
                </div>

                {/* Nav Links */}
                <div className="flex flex-col space-y-3 font-sans text-base font-bold text-neutral-300 py-3">
                  <span className="hover:text-white">Servicios</span>
                  <span className="hover:text-white">Proyectos</span>
                  <span className="hover:text-white">Cómo trabajamos</span>
                  <span className="hover:text-white">Nosotros</span>
                  <span className="hover:text-white">Recursos</span>
                  <span className="hover:text-white">Contacto</span>
                </div>

                <div className="space-y-3">
                  <div className="w-full py-2 bg-[#FFE000] text-[#131313] text-center font-bold text-xs rounded-full">
                    Asesoría gratuita ➔
                  </div>

                  <div className="flex items-center space-x-3 text-xs text-neutral-400 font-mono">
                    <span>in</span>
                    <span>📸</span>
                    <span>▶</span>
                  </div>

                  <div className="font-mono text-[9px] text-[#FFE000] uppercase tracking-wider">
                    TECNOLOGÍA PARA IDEAS QUE AVANZAN
                  </div>
                </div>

                {/* Mountain Silhouette background at bottom */}
                <div className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none opacity-20">
                  <img
                    src="/images/collage/lake_bariloche.jpg"
                    alt="Fondo"
                    className="w-full h-full object-cover grayscale"
                  />
                </div>
              </div>
            </div>
            <span className="font-mono text-xs font-black uppercase tracking-widest text-[#131313] mt-3">
              MOBILE 06 — FOOTER / MENÚ
            </span>
          </div>

        </div>

      </div>
    </div>
  );
};
