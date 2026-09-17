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
    <div className='p-6'>
      <h1 className='font-serif text-3xl font-medium tracking-tight text-slate-900 dark:text-slate-100 mb-6'>Herramientas Financieras</h1>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>

        {/* Herramienta 1: Calculadora de Inflación */}
        <Link href='/herramientas/inflacion' className='group relative block p-6 bg-white dark:bg-slate-900 rounded-md shadow-sm border border-slate-200 dark:border-slate-800 hover:shadow-md transition-shadow'>
          <div className='flex items-center justify-center w-12 h-12 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-md mb-4 group-hover:scale-110 transition-transform'>
            <TrendingUp size={24} />
          </div>
          <h2 className='font-serif text-lg font-medium text-slate-900 dark:text-slate-100 mb-2'>Inflación Acumulada Histórica</h2>
          <p className='text-sm text-slate-500'>
            Calculá cuánto poder adquisitivo perdió tu dinero desde 2002 hasta hoy.
          </p>
        </Link>

        {/* Herramienta 2: Rendimiento Billeteras */}
        <Link href='/herramientas/billeteras' className='group relative block p-6 bg-white dark:bg-slate-900 rounded-md shadow-sm border border-slate-200 dark:border-slate-800 hover:shadow-md transition-shadow'>
          <div className='flex items-center justify-center w-12 h-12 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-md mb-4 group-hover:scale-110 transition-transform'>
            <Calculator size={24} />
          </div>
          <h2 className='font-serif text-lg font-medium text-slate-900 dark:text-slate-100 mb-2'>Rendimiento Billeteras</h2>
          <p className='text-sm text-slate-500'>
            Compará en tiempo real qué billetera te paga más según tu capital y sus topes.
          </p>
        </Link>

      </div>
    </div>
  );
}
