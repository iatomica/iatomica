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
  { id: 'src-1', name: 'Documentos & PDFs', category: 'source', icon: Database, desc: 'Facturas, contratos, órdenes de compra y recibos', protocol: 'Webhooks / OCR Stream' },
  { id: 'src-2', name: 'Canales Mensajería', category: 'source', icon: Database, desc: 'WhatsApp API Oficial, Email, Web Chat', protocol: 'Realtime WebSocket' },
  { id: 'src-3', name: 'Bases de Datos & ERP', category: 'source', icon: Database, desc: 'PostgreSQL, SAP, Odoo, Salesforce', protocol: 'REST / GraphQL Sync' },
  
  { id: 'brain-1', name: 'iAtomica RAG Engine', category: 'brain', icon: Cpu, desc: 'Búsqueda vectorial en milisegundos con Pinecone / Qdrant', protocol: 'Vector Embeddings (384d)' },
  { id: 'brain-2', name: 'Multi-LLM Router', category: 'brain', icon: Cpu, desc: 'Enrutamiento dinámico GPT-4o / Claude 3.5 Sonnet / Llama 3', protocol: 'Sub-150ms Streaming' },
  { id: 'brain-3', name: 'Memoria & Contexto', category: 'brain', icon: Cpu, desc: 'Persistencia de estado de conversación y reglas de negocio', protocol: 'Redis / PostgreSQL' },
  
  { id: 'act-1', name: 'Escritura en ERP / CRM', category: 'action', icon: Server, desc: 'Actualización automática de stock, clientes y contabilidad', protocol: 'Transaction API' },
  { id: 'act-2', name: 'Notificación & Disparo', category: 'action', icon: Zap, desc: 'Alertas en Slack, WhatsApp y emails con adjuntos PDF', protocol: 'Event Trigger' },
  { id: 'act-3', name: 'Pasarelas & Cobros', category: 'action', icon: ShieldCheck, desc: 'Generación de links de pago y facturas electrónicas AFIP', protocol: 'Secure Auth E2E' },
];

export const ArchitectureDiagram: React.FC = () => {
  const [selectedNodeId, setSelectedNodeId] = useState('brain-1');
  const selectedNode = NODES.find(n => n.id === selectedNodeId) || NODES[3];

  return (
    <section id="arquitectura" className="py-24 relative bg-slate-950/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-mono mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Arquitectura Enterprise E2E</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Cómo Funciona la <span className="text-gradient-cyan">Inteligencia iAtomica</span>
          </h2>
          <p className="mt-4 text-slate-400 text-base sm:text-lg">
            Infraestructura segura y escalable que conecta sus orígenes de datos con nuestros núcleos de IA y sus sistemas de ejecución final.
          </p>
        </div>

        {/* Node Graph Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center relative">
          
          {/* Column 1: Sources */}
          <div className="space-y-4">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center justify-between">
              <span>1. Orígenes de Datos</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-cyan-400">INPUT</span>
            </h3>
            {NODES.filter(n => n.category === 'source').map(node => (
              <div
                key={node.id}
                onClick={() => setSelectedNodeId(node.id)}
                className={`p-4 rounded-xl cursor-pointer transition-all border ${
                  selectedNodeId === node.id
                    ? 'bg-slate-900 border-cyan-500/50 shadow-lg shadow-cyan-500/10'
                    : 'glass-panel border-slate-800/80 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-white">{node.name}</span>
                  <ArrowRight className={`w-4 h-4 ${selectedNodeId === node.id ? 'text-cyan-400' : 'text-slate-600'}`} />
                </div>
                <p className="text-xs text-slate-400 mt-1">{node.desc}</p>
              </div>
            ))}
          </div>

          {/* Column 2: Brain Core */}
          <div className="space-y-4 p-4 rounded-2xl bg-gradient-to-b from-cyan-950/20 via-purple-950/20 to-slate-950 border border-cyan-500/30">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 mb-2 flex items-center justify-between">
              <span>2. Núcleo IA iAtomica</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">AGENT ENGINE</span>
            </h3>
            {NODES.filter(n => n.category === 'brain').map(node => (
              <div
                key={node.id}
                onClick={() => setSelectedNodeId(node.id)}
                className={`p-4 rounded-xl cursor-pointer transition-all border ${
                  selectedNodeId === node.id
                    ? 'bg-slate-900 border-purple-500/50 shadow-lg shadow-purple-500/10'
                    : 'glass-panel border-slate-800/80 hover:border-slate-700'
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
              <span>3. Acciones &amp; Ejecución</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-emerald-400">OUTPUT</span>
            </h3>
            {NODES.filter(n => n.category === 'action').map(node => (
              <div
                key={node.id}
                onClick={() => setSelectedNodeId(node.id)}
                className={`p-4 rounded-xl cursor-pointer transition-all border ${
                  selectedNodeId === node.id
                    ? 'bg-slate-900 border-emerald-500/50 shadow-lg shadow-emerald-500/10'
                    : 'glass-panel border-slate-800/80 hover:border-slate-700'
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
        <div className="mt-8 p-6 rounded-2xl glass-card border border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono">
              NODECODE
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase text-slate-400">Detalle del Componente Seleccionado</span>
              <h4 className="text-lg font-bold text-white">{selectedNode.name}</h4>
              <p className="text-xs text-slate-400">{selectedNode.desc}</p>
            </div>
          </div>

          <div className="flex items-center space-x-4 text-xs font-mono">
            <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300">
              Protocolo: <strong className="text-cyan-400">{selectedNode.protocol}</strong>
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              SOC2 Type II Compliant
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};
