import { createContext } from "react";

export interface ScrollState {
  isScrolled: boolean;
  activeSection: string;
}

export const SECTION_IDS = ["home", "about", "tech", "projects", "contact"] as const;
export const SCROLL_THRESHOLD = 20;
export const ACTIVE_SECTION_OFFSET = 120;

export const initialState: ScrollState = {
  isScrolled: false,
  activeSection: "home",
};

export const ScrollStateContext = createContext<ScrollState | null>(null);
