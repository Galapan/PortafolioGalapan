import { useState, useEffect, useRef } from "react";

export interface ScrollState {
  scrollY: number;
  isScrolled: boolean;
  activeSection: string;
  isScrollPastThreshold: boolean;
}

const SECTION_IDS = ["home", "about", "tech", "projects", "contact"] as const;
const SCROLL_THRESHOLD = 20;
const ACTIVE_SECTION_OFFSET = 120;
const SCROLL_TO_TOP_THRESHOLD = 400;

export function useScrollState(): ScrollState {
  const [state, setState] = useState<ScrollState>({
    scrollY: 0,
    isScrolled: false,
    activeSection: "home",
    isScrollPastThreshold: false,
  });
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

  return state;
}
