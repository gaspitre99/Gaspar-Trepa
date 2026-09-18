'use client';

import React, { useState, useEffect } from 'react';
import { getDailyTrivia, TriviaItem } from '@/lib/real-o-chamuyo-data';
import { Button } from '@/components/ui/button';
import { Share2, RefreshCcw, CheckCircle2, XCircle, BrainCircuit } from 'lucide-react';
import toast from 'react-hot-toast';
import { getTodayDateString } from '@/lib/preciodle-data';

interface ChamuyoState {
  lastPlayedDate: string;
  answers: boolean[]; // true if guessed correctly, false otherwise
  gameStatus: 'IN_PROGRESS' | 'FINISHED';
  streak: number;
  gamesPlayed: number;
}

const LOCAL_STORAGE_KEY = 'real_o_chamuyo_stats_v1';

export default function RealOChamuyo() {
  const [questions, setQuestions] = useState<TriviaItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [state, setState] = useState<ChamuyoState | null>(null);
  const [nextDayTime, setNextDayTime] = useState<string>('');

  // Feedback phase state
  const [showFeedback, setShowFeedback] = useState(false);
  const [lastGuessCorrect, setLastGuessCorrect] = useState(false);

  useEffect(() => {
    setQuestions(getDailyTrivia());

    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    const today = getTodayDateString();

    let parsedState: ChamuyoState;
    if (saved) {
      parsedState = JSON.parse(saved);
      if (parsedState.lastPlayedDate !== today) {
        parsedState.answers = [];
        parsedState.gameStatus = 'IN_PROGRESS';
        parsedState.lastPlayedDate = today;
      }
    } else {
      parsedState = {
        lastPlayedDate: today,
        answers: [],
        gameStatus: 'IN_PROGRESS',
        streak: 0,
        gamesPlayed: 0,
      };
    }
    setState(parsedState);

    // If game is in progress but they already answered some today, jump to next pending
    if (parsedState.gameStatus === 'IN_PROGRESS') {
      setCurrentIndex(parsedState.answers.length);
    }

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

  if (!state || questions.length === 0) return null;

  const currentQuestion = questions[currentIndex];

  const handleGuess = (guessIsReal: boolean) => {
    const isCorrect = guessIsReal === currentQuestion.isReal;
    setLastGuessCorrect(isCorrect);
    setShowFeedback(true);
  };

  const handleNext = () => {
    const newAnswers = [...state.answers, lastGuessCorrect];
    let newStatus = state.gameStatus;
    let newStreak = state.streak;
    let newGamesPlayed = state.gamesPlayed;

    if (newAnswers.length >= 5) {
      newStatus = 'FINISHED';
      newGamesPlayed += 1;

      const score = newAnswers.filter(Boolean).length;
      if (score >= 3) {
        newStreak += 1; // Win streak logic: 3 or more correct
      } else {
        newStreak = 0;
      }
    }

    setState({
      ...state,
      answers: newAnswers,
      gameStatus: newStatus,
      streak: newStreak,
      gamesPlayed: newGamesPlayed
    });

    setShowFeedback(false);
    setCurrentIndex(currentIndex + 1);
  };

  const getEmojiGrid = () => {
    return state.answers.map(a => a ? '🟩' : '🟥').join('');
  };

  const shareResult = () => {
    const epochOrigin = new Date('2024-01-01T00:00:00Z').getTime();
    const dayIndex = Math.floor((Date.now() - epochOrigin) / 86400000);
    const score = state.answers.filter(Boolean).length;

    const text = `Real o Chamuyo #${dayIndex} Acertaste ${score}/5\n\n${getEmojiGrid()}\nRacha: ${state.streak} 🔥\n¡Jugá en Hablemos de Economía!`;
    navigator.clipboard.writeText(text);
    toast.success('Copiado al portapapeles');
  };

  if (state.gameStatus === 'FINISHED') {
    const score = state.answers.filter(Boolean).length;
    return (
      <div className="max-w-md mx-auto w-full bg-slate-900 border border-slate-700 rounded-xl overflow-hidden shadow-xl text-white">
        <div className="bg-slate-800 p-4 border-b border-slate-700 flex justify-between items-center">
          <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
            <BrainCircuit className="h-5 w-5 text-purple-400" />
            REAL O CHAMUYO
          </h2>
          <div className="text-xs text-slate-400 font-semibold bg-slate-900 px-2 py-1 rounded">
            Racha: {state.streak} 🔥
          </div>
        </div>

        <div className="p-6 text-center animate-in fade-in zoom-in duration-500">
          <h4 className="text-2xl font-black mb-2">
            Acertaste {score} de 5
          </h4>
          <p className="text-slate-300 mb-6 text-2xl tracking-widest">{getEmojiGrid()}</p>

          <div className="flex gap-4 items-center justify-center pt-4 border-t border-slate-700 mt-4">
             <div className="text-left">
                <div className="text-xs text-slate-400 uppercase font-bold mb-1">Próximo en</div>
                <div className="font-mono text-xl font-bold flex items-center gap-2">
                  <RefreshCcw className="h-4 w-4 text-slate-500" /> {nextDayTime}
                </div>
             </div>
             <div className="w-px h-12 bg-slate-700 mx-2"></div>
             <Button onClick={shareResult} className="bg-purple-600 hover:bg-purple-500 font-bold text-white flex gap-2">
               <Share2 className="h-4 w-4" /> Compartir
             </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto w-full bg-slate-900 border border-slate-700 rounded-xl overflow-hidden shadow-xl text-white">
      <div className="bg-slate-800 p-4 border-b border-slate-700 flex justify-between items-center">
        <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
          <BrainCircuit className="h-5 w-5 text-purple-400" />
          REAL O CHAMUYO
        </h2>
        <div className="flex gap-1">
           {questions.map((_, i) => (
              <div key={i} className={`h-2 w-6 rounded-sm ${i < currentIndex ? (state.answers[i] ? 'bg-emerald-500' : 'bg-rose-500') : i === currentIndex ? 'bg-purple-500' : 'bg-slate-700'}`}></div>
           ))}
        </div>
      </div>

      <div className="p-6 min-h-[300px] flex flex-col justify-center relative">

        {!showFeedback ? (
          <div className="animate-in fade-in duration-300">
            <div className="mb-8 text-center">
              <span className="inline-block px-3 py-1 bg-slate-800 text-slate-400 text-xs font-bold rounded-full mb-4 uppercase tracking-widest border border-slate-700">
                {currentQuestion.year ? `${currentQuestion.country} - ${currentQuestion.year}` : currentQuestion.country}
              </span>
              <h3 className="text-2xl font-bold text-white leading-snug">
                &quot;{currentQuestion.statement}&quot;
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-auto">
              <Button onClick={() => handleGuess(true)} className="h-16 text-lg font-black bg-emerald-600 hover:bg-emerald-500 text-white border-none">
                REAL
              </Button>
              <Button onClick={() => handleGuess(false)} className="h-16 text-lg font-black bg-rose-600 hover:bg-rose-500 text-white border-none">
                CHAMUYO
              </Button>
            </div>
          </div>
        ) : (
          <div className="animate-in fade-in zoom-in-95 duration-300 text-center flex flex-col h-full">
             <div className="mb-4 flex justify-center">
               {lastGuessCorrect ? (
                 <div className="bg-emerald-500/20 text-emerald-400 px-4 py-2 rounded-full font-black text-xl flex items-center gap-2 border border-emerald-500/50">
                    <CheckCircle2 className="h-6 w-6" /> ¡CORRECTO!
                 </div>
               ) : (
                 <div className="bg-rose-500/20 text-rose-400 px-4 py-2 rounded-full font-black text-xl flex items-center gap-2 border border-rose-500/50">
                    <XCircle className="h-6 w-6" /> INCORRECTO
                 </div>
               )}
             </div>

             <div className="mb-4">
                <span className={`text-sm font-black uppercase tracking-wider ${currentQuestion.isReal ? 'text-emerald-400' : 'text-rose-400'}`}>
                  Era {currentQuestion.isReal ? 'Totalmente Real' : 'Puro Chamuyo'}
                </span>
             </div>

             <div className="bg-slate-800/50 border border-slate-700 p-4 rounded-lg text-slate-300 text-sm leading-relaxed mb-6">
                {currentQuestion.context}
             </div>

             <Button onClick={handleNext} className="mt-auto h-12 font-bold bg-slate-100 hover:bg-white text-slate-900 w-full">
                Siguiente Pregunta &rarr;
             </Button>
          </div>
        )}
      </div>
    </div>
  );
}
