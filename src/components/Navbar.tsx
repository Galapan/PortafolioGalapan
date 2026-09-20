import type { ReactNode } from "react";
import { AnimatePresence, useReducedMotion } from "framer-motion";
import { cn } from "../utils";
import { useScrollState } from "../hooks/useScrollState";
import { useMobileNavigation } from "../hooks/useMobileNavigation";
import CompactMenu from "./navigation/CompactMenu";
import DesktopNavigation from "./navigation/DesktopNavigation";
import NavigationScene from "./navigation/NavigationScene";

export default function Navbar({ children }: { children: ReactNode }) {
  const navigation = useMobileNavigation();
  const { isMobileMenuOpen, pageSnapshot, toggleRef, closeMobileMenu,
    toggleMobileMenu, finishClosing, handleScrollToSection } = navigation;
  const reduced = !!useReducedMotion();
  const { isScrolled, activeSection } = useScrollState();

  const gap = pageSnapshot ? Math.min(32, Math.max(16, pageSnapshot.width * 0.042)) : 0;

  return (
    <>
      <NavigationScene navigation={navigation} reduced={reduced} gap={gap} header={
          <nav
            className={cn(
              "fixed top-0 left-0 right-0 z-50 transition-[padding,background-color] duration-300",
              pageSnapshot && "invisible",
              isScrolled
                ? "py-4 bg-zinc-950/60 backdrop-blur-2xl"
                : "py-6 bg-transparent",
            )}
          >
            <div className="container mx-auto px-6 lg:px-12 flex justify-between items-center max-w-7xl">
              <a
                href="#home"
                onClick={(e) => handleScrollToSection(e, "#home")}
                className="text-2xl font-bold tracking-tighter text-white z-50 flex items-center gap-2"
              >
                <span>
                  BASTIAN<span className="text-zinc-500">.</span>
                </span>
              </a>

              <DesktopNavigation activeSection={activeSection} onNavigate={handleScrollToSection} />

              {/* Mobile Nav Toggle */}
              <button
                ref={toggleRef}
                className="md:hidden flex min-h-11 items-center gap-3 text-xs font-medium uppercase tracking-wider text-zinc-300 hover:text-white z-50"
                onClick={toggleMobileMenu}
                aria-expanded={isMobileMenuOpen}
                aria-controls="compact-navigation"
                aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
              >
                <span className="w-14 text-right">MENÚ</span>
              </button>
            </div>
          </nav>
      }>
        {children}
      </NavigationScene>

      <AnimatePresence onExitComplete={finishClosing}>
        {isMobileMenuOpen && (
          <CompactMenu
            reduced={reduced}
            isScrolled={isScrolled}
            gap={gap}
            headerInset={Math.min(80, (pageSnapshot?.height ?? 0) * 0.08)}
            activeSection={activeSection}
            onClose={closeMobileMenu}
            onNavigate={handleScrollToSection}
          />
        )}
      </AnimatePresence>
    </>
  );
}
