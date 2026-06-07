import { PlaybookPageShell } from "./PlaybookPageShell";
import { PlaybookBulletList, PlaybookRefCard } from "./PlaybookRefCard";

export function QuickStartGuide() {
  return (
    <PlaybookPageShell title="Quick Start Guide">
      <ul className="playbook-ref-list">
        <PlaybookRefCard title="Fast Checks Before Selling a Call">
          <p className="playbook-ref-line">
            Fast checks before selling a call:
          </p>
          <PlaybookBulletList
            items={[
              "Delta 0.10–0.25",
              "Premium worth the risk",
              "Strike above basis",
              "No earnings in the cycle",
            ]}
          />
        </PlaybookRefCard>
      </ul>
    </PlaybookPageShell>
  );
}
