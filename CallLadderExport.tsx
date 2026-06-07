import React, { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { formatMoney } from "./callLadderLogic";
import {
  getSelectedCallExportRows,
  readCallLadderSelections,
  useCallLadder,
} from "./callLadderContext";

export const CallLadderExport: React.FC = () => {
  const { pathname } = useLocation();
  const { selectedRows } = useCallLadder();

  const rows = useMemo(() => {
    const storedRows = readCallLadderSelections();
    const hasStoredSelections = storedRows.some((row) => row != null);
    const source = hasStoredSelections ? storedRows : selectedRows;
    return getSelectedCallExportRows(source);
  }, [selectedRows, pathname]);

  return (
    <div id="call-export-panel" className="content-panel content-panel-active">
      <div className="content-panel-inner">
        <header className="panel-header">
          <h1 className="panel-title">Call Ladder Export</h1>
        </header>

        <section className="card ladder-export-card ladder-export-panel-body">
          <p className="ladder-export-intro">
            Selected rows from the Covered Call Ladder appear below.
          </p>

          <div className="ladder-export-table-wrap">
            {rows.length === 0 ? (
              <p className="results-empty ladder-export-empty">
                No rows selected. Select trades on the Call Ladder screen, then
                return here.
              </p>
            ) : (
              <table className="analysis-table ladder-export-table">
                <thead>
                  <tr>
                    <th>Ticker</th>
                    <th>Contracts</th>
                    <th>Strike</th>
                    <th>Premium</th>
                    <th>Return %</th>
                    <th>Annualized %</th>
                    <th>Return If Called</th>
                    <th>Breakeven</th>
                    <th>New Basis</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, idx) => (
                    <tr key={idx} className="analysis-data-row">
                      <td>{row.ticker || "—"}</td>
                      <td>{row.contracts}</td>
                      <td>{row.strike}</td>
                      <td>${row.premium.toFixed(2)}</td>
                      <td>{row.returnPct.toFixed(2)}%</td>
                      <td>{row.annualizedPct.toFixed(2)}%</td>
                      <td>{formatMoney(row.returnIfCalled)}</td>
                      <td>${row.breakeven.toFixed(2)}</td>
                      <td>${row.newBasis.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};
