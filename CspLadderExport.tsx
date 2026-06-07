import React from "react";

export const CspLadderExport: React.FC = () => {
  return (
    <div id="csp-export-panel" className="content-panel content-panel-active">
      <div className="content-panel-inner">
        <header className="panel-header">
          <h1 className="panel-title">CSP Ladder Export</h1>
        </header>

        <section className="card ladder-export-card ladder-export-panel-body">
          <p className="ladder-export-intro">
            Selected rows from each rung appear below.
          </p>
          <div className="ladder-export-table-wrap">
            <p className="results-empty ladder-export-empty">
              No rows selected. Select trades on the CSP Ladder tab, then return
              here.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};
