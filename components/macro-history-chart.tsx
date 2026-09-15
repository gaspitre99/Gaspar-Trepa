'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface Era {
  id: string;
  name: string;
  year: string;
  peakInflation: string;
  description: string;
}

const ERAS: Era[] = [
  {
    id: 'rodrigazo',
    name: 'El Rodrigazo',
    year: '1975',
    peakInflation: '182%',
    description: 'Fuerte devaluación y shock de precios tras intentar corregir los desequilibrios acumulados. Marcó el inicio de una alta inflación persistente en Argentina.'
  },
  {
    id: 'hiper',
    name: 'Hiperinflación',
    year: '1989-1990',
    peakInflation: '3.079%',
    description: 'Colapso total del Austral, corrida cambiaria y remarcación de precios diaria. Destrucción del poder adquisitivo y crisis institucional.'
  },
  {
    id: 'convertibilidad',
    name: 'Convertibilidad',
    year: '1991-2001',
    peakInflation: '0% (aprox)',
    description: 'Fijación por ley de 1 Peso = 1 Dólar. Frenó la inflación de raíz, pero acumuló desequilibrios fiscales y externos que llevaron a la crisis de 2001.'
  },
  {
    id: 'salida',
    name: 'Salida y Megadevaluación',
    year: '2002',
    peakInflation: '40.9%',
    description: 'Ruptura del 1 a 1, pesificación asimétrica y default. El dólar saltó de $1 a casi $4, licuando pasivos pero también salarios.'
  },
  {
    id: 'presente',
    name: 'Estanflación Moderna',
    year: '2023-Presente',
    peakInflation: '211%',
    description: 'Aceleración inflacionaria con alta emisión monetaria, cepos cambiarios múltiples y falta de reservas, en transición hacia un nuevo régimen.'
  }
];

export default function MacroHistoryChart() {
  const [activeEra, setActiveEra] = useState<Era>(ERAS[4]); // default present

  return (
    <div className='p-6 bg-white border rounded-xl shadow-sm w-full mx-auto max-w-2xl'>
      <h2 className='text-2xl font-bold mb-6 text-slate-900'>Explorador Macro Histórico</h2>

      <div className='flex flex-wrap gap-2 mb-6'>
        {ERAS.map((era) => (
          <button
            key={era.id}
            onClick={() => setActiveEra(era)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-full border transition-all ${
              activeEra.id === era.id
                ? 'bg-blue-900 text-white border-blue-900 shadow-md'
                : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100 hover:text-blue-900'
            }`}
          >
            {era.year}
          </button>
        ))}
      </div>

      <div className='bg-slate-50 border p-5 rounded-lg mb-6'>
        <div className='flex justify-between items-start mb-4'>
          <div>
            <h3 className='text-xl font-bold text-blue-900'>{activeEra.name}</h3>
            <span className='text-sm text-slate-500'>Año: {activeEra.year}</span>
          </div>
          <div className='text-right'>
            <span className='block text-xs font-semibold text-slate-500 uppercase'>Inflación Pico</span>
            <span className='text-2xl font-black text-rose-600'>{activeEra.peakInflation}</span>
          </div>
        </div>
        <p className='text-sm text-slate-700 leading-relaxed'>
          {activeEra.description}
        </p>
      </div>

      <div className='bg-emerald-50 border border-emerald-100 p-4 rounded-lg flex flex-col sm:flex-row items-center justify-between gap-4'>
        <div className='text-sm text-emerald-900'>
          <p className='font-semibold'>Para entender el presente, hay que estudiar el pasado.</p>
          <p className='text-xs opacity-80 mt-1'>Descubrí cómo estos ciclos impactan tus inversiones hoy.</p>
        </div>
        <Link href='/search' className='shrink-0 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold px-4 py-2 rounded-md transition-colors'>
          Curso de Historia Económica
        </Link>
      </div>
    </div>
  );
}
