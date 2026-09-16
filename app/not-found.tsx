import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] p-6 bg-white dark:bg-zinc-950 text-slate-900 dark:text-zinc-50">
      <div className="max-w-md w-full text-center space-y-6">
        <h1 className="font-mono text-9xl font-bold tracking-tighter text-zinc-200 dark:text-zinc-800">404</h1>
        <div className="space-y-2">
          <h2 className="font-serif text-2xl font-medium tracking-tight text-slate-900 dark:text-zinc-100">
            Módulo No Encontrado
          </h2>
          <p className="text-zinc-500 leading-relaxed text-sm">
            La herramienta, artículo o reporte que buscas no existe o ha sido reubicado en la nueva arquitectura.
          </p>
        </div>
        <div className="pt-6">
          <Link
            href="/"
            className="inline-block bg-slate-900 text-white dark:bg-white dark:text-slate-900 px-6 py-2 rounded-md text-sm font-semibold hover:opacity-90 transition"
          >
            Volver al Panel Principal
          </Link>
        </div>
      </div>
    </div>
  );
}
