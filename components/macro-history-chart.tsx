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
    <div className='p-6 bg-slate-900/70 border border-slate-800 rounded-xl shadow-sm w-full mx-auto max-w-2xl text-slate-100'>
      <h2 className='text-2xl font-bold mb-6 text-white'>Explorador Macro Histórico</h2>

      <div className='flex flex-wrap gap-2 mb-6'>
        {ERAS.map((era) => (
          <button
            key={era.id}
            onClick={() => setActiveEra(era)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-full border transition-all ${
              activeEra.id === era.id
                ? 'bg-slate-800 text-white border-slate-600 shadow-md'
                : 'bg-slate-950 text-slate-400 border-slate-800 hover:bg-slate-800 hover:text-slate-200'
            }`}
          >
            {era.year}
          </button>
        ))}
      </div>

      <div className='bg-slate-950 border border-slate-800 p-5 rounded-lg mb-6'>
        <div className='flex justify-between items-start mb-4'>
          <div>
            <h3 className='text-xl font-bold text-white'>{activeEra.name}</h3>
            <span className='text-sm text-slate-400'>Año: {activeEra.year}</span>
          </div>
          <div className='text-right'>
            <span className='block text-xs font-semibold text-slate-500 uppercase'>Inflación Pico</span>
            <span className='text-2xl font-black text-rose-500'>{activeEra.peakInflation}</span>
          </div>
        </div>
        <p className='text-sm text-slate-300 leading-relaxed'>
          {activeEra.description}
        </p>
      </div>

      <div className='bg-emerald-950/30 border border-emerald-900/50 p-4 rounded-lg flex flex-col sm:flex-row items-center justify-between gap-4'>
        <div className='text-sm text-emerald-100'>
          <p className='font-semibold'>Para entender el presente, hay que estudiar el pasado.</p>
          <p className='text-xs text-emerald-200/70 mt-1'>Descubrí cómo estos ciclos impactan tus inversiones hoy.</p>
        </div>
        <Link href='/search' className='shrink-0 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold px-4 py-2 rounded-md transition-colors'>
          Curso de Historia Económica
        </Link>
      </div>
    </div>
  );
}
