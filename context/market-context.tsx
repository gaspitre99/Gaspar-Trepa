'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface MarketData {
  dolarBlue: { compra: number; venta: number };
  dolarMep: { compra: number; venta: number };
  bitcoinUsd: number;
  inflacionMensualEst: number;
}

interface MarketContextValue {
  data: MarketData;
  loading: boolean;
  error: Error | null;
}

const defaultMarketData: MarketData = {
  dolarBlue: { compra: 1000, venta: 1050 }, // Defensive fallbacks
  dolarMep: { compra: 980, venta: 1020 },
  bitcoinUsd: 65000,
  inflacionMensualEst: 4.5,
};

const MarketContext = createContext<MarketContextValue>({
  data: defaultMarketData,
  loading: true,
  error: null,
});

export const useMarket = () => useContext(MarketContext);

export const MarketProvider = ({ children }: { children: React.ReactNode }) => {
  const [data, setData] = useState<MarketData>(defaultMarketData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchMarketData = async () => {
      try {
        const [blueRes, mepRes, btcRes] = await Promise.allSettled([
          fetch('https://dolarapi.com/v1/dolares/blue'),
          fetch('https://dolarapi.com/v1/dolares/mep'),
          fetch('https://dolarapi.com/v1/cotizaciones/bitcoin')
        ]);

        let newData = { ...defaultMarketData };

        if (blueRes.status === 'fulfilled' && blueRes.value.ok) {
          const blue = await blueRes.value.json();
          newData.dolarBlue = { compra: blue.compra, venta: blue.venta };
        }

        if (mepRes.status === 'fulfilled' && mepRes.value.ok) {
          const mep = await mepRes.value.json();
          newData.dolarMep = { compra: mep.compra, venta: mep.venta };
        }

        if (btcRes.status === 'fulfilled' && btcRes.value.ok) {
          const btc = await btcRes.value.json();
          // API returns BTC in USD under venta usually for crypto endpoint, or we map it properly:
          newData.bitcoinUsd = btc.venta || newData.bitcoinUsd;
        }

        if (isMounted) {
          setData(newData);
          setLoading(false);
          setError(null);
        }
      } catch (err: any) {
        if (isMounted) {
          setError(err);
          setLoading(false);
          // Retain previous or default data
        }
      }
    };

    fetchMarketData();
    const intervalId = setInterval(fetchMarketData, 60000);

    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, []);

  return (
    <MarketContext.Provider value={{ data, loading, error }}>
      {children}
    </MarketContext.Provider>
  );
};
