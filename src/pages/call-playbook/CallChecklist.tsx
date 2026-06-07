import { PlaybookPageShell } from "./PlaybookPageShell";
import { PlaybookBulletList, PlaybookRefCard } from "./PlaybookRefCard";

export function CallChecklist() {
  return (
    <PlaybookPageShell title="Call Checklist">
      <ul className="playbook-ref-list">
        <PlaybookRefCard title="Ownership & Basis">
          <PlaybookBulletList
            items={[
              "Do I own the shares?",
              "What is my current basis?",
              "Will this call reduce my basis meaningfully?",
            ]}
          />
        </PlaybookRefCard>
        <PlaybookRefCard title="Option Chain">
          <PlaybookBulletList
            items={[
              "Delta ≤ 0.25",
              "Acceptable probability ITM",
              "Tight bid/ask spread",
              "Strike above basis",
              "Strike above resistance",
              "Premium worth the risk",
            ]}
          />
        </PlaybookRefCard>
        <PlaybookRefCard title="Timing">
          <PlaybookBulletList
            items={[
              "No earnings in the cycle",
              "No dividend in the cycle (unless assignment is fine)",
              "IV elevated",
              "Market not in volatility crush",
            ]}
          />
        </PlaybookRefCard>
        <PlaybookRefCard title="Risk">
          <PlaybookBulletList
            items={[
              "Am I okay being assigned?",
              "Do I have a roll plan?",
            ]}
          />
        </PlaybookRefCard>
      </ul>
    </PlaybookPageShell>
  );
}
