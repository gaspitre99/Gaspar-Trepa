'use client';

import { useEffect } from 'react';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Route Level Error:', error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-6">
      <div className="max-w-md w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-md p-8 shadow-sm text-center">
        <h2 className="font-serif text-2xl font-medium tracking-tight text-slate-900 dark:text-slate-100 mb-4">
          Error en la Consulta
        </h2>
        <p className="text-slate-500 mb-8 leading-relaxed text-sm">
          No pudimos conectar con los servidores financieros en este momento. Por favor, intenta de nuevo más tarde o vuelve a cargar el módulo.
        </p>
        <button
          onClick={() => reset()}
          className="w-full bg-slate-900 text-white dark:bg-white dark:text-slate-900 px-4 py-2 rounded-md text-sm font-semibold hover:opacity-90 transition"
        >
          Reintentar Carga
        </button>
      </div>
    </div>
  );
}
