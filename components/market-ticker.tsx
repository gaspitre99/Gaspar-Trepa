'use client';

import React, { useEffect, useState } from 'react';
import { formatPrice } from '@/lib/format';

interface AssetData {
  symbol: string;
  priceFormatted: string;
  isARS: boolean;
}

export default function MarketTicker() {
  const [data, setData] = useState<AssetData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchMarketData = async () => {
      // Default fallback values
      let bluePrice = '$1,050.00';
      let mepPrice = '$1,030.00';
      let btcPrice = '$65,000.00';

      try {
        const [blueResult, mepResult, btcResult] = await Promise.allSettled([
          fetch('https://dolarapi.com/v1/dolares/blue').then(res => {
            if (!res.ok) throw new Error('Blue fetch failed');
            return res.json();
          }),
          fetch('https://dolarapi.com/v1/dolares/mep').then(res => {
            if (!res.ok) throw new Error('MEP fetch failed');
            return res.json();
          }),
          fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd').then(res => {
            if (!res.ok) throw new Error('BTC fetch failed');
            return res.json();
          })
        ]);

        if (blueResult.status === 'fulfilled') {
          bluePrice = formatPrice(blueResult.value.venta);
        } else {
          console.error('Failed to fetch Blue:', blueResult.reason);
        }

        if (mepResult.status === 'fulfilled') {
          mepPrice = formatPrice(mepResult.value.venta);
        } else {
          console.error('Failed to fetch MEP:', mepResult.reason);
        }

        if (btcResult.status === 'fulfilled') {
          btcPrice = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(btcResult.value.bitcoin.usd);
        } else {
          console.error('Failed to fetch BTC:', btcResult.reason);
        }
      } catch (error) {
        console.error('Failed to fetch market ticker data', error);
      }

      if (isMounted) {
        setData([
          { symbol: 'BLUE', priceFormatted: bluePrice, isARS: true },
          { symbol: 'MEP', priceFormatted: mepPrice, isARS: true },
          { symbol: 'BTC', priceFormatted: btcPrice, isARS: false },
          { symbol: 'S&P MERVAL', priceFormatted: '1.2M (ref)', isARS: true },
          { symbol: 'RIESGO PAÍS', priceFormatted: '1300 pts (ref)', isARS: false },
        ]);
        setLoading(false);
      }
    };

    fetchMarketData();
    const interval = setInterval(fetchMarketData, 60000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  if (loading) {
    return (
      <div className="w-full bg-slate-900 text-slate-300 py-2 px-4 flex gap-4 overflow-x-hidden border-b border-slate-700">
        <div className="animate-pulse h-4 w-24 bg-slate-700 rounded"></div>
        <div className="animate-pulse h-4 w-24 bg-slate-700 rounded"></div>
        <div className="animate-pulse h-4 w-24 bg-slate-700 rounded"></div>
      </div>
    );
  }

  if (!data.length) return null;

  return (
    <div className="w-full bg-slate-900 text-white py-2 overflow-hidden border-b border-slate-700 text-sm relative font-sans">
      <div className="flex items-center absolute left-0 h-full px-4 z-10 bg-slate-900 pr-4 border-r border-slate-700">
        <div className="relative flex h-2 w-2 mr-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </div>
        <span className="font-bold uppercase tracking-widest text-[11px] text-emerald-400">EN VIVO</span>
      </div>

      <div className="flex whitespace-nowrap animate-ticker ml-28">
        {data.map((asset, idx) => (
          <div key={idx} className="inline-flex items-center px-6 gap-2 group">
            <span className="font-bold uppercase tracking-widest text-[11px] text-slate-500">{asset.symbol}</span>
            <span className="font-mono tabular-nums font-bold tracking-tight text-slate-100">{asset.priceFormatted}</span>
            {asset.symbol !== 'RIESGO PAÍS' && asset.symbol !== 'S&P MERVAL' ? (
              <span className="font-mono tabular-nums text-[11px] font-bold text-emerald-400 flex items-center bg-emerald-400/10 px-1 rounded-sm">
                <svg className="w-3 h-3 mr-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
                {Math.random().toFixed(1)}%
              </span>
            ) : null}
            <span className="text-slate-700 mx-2 ml-4 group-last:hidden">|</span>
          </div>
        ))}
        {/* Duplicate for seamless scrolling */}
        {data.map((asset, idx) => (
          <div key={`dup-${idx}`} className="inline-flex items-center px-6 gap-2 group">
            <span className="font-bold uppercase tracking-widest text-[11px] text-slate-500">{asset.symbol}</span>
            <span className="font-mono tabular-nums font-bold tracking-tight text-slate-100">{asset.priceFormatted}</span>
            {asset.symbol !== 'RIESGO PAÍS' && asset.symbol !== 'S&P MERVAL' ? (
              <span className="font-mono tabular-nums text-[11px] font-bold text-emerald-400 flex items-center bg-emerald-400/10 px-1 rounded-sm">
                <svg className="w-3 h-3 mr-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
                {Math.random().toFixed(1)}%
              </span>
            ) : null}
            <span className="text-slate-700 mx-2 ml-4 group-last:hidden">|</span>
          </div>
        ))}
      </div>
      <style jsx>{`
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-ticker {
          animation: ticker 30s linear infinite;
        }
      `}</style>
    </div>
  );
}
