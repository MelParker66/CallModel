import { Outlet } from "react-router-dom";
import { PlaybookSubsidebar } from "../components/Sidebar";

export function PlaybookLayout() {
  return (
    <div id="playbook-panel" className="content-panel content-panel-active">
      <div className="playbook-shell">
        <PlaybookSubsidebar />
        <div className="playbook-pages">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
