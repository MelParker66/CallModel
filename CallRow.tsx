import React, { useState } from "react";
import {
  analyzeCall,
  CallAnalysisResult,
  CallExportRow,
} from "./callLadderLogic";
import { useCallLadder } from "./callLadderContext";

interface CallRowProps {
  rowIndex: number;
}

export const CallRow: React.FC<CallRowProps> = ({ rowIndex }) => {
  const { selectedRows, selectRow, deselectRow } = useCallLadder();

  const [ticker, setTicker] = useState("");
  const [sharePrice, setSharePrice] = useState<number | "">("");
  const [basis, setBasis] = useState<number | "">("");
  const [expiration, setExpiration] = useState("");
  const [dte, setDte] = useState(7);
  const [contracts, setContracts] = useState(1);
  const [strike, setStrike] = useState<number | "">("");
  const [bid, setBid] = useState<number | "">("");
  const [ask, setAsk] = useState<number | "">("");
  const [delta, setDelta] = useState<number | "">("");
  const [probITM, setProbITM] = useState<number | "">("");
  const [result, setResult] = useState<CallAnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const isSelected = selectedRows[rowIndex] != null;

  const buildExportRow = (
    analysis: CallAnalysisResult,
    strikeNum: number,
    bidNum: number
  ): CallExportRow => ({
    ticker,
    contracts,
    strike: strikeNum,
    premium: bidNum,
    returnPct: analysis.returnPct,
    annualizedPct: analysis.annualizedPct,
    returnIfCalled: analysis.returnIfCalled,
    breakeven: analysis.breakeven,
    newBasis: analysis.newBasis,
  });

  const handleAnalyze = () => {
    setError(null);

    const sharePriceNum = Number(sharePrice);
    const basisNum = Number(basis);
    const strikeNum = Number(strike);
    const bidNum = Number(bid);
    const askNum = Number(ask);

    if (
      !Number.isFinite(strikeNum) ||
      !Number.isFinite(bidNum) ||
      !Number.isFinite(askNum) ||
      !Number.isFinite(basisNum) ||
      !Number.isFinite(dte) ||
      strikeNum <= 0 ||
      basisNum <= 0
    ) {
      setError(
        "Enter valid DTE, Current Basis, Strike, Bid, and Ask to analyze."
      );
      setResult(null);
      return;
    }

    const analysis = analyzeCall({
      currentPrice: Number.isFinite(sharePriceNum) ? sharePriceNum : 0,
      strike: strikeNum,
      bid: bidNum,
      ask: askNum,
      dte,
      contracts,
      basis: basisNum,
    });

    setResult(analysis);
    setBasis(analysis.newBasis);

    if (isSelected) {
      selectRow(rowIndex, buildExportRow(analysis, strikeNum, bidNum));
    }
  };

  const handleSelect = () => {
    if (!result) return;
    selectRow(
      rowIndex,
      buildExportRow(result, Number(strike), Number(bid))
    );
  };

  const handleDeselect = () => {
    deselectRow(rowIndex);
  };

  const numInput = (
    value: number | "",
    setValue: (v: number | "") => void,
    className: string
  ) => (
    <input
      type="number"
      className={className}
      step="any"
      value={value}
      onChange={(e) =>
        setValue(e.target.value === "" ? "" : Number(e.target.value))
      }
    />
  );

  return (
    <>
      <div
        className="ladder-input-row ladder-row"
        data-row-index={rowIndex}
      >
        <label className="ladder-field">
          <span className="ladder-field-label">Ticker</span>
          <input
            type="text"
            className="ladder-inp-ticker"
            placeholder="e.g. AAPL"
            value={ticker}
            autoComplete="off"
            onChange={(e) => setTicker(e.target.value.toUpperCase())}
          />
        </label>
        <label className="ladder-field">
          <span className="ladder-field-label">Share Price</span>
          {numInput(sharePrice, setSharePrice, "ladder-inp-share-price")}
        </label>
        <label className="ladder-field">
          <span className="ladder-field-label">Current Basis</span>
          {numInput(basis, setBasis, "ladder-inp-basis")}
        </label>
        <label className="ladder-field">
          <span className="ladder-field-label">Expiration</span>
          <input
            type="date"
            className="ladder-inp-exp"
            value={expiration}
            onChange={(e) => setExpiration(e.target.value)}
          />
        </label>
        <label className="ladder-field">
          <span className="ladder-field-label">DTE</span>
          <input
            type="number"
            className="ladder-inp-dte"
            step={1}
            value={dte}
            onChange={(e) => setDte(Number(e.target.value))}
          />
        </label>
        <label className="ladder-field">
          <span className="ladder-field-label">Contracts</span>
          <input
            type="number"
            className="contracts-input"
            min={1}
            value={contracts}
            onChange={(e) => setContracts(Number(e.target.value) || 1)}
          />
        </label>
        <label className="ladder-field">
          <span className="ladder-field-label">Strike</span>
          {numInput(strike, setStrike, "ladder-inp-strike")}
        </label>
        <label className="ladder-field">
          <span className="ladder-field-label">Bid</span>
          {numInput(bid, setBid, "ladder-inp-bid")}
        </label>
        <label className="ladder-field">
          <span className="ladder-field-label">Ask</span>
          {numInput(ask, setAsk, "ladder-inp-ask")}
        </label>
        <label className="ladder-field">
          <span className="ladder-field-label">Delta</span>
          {numInput(delta, setDelta, "ladder-inp-delta")}
        </label>
        <label className="ladder-field">
          <span className="ladder-field-label">Prob ITM</span>
          {numInput(probITM, setProbITM, "ladder-inp-prob-itm")}
        </label>
        <div className="ladder-row-actions">
          <button
            type="button"
            className="btn ladder-analyze analyze-button"
            onClick={handleAnalyze}
          >
            Analyze
          </button>
        </div>
      </div>

      {(error || result) && (
        <div className="csp-analysis-card">
          {error && (
            <div className="card">
              <p className="results-empty">{error}</p>
            </div>
          )}
          {result && (
            <section className="card recommended-csp csp-row-detail-box">
              <div className="csp-ladder-analysis-block">
                <p className="rec-detail">
                  <strong>Premium Received:</strong>{" "}
                  {result.premium.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </p>
                <p className="rec-detail">
                  <strong>Return %:</strong> {result.returnPct.toFixed(2)}%
                </p>
                <p className="rec-detail">
                  <strong>Annualized %:</strong>{" "}
                  {result.annualizedPct.toFixed(2)}%
                </p>
                <p className="rec-detail">
                  <strong>Return If Called Away:</strong>{" "}
                  {result.returnIfCalled.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </p>
                <p className="rec-detail">
                  <strong>Breakeven:</strong> ${result.breakeven.toFixed(2)}
                </p>
                <p className="rec-detail">
                  <strong>New Basis (after premium):</strong> $
                  {result.newBasis.toFixed(2)}
                </p>
              </div>
              <div className="manual-actions" style={{ marginTop: 12 }}>
                {isSelected ? (
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handleDeselect}
                  >
                    Deselect
                  </button>
                ) : (
                  <button type="button" className="btn" onClick={handleSelect}>
                    Select
                  </button>
                )}
              </div>
            </section>
          )}
        </div>
      )}
    </>
  );
};
