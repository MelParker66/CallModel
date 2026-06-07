import { PlaybookPageShell } from "./PlaybookPageShell";
import { PlaybookBulletList, PlaybookRefCard } from "./PlaybookRefCard";

export function WeeklyRoutine() {
  return (
    <PlaybookPageShell title="Weekly Routine">
      <ul className="playbook-ref-list">
        <PlaybookRefCard title="Sunday">
          <PlaybookBulletList
            items={[
              "Review charts",
              "Update basis",
              "Identify candidates",
              "Check earnings calendar",
            ]}
          />
        </PlaybookRefCard>
        <PlaybookRefCard title="Monday">
          <PlaybookBulletList
            items={[
              "Sell calls (best premium)",
              "Avoid first 10 minutes",
            ]}
          />
        </PlaybookRefCard>
        <PlaybookRefCard title="Wednesday">
          <PlaybookBulletList
            items={[
              "Check ITM/OTM status",
              "Roll early if needed",
            ]}
          />
        </PlaybookRefCard>
        <PlaybookRefCard title="Friday">
          <PlaybookBulletList
            items={[
              "Monitor expiration",
              "Decide: roll, close, or let expire",
            ]}
          />
        </PlaybookRefCard>
      </ul>
    </PlaybookPageShell>
  );
}
