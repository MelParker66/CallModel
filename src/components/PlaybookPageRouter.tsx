import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { BestTimingRules } from "../pages/call-playbook/BestTimingRules";
import { BusinessModel } from "../pages/call-playbook/BusinessModel";
import { CallChecklist } from "../pages/call-playbook/CallChecklist";
import { CallPlaybookOverview } from "../pages/call-playbook/CallPlaybookOverview";
import { CompanyOverview } from "../pages/call-playbook/CompanyOverview";
import { DefinitionsGlossary } from "../pages/call-playbook/DefinitionsGlossary";
import { GraphOfCompany } from "../pages/call-playbook/GraphOfCompany";
import { PossibleItm } from "../pages/call-playbook/PossibleItm";
import { QuickStartGuide } from "../pages/call-playbook/QuickStartGuide";
import { WeeklyRoutine } from "../pages/call-playbook/WeeklyRoutine";
import { CALL_PLAYBOOK_OVERVIEW_PATH } from "../pages/call-playbook/callPlaybookRoutes";

const PLAYBOOK_PAGES: Record<string, React.ReactNode> = {
  "/call-playbook/overview": <CallPlaybookOverview />,
  "/call-playbook/company-overview": <CompanyOverview />,
  "/call-playbook/graph": <GraphOfCompany />,
  "/call-playbook/business-model": <BusinessModel />,
  "/call-playbook/checklist": <CallChecklist />,
  "/call-playbook/possible-itm": <PossibleItm />,
  "/call-playbook/quick-start": <QuickStartGuide />,
  "/call-playbook/weekly-routine": <WeeklyRoutine />,
  "/call-playbook/timing-rules": <BestTimingRules />,
  "/call-playbook/glossary": <DefinitionsGlossary />,
};

export function PlaybookPageRouter() {
  const { pathname } = useLocation();

  if (!pathname.startsWith("/call-playbook")) {
    return null;
  }

  return PLAYBOOK_PAGES[pathname] ?? (
    <Navigate to={CALL_PLAYBOOK_OVERVIEW_PATH} replace />
  );
}
