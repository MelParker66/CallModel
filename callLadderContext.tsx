import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { CALL_LADDER_ROW_COUNT, CallExportRow } from "./callLadderLogic";

export const CALL_LADDER_SELECTIONS_KEY = "callLadderSelections";

export function readCallLadderSelections(): (CallExportRow | null)[] {
  const empty = Array(CALL_LADDER_ROW_COUNT).fill(null) as (CallExportRow | null)[];

  try {
    const raw = sessionStorage.getItem(CALL_LADDER_SELECTIONS_KEY);
    if (!raw) return empty;

    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return empty;

    return empty.map((_, index) => {
      const row = parsed[index];
      return row ?? null;
    });
  } catch {
    return empty;
  }
}

export function saveCallLadderSelections(
  rows: (CallExportRow | null)[]
): void {
  sessionStorage.setItem(CALL_LADDER_SELECTIONS_KEY, JSON.stringify(rows));
}

interface CallLadderContextValue {
  selectedRows: (CallExportRow | null)[];
  selectRow: (rowIndex: number, row: CallExportRow) => void;
  deselectRow: (rowIndex: number) => void;
}

const CallLadderContext = createContext<CallLadderContextValue | null>(null);

export function CallLadderProvider({ children }: { children: React.ReactNode }) {
  const [selectedRows, setSelectedRows] = useState<(CallExportRow | null)[]>(
    readCallLadderSelections
  );

  const selectRow = useCallback((rowIndex: number, row: CallExportRow) => {
    setSelectedRows((prev) => {
      const next = [...prev];
      next[rowIndex] = row;
      saveCallLadderSelections(next);
      return next;
    });
  }, []);

  const deselectRow = useCallback((rowIndex: number) => {
    setSelectedRows((prev) => {
      const next = [...prev];
      next[rowIndex] = null;
      saveCallLadderSelections(next);
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
