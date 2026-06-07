import React from "react";
import { CALL_LADDER_ROW_COUNT } from "./callLadderLogic";
import { CallRow } from "./CallRow";

export const CallLadder: React.FC = () => {
  return (
    <div className="content-panel-inner">
      <header className="panel-header panel-header--divider">
        <h1 className="panel-title">Covered Call Ladder – High Volume</h1>
        <p className="panel-subtitle">
          10 total trades — analyze + select trades, then export selected rows.
        </p>
      </header>

      <div className="ladder-tab-panel">
        <div
          id="ladder-root"
          className="ladder-root ladder-container call-ladder-container"
        >
          <section className="card ladder-rung" data-rung-id="1">
            <h2 className="card-title ladder-rung-title">
              Rung 1: Covered Calls
            </h2>
            <div className="ladder-input-stack" id="call-hv-stack-rung1">
              {Array.from({ length: CALL_LADDER_ROW_COUNT }, (_, i) => (
                <CallRow key={i} rowIndex={i} />
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
