import React from 'react';
import Link from 'next/link';
import { Calculator, TrendingUp } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Herramientas Financieras | Hablemos de Economía',
  description: 'Herramientas y calculadoras financieras de Hablemos de Economía.',
};

export default function HerramientasPage() {
  return (
    <div className='p-6 bg-neutral-950 text-neutral-100 min-h-full'>
      <h1 className='font-serif text-3xl font-normal text-neutral-100 tracking-tight mb-6'>Herramientas Financieras</h1>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>

        {/* Herramienta 1: Calculadora de Inflación */}
        <Link href='/herramientas/inflacion' className='group relative block bg-neutral-900/30 hover:bg-neutral-900/60 border border-neutral-800 hover:border-neutral-700 transition-all rounded-xl p-6'>
          <div className='w-10 h-10 rounded-lg bg-neutral-800/60 border border-neutral-700/50 flex items-center justify-center text-neutral-300 mb-4 group-hover:scale-110 transition-transform'>
            <TrendingUp size={20} />
          </div>
          <h2 className='font-serif text-lg font-semibold text-neutral-100 mb-1.5'>Inflación Acumulada Histórica</h2>
          <p className='text-xs text-neutral-400 leading-relaxed'>
            Calculá cuánto poder adquisitivo perdió tu dinero desde 2002 hasta hoy.
          </p>
        </Link>

        {/* Herramienta 2: Rendimiento Billeteras */}
        <Link href='/herramientas/billeteras' className='group relative block bg-neutral-900/30 hover:bg-neutral-900/60 border border-neutral-800 hover:border-neutral-700 transition-all rounded-xl p-6'>
          <div className='w-10 h-10 rounded-lg bg-neutral-800/60 border border-neutral-700/50 flex items-center justify-center text-neutral-300 mb-4 group-hover:scale-110 transition-transform'>
            <Calculator size={20} />
          </div>
          <h2 className='font-serif text-lg font-semibold text-neutral-100 mb-1.5'>Rendimiento Billeteras</h2>
          <p className='text-xs text-neutral-400 leading-relaxed'>
            Compará en tiempo real qué billetera te paga más según tu capital y sus topes.
          </p>
        </Link>

      </div>
    </div>
  );
}
