'use client';

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Calculator, History } from 'lucide-react';
import Link from 'next/link';

const currencies = [
  {
    id: 'msn',
    name: 'Peso Moneda Nacional (m$n)',
    years: '1881–1969',
    conversionFactor: 10000000000000,
    zerosEliminated: 13,
    divisorDesc: '÷ 10.000.000.000.000',
  },
  {
    id: 'pl',
    name: 'Peso Ley 18.188 ($L)',
    years: '1970–1983',
    conversionFactor: 100000000000,
    zerosEliminated: 11,
    divisorDesc: '÷ 100.000.000.000 (acumulado)',
  },
  {
    id: 'pa',
    name: 'Peso Argentino ($a)',
    years: '1983–1985',
    conversionFactor: 10000000,
    zerosEliminated: 7,
    divisorDesc: '÷ 10.000.000 (acumulado)',
  },
  {
    id: 'a',
    name: 'Austral (₳)',
    years: '1985–1991',
    conversionFactor: 10000,
    zerosEliminated: 4,
    divisorDesc: '÷ 10.000 (acumulado)',
  },
  {
    id: 'pc',
    name: 'Peso Convertible / Actual ($)',
    years: '1992–Presente',
    conversionFactor: 1,
    zerosEliminated: 0,
    divisorDesc: 'Moneda actual',
  }
];

export default function HistoriaMonetariaPage() {
  const [amount, setAmount] = useState<string>('10000000000000');
  const [selectedCurrencyId, setSelectedCurrencyId] = useState<string>('msn');

  const selectedCurrency = useMemo(() =>
    currencies.find(c => c.id === selectedCurrencyId) || currencies[0]
  , [selectedCurrencyId]);

  const convertedAmount = useMemo(() => {
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount)) return 0;
    return numAmount / selectedCurrency.conversionFactor;
  }, [amount, selectedCurrency]);

  return (
    <div className="bg-slate-950 min-h-screen text-slate-100 p-6">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-2">
             <Link href="/herramientas" className="text-sky-400 hover:underline text-sm flex items-center gap-1">
               <ArrowRight className="h-4 w-4 rotate-180" />
               Volver a Herramientas
             </Link>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Historia Monetaria Argentina</h1>
          <p className="text-slate-400 text-lg">
            Explora la evolución de los signos monetarios en Argentina y convierte valores históricos a pesos actuales.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Timeline */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <History className="h-5 w-5 text-sky-400" />
              <h2 className="text-2xl font-semibold text-white">Línea de Tiempo</h2>
            </div>
            <div className="relative border-l border-slate-700 ml-3 space-y-8">
              {currencies.map((currency) => (
                <div key={currency.id} className="relative pl-6">
                  <span className="absolute -left-[5px] top-1 h-2.5 w-2.5 rounded-full bg-sky-500" />
                  <div className="flex flex-col gap-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-bold text-slate-200">{currency.name}</span>
                      <Badge variant="outline" className="text-xs border-slate-700 text-slate-300">
                        {currency.years}
                      </Badge>
                    </div>
                    {currency.zerosEliminated > 0 && (
                      <span className="text-sm text-rose-400 font-medium">
                        Eliminó ceros: {currency.id === 'msn' ? 'Base' : currency.id === 'pl' ? '2 ceros' : currency.id === 'pa' ? '4 ceros' : currency.id === 'a' ? '3 ceros' : '0'}
                        {' '}(Total acumulado desde m$n: {currency.zerosEliminated} ceros)
                      </span>
                    )}
                    {currency.id === 'pc' && (
                       <span className="text-sm text-rose-400 font-medium">
                         Eliminó ceros: 4 ceros (Total acumulado desde m$n: 13 ceros)
                       </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <Card className="mt-8 bg-slate-900/70 border-slate-800 text-slate-100">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-white">Visualizador de Ceros Acumulados</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-400 mb-2">Para tener un 1 Peso actual ($), se necesitarían:</p>
                <div className="text-xl font-bold text-sky-400 break-all">
                  10.000.000.000.000 m$n
                </div>
                <Badge variant="destructive" className="mt-2 bg-rose-500/20 text-rose-400 border-none">
                  13 ceros eliminados en total
                </Badge>
              </CardContent>
            </Card>
          </div>

          {/* Converter */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Calculator className="h-5 w-5 text-sky-400" />
              <h2 className="text-2xl font-semibold text-white">Conversor Histórico</h2>
            </div>
            <Card className="bg-slate-900/70 border-slate-800 text-slate-100 shadow-md">
              <CardHeader>
                <CardTitle className="text-white">Calculadora de Equivalencias</CardTitle>
                <CardDescription className="text-slate-400">
                  Ingresa un monto en cualquier moneda histórica para ver su valor equivalente en pesos convertibles / actuales.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-slate-300">Moneda de Origen</Label>
                    <Select
                      value={selectedCurrencyId}
                      onValueChange={setSelectedCurrencyId}
                    >
                      <SelectTrigger className="bg-slate-950 border-slate-700 text-slate-200">
                        <SelectValue placeholder="Selecciona una moneda" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-900 border-slate-700 text-slate-200">
                        {currencies.map(c => (
                          <SelectItem key={c.id} value={c.id} className="focus:bg-slate-800 focus:text-white">
                            {c.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-slate-300">Monto Histórico</Label>
                    <Input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="Ej. 1000"
                      min="0"
                      className="bg-slate-950 border-slate-700 text-slate-200 placeholder:text-slate-500"
                    />
                  </div>
                </div>

                <div className="flex justify-center py-2">
                  <ArrowRight className="h-6 w-6 text-slate-600 rotate-90 md:rotate-0" />
                </div>

                <div className="rounded-lg bg-slate-950 border border-slate-800 p-4 space-y-2 text-center">
                  <p className="text-sm text-slate-400 font-medium">Equivalente en Pesos Actuales ($)</p>
                  <div className="text-3xl font-bold text-sky-400">
                    $ {convertedAmount.toLocaleString('es-AR', { maximumFractionDigits: 6 })}
                  </div>
                  {selectedCurrency.zerosEliminated > 0 && (
                    <p className="text-xs text-slate-500 mt-2">
                      Factor de conversión: {selectedCurrency.divisorDesc}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
