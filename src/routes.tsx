import { Navigate, Route, Routes } from "react-router-dom";
import { CallLadder } from "../CallLadder";
import { CallLadderExport } from "../CallLadderExport";
import { AppLayout } from "./layouts/AppLayout";
import { PlaybookLayout } from "./layouts/PlaybookLayout";
import { BestTimingRules } from "./pages/call-playbook/BestTimingRules";
import { BusinessModel } from "./pages/call-playbook/BusinessModel";
import { CallChecklist } from "./pages/call-playbook/CallChecklist";
import { CallPlaybookOverview } from "./pages/call-playbook/CallPlaybookOverview";
import { CompanyOverview } from "./pages/call-playbook/CompanyOverview";
import { DefinitionsGlossary } from "./pages/call-playbook/DefinitionsGlossary";
import { GraphOfCompany } from "./pages/call-playbook/GraphOfCompany";
import { PossibleItm } from "./pages/call-playbook/PossibleItm";
import { QuickStartGuide } from "./pages/call-playbook/QuickStartGuide";
import { WeeklyRoutine } from "./pages/call-playbook/WeeklyRoutine";

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route element={<PlaybookLayout />}>
          <Route
            path="/call-playbook/overview"
            element={<CallPlaybookOverview />}
          />
          <Route
            path="/call-playbook/company-overview"
            element={<CompanyOverview />}
          />
          <Route path="/call-playbook/graph" element={<GraphOfCompany />} />
          <Route
            path="/call-playbook/business-model"
            element={<BusinessModel />}
          />
          <Route path="/call-playbook/checklist" element={<CallChecklist />} />
          <Route path="/call-playbook/possible-itm" element={<PossibleItm />} />
          <Route
            path="/call-playbook/quick-start"
            element={<QuickStartGuide />}
          />
          <Route
            path="/call-playbook/weekly-routine"
            element={<WeeklyRoutine />}
          />
          <Route
            path="/call-playbook/timing-rules"
            element={<BestTimingRules />}
          />
          <Route
            path="/call-playbook/glossary"
            element={<DefinitionsGlossary />}
          />
        </Route>
        <Route path="/call-ladder" element={<CallLadder />} />
        <Route path="/call-ladder-export" element={<CallLadderExport />} />
        <Route
          index
          element={<Navigate to="/call-playbook/overview" replace />}
        />
        <Route
          path="/call-playbook"
          element={<Navigate to="/call-playbook/overview" replace />}
        />
      </Route>
    </Routes>
  );
}
