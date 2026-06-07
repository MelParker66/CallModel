export const CALL_PLAYBOOK_ROUTES = [
  {
    path: "/call-playbook/overview",
    label: "Call Playbook Overview",
  },
  {
    path: "/call-playbook/company-overview",
    label: "Company Overview",
  },
  {
    path: "/call-playbook/graph",
    label: "Graph of Company",
  },
  {
    path: "/call-playbook/business-model",
    label: "Business Model",
  },
  {
    path: "/call-playbook/checklist",
    label: "Call Checklist",
  },
  {
    path: "/call-playbook/possible-itm",
    label: "Possible ITM (Call Version)",
  },
  {
    path: "/call-playbook/quick-start",
    label: "Quick Start Guide",
  },
  {
    path: "/call-playbook/weekly-routine",
    label: "Weekly Routine",
  },
  {
    path: "/call-playbook/timing-rules",
    label: "Best Timing Rules",
  },
  {
    path: "/call-playbook/glossary",
    label: "Definitions Glossary",
  },
] as const;

export type CallPlaybookRoutePath =
  (typeof CALL_PLAYBOOK_ROUTES)[number]["path"];

export const CALL_PLAYBOOK_OVERVIEW_PATH = "/call-playbook/overview" as const;

export function getAdjacentPlaybookRoutes(pathname: string): {
  prev: CallPlaybookRoutePath | null;
  next: CallPlaybookRoutePath | null;
} {
  const index = CALL_PLAYBOOK_ROUTES.findIndex((route) => route.path === pathname);
  if (index < 0) {
    return { prev: null, next: null };
  }
  return {
    prev: index > 0 ? CALL_PLAYBOOK_ROUTES[index - 1].path : null,
    next:
      index < CALL_PLAYBOOK_ROUTES.length - 1
        ? CALL_PLAYBOOK_ROUTES[index + 1].path
        : null,
  };
}
