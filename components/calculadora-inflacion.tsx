'use client';

import React, { useState, useEffect } from 'react';
import { formatPrice } from '@/lib/format';
import confetti from 'canvas-confetti';
import Link from 'next/link';
import { useMarket } from '@/context/market-context';

export default function CalculadoraInflacion() {
  const { data } = useMarket();
  const [capital, setCapital] = useState<number>(100000);
  const [tna, setTna] = useState<number>(60);
  const [inflacion, setInflacion] = useState<number>(data.inflacionMensualEst);

  useEffect(() => {
    setInflacion(data.inflacionMensualEst);
  }, [data.inflacionMensualEst]);

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
  const dolaresMep = (Math.abs(gananciaReal) / data.dolarMep.venta).toFixed(2);

  return (
    <div className={`p-6 rounded-xl shadow-lg border transition-all duration-500 max-w-md mx-auto w-full relative overflow-hidden ${isPositivo ? 'bg-emerald-950 border-emerald-500 shadow-emerald-500/20' : 'bg-slate-900 border-rose-500 shadow-rose-500/20'}`}>

      {isPositivo && (
        <div className="absolute inset-0 bg-emerald-500/5 animate-pulse pointer-events-none"></div>
      )}

      <h2 className='text-2xl font-bold mb-4 text-white relative z-10'>Calculadora Real vs Inflación</h2>

      <div className='space-y-6 relative z-10'>
        <div>
          <div className="flex justify-between mb-2">
            <label className="text-slate-300 text-sm font-semibold">Capital Inicial: {formatPrice(capital)}</label>
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
            <label className="text-slate-300 text-sm font-semibold">TNA Estimada: {tna}%</label>
          </div>
          <input
            type='range'
            min="0"
            max="200"
            step="1"
            value={tna}
            onChange={(e) => setTna(Number(e.target.value))}
            className="w-full accent-emerald-500"
          />
        </div>

        <div>
          <div className="flex justify-between mb-2">
            <label className="text-slate-300 text-sm font-semibold">Inflación Mensual: {inflacion}%</label>
          </div>
          <input
            type='range'
            min="0"
            max="20"
            step="0.1"
            value={inflacion}
            onChange={(e) => setInflacion(Number(e.target.value))}
            className="w-full accent-rose-500"
          />
        </div>
      </div>

      <div className='mt-8 space-y-3 p-4 bg-slate-800/80 rounded-lg border border-slate-700 relative z-10'>
        <div className='flex justify-between items-center'>
          <span className='text-slate-400 text-sm'>Nominal (1 mes):</span>
          <span className='font-semibold text-white'>{formatPrice(capitalFinalNominal)}</span>
        </div>
        <div className='flex justify-between items-center pt-3 border-t border-slate-700'>
          <span className='font-medium text-slate-300'>Resultado Real:</span>
          <span className={`font-bold text-lg ${isPositivo ? 'text-emerald-400' : 'text-rose-400'}`}>
            {isPositivo ? '+' : ''}{formatPrice(gananciaReal)}
          </span>
        </div>

        <div className='mt-4 pt-4 border-t border-slate-700'>
          <div className="text-center text-sm font-medium text-slate-300 mb-2">
            {isPositivo ? 'Poder Adquisitivo Preservado:' : 'Poder Adquisitivo Perdido:'}
          </div>
          <div className="flex justify-center gap-4 text-xs">
            <div className={`px-3 py-2 rounded-lg bg-slate-900 border ${isPositivo ? 'border-emerald-500/50 text-emerald-400' : 'border-rose-500/50 text-rose-400'}`}>
              <span className="block text-lg font-bold mb-1">🥩 {kilosAsado} kg</span>
              de Asado
            </div>
            <div className={`px-3 py-2 rounded-lg bg-slate-900 border ${isPositivo ? 'border-emerald-500/50 text-emerald-400' : 'border-rose-500/50 text-rose-400'}`}>
              <span className="block text-lg font-bold mb-1">💵 {dolaresMep}</span>
              USD MEP
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
