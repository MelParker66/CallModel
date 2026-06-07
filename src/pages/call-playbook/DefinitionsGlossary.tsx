import { PlaybookPageShell } from "./PlaybookPageShell";
import { PlaybookRefCard } from "./PlaybookRefCard";

const GLOSSARY_ITEMS = [
  { term: "Delta", definition: "probability of finishing ITM" },
  { term: "Theta", definition: "time decay" },
  { term: "IV", definition: "implied volatility" },
  { term: "ITM", definition: "in the money" },
  { term: "OTM", definition: "out of the money" },
  { term: "Assignment", definition: "shares called away" },
  { term: "Roll", definition: "closing one contract and opening another" },
  { term: "Basis", definition: "cost per share" },
  {
    term: "Premium",
    definition: "income collected from selling the call",
  },
];

export function DefinitionsGlossary() {
  return (
    <PlaybookPageShell title="Definitions Glossary">
      <ul className="playbook-ref-list">
        {GLOSSARY_ITEMS.map(({ term, definition }) => (
          <PlaybookRefCard key={term} title={term}>
            <p className="playbook-ref-line">{definition}</p>
          </PlaybookRefCard>
        ))}
      </ul>
    </PlaybookPageShell>
  );
}
