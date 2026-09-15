'use client';

import React, { useState, useEffect } from 'react';
import { useMarket } from '@/context/market-context';
import { formatPrice } from '@/lib/format';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function BreakevenCalculator() {
  const { data } = useMarket();
  const [capital, setCapital] = useState<number>(100000);
  const [horizonte, setHorizonte] = useState<number>(30); // days
  const [tna, setTna] = useState<number>(50);
  const [mep, setMep] = useState<number>(data.dolarMep.venta);

  useEffect(() => {
    // only auto-sync if mep is completely default, or we just let them reset via button
    if (!mep) setMep(data.dolarMep.venta);
  }, [data.dolarMep.venta, mep]);

  const resetMep = () => setMep(data.dolarMep.venta);

  const tasaPeriodo = (tna / 100) * (horizonte / 365);
  const capitalFinal = capital * (1 + tasaPeriodo);

  // Breakeven MEP: If I buy MEP now it costs X. I get Y USD.
  // If I invest in ARS, I get Z ARS. Z / Y = Breakeven MEP.
  const usdIniciales = capital / mep;
  const breakevenMep = usdIniciales > 0 ? capitalFinal / usdIniciales : 0;

  const shareText = `¡Mirá mi simulación de Carry Trade!\n\nSi invierto ${formatPrice(capital)} a ${horizonte} días (TNA ${tna}%):\nObtengo ${formatPrice(capitalFinal)}.\n\nEl Dólar MEP de equilibrio es ${formatPrice(breakevenMep)}. Si el MEP sube por encima de eso, convenía comprar dólares. ¡Hacé tus cálculos en Hablemos de Economía!`;

  const share = () => {
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`, '_blank');
  };

  return (
    <div className='p-6 bg-slate-900 border border-slate-700 rounded-xl shadow-lg w-full max-w-md mx-auto text-white'>
      <h2 className='text-xl font-bold mb-4'>Breakeven: Tasa vs Dólar MEP</h2>
      <p className='text-sm text-slate-400 mb-6'>Calculá si te conviene hacer tasa en pesos o comprar dólares.</p>

      <div className='space-y-4'>
        <div>
          <Label className='text-slate-300'>Capital Inicial (ARS)</Label>
          <Input
            type='number'
            value={capital}
            onChange={(e) => setCapital(Number(e.target.value))}
            className='bg-slate-800 border-slate-700 mt-1'
          />
        </div>
        <div>
          <Label className='text-slate-300'>Horizonte de Inversión (Días)</Label>
          <select
            value={horizonte}
            onChange={(e) => setHorizonte(Number(e.target.value))}
            className="w-full mt-1 bg-slate-800 border-slate-700 rounded-md p-2 text-sm text-white"
          >
            <option value={30}>30 días</option>
            <option value={60}>60 días</option>
            <option value={90}>90 días</option>
          </select>
        </div>
        <div>
          <Label className='text-slate-300'>TNA (%)</Label>
          <Input
            type='number'
            value={tna}
            onChange={(e) => setTna(Number(e.target.value))}
            className='bg-slate-800 border-slate-700 mt-1'
          />
        </div>
        <div>
          <div className='flex justify-between items-end'>
            <Label className='text-slate-300'>Cotización Dólar MEP Hoy</Label>
            {mep !== data.dolarMep.venta && (
              <button onClick={resetMep} className="text-xs text-emerald-400 hover:underline">
                Restablecer ({formatPrice(data.dolarMep.venta)})
              </button>
            )}
          </div>
          <Input
            type='number'
            value={mep}
            onChange={(e) => setMep(Number(e.target.value))}
            className='bg-slate-800 border-slate-700 mt-1'
          />
        </div>
      </div>

      <div className='mt-8 p-4 bg-slate-800 rounded-lg border border-slate-700'>
        <div className='flex justify-between items-center mb-2'>
          <span className='text-sm text-slate-400'>Capital Final (ARS):</span>
          <span className='font-semibold'>{formatPrice(capitalFinal)}</span>
        </div>
        <div className='flex justify-between items-center pt-2 border-t border-slate-700'>
          <span className='text-sm font-medium'>MEP de Equilibrio:</span>
          <span className='font-bold text-lg text-blue-400'>{formatPrice(breakevenMep)}</span>
        </div>
        <p className='text-xs text-slate-400 mt-4 leading-relaxed'>
          <strong className='text-white'>Veredicto:</strong> Si al cabo de {horizonte} días el Dólar MEP supera los <strong className='text-blue-400'>{formatPrice(breakevenMep)}</strong>, convenía dolarizarse hoy. Si se mantiene por debajo, salís ganando en dólares con la tasa en pesos (Carry Trade positivo).
        </p>
      </div>

      <div className='mt-6'>
        <Button onClick={share} className='w-full bg-[#25D366] hover:bg-[#128C7E] text-white border-none font-bold'>
          Compartir en WhatsApp
        </Button>
      </div>
    </div>
  );
}
