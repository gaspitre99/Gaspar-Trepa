'use client';

import React, { useState, useEffect } from 'react';
import { formatPrice } from '@/lib/format';
import confetti from 'canvas-confetti';
import Link from 'next/link';

export default function CalculadoraInflacion() {
  const [capital, setCapital] = useState<number>(100000);
  const [tna, setTna] = useState<number>(60);
  const [inflacion, setInflacion] = useState<number>(4);

  const tasaMensualNominal = tna / 12 / 100;
  const tasaMensualInflacion = inflacion / 100;

  const capitalFinalNominal = capital * (1 + tasaMensualNominal);
  const poderAdquisitivoNecesario = capital * (1 + tasaMensualInflacion);
  const gananciaReal = capitalFinalNominal - poderAdquisitivoNecesario;

  const isPositivo = gananciaReal > 0;
  const realYieldPercentage = (gananciaReal / capital) * 100;

  useEffect(() => {
    if (realYieldPercentage > 5) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#34d399', '#059669', '#10b981']
      });
    }
  }, [realYieldPercentage]);

  // Tangible metrics
  const kilosAsado = Math.floor(Math.abs(gananciaReal) / 6000); // approx $6000 ARS / kg asado
  const dolaresMep = 1050 > 0 ? (Math.abs(gananciaReal) / 1050).toFixed(2) : '—'; // approx $1050 ARS / USD MEP

  return (
    <div className="p-6 rounded-md shadow-sm border border-slate-800 bg-slate-900/50 transition-all duration-500 max-w-md mx-auto w-full relative overflow-hidden">

      <h2 className='font-serif text-3xl font-medium tracking-tight text-slate-200 mb-6 relative z-10'>Calculadora Real vs Inflación</h2>

      <div className='space-y-6 relative z-10'>
        <div>
          <div className="flex justify-between mb-2">
            <label className="text-[11px] font-bold uppercase tracking-widest text-slate-400">Capital Inicial: <span className="font-mono tabular-nums">{formatPrice(capital)}</span></label>
          </div>
          <input
            type='range'
            min="10000"
            max="10000000"
            step="10000"
            value={capital}
            onChange={(e) => setCapital(Number(e.target.value))}
            className="w-full accent-emerald-500"
          />
        </div>

        <div>
          <div className="flex justify-between mb-2">
            <label className="text-[11px] font-bold uppercase tracking-widest text-slate-400">TNA Estimada: <span className="font-mono tabular-nums">{tna}%</span></label>
          </div>
          <input
            type='range'
            min="0"
            max="200"
            step="1"
            value={tna}
            onChange={(e) => setTna(Number(e.target.value))}
            className="w-full accent-slate-500"
          />
        </div>

        <div>
          <div className="flex justify-between mb-2">
            <label className="text-[11px] font-bold uppercase tracking-widest text-slate-400">Inflación Mensual: <span className="font-mono tabular-nums">{inflacion}%</span></label>
          </div>
          <input
            type='range'
            min="0"
            max="20"
            step="0.1"
            value={inflacion}
            onChange={(e) => setInflacion(Number(e.target.value))}
            className="w-full accent-slate-500"
          />
        </div>
      </div>

      <div className='mt-8 space-y-3 p-4 bg-slate-800/50 rounded-md border border-slate-700 relative z-10'>
        <div className='flex justify-between items-center'>
          <span className='text-[11px] font-bold uppercase tracking-widest text-slate-400'>Nominal (1 mes):</span>
          <span className='font-mono font-bold tracking-tight tabular-nums text-slate-200'>{formatPrice(capitalFinalNominal)}</span>
        </div>
        <div className='flex justify-between items-center pt-3 border-t border-slate-700'>
          <span className='text-[11px] font-bold uppercase tracking-widest text-slate-400'>Resultado Real:</span>
          <span className={`font-mono font-bold tracking-tight tabular-nums text-lg ${isPositivo ? 'text-emerald-400' : 'text-rose-400'}`}>
            {isPositivo ? '+' : ''}{formatPrice(gananciaReal)}
          </span>
        </div>

        <div className='mt-4 pt-4 border-t border-slate-700'>
          <div className="text-center text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-2">
            {isPositivo ? 'Poder Adquisitivo Preservado:' : 'Poder Adquisitivo Perdido:'}
          </div>
          <div className="flex justify-center gap-4 text-xs">
            <div className={`px-3 py-2 rounded-md bg-slate-900 border ${isPositivo ? 'border-emerald-500/50 text-emerald-400' : 'border-rose-500/50 text-rose-400'}`}>
              <span className="block text-lg font-mono tabular-nums font-bold mb-1">🥩 {kilosAsado} kg</span>
              de Asado
            </div>
            <div className={`px-3 py-2 rounded-md bg-slate-900 border ${isPositivo ? 'border-emerald-500/50 text-emerald-400' : 'border-rose-500/50 text-rose-400'}`}>
              <span className="block text-lg font-mono tabular-nums font-bold mb-1">💵 U$S {dolaresMep}</span>
              MEP
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 pt-4 text-center relative z-10">
         <p className="text-xs text-slate-400 mb-2">Nivel Desbloqueado: Estratega de Renta Fija</p>
         <Link href="/teacher/courses" className="text-sm font-semibold text-emerald-400 hover:text-emerald-300 hover:underline">
           ¿Querés armar esta cartera en tu ALyC real paso a paso? Mirá la clase práctica. &rarr;
         </Link>
      </div>
    </div>
  );
}
