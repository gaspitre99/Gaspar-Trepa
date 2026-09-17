import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Panel Principal",
  description: "Tu panel de control de Hablemos de Economía. Accede a herramientas, calculadoras y análisis de mercado.",
};

export const dynamic = "force-dynamic";

import { UserButton } from "@clerk/nextjs";
import CalculadoraInflacion from "@/components/calculadora-inflacion";
import PortfolioRoulette from "@/components/portfolio-roulette";
import Link from 'next/link';
import { Calculator, TrendingUp } from 'lucide-react';

export default function Home() {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Inicio</h1>
        <UserButton afterSignOutUrl="/"/>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start mb-8">
        <PortfolioRoulette />
        <CalculadoraInflacion />
      </div>

      <h2 className="text-xl font-bold text-slate-200 mb-4 font-serif">Otras Herramientas</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link href='/herramientas/inflacion' className='group relative block p-6 bg-slate-900/50 rounded-md shadow-sm border border-slate-800 hover:border-slate-700 transition-colors'>
          <div className='flex items-center justify-center w-12 h-12 bg-slate-800 text-emerald-400 rounded-md mb-4 group-hover:scale-110 transition-transform'>
            <TrendingUp size={24} />
          </div>
          <h2 className='font-serif text-lg font-medium text-slate-200 mb-2'>Inflación Acumulada Histórica</h2>
          <p className='text-sm text-slate-400'>
            Calculá cuánto poder adquisitivo perdió tu dinero desde 2002 hasta hoy.
          </p>
        </Link>

        <Link href='/herramientas/billeteras' className='group relative block p-6 bg-slate-900/50 rounded-md shadow-sm border border-slate-800 hover:border-slate-700 transition-colors'>
          <div className='flex items-center justify-center w-12 h-12 bg-slate-800 text-emerald-400 rounded-md mb-4 group-hover:scale-110 transition-transform'>
            <Calculator size={24} />
          </div>
          <h2 className='font-serif text-lg font-medium text-slate-200 mb-2'>Rendimiento Billeteras</h2>
          <p className='text-sm text-slate-400'>
            Compará en tiempo real qué billetera te paga más según tu capital y sus topes.
          </p>
        </Link>
      </div>
    </div>
  )
}
