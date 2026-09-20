import { useEffect, useSyncExternalStore } from "react";
import { useReducedMotion, useMotionValue, scroll } from "framer-motion";
import type { RefObject } from "react";
import type { Variants } from "framer-motion";

export const expoOut = [0.16, 1, 0.3, 1] as const;
export const revealViewport = { once: true, margin: "0px 0px -96px 0px" } as const;

export function reveal(
  offset = 24,
  duration = 0.7,
  axis: "x" | "y" = "y",
  reduced = false,
): Variants {
  return {
    hidden: {
      opacity: reduced ? 1 : 0,
      x: !reduced && axis === "x" ? offset : 0,
      y: !reduced && axis === "y" ? offset : 0,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: reduced ? 0 : duration, ease: expoOut },
    },
  };
}

export function sequence(
  staggerChildren: number,
  delayChildren = 0,
  reduced = false,
): Variants {
  return {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduced ? 0 : staggerChildren,
        delayChildren: reduced ? 0 : delayChildren,
      },
    },
  };
}

export function usePop(scale = 1.05, y = 0) {
  const reduced = useReducedMotion();
  return {
    whileHover: reduced ? undefined : { scale, y },
    whileTap: reduced ? undefined : { scale: Math.max(scale - 0.06, 0.9) },
    transition: { duration: 0.3, ease: "easeOut" as const },
  };
}

const desktopQuery = "(min-width: 768px)";
function subscribeDesktop(callback: () => void) {
  const query = window.matchMedia(desktopQuery);
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}

export function useParallax(
  target: RefObject<HTMLElement | null>,
  from: number,
  to: number,
  desktopOnly = false,
  neutral = 0,
) {
  const reduced = useReducedMotion();
  const desktop = useSyncExternalStore(
    subscribeDesktop,
    () => window.matchMedia(desktopQuery).matches,
    () => false,
  );
  const enabled = !reduced && (!desktopOnly || desktop);
  const value = useMotionValue(neutral);
  useEffect(() => {
    const element = target.current;
    if (!enabled || !element) return;
    return scroll((progress: number) => {
      value.set(from + (to - from) * progress);
    }, { target: element, offset: ["start end", "end start"] });
  }, [enabled, target, from, to, value]);
  return enabled ? value : neutral;
}

export function scrollBehavior(): ScrollBehavior {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ? "instant"
    : "smooth";
}
