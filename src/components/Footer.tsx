import React from 'react';
import { Bot, ArrowUp, Activity } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 pt-16 pb-12 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-slate-900">
          
          {/* Col 1: Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-purple-600 p-[1px] flex items-center justify-center">
                <div className="w-full h-full bg-slate-950 rounded-[7px] flex items-center justify-center">
                  <Bot className="w-4 h-4 text-cyan-400" />
                </div>
              </div>
              <span className="font-heading font-extrabold text-lg text-white">iAtomica 2.0</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Estudio de ingeniería especializado en soluciones de Inteligencia Artificial, Agentes RAG autónomos y desarrollo de software de alta performance.
            </p>
            <div className="flex items-center space-x-2 text-emerald-400 font-mono text-[11px]">
              <Activity className="w-3.5 h-3.5 animate-pulse" />
              <span>Sistemas 100% Operativos</span>
            </div>
          </div>

          {/* Col 2: Services */}
          <div>
            <h4 className="font-mono text-xs uppercase font-bold text-white mb-4 tracking-wider">Soluciones</h4>
            <ul className="space-y-2.5">
              <li><a href="#servicios" className="hover:text-cyan-400 transition-colors">Agentes IA Autónomos</a></li>
              <li><a href="#servicios" className="hover:text-cyan-400 transition-colors">Automatizaciones n8n &amp; Make</a></li>
              <li><a href="#servicios" className="hover:text-cyan-400 transition-colors">Chatbots WhatsApp 24/7</a></li>
              <li><a href="#servicios" className="hover:text-cyan-400 transition-colors">Desarrollo Web / SaaS</a></li>
              <li><a href="#servicios" className="hover:text-cyan-400 transition-colors">Consultoría &amp; Prototipado</a></li>
            </ul>
          </div>

          {/* Col 3: Navigation */}
          <div>
            <h4 className="font-mono text-xs uppercase font-bold text-white mb-4 tracking-wider">Navegación</h4>
            <ul className="space-y-2.5">
              <li><a href="#simulador" className="hover:text-cyan-400 transition-colors">Simulador IA en Vivo</a></li>
              <li><a href="#calculadora" className="hover:text-cyan-400 transition-colors">Calculadora ROI</a></li>
              <li><a href="#arquitectura" className="hover:text-cyan-400 transition-colors">Arquitectura Enterprise</a></li>
              <li><a href="#casos" className="hover:text-cyan-400 transition-colors">Casos de Éxito</a></li>
              <li><a href="#contacto" className="hover:text-cyan-400 transition-colors">Agendar Cita Demo</a></li>
            </ul>
          </div>

          {/* Col 4: Tech Stack Highlights */}
          <div>
            <h4 className="font-mono text-xs uppercase font-bold text-white mb-4 tracking-wider">Tecnologías Core</h4>
            <div className="flex flex-wrap gap-1.5 font-mono text-[10px]">
              <span className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300">OpenAI GPT-4o</span>
              <span className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300">Claude 3.5 Sonnet</span>
              <span className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300">LangChain</span>
              <span className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300">Python</span>
              <span className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300">n8n / Make</span>
              <span className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300">React / TypeScript</span>
              <span className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300">Docker / Cloud</span>
            </div>
          </div>

        </div>

        {/* Footer Bottom */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>&copy; {new Date().getFullYear()} iAtomica Studio. Todos los derechos reservados.</p>
          <div className="flex items-center space-x-6">
            <button
              onClick={scrollToTop}
              className="flex items-center space-x-1 hover:text-cyan-400 transition-colors font-mono"
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
