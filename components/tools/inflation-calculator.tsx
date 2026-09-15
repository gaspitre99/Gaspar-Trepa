'use client';

import React, { useState, useMemo } from 'react';
import { formatPrice } from '@/lib/format';
import toast from 'react-hot-toast';
import { calculateAccumulatedInflation, getAnnualInflationSeries } from '@/lib/inflation-data';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

const MONTHS = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

const YEARS = Array.from({ length: 2024 - 2002 + 1 }, (_, i) => 2002 + i);

export default function InflationCalculator() {
  const [amount, setAmount] = useState<number>(10000);
  const [startMonth, setStartMonth] = useState<number>(1);
  const [startYear, setStartYear] = useState<number>(2002);
  const [endMonth, setEndMonth] = useState<number>(new Date().getMonth() + 1);
  const [endYear, setEndYear] = useState<number>(new Date().getFullYear());
  const [showDetails, setShowDetails] = useState(false);

  const result = useMemo(() => {
    return calculateAccumulatedInflation(startYear, startMonth, endYear, endMonth, amount);
  }, [startYear, startMonth, endYear, endMonth, amount]);

  const annualSeries = useMemo(() => {
    return getAnnualInflationSeries();
  }, []);

  const handleCopy = () => {
    const text = `🇦🇷 Calculadora de Inflación: Para comprar lo que en ${MONTHS[startMonth - 1]} ${startYear} salía ${formatPrice(amount)}, hoy necesitás ${formatPrice(result.finalAmount)}. Inflación acumulada: ${result.accumulatedPercentage.toLocaleString('es-AR', { maximumFractionDigits: 2 })}%. Calculá el tuyo en: https://hablemosdeeconomia.com/herramientas/inflacion`;
    navigator.clipboard.writeText(text);
    toast.success('Texto copiado al portapapeles');
  };

  const isInvalidDateRange = startYear > endYear || (startYear === endYear && startMonth > endMonth);

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-10">
      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">Calculadora de Inflación Acumulada</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Para comprar algo que salía</label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-slate-500">$</span>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="pl-8 w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">A principios de</label>
                <div className="flex gap-2">
                  <select
                    value={startMonth}
                    onChange={(e) => setStartMonth(Number(e.target.value))}
                    className="w-full rounded-md border border-slate-300 px-2 py-2 text-sm bg-white"
                  >
                    {MONTHS.map((m, i) => <option key={i} value={i + 1}>{m}</option>)}
                  </select>
                  <select
                    value={startYear}
                    onChange={(e) => setStartYear(Number(e.target.value))}
                    className="w-full rounded-md border border-slate-300 px-2 py-2 text-sm bg-white"
                  >
                    {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">A finales de</label>
                <div className="flex gap-2">
                  <select
                    value={endMonth}
                    onChange={(e) => setEndMonth(Number(e.target.value))}
                    className="w-full rounded-md border border-slate-300 px-2 py-2 text-sm bg-white"
                  >
                    {MONTHS.map((m, i) => <option key={i} value={i + 1}>{m}</option>)}
                  </select>
                  <select
                    value={endYear}
                    onChange={(e) => setEndYear(Number(e.target.value))}
                    className="w-full rounded-md border border-slate-300 px-2 py-2 text-sm bg-white"
                  >
                    {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
                  </select>
                </div>
              </div>
            </div>
            {isInvalidDateRange && <p className="text-rose-500 text-sm">La fecha de inicio debe ser anterior a la fecha de fin.</p>}
          </div>

          <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 flex flex-col justify-center">
            {isInvalidDateRange ? (
              <div className="text-center text-slate-500">Ajusta las fechas para ver el resultado</div>
            ) : (
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-slate-600 font-medium">Necesitarías la suma de</p>
                  <p className="text-3xl md:text-4xl font-bold text-slate-900 mt-1">
                    {formatPrice(result.finalAmount)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-slate-600 font-medium">La inflación acumulada fue de</p>
                  <p className="text-xl font-bold text-blue-600 mt-1">
                    {result.accumulatedPercentage.toLocaleString('es-AR', { maximumFractionDigits: 2 })}%
                  </p>
                </div>
                <p className="text-xs text-slate-500 italic">
                  entre {MONTHS[startMonth - 1]} de {startYear} y {MONTHS[endMonth - 1]} de {endYear}
                </p>

                <div className="pt-4 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleCopy}
                    className="flex-1 bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-slate-800 transition"
                  >
                    Copiar cálculo
                  </button>
                  <button
                    onClick={() => setShowDetails(!showDetails)}
                    className="flex-1 bg-white border border-slate-300 text-slate-700 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-slate-50 transition"
                  >
                    {showDetails ? 'Ocultar detalle' : 'Ver detalle'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {showDetails && !isInvalidDateRange && (
          <div className="mt-8 border-t border-slate-200 pt-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Detalle Mes a Mes</h3>
            <div className="max-h-64 overflow-y-auto border border-slate-200 rounded-md">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-slate-700 uppercase bg-slate-50 sticky top-0">
                  <tr>
                    <th className="px-4 py-3">Período</th>
                    <th className="px-4 py-3 text-right">Inflación Mensual</th>
                  </tr>
                </thead>
                <tbody>
                  {result.monthlyBreakdown.map((item, idx) => (
                    <tr key={idx} className="bg-white border-b border-slate-100 hover:bg-slate-50">
                      <td className="px-4 py-2">{MONTHS[item.month - 1]} {item.year}</td>
                      <td className="px-4 py-2 text-right font-medium">{item.rate.toFixed(1)}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200">
        <h3 className="text-xl font-bold text-slate-800 mb-6">Evolución de la inflación anual (Período 2002-Presente)</h3>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={annualSeries} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="year" stroke="#64748b" tickMargin={10} minTickGap={20} />
              <YAxis stroke="#64748b" tickFormatter={(val) => `${val}%`} width={60} />
              <Tooltip
                formatter={(value: any) => [`${value.toFixed(1)}%`, 'Inflación Anual']}
                labelStyle={{ color: '#0f172a', fontWeight: 'bold' }}
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <ReferenceLine x={2015} stroke="#cbd5e1" strokeDasharray="3 3" label={{ position: 'top', value: '2015', fill: '#64748b', fontSize: 12 }} />
              <Line
                type="monotone"
                dataKey="rate"
                stroke="#2563eb"
                strokeWidth={3}
                dot={{ r: 4, fill: '#2563eb', strokeWidth: 0 }}
                activeDot={{ r: 6, strokeWidth: 0 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <p className="text-xs text-slate-500 mt-4 text-center">
          Fuente: En base a INDEC e IPC Provincias / Consultoras privadas. *Los datos actuales son representativos para demostración.
        </p>
      </div>
    </div>
  );
}
