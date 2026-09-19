import { Metadata } from 'next';
import RealVsInflationCalculator from '@/components/tools/real-vs-inflation-calculator';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Tasa Real vs Inflación | Herramientas',
  description: 'Simula el rendimiento de tu capital ajustado por la inflación esperada y compara tu poder adquisitivo real.',
};

export default function RealVsInflationPage() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 p-6">
      <div className="max-w-3xl mx-auto">
        <nav className="mb-6">
          <Link
            href="/herramientas"
            className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-sky-400 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver a Herramientas
          </Link>
        </nav>
        <h1 className="font-serif text-3xl font-medium tracking-tight mb-8">Tasa Real vs Inflación</h1>
        <RealVsInflationCalculator />
      </div>
    </div>
  );
}
