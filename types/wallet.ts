export interface WalletYield {
  id: string;
  name: string;
  tna: number;           // Ej: 38 para 38%
  dailyYield: number;    // Calculado: (tna / 100) / 365
  maxCapARS?: number;    // Tope remunerado (ej: Naranja X hasta $600.000)
  payoutFrequency: "daily" | "monthly";
}

export interface YieldCalculationResult {
  initialCapital: number;
  dailyEarnings: number;
  monthlyEarnings: number;
  annualNominalEarnings: number;
  effectiveYieldPct: number; // Considera si supera o no el tope (cap)
}
