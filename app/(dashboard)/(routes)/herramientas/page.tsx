import React from 'react';
import dynamic from 'next/dynamic';

const PortfolioRoulette = dynamic(() => import('@/components/portfolio-roulette'), { ssr: false });
const CalculadoraInflacion = dynamic(() => import('@/components/calculadora-inflacion'), { ssr: false });
const BreakevenCalculator = dynamic(() => import('@/components/breakeven-calculator'), { ssr: false });
const MacroHistoryChart = dynamic(() => import('@/components/macro-history-chart'), { ssr: false });

export default function HerramientasPage() {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Hub de Herramientas</h1>
        <p className="text-slate-500 mt-2">Simuladores, calculadoras e interactivos para potenciar tus inversiones.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Row 1 */}
        <PortfolioRoulette />
        <CalculadoraInflacion />

        {/* Row 2 */}
        <BreakevenCalculator />
        <MacroHistoryChart />
      </div>
    </div>
  );
}
