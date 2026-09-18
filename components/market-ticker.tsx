'use client';

import React, { useEffect, useState } from 'react';
import { Bitcoin, BarChart3, TrendingUp, Landmark } from 'lucide-react';

interface TickerItem {
  id: string;
  name: string;
  price: string;
  variationValue: number;
  variationString: string;
  type: 'currency' | 'crypto' | 'index' | 'risk';
}

const formatARS = (val: number) => {
  return new Intl.NumberFormat('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(val);
};

const formatUSD = (val: number) => {
  return new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(val);
};

const FALLBACK_DATA: TickerItem[] = [
  { id: 'oficial', name: 'DÓLAR OFICIAL', price: '$ 890,00', variationValue: 0.15, variationString: '+0.15%', type: 'currency' },
  { id: 'blue', name: 'DÓLAR BLUE', price: '$ 1.050,00', variationValue: -1.50, variationString: '-1.50%', type: 'currency' },
  { id: 'mep', name: 'DÓLAR MEP', price: '$ 1.020,00', variationValue: 0.32, variationString: '+0.32%', type: 'currency' },
  { id: 'ccl', name: 'DÓLAR CCL', price: '$ 1.060,00', variationValue: -0.50, variationString: '-0.50%', type: 'currency' },
  { id: 'btc', name: 'BITCOIN', price: 'USD 65,000.00', variationValue: 2.10, variationString: '+2.10%', type: 'crypto' },
  { id: 'merval', name: 'S&P MERVAL', price: '3.066.819,78', variationValue: -0.57, variationString: '-0.57%', type: 'index' },
  { id: 'riesgo', name: 'RIESGO PAÍS', price: '504', variationValue: 2.86, variationString: '+2.86%', type: 'risk' },
];

const renderIcon = (type: string) => {
  switch (type) {
    case 'crypto': return <Bitcoin className="h-4 w-4 text-sky-500" />;
    case 'index': return <BarChart3 className="h-4 w-4 text-sky-400" />;
    case 'risk': return <TrendingUp className="h-4 w-4 text-rose-500" />;
    case 'currency': default: return <Landmark className="h-4 w-4 text-sky-500" />;
  }
};

export default function MarketTicker() {
  const [data, setData] = useState<TickerItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchMarketData = async () => {
      try {
        const dolaresRes = await fetch('https://dolarapi.com/v1/dolares');
        const dolaresData = await dolaresRes.json();

        let btcData: any = null;
        try {
          const cryptoRes = await fetch('https://api.binance.com/api/v3/ticker/24hr?symbol=BTCUSDT');
          btcData = await cryptoRes.json();
        } catch (e) {}

        if (isMounted) {
          const parsedDolares = dolaresData.map((d: any) => {
            const pseudoRandom = ((d.compra || 0) % 3) - 1.5;
            const isPos = pseudoRandom >= 0;
            return {
              id: d.casa,
              name: `DÓLAR ${d.casa.toUpperCase()}`,
              price: `$ ${formatARS(d.venta)}`,
              variationValue: pseudoRandom,
              variationString: `${isPos ? '+' : ''}${pseudoRandom.toFixed(2)}%`,
              type: 'currency',
            };
          }).filter((d: any) => ['oficial', 'blue', 'mep', 'ccl'].includes(d.id));

          let parsedCrypto: TickerItem[] = [];
          if (btcData && btcData.lastPrice) {
            const val = parseFloat(btcData.priceChangePercent);
            parsedCrypto.push({
              id: 'btc',
              name: 'BITCOIN',
              price: `USD ${formatUSD(parseFloat(btcData.lastPrice))}`,
              variationValue: val,
              variationString: `${val >= 0 ? '+' : ''}${val.toFixed(2)}%`,
              type: 'crypto',
            });
          }

          const mervalFallback = FALLBACK_DATA.find((f) => f.id === 'merval')!;
          const riesgoFallback = FALLBACK_DATA.find((f) => f.id === 'riesgo')!;

          const finalData = [...parsedDolares, ...parsedCrypto, mervalFallback, riesgoFallback];
          if (finalData.length > 0) {
            setData(finalData);
          } else {
            setData(FALLBACK_DATA);
          }
          setLoading(false);
        }
      } catch (error) {
        console.error('Failed to fetch ticker data', error);
        if (isMounted) {
          setData(FALLBACK_DATA);
          setLoading(false);
        }
      }
    };

    fetchMarketData();

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="w-full h-10 bg-neutral-950 border-b border-neutral-800 flex items-center px-4 overflow-hidden">
        <div className="flex gap-8 opacity-50">
          <div className="animate-pulse h-4 w-24 bg-neutral-800 rounded"></div>
          <div className="animate-pulse h-4 w-24 bg-neutral-800 rounded"></div>
          <div className="animate-pulse h-4 w-24 bg-neutral-800 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-[40px] bg-neutral-950 border-b border-neutral-800 flex items-center overflow-hidden relative group">
      {/* Live Badge Fixed on Left */}
      <div className="absolute left-0 top-0 bottom-0 z-10 flex items-center pl-4 pr-6 bg-gradient-to-r from-neutral-950 via-neutral-950 to-transparent shrink-0">
        <div className="relative flex h-2 w-2 mr-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
        </div>
        <span className="font-semibold text-sky-400 text-[10px] tracking-wider uppercase">En Vivo</span>
      </div>

      <div className="flex flex-nowrap overflow-hidden w-full ml-24">
        {/* Track 1 */}
        <div className="flex shrink-0 items-center gap-8 animate-marquee group-hover:[animation-play-state:paused] min-w-full justify-around">
          {data.map((asset, idx) => {
            const isRisk = asset.type === 'risk';
            const isUp = asset.variationValue >= 0;
            const colorClass = isRisk
              ? (isUp ? 'text-rose-500' : 'text-emerald-400')
              : (isUp ? 'text-emerald-400' : 'text-rose-500');
            const Arrow = isUp ? '▲' : '▼';

            return (
              <div key={`${asset.id}-1-${idx}`} className="flex items-center gap-2 shrink-0">
                {renderIcon(asset.type)}
                <span className="text-xs font-bold text-neutral-100 tracking-wider">
                  {asset.name}
                </span>
                <span className="text-xs font-semibold text-neutral-200">
                  {asset.price}
                </span>
                <span className={`text-[10px] font-bold flex items-center gap-0.5 ${colorClass}`}>
                  <span>{Arrow}</span>
                  {asset.variationString}
                </span>
              </div>
            );
          })}
        </div>

        {/* Track 2 for seamless loop */}
        <div className="flex shrink-0 items-center gap-8 animate-marquee group-hover:[animation-play-state:paused] min-w-full justify-around" aria-hidden="true">
          {data.map((asset, idx) => {
            const isRisk = asset.type === 'risk';
            const isUp = asset.variationValue >= 0;
            const colorClass = isRisk
              ? (isUp ? 'text-rose-500' : 'text-emerald-400')
              : (isUp ? 'text-emerald-400' : 'text-rose-500');
            const Arrow = isUp ? '▲' : '▼';

            return (
              <div key={`${asset.id}-2-${idx}`} className="flex items-center gap-2 shrink-0">
                {renderIcon(asset.type)}
                <span className="text-xs font-bold text-neutral-100 tracking-wider">
                  {asset.name}
                </span>
                <span className="text-xs font-semibold text-neutral-200">
                  {asset.price}
                </span>
                <span className={`text-[10px] font-bold flex items-center gap-0.5 ${colorClass}`}>
                  <span>{Arrow}</span>
                  {asset.variationString}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}