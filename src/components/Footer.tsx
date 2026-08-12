import React from 'react';
import { Cpu, ArrowUp, Activity } from 'lucide-react';

interface FooterProps {
  darkMode: boolean;
}

export const Footer: React.FC<FooterProps> = ({ darkMode }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={`border-t pt-16 pb-12 text-xs transition-colors ${
      darkMode ? 'bg-slate-950 border-slate-800 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-600'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-slate-200 dark:border-slate-800 text-left">
          
          {/* Col 1: Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-xl gradient-brand p-[1.5px] flex items-center justify-center">
                <div className={`w-full h-full rounded-[9px] flex items-center justify-center ${darkMode ? 'bg-slate-950' : 'bg-white'}`}>
                  <Cpu className="w-4 h-4 text-orange-500" />
                </div>
              </div>
              <span className={`font-heading font-black text-lg ${darkMode ? 'text-white' : 'text-slate-900'}`}>iAtomica 2.0</span>
            </div>
            <p className="text-xs leading-relaxed">
              Estudio de consultoría y desarrollo de software. Creamos herramientas de Inteligencia Artificial, aplicaciones a medida, control de calidad y contenidos digitales para empresas.
            </p>
            <div className="flex items-center space-x-2 text-orange-600 font-bold text-[11px]">
              <Activity className="w-3.5 h-3.5 animate-pulse text-purple-600" />
              <span>Sistemas &amp; Asesoramiento Activo</span>
            </div>
          </div>

          {/* Col 2: Services */}
          <div>
            <h4 className={`font-bold uppercase tracking-wider mb-4 ${darkMode ? 'text-white' : 'text-slate-900'}`}>Servicios</h4>
            <ul className="space-y-2.5">
              <li><a href="#servicios" className="hover:text-orange-500 transition-colors">Consultoría Tecnológica</a></li>
              <li><a href="#servicios" className="hover:text-orange-500 transition-colors">Desarrollo de Herramientas IA</a></li>
              <li><a href="#servicios" className="hover:text-orange-500 transition-colors">Software &amp; Sistemas a Medida</a></li>
              <li><a href="#servicios" className="hover:text-orange-500 transition-colors">Mantenimiento &amp; Control de Calidad (QA)</a></li>
              <li><a href="#servicios" className="hover:text-orange-500 transition-colors">Contenido &amp; Marketing Institucional</a></li>
            </ul>
          </div>

          {/* Col 3: Navigation */}
          <div>
            <h4 className={`font-bold uppercase tracking-wider mb-4 ${darkMode ? 'text-white' : 'text-slate-900'}`}>Navegación</h4>
            <ul className="space-y-2.5">
              <li><a href="#servicios" className="hover:text-orange-500 transition-colors">Nuestros Servicios</a></li>
              <li><a href="#soluciones" className="hover:text-orange-500 transition-colors">Soluciones Prácticas</a></li>
              <li><a href="#metodologia" className="hover:text-orange-500 transition-colors">Cómo Trabajamos</a></li>
              <li><a href="#contacto" className="hover:text-orange-500 transition-colors">Enviar Consulta / Agendar</a></li>
            </ul>
          </div>

          {/* Col 4: Quick Contact & Motto */}
          <div>
            <h4 className={`font-bold uppercase tracking-wider mb-4 ${darkMode ? 'text-white' : 'text-slate-900'}`}>iAtomica Studio</h4>
            <p className="text-xs leading-relaxed mb-3">
              Soluciones claras, tecnología segura y acompañamiento constante para que tu empresa crezca.
            </p>
            <div className="p-3 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-600 text-[11px] font-bold">
              Charlemos sobre tu proyecto hoy.
            </div>
          </div>

        </div>

        {/* Footer Bottom */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
          <p>&copy; {new Date().getFullYear()} iAtomica Studio. Todos los derechos reservados.</p>
          <div className="flex items-center space-x-6">
            <button
              onClick={scrollToTop}
              className="flex items-center space-x-1 hover:text-orange-500 transition-colors font-bold"
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
