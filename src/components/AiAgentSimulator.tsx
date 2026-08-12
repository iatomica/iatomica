import React, { useState } from 'react';
import { Play, CheckCircle2, FileText, MessageSquare, Database, RefreshCw, Terminal, Sparkles } from 'lucide-react';

interface Scenario {
  id: string;
  title: string;
  category: string;
  icon: any;
  input: string;
  model: string;
  output: string;
  timeSaved: string;
  accuracy: string;
  steps: { title: string; desc: string; status: 'pending' | 'running' | 'done' }[];
  jsonOutput: object;
}

const SCENARIOS: Scenario[] = [
  {
    id: 'ocr-invoice',
    title: 'Extracción & Registro de Facturas OCR',
    category: 'Finanzas & Logística',
    icon: FileText,
    input: 'PDF / Foto Factura Comercial (RMB/USD)',
    model: 'iAtomica Vision Agent v2 (GPT-4o / Claude Sonnet)',
    output: 'Asiento Contable en ERP + Validación AFIP/Customs',
    timeSaved: '95% más rápido',
    accuracy: '99.9%',
    steps: [
      { title: 'Recepciones Multicanal', desc: 'Captura automática desde Email / WhatsApp / API', status: 'done' },
      { title: 'Análisis OCR y RAG', desc: 'Extracción de ítems, impuestos, tipo de cambio y CUIT/TaxID', status: 'done' },
      { title: 'Validación Reglas de Negocio', desc: 'Cross-check de precios con Orden de Compra previa', status: 'done' },
      { title: 'Inyección en ERP / Base de Datos', desc: 'Creación de Factura en sistema interno sin intervención humana', status: 'done' },
    ],
    jsonOutput: {
      status: "SUCCESS",
      invoice_number: "INV-2026-8841",
      supplier: "YIWU ANHAO TRADING CO., LIMITED",
      subtotal_cny: 145800.00,
      exchange_rate: 7.24,
      total_usd: 20138.12,
      line_items_extracted: 24,
      validation: "APPROVED_MATCHED_PO_#9041",
      processing_time_ms: 342
    }
  },
  {
    id: 'whatsapp-sales',
    title: 'Agente de Ventas Multicanal 24/7',
    category: 'Customer Support & Sales',
    icon: MessageSquare,
    input: 'Consulta WhatsApp: "¿Tienen stock del producto TP-901 y precio por mayor?"',
    model: 'iAtomica Conversational Sales Agent (Llama 3 + RAG Stock)',
    output: 'Respuesta personalizada + Cotización PDF enviada por chat',
    timeSaved: 'Atención 24/7 instantánea',
    accuracy: '100% verificado',
    steps: [
      { title: 'Procesamiento de Intención NLP', desc: 'Identificación de SKU de producto y volumen de compra', status: 'done' },
      { title: 'Consulta de Stock en Tiempo Real', desc: 'Conexión vía API con base de datos de depósito', status: 'done' },
      { title: 'Generación de Cotización PDF', desc: 'Cálculo de descuento por volumen + template corporativo', status: 'done' },
      { title: 'Respuesta & Seguimiento CRM', desc: 'Envío de mensaje WhatsApp + registro de lead en HubSpot/Salesforce', status: 'done' },
    ],
    jsonOutput: {
      lead_phone: "+549114567890",
      sku_queried: "TP-901",
      stock_status: "AVAILABLE (1,450 units)",
      tier_discount_applied: "15% WHOLESALE",
      pdf_quotation_generated: "https://api.iatomica.com/quotes/Q-2026-091.pdf",
      crm_deal_created: true
    }
  },
  {
    id: 'erp-rag',
    title: 'Copiloto IA sobre Base de Datos Enterprise',
    category: 'Business Intelligence',
    icon: Database,
    input: 'Pregunta Ejecutivo: "¿Cuáles fueron los 3 clientes con mayor margen de ganancia este mes?"',
    model: 'iAtomica SQL & Analytics Copilot',
    output: 'Gráficos analíticos + Reporte ejecutivo sintetizado',
    timeSaved: 'Respuesta en segundos vs horas de SQL',
    accuracy: '99.5%',
    steps: [
      { title: 'Traducción Lenguaje Natural -> SQL', desc: 'Generación segura de consulta a Data Warehouse PostgreSQL/Snowflake', status: 'done' },
      { title: 'Ejecución Sanetizada', desc: 'Consulta en réplica de lectura con cifrado E2E', status: 'done' },
      { title: 'Síntesis & Visualización', desc: 'Modelado de métricas clave y tabla comparativa', status: 'done' },
    ],
    jsonOutput: {
      query_executed: "SELECT customer_name, SUM(profit_margin) FROM sales WHERE date >= '2026-08-01' GROUP BY 1 ORDER BY 2 DESC LIMIT 3",
      top_customers: [
        { name: "Acme Imports Corp", margin_usd: 84500 },
        { name: "Global Logistics Ltd", margin_usd: 62100 },
        { name: "Vanguard Retail", margin_usd: 54900 }
      ],
      ai_summary: "El margen global aumentó un 14.2% impulsado por contratos internacionales en China."
    }
  }
];

