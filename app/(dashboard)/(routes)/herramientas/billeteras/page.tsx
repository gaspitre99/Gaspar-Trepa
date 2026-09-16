'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { walletsData, WalletData } from '@/lib/wallets-data';
import { Badge } from '@/components/ui/badge';
import { Wallet, ArrowRight, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export default function BilleterasPage() {
  const [amount, setAmount] = useState<string>('100000');

  // Sort wallets by TNA descending
  const sortedWallets = [...walletsData].sort((a, b) => b.tna - a.tna);

  const calculateYields = (wallet: WalletData, principal: number) => {
    // If the principal exceeds the cap, only the cap generates yield
    const effectivePrincipal = wallet.limitCap > 0 ? Math.min(principal, wallet.limitCap) : principal;

    // Simplified interest calculation based on daily yield without compounding for simplicity in this display
    const daily = effectivePrincipal * (wallet.dailyYield / 100);
    const weekly = daily * 7;
    const monthly = effectivePrincipal * (wallet.tna / 100) / 12;

    return { daily, weekly, monthly, capped: wallet.limitCap > 0 && principal > wallet.limitCap };
  };

  const parsedAmount = parseFloat(amount) || 0;

  return (
    <div className="bg-slate-950 min-h-screen p-6 text-slate-100">
      <div className="max-w-5xl mx-auto space-y-8">

        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-2">
             <Link href="/herramientas" className="text-blue-400 hover:underline text-sm flex items-center gap-1">
               <ArrowRight className="h-4 w-4 rotate-180" />
               Volver a Herramientas
             </Link>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-2">
            <Wallet className="h-8 w-8 text-blue-400" />
            Comparador de Billeteras Virtuales
          </h1>
          <p className="text-slate-400 text-lg">
            Calcula cuánto rinde tu plata por día, semana y mes en las principales billeteras del país.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Calculator Input */}
          <div className="lg:col-span-1">
            <Card className="bg-slate-900/70 border-slate-800 text-slate-100 sticky top-24">
              <CardHeader>
                <CardTitle className="text-white">Calculadora</CardTitle>
                <CardDescription className="text-slate-400">
                  Ingresá el capital a invertir
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-slate-300">Capital (ARS)</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">$</span>
                    <Input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="pl-7 bg-slate-950 border-slate-700 text-white font-semibold"
                      min="0"
                    />
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-blue-950/20 border border-blue-900/50 flex items-start gap-3 mt-6">
                  <TrendingUp className="h-5 w-5 text-blue-400 mt-0.5 shrink-0" />
                  <p className="text-sm text-blue-200">
                    Los rendimientos están basados en la TNA informada y pueden variar diariamente. Se aplica límite de remuneración si la billetera lo estipula.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Ranking and Yields */}
          <div className="lg:col-span-2 space-y-4">
            {sortedWallets.map((wallet, index) => {
              const yields = calculateYields(wallet, parsedAmount);

              return (
                <Card key={wallet.id} className={`bg-slate-900/70 border-slate-800 text-slate-100 overflow-hidden transition-all ${index === 0 ? 'ring-1 ring-emerald-500/50' : ''}`}>
                  <div className="p-5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-slate-800 flex items-center justify-center font-bold text-lg border border-slate-700">
                          {index + 1}
                        </div>
                        <div>
                          <h3 className="font-bold text-xl text-white flex items-center gap-2">
                            {wallet.name}
                            {index === 0 && <Badge className="bg-emerald-500 hover:bg-emerald-600 text-white border-none">Mejor Tasa</Badge>}
                          </h3>
                          {wallet.limitCap > 0 ? (
                             <p className="text-xs text-slate-500 mt-1">Remunera hasta ${wallet.limitCap.toLocaleString('es-AR')}</p>
                          ) : (
                             <p className="text-xs text-slate-500 mt-1">Sin límite informado</p>
                          )}
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-2xl font-black text-emerald-400">{wallet.tna.toFixed(1)}%</div>
                        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">TNA</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 sm:gap-4 border-t border-slate-800 pt-4">
                      <div className="flex flex-col">
                        <span className="text-xs text-slate-500 mb-1">Por Día</span>
                        <span className="font-semibold text-white">+${yields.daily.toLocaleString('es-AR', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                      </div>
                      <div className="flex flex-col border-l border-slate-800 pl-2 sm:pl-4">
                        <span className="text-xs text-slate-500 mb-1">Por Semana</span>
                        <span className="font-semibold text-white">+${yields.weekly.toLocaleString('es-AR', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                      </div>
                      <div className="flex flex-col border-l border-slate-800 pl-2 sm:pl-4">
                        <span className="text-xs text-slate-500 mb-1">Por Mes</span>
                        <span className="font-semibold text-white">+${yields.monthly.toLocaleString('es-AR', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                      </div>
                    </div>

                    {yields.capped && (
                      <div className="mt-4 text-xs text-rose-400 bg-rose-500/10 p-2 rounded border border-rose-500/20">
                        Atención: Estás invirtiendo por encima del tope de ${wallet.limitCap.toLocaleString('es-AR')}. El excedente no genera intereses en esta billetera.
                      </div>
                    )}
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
