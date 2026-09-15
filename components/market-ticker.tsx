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
          newData.push({ symbol: 'SPY', priceFormatted: 'USD 500.00 (ref)', isARS: false });

          setData(newData);
          setLoading(false);
        }
      } catch (error) {
        console.error('Failed to fetch market ticker data', error);
        if (isMounted) {
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
    <div className="w-full bg-slate-900 text-white py-2 px-4 flex items-center overflow-x-auto whitespace-nowrap border-b border-slate-700 hide-scrollbar text-sm space-x-6">
      <div className="flex items-center gap-2 mr-2 shrink-0">
        <div className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </div>
        <span className="font-semibold text-emerald-400 text-xs tracking-wider">EN VIVO</span>
      </div>

      {data.map((asset, idx) => (
        <div key={idx} className="flex items-center gap-2 shrink-0">
          <span className="font-bold text-slate-400">{asset.symbol}</span>
          <span className="font-medium">{asset.priceFormatted}</span>
        </div>
      ))}
    </div>
  );
}
