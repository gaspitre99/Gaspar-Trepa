import { calculateYield } from '@/lib/wallet-math';
import { WalletYield } from '@/types/wallet';

describe('calculateYield', () => {
  const defaultWallet: WalletYield = {
    id: 'test-wallet',
    name: 'Test Wallet',
    tna: 40,
    dailyYield: 40 / 100 / 365,
    payoutFrequency: 'daily',
  };

  const cappedWallet: WalletYield = {
    ...defaultWallet,
    maxCapARS: 100000,
  };

  it('calculates yield correctly for standard capital within limits', () => {
    const capital = 10000;
    const result = calculateYield(capital, defaultWallet);

    // TNA = 40% -> 0.40
    // Annual Nominal Earnings = 10000 * 0.40 = 4000
    // Daily Earnings = 4000 / 365 = 10.9589...
    // Monthly Earnings = Daily * 30 = 328.767...
    expect(result.initialCapital).toBe(capital);
    expect(result.annualNominalEarnings).toBe(4000);
    expect(result.dailyEarnings).toBeCloseTo(10.9589, 4);
    expect(result.monthlyEarnings).toBeCloseTo(328.7671, 4);
    expect(result.effectiveYieldPct).toBe(40.0);
  });

  it('handles zero capital gracefully', () => {
    const result = calculateYield(0, defaultWallet);
    expect(result.initialCapital).toBe(0);
    expect(result.annualNominalEarnings).toBe(0);
    expect(result.dailyEarnings).toBe(0);
    expect(result.monthlyEarnings).toBe(0);
    expect(result.effectiveYieldPct).toBe(0);
  });

  it('handles negative TNA gracefully (if it were to occur)', () => {
    const negativeWallet: WalletYield = { ...defaultWallet, tna: -10 };
    const result = calculateYield(10000, negativeWallet);
    expect(result.annualNominalEarnings).toBe(-1000);
    expect(result.dailyEarnings).toBeLessThan(0);
    expect(result.effectiveYieldPct).toBe(-10.0);
  });

  it('respects the maximum capital cap (maxCapARS)', () => {
    const massiveCapital = 1000000; // 1M (10x the 100k cap)
    const result = calculateYield(massiveCapital, cappedWallet);

    // It should calculate earnings based on 100,000, not 1,000,000.
    // Cap = 100,000 -> Annual Earnings = 40,000
    expect(result.annualNominalEarnings).toBe(40000);
    expect(result.dailyEarnings).toBeCloseTo(40000 / 365, 4);

    // Effective yield should be severely diluted.
    // 40,000 on 1,000,000 is 4% effective yield.
    expect(result.effectiveYieldPct).toBe(4.0);
  });

  it('handles floating point precision reasonably well', () => {
    const oddWallet: WalletYield = { ...defaultWallet, tna: 33.333 };
    const result = calculateYield(1000, oddWallet);

    // Annual = 333.33
    expect(result.annualNominalEarnings).toBeCloseTo(333.33, 2);
    expect(result.effectiveYieldPct).toBe(33.33); // 33.333 gets fixed to 2 decimals -> 33.33
  });
});
