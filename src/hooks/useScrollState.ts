import { useContext } from "react";
import { ScrollStateContext, type ScrollState } from "./scrollStateContext";

export function useScrollState(): ScrollState {
  const context = useContext(ScrollStateContext);
  if (!context) {
    throw new Error("useScrollState must be used within a ScrollStateProvider");
  }
  return context;
}
