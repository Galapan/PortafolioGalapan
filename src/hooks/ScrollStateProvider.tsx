import { useState, useEffect } from "react";
import type { ReactNode } from "react";
import {
  ScrollStateContext,
  initialState,
  SECTION_IDS,
  SCROLL_THRESHOLD,
  ACTIVE_SECTION_OFFSET,
} from "./scrollStateContext";

export function ScrollStateProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState(initialState);

  useEffect(() => {
    let frame = 0;
    let previous = initialState;
    const sections = SECTION_IDS.map((id) => document.getElementById(id));

    const update = () => {
      frame = 0;
      const scrollY = window.scrollY;
      let activeSection = "home";
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop - ACTIVE_SECTION_OFFSET <= scrollY) {
          activeSection = SECTION_IDS[i];
          break;
        }
      }
      const isScrolled = scrollY > SCROLL_THRESHOLD;
      // Consumers only need semantic changes, not every scroll pixel.
      if (previous.isScrolled === isScrolled && previous.activeSection === activeSection) return;
      previous = { isScrolled, activeSection };
      setState(previous);
    };

    const scheduleUpdate = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const observer = new ResizeObserver(scheduleUpdate);
    observer.observe(document.body);
    scheduleUpdate();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", scheduleUpdate);
    };
  }, []);

  return (
    <ScrollStateContext.Provider value={state}>
      {children}
    </ScrollStateContext.Provider>
  );
}
