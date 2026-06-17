import { useState, useEffect, useRef } from "react";
import type { ReactNode } from "react";
import {
  ScrollStateContext,
  initialState,
  SECTION_IDS,
  SCROLL_THRESHOLD,
  ACTIVE_SECTION_OFFSET,
  SCROLL_TO_TOP_THRESHOLD,
} from "./scrollStateContext";

export function ScrollStateProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState(initialState);
  const tickingRef = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (tickingRef.current) return;
      tickingRef.current = true;

      requestAnimationFrame(() => {
        const scrollY = window.scrollY;

        let activeSection = "home";
        for (let i = SECTION_IDS.length - 1; i >= 0; i--) {
          const section = document.getElementById(SECTION_IDS[i]);
          if (section && section.offsetTop - ACTIVE_SECTION_OFFSET <= scrollY) {
            activeSection = SECTION_IDS[i];
            break;
          }
        }

        setState({
          scrollY,
          isScrolled: scrollY > SCROLL_THRESHOLD,
          activeSection,
          isScrollPastThreshold: scrollY > SCROLL_TO_TOP_THRESHOLD,
        });

        tickingRef.current = false;
      });
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <ScrollStateContext.Provider value={state}>
      {children}
    </ScrollStateContext.Provider>
  );
}
