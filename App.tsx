import { CallLadderProvider } from "./callLadderContext";
import { AppRoutes } from "./src/routes";

export default function App() {
  return (
    <CallLadderProvider>
      <AppRoutes />
    </CallLadderProvider>
  );
}
