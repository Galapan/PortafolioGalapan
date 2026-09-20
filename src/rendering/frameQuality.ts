// Sample browser frames during interaction, independently of scroll-event frequency.
// The observed cadence is a reference, not a claim about the monitor's physical Hz.
export function createFrameQualityMonitor(onChange: (quality: number) => void) {
  let frame: number | undefined;
  let activeUntil = 0;
  let previous = 0;
  let windowStart = 0;
  let baseline = Infinity;
  let healthyWindows = 0;
  let quality = 1;
  let samples: number[] = [];

  function assess() {
    const sorted = [...samples].sort((a, b) => a - b);
    baseline = Math.min(baseline, sorted[Math.floor(sorted.length * 0.2)]);
    const slowRatio = samples.filter((delta) => delta > baseline * 1.5).length / samples.length;
    let next = quality;
    if (slowRatio > 0.2) {
      healthyWindows = 0;
      next = Math.max(0.5, quality * 0.8);
    } else if (slowRatio < 0.05) {
      healthyWindows++;
      if (healthyWindows >= 3) {
        next = Math.min(1, quality + 0.1);
        healthyWindows = 0;
      }
    } else {
      healthyWindows = 0;
    }
    if (next !== quality) {
      quality = next;
      onChange(quality);
    }
  }

  function stop() {
    if (frame !== undefined) cancelAnimationFrame(frame);
    frame = undefined;
    previous = 0;
    windowStart = 0;
    baseline = Infinity;
    healthyWindows = 0;
    samples = [];
  }

  function tick(time: number) {
    frame = undefined;
    if (time > activeUntil || document.hidden) { stop(); return; }
    const delta = time - previous;
    // Discard suspended/stalled windows rather than treating them as GPU load.
    if (!previous || delta > 100 || delta <= 0) {
      samples = [];
      windowStart = time;
    } else {
      samples.push(delta);
    }
    previous = time;
    // Time-based windows work at 60, 120, 144 Hz and other browser cadences.
    if (time - windowStart >= 1000 && samples.length >= 20) {
      assess();
      samples = [];
      windowStart = time;
    }
    frame = requestAnimationFrame(tick);
  }

  return {
    touch() {
      activeUntil = performance.now() + 150;
      if (frame === undefined) frame = requestAnimationFrame(tick);
    },
    stop,
  };
}
