import {
  Mesh, OrthographicCamera, PlaneGeometry, Scene, ShaderMaterial, WebGLRenderer,
} from "three";

// Two soft planes share one geometry and one WebGL context. No textures,
// lights, shadows, postprocessing, or perpetual animation loop are needed.
const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;
const fragmentShader = `
  varying vec2 vUv;
  uniform float strength;
  void main() {
    float radius = length((vUv - 0.5) * 2.0);
    float glow = exp(-4.5 * radius * radius) * (1.0 - smoothstep(0.7, 1.0, radius));
    gl_FragColor = vec4(vec3(0.65), glow * strength);
  }
`;

export function createAmbientScene(canvas: HTMLCanvasElement) {
  const context = canvas.getContext("webgl2", { alpha: true, antialias: false, depth: false, stencil: false });
  if (!context) return () => {};

  const renderer = new WebGLRenderer({ canvas, context, alpha: true, antialias: false });
  renderer.setClearColor(0x000000, 0);
  const scene = new Scene();
  const camera = new OrthographicCamera(0, 1, 1, 0, -1, 1);
  const geometry = new PlaneGeometry(1, 1);
  const root = document.documentElement;
  const anchors = Array.from(document.querySelectorAll<HTMLElement>("[data-ambient-glow]"));
  const glows = anchors.map((anchor) => {
    const material = new ShaderMaterial({
      vertexShader, fragmentShader, transparent: true, depthTest: false, depthWrite: false,
      uniforms: { strength: { value: anchor.dataset.ambientGlow === "hero" ? 0.14 : 0.06 } },
    });
    const mesh = new Mesh(geometry, material);
    scene.add(mesh);
    return { anchor, mesh, material };
  });

  let frame = 0;
  let disposed = false;
  let lost = false;
  let width = 0;
  let height = 0;
  let quality = 1;
  let lastFrame = 0;
  let sampleCount = 0;
  let slowFrames = 0;
  let needsResize = true;
  let hadVisibleGlow = false;

  function resize() {
    width = canvas.clientWidth;
    height = canvas.clientHeight;
    // Soft glows need fewer pixels than text. Bound the framebuffer on retina/4K.
    const ratio = Math.min(window.devicePixelRatio || 1, 1.25, Math.sqrt(1_000_000 / Math.max(1, width * height))) * quality;
    renderer.setSize(Math.max(1, Math.round(width * ratio)), Math.max(1, Math.round(height * ratio)), false);
    camera.right = width;
    camera.top = height;
    camera.updateProjectionMatrix();
    needsResize = false;
  }

  function sampleFrame(time: number) {
    const delta = time - lastFrame;
    lastFrame = time;
    // Only assess consecutive frames while interacting, never idle time.
    if (delta <= 0 || delta > 80) { sampleCount = 0; slowFrames = 0; return; }
    sampleCount++;
    if (delta > 22) slowFrames++;
    if (sampleCount < 60) return;
    if (slowFrames > 12 && quality > 0.5) {
      quality = Math.max(0.5, quality * 0.8);
      needsResize = true;
    }
    sampleCount = 0;
    slowFrames = 0;
  }

  function render(time: number) {
    frame = 0;
    if (disposed || lost || document.hidden) return;
    sampleFrame(time);
    if (needsResize) resize();
    let hasVisibleGlow = false;
    for (const { anchor, mesh } of glows) {
      const rect = anchor.getBoundingClientRect();
      mesh.visible = rect.bottom > 0 && rect.top < height && rect.right > 0 && rect.left < width;
      if (!mesh.visible) continue;
      hasVisibleGlow = true;
      mesh.position.set(rect.left + rect.width / 2, height - rect.top - rect.height / 2, 0);
      mesh.scale.set(rect.width, rect.height, 1);
    }
    // Clear once when the last glow leaves the viewport, then stop drawing.
    if (hasVisibleGlow || hadVisibleGlow) renderer.render(scene, camera);
    hadVisibleGlow = hasVisibleGlow;
    root.dataset.ambientRenderer = "webgl";
  }

  function invalidate() {
    if (!frame && !disposed && !lost && !document.hidden) frame = requestAnimationFrame(render);
  }
  function onResize() { needsResize = true; invalidate(); }
  function onVisibility() {
    cancelAnimationFrame(frame);
    frame = 0;
    lastFrame = 0;
    invalidate();
  }
  function onContextLost(event: Event) {
    event.preventDefault();
    lost = true;
    cancelAnimationFrame(frame);
    frame = 0;
    delete root.dataset.ambientRenderer;
  }
  function onContextRestored() { lost = false; needsResize = true; invalidate(); }

  const observer = new ResizeObserver(onResize);
  observer.observe(document.body);
  for (const anchor of anchors) observer.observe(anchor);
  window.addEventListener("scroll", invalidate, { passive: true });
  window.addEventListener("resize", onResize);
  document.addEventListener("visibilitychange", onVisibility);
  // A late image/font load can move an anchor without resizing the viewport.
  document.addEventListener("load", invalidate, true);
  canvas.addEventListener("webglcontextlost", onContextLost);
  canvas.addEventListener("webglcontextrestored", onContextRestored);
  invalidate();

  return () => {
    disposed = true;
    cancelAnimationFrame(frame);
    observer.disconnect();
    window.removeEventListener("scroll", invalidate);
    window.removeEventListener("resize", onResize);
    document.removeEventListener("visibilitychange", onVisibility);
    document.removeEventListener("load", invalidate, true);
    canvas.removeEventListener("webglcontextlost", onContextLost);
    canvas.removeEventListener("webglcontextrestored", onContextRestored);
    for (const { material } of glows) material.dispose();
    geometry.dispose();
    renderer.dispose();
    renderer.forceContextLoss();
    delete root.dataset.ambientRenderer;
  };
}
