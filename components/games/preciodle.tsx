'use client';

import React, { useState, useEffect } from 'react';
import { getDailyProduct, getTodayDateString, PreciodleItem } from '@/lib/preciodle-data';
import { formatPrice } from '@/lib/format';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Share2, ShoppingCart, RefreshCcw } from 'lucide-react';
import toast from 'react-hot-toast';

type Proximity = 'EXACT' | 'CLOSE' | 'FAR';

interface Guess {
  value: number;
  proximity: Proximity;
  direction: 'UP' | 'DOWN' | 'CORRECT';
}

interface PreciodleState {
  lastPlayedDate: string;
  guesses: Guess[];
  gameStatus: 'IN_PROGRESS' | 'WON' | 'LOST';
  streak: number;
  maxStreak: number;
  gamesWon: number;
  gamesPlayed: number;
}

const MAX_GUESSES = 6;
const LOCAL_STORAGE_KEY = 'preciodle_stats_v1';

export default function Preciodle() {
  const [product, setProduct] = useState<PreciodleItem | null>(null);
  const [currentGuess, setCurrentGuess] = useState<string>('');
  const [state, setState] = useState<PreciodleState | null>(null);
  const [nextDayTime, setNextDayTime] = useState<string>('');

  useEffect(() => {
    // Determine daily product
    const item = getDailyProduct();
    setProduct(item);

    // Load state
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    const today = getTodayDateString();

    let parsedState: PreciodleState;
    if (saved) {
      parsedState = JSON.parse(saved);
      // Reset daily properties if it's a new day
      if (parsedState.lastPlayedDate !== today) {
        parsedState.guesses = [];
        parsedState.gameStatus = 'IN_PROGRESS';
        parsedState.lastPlayedDate = today;
      }
    } else {
      parsedState = {
        lastPlayedDate: today,
        guesses: [],
        gameStatus: 'IN_PROGRESS',
        streak: 0,
        maxStreak: 0,
        gamesWon: 0,
        gamesPlayed: 0,
      };
    }
    setState(parsedState);

    // Setup countdown timer
    const interval = setInterval(() => {
      const now = new Date();
      const tomorrow = new Date(now);
      tomorrow.setHours(24, 0, 0, 0);
      const diff = tomorrow.getTime() - now.getTime();
      const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((diff % (1000 * 60)) / 1000);
      setNextDayTime(`${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (state) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
    }
  }, [state]);

  if (!product || !state) return null;

  const handleGuess = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseInt(currentGuess.replace(/\D/g, ''), 10);
    if (isNaN(val) || val <= 0) return;

    const diffPercent = Math.abs(val - product.targetPrice) / product.targetPrice;

    let proximity: Proximity = 'FAR';
    if (diffPercent <= 0.05) proximity = 'EXACT';
    else if (diffPercent <= 0.20) proximity = 'CLOSE';

    let direction: 'UP' | 'DOWN' | 'CORRECT' = 'CORRECT';
    if (val < product.targetPrice && proximity !== 'EXACT') direction = 'UP';
    if (val > product.targetPrice && proximity !== 'EXACT') direction = 'DOWN';

    const newGuess: Guess = { value: val, proximity, direction };
    const newGuesses = [...state.guesses, newGuess];

    let newStatus = state.gameStatus;
    let newStreak = state.streak;
    let newMaxStreak = state.maxStreak;
    let newGamesWon = state.gamesWon;
    let newGamesPlayed = state.gamesPlayed;

    if (proximity === 'EXACT') {
      newStatus = 'WON';
      newStreak += 1;
      newMaxStreak = Math.max(newMaxStreak, newStreak);
      newGamesWon += 1;
      newGamesPlayed += 1;
      toast.success('¡Excelente! Acertaste el precio.');
    } else if (newGuesses.length >= MAX_GUESSES) {
      newStatus = 'LOST';
      newStreak = 0;
      newGamesPlayed += 1;
      toast.error(`Fin del juego. El precio era ${formatPrice(product.targetPrice)}`);
    }

    setState({
      ...state,
      guesses: newGuesses,
      gameStatus: newStatus,
      streak: newStreak,
      maxStreak: newMaxStreak,
      gamesWon: newGamesWon,
      gamesPlayed: newGamesPlayed,
    });
    setCurrentGuess('');
  };

  const getEmojiGrid = () => {
    return state.guesses.map(g => {
      if (g.proximity === 'EXACT') return '🟩';
      if (g.proximity === 'CLOSE') return '🟨';
      return '🟥';
    }).join('');
  };

  const shareResult = () => {
    const epochOrigin = new Date('2024-01-01T00:00:00Z').getTime();
    const dayIndex = Math.floor((Date.now() - epochOrigin) / 86400000);
    const score = state.gameStatus === 'WON' ? state.guesses.length : 'X';
    const grid = getEmojiGrid();

    const text = `Preciodle #${dayIndex} ${score}/${MAX_GUESSES}\n${grid}\nRacha actual: ${state.streak} 🔥\n¡Jugá en Hablemos de Economía!`;
    navigator.clipboard.writeText(text);
    toast.success('Resultados copiados al portapapeles');
  };

  const renderGuesses = () => {
    const rows = [];
    for (let i = 0; i < MAX_GUESSES; i++) {
      const g = state.guesses[i];
      if (g) {
        let bgColor = 'bg-slate-800 border-slate-700';
        if (g.proximity === 'EXACT') bgColor = 'bg-emerald-600 border-emerald-500';
        else if (g.proximity === 'CLOSE') bgColor = 'bg-amber-500 border-amber-400';
        else bgColor = 'bg-rose-600 border-rose-500';

        rows.push(
          <div key={i} className={`flex items-center justify-between p-3 rounded-md border text-white font-bold mb-2 transition-all ${bgColor}`}>
            <span>{formatPrice(g.value)}</span>
            <span className="text-sm">
              {g.proximity === 'EXACT' && '¡CORRECTO!'}
              {g.direction === 'UP' && '▲ EL PRECIO ES MAYOR'}
              {g.direction === 'DOWN' && '▼ EL PRECIO ES MENOR'}
            </span>
          </div>
        );
      } else {
        rows.push(
          <div key={i} className="flex items-center justify-center p-3 rounded-md border border-slate-700 bg-slate-800/50 mb-2 h-12">
            <span className="text-slate-600 font-mono text-sm">{i + 1}</span>
          </div>
        );
      }
    }
    return rows;
  };

  return (
    <div className="max-w-md mx-auto w-full bg-slate-900 border border-slate-700 rounded-xl overflow-hidden shadow-xl text-white">
      <div className="bg-slate-800 p-4 border-b border-slate-700 flex justify-between items-center">
        <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
          <ShoppingCart className="h-5 w-5 text-emerald-400" />
          PRECIODLE
        </h2>
        <div className="text-xs text-slate-400 font-semibold bg-slate-900 px-2 py-1 rounded">
          Racha: {state.streak} 🔥
        </div>
      </div>

      <div className="p-6">
        <div className="text-center mb-6">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">{product.category}</span>
          <h3 className="text-2xl font-bold text-emerald-400">{product.name}</h3>
        </div>

        <div className="mb-6">
          {renderGuesses()}
        </div>

        {state.gameStatus === 'IN_PROGRESS' ? (
          <form onSubmit={handleGuess} className="flex gap-2">
            <div className="relative flex-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
              <Input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                placeholder="Ingresar precio en ARS"
                value={currentGuess}
                onChange={(e) => setCurrentGuess(e.target.value)}
                className="pl-8 bg-slate-800 border-slate-700 text-white font-bold"
                required
              />
            </div>
            <Button type="submit" className="bg-emerald-600 hover:bg-emerald-500 font-bold text-white">
              Adivinar
            </Button>
          </form>
        ) : (
          <div className="text-center animate-in fade-in zoom-in duration-500 bg-slate-800 border border-slate-700 rounded-lg p-6">
            <h4 className="text-2xl font-black mb-2">
              {state.gameStatus === 'WON' ? '¡GANASTE!' : 'JUEGO TERMINADO'}
            </h4>
            <p className="text-slate-300 mb-4">El precio de hoy era <strong className="text-white text-lg">{formatPrice(product.targetPrice)}</strong></p>

            <div className="grid grid-cols-2 gap-4 mb-6 border-t border-slate-700 pt-4">
               <div>
                  <div className="text-3xl font-black text-emerald-400">{state.gamesWon}/{state.gamesPlayed}</div>
                  <div className="text-xs text-slate-400 uppercase font-bold">Victorias</div>
               </div>
               <div>
                  <div className="text-3xl font-black text-amber-400">{state.maxStreak}</div>
                  <div className="text-xs text-slate-400 uppercase font-bold">Racha Máx</div>
               </div>
            </div>

            <div className="flex gap-4 items-center justify-center">
               <div className="text-left">
                  <div className="text-xs text-slate-400 uppercase font-bold mb-1">Próximo en</div>
                  <div className="font-mono text-xl font-bold flex items-center gap-2">
                    <RefreshCcw className="h-4 w-4" /> {nextDayTime}
                  </div>
               </div>
               <div className="w-px h-12 bg-slate-700 mx-2"></div>
               <Button onClick={shareResult} className="bg-emerald-600 hover:bg-emerald-500 font-bold text-white flex gap-2">
                 <Share2 className="h-4 w-4" /> Compartir
               </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
