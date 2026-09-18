export type MonthlyRate = {
  year: number;
  month: number;
  rate: number; // e.g., 2.5 for 2.5%
};

// Generate mock data from Jan 2002 to present
const generateMockData = (): MonthlyRate[] => {
  const data: MonthlyRate[] = [];
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;

  for (let year = 2002; year <= currentYear; year++) {
    const endMonth = year === currentYear ? currentMonth : 12;
    for (let month = 1; month <= endMonth; month++) {
      let baseRate = 1.5;
      if (year < 2010) baseRate = 0.8;
      else if (year >= 2010 && year < 2018) baseRate = 2.0;
      else if (year >= 2018 && year < 2022) baseRate = 3.5;
      else if (year >= 2022 && year < 2024) baseRate = 7.0;
      else if (year >= 2024) baseRate = 15.0;

      // Add some random noise
      const noise = (Math.random() - 0.5) * 1.5;
      const finalRate = Math.max(0, baseRate + noise);

      data.push({ year, month, rate: finalRate });
    }
  }
  return data;
};

export const MOCK_INFLATION_DATA = generateMockData();

export type CalculateResult = {
  finalAmount: number;
  accumulatedPercentage: number;
  monthlyBreakdown: MonthlyRate[];
};

export const calculateAccumulatedInflation = (
  startYear: number,
  startMonth: number,
  endYear: number,
  endMonth: number,
  initialAmount: number
): CalculateResult => {
  const breakdown: MonthlyRate[] = [];
  let currentAmount = initialAmount;

  if (startYear > endYear || (startYear === endYear && startMonth > endMonth)) {
    return {
      finalAmount: currentAmount,
      accumulatedPercentage: 0,
      monthlyBreakdown: breakdown,
    };
  }

  for (const record of MOCK_INFLATION_DATA) {
    if (record.year > endYear || (record.year === endYear && record.month > endMonth)) {
      break;
    }

    if (record.year < startYear || (record.year === startYear && record.month < startMonth)) {
      continue;
    }

    breakdown.push(record);
    currentAmount = currentAmount * (1 + record.rate / 100);
  }

  const accumulatedPercentage = initialAmount > 0
    ? ((currentAmount - initialAmount) / initialAmount) * 100
    : 0;

  return {
    finalAmount: currentAmount,
    accumulatedPercentage,
    monthlyBreakdown: breakdown,
  };
};

export type AnnualSeries = {
  year: number;
  rate: number;
};

export const getAnnualInflationSeries = (): AnnualSeries[] => {
  if (MOCK_INFLATION_DATA.length === 0) return [];

  const seriesMap = new Map<number, number>();

  for (const record of MOCK_INFLATION_DATA) {
    const currentAmount = seriesMap.get(record.year) ?? 100;
    seriesMap.set(record.year, currentAmount * (1 + record.rate / 100));
  }

  const series: AnnualSeries[] = [];
  seriesMap.forEach((amount, year) => {
    const annualRate = ((amount - 100) / 100) * 100;
    series.push({ year, rate: annualRate });
  });

  return series.sort((a, b) => a.year - b.year);
};
