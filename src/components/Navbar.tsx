import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { MouseEvent, ReactNode } from "react";
import { AnimatePresence, m as motion, useIsPresent, useReducedMotion } from "framer-motion";
import { cn } from "../utils";
import { useScrollState } from "../hooks/useScrollState";
import { expoOut, scrollBehavior } from "../animations";
import AmbientBackground from "./AmbientBackground";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "Sobre Mí", href: "#about" },
  { name: "Tecnologías", href: "#tech" },
  { name: "Proyectos", href: "#projects" },
];

// The reference animates the label first, holds the scene, then changes the page.
const menuTiming = { label: 0.6, openingPause: 0.75, closingPause: 0.95, scene: 0.7 };

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

export default function Navbar({ children }: { children: ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [pageSnapshot, setPageSnapshot] = useState<PageSnapshot | null>(null);
  const pageRef = useRef<HTMLDivElement>(null);
  const pendingNavigation = useRef<string | null>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const restoreScroll = useRef<number | null>(null);
  const reduced = !!useReducedMotion();
  const { isScrolled, activeSection } = useScrollState();

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

  const gap = pageSnapshot ? Math.min(32, Math.max(16, pageSnapshot.width * 0.042)) : 0;
  const compact = isMobileMenuOpen && !reduced && pageSnapshot;

  return (
    <>
      <div style={{ height: pageSnapshot?.documentHeight }}>
        <motion.div
          ref={pageRef}
          initial={false}
          animate={{
            scaleX: compact ? 1 - (gap * 2) / pageSnapshot.width : 1,
            scaleY: compact ? 1 - (gap * 2) / pageSnapshot.height : 1,
            borderRadius: compact ? 4 : 0,
          }}
          transition={{ duration: reduced ? 0 : menuTiming.scene, delay: reduced ? 0 : isMobileMenuOpen ? menuTiming.openingPause : menuTiming.closingPause + 0.12, ease: expoOut }}
          style={pageSnapshot ? { position: "fixed", inset: 0, height: "100dvh", minHeight: 0, overflow: "hidden" } : undefined}
          className="relative isolate min-h-screen bg-zinc-950"
        >
          <AmbientBackground />
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

              {/* Desktop Nav */}
              <div className="hidden md:flex items-center gap-8">
                {navLinks.map((link) => {
                  const isActive = activeSection === link.href.replace("#", "");
                  return (
                    <a
                      key={link.name}
                      href={link.href}
                      onClick={(e) => handleScrollToSection(e, link.href)}
                      className={cn(
                        "text-sm font-medium transition-colors relative group",
                        isActive ? "text-white" : "text-zinc-300 hover:text-white",
                      )}
                    >
                      {link.name}
                      <span
                        className={cn(
                          "absolute -bottom-1 left-0 h-0.5 bg-white transition-all duration-300",
                          isActive ? "w-full" : "w-0 group-hover:w-full",
                        )}
                      ></span>
                    </a>
                  );
                })}
                <a
                  href="#contact"
                  onClick={(e) => handleScrollToSection(e, "#contact")}
                  className="px-5 py-2.5 text-sm font-medium text-black bg-white rounded-full hover:bg-zinc-200 transition-colors"
                >
                  Hablemos
                </a>
              </div>

              {/* Mobile Nav Toggle */}
              <button
                ref={toggleRef}
                className="md:hidden flex min-h-11 items-center gap-3 text-xs font-medium uppercase tracking-wider text-zinc-300 hover:text-white z-50"
                onClick={toggleMobileMenu}
                aria-expanded={isMobileMenuOpen}
                aria-controls="compact-navigation"
                aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
              >
                <span aria-hidden="true" className="h-px w-5 bg-current" />
                <span className="w-14 text-right">MENÚ</span>
              </button>
            </div>
          </nav>
          <div style={pageSnapshot ? { width: pageSnapshot.width, transform: `translateY(-${pageSnapshot.scrollY}px)` } : undefined}>
            {children}
          </div>
        </motion.div>
      </div>

      <AnimatePresence onExitComplete={finishClosing}>
        {isMobileMenuOpen && (
          <CompactMenu
            reduced={reduced}
            gap={gap}
            headerInset={Math.min(80, (pageSnapshot?.height ?? 0) * 0.08)}
            isScrolled={isScrolled}
            activeSection={activeSection}
            onClose={closeMobileMenu}
            onNavigate={handleScrollToSection}
          />
        )}
      </AnimatePresence>
    </>
  );
}

function CompactMenu({ reduced, gap, headerInset, isScrolled, activeSection, onClose, onNavigate }: {
  headerInset: number;
  gap: number;
  reduced: boolean;
  isScrolled: boolean;
  activeSection: string;
  onClose: () => void;
  onNavigate: (event: MouseEvent<HTMLAnchorElement>, href: string) => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const closeCallback = useRef(onClose);

  useEffect(() => {
    closeCallback.current = onClose;
  }, [onClose]);

  useEffect(() => {
    const dialog = dialogRef.current;
    dialog?.showModal();
    closeRef.current?.focus({ preventScroll: true });
    const desktop = window.matchMedia("(min-width: 768px)");
    const handleResize = () => {
      if (desktop.matches) closeCallback.current();
    };
    desktop.addEventListener("change", handleResize);
    return () => {
      desktop.removeEventListener("change", handleResize);
      dialog?.close();
    };
  }, []);

  const links = [...navLinks, { name: "Hablemos", href: "#contact" }];
  const openingPause = reduced ? 0 : menuTiming.openingPause;
  const closingPause = reduced ? 0 : menuTiming.closingPause;

  return (
    <motion.dialog
      ref={dialogRef}
      id="compact-navigation"
      aria-label="Navegación principal"
      onCancel={(event) => { event.preventDefault(); onClose(); }}
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={{
        hidden: {},
        visible: {},
        exit: { transition: { duration: reduced ? 0 : menuTiming.closingPause + menuTiming.scene + 0.12 } },
      }}
      className="fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none overflow-hidden border-0 bg-transparent p-0 text-white backdrop:bg-transparent"
    >
      <motion.div
        variants={{
          hidden: { inset: 0, borderRadius: 0 },
          visible: { inset: gap, borderRadius: 4, transition: { duration: reduced ? 0 : menuTiming.scene, delay: openingPause, ease: expoOut } },
          exit: { inset: 0, borderRadius: 0, transition: { duration: reduced ? 0 : menuTiming.scene, delay: reduced ? 0 : closingPause + 0.12, ease: expoOut } },
        }}
        className="absolute isolate flex flex-col overflow-hidden"
      >
        <motion.div
          aria-hidden="true"
          variants={{
            hidden: { opacity: 0, backdropFilter: "blur(0px)" },
            visible: { opacity: 1, backdropFilter: reduced ? "blur(0px)" : "blur(10px)", transition: { duration: reduced ? 0 : 0.35, delay: reduced ? 0 : openingPause + 0.08 } },
            exit: { opacity: 0, backdropFilter: "blur(0px)", transition: { duration: reduced ? 0 : 0.4, delay: reduced ? 0 : closingPause + 0.22 } },
          }}
          className="pointer-events-none absolute inset-0 -z-10"
        />
        <motion.div
          aria-hidden="true"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { duration: reduced ? 0 : 0.4, delay: reduced ? 0 : openingPause + 0.2 } },
            exit: { opacity: 0, transition: { duration: reduced ? 0 : 0.32, delay: reduced ? 0 : closingPause + 0.12 } },
          }}
          className="pointer-events-none absolute inset-0 -z-10 bg-zinc-900"
        />
        <motion.div
          variants={{
            hidden: { paddingTop: isScrolled ? 16 : 24, paddingLeft: 24, paddingRight: 24 },
            visible: { paddingTop: headerInset, paddingLeft: gap, paddingRight: gap, transition: { duration: reduced ? 0 : menuTiming.scene, delay: openingPause, ease: expoOut } },
            exit: { paddingTop: isScrolled ? 16 : 24, paddingLeft: 24, paddingRight: 24, transition: { duration: reduced ? 0 : menuTiming.scene, delay: reduced ? 0 : closingPause + 0.12, ease: expoOut } },
          }}
          className="z-10 flex shrink-0 items-center justify-between"
        >
          <a href="#home" onClick={(event) => onNavigate(event, "#home")} className="text-2xl font-bold tracking-tighter">
            BASTIAN<span className="text-zinc-500">.</span>
          </a>
          <button ref={closeRef} onClick={onClose} className="flex min-h-11 items-center gap-3 text-xs font-medium uppercase tracking-wider" aria-label="Cerrar menú">
            <span aria-hidden="true" className="h-px w-5 bg-current" />
            <MenuLabel reduced={reduced} />
          </button>
        </motion.div>
        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto" style={{ paddingInline: gap, paddingBottom: headerInset }}>
          <motion.nav
            aria-label="Secciones"
            variants={{
              hidden: {},
              visible: { transition: { delayChildren: reduced ? 0 : openingPause + 0.35, staggerChildren: reduced ? 0 : 0.075 } },
              exit: {},
            }}
            className="my-auto flex shrink-0 flex-col items-start gap-1 py-8"
          >
            {links.map((link) => (
              <div key={link.href} className="overflow-hidden py-1">
                <motion.a
                  href={link.href}
                  onClick={(event) => onNavigate(event, link.href)}
                  aria-current={activeSection === link.href.slice(1) ? "location" : undefined}
                  variants={{
                    hidden: { y: reduced ? 0 : "110%", opacity: 0 },
                    visible: { y: 0, opacity: 1, transition: { duration: reduced ? 0 : 0.65, ease: expoOut } },
                    exit: { y: reduced ? 0 : "-30%", opacity: 0, transition: { duration: reduced ? 0 : 0.22, delay: closingPause } },
                  }}
                  className="block py-1 text-3xl font-normal uppercase tracking-tight text-zinc-300 transition-colors hover:text-white aria-[current=location]:text-white focus-visible:outline-offset-[-2px]"
                >
                  {link.name}
                </motion.a>
              </div>
            ))}
          </motion.nav>

          <motion.div
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { delay: reduced ? 0 : openingPause + 0.7, duration: reduced ? 0 : 0.3 } }, exit: { opacity: 0, transition: { duration: reduced ? 0 : 0.22, delay: closingPause } } }}
            className="flex shrink-0 items-end justify-between gap-4 text-xs text-zinc-400"
          >
            <a href="#contact" onClick={(event) => onNavigate(event, "#contact")} className="underline underline-offset-4 hover:text-white">Construyamos algo juntos.</a>
            <span>Portafolio</span>
          </motion.div>
        </div>
      </motion.div>
    </motion.dialog>
  );
}


function MenuLabel({ reduced }: { reduced: boolean }) {
  const isPresent = useIsPresent();
  // Both clicks send the new word up out of its mask, then down with a small rebound.
  const bounce = { y: reduced ? 0 : ["0%", "-125%", "-125%", "18%", "-7%", "0%"] };

  return (
    <span aria-hidden="true" className="block h-4 w-14 overflow-hidden text-right">
      <motion.span
        className="block h-4 leading-4"
        variants={{ hidden: { y: "0%" }, visible: bounce, exit: bounce }}
        transition={{
          duration: reduced ? 0 : menuTiming.label,
          times: [0, 0.22, 0.4, 0.72, 0.88, 1],
          ease: "easeInOut",
        }}
      >
        {isPresent ? "CERRAR" : "MENÚ"}
      </motion.span>
    </span>
  );
}
