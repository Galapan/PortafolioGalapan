// Opt-in local profiling UI, removed from production by Vite's DEV constant.
const panel = document.createElement("aside");
panel.setAttribute("aria-label", "Medición local de rendimiento");
panel.style.cssText = "position:fixed;bottom:8px;left:8px;z-index:9999;padding:12px;background:#18181b;color:white;border:1px solid #71717a;font:12px monospace;max-width:90vw";
const output = document.createElement("output");
output.style.cssText = "display:block;white-space:pre-wrap;margin-top:8px";
output.textContent = "Medición local disponible. No garantiza FPS en otros dispositivos.";
const buttons: HTMLButtonElement[] = [];

function measure(mode: "scroll" | "menu") {
  buttons.forEach((button) => { button.disabled = true; });
  const samples: number[] = [];
  const started = performance.now();
  let previous = started;
  let step = -1;
  let aborted = false;
  const originalY = window.scrollY;
  const distance = document.documentElement.scrollHeight - innerHeight;
  const onHidden = () => { if (document.hidden) aborted = true; };
  document.addEventListener("visibilitychange", onHidden);
  output.textContent = `Midiendo ${mode} durante 8 segundos…`;

  function tick(now: number) {
    const elapsed = now - started;
    if (elapsed > 250) samples.push(now - previous);
    previous = now;
    if (elapsed < 8000 && !aborted) {
      if (mode === "scroll") {
        const progress = elapsed / 8000;
        window.scrollTo({ top: distance * (1 - Math.cos(progress * Math.PI * 2)) / 2, behavior: "instant" });
      } else {
        const nextStep = Math.floor(elapsed / 1600);
        if (nextStep !== step) {
          document.querySelector<HTMLButtonElement>(nextStep % 2 === 0 ? '[aria-label="Abrir menú"]' : 'dialog [aria-label="Cerrar menú"]')?.click();
          step = nextStep;
        }
      }
      requestAnimationFrame(tick);
      return;
    }
    document.querySelector<HTMLButtonElement>('dialog [aria-label="Cerrar menú"]')?.click();
    window.scrollTo({ top: originalY, behavior: "instant" });
    document.removeEventListener("visibilitychange", onHidden);
    buttons.forEach((button) => { button.disabled = false; });
    if (aborted || !samples.length) { output.textContent = "Medición cancelada: pestaña oculta."; return; }
    const sorted = [...samples].sort((a, b) => a - b);
    const average = samples.reduce((sum, value) => sum + value, 0) / samples.length;
    const p95 = sorted[Math.floor(sorted.length * 0.95)];
    const slow = samples.filter((value) => value > 25).length;
    output.textContent = `${mode}: ${(1000 / average).toFixed(1)} FPS medios\np95: ${p95.toFixed(1)} ms · máximo: ${sorted[sorted.length - 1].toFixed(1)} ms\nFrames >25 ms: ${slow}/${samples.length} · WebGL: ${document.documentElement.dataset.ambientRenderer === "webgl"}`;
  }
  requestAnimationFrame(tick);
}

for (const mode of ["scroll", "menu"] as const) {
  const button = document.createElement("button");
  button.textContent = `Medir ${mode}`;
  button.style.cssText = "padding:8px;border:1px solid #71717a;margin-right:8px";
  button.addEventListener("click", () => measure(mode));
  buttons.push(button);
  panel.append(button);
}
panel.append(output);
const contextButton = document.createElement("button");
contextButton.textContent = "Simular pérdida WebGL";
contextButton.style.cssText = "padding:8px;border:1px solid #71717a;margin-top:8px";
contextButton.addEventListener("click", () => {
  const context = document.querySelector<HTMLCanvasElement>("[data-ambient-canvas]")?.getContext("webgl2");
  const extension = context?.getExtension("WEBGL_lose_context");
  if (!extension) { output.textContent = "Simulación no disponible."; return; }
  extension.loseContext();
  output.textContent = "Contexto perdido; debe aparecer el fondo CSS. Restauración en 5 segundos.";
  window.setTimeout(() => {
    extension.restoreContext();
    output.textContent = "Restauración solicitada.";
  }, 5000);
});
panel.append(contextButton);
document.body.append(panel);

export {};
