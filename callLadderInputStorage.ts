export interface CallRowInputState {
  ticker: string;
  sharePrice: number | "";
  currentBasis: number | "";
  expiration: string;
  dte: number;
  contracts: number;
  strike: number | "";
  bid: number | "";
  ask: number | "";
  delta: number | "";
  probITM: number | "";
}

export const CALL_LADDER_INPUTS_KEY = "callLadderInputs";

export const DEFAULT_CALL_ROW_INPUTS: CallRowInputState = {
  ticker: "",
  sharePrice: "",
  currentBasis: "",
  expiration: "",
  dte: 7,
  contracts: 1,
  strike: "",
  bid: "",
  ask: "",
  delta: "",
  probITM: "",
};

type StoredCallLadderInputs = Record<string, Partial<CallRowInputState>>;

function readAllCallLadderInputs(): StoredCallLadderInputs {
  try {
    const raw = sessionStorage.getItem(CALL_LADDER_INPUTS_KEY);
    if (!raw) return {};

    const parsed: unknown = JSON.parse(raw);
    if (parsed == null || typeof parsed !== "object" || Array.isArray(parsed)) {
      return {};
    }

    return parsed as StoredCallLadderInputs;
  } catch {
    return {};
  }
}

function writeAllCallLadderInputs(data: StoredCallLadderInputs): void {
  sessionStorage.setItem(CALL_LADDER_INPUTS_KEY, JSON.stringify(data));
}

export function readCallLadderRowInputs(rowIndex: number): CallRowInputState {
  const stored = readAllCallLadderInputs()[String(rowIndex)];
  return {
    ...DEFAULT_CALL_ROW_INPUTS,
    ...stored,
  };
}

export function saveCallLadderRowInputs(
  rowIndex: number,
  state: CallRowInputState
): void {
  const all = readAllCallLadderInputs();
  all[String(rowIndex)] = state;
  writeAllCallLadderInputs(all);
}
