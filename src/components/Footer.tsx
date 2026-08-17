import React from 'react';
import { Cpu, MessageSquare, ShieldAlert, LayoutDashboard } from 'lucide-react';

interface FooterProps {
  onOpenAdmin: () => void;
  isLoggedIn: boolean;
  darkMode: boolean;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin, isLoggedIn, darkMode }) => {
  const whatsappUrl = "https://wa.me/5491170142641?text=Hola%20iAtomica,%20quiero%20consultar%20por%20servicios%20de%20consultor%C3%ADa%20y%20desarrollo%20de%20IA%20para%20mi%20empresa.";

  return (
    <footer className={`py-12 border-t transition-colors ${
      darkMode ? 'bg-slate-950 border-slate-800/80 text-slate-400' : 'bg-slate-900 border-slate-800 text-slate-400'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg gradient-brand flex items-center justify-center text-white">
                <Cpu size={18} />
              </div>
              <span className="font-heading font-black text-xl text-white">iAtomica 2.0</span>
            </div>
            <p className="text-xs leading-relaxed max-w-sm text-slate-400 font-medium">
              Consultoría tecnológica, desarrollo de software a medida, herramientas de Inteligencia Artificial y comunicación digital para empresas.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white mb-3">Contacto Directo</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href={whatsappUrl} target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center gap-1.5 font-mono">
                  <MessageSquare size={13} className="text-emerald-400" />
                  <span>WhatsApp: +54 9 11 7014-2641</span>
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white mb-3">Plataforma</h4>
            <button
              onClick={onOpenAdmin}
              className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold flex items-center space-x-2 transition-colors cursor-pointer ${
                isLoggedIn
                  ? 'bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 border border-purple-500/20'
                  : 'bg-orange-500/10 hover:bg-orange-500/20 text-orange-400 border border-orange-500/20'
              }`}
            >
              {isLoggedIn ? <LayoutDashboard size={14} /> : <ShieldAlert size={14} />}
              <span>{isLoggedIn ? 'Panel' : 'Acceso'}</span>
            </button>
          </div>

        </div>

        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-slate-500">
          <span>&copy; {new Date().getFullYear()} iAtomica. Todos los derechos reservados.</span>
          <span className="mt-2 sm:mt-0">Infraestructura preparada para Docker &amp; Coolify</span>
        </div>
      </div>
    </footer>
  );
};
