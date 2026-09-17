import { WalletYield, YieldCalculationResult } from "@/types/wallet";

export function calculateYield(capital: number, wallet: WalletYield): YieldCalculationResult {
  const remuneratedCapital = wallet.maxCapARS ? Math.min(capital, wallet.maxCapARS) : capital;
  const dailyEarnings = remuneratedCapital * (wallet.tna / 100 / 365);
  const monthlyEarnings = dailyEarnings * 30;
  const annualNominalEarnings = remuneratedCapital * (wallet.tna / 100);
  const effectiveYieldPct = capital > 0 ? (annualNominalEarnings / capital) * 100 : 0;

  return {
    initialCapital: capital,
    dailyEarnings,
    monthlyEarnings,
    annualNominalEarnings,
    effectiveYieldPct: Number(effectiveYieldPct.toFixed(2)),
  };
}
