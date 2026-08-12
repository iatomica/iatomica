import React from 'react';
import { Cpu, ArrowUp, Activity } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 pt-16 pb-12 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-slate-900 text-left">
          
          {/* Col 1: Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-xl gradient-brand p-[1.5px] flex items-center justify-center">
                <div className="w-full h-full bg-slate-950 rounded-[9px] flex items-center justify-center">
                  <Cpu className="w-4 h-4 text-orange-400" />
                </div>
              </div>
              <span className="font-heading font-black text-lg text-white">iAtomica 2.0</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Estudio de consultoría técnica y desarrollo especializado en Inteligencia Artificial, automatizaciones de procesos e ingeniería de software para empresas comerciales y corporativas.
            </p>
            <div className="flex items-center space-x-2 text-orange-400 font-mono text-[11px]">
              <Activity className="w-3.5 h-3.5 animate-pulse text-purple-400" />
              <span>Sistemas &amp; Arquitecturas Operativas</span>
            </div>
          </div>

          {/* Col 2: Services */}
          <div>
            <h4 className="font-mono text-xs uppercase font-bold text-white mb-4 tracking-wider">Soluciones</h4>
            <ul className="space-y-2.5">
              <li><a href="#soluciones" className="hover:text-orange-400 transition-colors">Extracción OCR Import/Export</a></li>
              <li><a href="#soluciones" className="hover:text-orange-400 transition-colors">Agentes RAG &amp; Copilotos IA</a></li>
              <li><a href="#soluciones" className="hover:text-orange-400 transition-colors">Cotizador WhatsApp 24/7</a></li>
              <li><a href="#soluciones" className="hover:text-orange-400 transition-colors">Automatización n8n / Make</a></li>
              <li><a href="#soluciones" className="hover:text-orange-400 transition-colors">Desarrollo Web / App Custom</a></li>
            </ul>
          </div>

          {/* Col 3: Navigation */}
          <div>
            <h4 className="font-mono text-xs uppercase font-bold text-white mb-4 tracking-wider">Navegación</h4>
            <ul className="space-y-2.5">
              <li><a href="#soluciones" className="hover:text-orange-400 transition-colors">Espectro de Soluciones</a></li>
              <li><a href="#comercio" className="hover:text-orange-400 transition-colors">Comercio &amp; Trading</a></li>
              <li><a href="#metodologia" className="hover:text-orange-400 transition-colors">Metodología de Trabajo</a></li>
              <li><a href="#arquitectura" className="hover:text-orange-400 transition-colors">Arquitectura de Integración</a></li>
              <li><a href="#contacto" className="hover:text-orange-400 transition-colors">Contacto &amp; Consultoría</a></li>
            </ul>
          </div>

          {/* Col 4: Tech Stack Highlights */}
          <div>
            <h4 className="font-mono text-xs uppercase font-bold text-white mb-4 tracking-wider">Tecnologías</h4>
            <div className="flex flex-wrap gap-1.5 font-mono text-[10px]">
              <span className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300">Claude 3.5 Sonnet</span>
              <span className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300">OpenAI GPT-4o</span>
              <span className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300">LangChain / Python</span>
              <span className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300">n8n / Make</span>
              <span className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300">React / TypeScript</span>
              <span className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300">WhatsApp API</span>
              <span className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300">Odoo / SAP / APIs</span>
            </div>
          </div>

        </div>

        {/* Footer Bottom */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>&copy; {new Date().getFullYear()} iAtomica Studio. Todos los derechos reservados.</p>
          <div className="flex items-center space-x-6">
            <button
              onClick={scrollToTop}
              className="flex items-center space-x-1 hover:text-orange-400 transition-colors font-mono"
            >
              <span>Volver arriba</span>
              <ArrowUp size={12} />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
