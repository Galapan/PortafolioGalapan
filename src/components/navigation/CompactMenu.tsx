import type { MouseEvent, RefObject } from "react";
import { m as motion } from "framer-motion";
import { expoOut } from "../../animations";
import { useMenuDialog } from "../../hooks/useMenuDialog";
import { navLinks, menuTiming } from "./config";

export default function CompactMenu({ reduced, gap, headerInset, isScrolled, activeSection, onClose, onNavigate }: {
  headerInset: number;
  isScrolled: boolean;
  gap: number;
  reduced: boolean;
  activeSection: string;
  onClose: () => void;
  onNavigate: (event: MouseEvent<HTMLAnchorElement>, href: string) => void;
}) {
  const { dialogRef, closeRef } = useMenuDialog(onClose);
  const duration = (seconds: number) => reduced ? 0 : seconds;
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
        hidden: {},
        visible: {},
        exit: { transition: { duration: duration(menuTiming.scene + 0.12) } },
      }}
      className="fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none overflow-hidden border-0 bg-transparent p-0 text-white backdrop:bg-transparent"
    >
      <MenuHeader reduced={reduced} gap={gap} headerInset={headerInset}
        isScrolled={isScrolled} closeRef={closeRef} onClose={onClose} onNavigate={onNavigate} />
      <motion.div
        variants={{
          hidden: { opacity: 0, y: duration(12) },
          visible: { opacity: 1, y: 0, transition: { duration: duration(menuTiming.scene), ease: expoOut } },
          exit: { opacity: 0, y: duration(12), transition: { duration: duration(menuTiming.scene), delay: duration(0.12), ease: expoOut } },
        }}
        style={{ inset: gap, borderRadius: 4 }}
        className="absolute isolate flex flex-col overflow-hidden"
      >
        <motion.div
          aria-hidden="true"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { duration: duration(0.4), delay: duration(0.2) } },
            exit: { opacity: 0, transition: { duration: duration(0.32), delay: duration(0.12) } },
          }}
          className="pointer-events-none absolute inset-0 -z-10 bg-zinc-900"
        />
        <div aria-hidden="true" className="shrink-0" style={{ height: headerInset + 44 }} />
        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto" style={{ paddingInline: gap, paddingBottom: headerInset }}>
          <motion.nav
            aria-label="Secciones"
            variants={{
              hidden: {},
              visible: { transition: { delayChildren: duration(0.35), staggerChildren: duration(0.075) } },
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
                    visible: { y: 0, opacity: 1, transition: { duration: duration(0.65), ease: expoOut } },
                    exit: { y: reduced ? 0 : "-30%", opacity: 0, transition: { duration: duration(0.22) } },
                  }}
                  className="block py-1 text-3xl font-normal uppercase tracking-tight text-zinc-300 transition-colors hover:text-white aria-[current=location]:text-white focus-visible:outline-offset-[-2px]"
                >
                  {link.name}
                </motion.a>
              </div>
            ))}
          </motion.nav>

          <motion.div
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { delay: duration(0.7), duration: duration(0.3) } }, exit: { opacity: 0, transition: { duration: duration(0.22) } } }}
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


// Keep the moving header outside the compact panel's clipping boundary.
// Translate from the original navbar coordinates without animating layout.
function MenuHeader({ reduced, gap, headerInset, isScrolled, closeRef, onClose, onNavigate }: {
  reduced: boolean;
  gap: number;
  headerInset: number;
  isScrolled: boolean;
  closeRef: RefObject<HTMLButtonElement | null>;
  onClose: () => void;
  onNavigate: (event: MouseEvent<HTMLAnchorElement>, href: string) => void;
}) {
  const top = isScrolled ? 16 : 24;
  const offsetX = gap * 2 - 24;
  const transition = { duration: reduced ? 0 : menuTiming.scene, ease: expoOut };
  const exitTransition = { ...transition, delay: reduced ? 0 : 0.12 };
  return (
    <motion.div
      style={{ top, left: 24, right: 24 }}
      variants={{
        hidden: { y: 0 },
        visible: { y: gap + headerInset - top, transition },
        exit: { y: 0, transition: exitTransition },
      }}
      className="absolute z-20 flex h-11 items-center justify-between"
    >
      <motion.a href="#home" onClick={(event) => onNavigate(event, "#home")}
        variants={{ hidden: { x: 0 }, visible: { x: offsetX, transition }, exit: { x: 0, transition: exitTransition } }}
        className="text-2xl font-bold tracking-tighter">
        BASTIAN<span className="text-zinc-500">.</span>
      </motion.a>
      <motion.button ref={closeRef} onClick={onClose}
        variants={{ hidden: { x: 0 }, visible: { x: -offsetX, transition }, exit: { x: 0, transition: exitTransition } }}
        className="flex min-h-11 items-center gap-3 text-xs font-medium uppercase tracking-wider" aria-label="Cerrar menú">
        <MenuLabel reduced={reduced} />
      </motion.button>
    </motion.div>
  );
}


function MenuLabel({ reduced }: { reduced: boolean }) {
  const duration = (seconds: number) => reduced ? 0 : seconds;
  const clear = { opacity: 1, filter: "blur(0px)" };
  const blurred = { opacity: 0, filter: reduced ? "blur(0px)" : "blur(6px)" };
  const fadeOut = { duration: duration(0.28), ease: "easeInOut" as const };
  const fadeIn = { duration: duration(menuTiming.label), delay: duration(0.12), ease: "easeInOut" as const };

  return (
    <span aria-hidden="true" className="relative block h-4 w-14 text-right">
      <motion.span
        className="absolute inset-0 block leading-4"
        variants={{
          hidden: clear,
          visible: { ...blurred, transition: fadeOut },
          exit: { ...clear, transition: fadeIn },
        }}
      >
        MENÚ
      </motion.span>
      <motion.span
        className="absolute inset-0 block leading-4"
        variants={{
          hidden: blurred,
          visible: { ...clear, transition: fadeIn },
          exit: { ...blurred, transition: fadeOut },
        }}
      >
        CERRAR
      </motion.span>
    </span>
  );
}
