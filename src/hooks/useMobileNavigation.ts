import { useLayoutEffect, useRef, useState } from "react";
import type { MouseEvent } from "react";
import { scrollBehavior } from "../animations";

function navigateToSection(href: string) {
  const targetId = href.replace("#", "");
  if (targetId === "contact") {
    window.scrollTo({ top: document.body.scrollHeight, behavior: scrollBehavior() });
  } else {
    document.getElementById(targetId)?.scrollIntoView({ behavior: scrollBehavior() });
  }
}


// Freeze the visible viewport, rather than scaling the height of the entire document.
// This keeps the animation centered on the current section, even far down the page.
type PageSnapshot = { scrollY: number; height: number; width: number; documentHeight: number };

export function useMobileNavigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [pageSnapshot, setPageSnapshot] = useState<PageSnapshot | null>(null);
  const pageRef = useRef<HTMLDivElement>(null);
  const pendingNavigation = useRef<string | null>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const restoreScroll = useRef<number | null>(null);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const toggleMobileMenu = () => {
    if (isMobileMenuOpen) {
      closeMobileMenu();
      return;
    }
    restoreScroll.current = window.scrollY;
    setPageSnapshot({
      scrollY: window.scrollY,
      height: window.innerHeight,
      width: document.documentElement.clientWidth,
      documentHeight: pageRef.current?.offsetHeight ?? document.body.scrollHeight,
    });
    setIsMobileMenuOpen(true);
  };


  useLayoutEffect(() => {
    if (pageSnapshot) {
      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = previousOverflow; };
    }
    if (restoreScroll.current === null) return;
    // Restore after releasing the viewport and scroll lock, before the next paint.
    window.scrollTo({ top: restoreScroll.current, behavior: "instant" });
    restoreScroll.current = null;
    toggleRef.current?.focus({ preventScroll: true });
    const href = pendingNavigation.current;
    pendingNavigation.current = null;
    if (href) requestAnimationFrame(() => navigateToSection(href));
  }, [pageSnapshot]);

  const finishClosing = () => setPageSnapshot(null);

  const handleScrollToSection = (
    e: MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();
    if (pageSnapshot) {
      pendingNavigation.current = href;
      closeMobileMenu();
    } else {
      navigateToSection(href);
    }
  };

  return { isMobileMenuOpen, pageSnapshot, pageRef, toggleRef, closeMobileMenu,
    toggleMobileMenu, finishClosing, handleScrollToSection };
}