export const AiAgentSimulator: React.FC = () => {
  const [activeScenarioId, setActiveScenarioId] = useState('ocr-invoice');
  const [isRunning, setIsRunning] = useState(false);
  const [executionStep, setExecutionStep] = useState(4);

  const scenario = SCENARIOS.find(s => s.id === activeScenarioId) || SCENARIOS[0];

  const handleRunSimulation = () => {
    setIsRunning(true);
    setExecutionStep(1);
    
    setTimeout(() => setExecutionStep(2), 600);
    setTimeout(() => setExecutionStep(3), 1200);
    setTimeout(() => {
      setExecutionStep(4);
      setIsRunning(false);
    }, 1800);
  };

  return (
    <section id="simulador" className="py-24 relative bg-slate-950/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Simulador Interactivo en Tiempo Real</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Vea a un <span className="text-gradient-cyan">Agente de IA</span> Trabajar en Vivo.
          </h2>
          <p className="mt-4 text-slate-400 text-base sm:text-lg">
            Seleccione uno de los escenarios de automatización empresariales de iAtomica y simule la ejecución de flujos de trabajo autónomos.
          </p>
        </div>

        {/* Scenario Selector Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {SCENARIOS.map(sc => {
            const Icon = sc.icon;
            const isActive = sc.id === activeScenarioId;
            return (
              <button
                key={sc.id}
                onClick={() => { setActiveScenarioId(sc.id); setExecutionStep(4); }}
                className={`p-5 rounded-2xl text-left transition-all flex items-start space-x-4 border ${
                  isActive
                    ? 'bg-slate-900/90 border-cyan-500/50 shadow-lg shadow-cyan-500/10'
                    : 'glass-panel border-slate-800/80 hover:border-slate-700'
                }`}
              >
                <div className={`p-3 rounded-xl ${isActive ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-cyan-400'}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-cyan-400 font-semibold">
                    {sc.category}
                  </span>
                  <h3 className="text-base font-bold text-white mt-0.5">{sc.title}</h3>
                </div>
              </button>
            );
          })}
        </div>

        {/* Main Simulation Workbench */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Workflow Steps & Execution Control */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl glass-panel border border-slate-800/80 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-slate-800 mb-6">
                <div>
                  <span className="text-xs font-mono text-slate-400">Escenario Activo</span>
                  <h3 className="text-xl font-bold text-white">{scenario.title}</h3>
                </div>

                <button
                  onClick={handleRunSimulation}
                  disabled={isRunning}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs shadow-lg shadow-cyan-500/20 flex items-center space-x-2 transition-all disabled:opacity-50"
                >
                  {isRunning ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4 fill-white" />}
                  <span>{isRunning ? 'Ejecutando Flujo...' : 'Ejecutar Agente IA'}</span>
                </button>
              </div>

              {/* Input / Output Snapshot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                  <span className="text-[10px] font-mono text-slate-400 uppercase">Input Trigger</span>
                  <p className="text-xs font-semibold text-slate-200 mt-1">{scenario.input}</p>
                </div>
                <div className="p-3.5 rounded-xl bg-cyan-950/30 border border-cyan-500/20">
                  <span className="text-[10px] font-mono text-cyan-400 uppercase">Model Core</span>
                  <p className="text-xs font-semibold text-cyan-200 mt-1">{scenario.model}</p>
                </div>
              </div>

              {/* Step by Step Execution Timeline */}
              <div className="space-y-4">
                <h4 className="text-xs font-mono uppercase text-slate-400 tracking-wider">Pasos del Flujo Autónomo:</h4>
                {scenario.steps.map((step, idx) => {
                  const stepNum = idx + 1;
                  const isDone = executionStep >= stepNum;
                  const isCurrent = executionStep === stepNum && isRunning;
                  return (
                    <div
                      key={idx}
                      className={`p-4 rounded-xl border transition-all flex items-start space-x-3 ${
                        isDone
                          ? 'bg-slate-900/90 border-slate-800'
                          : 'bg-slate-950/40 border-slate-900 opacity-60'
                      }`}
                    >
                      <div className="pt-0.5">
                        {isCurrent ? (
                          <RefreshCw className="w-5 h-5 text-cyan-400 animate-spin" />
                        ) : isDone ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                        ) : (
                          <div className="w-5 h-5 rounded-full border border-slate-700 flex items-center justify-center text-[10px] font-mono text-slate-500">
                            {stepNum}
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h5 className="text-sm font-bold text-slate-200">{step.title}</h5>
                          {isDone && <span className="text-[10px] font-mono text-emerald-400">PASSED</span>}
                        </div>
                        <p className="text-xs text-slate-400 mt-0.5">{step.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Metrics Footer */}
            <div className="mt-8 pt-6 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span>Ahorro Estimado: <strong className="text-cyan-400">{scenario.timeSaved}</strong></span>
              <span>Precisión: <strong className="text-emerald-400">{scenario.accuracy}</strong></span>
            </div>
          </div>

          {/* Right Column: Live Terminal Output (JSON Payload) */}
          <div className="lg:col-span-5 p-6 rounded-2xl glass-panel border border-slate-800/80 bg-slate-950 flex flex-col justify-between font-mono">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 text-xs text-slate-400 mb-4">
                <div className="flex items-center space-x-2">
                  <Terminal className="w-4 h-4 text-cyan-400" />
                  <span>OUTPUT TERMINAL STREAM</span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  LIVE JSON
                </span>
              </div>

              <div className="bg-slate-900/90 rounded-xl p-4 border border-slate-800 text-xs text-slate-300 overflow-x-auto min-h-[300px]">
                <pre className="text-cyan-300 font-mono">
                  {JSON.stringify(scenario.jsonOutput, null, 2)}
                </pre>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 text-[11px] text-slate-500 flex items-center justify-between">
              <span>Encadenamiento de Prompts v2.4</span>
              <span>Encabezado E2E SSL Encriptado</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
