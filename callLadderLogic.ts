export const CALL_LADDER_ROW_COUNT = 10;

export interface CallExportRow {
  ticker: string;
  contracts: number;
  strike: number;
  premium: number;
  returnPct: number;
  annualizedPct: number;
  returnIfCalled: number;
  breakeven: number;
  newBasis: number;
}

export interface CallAnalysisInput {
  currentPrice: number;
  strike: number;
  bid: number;
  ask: number;
  dte: number;
  contracts: number;
  basis: number;
}

export interface CallAnalysisResult {
  premium: number;
  returnPct: number;
  annualizedPct: number;
  returnIfCalled: number;
  breakeven: number;
  newBasis: number;
}

export function applyCallPremiumToBasis(
  basis: number,
  premiumPerShare: number
): number {
  return basis - premiumPerShare;
}

export function analyzeCall(input: CallAnalysisInput): CallAnalysisResult {
  const { strike, bid, dte, contracts, basis } = input;

  const premium = bid * 100 * contracts;
  const capital = basis * 100 * contracts;

  const returnPct = capital > 0 ? (premium / capital) * 100 : 0;
  const annualizedPct = dte > 0 ? returnPct * (365 / dte) : 0;
  const returnIfCalled = (strike - basis) * 100 * contracts + premium;
  const breakeven = basis;
  const newBasis = applyCallPremiumToBasis(basis, bid);

  return {
    premium,
    returnPct,
    annualizedPct,
    returnIfCalled,
    breakeven,
    newBasis,
  };
}

export function formatMoney(n: number): string {
  if (!Number.isFinite(n)) return "$0.00";
  return (
    "$" +
    n.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  );
}
