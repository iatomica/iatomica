import React, { useState } from 'react';
import { Bot, Send, X, User, Calendar } from 'lucide-react';

interface AiChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  darkMode?: boolean;
}

interface Message {
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
  showCta?: boolean;
}

export const AiChatModal: React.FC<AiChatModalProps> = ({ isOpen, onClose }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'bot',
      text: '¡Hola! Soy **Atomica AI Assistant 2.0**. Puedo resolver tus dudas sobre integración de Agentes de IA, automatización de procesos n8n/Make o estimar el presupuesto para tu empresa. ¿En qué te puedo ayudar hoy?',
      timestamp: 'Ahora'
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  if (!isOpen) return null;

  const handleSendMessage = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg: Message = {
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    setTimeout(() => {
      let botResponse = 'Excelente pregunta. En **iAtomica 2.0** diseñamos arquitecturas de IA a medida según las necesidades de tu empresa. Podemos integrar agentes RAG con tus bases de datos, desplegar bots de WhatsApp 2.0 y automatizar tus flujos de trabajo.';
      let showCta = false;

      const lower = query.toLowerCase();
      if (lower.includes('servicio') || lower.includes('hacen')) {
        botResponse = 'Nuestros pilares principales son:\n1. Agentes IA Autónomos & RAG Enterprise.\n2. Automatizaciones de procesos (n8n/Make/APIs).\n3. Chatbots WhatsApp 24/7 con integración CRM.\n4. Desarrollo de software web/mobile de alta performance.';
      } else if (lower.includes('whatsapp') || lower.includes('crm')) {
        botResponse = 'Integración oficial WhatsApp Business API con enrutamiento inteligente. El agente de IA puede consultar stock en tiempo real, enviar cotizaciones PDF y derivar a un operador humano cuando sea necesario.';
        showCta = true;
      } else if (lower.includes('costo') || lower.includes('precio') || lower.includes('presupuesto')) {
        botResponse = 'Cada solución se cotiza según la complejidad de la arquitectura y las integraciones requeridas. Ofrecemos una **Auditoría Inicial de IA 100% Gratuita** donde evaluamos tus procesos y te entregamos una propuesta con retorno estimado.';
        showCta = true;
      } else if (lower.includes('cita') || lower.includes('agendar') || lower.includes('llamar') || lower.includes('reunión')) {
        botResponse = '¡Genial! Puedes agendar una llamada de 15 minutos directamente con nuestro equipo de ingeniería.';
        showCta = true;
      }

      setMessages(prev => [
        ...prev,
        {
          sender: 'bot',
          text: botResponse,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          showCta
        }
      ]);
      setIsTyping(false);
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-xl bg-slate-950 border border-cyan-500/30 rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[600px] relative">
        
        {/* Modal Header */}
        <div className="p-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                Atomica AI Assistant <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-400 font-mono">v2.0</span>
              </h3>
              <p className="text-[11px] text-slate-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                <span>En línea &bull; Respuesta Inmediata</span>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Chat Messages Body */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-950/80 font-sans text-xs">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex items-start space-x-2.5 ${m.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}
            >
              <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs shrink-0 ${
                m.sender === 'user' ? 'bg-purple-600 text-white' : 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
              }`}>
                {m.sender === 'user' ? <User size={14} /> : <Bot size={14} />}
              </div>

              <div className={`max-w-[80%] p-3.5 rounded-2xl ${
                m.sender === 'user'
                  ? 'bg-purple-600/20 border border-purple-500/30 text-purple-100 rounded-tr-none'
                  : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none'
              }`}>
                <p className="whitespace-pre-line leading-relaxed">{m.text}</p>

                {m.showCta && (
                  <a
                    href="https://calendly.com/contacto-iatomica/30min"
                    target="_blank"
                    rel="noreferrer"
                    onClick={onClose}
                    className="mt-3 px-3 py-1.5 rounded-lg bg-orange-500 hover:bg-orange-400 text-white font-bold text-[11px] flex items-center space-x-1.5 transition-colors inline-flex"
                  >
                    <Calendar size={12} />
                    <span>Agendar Cita en Calendly</span>
                  </a>
                )}

                <span className="text-[9px] text-slate-500 block text-right mt-1 font-mono">{m.timestamp}</span>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center space-x-2 text-slate-400 text-xs">
              <Bot size={14} className="text-cyan-400 animate-spin" />
              <span>Atomica AI está escribiendo...</span>
            </div>
          )}
        </div>

        {/* Suggested Quick Prompts */}
        <div className="p-2.5 bg-slate-900/60 border-t border-slate-800/80 flex items-center space-x-2 overflow-x-auto text-[11px]">
          <button
            onClick={() => handleSendMessage('¿Qué servicios de IA ofrecen?')}
            className="px-2.5 py-1 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 whitespace-nowrap border border-slate-700"
          >
            ¿Qué servicios ofrecen?
          </button>
          <button
            onClick={() => handleSendMessage('¿Cómo integran WhatsApp con mi CRM?')}
            className="px-2.5 py-1 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 whitespace-nowrap border border-slate-700"
          >
            Integración WhatsApp
          </button>
          <button
            onClick={() => handleSendMessage('Quiero agendar una reunión')}
            className="px-2.5 py-1 rounded-full bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 whitespace-nowrap border border-cyan-500/30"
          >
            Agendar Reunión
          </button>
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-slate-900 border-t border-slate-800 flex items-center space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Escriba su consulta sobre Inteligencia Artificial..."
            className="flex-1 px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
          <button
            onClick={() => handleSendMessage()}
            className="p-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold transition-colors"
          >
            <Send size={16} />
          </button>
        </div>

      </div>
    </div>
  );
};
