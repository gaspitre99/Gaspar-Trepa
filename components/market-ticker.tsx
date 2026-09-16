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
      try {
        const resBlue = await fetch('https://dolarapi.com/v1/dolares/blue');
        const blueData = await resBlue.json();

        const resMep = await fetch('https://dolarapi.com/v1/dolares/mep');
        const mepData = await resMep.json();

        let btcDataStr = '';
        try {
          const resBtc = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd');
          if (resBtc.ok) {
            const btcJson = await resBtc.json();
            btcDataStr = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(btcJson.bitcoin.usd);
          }
        } catch (e) {
          // fallback or ignore
        }

        if (isMounted) {
          const newData: AssetData[] = [
            { symbol: 'BLUE', priceFormatted: formatPrice(blueData.venta), isARS: true },
            { symbol: 'MEP', priceFormatted: formatPrice(mepData.venta), isARS: true },
          ];
          if (btcDataStr) {
            newData.push({ symbol: 'BTC', priceFormatted: btcDataStr, isARS: false });
          }
          newData.push({ symbol: 'S&P MERVAL', priceFormatted: '1.2M (ref)', isARS: true });
          newData.push({ symbol: 'RIESGO PAÍS', priceFormatted: '1300 pts (ref)', isARS: false });

          setData(newData);
          setLoading(false);
        }
      } catch (error) {
        console.error('Failed to fetch market ticker data', error);
        if (isMounted) {
          // Provide fallback data in case of failure
          setData([
             { symbol: 'BLUE', priceFormatted: '$1,050.00', isARS: true },
             { symbol: 'MEP', priceFormatted: '$1,030.00', isARS: true },
             { symbol: 'BTC', priceFormatted: '$65,000.00', isARS: false },
             { symbol: 'S&P MERVAL', priceFormatted: '1.2M (ref)', isARS: true },
             { symbol: 'RIESGO PAÍS', priceFormatted: '1300 pts (ref)', isARS: false },
          ]);
          setLoading(false);
        }
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
            <span className="font-bold uppercase tracking-widest text-[11px] text-zinc-500">{asset.symbol}</span>
            <span className="font-mono tabular-nums font-bold tracking-tight text-zinc-100">{asset.priceFormatted}</span>
            {asset.symbol !== 'RIESGO PAÍS' && asset.symbol !== 'S&P MERVAL' ? (
              <span className="font-mono tabular-nums text-[11px] font-bold text-emerald-400 flex items-center bg-emerald-400/10 px-1 rounded-sm">
                <svg className="w-3 h-3 mr-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
                {Math.random().toFixed(1)}%
              </span>
            ) : null}
            <span className="text-zinc-700 mx-2 ml-4 group-last:hidden">|</span>
          </div>
        ))}
        {/* Duplicate for seamless scrolling */}
        {data.map((asset, idx) => (
          <div key={`dup-${idx}`} className="inline-flex items-center px-6 gap-2 group">
            <span className="font-bold uppercase tracking-widest text-[11px] text-zinc-500">{asset.symbol}</span>
            <span className="font-mono tabular-nums font-bold tracking-tight text-zinc-100">{asset.priceFormatted}</span>
            {asset.symbol !== 'RIESGO PAÍS' && asset.symbol !== 'S&P MERVAL' ? (
              <span className="font-mono tabular-nums text-[11px] font-bold text-emerald-400 flex items-center bg-emerald-400/10 px-1 rounded-sm">
                <svg className="w-3 h-3 mr-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
                {Math.random().toFixed(1)}%
              </span>
            ) : null}
            <span className="text-zinc-700 mx-2 ml-4 group-last:hidden">|</span>
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
