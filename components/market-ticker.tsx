'use client';

import React, { useEffect, useState } from 'react';

type DolarRate = {
  moneda: string;
  casa: string;
  nombre: string;
  compra: number;
  venta: number;
  fechaActualizacion: string;
};

type TickerAsset = {
  symbol: string;
  priceFormatted: string;
  change?: string;
};

const MarketTicker = () => {
  const [rates, setRates] = useState<DolarRate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await fetch('https://dolarapi.com/v1/dolares');
        if (!response.ok) throw new Error('Failed to fetch');
        const result = await response.json();
        const filteredRates = result.filter((rate: DolarRate) =>
          ['oficial', 'blue', 'mep', 'contadoconliqui'].includes(rate.casa)
        );
        setRates(filteredRates);
      } catch (error) {
        console.error('Error fetching market rates:', error);
        setRates([
          { moneda: 'USD', casa: 'oficial', nombre: 'Oficial', compra: 850, venta: 900, fechaActualizacion: '' },
          { moneda: 'USD', casa: 'blue', nombre: 'Blue', compra: 1000, venta: 1050, fechaActualizacion: '' },
          { moneda: 'USD', casa: 'mep', nombre: 'Bolsa', compra: 1020, venta: 1030, fechaActualizacion: '' },
          { moneda: 'USD', casa: 'contadoconliqui', nombre: 'Contado con liqui', compra: 1050, venta: 1060, fechaActualizacion: '' },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchRates();
  }, []);

  const data: TickerAsset[] = rates.length > 0
    ? [
        ...rates.map((rate) => ({
          symbol: `DÓLAR ${rate.nombre.toUpperCase()}`,
          priceFormatted: `$${rate.venta.toLocaleString('es-AR')}`,
          change: '+0.4%',
        })),
        { symbol: 'BITCOIN', priceFormatted: 'US$ 64.200', change: '+1.8%' },
        { symbol: 'S&P MERVAL', priceFormatted: '1.820.400 pts', change: '+2.1%' },
        { symbol: 'RIESGO PAÍS', priceFormatted: '1.240 pts', change: '-1.4%' },
      ]
    : [
        { symbol: 'DÓLAR OFICIAL', priceFormatted: '$900', change: '+0.1%' },
        { symbol: 'DÓLAR BLUE', priceFormatted: '$1.050', change: '+0.4%' },
        { symbol: 'DÓLAR MEP', priceFormatted: '$1.030', change: '+0.2%' },
        { symbol: 'DÓLAR CCL', priceFormatted: '$1.060', change: '+0.3\%' },         { symbol: 'BITCOIN', priceFormatted: 'US$ 64.200', change: '+1.8%' },
        { symbol: 'S&P MERVAL', priceFormatted: '1.820.400 pts', change: '+2.1%' },
        { symbol: 'RIESGO PAÍS', priceFormatted: '1.240 pts', change: '-1.4%' },
      ];

  if (loading) {
    return (
      <div className="w-full bg-neutral-950 text-slate-300 py-2 px-4 flex gap-4 overflow-x-hidden border-b border-neutral-800">
        <div className="animate-pulse h-4 w-24 bg-neutral-800 rounded"></div>
        <div className="animate-pulse h-4 w-24 bg-neutral-800 rounded"></div>
        <div className="animate-pulse h-4 w-24 bg-neutral-800 rounded"></div>
      </div>
    );
  }

  return (
    <div className="w-full bg-neutral-950 text-white py-2 overflow-hidden border-b border-neutral-800 text-sm relative font-sans">
      <div className="flex items-center absolute left-0 h-full px-4 z-10 bg-neutral-950 pr-4 border-r border-neutral-800">
        <div className="relative flex h-2 w-2 mr-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </div>
        <span className="font-bold uppercase tracking-widest text-[11px] text-emerald-400">EN VIVO</span>
      </div>

      <div className="flex w-full overflow-hidden ml-28 group">
        <div className="flex shrink-0 items-center animate-marquee group-hover:[animation-play-state:paused] min-w-full justify-around gap-8 pr-8">
          {data.map((asset, idx) => (
            <div key={idx} className="inline-flex items-center space-x-2 shrink-0">
              <span className="font-bold uppercase tracking-widest text-[11px] text-slate-500">{asset.symbol}</span>
              <span className="font-mono tabular-nums font-bold tracking-tight text-slate-100">{asset.priceFormatted}</span>
              {asset.symbol !== 'RIESGO PAÍS' && asset.symbol !== 'S&P MERVAL' ? (
                <span className="font-mono tabular-nums text-[11px] font-bold text-emerald-400 flex items-center bg-emerald-400/10 px-1 rounded-sm">
                  <svg className="w-3 h-3 mr-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                  {asset.change || '0.5%'}
                </span>
              ) : null}
            </div>
          ))}
        </div>
        {/* Duplicado para loop continuo */}
        <div className="flex shrink-0 items-center animate-marquee group-hover:[animation-play-state:paused] min-w-full justify-around gap-8 pr-8" aria-hidden="true">
          {data.map((asset, idx) => (
            <div key={`dup-${idx}`} className="inline-flex items-center space-x-2 shrink-0">
              <span className="font-bold uppercase tracking-widest text-[11px] text-slate-500">{asset.symbol}</span>
              <span className="font-mono tabular-nums font-bold tracking-tight text-slate-100">{asset.priceFormatted}</span>
              {asset.symbol !== 'RIESGO PAÍS' && asset.symbol !== 'S&P MERVAL' ? (
                <span className="font-mono tabular-nums text-[11px] font-bold text-emerald-400 flex items-center bg-emerald-400/10 px-1 rounded-sm">
                  <svg className="w-3 h-3 mr-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                  {asset.change || '0.5%'}
                </span>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MarketTicker;