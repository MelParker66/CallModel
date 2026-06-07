import { useLocation } from "react-router-dom";
import { CallLadder } from "../../CallLadder";
import { CallLadderExport } from "../../CallLadderExport";
import { PlaybookLayout } from "./PlaybookLayout";
import { PlaybookPageRouter } from "../components/PlaybookPageRouter";

function panelClassName(active: boolean): string {
  return active ? "content-panel content-panel-active" : "content-panel";
}

export function PersistentPanelsLayout() {
  const { pathname } = useLocation();
  const isPlaybook = pathname.startsWith("/call-playbook");
  const isLadder = pathname === "/" || pathname === "/call-ladder";
  const isExport = pathname === "/call-ladder-export";

  return (
    <>
      <div id="playbook-panel" className={panelClassName(isPlaybook)}>
        <PlaybookLayout>
          <PlaybookPageRouter />
        </PlaybookLayout>
      </div>
      <div id="ladder-panel" className={panelClassName(isLadder)}>
        <CallLadder />
      </div>
      <div id="call-export-panel" className={panelClassName(isExport)}>
        <CallLadderExport />
      </div>
    </>
  );
}
