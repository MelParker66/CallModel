import { PlaybookPageShell } from "./PlaybookPageShell";
import { PlaybookBulletList, PlaybookRefCard } from "./PlaybookRefCard";

export function CompanyOverview() {
  return (
    <PlaybookPageShell title="Company Overview">
      <ul className="playbook-ref-list">
        <PlaybookRefCard title="Before Selling Calls">
          <p className="playbook-ref-line">
            Before selling calls, confirm the company is worth holding
            long-term.
          </p>
          <PlaybookBulletList
            items={[
              "Strong revenue and earnings trends",
              "Durable business model",
              "Competitive moat",
              "Reasonable valuation",
              "Stable or growing free cash flow",
              "No major red flags",
            ]}
          />
        </PlaybookRefCard>
      </ul>
    </PlaybookPageShell>
  );
}
