import type { MouseEvent } from "react";
import { cn } from "../../utils";
import { navLinks } from "./config";

export default function DesktopNavigation({ activeSection, onNavigate }: {
  activeSection: string;
  onNavigate: (event: MouseEvent<HTMLAnchorElement>, href: string) => void;
}) {
  return (
              <div className="hidden md:flex items-center gap-8">
                {navLinks.map((link) => {
                  const isActive = activeSection === link.href.replace("#", "");
                  return (
                    <a
                      key={link.name}
                      href={link.href}
                      onClick={(e) => onNavigate(e, link.href)}
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
                  onClick={(e) => onNavigate(e, "#contact")}
                  className="px-5 py-2.5 text-sm font-medium text-black bg-white rounded-full hover:bg-zinc-200 transition-colors"
                >
                  Hablemos
                </a>
              </div>

  );
}
