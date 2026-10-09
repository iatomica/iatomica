import React, { useState } from 'react';
import { 
  Calculator, 
  ArrowRight, 
  Clock, 
  DollarSign, 
  TrendingUp 
} from 'lucide-react';

interface PopArtRoiCalculatorProps {
  onOpenBooking: () => void;
}

export const PopArtRoiCalculator: React.FC<PopArtRoiCalculatorProps> = ({
  onOpenBooking,
}) => {
  const [teamSize, setTeamSize] = useState<number>(5);
  const [hoursPerWeek, setHoursPerWeek] = useState<number>(15);
  const [hourlyRate, setHourlyRate] = useState<number>(25);

  // Calculations
  const weeklyHoursLost = teamSize * hoursPerWeek;
  const monthlyHoursLost = weeklyHoursLost * 4;
  const monthlyCostLost = monthlyHoursLost * hourlyRate;
  const annualCostLost = monthlyCostLost * 12;

  // With iAtomica (estimated 70% automation of repetitive tasks)
  const annualSavings = Math.round(annualCostLost * 0.7);
  const hoursRecoveredPerYear = Math.round(monthlyHoursLost * 12 * 0.7);

  return (
    <section id="roi-calc" className="w-full bg-[#FFF000] py-20 px-4 sm:px-8 border-b-4 border-black relative">
      
      {/* Halftone texture overlay */}
      <div className="absolute inset-0 bg-halftone opacity-25 pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-black text-[#FFF000] px-4 py-1.5 brutalist-border shadow-[3px_3px_0_#FFF000] mb-3">
            <Calculator size={16} />
            <span className="font-mono text-xs font-black uppercase tracking-widest">
              CALCULADORA DE RETORNO POP-ART
            </span>
          </div>

          <h2 className="font-bebas text-5xl sm:text-7xl lg:text-8xl text-black tracking-tight leading-none">
            ¿CUÁNTO DINERO ESTÁS <span className="text-[#FF165F] underline decoration-4 decoration-black">PERDIENDO?</span>
          </h2>
          
          <p className="font-mono text-sm sm:text-base text-neutral-900 max-w-xl mx-auto mt-3 font-bold">
            Ajustá los controles para estimar el costo oculto de las tareas manuales y el ahorro real que podés desbloquear con iAtomica.
          </p>
        </div>

        {/* Main Calculator Box */}
        <div className="bg-white brutalist-border-lg shadow-[10px_10px_0_#111] grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
          
          {/* Controls Column */}
          <div className="lg:col-span-7 p-6 sm:p-10 space-y-8 bg-[#F6F1E7]">
            
            {/* Slider 1: Team Size */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="font-bebas text-2xl text-black tracking-wide flex items-center space-x-2">
                  <span>1. MIEMBROS EN EL EQUIPO:</span>
                </label>
                <span className="font-mono text-xl font-black bg-[#FFF000] px-3 py-0.5 brutalist-border-sm">
                  {teamSize} personas
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="50"
                value={teamSize}
                onChange={(e) => setTeamSize(Number(e.target.value))}
                className="w-full h-3 bg-white border-2 border-black rounded-none appearance-none cursor-pointer accent-[#FF165F]"
              />
              <div className="flex justify-between font-mono text-[10px] text-neutral-600 font-bold">
                <span>1 persona</span>
                <span>25 personas</span>
                <span>50 personas</span>
              </div>
            </div>

            {/* Slider 2: Hours Per Week */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="font-bebas text-2xl text-black tracking-wide flex items-center space-x-2">
                  <span>2. HS MANUALES / SEMANA POR PERSONA:</span>
                </label>
                <span className="font-mono text-xl font-black bg-[#00A8F5] text-white px-3 py-0.5 brutalist-border-sm">
                  {hoursPerWeek} hs/sem
                </span>
              </div>
              <input
                type="range"
                min="5"
                max="40"
                value={hoursPerWeek}
                onChange={(e) => setHoursPerWeek(Number(e.target.value))}
                className="w-full h-3 bg-white border-2 border-black rounded-none appearance-none cursor-pointer accent-[#00A8F5]"
              />
              <div className="flex justify-between font-mono text-[10px] text-neutral-600 font-bold">
                <span>5 hs (mínimo)</span>
                <span>20 hs (medio)</span>
                <span>40 hs (tiempo completo)</span>
              </div>
            </div>

            {/* Slider 3: Hourly Rate */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="font-bebas text-2xl text-black tracking-wide flex items-center space-x-2">
                  <span>3. COSTO ESTIMADO POR HORA (USD):</span>
                </label>
                <span className="font-mono text-xl font-black bg-[#00E575] text-black px-3 py-0.5 brutalist-border-sm">
                  ${hourlyRate} USD/h
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                step="5"
                value={hourlyRate}
                onChange={(e) => setHourlyRate(Number(e.target.value))}
                className="w-full h-3 bg-white border-2 border-black rounded-none appearance-none cursor-pointer accent-[#00E575]"
              />
              <div className="flex justify-between font-mono text-[10px] text-neutral-600 font-bold">
                <span>$10/h</span>
                <span>$50/h</span>
                <span>$100/h</span>
              </div>
            </div>

            {/* Explanatory note */}
            <div className="p-3 bg-white brutalist-border-sm font-mono text-xs text-neutral-700">
              💡 <strong>¿Qué cuenta como tarea manual?</strong> Copiar y pegar datos entre sistemas, responder las mismas dudas en WhatsApp, conciliar planillas de cálculo, armar reportes manuales y enviar emails repetitivos.
            </div>

          </div>

          {/* Results Column */}
          <div className="lg:col-span-5 p-6 sm:p-10 bg-black text-white flex flex-col justify-between border-t-4 lg:border-t-0 lg:border-l-4 border-black relative">
            
            <div>
              <div className="inline-block bg-[#FF165F] text-white px-2.5 py-0.5 font-mono text-xs font-black uppercase tracking-wider mb-4">
                IMPACTO ESTIMADO ANUAL
              </div>

              {/* Big Savings Number */}
              <div className="mb-6">
                <span className="font-mono text-xs uppercase text-neutral-400 block tracking-widest">
                  AHORRO POTENCIAL ANUAL:
                </span>
                <span className="font-bebas text-6xl sm:text-7xl text-[#FFF000] tracking-tight block leading-none">
                  ${annualSavings.toLocaleString()} USD
                </span>
                <span className="font-mono text-xs text-[#00E575] font-bold">
                  ▲ Recuperás hasta un 70% del tiempo operativo
                </span>
              </div>

              {/* Metric Breakdown */}
              <div className="space-y-3 border-t border-neutral-800 pt-4 font-mono text-xs">
                <div className="flex justify-between items-center py-1 border-b border-neutral-900">
                  <span className="text-neutral-400 flex items-center space-x-1.5">
                    <Clock size={14} />
                    <span>Horas recuperadas al año:</span>
                  </span>
                  <span className="font-bold text-white text-sm">
                    {hoursRecoveredPerYear.toLocaleString()} hrs
                  </span>
                </div>

                <div className="flex justify-between items-center py-1 border-b border-neutral-900">
                  <span className="text-neutral-400 flex items-center space-x-1.5">
                    <DollarSign size={14} />
                    <span>Costo actual desperdiciado:</span>
                  </span>
                  <span className="font-bold text-[#FF165F] text-sm">
                    ${annualCostLost.toLocaleString()} USD/año
                  </span>
                </div>

                <div className="flex justify-between items-center py-1 border-b border-neutral-900">
                  <span className="text-neutral-400 flex items-center space-x-1.5">
                    <TrendingUp size={14} />
                    <span>Multiplicador de capacidad:</span>
                  </span>
                  <span className="font-bold text-[#00A8F5] text-sm">
                    3.3x Capacidad
                  </span>
                </div>
              </div>
            </div>

            {/* CTA in Results */}
            <div className="pt-6">
              <button
                onClick={onOpenBooking}
                className="w-full flex items-center justify-center space-x-2 py-4 bg-[#FF165F] text-white font-bebas text-2xl tracking-wider brutalist-btn cursor-pointer shadow-[4px_4px_0_#FFF000] hover:bg-[#e00d50]"
              >
                <span>RECUPERÁ ESTE DINERO AHORA</span>
                <ArrowRight size={20} />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
