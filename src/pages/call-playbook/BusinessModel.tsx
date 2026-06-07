import { PlaybookPageShell } from "./PlaybookPageShell";
import { PlaybookBulletList, PlaybookRefCard } from "./PlaybookRefCard";

export function BusinessModel() {
  return (
    <PlaybookPageShell title="Business Model">
      <ul className="playbook-ref-list">
        <PlaybookRefCard title="How the Company Makes Money">
          <p className="playbook-ref-line">
            Understand how the company makes money.
          </p>
          <PlaybookBulletList
            items={[
              "Recurring revenue",
              "Cyclical or defensive",
              "High or low margins",
              "Product concentration risk",
              "Competitive threats",
            ]}
          />
          <p className="playbook-ref-line">
            Covered calls work best on predictable, stable businesses.
          </p>
        </PlaybookRefCard>
      </ul>
    </PlaybookPageShell>
  );
}
