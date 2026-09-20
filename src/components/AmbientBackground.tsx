import { useEffect, useRef } from "react";

export default function AmbientBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let cancelled = false;
    let loading = false;
    let dispose: (() => void) | undefined;
    let generation = 0;
    let idle: number | undefined;
    let timer: number | undefined;

    function cancelScheduled() {
      window.removeEventListener("load", schedule);
      if (idle !== undefined) window.cancelIdleCallback(idle);
      window.clearTimeout(timer);
      idle = undefined;
      timer = undefined;
    }

    async function initialize() {
      cancelScheduled();
      if (cancelled || reducedMotion.matches || dispose || loading) return;
      const current = ++generation;
      loading = true;
      try {
        const { createAmbientScene } = await import("../rendering/ambientScene");
        if (!cancelled && !reducedMotion.matches && current === generation && canvas) {
          dispose = createAmbientScene(canvas);
        }
      } catch {
        // The CSS glow remains available if WebGL or its lazy chunk fails.
      } finally {
        if (current === generation) loading = false;
      }
    }

    function schedule() {
      cancelScheduled();
      if (cancelled || reducedMotion.matches || dispose || loading) return;
      if (document.readyState !== "complete") {
        window.addEventListener("load", schedule, { once: true });
      } else if (typeof window.requestIdleCallback === "function") {
        idle = window.requestIdleCallback(() => { void initialize(); }, { timeout: 2000 });
      } else {
        timer = window.setTimeout(() => { void initialize(); }, 1200);
      }
    }

    function onMotionChange() {
      cancelScheduled();
      generation++;
      loading = false;
      if (reducedMotion.matches) {
        dispose?.();
        dispose = undefined;
      } else {
        schedule();
      }
    }

    schedule();
    reducedMotion.addEventListener("change", onMotionChange);
    return () => {
      cancelled = true;
      generation++;
      cancelScheduled();
      reducedMotion.removeEventListener("change", onMotionChange);
      dispose?.();
    };
  }, []);

  return <canvas data-ambient-canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 h-full w-full" />;
}
