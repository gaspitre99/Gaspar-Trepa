'use client';

import React, { useEffect, useState } from 'react';

type TickerItem = {
  id: string;
  label: string;
  value: string;
  variation?: number; // percentage
};

type DolarRate = {
  casa: string;
  nombre: string;
  venta: number;
};

type RiesgoPais = {
  fecha: string;
  valor: number;
};

type BinanceTicker = {
  symbol: string;
  lastPrice: string;
  priceChangePercent: string;
};

const formatPrice = (val: number, isUSD = false) => {
  if (isUSD) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(val);
  }
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(val);
};

export default function MarketTicker() {
  const [items, setItems] = useState<TickerItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchTickerData = async () => {
      const results = await Promise.allSettled([
        fetch('https://dolarapi.com/v1/dolares').then((res) => {
          if (!res.ok) throw new Error('Dolar API failed');
          return res.json();
        }),
        fetch('https://api.argentinadatos.com/v1/finanzas/indices/riesgo-pais/ultimo').then((res) => {
          if (!res.ok) throw new Error('Riesgo Pais API failed');
          return res.json();
        }),
        fetch('https://api.binance.com/api/v3/ticker/24hr?symbol=BTCUSDT').then((res) => {
          if (!res.ok) throw new Error('Binance API failed');
          return res.json();
        }),
      ]);

      if (!isMounted) return;

      const newItems: TickerItem[] = [];

      // Dolar Data
      if (results[0].status === 'fulfilled') {
        const data = results[0].value as DolarRate[];
        const targets = ['oficial', 'blue', 'mep', 'contadoconliqui'];
        data.filter((d) => targets.includes(d.casa)).forEach((d) => {
          newItems.push({
            id: `dolar-${d.casa}`,
            label: d.nombre === 'Contado con liqui' ? 'CCL' : d.nombre.toUpperCase(),
            value: formatPrice(d.venta),
          });
        });
      }

      // Riesgo Pais
      if (results[1].status === 'fulfilled') {
        const rp = results[1].value as RiesgoPais;
        newItems.push({
          id: 'riesgo-pais',
          label: 'RIESGO PAÍS',
          value: `${new Intl.NumberFormat('es-AR').format(rp.valor)} pts`,
        });
      }

      // Bitcoin
      if (results[2].status === 'fulfilled') {
        const btc = results[2].value as BinanceTicker;
        newItems.push({
          id: 'btc',
          label: 'BTC/USD',
          value: formatPrice(parseFloat(btc.lastPrice), true),
          variation: parseFloat(btc.priceChangePercent),
        });
      }

      // Fallback if completely empty
      if (newItems.length === 0) {
        newItems.push({ id: 'fallback', label: 'MERCADO CERRADO', value: '--' });
      }

      setItems(newItems);
      setLoading(false);
    };

    fetchTickerData();

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="w-full bg-slate-950/90 border-b border-slate-800/80 backdrop-blur-sm h-9 flex items-center justify-center">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
          Cargando mercados...
        </span>
      </div>
    );
  }

  const renderItem = (item: TickerItem) => (
    <div key={item.id} className="inline-flex items-center">
      <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mr-1.5">
        {item.label}
      </span>
      <span className="text-xs font-mono tabular-nums font-bold text-slate-100 mr-1.5">
        {item.value}
      </span>
      {item.variation !== undefined && (
        <span
          className={`text-[10px] font-mono tabular-nums font-medium px-1 py-0.5 rounded-sm ${
            item.variation >= 0
              ? 'text-emerald-400 bg-emerald-950/40'
              : 'text-rose-400 bg-rose-950/40'
          }`}
        >
          {item.variation > 0 ? '↑' : item.variation < 0 ? '↓' : ''} {item.variation > 0 ? '+' : ''}
          {item.variation.toFixed(2)}%
        </span>
      )}
    </div>
  );

  return (
    <div className="w-full bg-slate-950/90 border-b border-slate-800/80 backdrop-blur-sm h-9 flex items-center overflow-hidden relative z-50">
      <div className="flex-shrink-0 flex items-center bg-slate-950/90 pr-2 relative z-10 h-full">
        <div className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-semibold tracking-wider px-2 py-0.5 rounded-sm uppercase ml-4 mr-2 flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          EN VIVO
        </div>
      </div>

      <div className="flex-1 overflow-hidden relative h-full flex items-center mask-image-linear">
        <div className="flex whitespace-nowrap animate-ticker items-center">
          {items.map((item, index) => (
            <React.Fragment key={item.id}>
              {renderItem(item)}
              <span className="text-slate-700/60 mx-3 select-none">|</span>
            </React.Fragment>
          ))}
          {/* Duplicate for seamless scrolling */}
          {items.map((item, index) => (
            <React.Fragment key={`dup-${item.id}`}>
              {renderItem(item)}
              <span className="text-slate-700/60 mx-3 select-none">|</span>
            </React.Fragment>
          ))}
        </div>
      </div>
      <style jsx>{`
        @keyframes ticker {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-ticker {
          animation: ticker 30s linear infinite;
        }
        .mask-image-linear {
          mask-image: linear-gradient(
            to right,
            transparent,
            black 10%,
            black 90%,
            transparent
          );
        }
      `}</style>
    </div>
  );
}
