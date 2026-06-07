import { PlaybookPageShell } from "./PlaybookPageShell";
import { PlaybookBulletList, PlaybookRefCard } from "./PlaybookRefCard";

export function CallPlaybookOverview() {
  return (
    <PlaybookPageShell title="Call Playbook Overview">
      <div className="playbook-launcher">
        <span className="playbook-button call">Call Playbook</span>
      </div>
      <ul className="playbook-ref-list">
        <PlaybookRefCard title="Overview">
          <p className="playbook-ref-line">
            Covered calls generate income from shares you already own. The goal
            is to reduce basis, generate weekly or monthly income, and manage
            assignment risk. This playbook provides a repeatable workflow for
            evaluating, selling, managing, and rolling covered calls.
          </p>
        </PlaybookRefCard>
      </ul>
    </PlaybookPageShell>
  );
}
