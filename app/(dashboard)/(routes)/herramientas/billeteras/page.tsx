'use client';

import React, { useState, useMemo } from 'react';
import { walletsData } from '@/lib/wallets-data';
import { calculateYield } from '@/lib/wallet-math';

export default function BilleterasPage() {
  const [capital, setCapital] = useState<number>(100000);

  // Formatter matching the rule: Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' })
  const formatArs = (value: number) =>
    new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(value);

  const formatPct = (value: number) =>
    new Intl.NumberFormat('es-AR', { style: 'percent', minimumFractionDigits: 2 }).format(value / 100);

  const results = useMemo(() => {
    return walletsData.map(wallet => {
      const calc = calculateYield(capital, wallet);
      return { wallet, calc };
    }).sort((a, b) => b.calc.monthlyEarnings - a.calc.monthlyEarnings);
  }, [capital]);

  const topWallet = results[0];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Rendimiento de Billeteras Virtuales</h1>
          <p className="text-slate-400">Compará en tiempo real qué billetera te paga más según tu capital, considerando topes remunerados.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left Column: Ranking Table */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-xl font-semibold text-slate-200">Ranking Actual</h2>
            <div className="bg-slate-900/70 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm whitespace-nowrap">
                  <thead className="bg-slate-800/50 border-b border-slate-700">
                    <tr>
                      <th className="px-6 py-4 font-semibold text-slate-300">Billetera</th>
                      <th className="px-6 py-4 font-semibold text-slate-300 text-right">TNA Base</th>
                      <th className="px-6 py-4 font-semibold text-slate-300 text-right">Tope Máximo</th>
                      <th className="px-6 py-4 font-semibold text-emerald-400 text-right">Ganancia 30 días</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/50">
                    {results.map(({ wallet, calc }, idx) => (
                      <tr key={wallet.id} className="hover:bg-slate-800/30 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <span className="text-slate-500 font-mono text-xs w-4">{idx + 1}.</span>
                            <span className="font-medium text-slate-100">{wallet.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right font-mono text-slate-300">{wallet.tna}%</td>
                        <td className="px-6 py-4 text-right text-slate-400">
                          {wallet.maxCapARS ? formatArs(wallet.maxCapARS) : 'Sin límite'}
                        </td>
                        <td className="px-6 py-4 text-right font-mono font-bold text-emerald-400">
                          {formatArs(calc.monthlyEarnings)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right Column: Quick Calculator */}
          <div className="lg:col-span-1">
            <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-6 shadow-xl sticky top-24">
              <h2 className="text-lg font-semibold text-slate-200 mb-6">Tu Capital</h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Ingresá el monto a invertir</label>
                  <div className="relative">
                    <span className="absolute left-4 top-3 text-slate-500 font-medium">$</span>
                    <input
                      type="number"
                      min="0"
                      value={capital || ''}
                      onChange={(e) => setCapital(Number(e.target.value))}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg py-3 pl-8 pr-4 text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
                      placeholder="0"
                    />
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-800">
                  <h3 className="text-sm font-medium text-slate-400 mb-4">Mejor Opción: <span className="text-white">{topWallet.wallet.name}</span></h3>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center bg-slate-800/40 p-3 rounded-lg border border-slate-800/60">
                      <span className="text-sm text-slate-400">Por Día</span>
                      <span className="font-mono font-medium text-emerald-400">{formatArs(topWallet.calc.dailyEarnings)}</span>
                    </div>
                    <div className="flex justify-between items-center bg-slate-800/40 p-3 rounded-lg border border-slate-800/60">
                      <span className="text-sm text-slate-400">Por Mes (30d)</span>
                      <span className="font-mono font-bold text-emerald-400 text-lg">{formatArs(topWallet.calc.monthlyEarnings)}</span>
                    </div>
                    <div className="flex justify-between items-center bg-slate-800/40 p-3 rounded-lg border border-slate-800/60">
                      <span className="text-sm text-slate-400">TNA Real Efectiva</span>
                      <span className="font-mono font-medium text-blue-400">{formatPct(topWallet.calc.effectiveYieldPct)}</span>
                    </div>
                  </div>

                  {topWallet.wallet.maxCapARS && capital > topWallet.wallet.maxCapARS && (
                    <p className="mt-4 text-xs text-amber-500/90 leading-relaxed">
                      ⚠️ Tu capital supera el tope remunerado de {formatArs(topWallet.wallet.maxCapARS)}. El excedente no genera intereses en esta billetera.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
