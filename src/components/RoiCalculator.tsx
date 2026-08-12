import React, { useState } from 'react';
import { Calculator, DollarSign, Clock, Sparkles, CheckCircle } from 'lucide-react';

interface RoiCalculatorProps {
  onOpenBooking: () => void;
}

export const RoiCalculator: React.FC<RoiCalculatorProps> = ({ onOpenBooking }) => {
  const [employees, setEmployees] = useState<number>(15);
  const [hoursPerWeek, setHoursPerWeek] = useState<number>(12);
  const [hourlyCostUsd, setHourlyCostUsd] = useState<number>(25);

  // Calculations
  const automationEfficiencyFactor = 0.80; // 80% automation rate
  const totalWeeklyManualHours = employees * hoursPerWeek;
  const weeklyHoursSaved = Math.round(totalWeeklyManualHours * automationEfficiencyFactor);
  const monthlyHoursSaved = Math.round(weeklyHoursSaved * 4.2);
  const annualHoursSaved = Math.round(weeklyHoursSaved * 52);

  const monthlySavingsUsd = Math.round(monthlyHoursSaved * hourlyCostUsd);
  const annualSavingsUsd = Math.round(annualHoursSaved * hourlyCostUsd);
  const estimatedRoiPercent = Math.round((annualSavingsUsd / 12000) * 100);

  return (
    <section id="calculadora" className="py-24 relative bg-grid-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-mono mb-4">
            <Calculator className="w-3.5 h-3.5" />
            <span>Calculadora de Impacto Financiero</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            ¿Cuánto Puede <span className="text-gradient-violet">Ahorrar su Empresa</span> con IA?
          </h2>
          <p className="mt-4 text-slate-400 text-base sm:text-lg">
            Ajuste las variables operativas de su equipo para calcular el retorno de inversión y las horas liberadas mensualmente.
          </p>
        </div>

        {/* Calculator Widget Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Sliders Input Panel */}
          <div className="lg:col-span-6 p-6 sm:p-8 rounded-2xl glass-panel border border-slate-800/80 flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-white flex items-center space-x-2">
                <SlidersIcon className="w-5 h-5 text-cyan-400" />
                <span>Parámetros Operativos</span>
              </h3>

              {/* Slider 1: Employees */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <label className="text-slate-300 font-medium">Colaboradores en tareas operativas:</label>
                  <span className="font-mono font-bold text-cyan-400 text-base">{employees} personas</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="150"
                  value={employees}
                  onChange={(e) => setEmployees(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>2 personas</span>
                  <span>150 personas</span>
                </div>
              </div>

              {/* Slider 2: Hours per Week */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <label className="text-slate-300 font-medium">Horas manuales por semana / persona:</label>
                  <span className="font-mono font-bold text-purple-400 text-base">{hoursPerWeek} hs/sem</span>
                </div>
                <input
                  type="range"
                  min="4"
                  max="40"
                  value={hoursPerWeek}
                  onChange={(e) => setHoursPerWeek(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>4 hs</span>
                  <span>40 hs</span>
                </div>
              </div>

              {/* Slider 3: Hourly Cost */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <label className="text-slate-300 font-medium">Costo promedio hora/hombre (USD):</label>
                  <span className="font-mono font-bold text-emerald-400 text-base">${hourlyCostUsd} USD/h</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="120"
                  value={hourlyCostUsd}
                  onChange={(e) => setHourlyCostUsd(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>$10 USD</span>
                  <span>$120 USD</span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-400 space-y-2">
              <div className="flex items-center space-x-2 text-cyan-400 font-medium">
                <CheckCircle className="w-4 h-4" />
                <span>Factor de Eficiencia IAtomica: 80% Automatizable</span>
              </div>
              <p>Basado en integraciones promedio de Agentes IA, OCR de facturación y bots conversacionales.</p>
            </div>
          </div>

          {/* Results Display Panel */}
          <div className="lg:col-span-6 p-6 sm:p-8 rounded-2xl glass-card border border-cyan-500/30 flex flex-col justify-between relative overflow-hidden bg-gradient-to-br from-slate-900/90 via-slate-950 to-slate-950">
            <div className="ambient-glow-cyan top-0 right-0 -mr-20 -mt-20 opacity-30" />
            
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold">
                PROYECCIÓN DE IMPACTO DIRECTO
              </span>
              <h3 className="text-2xl font-extrabold text-white mt-1">Resultados Estimados</h3>

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Metric 1 */}
                <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
                  <div className="flex items-center space-x-2 text-slate-400 text-xs mb-1">
                    <Clock className="w-4 h-4 text-cyan-400" />
                    <span>Horas Liberadas / Mes</span>
                  </div>
                  <p className="text-3xl font-extrabold text-cyan-400 font-mono">
                    {monthlyHoursSaved.toLocaleString()} <span className="text-xs text-slate-400">hs</span>
                  </p>
                  <span className="text-[10px] text-slate-500">~{annualHoursSaved.toLocaleString()} hs/año</span>
                </div>

                {/* Metric 2 */}
                <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
                  <div className="flex items-center space-x-2 text-slate-400 text-xs mb-1">
                    <DollarSign className="w-4 h-4 text-emerald-400" />
                    <span>Ahorro Estimado / Año</span>
                  </div>
                  <p className="text-3xl font-extrabold text-emerald-400 font-mono">
                    ${annualSavingsUsd.toLocaleString()} <span className="text-xs text-slate-400">USD</span>
                  </p>
                  <span className="text-[10px] text-slate-500">${monthlySavingsUsd.toLocaleString()} USD / mes</span>
                </div>
              </div>

              {/* Big ROI Box */}
              <div className="mt-6 p-5 rounded-xl bg-gradient-to-r from-purple-950/40 via-slate-900 to-cyan-950/40 border border-purple-500/30 flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono text-purple-300 font-semibold">RETORNO ESTIMADO (ROI)</span>
                  <p className="text-3xl font-black text-white font-mono mt-0.5">+{estimatedRoiPercent}%</p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-mono text-slate-400">Payback Estimado</span>
                  <p className="text-sm font-bold text-cyan-300 font-mono">35 - 60 Días</p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-slate-400">¿Quiere validar este cálculo con la arquitectura de su empresa?</span>
              <button
                onClick={onOpenBooking}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs shadow-lg shadow-cyan-500/20 flex items-center justify-center space-x-2 transition-all whitespace-nowrap"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Solicitar Auditoría IA Gratis</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

const SlidersIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
  </svg>
);
