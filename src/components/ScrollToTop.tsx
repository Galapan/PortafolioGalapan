import { useEffect, useLayoutEffect, useRef } from "react";
import { ArrowUp } from "lucide-react";
import { useScrollState } from "../hooks/useScrollState";
import { hoverPop, popIn, popOut } from "../animations";

export default function ScrollToTop() {
  const { isScrollPastThreshold } = useScrollState();
  const buttonRef = useRef<HTMLButtonElement>(null);

  useLayoutEffect(() => {
    const btn = buttonRef.current;
    if (!btn) return;
    if (isScrollPastThreshold) {
      popIn(btn);
    } else {
      popOut(btn);
    }
  }, [isScrollPastThreshold]);

  useEffect(() => {
    const btn = buttonRef.current;
    if (!btn) return;
    return hoverPop([btn], { scale: 1.1 });
  }, []);

  return (
    <button
      ref={buttonRef}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Volver arriba"
      aria-hidden={!isScrollPastThreshold}
      tabIndex={isScrollPastThreshold ? 0 : -1}
      className={`fixed bottom-6 right-6 z-40 p-3 md:p-4 bg-white/10 backdrop-blur-xl border border-white/20 text-white rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.5)] hover:bg-white/20 hover:border-white/40 transition-colors opacity-0 scale-[0.8] translate-y-5 ${isScrollPastThreshold ? "pointer-events-auto" : "pointer-events-none"}`}
    >
      <ArrowUp size={20} className="md:w-6 md:h-6" />
    </button>
  );
}
