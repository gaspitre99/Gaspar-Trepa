'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Share2, RefreshCw } from 'lucide-react';
import toast from 'react-hot-toast';
import Link from 'next/link';

type Profile = 'Conservador' | 'Moderado' | 'Agresivo';

const PROFILES: readonly Profile[] = ['Conservador', 'Moderado', 'Agresivo'];
const RISK_LEVELS = [1, 2, 3, 4, 5] as const;

interface Portfolio {
  title: string;
  assets: string;
  returnEst: string;
  risk: number;
}

const PORTFOLIOS: Record<Profile, Portfolio[]> = {
  Conservador: [
    { title: 'El Refugio Seguro', assets: '60% Cauciones + 40% FCIs Money Market', returnEst: 'TNA ~40%', risk: 1 },
    { title: 'El Rentista', assets: '80% Plazo Fijo UVA + 20% Dólar MEP', returnEst: 'TNA ~Inflación + 1%', risk: 1 },
    { title: 'Escudo Protector', assets: '100% ONs Ley NY (Corto Plazo)', returnEst: 'TIR ~7% USD', risk: 2 },
  ],
  Moderado: [
    { title: 'El Halcón Dolarizado', assets: '40% ONs USD + 30% SPY + 30% Cauciones', returnEst: 'TIR ~15% USD + ARS', risk: 3 },
    { title: 'El Estratega Mixto', assets: '50% CEDEARs (Value) + 50% Bonos CER', returnEst: 'TNA ~80% / TIR ~5% USD', risk: 3 },
    { title: 'Cazador de Rendimiento', assets: '40% Bonos Soberanos + 60% FCIs Renta Mixta', returnEst: 'TIR ~20% USD', risk: 3 },
  ],
  Agresivo: [
    { title: 'Cazador de Carry Trade', assets: '70% Lecaps + 30% Acciones Panel General', returnEst: 'TNA ~90%', risk: 5 },
    { title: 'El Cripto-Delegado', assets: '50% BTC + 50% Acciones Tecnológicas (QQQ)', returnEst: 'Alta Volatilidad', risk: 5 },
    { title: 'All-In Soberano', assets: '80% AL30/GD30 + 20% Opciones (Calls)', returnEst: 'TIR ~25% USD', risk: 5 },
  ],
};

export default function PortfolioRoulette() {
  const [profile, setProfile] = useState<Profile>('Moderado');
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<Portfolio | null>(null);

  const spin = () => {
    setSpinning(true);
    setResult(null);

    // CSS animation duration simulation
    setTimeout(() => {
      const options = PORTFOLIOS[profile];
      const random = options[Math.floor(Math.random() * options.length)];
      setResult(random);
      setSpinning(false);
    }, 1500);
  };

  const share = () => {
    if (!result) return;
    const text = `¡Acabo de armar mi estrategia financiera "${result.title}"!\n\nAsignación: ${result.assets}\nRendimiento Estimado: ${result.returnEst}\n\n¡Descubrí tu perfil en Hablemos de Economía! 🚀`;
    navigator.clipboard.writeText(text);
    toast.success('¡Copiado al portapapeles!');
  };

  return (
<<<<<<< HEAD
    <div className="bg-slate-900/50 border border-slate-800 rounded-sm shadow-sm p-6 max-w-md mx-auto w-full relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-blue-500"></div>
      <h2 className="font-serif text-2xl font-medium text-slate-200 mb-2">Ruleta de Estrategia</h2>
=======
    <div className="bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-sm shadow-sm p-6 max-w-md mx-auto w-full relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-blue-500"></div>
      <h2 className="font-serif text-2xl font-medium text-slate-900 dark:text-slate-100 mb-2">Ruleta de Estrategia</h2>
>>>>>>> origin/main
      <p className="text-slate-400 text-sm mb-6">Encontrá tu asignación ideal de activos argentinos en 1 clic.</p>

      <div className="flex gap-2 mb-6">
        {PROFILES.map((p) => (
          <button
            key={p}
            onClick={() => setProfile(p)}
            className={`flex-1 py-1 px-2 text-xs font-semibold rounded-md border transition-colors ${
              profile === p
                ? 'bg-blue-500 border-blue-500 text-slate-900'
                : 'border-slate-600 text-slate-400 hover:border-slate-400 hover:text-white'
            }`}
          >
            {p}
          </button>
        ))}
      </div>

      <div className="bg-slate-800 rounded-lg p-6 mb-6 h-40 flex flex-col items-center justify-center border border-slate-700 relative overflow-hidden">
        {spinning ? (
          <div className="flex flex-col items-center animate-pulse">
            <RefreshCw className="h-8 w-8 text-blue-400 animate-spin mb-2" />
            <p className="font-mono text-blue-400 tracking-widest text-lg">CALCULANDO...</p>
          </div>
        ) : result ? (
          <div className="text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-xs font-bold text-blue-400 tracking-wider uppercase mb-1">
              {result.title}
            </div>
            <div className="text-lg font-medium text-white mb-2 leading-tight">
              {result.assets}
            </div>
            <div className="flex justify-center gap-4 text-xs text-slate-300 mt-3 border-t border-slate-700 pt-3">
              <span className="font-mono tabular-nums">{result.returnEst}</span>
              <span className="text-slate-500">|</span>
              <span className="flex items-center gap-1">
                Riesgo:
                <span className="flex gap-0.5">
                  {RISK_LEVELS.map(i => (
                    <span key={i} className={`h-2 w-2 rounded-full ${i <= result.risk ? (result.risk > 3 ? 'bg-red-500' : 'bg-amber-500') : 'bg-slate-700'}`}></span>
                  ))}
                </span>
              </span>
            </div>
          </div>
        ) : (
          <p className="text-slate-500 text-sm">Seleccioná tu perfil y girá la ruleta.</p>
        )}
      </div>

<<<<<<< HEAD
      <div className="flex flex-col gap-2">
        <div className="flex gap-3">
          <Button
            onClick={spin}
            disabled={spinning}
            className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-sm"
          >
            {spinning ? 'Girando...' : 'Ver Cartera Teórica'}
=======
      <div className="flex gap-3">
        <Button
          onClick={spin}
          disabled={spinning}
          className="flex-1 bg-slate-900 text-white dark:bg-white dark:text-slate-900 rounded-sm"
        >
          {spinning ? 'Girando...' : 'Ver Cartera Teórica'}
        </Button>

      <p className="text-[10px] text-slate-500 mt-2 text-center w-full block">*Asignación teórica de activos según perfil modelo. No constituye recomendación directa.</p>
        {result && (
          <Button onClick={share} variant="outline" className="border-slate-600 text-slate-900 bg-blue-100 hover:bg-blue-200">
            <Share2 className="h-4 w-4" />
>>>>>>> origin/main
          </Button>

          {result && (
            <Button onClick={share} variant="outline" className="border-emerald-600 text-emerald-400 hover:bg-emerald-900">
              <Share2 className="h-4 w-4" />
            </Button>
          )}
        </div>
        <p className="text-[10px] text-slate-500 mt-1 text-center w-full block">*Asignación teórica de activos según perfil modelo. No constituye recomendación directa.</p>
      </div>

      {result && (
        <div className="mt-4 pt-4 border-t border-slate-700 text-center animate-in fade-in duration-700">
           <p className="text-xs text-slate-400 mb-2">¿Querés aprender a armar esta cartera paso a paso?</p>
           <Link href="/teacher/courses" className="text-sm font-semibold text-blue-400 hover:text-blue-300 hover:underline">
             Mirá el curso de Inversiones &rarr;
           </Link>
        </div>
      )}
    </div>
  );
}
