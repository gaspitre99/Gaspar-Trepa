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

const MarketTicker = () => {
  const [rates, setRates] = useState<DolarRate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await fetch('https://dolarapi.com/v1/dolares');
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        // Filter for Oficial, Blue, MEP, CCL
        const filteredRates = data.filter((rate: DolarRate) =>
          ['oficial', 'blue', 'mep', 'contadoconliqui'].includes(rate.casa)
        );
        setRates(filteredRates);
      } catch (error) {
        console.error('Error fetching market rates:', error);
        // Fallback static values
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

  if (loading) {
    return <div className="w-full bg-slate-900 text-white py-2 text-sm text-center">Cargando cotizaciones...</div>;
  }

  return (
    <div className="w-full bg-slate-900 text-white overflow-hidden py-2 text-sm relative z-50">
      <div className="flex whitespace-nowrap animate-ticker">
        {rates.map((rate, index) => (
          <div key={index} className="inline-flex items-center px-4 space-x-2">
            <span className="font-semibold text-emerald-400">Dólar {rate.nombre}:</span>
            <span>C: ${rate.compra.toFixed(2)}</span>
            <span>/</span>
            <span>V: ${rate.venta.toFixed(2)}</span>
            <span className="mx-4 text-slate-500">|</span>
          </div>
        ))}
        {/* Duplicate for seamless scrolling */}
        {rates.map((rate, index) => (
          <div key={`dup-${index}`} className="inline-flex items-center px-4 space-x-2">
            <span className="font-semibold text-emerald-400">Dólar {rate.nombre}:</span>
            <span>C: ${rate.compra.toFixed(2)}</span>
            <span>/</span>
            <span>V: ${rate.venta.toFixed(2)}</span>
            <span className="mx-4 text-slate-500">|</span>
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
};

export default MarketTicker;
