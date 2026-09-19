import React from 'react';
import Link from 'next/link';
import { Calculator, TrendingUp, Sliders, LineChart, Wallet } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Herramientas Financieras | Hablemos de Economía',
  description: 'Herramientas y calculadoras financieras de Hablemos de Economía.',
};

export default function HerramientasPage() {
  return (
    <div className='p-6 min-h-screen bg-neutral-950 text-neutral-100'>
      <h1 className='font-serif text-3xl font-medium tracking-tight mb-8'>Herramientas Financieras</h1>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>

        {/* Herramienta 1: Inflación Acumulada */}
        <Link href='/herramientas/inflacion-acumulada' className='group relative block p-6 bg-neutral-900/40 hover:bg-neutral-900/80 rounded-md border border-neutral-800 hover:border-neutral-700 transition-all'>
          <div className='flex items-center justify-center w-12 h-12 bg-neutral-800 text-sky-400 rounded-md mb-4 group-hover:scale-110 transition-transform'>
            <LineChart size={24} />
          </div>
          <h2 className='font-serif text-lg font-medium text-neutral-100 mb-2'>Inflación Acumulada Histórica</h2>
          <p className='text-sm text-neutral-400'>
            Calculá la pérdida de poder adquisitivo y analizá la serie histórica 2002-presente.
          </p>
        </Link>

        {/* Herramienta 2: Tasa Real vs Inflación */}
        <Link href='/herramientas/real-vs-inflacion' className='group relative block p-6 bg-neutral-900/40 hover:bg-neutral-900/80 rounded-md border border-neutral-800 hover:border-neutral-700 transition-all'>
          <div className='flex items-center justify-center w-12 h-12 bg-neutral-800 text-sky-400 rounded-md mb-4 group-hover:scale-110 transition-transform'>
            <Sliders size={24} />
          </div>
          <h2 className='font-serif text-lg font-medium text-neutral-100 mb-2'>Tasa Real vs Inflación</h2>
          <p className='text-sm text-neutral-400'>
            Simulá el rendimiento mensual de tu capital en pesos descontando la inflación proyectada.
          </p>
        </Link>

        {/* Herramienta 3: Rendimiento Billeteras */}
        <Link href='/herramientas/billeteras' className='group relative block p-6 bg-neutral-900/40 hover:bg-neutral-900/80 rounded-md border border-neutral-800 hover:border-neutral-700 transition-all'>
          <div className='flex items-center justify-center w-12 h-12 bg-neutral-800 text-sky-400 rounded-md mb-4 group-hover:scale-110 transition-transform'>
            <Wallet size={24} />
          </div>
          <h2 className='font-serif text-lg font-medium text-neutral-100 mb-2'>Rendimiento Billeteras</h2>
          <p className='text-sm text-neutral-400'>
            Compará en tiempo real qué cuenta remunerada paga más según tu saldo y topes.
          </p>
        </Link>

      </div>
    </div>
  );
}
