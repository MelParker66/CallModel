import React, { useState, useMemo } from "react";
import {
  StockPosition,
  CallTrade,
  CallSide,
  calcCallMetrics,
  calcLadderRowMetrics,
  getPlaybookSuggestion,
} from "./callLogic";

const emptyPosition: StockPosition = {
  ticker: "",
  sharesOwned: 100,
  originalCostBasis: 0,
  callTrades: [],
};

export const CallPlatform: React.FC = () => {
  const [position, setPosition] = useState<StockPosition>(emptyPosition);
  const [currentPrice, setCurrentPrice] = useState<number>(0);
  const [ladderStrikes, setLadderStrikes] = useState<number[]>([]);
  const [ladderPremiums, setLadderPremiums] = useState<number[]>([]);
  const [ladderDeltas, setLadderDeltas] = useState<number[]>([]);
  const [ladderProbOTM, setLadderProbOTM] = useState<number[]>([]);
  const [ladderDTE, setLadderDTE] = useState<number>(7);

  const [tradeDate, setTradeDate] = useState("");
  const [tradeExpiration, setTradeExpiration] = useState("");
  const [tradeStrike, setTradeStrike] = useState<number>(0);
  const [tradePremium, setTradePremium] = useState<number>(0);
  const [tradeSide, setTradeSide] = useState<CallSide>("OPEN");
  const [tradeContracts, setTradeContracts] = useState<number>(1);

  const metrics = useMemo(
    () => calcCallMetrics(position),
    [position]
  );

  const ladderRows = useMemo(() => {
    return ladderStrikes.map((strike, idx) => {
      const premium = ladderPremiums[idx] ?? 0;
      const rowInput = {
        currentPrice,
        strike,
        premium,
        dte: ladderDTE,
        runningBasis: metrics.runningBasis,
        sharesOwned: position.sharesOwned,
      };
      const rowMetrics = calcLadderRowMetrics(rowInput);
      return {
        strike,
        premium,
        delta: ladderDeltas[idx],
        probOTM: ladderProbOTM[idx],
        ...rowMetrics,
      };
    });
  }, [ladderStrikes, ladderPremiums, ladderDeltas, ladderProbOTM, ladderDTE, currentPrice, metrics, position]);

  const playbook = useMemo(() => {
    return getPlaybookSuggestion({
      currentPrice,
      runningBasis: metrics.runningBasis,
      daysToExpiration: ladderDTE,
    });
  }, [currentPrice, metrics.runningBasis, ladderDTE]);

  const handleBasicChange = (field: keyof StockPosition, value: any) => {
    setPosition((prev) => ({
      ...prev,
      [field]: field === "sharesOwned" || field === "originalCostBasis"
        ? Number(value)
        : value,
    }));
  };

  const handleAddTrade = (e: React.FormEvent) => {
    e.preventDefault();

    const trade: CallTrade = {
      id: crypto.randomUUID(),
      date: tradeDate,
      expiration: tradeExpiration,
      strike: tradeStrike,
      premium: tradePremium,
      contracts: tradeContracts,
      side: tradeSide,
    };

    setPosition((prev) => ({
      ...prev,
      callTrades: [...prev.callTrades, trade],
    }));
  };

  return (
    <div style={{ padding: 16, fontFamily: "system-ui" }}>
      <h2>Call Platform</h2>

      <section>
        <h3>Position</h3>
        <label>
          Ticker:&nbsp;
          <input
            value={position.ticker}
            onChange={(e) => handleBasicChange("ticker", e.target.value.toUpperCase())}
          />
        </label>
        <br />
        <label>
          Shares owned:&nbsp;
          <input
            type="number"
            value={position.sharesOwned}
            onChange={(e) => handleBasicChange("sharesOwned", e.target.value)}
          />
        </label>
        <br />
        <label>
          Original cost basis:&nbsp;
          <input
            type="number"
            value={position.originalCostBasis}
            onChange={(e) => handleBasicChange("originalCostBasis", e.target.value)}
          />
        </label>
        <br />
        <label>
          Current price:&nbsp;
          <input
            type="number"
            value={currentPrice}
            onChange={(e) => setCurrentPrice(Number(e.target.value))}
          />
        </label>
      </section>

      <section style={{ marginTop: 20 }}>
        <h3>Running Basis</h3>
        <div>Net premium: {metrics.totalPremiumNet.toFixed(2)}</div>
        <div>Running basis: {metrics.runningBasis.toFixed(2)}</div>
        <div>Breakeven: {metrics.breakeven.toFixed(2)}</div>
      </section>

      <section style={{ marginTop: 20 }}>
        <h3>New Call Trade</h3>
        <form onSubmit={handleAddTrade}>
          <label>
            Date:&nbsp;
            <input
              type="date"
              value={tradeDate}
              onChange={(e) => setTradeDate(e.target.value)}
              required
            />
          </label>
          <br />
          <label>
            Expiration:&nbsp;
            <input
              type="date"
              value={tradeExpiration}
              onChange={(e) => setTradeExpiration(e.target.value)}
              required
            />
          </label>
          <br />
          <label>
            Strike:&nbsp;
            <input
              type="number"
              value={tradeStrike}
              onChange={(e) => setTradeStrike(Number(e.target.value))}
              required
            />
          </label>
          <br />
          <label>
            Premium:&nbsp;
            <input
              type="number"
              step="0.01"
              value={tradePremium}
              onChange={(e) => setTradePremium(Number(e.target.value))}
              required
            />
          </label>
          <br />
          <label>
            Side:&nbsp;
            <select
              value={tradeSide}
              onChange={(e) => setTradeSide(e.target.value as CallSide)}
            >
              <option value="OPEN">OPEN</option>
              <option value="CLOSE">CLOSE</option>
              <option value="ROLL">ROLL</option>
            </select>
          </label>
          <br />
          <label>
            Contracts:&nbsp;
            <input
              type="number"
              min={1}
              value={tradeContracts}
              onChange={(e) => setTradeContracts(Number(e.target.value) || 1)}
            />
          </label>
          <br />
          <button type="submit" style={{ marginTop: 8 }}>
            Add Trade
          </button>
        </form>
      </section>

      <section style={{ marginTop: 20 }}>
        <h3>Call Trades Log</h3>
        <table style={{ borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>Date</th>
              <th>Side</th>
              <th>Strike</th>
              <th>Premium</th>
              <th>Contracts</th>
            </tr>
          </thead>
          <tbody>
            {position.callTrades.map((trade) => (
              <tr key={trade.id}>
                <td>{trade.date}</td>
                <td>{trade.side}</td>
                <td>{trade.strike}</td>
                <td>{trade.premium.toFixed(2)}</td>
                <td>{trade.contracts}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section style={{ marginTop: 20 }}>
        <h3>Call Ladder</h3>
        <label>
          DTE:&nbsp;
          <input
            type="number"
            value={ladderDTE}
            onChange={(e) => setLadderDTE(Number(e.target.value))}
          />
        </label>
        <br />
        <label>
          Strikes (comma separated):&nbsp;
          <input
            style={{ width: 260 }}
            onChange={(e) =>
              setLadderStrikes(
                e.target.value.split(",").map((v) => Number(v.trim()))
              )
            }
          />
        </label>
        <br />
        <label>
          Premiums (comma separated):&nbsp;
          <input
            style={{ width: 260 }}
            onChange={(e) =>
              setLadderPremiums(
                e.target.value.split(",").map((v) => Number(v.trim()))
              )
            }
          />
        </label>
        <br />
        <label>
          Deltas (comma separated):&nbsp;
          <input
            style={{ width: 260 }}
            onChange={(e) =>
              setLadderDeltas(
                e.target.value.split(",").map((v) => Number(v.trim()))
              )
            }
          />
        </label>
        <br />
        <label>
          Prob OTM (comma separated):&nbsp;
          <input
            style={{ width: 260 }}
            onChange={(e) =>
              setLadderProbOTM(
                e.target.value.split(",").map((v) => Number(v.trim()))
              )
            }
          />
        </label>

        <table style={{ marginTop: 12, borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>Strike</th>
              <th>Premium</th>
              <th>Total Premium $</th>
              <th>Return $</th>
              <th>Return %</th>
              <th>Annualized %</th>
              <th>Breakeven</th>
              <th>Delta</th>
              <th>Prob OTM (%)</th>
            </tr>
          </thead>
          <tbody>
            {ladderRows.map((row) => (
              <tr key={row.strike}>
                <td>{row.strike}</td>
                <td>{row.premium}</td>
                <td>{row.totalPremiumDollar.toFixed(2)}</td>
                <td>{row.returnDollarIfCalled.toFixed(2)}</td>
                <td>{row.returnPctIfCalled.toFixed(2)}</td>
                <td>{row.annualizedReturnPct.toFixed(2)}</td>
                <td>{row.breakevenPrice.toFixed(2)}</td>
                <td>{row.delta != null && !Number.isNaN(row.delta) ? row.delta.toFixed(2) : ""}</td>
                <td>{row.probOTM != null && !Number.isNaN(row.probOTM) ? row.probOTM.toFixed(2) : ""}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section style={{ marginTop: 20 }}>
        <h3>Playbook</h3>
        <div><strong>Action:</strong> {playbook.label}</div>
        <div><strong>Reason:</strong> {playbook.reason}</div>
      </section>

      <section style={{ marginTop: 20 }}>
        <h3>Export Panel</h3>
        <table style={{ borderCollapse: "collapse" }}>
          <tbody>
            <tr>
              <td>Ticker</td>
              <td>{position.ticker}</td>
            </tr>
            <tr>
              <td>Shares Owned</td>
              <td>{position.sharesOwned}</td>
            </tr>
            <tr>
              <td>Original Cost Basis</td>
              <td>{position.originalCostBasis.toFixed(2)}</td>
            </tr>
            <tr>
              <td>Total Premium Received</td>
              <td>{metrics.totalPremiumNet.toFixed(2)}</td>
            </tr>
            <tr>
              <td>Running Basis</td>
              <td>{metrics.runningBasis.toFixed(2)}</td>
            </tr>
            <tr>
              <td>Breakeven</td>
              <td>{metrics.breakeven.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
};
