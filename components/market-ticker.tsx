'use client';

import React from 'react';
import { formatPrice } from '@/lib/format';
import { useMarket } from '@/context/market-context';

export default function MarketTicker() {
  const { data, loading } = useMarket();

  if (loading) {
    return (
      <div className="w-full bg-slate-900 text-slate-300 py-2 px-4 flex gap-4 overflow-x-hidden border-b border-slate-700">
        <div className="animate-pulse h-4 w-24 bg-slate-700 rounded"></div>
        <div className="animate-pulse h-4 w-24 bg-slate-700 rounded"></div>
        <div className="animate-pulse h-4 w-24 bg-slate-700 rounded"></div>
      </div>
    );
  }

  const tickerData = [
    { symbol: 'BLUE', priceFormatted: formatPrice(data.dolarBlue.venta) },
    { symbol: 'MEP', priceFormatted: formatPrice(data.dolarMep.venta) },
    { symbol: 'BTC', priceFormatted: new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(data.bitcoinUsd) },
    { symbol: 'SPY', priceFormatted: 'USD 500.00 (ref)' }
  ];

  return (
    <div className="w-full bg-slate-900 text-white py-2 px-4 flex items-center overflow-x-auto whitespace-nowrap border-b border-slate-700 hide-scrollbar text-sm space-x-6">
      <div className="flex items-center gap-2 mr-2 shrink-0">
        <div className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </div>
        <span className="font-semibold text-emerald-400 text-xs tracking-wider">EN VIVO</span>
      </div>

      {tickerData.map((asset, idx) => (
        <div key={idx} className="flex items-center gap-2 shrink-0">
          <span className="font-bold text-slate-400">{asset.symbol}</span>
          <span className="font-medium">{asset.priceFormatted}</span>
        </div>
      ))}
    </div>
  );
}
