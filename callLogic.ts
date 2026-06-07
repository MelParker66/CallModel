export type CallSide = "OPEN" | "CLOSE" | "ROLL";

export interface CallTrade {
  id: string;
  date: string;
  expiration: string;
  strike: number;
  premium: number;
  contracts: number;
  side: CallSide;
  notes?: string;
}

export interface StockPosition {
  ticker: string;
  sharesOwned: number;
  originalCostBasis: number;
  callTrades: CallTrade[];
}

export interface CallMetrics {
  totalPremiumNet: number;
  runningBasis: number;
  breakeven: number;
}

export interface LadderRowInput {
  currentPrice: number;
  strike: number;
  premium: number;
  dte: number;
  runningBasis: number;
  sharesOwned: number;
}

export interface LadderRowMetrics {
  returnDollarIfCalled: number;
  returnPctIfCalled: number;
  annualizedReturnPct: number;
  breakevenPrice: number;
  totalPremiumDollar: number;
}

export function sumNetPremiumPerShare(trades: CallTrade[]): number {
  return trades.reduce((acc, t) => {
    const sign = t.side === "OPEN" ? 1 : t.side === "CLOSE" ? -1 : 1;
    return acc + t.premium * sign;
  }, 0);
}

export function calcCallMetrics(position: StockPosition): CallMetrics {
  const totalPremiumNet = sumNetPremiumPerShare(position.callTrades);
  const runningBasis = position.originalCostBasis - totalPremiumNet;

  return {
    totalPremiumNet,
    runningBasis,
    breakeven: runningBasis,
  };
}

export function calcLadderRowMetrics(input: LadderRowInput): LadderRowMetrics {
  const { strike, premium, dte, runningBasis, sharesOwned } = input;

  const totalPremiumDollar = premium * sharesOwned;

  const priceGainPerShare = Math.max(strike - runningBasis, 0);
  const totalGainPerShare = priceGainPerShare + premium;
  const returnDollarIfCalled = totalGainPerShare * sharesOwned;

  const capitalAtRisk = runningBasis * sharesOwned;
  const returnPctIfCalled =
    capitalAtRisk > 0 ? (returnDollarIfCalled / capitalAtRisk) * 100 : 0;

  const annualizedReturnPct =
    dte > 0 ? (returnPctIfCalled * 365) / dte : 0;

  return {
    returnDollarIfCalled,
    returnPctIfCalled,
    annualizedReturnPct,
    breakevenPrice: runningBasis,
    totalPremiumDollar,
  };
}

// ---- Playbook ----

export type PlaybookActionType =
  | "SELL_CALL"
  | "ROLL_UP"
  | "ROLL_OUT"
  | "LET_EXPIRE"
  | "DO_NOT_SELL";

export interface PlaybookSuggestion {
  action: PlaybookActionType;
  label: string;
  reason: string;
}

export interface PlaybookContext {
  currentPrice: number;
  runningBasis: number;
  daysToExpiration: number;
}

export function getPlaybookSuggestion(
  ctx: PlaybookContext
): PlaybookSuggestion {
  const { currentPrice, runningBasis, daysToExpiration } = ctx;

  if (currentPrice < runningBasis && daysToExpiration >= 7) {
    return {
      action: "SELL_CALL",
      label: "Sell covered call",
      reason:
        "Price is below basis; selling calls lowers basis and generates income.",
    };
  }

  if (daysToExpiration <= 5 && currentPrice > runningBasis) {
    return {
      action: "ROLL_OUT",
      label: "Roll out",
      reason:
        "Expiration is near and price is above basis; roll out to reduce assignment risk.",
    };
  }

  return {
    action: "DO_NOT_SELL",
    label: "No call right now",
    reason: "Conditions do not strongly favor selling or rolling.",
  };
}
