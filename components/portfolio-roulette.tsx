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
    <div className="bg-neutral-900 border border-neutral-800 rounded-sm shadow-sm p-6 max-w-md mx-auto w-full relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-sky-400 to-sky-600"></div>
      <h2 className="font-serif text-2xl font-medium text-neutral-50 mb-2">Ruleta de Estrategia</h2>
      <p className="text-neutral-400 text-sm mb-6">Encontrá tu asignación ideal de activos argentinos en 1 clic.</p>

      <div className="flex gap-2 mb-6">
        {PROFILES.map((p) => (
          <button
            key={p}
            onClick={() => setProfile(p)}
            className={`flex-1 py-1 px-2 text-xs font-semibold rounded-md border transition-colors ${
              profile === p
                ? 'bg-sky-500 border-sky-500 text-white'
                : 'border-neutral-600 text-neutral-400 hover:border-sky-500 hover:text-white'
            }`}
          >
            {p}
          </button>
        ))}
      </div>

      <div className="bg-neutral-950 rounded-lg p-6 mb-6 h-40 flex flex-col items-center justify-center border border-neutral-800 relative overflow-hidden">
        {spinning ? (
          <div className="flex flex-col items-center animate-pulse">
            <RefreshCw className="h-8 w-8 text-sky-400 animate-spin mb-2" />
            <p className="font-mono text-sky-400 tracking-widest text-lg">CALCULANDO...</p>
          </div>
        ) : result ? (
          <div className="text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-xs font-bold text-sky-400 tracking-wider uppercase mb-1">
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
          <p className="text-neutral-500 text-sm">Seleccioná tu perfil y girá la ruleta.</p>
        )}
      </div>

      <div className="flex gap-3">
        <Button
          onClick={spin}
          disabled={spinning}
          className="flex-1 bg-sky-600 hover:bg-sky-500 text-white rounded-sm"
        >
          {spinning ? 'Girando...' : 'Ver Cartera Teórica'}
        </Button>

      <p className="text-[10px] text-neutral-500 mt-2 text-center w-full block">*Asignación teórica de activos según perfil modelo. No constituye recomendación directa.</p>
        {result && (
          <Button onClick={share} variant="outline" className="border-sky-500 text-sky-400 bg-transparent hover:bg-sky-950/30">
            <Share2 className="h-4 w-4" />
          </Button>
        )}
      </div>

      {result && (
        <div className="mt-4 pt-4 border-t border-neutral-700 text-center animate-in fade-in duration-700">
           <p className="text-xs text-neutral-400 mb-2">¿Querés aprender a armar esta cartera paso a paso?</p>
           <Link href="/teacher/courses" className="text-sm font-semibold text-sky-400 hover:text-sky-300 hover:underline">
             Mirá el curso de Inversiones &rarr;
           </Link>
        </div>
      )}
    </div>
  );
}
