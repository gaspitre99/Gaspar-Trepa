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
      <h1 className='text-3xl font-bold text-slate-800 mb-6'>Herramientas Financieras</h1>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>

        {/* Herramienta 1: Calculadora de Inflación */}
        <Link href='/herramientas/inflacion' className='group relative block p-6 bg-white rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow'>
          <div className='flex items-center justify-center w-12 h-12 bg-blue-100 text-blue-600 rounded-xl mb-4 group-hover:scale-110 transition-transform'>
            <TrendingUp size={24} />
          </div>
          <h2 className='text-lg font-bold text-slate-800 mb-2'>Inflación Acumulada Histórica</h2>
          <p className='text-sm text-slate-500'>
            Calculá cuánto poder adquisitivo perdió tu dinero desde 2002 hasta hoy.
          </p>
        </Link>

        {/* Herramienta 2 (Placeholder from previous context) */}
        <div className='group relative block p-6 bg-white rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow opacity-60 cursor-not-allowed'>
          <div className='flex items-center justify-center w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl mb-4'>
            <Calculator size={24} />
          </div>
          <h2 className='text-lg font-bold text-slate-800 mb-2'>Calculadora Real vs Inflación</h2>
          <p className='text-sm text-slate-500'>
            Simulador de rendimiento real de inversiones frente a la inflación mensual. (En desarrollo)
          </p>
        </div>

      </div>
    </div>
  );
}
