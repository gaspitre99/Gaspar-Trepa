'use client';

import React from 'react';
import Link from 'next/link';
import { Calculator, Coins, History, Wallet } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const tools = [
  {
    title: 'Ranking de Billeteras Virtuales',
    description: 'Compara rendimientos diarios, TNA y simulador de inversión para las principales billeteras.',
    href: '/herramientas/billeteras',
    icon: Wallet,
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10'
  },
  {
    title: 'Breakeven MEP vs Tasa',
    description: 'Compara si te conviene hacer tasa fija en pesos o comprar dólar MEP.',
    href: '/herramientas/breakeven',
    icon: Coins,
    color: 'text-amber-400',
    bgColor: 'bg-amber-500/10'
  },
  {
    title: 'Historia Monetaria & Zeros',
    description: 'Evolución de los signos monetarios en Argentina y convertidor histórico a pesos actuales.',
    href: '/herramientas/historia-monetaria',
    icon: History,
    color: 'text-rose-400',
    bgColor: 'bg-rose-500/10'
  },
  {
    title: 'Inflación Acumulada (IPC)',
    description: 'Calcula la inflación acumulada entre dos períodos específicos históricamente.',
    href: '/herramientas/inflacion',
    icon: Calculator,
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/10'
  }
];

export default function HerramientasHubPage() {
  return (
    <div className="bg-slate-950 min-h-screen p-6 text-slate-100">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="space-y-4 mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-white">Hub de Herramientas</h1>
          <p className="text-slate-400 text-lg">
            Calculadoras interactivas y visualizadores para entender mejor la economía.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <Card key={tool.href} className="bg-slate-900/70 border-slate-800 text-slate-100 flex flex-col hover:border-slate-700 transition-colors">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className={`p-2 rounded-lg ${tool.bgColor}`}>
                    <tool.icon className={`h-6 w-6 ${tool.color}`} />
                  </div>
                  <CardTitle className="text-lg text-white">{tool.title}</CardTitle>
                </div>
                <CardDescription className="text-slate-400 text-sm line-clamp-2 min-h-[40px]">
                  {tool.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="mt-auto pt-4">
                <Button asChild className="w-full bg-slate-800 hover:bg-slate-700 text-white border border-slate-700">
                  <Link href={tool.href}>Abrir Herramienta</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
