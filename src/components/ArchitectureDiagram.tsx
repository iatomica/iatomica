import React, { useState } from 'react';
import { Database, Cpu, Zap, Server, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';

interface NodeDetail {
  id: string;
  name: string;
  category: 'source' | 'brain' | 'action';
  icon: any;
  desc: string;
  protocol: string;
}

const NODES: NodeDetail[] = [
  { id: 'src-1', name: 'Comprobantes & PDFs', category: 'source', icon: Database, desc: 'Facturas comerciales (RMB/USD), packing lists, despachos', protocol: 'OCR Stream / Vision AI' },
  { id: 'src-2', name: 'Canales Mensajería', category: 'source', icon: Database, desc: 'WhatsApp API Oficial, Web Chat, Email', protocol: 'Realtime WebSocket' },
  { id: 'src-3', name: 'Sistemas ERP & DBs', category: 'source', icon: Database, desc: 'Odoo, SAP, PostgreSQL, Salesforce, HubSpot', protocol: 'REST / GraphQL Sync' },
  
  { id: 'brain-1', name: 'Motor RAG Vectorial', category: 'brain', icon: Cpu, desc: 'Búsqueda semántica en milisegundos sobre bases privadas', protocol: 'Embeddings (384d / 1536d)' },
  { id: 'brain-2', name: 'Enrutador Multi-Modelo', category: 'brain', icon: Cpu, desc: 'Modelos en paralelo: Claude 3.5 Sonnet / GPT-4o / Llama 3', protocol: 'Streaming Sub-150ms' },
  { id: 'brain-3', name: 'Orquestador n8n / Make', category: 'brain', icon: Cpu, desc: 'Control de estado, validación de reglas y reintentos', protocol: 'Custom Pipeline' },
  
  { id: 'act-1', name: 'Inyección en ERP / CRM', category: 'action', icon: Server, desc: 'Creación automática de asientos, facturas y actualización de stock', protocol: 'Transaction API' },
  { id: 'act-2', name: 'Generación Comprobantes PDF', category: 'action', icon: Zap, desc: 'Emisión instantánea de cotizaciones y envío por WhatsApp', protocol: 'Event Trigger' },
  { id: 'act-3', name: 'Notificación & Cobros', category: 'action', icon: ShieldCheck, desc: 'Alertas en Slack, notificaciones y pasarelas de pago', protocol: 'Secure Auth E2E' },
];

export const ArchitectureDiagram: React.FC = () => {
  const [selectedNodeId, setSelectedNodeId] = useState('brain-1');
  const selectedNode = NODES.find(n => n.id === selectedNodeId) || NODES[3];

  return (
    <section id="arquitectura" className="py-24 relative bg-slate-950/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono mb-4">
            <Sparkles className="w-3.5 h-3.5 text-orange-400" />
            <span>Infraestructura E2E de Alta Performance</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Arquitectura de <span className="text-gradient-brand">Integración de Soluciones</span>
          </h2>
          <p className="mt-4 text-slate-400 text-base sm:text-lg">
            Conectamos sus orígenes de información con nuestros motores de inteligencia artificial y sus sistemas operativos finales.
          </p>
        </div>

        {/* Node Graph Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center relative">
          
          {/* Column 1: Sources */}
          <div className="space-y-4">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center justify-between">
              <span>1. Captura de Datos</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-orange-400 font-bold">INPUT</span>
            </h3>
            {NODES.filter(n => n.category === 'source').map(node => (
              <div
                key={node.id}
                onClick={() => setSelectedNodeId(node.id)}
                className={`p-4 rounded-xl cursor-pointer transition-all border ${
                  selectedNodeId === node.id
                    ? 'bg-slate-900 border-orange-500/50 shadow-lg shadow-orange-500/10'
                    : 'linear-card border-slate-800/80 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-white">{node.name}</span>
                  <ArrowRight className={`w-4 h-4 ${selectedNodeId === node.id ? 'text-orange-400' : 'text-slate-600'}`} />
                </div>
                <p className="text-xs text-slate-400 mt-1">{node.desc}</p>
              </div>
            ))}
          </div>

          {/* Column 2: Brain Core */}
          <div className="space-y-4 p-4 rounded-2xl bg-gradient-to-b from-purple-950/30 via-slate-950 to-orange-950/20 border border-purple-500/30">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-purple-300 mb-2 flex items-center justify-between">
              <span>2. Motor IA iAtomica</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30 font-bold">CORE ENGINE</span>
            </h3>
            {NODES.filter(n => n.category === 'brain').map(node => (
              <div
                key={node.id}
                onClick={() => setSelectedNodeId(node.id)}
                className={`p-4 rounded-xl cursor-pointer transition-all border ${
                  selectedNodeId === node.id
                    ? 'bg-slate-900 border-purple-500/50 shadow-lg shadow-purple-500/10'
                    : 'linear-card border-slate-800/80 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-white">{node.name}</span>
                  <Cpu className={`w-4 h-4 ${selectedNodeId === node.id ? 'text-purple-400 animate-pulse' : 'text-slate-600'}`} />
                </div>
                <p className="text-xs text-slate-400 mt-1">{node.desc}</p>
              </div>
            ))}
          </div>

          {/* Column 3: Actions */}
          <div className="space-y-4">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center justify-between">
              <span>3. Ejecución en Sistemas</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-emerald-400 font-bold">OUTPUT</span>
            </h3>
            {NODES.filter(n => n.category === 'action').map(node => (
              <div
                key={node.id}
                onClick={() => setSelectedNodeId(node.id)}
                className={`p-4 rounded-xl cursor-pointer transition-all border ${
                  selectedNodeId === node.id
                    ? 'bg-slate-900 border-emerald-500/50 shadow-lg shadow-emerald-500/10'
                    : 'linear-card border-slate-800/80 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-white">{node.name}</span>
                  <Zap className={`w-4 h-4 ${selectedNodeId === node.id ? 'text-emerald-400' : 'text-slate-600'}`} />
                </div>
                <p className="text-xs text-slate-400 mt-1">{node.desc}</p>
              </div>
            ))}
          </div>

        </div>

        {/* Selected Node Inspector Drawer */}
        <div className="mt-8 p-6 rounded-2xl linear-card border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 rounded-xl bg-orange-500/10 border border-orange-500/30 text-orange-400 font-mono text-xs font-bold">
              NODE_ID
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase text-slate-400">Detalle del Componente</span>
              <h4 className="text-lg font-bold text-white">{selectedNode.name}</h4>
              <p className="text-xs text-slate-400">{selectedNode.desc}</p>
            </div>
          </div>

          <div className="flex items-center space-x-4 text-xs font-mono">
            <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300">
              Protocolo: <strong className="text-orange-400">{selectedNode.protocol}</strong>
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-purple-500/10 text-purple-300 border border-purple-500/20">
              SOC2 &amp; Encryption E2E
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};
