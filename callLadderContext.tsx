import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { CALL_LADDER_ROW_COUNT, CallExportRow } from "./callLadderLogic";

interface CallLadderContextValue {
  selectedRows: (CallExportRow | null)[];
  selectRow: (rowIndex: number, row: CallExportRow) => void;
  deselectRow: (rowIndex: number) => void;
}

const CallLadderContext = createContext<CallLadderContextValue | null>(null);

export function CallLadderProvider({ children }: { children: React.ReactNode }) {
  const [selectedRows, setSelectedRows] = useState<(CallExportRow | null)[]>(() =>
    Array(CALL_LADDER_ROW_COUNT).fill(null)
  );

  const selectRow = useCallback((rowIndex: number, row: CallExportRow) => {
    setSelectedRows((prev) => {
      const next = [...prev];
      next[rowIndex] = row;
      return next;
    });
  }, []);

  const deselectRow = useCallback((rowIndex: number) => {
    setSelectedRows((prev) => {
      const next = [...prev];
      next[rowIndex] = null;
      return next;
    });
  }, []);

  const value = useMemo(
    () => ({
      selectedRows,
      selectRow,
      deselectRow,
    }),
    [selectedRows, selectRow, deselectRow]
  );

  return (
    <CallLadderContext.Provider value={value}>
      {children}
    </CallLadderContext.Provider>
  );
}

export function useCallLadder() {
  const ctx = useContext(CallLadderContext);
  if (!ctx) {
    throw new Error("useCallLadder must be used within CallLadderProvider");
  }
  return ctx;
}
