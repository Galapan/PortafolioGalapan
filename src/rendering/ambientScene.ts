import {
  Mesh, OrthographicCamera, PlaneGeometry, Scene, ShaderMaterial, WebGLRenderer,
} from "three";
import { createFrameQualityMonitor } from "./frameQuality";

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
    mesh.matrixAutoUpdate = false;
    scene.add(mesh);
    return { anchor, mesh, material };
  });

  let frame = 0;
  let disposed = false;
  let lost = false;
  let width = 0;
  let height = 0;
  let quality = 1;
  let needsResize = true;
  let hadVisibleGlow = false;
  let drawingWidth = 0;
  let drawingHeight = 0;
  let forceDraw = true;

  function resize() {
    if (width !== canvas.clientWidth || height !== canvas.clientHeight) forceDraw = true;
    width = canvas.clientWidth;
    height = canvas.clientHeight;
    // Soft glows need fewer pixels than text. Bound the framebuffer on retina/4K.
    const ratio = Math.min(window.devicePixelRatio || 1, 1.25, Math.sqrt(1_000_000 / Math.max(1, width * height))) * quality;
    const nextWidth = Math.max(1, Math.round(width * ratio));
    const nextHeight = Math.max(1, Math.round(height * ratio));
    // Anchor/content resizes can invalidate layout without changing the canvas.
    // Avoid reallocating and clearing its framebuffer in that case.
    if (nextWidth !== drawingWidth || nextHeight !== drawingHeight) {
      renderer.setSize(nextWidth, nextHeight, false);
      drawingWidth = nextWidth;
      drawingHeight = nextHeight;
      forceDraw = true;
    }
    camera.right = width;
    camera.top = height;
    camera.updateProjectionMatrix();
    needsResize = false;
  }

  const qualityMonitor = createFrameQualityMonitor((nextQuality) => {
    quality = nextQuality;
    needsResize = true;
    invalidate();
  });

  function render() {
    frame = 0;
    if (disposed || lost || document.hidden) return;
    if (needsResize) resize();
    let hasVisibleGlow = false;
    let changed = forceDraw;
    for (const { anchor, mesh } of glows) {
      const rect = anchor.getBoundingClientRect();
      const visible = rect.bottom > 0 && rect.top < height && rect.right > 0 && rect.left < width;
      if (mesh.visible !== visible) changed = true;
      mesh.visible = visible;
      if (!mesh.visible) continue;
      hasVisibleGlow = true;
      const x = rect.left + rect.width / 2;
      const y = height - rect.top - rect.height / 2;
      if (mesh.position.x !== x || mesh.position.y !== y || mesh.scale.x !== rect.width || mesh.scale.y !== rect.height) {
        mesh.position.set(x, y, 0);
        mesh.scale.set(rect.width, rect.height, 1);
        mesh.updateMatrix();
        changed = true;
      }
    }
    // Clear once when the last glow leaves the viewport, then stop drawing.
    if (changed && (hasVisibleGlow || hadVisibleGlow)) {
      renderer.render(scene, camera);
      if (hasVisibleGlow) qualityMonitor.touch();
    }
    forceDraw = false;
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
    qualityMonitor.stop();
    invalidate();
  }
  function onContextLost(event: Event) {
    event.preventDefault();
    lost = true;
    qualityMonitor.stop();
    cancelAnimationFrame(frame);
    frame = 0;
    delete root.dataset.ambientRenderer;
  }
  function onContextRestored() { lost = false; needsResize = true; forceDraw = true; invalidate(); }

  const observer = new ResizeObserver(onResize);
  observer.observe(canvas);
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
    qualityMonitor.stop();
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
