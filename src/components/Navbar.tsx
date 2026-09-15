import { useEffect, useRef, useState } from "react";
import type { MouseEvent } from "react";
import { AnimatePresence, m as motion, useReducedMotion } from "framer-motion";
import { cn } from "../utils";
import { useScrollState } from "../hooks/useScrollState";
import { expoOut, scrollBehavior } from "../animations";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "Sobre Mí", href: "#about" },
  { name: "Tecnologías", href: "#tech" },
  { name: "Proyectos", href: "#projects" },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const reduced = !!useReducedMotion();
  const { isScrolled, activeSection } = useScrollState();

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const toggleMobileMenu = () => {
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    } else {
      setIsMobileMenuOpen(true);
    }
  };

  const handleScrollToSection = (
    e: MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();
    const targetId = href.replace("#", "");

    if (targetId === "contact") {
      window.scrollTo({ top: document.body.scrollHeight, behavior: scrollBehavior() });
    } else {
      const elem = document.getElementById(targetId);
      if (elem) {
        elem.scrollIntoView({ behavior: scrollBehavior() });
      }
    }
    closeMobileMenu();
  };

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
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

      <AnimatePresence>
        {isMobileMenuOpen && (
          <CompactMenu
            reduced={reduced}
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

function CompactMenu({ reduced, isScrolled, activeSection, onClose, onNavigate }: {
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
    const previousOverflow = document.body.style.overflow;
    dialog?.showModal();
    closeRef.current?.focus({ preventScroll: true });
    document.body.style.overflow = "hidden";
    const desktop = window.matchMedia("(min-width: 768px)");
    const handleResize = () => {
      if (desktop.matches) closeCallback.current();
    };
    desktop.addEventListener("change", handleResize);
    return () => {
      desktop.removeEventListener("change", handleResize);
      dialog?.close();
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  const links = [...navLinks, { name: "Hablemos", href: "#contact" }];

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
        hidden: { opacity: 0, backdropFilter: "blur(0px)" },
        visible: { opacity: 1, backdropFilter: reduced ? "blur(0px)" : "blur(12px)", transition: { duration: reduced ? 0 : 0.5 } },
        exit: { opacity: 0, backdropFilter: "blur(0px)", transition: { duration: reduced ? 0 : 0.36, delay: reduced ? 0 : 0.18 } },
      }}
      className="fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none overflow-hidden border-0 bg-zinc-950/30 p-3 text-white backdrop:bg-transparent"
    >
      <div className={cn("absolute inset-x-0 top-0 z-10 transition-[padding] duration-300", isScrolled ? "py-4" : "py-6")}>
        <div className="container mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-12">
          <a href="#home" onClick={(event) => onNavigate(event, "#home")} className="text-2xl font-bold tracking-tighter">
            BASTIAN<span className="text-zinc-500">.</span>
          </a>
          <button ref={closeRef} onClick={onClose} className="flex min-h-11 items-center gap-3 text-xs font-medium uppercase tracking-wider" aria-label="Cerrar menú">
            <span aria-hidden="true" className="h-px w-5 bg-current" />
            <span className="w-14 text-right">CERRAR</span>
          </button>
        </div>
      </div>
      <motion.div
        variants={{
          hidden: { opacity: 0, scale: reduced ? 1 : 1.025, y: reduced ? 0 : 8 },
          visible: { opacity: 1, scale: 1, y: 0, transition: { duration: reduced ? 0 : 0.75, delay: reduced ? 0 : 0.2, ease: expoOut, delayChildren: reduced ? 0 : 0.6 } },
          exit: { opacity: 0, scale: reduced ? 1 : 1.025, transition: { duration: reduced ? 0 : 0.36, ease: expoOut } },
        }}
        className="flex h-full flex-col overflow-y-auto rounded-sm bg-zinc-900 px-5 pb-7 pt-4 shadow-2xl ring-1 ring-inset ring-white/10"
      >
        <div aria-hidden="true" className="h-11 shrink-0" />

        <motion.nav
          aria-label="Secciones"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: reduced ? 0 : 0.12 } },
            exit: {},
          }}
          className="my-auto flex shrink-0 flex-col items-start gap-1 py-12"
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
                  exit: { y: reduced ? 0 : "-30%", opacity: 0, transition: { duration: reduced ? 0 : 0.22 } },
                }}
                className="block py-1 text-3xl font-normal uppercase tracking-tight text-zinc-300 transition-colors hover:text-white aria-[current=location]:text-white focus-visible:outline-offset-[-2px]"
              >
                {link.name}
              </motion.a>
            </div>
          ))}
        </motion.nav>

        <motion.div
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { delay: reduced ? 0 : 0.55, duration: reduced ? 0 : 0.3 } }, exit: { opacity: 0 } }}
          className="flex shrink-0 items-end justify-between gap-4 text-xs text-zinc-400"
        >
          <a href="#contact" onClick={(event) => onNavigate(event, "#contact")} className="underline underline-offset-4 hover:text-white">Construyamos algo juntos.</a>
          <span>Portafolio</span>
        </motion.div>
      </motion.div>

    </motion.dialog>
  );
}
