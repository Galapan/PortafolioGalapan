import { useEffect, useRef, useState } from "react";
import { animate, stagger } from "animejs";
import { Menu, X } from "lucide-react";
import { cn } from "../utils";
import { useScrollState } from "../hooks/useScrollState";
import { prefersReducedMotion } from "../animations";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "Sobre Mí", href: "#about" },
  { name: "Tecnologías", href: "#tech" },
  { name: "Proyectos", href: "#projects" },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [menuRendered, setMenuRendered] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { isScrolled, activeSection } = useScrollState();

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const toggleMobileMenu = () => {
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    } else {
      setIsMobileMenuOpen(true);
      setMenuRendered(true);
    }
  };

  const handleScrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();
    const targetId = href.replace("#", "");

    if (targetId === "contact") {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    } else {
      const elem = document.getElementById(targetId);
      if (elem) {
        elem.scrollIntoView({ behavior: "smooth" });
      }
    }
    closeMobileMenu();
  };

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMobileMenu();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const menu = menuRef.current;
    if (!menuRendered || !menu) return;
    const duration = prefersReducedMotion() ? 0 : 300;
    if (isMobileMenuOpen) {
      animate(menu, {
        opacity: [0, 1],
        y: [-20, 0],
        duration,
        ease: "inOutQuad",
      });
      animate(menu.querySelectorAll("[data-menu-link]"), {
        opacity: [0, 1],
        y: [20, 0],
        duration,
        ease: "outQuad",
        delay: stagger(100),
      });
    } else {
      animate(menu, {
        opacity: 0,
        y: -20,
        duration,
        ease: "inOutQuad",
        onComplete: () => setMenuRendered(false),
      });
    }
  }, [isMobileMenuOpen, menuRendered]);

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
            className="md:hidden text-zinc-300 hover:text-white z-50"
            onClick={toggleMobileMenu}
            aria-expanded={isMobileMenuOpen}
            aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Nav Menu */}
      {menuRendered && (
        <div
          ref={menuRef}
          className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 opacity-0"
        >
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.replace("#", "");
            return (
              <a
                key={link.name}
                href={link.href}
                data-menu-link
                onClick={(e) => handleScrollToSection(e, link.href)}
                className={cn(
                  "text-3xl font-bold transition-colors opacity-0",
                  isActive ? "text-white" : "text-zinc-300 hover:text-white",
                )}
              >
                {link.name}
              </a>
            );
          })}
          <a
            data-menu-link
            href="#contact"
            onClick={(e) => handleScrollToSection(e, "#contact")}
            className="mt-4 px-8 py-3 text-lg font-medium text-black bg-white rounded-full hover:bg-zinc-200 transition-colors opacity-0"
          >
            Hablemos
          </a>
        </div>
      )}
    </>
  );
}
