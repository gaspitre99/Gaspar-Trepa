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
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-slate-900 dark:text-zinc-100 p-6 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div>
          <h1 className="font-serif text-3xl font-medium tracking-tight text-slate-900 dark:text-zinc-100 mb-2">Rendimiento de Billeteras Virtuales</h1>
          <p className="text-zinc-500">Compará en tiempo real qué billetera te paga más según tu capital, considerando topes remunerados.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left Column: Ranking Table */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="font-serif text-xl font-medium text-slate-900 dark:text-zinc-100">Ranking Actual</h2>
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-md overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm whitespace-nowrap">
                  <thead className="bg-zinc-50 dark:bg-zinc-800/50 border-b border-zinc-200 dark:border-zinc-800">
                    <tr>
                      <th className="px-6 py-4 font-bold uppercase tracking-widest text-[11px] text-zinc-500">Billetera</th>
                      <th className="px-6 py-4 font-bold uppercase tracking-widest text-[11px] text-zinc-500 text-right">TNA Base</th>
                      <th className="px-6 py-4 font-bold uppercase tracking-widest text-[11px] text-zinc-500 text-right">Tope Máximo</th>
                      <th className="px-6 py-4 font-bold uppercase tracking-widest text-[11px] text-emerald-600 dark:text-emerald-400 text-right">Ganancia 30 días</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800/50">
                    {results.map(({ wallet, calc }, idx) => (
                      <tr key={wallet.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <span className="text-zinc-400 font-mono tabular-nums text-xs w-4">{idx + 1}.</span>
                            <span className="font-medium text-slate-900 dark:text-zinc-100">{wallet.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right font-mono tabular-nums text-zinc-600 dark:text-zinc-300">{wallet.tna}%</td>
                        <td className="px-6 py-4 text-right font-mono tabular-nums text-zinc-500 dark:text-zinc-400">
                          {wallet.maxCapARS ? formatArs(wallet.maxCapARS) : 'Sin límite'}
                        </td>
                        <td className="px-6 py-4 text-right font-mono tabular-nums font-bold text-emerald-600 dark:text-emerald-400">
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
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-md p-6 shadow-sm sticky top-24">
              <h2 className="font-serif text-lg font-medium text-slate-900 dark:text-zinc-100 mb-6">Tu Capital</h2>

              <div className="space-y-6">
                <div>
                  <label className="block font-bold uppercase tracking-widest text-[11px] text-zinc-500 mb-2">Ingresá el monto a invertir</label>
                  <div className="relative">
                    <span className="absolute left-4 top-3 text-zinc-400 font-mono tabular-nums">$</span>
                    <input
                      type="number"
                      min="0"
                      value={capital || ''}
                      onChange={(e) => setCapital(Number(e.target.value))}
                      className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-md py-3 pl-8 pr-4 font-mono tabular-nums text-slate-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-600 focus:ring-1 focus:ring-zinc-400 dark:focus:ring-zinc-600 transition-colors"
                      placeholder="0"
                    />
                  </div>
                </div>

                <div className="pt-6 border-t border-zinc-200 dark:border-zinc-800">
                  <h3 className="font-bold uppercase tracking-widest text-[11px] text-zinc-500 mb-4">Mejor Opción: <span className="text-slate-900 dark:text-zinc-100">{topWallet.wallet.name}</span></h3>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center bg-zinc-50 dark:bg-zinc-800/40 p-3 rounded-md border border-zinc-200 dark:border-zinc-800/60">
                      <span className="font-bold uppercase tracking-widest text-[11px] text-zinc-500">Por Día</span>
                      <span className="font-mono tabular-nums font-medium text-emerald-600 dark:text-emerald-400">{formatArs(topWallet.calc.dailyEarnings)}</span>
                    </div>
                    <div className="flex justify-between items-center bg-zinc-50 dark:bg-zinc-800/40 p-3 rounded-md border border-zinc-200 dark:border-zinc-800/60">
                      <span className="font-bold uppercase tracking-widest text-[11px] text-zinc-500">Por Mes (30d)</span>
                      <span className="font-mono tabular-nums font-bold text-emerald-600 dark:text-emerald-400 text-lg">{formatArs(topWallet.calc.monthlyEarnings)}</span>
                    </div>
                    <div className="flex justify-between items-center bg-zinc-50 dark:bg-zinc-800/40 p-3 rounded-md border border-zinc-200 dark:border-zinc-800/60">
                      <span className="font-bold uppercase tracking-widest text-[11px] text-zinc-500">TNA Real Efectiva</span>
                      <span className="font-mono tabular-nums font-medium text-blue-600 dark:text-blue-400">{formatPct(topWallet.calc.effectiveYieldPct)}</span>
                    </div>
                  </div>

                  {topWallet.wallet.maxCapARS && capital > topWallet.wallet.maxCapARS && (
                    <p className="mt-4 font-mono tabular-nums text-[11px] text-amber-600 dark:text-amber-500/90 leading-relaxed">
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
