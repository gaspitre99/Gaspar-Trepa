'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error('Global Application Error:', error);
  }, [error]);

  return (
    <html>
      <body className="font-sans antialiased text-slate-900 bg-white dark:bg-slate-950 dark:text-slate-50 min-h-screen flex flex-col items-center justify-center p-6">
        <div className="max-w-md w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-md p-8 shadow-sm text-center">
          <h2 className="font-serif text-2xl font-medium tracking-tight text-slate-900 dark:text-slate-100 mb-4">
            Fallo Crítico del Sistema
          </h2>
          <p className="text-slate-500 mb-8 leading-relaxed">
            Se ha producido un error inesperado al procesar la solicitud. Nuestros sistemas han registrado la incidencia.
          </p>
          <div className="flex flex-col gap-3">
            <button
              onClick={() => reset()}
              className="w-full bg-slate-900 text-white dark:bg-white dark:text-slate-900 px-4 py-2 rounded-md text-sm font-semibold hover:opacity-90 transition"
            >
              Intentar nuevamente
            </button>
            <Link
              href="/"
              className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 px-4 py-2 rounded-md text-sm font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition block text-center"
            >
              Volver al inicio
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
