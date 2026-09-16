'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRightLeft, TrendingUp, Landmark, Calculator } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface Rate {
  moneda: string;
  casa: string;
  nombre: string;
  compra: number;
  venta: number;
  fechaActualizacion: string;
}

export default function CotizacionesPage() {
  const [rates, setRates] = useState<Rate[]>([]);
  const [loading, setLoading] = useState(true);
  const [arsAmount, setArsAmount] = useState('100000');
  const [btcPrice, setBtcPrice] = useState<number | null>(null);
  const [riesgoPais, setRiesgoPais] = useState<number | null>(null);

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        const res = await fetch('https://dolarapi.com/v1/dolares');
        const dolares = await res.json();

        // Also try to get Riesgo Pais if available, or just mock it for now since there's no reliable API
        const riesgoRes = await fetch('https://dolarapi.com/v1/riesgopais').catch(() => null);
        if (riesgoRes && riesgoRes.ok) {
           const riesgoData = await riesgoRes.json();
           if (isMounted) setRiesgoPais(riesgoData.valor);
        } else {
           if (isMounted) setRiesgoPais(1240); // mock
        }

        const btcRes = await fetch('https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT').catch(() => null);
        if (btcRes && btcRes.ok) {
           const btcData = await btcRes.json();
           if (isMounted) setBtcPrice(parseFloat(btcData.price));
        } else {
           if (isMounted) setBtcPrice(65000); // mock
        }

        if (isMounted) {
          setRates(dolares);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching rates', error);
        if (isMounted) setLoading(false);
      }
    };
    fetchData();
    const interval = setInterval(fetchData, 60000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    }
  }, []);

  const getRate = (casa: string) => rates.find(r => r.casa === casa)?.venta || 0;

  const oficial = getRate('oficial');
  const blue = getRate('blue');
  const mep = getRate('mep');
  const ccl = getRate('contadoconliqui');
  const cripto = getRate('cripto');

  const brechaBlue = oficial ? ((blue - oficial) / oficial) * 100 : 0;
  const brechaMep = oficial ? ((mep - oficial) / oficial) * 100 : 0;
  const brechaCcl = oficial ? ((ccl - oficial) / oficial) * 100 : 0;

  const parsedArs = parseFloat(arsAmount) || 0;

  if (loading) {
    return <div className="p-8 text-center text-slate-400">Cargando cotizaciones en tiempo real...</div>;
  }

  return (
    <div className="bg-slate-950 min-h-screen p-6 text-slate-100">
      <div className="max-w-6xl mx-auto space-y-8">

        <div className="space-y-4">
          <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-2">
            <TrendingUp className="h-8 w-8 text-emerald-400" />
            Monitor de Cotizaciones & Brecha
          </h1>
          <p className="text-slate-400 text-lg">
            Seguimiento en tiempo real de los distintos tipos de cambio y activos clave.
          </p>
        </div>

        {/* Top Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <Card className="bg-slate-900/70 border-slate-800 flex flex-col items-center justify-center p-4">
            <span className="text-slate-400 text-sm font-semibold mb-1">Dólar Oficial</span>
            <span className="text-xl font-bold text-white">${oficial.toFixed(2)}</span>
          </Card>
          <Card className="bg-slate-900/70 border-slate-800 flex flex-col items-center justify-center p-4">
            <span className="text-slate-400 text-sm font-semibold mb-1">Dólar Blue</span>
            <span className="text-xl font-bold text-emerald-400">${blue.toFixed(2)}</span>
          </Card>
          <Card className="bg-slate-900/70 border-slate-800 flex flex-col items-center justify-center p-4">
            <span className="text-slate-400 text-sm font-semibold mb-1">Dólar MEP</span>
            <span className="text-xl font-bold text-white">${mep.toFixed(2)}</span>
          </Card>
          <Card className="bg-slate-900/70 border-slate-800 flex flex-col items-center justify-center p-4">
            <span className="text-slate-400 text-sm font-semibold mb-1">Dólar CCL</span>
            <span className="text-xl font-bold text-white">${ccl.toFixed(2)}</span>
          </Card>
          <Card className="bg-slate-900/70 border-slate-800 flex flex-col items-center justify-center p-4">
            <span className="text-slate-400 text-sm font-semibold mb-1">Cripto (USDT)</span>
            <span className="text-xl font-bold text-white">${cripto.toFixed(2)}</span>
          </Card>
          <Card className="bg-slate-900/70 border-slate-800 flex flex-col items-center justify-center p-4">
            <span className="text-slate-400 text-sm font-semibold mb-1">Riesgo País</span>
            <span className="text-xl font-bold text-rose-400">{riesgoPais} pb</span>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">

          {/* Calculador de Brecha */}
          <Card className="bg-slate-900/70 border-slate-800 text-slate-100">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Landmark className="h-5 w-5 text-blue-400" />
                Brecha Cambiaria
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg bg-slate-950 border border-slate-800">
                  <span className="font-medium text-slate-300">Brecha Dólar Blue</span>
                  <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/20 text-sm py-1 px-3">
                    {brechaBlue.toFixed(1)}%
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-slate-950 border border-slate-800">
                  <span className="font-medium text-slate-300">Brecha Dólar MEP</span>
                  <Badge variant="outline" className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 text-sm py-1 px-3">
                    {brechaMep.toFixed(1)}%
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-slate-950 border border-slate-800">
                  <span className="font-medium text-slate-300">Brecha Dólar CCL</span>
                  <Badge variant="outline" className="bg-amber-500/10 text-amber-400 border-amber-500/20 text-sm py-1 px-3">
                    {brechaCcl.toFixed(1)}%
                  </Badge>
                </div>
              </div>
              <p className="text-xs text-slate-500">
                La brecha cambiaria se calcula tomando como base la cotización de venta del Dólar Oficial.
              </p>
            </CardContent>
          </Card>

          {/* Conversor Rápido */}
          <Card className="bg-slate-900/70 border-slate-800 text-slate-100">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <ArrowRightLeft className="h-5 w-5 text-emerald-400" />
                Conversor Rápido
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label className="text-slate-300">Monto en Pesos (ARS)</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">$</span>
                  <Input
                    type="number"
                    value={arsAmount}
                    onChange={(e) => setArsAmount(e.target.value)}
                    className="pl-7 bg-slate-950 border-slate-700 text-white font-semibold text-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 flex flex-col items-center justify-center text-center">
                  <span className="text-xs text-slate-400 mb-1 uppercase font-bold">Oficial</span>
                  <span className="text-lg font-bold text-white">U$S {(parsedArs / oficial).toLocaleString('en-US', {maximumFractionDigits:2})}</span>
                </div>
                <div className="p-4 rounded-lg bg-emerald-950/20 border border-emerald-900/50 flex flex-col items-center justify-center text-center">
                  <span className="text-xs text-emerald-500 mb-1 uppercase font-bold">Blue</span>
                  <span className="text-lg font-bold text-emerald-400">U$S {(parsedArs / blue).toLocaleString('en-US', {maximumFractionDigits:2})}</span>
                </div>
                <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 flex flex-col items-center justify-center text-center">
                  <span className="text-xs text-slate-400 mb-1 uppercase font-bold">MEP</span>
                  <span className="text-lg font-bold text-white">U$S {(parsedArs / mep).toLocaleString('en-US', {maximumFractionDigits:2})}</span>
                </div>
              </div>
            </CardContent>
          </Card>

        </div>

      </div>
    </div>
  );
}
