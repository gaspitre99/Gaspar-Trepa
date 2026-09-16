import { Metadata } from 'next';
import InflationCalculator from '@/components/tools/inflation-calculator';

export const metadata: Metadata = {
  title: 'Calculadora de Inflación Acumulada Histórica | Hablemos de Economía',
  description: 'Calcula la inflación acumulada en Argentina desde 2002 hasta el presente y visualiza la evolución histórica.',
};

export default function InflacionPage() {
  return (
    <div className="p-6">
      <InflationCalculator />
    </div>
  );
}
