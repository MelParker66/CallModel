import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  CALL_PLAYBOOK_OVERVIEW_PATH,
  CALL_PLAYBOOK_ROUTES,
} from "../pages/call-playbook/callPlaybookRoutes";

const MAIN_NAV = [
  {
    path: CALL_PLAYBOOK_OVERVIEW_PATH,
    label: "Playbook",
    matchPrefix: "/call-playbook",
  },
  { path: "/call-ladder", label: "Call Ladder", matchPrefix: "/call-ladder" },
  {
    path: "/call-ladder-export",
    label: "Call Ladder Export",
    matchPrefix: "/call-ladder-export",
  },
] as const;

function isActivePath(pathname: string, matchPrefix: string, path: string) {
  if (matchPrefix === "/call-ladder") {
    return pathname === "/call-ladder";
  }
  return pathname === path || pathname.startsWith(`${matchPrefix}/`);
}

export function Sidebar() {
  const { pathname } = useLocation();

  return (
    <nav className="sidebar" aria-label="Application">
      <div className="sidebar-nav">
        {MAIN_NAV.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={() =>
              isActivePath(pathname, item.matchPrefix, item.path)
                ? "sidebar-icon sidebar-active"
                : "sidebar-icon"
            }
          >
            {item.label}
          </NavLink>
        ))}
      </div>
      <div className="sidebar-logo-text">
        <span className="logo-main">421</span>
        <span className="logo-sub">Loop Analytics, LLC</span>
      </div>
    </nav>
  );
}

export function PlaybookSubsidebar() {
  const { pathname } = useLocation();
  const autoOpen =
    pathname !== CALL_PLAYBOOK_OVERVIEW_PATH &&
    pathname.startsWith("/call-playbook");
  const [groupOpen, setGroupOpen] = useState(autoOpen);

  useEffect(() => {
    setGroupOpen(autoOpen);
  }, [autoOpen]);

  return (
    <nav className="playbook-subsidebar" aria-label="Playbook sections">
      <div
        className={`sidebar-group sidebar-group--call${groupOpen ? " open" : ""}`}
        data-sidebar-group="call"
      >
        <button
          type="button"
          className="sidebar-group-header"
          aria-expanded={groupOpen}
          onClick={() => setGroupOpen((value) => !value)}
        >
          Call Playbook
        </button>
        <div className="sidebar-group-content">
          <ul className="playbook-subnav">
            {CALL_PLAYBOOK_ROUTES.map((route) => (
              <li key={route.path}>
                <NavLink
                  to={route.path}
                  className={({ isActive }) =>
                    isActive
                      ? "playbook-subnav-link playbook-subnav-active"
                      : "playbook-subnav-link"
                  }
                >
                  {route.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
