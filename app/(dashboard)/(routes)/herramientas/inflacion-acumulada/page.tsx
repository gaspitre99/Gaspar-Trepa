import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import InflationCalculator from '@/components/tools/inflation-calculator';

export const metadata: Metadata = {
  title: 'Calculadora de Inflación Acumulada Histórica | Hablemos de Economía',
  description: 'Calcula la inflación acumulada en Argentina desde 2002 hasta el presente y visualiza la evolución histórica.',
};

export default function InflacionPage() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 p-6">
      <div className="max-w-4xl mx-auto">
        <nav className="mb-6">
          <Link
            href="/herramientas"
            className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-sky-400 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver a Herramientas
          </Link>
        </nav>
        <InflationCalculator />
      </div>
    </div>
  );
}
