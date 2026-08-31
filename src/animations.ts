import { useLayoutEffect } from "react";
import {
  animate,
  createScope,
  onScroll,
  stagger,
  utils,
  type AnimationParams,
  type ScrollObserver,
  type TargetsParam,
} from "animejs";

type FadeOptions = {
  delay?: number;
  staggerDelay?: number;
  offset?: number;
  axis?: "x" | "y";
  duration?: number;
  ease?: string;
};

export function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function fade(
  targets: TargetsParam | null,
  opts: FadeOptions,
  autoplay?: ScrollObserver,
) {
  if (!targets) return;
  const {
    delay = 0,
    staggerDelay,
    offset = 24,
    axis = "y",
    duration = 700,
    ease = "outExpo",
  } = opts;
  const animationDelay = prefersReducedMotion()
    ? 0
    : staggerDelay
      ? stagger(staggerDelay, { start: delay })
      : delay;
  if (axis === "x") {
    utils.set(targets, { opacity: 0, x: offset });
    if (autoplay) {
      return animate(targets, {
        opacity: 1,
        x: 0,
        duration: prefersReducedMotion() ? 0 : duration,
        delay: animationDelay,
        ease,
        autoplay,
      });
    }
    return animate(targets, {
      opacity: 1,
      x: 0,
      duration: prefersReducedMotion() ? 0 : duration,
      delay: animationDelay,
      ease,
    });
  }

  utils.set(targets, { opacity: 0, y: offset });
  if (autoplay) {
    return animate(targets, {
      opacity: 1,
      y: 0,
      duration: prefersReducedMotion() ? 0 : duration,
      delay: animationDelay,
      ease,
      autoplay,
    });
  }
  return animate(targets, {
    opacity: 1,
    y: 0,
    duration: prefersReducedMotion() ? 0 : duration,
    delay: animationDelay,
    ease,
  });
}

export function fadeUp(targets: TargetsParam | null, opts: FadeOptions = {}) {
  return fade(targets, opts);
}

export function enterOnScroll(
  targets: TargetsParam | null,
  opts: FadeOptions & { scrollTarget?: TargetsParam | null; enter?: string } = {},
) {
  if (!targets) return;
  if (prefersReducedMotion()) {
    if (opts.axis === "x") {
      utils.set(targets, { opacity: 1, x: 0 });
    } else {
      utils.set(targets, { opacity: 1, y: 0 });
    }
    return;
  }
  const { scrollTarget, enter = "bottom top+=96", ...fadeOpts } = opts;
  return fade(
    targets,
    fadeOpts,
    onScroll({
      target: scrollTarget ?? targets,
      enter,
      repeat: false,
    }),
  );
}

type ScrubOptions = {
  scrollTarget?: TargetsParam | null;
  enter?: string;
  leave?: string;
  sync?: boolean | number | string;
};

export function scrub(
  targets: TargetsParam | null,
  params: Omit<AnimationParams, "autoplay">,
  opts: ScrubOptions = {},
) {
  if (!targets || prefersReducedMotion()) return;
  const {
    scrollTarget,
    enter = "bottom top",
    leave = "top bottom",
    sync = true,
  } = opts;
  return animate(targets, {
    ...params,
    autoplay: onScroll({
      target: scrollTarget ?? targets,
      enter,
      leave,
      sync,
      repeat: true,
    }),
  });
}

type PopOptions = {
  scale?: number;
  y?: number;
  duration?: number;
};

export function hoverPop(els: ArrayLike<Element>, opts: PopOptions = {}) {
  const { scale = 1.05, y = 0, duration = 300 } = opts;
  const items = Array.from(els);
  if (prefersReducedMotion() || items.length === 0) {
    return () => {};
  }
  const cleanups = items.map((el) => {
    const enter = () =>
      animate(el, { scale, y, duration, ease: "outQuad" });
    const leave = () =>
      animate(el, { scale: 1, y: 0, duration, ease: "outQuad" });
    const press = () =>
      animate(el, { scale: Math.max(scale - 0.06, 0.9), duration: 120, ease: "outQuad" });
    el.addEventListener("mouseenter", enter);
    el.addEventListener("mouseleave", leave);
    el.addEventListener("pointerdown", press);
    el.addEventListener("pointerup", leave);
    el.addEventListener("pointercancel", leave);
    return () => {
      el.removeEventListener("mouseenter", enter);
      el.removeEventListener("mouseleave", leave);
      el.removeEventListener("pointerdown", press);
      el.removeEventListener("pointerup", leave);
      el.removeEventListener("pointercancel", leave);
    };
  });
  return () => cleanups.forEach((cleanup) => cleanup());
}

export function popIn(
  el: Element,
  opts: { duration?: number; scale?: number; y?: number } = {},
) {
  const { duration = 200, scale = 0.8, y = 20 } = opts;
  return animate(el, {
    opacity: [0, 1],
    scale: [scale, 1],
    y: [y, 0],
    duration: prefersReducedMotion() ? 0 : duration,
    ease: "outQuad",
  });
}

export function popOut(
  el: Element,
  opts: { duration?: number; scale?: number; y?: number; onComplete?: () => void } = {},
) {
  const { duration = 200, scale = 0.8, y = 20, onComplete } = opts;
  if (onComplete) {
    return animate(el, {
      opacity: 0,
      scale,
      y,
      duration: prefersReducedMotion() ? 0 : duration,
      ease: "outQuad",
      onComplete,
    });
  }
  return animate(el, {
    opacity: 0,
    scale,
    y,
    duration: prefersReducedMotion() ? 0 : duration,
    ease: "outQuad",
  });
}

export function useScope(
  root: React.RefObject<HTMLElement | null>,
  setup: () => (() => void) | void,
  deps: unknown[] = [],
) {
  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const scope = createScope({ root: el }).add(setup);
    return () => scope.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
