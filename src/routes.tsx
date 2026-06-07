import { Route, Routes } from "react-router-dom";
import { AppLayout } from "./layouts/AppLayout";
import { PersistentPanelsLayout } from "./layouts/PersistentPanelsLayout";

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="*" element={<PersistentPanelsLayout />} />
      </Route>
    </Routes>
  );
}
