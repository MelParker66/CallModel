import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  CALL_PLAYBOOK_OVERVIEW_PATH,
  getAdjacentPlaybookRoutes,
} from "./callPlaybookRoutes";

interface PlaybookPageShellProps {
  title: string;
  children: React.ReactNode;
}

export const PlaybookPageShell: React.FC<PlaybookPageShellProps> = ({
  title,
  children,
}) => {
  const { pathname } = useLocation();
  const isOverview = pathname === CALL_PLAYBOOK_OVERVIEW_PATH;
  const { prev, next } = getAdjacentPlaybookRoutes(pathname);

  return (
    <div className="playbook-page playbook-page-active">
      <div className="playbook-page-inner">
        {!isOverview && (
          <Link to={CALL_PLAYBOOK_OVERVIEW_PATH} className="playbook-back">
            Back to Call Playbook Overview
          </Link>
        )}
        <header className="panel-header">
          <h1 className="panel-title">{title}</h1>
        </header>
        {children}
        {!isOverview && (prev || next) && (
          <nav
            className="playbook-page-nav"
            aria-label="Playbook page navigation"
          >
            {prev && (
              <Link to={prev} className="btn playbook-nav-btn">
                ← Previous
              </Link>
            )}
            {next && (
              <Link to={next} className="btn playbook-nav-btn">
                Next →
              </Link>
            )}
          </nav>
        )}
      </div>
    </div>
  );
};
