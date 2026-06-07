import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";

export function AppLayout() {
  return (
    <div className="app-with-sidebar">
      <Sidebar />
      <div className="app-body">
        <main className="app-main">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
