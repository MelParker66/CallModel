import React from "react";

export const CspLadder: React.FC = () => {
  return (
    <div id="csp-ladder-panel" className="content-panel content-panel-active">
      <div className="content-panel-inner">
        <header className="panel-header panel-header--divider">
          <h1 className="panel-title">CSP Ladder – High Volume</h1>
          <span className="capital-inline" aria-live="polite">
            Capital Remaining: $0.00
          </span>
          <p className="panel-subtitle">
            10 total trades — analyze + select trades, then monitor capital
            deployment.
          </p>
        </header>

        <section className="card">
          <p className="results-empty">
            CSP Ladder runs in the CSPmodel project. Open{" "}
            <strong>CSPmodel/ladder-high-volume.html</strong> for the full CSP
            ladder experience, or port it here when ready.
          </p>
        </section>
      </div>
    </div>
  );
};
