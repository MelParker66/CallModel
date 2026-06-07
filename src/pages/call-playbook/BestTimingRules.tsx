import { PlaybookPageShell } from "./PlaybookPageShell";
import { PlaybookBulletList, PlaybookRefCard } from "./PlaybookRefCard";

export function BestTimingRules() {
  return (
    <PlaybookPageShell title="Best Timing Rules">
      <ul className="playbook-ref-list">
        <PlaybookRefCard title="Best Days">
          <PlaybookBulletList items={["Monday", "Tuesday"]} />
        </PlaybookRefCard>
        <PlaybookRefCard title="Best Times">
          <PlaybookBulletList
            items={["First 30–90 minutes", "Last hour"]}
          />
        </PlaybookRefCard>
        <PlaybookRefCard title="Avoid">
          <PlaybookBulletList
            items={[
              "Selling before earnings",
              "Selling when IV is extremely low",
              "Selling during breakouts",
            ]}
          />
        </PlaybookRefCard>
      </ul>
    </PlaybookPageShell>
  );
}
