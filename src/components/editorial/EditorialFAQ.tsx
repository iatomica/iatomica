import React, { useState } from 'react';
import { Plus, Minus, HelpCircle } from 'lucide-react';

export const EditorialFAQ: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: '¿Cuánto tiempo toma implementar un proyecto típico?',
      a: 'Depende del alcance. Una automatización específica con chatbots o agentes de WhatsApp suele estar lista en 2 a 3 semanas. Una plataforma o sistema a medida complejo toma típicamente entre 6 y 10 semanas con entregables funcionales en sprints bisemanales.',
    },
    {
      q: '¿Quién es el dueño del código fuente desarrollado?',
      a: 'Tu empresa es 100% dueña de la propiedad intelectual y de todo el código fuente. Una vez finalizado el proyecto, te entregamos los repositorios, documentación técnica y accesos completos sin costos de licenciamiento cautivo.',
    },
    {
      q: '¿Cómo garantizan la privacidad y seguridad de mis datos corporativos?',
      a: 'Aplicamos aislamiento de entornos, encriptación en tránsito y en reposo. Para las herramientas de IA, configuramos instancias y contratos API empresariales que garantizan formalmente que los datos de tu empresa nunca se utilicen para entrenar modelos públicos.',
    },
    {
      q: '¿Qué tecnologías y modelos de inteligencia artificial utilizan?',
      a: 'Trabajamos con TypeScript, React, Next.js, Node.js y Python en el frontend y backend. En IA utilizamos modelos avanzados (OpenAI, Anthropic Claude, DeepSeek, modelos open-source locales) seleccionando la mejor opción costo/eficiencia para cada caso particular.',
    },
    {
      q: '¿Ofrecen soporte y mantenimiento post-lanzamiento?',
      a: 'Sí. Ofrecemos planes mensuales de mantenimiento preventivo, soporte técnico garantizado por SLA, monitoreo de infraestructura y horas de evolución continua para añadir nuevas funciones a medida que tu empresa crece.',
    },
    {
      q: '¿Cómo es el primer paso para empezar a trabajar?',
      a: 'Agendamos una breve llamada de diagnóstico de 30 minutos sin cargo. Evaluamos tus cuellos de botella actuales y en 48 horas te presentamos una propuesta técnica con alcance, plazos y presupuesto transparente.',
    },
  ];

  return (
    <section id="faq" className="w-full py-20 sm:py-28 px-5 sm:px-10 lg:px-14 border-b border-[#131313]/15 bg-white">
      <div className="max-w-[1000px] mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-[#FFE000] border-2 border-[#131313] px-3 py-1 font-mono text-xs font-black uppercase shadow-[2px_2px_0px_#131313] mb-3">
            <HelpCircle size={14} />
            <span>RESPUESTAS CLARAS</span>
          </div>

          <h2 className="font-anton text-4xl sm:text-6xl text-[#131313] tracking-tight leading-none uppercase">
            PREGUNTAS <br />
            <span className="bg-[#FFE000] px-2 py-0.5 inline-block border-2 border-[#131313] shadow-[2px_2px_0px_#131313] mt-1">
              FRECUENTES.
            </span>
          </h2>

          <p className="font-sans text-base text-[#131313]/80 font-medium leading-relaxed mt-4">
            Todo lo que necesitás saber antes de iniciar un proyecto con nosotros.
          </p>
        </div>

        {/* Accordions Stack */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;

            return (
              <div
                key={idx}
                className="bg-[#F6F1E6] border-2 border-[#131313] shadow-[3px_3px_0px_#131313] transition-all overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full min-h-[56px] px-6 py-4 flex items-center justify-between text-left cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#168CF5]"
                  aria-expanded={isOpen}
                >
                  <span className="font-anton text-xl sm:text-2xl text-[#131313] uppercase tracking-wide pr-4">
                    {faq.q}
                  </span>
                  
                  <div className="w-8 h-8 rounded-full bg-white border-2 border-[#131313] flex items-center justify-center shrink-0 text-[#131313] shadow-[1px_1px_0px_#131313]">
                    {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 border-t border-[#131313]/10 font-sans text-sm sm:text-base text-[#131313]/80 leading-relaxed font-medium">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
