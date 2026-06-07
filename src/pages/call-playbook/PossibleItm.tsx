import { PlaybookPageShell } from "./PlaybookPageShell";
import { PlaybookRefCard } from "./PlaybookRefCard";

export function PossibleItm() {
  return (
    <PlaybookPageShell title="Possible ITM">
      <ul className="playbook-ref-list">
        <PlaybookRefCard title="If Your Call Goes ITM">
          <p className="playbook-ref-line">
            If your call goes ITM, you have five choices:
          </p>
          <ol className="playbook-ref-bullets">
            <li>Roll Out – same strike, later expiration</li>
            <li>Roll Up – higher strike, same expiration</li>
            <li>Roll Out + Up – later expiration and higher strike</li>
            <li>Let It Get Called – if return is excellent</li>
            <li>Close Early – avoid assignment during a breakout</li>
          </ol>
        </PlaybookRefCard>
      </ul>
    </PlaybookPageShell>
  );
}
