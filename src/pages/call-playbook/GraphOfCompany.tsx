import { PlaybookPageShell } from "./PlaybookPageShell";
import { PlaybookBulletList, PlaybookRefCard } from "./PlaybookRefCard";

export function GraphOfCompany() {
  return (
    <PlaybookPageShell title="Graph of Company">
      <ul className="playbook-ref-list">
        <PlaybookRefCard title="Technical Trend">
          <p className="playbook-ref-line">
            Technical trend affects assignment risk.
          </p>
          <PlaybookBulletList
            items={[
              "20-day and 50-day moving averages",
              "Trend direction",
              "Volatility",
              "Support and resistance",
              "Recent gaps or news-driven spikes",
            ]}
          />
          <p className="playbook-ref-line">
            If the stock is breaking out, choose a higher strike, lower delta,
            shorter DTE, or skip the call.
          </p>
        </PlaybookRefCard>
      </ul>
    </PlaybookPageShell>
  );
}
