import { useEffect, useRef } from "react";

export default function AmbientBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let cancelled = false;
    let dispose: (() => void) | undefined;
    let generation = 0;

    async function initialize() {
      const current = ++generation;
      dispose?.();
      dispose = undefined;
      if (reducedMotion.matches) return;
      try {
        const { createAmbientScene } = await import("../rendering/ambientScene");
        if (!cancelled && current === generation && canvas) dispose = createAmbientScene(canvas);
      } catch {
        // The CSS glow remains available if WebGL or its lazy chunk fails.
      }
    }

    // Let the intro and critical content render before loading Three.js.
    const timer = window.setTimeout(() => { void initialize(); }, 1200);
    reducedMotion.addEventListener("change", initialize);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
      reducedMotion.removeEventListener("change", initialize);
      dispose?.();
    };
  }, []);

  return <canvas data-ambient-canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 h-full w-full" />;
}
