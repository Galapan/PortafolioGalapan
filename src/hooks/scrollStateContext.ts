import { createContext } from "react";

export interface ScrollState {
  scrollY: number;
  isScrolled: boolean;
  activeSection: string;
  isScrollPastThreshold: boolean;
}

export const SECTION_IDS = ["home", "about", "tech", "projects", "contact"] as const;
export const SCROLL_THRESHOLD = 20;
export const ACTIVE_SECTION_OFFSET = 120;
export const SCROLL_TO_TOP_THRESHOLD = 400;

export const initialState: ScrollState = {
  scrollY: 0,
  isScrolled: false,
  activeSection: "home",
  isScrollPastThreshold: false,
};

export const ScrollStateContext = createContext<ScrollState | null>(null);
