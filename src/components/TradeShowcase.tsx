import React from 'react';
import { Globe, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';
import tradeImg from '../assets/trade_illustration.webp';

interface TradeShowcaseProps {
  onOpenBooking: () => void;
}

export const TradeShowcase: React.FC<TradeShowcaseProps> = ({ onOpenBooking }) => {
  return (
    <section id="comercio" className="py-24 relative bg-slate-950/80 bg-grid-line">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Custom 3D Trade Illustration */}
          <div className="lg:col-span-6 relative flex justify-center order-2 lg:order-1">
            <div className="relative w-full max-w-lg">
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-orange-500/20 rounded-3xl filter blur-3xl opacity-60" />

              <div className="relative p-2 rounded-3xl linear-card border border-purple-500/30 overflow-hidden shadow-2xl shadow-orange-950/40">
                <img
                  src={tradeImg}
                  alt="IAtomica Trade Automation Artwork"
                  className="w-full h-auto object-cover rounded-2xl filter drop-shadow-xl"
                />

                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl glass-panel border border-white/10 flex items-center justify-between text-xs backdrop-blur-md">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-purple-500/20 text-purple-300 border border-purple-500/30">
                      <Globe className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white">Gestión de Importación &amp; Stock</h4>
                      <p className="text-[10px] text-slate-400">Automatización de Comprobantes RMB/USD</p>
                    </div>
                  </div>
                  <span className="font-mono text-[10px] px-2 py-1 rounded bg-orange-500/20 text-orange-400 font-bold border border-orange-500/30">
                    AUTOMATED
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Key Value Proposition */}
          <div className="lg:col-span-6 space-y-6 text-left order-1 lg:order-2">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono">
              <Sparkles className="w-3.5 h-3.5 text-orange-400" />
              <span>Especialidad en Comercio Exterior &amp; Distribución</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              Automatización de Extremo a Extremo para <span className="text-gradient-brand">Empresas Comerciales</span>.
            </h2>

            <p className="text-slate-300 text-base leading-relaxed">
              Las empresas dedicadas al comercio internacional, la importación de mercadería y la distribución enfrentan cuellos de botella diarios en el procesamiento de documentos, facturación y consulta de stock.
            </p>

            <div className="space-y-4 pt-2">
              <div className="p-4 rounded-xl linear-card border border-slate-800 space-y-1">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-orange-400" />
                  <span>Procesamiento OCR de Documentación Internacional</span>
                </h4>
                <p className="text-xs text-slate-400 pl-6">
                  Lectura automática de Commercial Invoices, Packing Lists y Despachos con conciliación de moneda RMB/USD.
                </p>
              </div>

              <div className="p-4 rounded-xl linear-card border border-slate-800 space-y-1">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-purple-400" />
                  <span>Atención Comercial &amp; Cotizaciones WhatsApp 24/7</span>
                </h4>
                <p className="text-xs text-slate-400 pl-6">
                  Agentes conversacionales que consultan inventario en vivo, emiten comprobantes PDF y registran operaciones en el CRM.
                </p>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={onOpenBooking}
                className="px-7 py-3.5 rounded-xl gradient-brand text-white font-bold text-xs shadow-xl shadow-orange-500/20 hover:shadow-orange-500/40 transition-all flex items-center space-x-2 group"
              >
                <span>Solicitar Demostración Comercial</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
